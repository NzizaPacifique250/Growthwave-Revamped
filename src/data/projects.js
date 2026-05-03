// Per-path project fixtures. Module-linked Recipe Finder is the demo focus
// for Web Development; capstone is a stub that resolves to the same surface
// but with a partner-brief framing.

export const projects = {
  'wd-recipe-finder': {
    id: 'wd-recipe-finder',
    pathSlug: 'web-development',
    linkedModuleId: 'wd-m4',
    kind: 'module',
    title: 'Recipe Finder',
    partnerName: 'Awesomity Lab (sample partner brief)',
    estimatedHours: 8,
    dueAt: '2026-05-19',
    briefSummary:
      'Build a Recipe Finder web app that lets a hungry student filter a list of recipes by ingredient and difficulty.',
    briefDetail: [
      {
        kind: 'p',
        text: "Awesomity Lab's intern team needs a quick recipe-browsing tool for their internal hackathon. Your job: design and ship a small React app that meets a specific brief.",
      },
      { kind: 'h3', text: 'What you will demonstrate' },
      {
        kind: 'p',
        text: 'Component composition, state management with useState, controlled inputs, and lifting state up. The skills from Module 4 in a real-feeling artifact.',
      },
      { kind: 'h3', text: 'Constraints' },
      {
        kind: 'p',
        text: 'No backend — read recipes from the bundled JSON. Style with Tailwind or plain CSS. Mobile-friendly is a nice-to-have but not required.',
      },
    ],
    requirements: [
      {
        id: 'req-search',
        title: 'Search by ingredient',
        description:
          'A text input that filters the list by ingredient as you type. Case-insensitive substring match is fine.',
      },
      {
        id: 'req-filter',
        title: 'Filter by difficulty',
        description:
          'Three difficulty options (Easy / Medium / Hard) shown as toggles. Multiple can be active.',
      },
      {
        id: 'req-detail',
        title: 'Recipe detail view',
        description: 'Clicking a recipe opens a detail panel with full ingredient list and steps.',
      },
      {
        id: 'req-empty',
        title: 'Empty state',
        description: 'When no recipes match the filters, show a friendly empty-state message.',
      },
    ],
    resources: [
      { kind: 'lesson', label: 'Lesson · State and useState', moduleId: 'wd-m4', lessonId: 'wd-m4-l4' },
      { kind: 'lesson', label: 'Lesson · Lifting state up', moduleId: 'wd-m4', lessonId: 'wd-m4-l5' },
      { kind: 'doc', label: 'Partner brief PDF', href: '#' },
      { kind: 'doc', label: 'React docs · State', href: 'https://react.dev/learn/state-a-components-memory' },
    ],
    templates: [
      {
        id: 'react-starter',
        label: 'React starter (recommended)',
        description: 'Vite + React 18 + Tailwind. Routes wired up.',
      },
      {
        id: 'plain-js',
        label: 'Plain JS starter',
        description: 'No framework — practice with vanilla DOM.',
      },
      { id: 'empty', label: 'Empty repo', description: 'You set up the toolchain.' },
    ],
    files: [
      {
        id: 'app',
        name: 'App.jsx',
        language: 'jsx',
        starterContent: `import { useState } from 'react';\nimport recipes from './recipes.json';\n\nexport default function App() {\n  const [query, setQuery] = useState('');\n  // TODO: filter recipes by query\n  const visible = recipes;\n  return (\n    <main>\n      <h1>Recipe Finder</h1>\n      <input\n        value={query}\n        onChange={(e) => setQuery(e.target.value)}\n        placeholder=\"Filter by ingredient...\"\n      />\n      <ul>\n        {visible.map((r) => (\n          <li key={r.id}>{r.title} — {r.difficulty}</li>\n        ))}\n      </ul>\n    </main>\n  );\n}`,
      },
      {
        id: 'recipes',
        name: 'recipes.json',
        language: 'json',
        starterContent: `[\n  {\n    \"id\": \"r1\",\n    \"title\": \"Rwandan ubugali with isombe\",\n    \"difficulty\": \"Medium\",\n    \"ingredients\": [\"cassava flour\", \"cassava leaves\", \"palm oil\", \"onion\", \"tomato\"],\n    \"steps\": [\"Boil leaves\", \"Stir flour into hot water\", \"Combine and serve\"]\n  },\n  {\n    \"id\": \"r2\",\n    \"title\": \"Banana fritters\",\n    \"difficulty\": \"Easy\",\n    \"ingredients\": [\"banana\", \"flour\", \"sugar\", \"oil\"],\n    \"steps\": [\"Mash bananas\", \"Mix with flour\", \"Fry until golden\"]\n  },\n  {\n    \"id\": \"r3\",\n    \"title\": \"Pilau rice\",\n    \"difficulty\": \"Hard\",\n    \"ingredients\": [\"basmati rice\", \"beef\", \"pilau masala\", \"onion\", \"garlic\"],\n    \"steps\": [\"Brown beef\", \"Toast spices\", \"Simmer rice\"]\n  }\n]`,
      },
    ],
    mentor: {
      name: 'Eric Niyongabo',
      initials: 'EN',
      role: 'Mentor · Web Development',
      availability: 'Office hours Tue + Thu 18:00 CAT',
    },
    // Mock peer reviewer pool — used to seed the review queue when the
    // student requests a review. Comments are realistic-looking, varied.
    seededReviews: [
      {
        reviewer: { name: 'Aline Uwase', initials: 'AU' },
        rubric: { code: 8, design: 7, polish: 8 },
        comment:
          "Filtering logic is clean and the empty state caught my eye. Consider extracting the filter controls into a Filters component — your App is doing a lot.",
        kudos: ['Empty state is a nice touch', 'State naming is clear'],
        suggestions: ['Extract filters into a child component', 'Add keyboard handling on Enter for the search'],
      },
      {
        reviewer: { name: 'Brian Mugisha', initials: 'BM' },
        rubric: { code: 7, design: 8, polish: 7 },
        comment:
          "Search works well. Difficulty filter feels off — toggling Easy and Medium currently shows nothing because of an && where || would fit better.",
        kudos: ['Mobile layout is solid', 'Readable JSX'],
        suggestions: ['Fix difficulty filter logic', 'Consider memoizing the filtered list once it grows'],
      },
      {
        reviewer: { name: 'Diane Mukamana', initials: 'DM' },
        rubric: { code: 9, design: 8, polish: 9 },
        comment:
          "Great work. Detail panel transition is smooth and the recipe data layout is clean. One nit: the long ingredient list in Pilau Rice spills outside the panel on small screens.",
        kudos: ['Polished detail panel', 'Good use of semantic HTML'],
        suggestions: ['Wrap long ingredient lists', 'Add an accessible label on the search input'],
      },
    ],
    mentorNote:
      "Solid foundation, Karenzi. Consider lifting the `query` state into the parent before adding more filters — it'll save refactoring later. Looking forward to the review.",
  },

  'wd-capstone': {
    id: 'wd-capstone',
    pathSlug: 'web-development',
    linkedModuleId: 'wd-m8',
    kind: 'capstone',
    title: 'Web Development Capstone',
    partnerName: 'Awesomity Lab',
    estimatedHours: 40,
    dueAt: '2026-08-30',
    briefSummary: 'Ship a full-stack web app for a real partner brief. Mentor + employer review.',
    briefDetail: [
      {
        kind: 'p',
        text: 'Capstone briefs unlock at the end of the path. This is the artifact you take to your first interviews.',
      },
    ],
    requirements: [
      { id: 'req-design', title: 'Design doc approved by mentor', description: 'Outline goals, constraints, and tradeoffs.' },
      { id: 'req-mvp', title: 'MVP shipped to production', description: 'Live on a public URL, accessible to employers.' },
      { id: 'req-tests', title: 'Tests for critical paths', description: 'At least one happy + one edge case per flow.' },
      { id: 'req-demo', title: 'Demo video recorded', description: 'Three-minute walkthrough for cohort + employer review.' },
    ],
    resources: [],
    templates: [],
    files: [],
    mentor: {
      name: 'Aline Uwase',
      initials: 'AU',
      role: 'Capstone mentor',
      availability: 'Weekly Friday 17:00 CAT',
    },
    seededReviews: [],
  },
};

export function getProject(projectId) {
  return projects[projectId] || null;
}

// Helper: find the project linked to a given module (used by lesson nav).
export function getProjectForModule(pathSlug, moduleId) {
  return Object.values(projects).find(
    (p) => p.pathSlug === pathSlug && p.linkedModuleId === moduleId
  );
}
