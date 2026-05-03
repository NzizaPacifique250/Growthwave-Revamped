// Seed data for the mock authenticated student. Single user, in-memory only.
// Designed so every gated surface (Dashboard, Module, Project, Certificate)
// has interesting data to render without further setup.

export const mockStudentSeed = {
  id: 'student-001',
  firstName: 'Karenzi',
  lastName: 'Marie',
  fullName: 'Karenzi Marie',
  initials: 'KM',
  email: 'karenzi.marie@example.rw',
  joinedAt: '2026-02-12',
  timezone: 'Africa/Kigali',
  streakDays: 14,
  weeklyGoalHours: 10,
  weeklyHoursLogged: 6.5,
  leaderboardRank: 23,
  leaderboardCohortSize: 184,
  loggedToday: false,
};

// 14 days of streak history ending today. `active: true` means the student
// logged at least one session that day.
function buildStreakHistory(today = new Date()) {
  const days = [];
  const pattern = [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
  for (let i = 13; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    days.push({
      date: d.toISOString().slice(0, 10),
      active: pattern[13 - i] === 1,
    });
  }
  return days;
}

export const mockStreakHistory = buildStreakHistory();

// Mock enrollment in Web Development. Module 4 (React Components) is the
// active one; modules 1-3 are completed; 5-8 locked. Lesson-level state lives
// inside the active module so the Module Learning surface has fixtures.
export const mockEnrollmentsSeed = [
  {
    pathSlug: 'web-development',
    kind: 'full',
    planId: 'annual',
    enrolledAt: '2026-02-15',
    trialEndsAt: null,
    status: 'active',
    overallProgress: 0.42,
    nextMilestone: {
      title: 'Complete Module 4: React Components',
      dueAt: '2026-05-12',
    },
    modules: [
      {
        id: 'wd-m1',
        title: 'HTML & CSS Foundations',
        status: 'completed',
        progress: 1,
        completedAt: '2026-03-04',
      },
      {
        id: 'wd-m2',
        title: 'JavaScript Essentials',
        status: 'completed',
        progress: 1,
        completedAt: '2026-03-25',
      },
      {
        id: 'wd-m3',
        title: 'Version Control with Git',
        status: 'completed',
        progress: 1,
        completedAt: '2026-04-02',
      },
      {
        id: 'wd-m4',
        title: 'React Components',
        status: 'in-progress',
        progress: 0.56,
        lessons: [
          { id: 'wd-m4-l1', title: 'What is a component?', type: 'video', status: 'completed', duration: '8 min' },
          { id: 'wd-m4-l2', title: 'Props & composition', type: 'reading', status: 'completed', duration: '12 min' },
          { id: 'wd-m4-l3', title: 'Your first interactive component', type: 'interactive', status: 'completed', duration: '20 min' },
          { id: 'wd-m4-l4', title: 'State and the useState hook', type: 'video', status: 'in-progress', duration: '15 min' },
          { id: 'wd-m4-l5', title: 'Lifting state up', type: 'reading', status: 'locked', duration: '10 min' },
          { id: 'wd-m4-l6', title: 'Module 4 quiz', type: 'quiz', status: 'locked', duration: '20 min' },
        ],
      },
      { id: 'wd-m5', title: 'Routing & State Management', status: 'locked', progress: 0 },
      { id: 'wd-m6', title: 'Testing & Accessibility', status: 'locked', progress: 0 },
      { id: 'wd-m7', title: 'Node.js & APIs', status: 'locked', progress: 0 },
      { id: 'wd-m8', title: 'Capstone: Real-World Web App', status: 'locked', progress: 0 },
    ],
    // Active project (Project Workspace surface). Lined up with Module 4.
    activeProject: {
      projectId: 'wd-recipe-finder',
      startedAt: '2026-04-26',
    },
    // Quiz / assessment history slot for the Assessment & Advancement surface.
    assessments: [],
    // Earned badges from completed modules + path certifications.
    badges: [
      { id: 'badge-html-css', label: 'HTML & CSS', earnedAt: '2026-03-04' },
      { id: 'badge-js', label: 'JavaScript Essentials', earnedAt: '2026-03-25' },
      { id: 'badge-git', label: 'Version Control', earnedAt: '2026-04-02' },
    ],
  },
];

export const mockActivityFeed = [
  {
    id: 'a1',
    kind: 'lesson-completed',
    title: 'Completed lesson: Your first interactive component',
    when: '2026-04-30T14:22:00+02:00',
  },
  {
    id: 'a2',
    kind: 'badge-earned',
    title: 'Earned badge: Version Control',
    when: '2026-04-02T18:01:00+02:00',
  },
  {
    id: 'a3',
    kind: 'peer-comment',
    title: 'Eric N. left feedback on your portfolio project',
    when: '2026-04-29T09:14:00+02:00',
  },
  {
    id: 'a4',
    kind: 'mentor-note',
    title: 'Mentor note: Try refactoring with destructured props',
    when: '2026-04-28T11:30:00+02:00',
  },
];

export const mockNotifications = [
  { id: 'n1', kind: 'reminder', text: 'Module 4 quiz unlocks after lesson 5', read: false },
  { id: 'n2', kind: 'event', text: 'Office hours tomorrow, 6pm CAT', read: false },
  { id: 'n3', kind: 'system', text: 'New peer review request waiting', read: true },
];
