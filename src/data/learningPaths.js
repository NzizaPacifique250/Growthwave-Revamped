// Core learning paths shown on Path Discovery & landing preview.
// Each path defines summary metadata, badges, outcomes, and preview chips.

export const learningPaths = [
  {
    slug: 'web-development',
    title: 'Web Development',
    tagline: 'Ship production-grade web apps with modern tooling.',
    icon: 'Code2',
    color: 'teal',
    duration: '24 weeks',
    weeklyHours: '8–12 hrs/wk',
    levelRange: 'Beginner → Industry-Ready',
    outcomeType: 'Job-Ready',
    enrollment: 1248,
    completionRate: 87,
    rating: 4.8,
    employerCount: 18,
    tags: ['HTML/CSS', 'JavaScript', 'React', 'Node.js', 'PostgreSQL'],
    previewModules: ['HTML & CSS Foundations', 'JavaScript Essentials', 'React Components'],
    sampleLesson: {
      title: 'Building Your First React Component',
      duration: '12 min',
      type: 'video',
    },
    summary:
      'Go from your first line of HTML to building, testing, and deploying full-stack applications used by real teams. Built with hiring partners in Kigali and beyond.',
    forWho: [
      'High school students with no prior coding experience',
      'Self-taught beginners ready for structure',
      'Career switchers targeting frontend or full-stack roles',
    ],
    prerequisites: ['Basic computer literacy', 'Comfortable typing in English'],
    jobTitles: ['Junior Frontend Developer', 'Full-Stack Developer', 'Web Engineer'],
    salaryRange: '$18k – $42k',
    employerLogos: ['Andela', 'Awesomity Lab', 'Irembo', 'BK Tech House'],
    hybrid: false,
  },
  {
    slug: 'ai-ml',
    title: 'AI & Machine Learning',
    tagline: 'Build, train, and ship ML systems people actually use.',
    icon: 'Brain',
    color: 'navy',
    duration: '28 weeks',
    weeklyHours: '10–14 hrs/wk',
    levelRange: 'Intermediate → Industry-Ready',
    outcomeType: 'Job-Ready',
    enrollment: 612,
    completionRate: 81,
    rating: 4.7,
    employerCount: 11,
    tags: ['Python', 'NumPy', 'PyTorch', 'LLMs', 'MLOps'],
    previewModules: ['Python for ML', 'Linear Regression Hands-On', 'Your First Neural Network'],
    sampleLesson: {
      title: 'Training a Sentiment Classifier in 30 Minutes',
      duration: '18 min',
      type: 'interactive',
    },
    summary:
      'A rigorous introduction to applied machine learning — from notebooks to production. Includes a capstone where you train and deploy a real model with mentor review.',
    forWho: [
      'Students comfortable with Python basics',
      'Builders curious about LLMs and modern AI',
      'Aspiring ML engineers and data scientists',
    ],
    prerequisites: ['Comfort with basic Python', 'High school algebra'],
    jobTitles: ['ML Engineer (Junior)', 'Data Scientist', 'Applied AI Engineer'],
    salaryRange: '$22k – $55k',
    employerLogos: ['Zipline', 'AC Group', 'Carnegie Mellon Africa', 'Ampersand'],
    hybrid: false,
  },
  {
    slug: 'professional-branding',
    title: 'Professional Branding',
    tagline: 'Show up online the way employers want to find you.',
    icon: 'Sparkles',
    color: 'amber',
    duration: '8 weeks',
    weeklyHours: '4–6 hrs/wk',
    levelRange: 'All levels',
    outcomeType: 'Career Boost',
    enrollment: 894,
    completionRate: 92,
    rating: 4.9,
    employerCount: 24,
    tags: ['Resume', 'LinkedIn', 'Portfolio', 'Interviewing', 'Networking'],
    previewModules: ['LinkedIn That Recruiters Actually Open', 'Resume Storytelling', 'Portfolio Sites in a Weekend'],
    sampleLesson: {
      title: 'Writing a LinkedIn Headline That Lands Interviews',
      duration: '9 min',
      type: 'video',
    },
    summary:
      'Pair your technical skills with a brand that opens doors. Build a recruiter-ready resume, LinkedIn, and portfolio — reviewed by working hiring managers.',
    forWho: [
      'Students preparing for first internships or jobs',
      'Engineers whose skills outpace their visibility',
      'Anyone targeting remote or international roles',
    ],
    prerequisites: ['None — bring whatever you have today'],
    jobTitles: ['Internship-Ready Candidate', 'Junior Roles (any track)'],
    salaryRange: 'Boosts placement velocity 2–3x',
    employerLogos: ['Andela', 'Klab', 'Norrsken', 'BK Tech House'],
    hybrid: false,
  },
  {
    slug: 'fullstack-ai',
    title: 'Full-Stack + AI',
    tagline: 'The hybrid path for builders who want to ship AI products.',
    icon: 'Layers',
    color: 'teal',
    duration: '36 weeks',
    weeklyHours: '12–15 hrs/wk',
    levelRange: 'Intermediate → Industry-Ready',
    outcomeType: 'Specialized',
    enrollment: 287,
    completionRate: 78,
    rating: 4.9,
    employerCount: 9,
    tags: ['React', 'Node.js', 'Python', 'LLM APIs', 'Vector DBs', 'RAG'],
    previewModules: ['Full-Stack Refresher', 'LLM Application Patterns', 'Building a RAG App'],
    sampleLesson: {
      title: 'Wiring an LLM to a Live Database',
      duration: '22 min',
      type: 'project',
    },
    summary:
      'A hybrid track that combines our Web Development core with the AI/ML curriculum. Designed for students who want to build full AI products end-to-end.',
    forWho: [
      'Graduates of foundational coding courses',
      'Self-taught developers wanting structured AI training',
      'Founders and product builders',
    ],
    prerequisites: ['Working knowledge of JavaScript or Python', 'Have built at least one app before'],
    jobTitles: ['AI Product Engineer', 'Full-Stack ML Engineer', 'Founding Engineer'],
    salaryRange: '$28k – $70k',
    employerLogos: ['Andela', 'Zipline', 'Ampersand', 'BK Tech House'],
    hybrid: true,
  },
];

export const pathFilters = {
  difficulty: [
    { id: 'beginner', label: 'Beginner' },
    { id: 'intermediate', label: 'Intermediate' },
    { id: 'all-levels', label: 'All Levels' },
  ],
  duration: [
    { id: 'short', label: '< 12 weeks' },
    { id: 'medium', label: '12–24 weeks' },
    { id: 'long', label: '24+ weeks' },
  ],
  outcome: [
    { id: 'job-ready', label: 'Job-Ready' },
    { id: 'career-boost', label: 'Career Boost' },
    { id: 'specialized', label: 'Specialized' },
  ],
};

export const partnerLogos = [
  'Andela',
  'Zipline',
  'Irembo',
  'Awesomity',
  'BK Tech House',
  'AC Group',
  'Norrsken',
  'Ampersand',
];

export const platformStats = [
  { label: 'Students enrolled', value: '3,041+' },
  { label: 'Average completion', value: '85%' },
  { label: 'Hiring partners', value: '24' },
  { label: 'Cohorts shipped', value: '11' },
];

export function getPathBySlug(slug) {
  return learningPaths.find((p) => p.slug === slug);
}
