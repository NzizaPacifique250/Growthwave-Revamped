// Dashboard-only mock data: today's plan, milestones, peer activity, and
// recommendations. Keeps these out of mockStudent.js so the persona seed
// stays focused on identity + enrollments.

export const mockTodaysPlan = [
  {
    id: 'tp-1',
    kind: 'lesson',
    title: 'State and the useState hook',
    durationMin: 15,
    status: 'in-progress',
    moduleId: 'wd-m4',
    lessonId: 'wd-m4-l4',
  },
  {
    id: 'tp-2',
    kind: 'practice',
    title: 'Counter component challenge',
    durationMin: 25,
    status: 'pending',
  },
  {
    id: 'tp-3',
    kind: 'mentor',
    title: 'Mentor office hours · Eric N.',
    durationMin: 30,
    status: 'pending',
    when: '18:00',
  },
];

export const mockMilestones = [
  {
    id: 'ms-1',
    title: 'Finish Module 4: React Components',
    dueAt: '2026-05-12',
    type: 'module',
  },
  {
    id: 'ms-2',
    title: 'Module 4 quiz',
    dueAt: '2026-05-14',
    type: 'assessment',
    href: '/academy/learn/web-development/modules/wd-m4/assessment',
  },
  {
    id: 'ms-recipe',
    title: 'Recipe Finder project deadline',
    dueAt: '2026-05-19',
    type: 'module',
    href: '/academy/learn/web-development/projects/wd-recipe-finder',
  },
  {
    id: 'ms-3',
    title: 'Cohort showcase: Mini-projects',
    dueAt: '2026-05-22',
    type: 'event',
  },
  {
    id: 'ms-4',
    title: 'Capstone kickoff briefing',
    dueAt: '2026-06-15',
    type: 'capstone',
  },
];

export const mockCohortHighlights = [
  {
    id: 'ch-1',
    studentName: 'Eric Niyongabo',
    initials: 'EN',
    title: 'Shipped a recipe finder',
    description: 'Module 5 capstone went live with mentor approval this week.',
    pathSlug: 'web-development',
  },
  {
    id: 'ch-2',
    studentName: 'Aline Uwase',
    initials: 'AU',
    title: 'First open-source PR merged',
    description: 'Got her first contribution merged into a Rwandan dev tools repo.',
    pathSlug: 'web-development',
  },
  {
    id: 'ch-3',
    studentName: 'Diane Mukamana',
    initials: 'DM',
    title: 'Trained a sentiment classifier',
    description: 'Hit 92% accuracy on her first week with PyTorch.',
    pathSlug: 'ai-ml',
  },
  {
    id: 'ch-4',
    studentName: 'Brian Mugisha',
    initials: 'BM',
    title: 'LinkedIn revamp landed an interview',
    description: 'New headline and project section booked his first recruiter chat.',
    pathSlug: 'professional-branding',
  },
];

export const mockRecommendations = [
  {
    id: 'rec-1',
    kind: 'stretch',
    title: 'Try a stretch project: Multi-step form',
    description: 'You\'re doing well — this project will solidify state lifting before quiz day.',
    actionLabel: 'View project',
  },
  {
    id: 'rec-2',
    kind: 'bridge',
    title: 'Bridge course unlocked: Accessibility 101',
    description: 'Recommended before Module 6 (Testing & Accessibility). Free, ~2 hours.',
    actionLabel: 'Start course',
  },
];

export const mockResources = [
  { id: 'r-1', label: 'Office hours calendar', icon: 'CalendarDays', href: '#' },
  { id: 'r-2', label: 'Cohort space', icon: 'Users', href: '#' },
  { id: 'r-3', label: 'Capstone briefs', icon: 'FolderOpen', href: '#' },
  { id: 'r-4', label: 'Help center', icon: 'LifeBuoy', href: '#' },
];

// Returns 'Good morning' / 'Good afternoon' / 'Good evening' for the user's
// browser-local time. Used by the dashboard header.
export function timeOfDayGreeting(date = new Date()) {
  const h = date.getHours();
  if (h < 12) return 'Good morning';
  if (h < 18) return 'Good afternoon';
  return 'Good evening';
}
