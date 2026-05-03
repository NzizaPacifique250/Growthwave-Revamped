import { Navigate } from 'react-router-dom';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';
import DashboardHeader from '../components/academy/dashboard/DashboardHeader.jsx';
import PathProgressCard from '../components/academy/dashboard/PathProgressCard.jsx';
import WeeklyGoalCard from '../components/academy/dashboard/WeeklyGoalCard.jsx';
import StreakCalendar from '../components/academy/dashboard/StreakCalendar.jsx';
import LeaderboardCard from '../components/academy/dashboard/LeaderboardCard.jsx';
import ContinueBanner from '../components/academy/dashboard/ContinueBanner.jsx';
import TodaysPlan from '../components/academy/dashboard/TodaysPlan.jsx';
import MilestoneTimeline from '../components/academy/dashboard/MilestoneTimeline.jsx';
import RecentActivityFeed from '../components/academy/dashboard/RecentActivityFeed.jsx';
import QuickActionsPanel from '../components/academy/dashboard/QuickActionsPanel.jsx';
import ResourcesCard from '../components/academy/dashboard/ResourcesCard.jsx';
import RecommendationsCard from '../components/academy/dashboard/RecommendationsCard.jsx';
import CommunityHighlights from '../components/academy/dashboard/CommunityHighlights.jsx';
import ActiveProjectCard from '../components/academy/dashboard/ActiveProjectCard.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import { getPathBySlug } from '../data/learningPaths.js';
import { getProject } from '../data/projects.js';
import {
  mockTodaysPlan,
  mockMilestones,
  mockCohortHighlights,
  mockRecommendations,
} from '../data/dashboard.js';

export default function DashboardPage() {
  const { user, enrollments, activity, streakHistory, logHoursToday, getProjectState } = useAuth();

  // Pick the most recently enrolled active path. (Multi-path switcher is
  // documented as a future addition; for now we surface the active one.)
  const activeEnrollment =
    enrollments
      .filter((e) => e.status === 'active')
      .sort((a, b) => (b.enrolledAt || '').localeCompare(a.enrolledAt || ''))[0] || null;

  if (!activeEnrollment) {
    // Signed in but not enrolled — push them to discovery.
    return <Navigate to="/academy/paths" replace />;
  }

  const path = getPathBySlug(activeEnrollment.pathSlug);
  if (!path) return <Navigate to="/academy/paths" replace />;

  const currentModule =
    activeEnrollment.modules.find((m) => m.status === 'in-progress') ||
    activeEnrollment.modules[0];
  const nextLesson =
    currentModule?.lessons?.find((l) => l.status === 'in-progress') ||
    currentModule?.lessons?.find((l) => l.status !== 'completed');

  const resumeHref = nextLesson
    ? `/academy/learn/${path.slug}/modules/${currentModule.id}/${nextLesson.id}`
    : `/academy/paths/${path.slug}`;

  const activeProject = activeEnrollment.activeProject
    ? getProject(activeEnrollment.activeProject.projectId)
    : null;
  const activeProjectState = activeProject ? getProjectState(activeProject.id) : null;

  return (
    <>
      <Navbar />
      <main className="bg-gw-ice/30 text-gw-ink min-h-screen pt-24 pb-20">
        <div className="container-x space-y-6">
          <DashboardHeader pathTitle={path.title} onLogToday={() => logHoursToday(0.5)} />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left rail — progress overview */}
            <aside className="lg:col-span-3 space-y-4">
              <PathProgressCard path={path} enrollment={activeEnrollment} />
              <WeeklyGoalCard
                logged={user.weeklyHoursLogged}
                goal={user.weeklyGoalHours}
                onAdd={(h) => logHoursToday(h)}
              />
              <StreakCalendar history={streakHistory} streakDays={user.streakDays} />
              <LeaderboardCard
                rank={user.leaderboardRank}
                cohortSize={user.leaderboardCohortSize}
              />
            </aside>

            {/* Center column — current learning */}
            <div className="lg:col-span-6 space-y-4">
              <ContinueBanner
                path={path}
                module={currentModule}
                nextLesson={nextLesson}
              />
              {activeProject && activeProjectState && (
                <ActiveProjectCard
                  project={activeProject}
                  projectState={activeProjectState}
                  pathSlug={path.slug}
                />
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <TodaysPlan
                  items={mockTodaysPlan}
                  pathSlug={path.slug}
                  moduleId={currentModule.id}
                />
                <MilestoneTimeline milestones={mockMilestones} />
              </div>
              <RecentActivityFeed activity={activity} />
            </div>

            {/* Right rail — quick actions + resources */}
            <aside className="lg:col-span-3 space-y-4">
              <QuickActionsPanel resumeHref={resumeHref} />
              <ResourcesCard />
              <RecommendationsCard recommendations={mockRecommendations} />
            </aside>
          </div>

          <CommunityHighlights highlights={mockCohortHighlights} />
        </div>
      </main>
      <Footer />
    </>
  );
}
