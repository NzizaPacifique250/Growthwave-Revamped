// Detailed module breakdowns and FAQs per path. Keyed by path slug.

export const pathCurriculum = {
  'web-development': [
    {
      phase: 'Foundations',
      weeks: '1–6',
      modules: [
        {
          title: 'HTML & CSS Foundations',
          objectives: ['Semantic HTML', 'Modern CSS (Flexbox, Grid)', 'Responsive layouts'],
          project: 'Personal portfolio landing page',
          duration: '2 weeks',
        },
        {
          title: 'JavaScript Essentials',
          objectives: ['Variables, control flow, functions', 'DOM manipulation', 'Async basics'],
          project: 'Interactive quiz app',
          duration: '3 weeks',
        },
        {
          title: 'Version Control with Git',
          objectives: ['Git fundamentals', 'GitHub workflows', 'Pull requests & code review'],
          project: 'Open-source contribution sprint',
          duration: '1 week',
        },
      ],
    },
    {
      phase: 'Frontend',
      weeks: '7–14',
      modules: [
        {
          title: 'React Components',
          objectives: ['Components & props', 'State and effects', 'Composition patterns'],
          project: 'Recipe finder web app',
          duration: '3 weeks',
        },
        {
          title: 'Routing & State Management',
          objectives: ['Client-side routing', 'Global state', 'Forms and validation'],
          project: 'Multi-page e-commerce front',
          duration: '3 weeks',
        },
        {
          title: 'Testing & Accessibility',
          objectives: ['Unit & integration testing', 'A11y best practices'],
          project: 'A11y audit and remediation',
          duration: '2 weeks',
        },
      ],
    },
    {
      phase: 'Backend & Capstone',
      weeks: '15–24',
      modules: [
        {
          title: 'Node.js & APIs',
          objectives: ['HTTP fundamentals', 'Express APIs', 'Auth basics'],
          project: 'REST API for a real client brief',
          duration: '3 weeks',
        },
        {
          title: 'Databases with PostgreSQL',
          objectives: ['Schema design', 'SQL queries', 'Migrations'],
          project: 'Data layer for capstone app',
          duration: '2 weeks',
        },
        {
          title: 'Capstone: Real-World Web App',
          objectives: ['Scope a real problem', 'Ship to production', 'Mentor + peer review'],
          project: 'Full-stack capstone with employer review',
          duration: '5 weeks',
        },
      ],
    },
  ],
  'ai-ml': [
    {
      phase: 'Foundations',
      weeks: '1–8',
      modules: [
        {
          title: 'Python for ML',
          objectives: ['Python idioms', 'NumPy & pandas', 'Notebook workflows'],
          project: 'Exploratory data analysis on an open dataset',
          duration: '3 weeks',
        },
        {
          title: 'Math You Actually Need',
          objectives: ['Linear algebra basics', 'Statistics intuition', 'Calculus refresher'],
          project: 'Implement gradient descent from scratch',
          duration: '2 weeks',
        },
        {
          title: 'Classical ML',
          objectives: ['Regression', 'Classification', 'Evaluation metrics'],
          project: 'Build a churn prediction model',
          duration: '3 weeks',
        },
      ],
    },
    {
      phase: 'Modern AI',
      weeks: '9–18',
      modules: [
        {
          title: 'Deep Learning Basics',
          objectives: ['Neural network fundamentals', 'PyTorch hands-on', 'Training loops'],
          project: 'Image classifier with transfer learning',
          duration: '4 weeks',
        },
        {
          title: 'NLP & LLMs',
          objectives: ['Embeddings', 'Transformers', 'Working with LLM APIs'],
          project: 'LLM-powered support assistant',
          duration: '3 weeks',
        },
        {
          title: 'MLOps Essentials',
          objectives: ['Experiment tracking', 'Model serving', 'Monitoring'],
          project: 'Deploy a model behind an API',
          duration: '3 weeks',
        },
      ],
    },
    {
      phase: 'Capstone',
      weeks: '19–28',
      modules: [
        {
          title: 'Industry Capstone',
          objectives: ['Scope a real ML problem', 'Ship a model with monitoring', 'Mentor + employer review'],
          project: 'End-to-end ML system with employer review',
          duration: '10 weeks',
        },
      ],
    },
  ],
  'professional-branding': [
    {
      phase: 'Brand Audit',
      weeks: '1–2',
      modules: [
        {
          title: 'Where You Are Today',
          objectives: ['LinkedIn audit', 'Resume audit', 'Goal mapping'],
          project: 'Personal brand baseline report',
          duration: '1 week',
        },
        {
          title: 'Target Roles & Stories',
          objectives: ['Pick target roles', 'Map achievements to stories'],
          project: 'Story bank with 5 polished stories',
          duration: '1 week',
        },
      ],
    },
    {
      phase: 'Brand Build',
      weeks: '3–6',
      modules: [
        {
          title: 'Resume That Lands Interviews',
          objectives: ['ATS basics', 'Achievement statements', 'Role-specific versioning'],
          project: 'Recruiter-ready resume with mentor review',
          duration: '2 weeks',
        },
        {
          title: 'LinkedIn That Opens Doors',
          objectives: ['Headline & summary', 'Posts that get noticed', 'Outreach scripts'],
          project: 'Optimized LinkedIn + first outreach sprint',
          duration: '1 week',
        },
        {
          title: 'Portfolio Sites in a Weekend',
          objectives: ['Pick a stack', 'Project storytelling', 'Custom domain'],
          project: 'Live portfolio site',
          duration: '1 week',
        },
      ],
    },
    {
      phase: 'Launch',
      weeks: '7–8',
      modules: [
        {
          title: 'Mock Interviews',
          objectives: ['Behavioral practice', 'Technical screens', 'Salary conversations'],
          project: 'Three recorded mock interviews with feedback',
          duration: '1 week',
        },
        {
          title: 'Application Sprint',
          objectives: ['Tracker setup', 'Outreach cadence', 'Follow-up workflows'],
          project: '20 targeted applications submitted',
          duration: '1 week',
        },
      ],
    },
  ],
  'fullstack-ai': [
    {
      phase: 'Full-Stack Refresher',
      weeks: '1–8',
      modules: [
        {
          title: 'Modern Web Foundations',
          objectives: ['React essentials', 'Node + APIs', 'Databases'],
          project: 'Full-stack starter app',
          duration: '4 weeks',
        },
        {
          title: 'Python for Backends',
          objectives: ['FastAPI basics', 'Async Python', 'Background jobs'],
          project: 'Microservice for a real brief',
          duration: '4 weeks',
        },
      ],
    },
    {
      phase: 'AI Application Patterns',
      weeks: '9–22',
      modules: [
        {
          title: 'LLM Application Patterns',
          objectives: ['Prompting that works', 'Tool use & function calling', 'Evals'],
          project: 'Internal tool powered by an LLM',
          duration: '5 weeks',
        },
        {
          title: 'RAG & Vector Databases',
          objectives: ['Embeddings', 'Retrieval pipelines', 'Quality evaluation'],
          project: 'Production-grade RAG application',
          duration: '5 weeks',
        },
        {
          title: 'Agents in Production',
          objectives: ['Agent design', 'Safety & guardrails', 'Observability'],
          project: 'Agent that completes real tasks',
          duration: '4 weeks',
        },
      ],
    },
    {
      phase: 'Capstone',
      weeks: '23–36',
      modules: [
        {
          title: 'AI Product Capstone',
          objectives: ['Scope', 'Ship', 'Iterate with users'],
          project: 'Full AI product with employer + mentor review',
          duration: '14 weeks',
        },
      ],
    },
  ],
};

export const pathFaqs = {
  'web-development': [
    {
      q: 'Do I need to know how to code already?',
      a: 'No — this path starts at zero and ramps you up methodically. About a third of our students write their first line of code in week 1.',
    },
    {
      q: 'How much time do I need each week?',
      a: '8–12 hours per week is the sweet spot. We design lessons in 30–45 minute blocks so you can fit them around school or work.',
    },
    {
      q: 'What does the capstone look like?',
      a: 'You\'ll build a real app for a partner brief, get it reviewed by a working engineer, and present it during demo week.',
    },
  ],
  'ai-ml': [
    {
      q: 'How much math do I really need?',
      a: 'High-school level math with a willingness to revisit basics. We teach the math you need as you need it — no abstract proofs.',
    },
    {
      q: 'Do I need a powerful computer?',
      a: 'No — most labs run in browser-based notebooks. We provide cloud GPU credits for the heavier modules.',
    },
    {
      q: 'Can I take this if I\'ve never used PyTorch?',
      a: 'Yes. We onboard you through PyTorch from first principles in week 9.',
    },
  ],
  'professional-branding': [
    {
      q: 'Is this useful even if I\'m still learning to code?',
      a: 'Absolutely. The earlier you build a brand, the more compounding it does. Many of our students land internships during this path.',
    },
    {
      q: 'Do I get my resume reviewed by a real recruiter?',
      a: 'Yes — every student gets at least one full review by a working hiring manager.',
    },
    {
      q: 'How is this different from a resume template?',
      a: 'Templates give you structure. We help you find your story, build evidence behind it, and apply with confidence.',
    },
  ],
  'fullstack-ai': [
    {
      q: 'Is this realistic if I have a full-time job?',
      a: 'It\'s the most demanding path we offer. Most students take it part-time over 9 months.',
    },
    {
      q: 'Do I need to have shipped an app before?',
      a: 'Yes — we recommend completing our Web Development path or having equivalent experience first.',
    },
    {
      q: 'What\'s included in the capstone?',
      a: 'You ship a real AI product with paying users or a partner brief. Mentor and employer review built in.',
    },
  ],
};

export function getCurriculum(slug) {
  return pathCurriculum[slug] || [];
}

export function getFaqs(slug) {
  return pathFaqs[slug] || [];
}
