import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import {
  mockStudentSeed,
  mockEnrollmentsSeed,
  mockActivityFeed,
  mockNotifications,
  mockStreakHistory,
} from '../data/mockStudent.js';

const AuthContext = createContext(null);

// Provider seeds as logged-in by default so direct URL hits to gated surfaces
// "just work" for demos. Use the optional `initialAuthenticated` prop to test
// the signed-out state.
export function AuthProvider({ children, initialAuthenticated = true }) {
  const [isAuthenticated, setAuthenticated] = useState(initialAuthenticated);
  const [user, setUser] = useState(mockStudentSeed);
  const [enrollments, setEnrollments] = useState(mockEnrollmentsSeed);
  const [activity, setActivity] = useState(mockActivityFeed);
  const [notifications, setNotifications] = useState(mockNotifications);
  const [assessmentResult, setAssessmentResult] = useState(null);
  const [streakHistory, setStreakHistory] = useState(mockStreakHistory);
  const [lessonNotes, setLessonNotes] = useState({});
  // Module assessment attempts, keyed by `${pathSlug}:${moduleId}` -> array of attempt objects.
  const [assessmentAttempts, setAssessmentAttempts] = useState({});
  // Per-project workspace state, keyed by projectId.
  const [projectStates, setProjectStates] = useState({});

  const signIn = useCallback(() => setAuthenticated(true), []);
  const signOut = useCallback(() => setAuthenticated(false), []);

  // Mutators surfaced for later steps. Each one is intentionally narrow so
  // surfaces don't reach into the raw state shape.
  // Enrolls the student in a path. `kind` is 'trial' (no payment) or 'full'
  // (paid enrollment). Idempotent by slug — re-enrolling upgrades the kind
  // from trial to full but never downgrades.
  const enrollInPath = useCallback((pathSlug, options = {}) => {
    const { kind = 'full', planId = null } = options;
    setEnrollments((prev) => {
      const existing = prev.find((e) => e.pathSlug === pathSlug);
      if (existing) {
        if (existing.kind === 'trial' && kind === 'full') {
          return prev.map((e) =>
            e.pathSlug === pathSlug ? { ...e, kind: 'full', planId } : e
          );
        }
        return prev;
      }
      const trialEndsAt =
        kind === 'trial'
          ? new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10)
          : null;
      return [
        ...prev,
        {
          pathSlug,
          kind,
          planId,
          enrolledAt: new Date().toISOString().slice(0, 10),
          trialEndsAt,
          status: 'active',
          overallProgress: 0,
          modules: [],
          activeProject: null,
          assessments: [],
          badges: [],
        },
      ];
    });
  }, []);

  const markLessonComplete = useCallback((pathSlug, moduleId, lessonId) => {
    setEnrollments((prev) =>
      prev.map((e) => {
        if (e.pathSlug !== pathSlug) return e;
        return {
          ...e,
          modules: e.modules.map((m) => {
            if (m.id !== moduleId || !m.lessons) return m;
            const lessons = m.lessons.map((l) =>
              l.id === lessonId ? { ...l, status: 'completed' } : l
            );
            const completed = lessons.filter((l) => l.status === 'completed').length;
            return {
              ...m,
              lessons,
              progress: lessons.length ? completed / lessons.length : m.progress,
            };
          }),
        };
      })
    );
  }, []);

  const incrementStreak = useCallback(() => {
    setUser((u) => ({ ...u, streakDays: u.streakDays + 1 }));
  }, []);

  // Logs a learning session for today. Bumps weekly hours, marks today active
  // in the streak history, and increments streak when first logged today.
  const logHoursToday = useCallback((hours) => {
    const today = new Date().toISOString().slice(0, 10);
    setUser((u) => {
      const wasLogged = u.loggedToday;
      return {
        ...u,
        weeklyHoursLogged: Math.min(40, u.weeklyHoursLogged + hours),
        streakDays: wasLogged ? u.streakDays : u.streakDays + 1,
        loggedToday: true,
      };
    });
    setStreakHistory((prev) =>
      prev.map((d) => (d.date === today ? { ...d, active: true } : d))
    );
  }, []);

  const markNotificationRead = useCallback((id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  }, []);

  const saveAssessmentResult = useCallback((result) => {
    setAssessmentResult(result);
  }, []);

  const clearAssessmentResult = useCallback(() => {
    setAssessmentResult(null);
  }, []);

  const saveLessonNote = useCallback((lessonId, text) => {
    setLessonNotes((prev) => ({
      ...prev,
      [lessonId]: { ...(prev[lessonId] || {}), notes: text },
    }));
  }, []);

  const toggleBookmark = useCallback((lessonId) => {
    setLessonNotes((prev) => ({
      ...prev,
      [lessonId]: {
        ...(prev[lessonId] || {}),
        bookmarked: !(prev[lessonId]?.bookmarked || false),
      },
    }));
  }, []);

  const getLessonNote = useCallback(
    (lessonId) => lessonNotes[lessonId] || { notes: '', bookmarked: false },
    [lessonNotes]
  );

  const getModuleAttempts = useCallback(
    (pathSlug, moduleId) => assessmentAttempts[`${pathSlug}:${moduleId}`] || [],
    [assessmentAttempts]
  );

  // Project workspace state — defaults out keys so callers don't need to
  // null-check.
  const getProjectState = useCallback(
    (projectId) =>
      projectStates[projectId] || {
        fileDrafts: {},
        checklist: {},
        submissionStatus: 'draft',
        reviewerComments: [],
        reviewerNote: '',
        mentorNote: null,
      },
    [projectStates]
  );

  const updateProjectFile = useCallback((projectId, fileId, content) => {
    setProjectStates((prev) => {
      const cur = prev[projectId] || {
        fileDrafts: {},
        checklist: {},
        submissionStatus: 'draft',
        reviewerComments: [],
        reviewerNote: '',
        mentorNote: null,
      };
      return {
        ...prev,
        [projectId]: {
          ...cur,
          fileDrafts: { ...cur.fileDrafts, [fileId]: content },
        },
      };
    });
  }, []);

  const setProjectChecklistItem = useCallback((projectId, requirementId, status) => {
    setProjectStates((prev) => {
      const cur = prev[projectId] || {
        fileDrafts: {},
        checklist: {},
        submissionStatus: 'draft',
        reviewerComments: [],
        reviewerNote: '',
        mentorNote: null,
      };
      return {
        ...prev,
        [projectId]: {
          ...cur,
          checklist: { ...cur.checklist, [requirementId]: status },
        },
      };
    });
  }, []);

  const setProjectReviewerNote = useCallback((projectId, note) => {
    setProjectStates((prev) => {
      const cur = prev[projectId] || {
        fileDrafts: {},
        checklist: {},
        submissionStatus: 'draft',
        reviewerComments: [],
        reviewerNote: '',
        mentorNote: null,
      };
      return {
        ...prev,
        [projectId]: { ...cur, reviewerNote: note },
      };
    });
  }, []);

  // Switches the project to review-requested. The page sets a timer to
  // surface the seeded reviews; the project data fixture supplies them.
  const requestProjectReview = useCallback((projectId) => {
    setProjectStates((prev) => {
      const cur = prev[projectId] || {
        fileDrafts: {},
        checklist: {},
        submissionStatus: 'draft',
        reviewerComments: [],
        reviewerNote: '',
        mentorNote: null,
      };
      return {
        ...prev,
        [projectId]: { ...cur, submissionStatus: 'review-requested' },
      };
    });
  }, []);

  const seedProjectReviews = useCallback((projectId, comments, mentorNote) => {
    setProjectStates((prev) => {
      const cur = prev[projectId] || {
        fileDrafts: {},
        checklist: {},
        submissionStatus: 'draft',
        reviewerComments: [],
        reviewerNote: '',
        mentorNote: null,
      };
      return {
        ...prev,
        [projectId]: {
          ...cur,
          submissionStatus: 'reviewing',
          reviewerComments: comments,
          mentorNote: mentorNote ?? cur.mentorNote,
        },
      };
    });
  }, []);

  // Records a module assessment attempt. On a passing attempt also awards the
  // badge, advances the next module from `locked` to `in-progress`, and
  // pushes activity feed entries so the dashboard reflects the win.
  const recordAssessmentAttempt = useCallback(
    (pathSlug, moduleId, attemptResult, { badge, masteryBadge, nextModuleId, moduleTitle } = {}) => {
      const key = `${pathSlug}:${moduleId}`;
      let isFirstPass = false;

      setAssessmentAttempts((prev) => {
        const existing = prev[key] || [];
        const attemptNumber = existing.length + 1;
        const previousPasses = existing.filter((a) => a.passed).length;
        if (attemptResult.passed && previousPasses === 0) isFirstPass = true;
        return {
          ...prev,
          [key]: [...existing, { attemptNumber, ...attemptResult }],
        };
      });

      if (!attemptResult.passed) return;

      // On pass: award badge(s), advance next module, push activity entries.
      setEnrollments((prev) =>
        prev.map((e) => {
          if (e.pathSlug !== pathSlug) return e;
          const newBadges = [...(e.badges || [])];
          if (badge && !newBadges.some((b) => b.id === badge.id)) {
            newBadges.push({ ...badge, earnedAt: new Date().toISOString().slice(0, 10) });
          }
          if (attemptResult.mastered && masteryBadge && !newBadges.some((b) => b.id === masteryBadge.id)) {
            newBadges.push({ ...masteryBadge, earnedAt: new Date().toISOString().slice(0, 10) });
          }
          const newModules = e.modules.map((m) => {
            if (m.id === moduleId && m.status !== 'completed') {
              return {
                ...m,
                status: 'completed',
                progress: 1,
                completedAt: new Date().toISOString().slice(0, 10),
              };
            }
            if (m.id === nextModuleId && m.status === 'locked') {
              return { ...m, status: 'in-progress' };
            }
            return m;
          });
          const completed = newModules.filter((m) => m.status === 'completed').length;
          return {
            ...e,
            badges: newBadges,
            modules: newModules,
            overallProgress: newModules.length ? completed / newModules.length : e.overallProgress,
          };
        })
      );

      if (isFirstPass) {
        setActivity((prev) => {
          const next = [
            {
              id: `assess-${key}-${Date.now()}`,
              kind: 'assessment-passed',
              title: `Passed Module quiz · ${attemptResult.scorePercent}% (${moduleTitle || moduleId})`,
              when: new Date().toISOString(),
            },
            ...prev,
          ];
          if (badge) {
            next.unshift({
              id: `badge-${badge.id}-${Date.now()}`,
              kind: 'badge-earned',
              title: `Earned badge: ${badge.label}`,
              when: new Date().toISOString(),
            });
          }
          if (attemptResult.mastered && masteryBadge) {
            next.unshift({
              id: `badge-${masteryBadge.id}-${Date.now()}`,
              kind: 'badge-earned',
              title: `Earned badge: ${masteryBadge.label}`,
              when: new Date().toISOString(),
            });
          }
          return next.slice(0, 12);
        });
      }
    },
    []
  );

  const enrolledPaths = useMemo(
    () => enrollments.map((e) => e.pathSlug),
    [enrollments]
  );

  const isEnrolledIn = useCallback(
    (slug) => enrolledPaths.includes(slug),
    [enrolledPaths]
  );

  const getEnrollment = useCallback(
    (slug) => enrollments.find((e) => e.pathSlug === slug) || null,
    [enrollments]
  );

  const value = useMemo(
    () => ({
      isAuthenticated,
      user,
      enrollments,
      enrolledPaths,
      activity,
      notifications,
      assessmentResult,
      streakHistory,
      lessonNotes,
      assessmentAttempts,
      projectStates,
      isEnrolledIn,
      getEnrollment,
      getLessonNote,
      getModuleAttempts,
      getProjectState,
      // mutators
      signIn,
      signOut,
      enrollInPath,
      markLessonComplete,
      incrementStreak,
      logHoursToday,
      markNotificationRead,
      saveAssessmentResult,
      clearAssessmentResult,
      saveLessonNote,
      toggleBookmark,
      recordAssessmentAttempt,
      updateProjectFile,
      setProjectChecklistItem,
      setProjectReviewerNote,
      requestProjectReview,
      seedProjectReviews,
    }),
    [
      isAuthenticated,
      user,
      enrollments,
      enrolledPaths,
      activity,
      notifications,
      assessmentResult,
      streakHistory,
      lessonNotes,
      assessmentAttempts,
      projectStates,
      isEnrolledIn,
      getEnrollment,
      getLessonNote,
      getModuleAttempts,
      getProjectState,
      signIn,
      signOut,
      enrollInPath,
      markLessonComplete,
      incrementStreak,
      logHoursToday,
      markNotificationRead,
      saveAssessmentResult,
      clearAssessmentResult,
      saveLessonNote,
      toggleBookmark,
      recordAssessmentAttempt,
      updateProjectFile,
      setProjectChecklistItem,
      setProjectReviewerNote,
      requestProjectReview,
      seedProjectReviews,
    ]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within an <AuthProvider>');
  return ctx;
}
