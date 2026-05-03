// Skill assessment data model. 5 steps matching the spec stepper.
// Each option carries `weights` mapping path slug -> points contributed.
// `adaptive` rules let later steps respond to earlier answers without
// hard-coding branches in the page component.

export const assessmentSteps = [
  {
    id: 'experience',
    label: 'Experience',
    title: 'Where are you starting from?',
    helper: 'Pick the option that best describes you today. There is no wrong answer.',
    estMinutes: 1,
    type: 'single',
    options: [
      {
        id: 'never',
        label: 'I have never written code',
        description: 'You are starting fresh — that is great.',
        weights: { 'web-development': 25, 'professional-branding': 20, 'ai-ml': -10, 'fullstack-ai': -20 },
      },
      {
        id: 'hobbyist',
        label: 'I have dabbled — tutorials, scripts, small things',
        description: 'You know the basics but have not shipped much.',
        weights: { 'web-development': 20, 'ai-ml': 5, 'professional-branding': 15, 'fullstack-ai': 5 },
      },
      {
        id: 'shipped',
        label: 'I have built and shipped at least one app',
        description: 'You are ready for harder, more applied work.',
        weights: { 'web-development': 10, 'ai-ml': 15, 'fullstack-ai': 25, 'professional-branding': 15 },
      },
      {
        id: 'pro',
        label: 'I am already working as an engineer',
        description: 'You want depth, specialization, or a brand boost.',
        weights: { 'fullstack-ai': 30, 'ai-ml': 20, 'professional-branding': 25, 'web-development': -5 },
      },
    ],
  },
  {
    id: 'skills',
    label: 'Current skills',
    title: 'What do you already feel comfortable with?',
    helper: 'Select everything you can use today, even at a basic level.',
    estMinutes: 1,
    type: 'multi',
    skipIfAnswer: { stepId: 'experience', is: 'never' },
    options: [
      { id: 'html-css', label: 'HTML & CSS', weights: { 'web-development': 5, 'fullstack-ai': 3 } },
      { id: 'js', label: 'JavaScript', weights: { 'web-development': 10, 'fullstack-ai': 8 } },
      { id: 'react', label: 'React or another UI framework', weights: { 'web-development': 8, 'fullstack-ai': 10 } },
      { id: 'python', label: 'Python', weights: { 'ai-ml': 15, 'fullstack-ai': 8 } },
      { id: 'numpy', label: 'NumPy / pandas', weights: { 'ai-ml': 12 } },
      { id: 'ml-basics', label: 'ML basics (regression, classification)', weights: { 'ai-ml': 18, 'fullstack-ai': 10 } },
      { id: 'llm', label: 'Working with LLM APIs', weights: { 'ai-ml': 10, 'fullstack-ai': 15 } },
      { id: 'git', label: 'Git & version control', weights: { 'web-development': 4, 'fullstack-ai': 6, 'ai-ml': 4 } },
      { id: 'sql', label: 'SQL / databases', weights: { 'web-development': 6, 'fullstack-ai': 8, 'ai-ml': 4 } },
    ],
  },
  {
    id: 'goals',
    label: 'Goals',
    title: 'What are you trying to make happen?',
    helper: 'You can pick more than one. We will weigh the strongest signal.',
    estMinutes: 1,
    type: 'multi',
    options: [
      {
        id: 'first-job',
        label: 'Land my first tech job',
        weights: { 'web-development': 35, 'professional-branding': 18, 'ai-ml': 8, 'fullstack-ai': 12 },
      },
      {
        id: 'build-product',
        label: 'Build my own product or startup',
        weights: { 'fullstack-ai': 30, 'web-development': 15, 'ai-ml': 12 },
      },
      {
        id: 'level-up',
        label: 'Level up in my current role',
        weights: { 'ai-ml': 18, 'fullstack-ai': 22, 'professional-branding': 12, 'web-development': 5 },
      },
      {
        id: 'explore-ai',
        label: 'Explore AI and machine learning',
        weights: { 'ai-ml': 30, 'fullstack-ai': 20 },
      },
      {
        id: 'rebrand',
        label: 'Get visible to recruiters',
        weights: { 'professional-branding': 35, 'web-development': 5, 'ai-ml': 5 },
      },
    ],
  },
  {
    id: 'time',
    label: 'Time',
    title: 'How much time can you commit each week?',
    helper: 'Be realistic — we use this to recommend a track that fits your life.',
    estMinutes: 1,
    type: 'slider',
    min: 2,
    max: 20,
    step: 1,
    default: 8,
    unit: 'hrs/week',
    bands: [
      { max: 5, weights: { 'professional-branding': 15, 'web-development': -5, 'ai-ml': -10, 'fullstack-ai': -20 } },
      { max: 9, weights: { 'web-development': 10, 'professional-branding': 8, 'ai-ml': 5, 'fullstack-ai': -5 } },
      { max: 13, weights: { 'web-development': 15, 'ai-ml': 15, 'fullstack-ai': 10, 'professional-branding': 5 } },
      { max: 25, weights: { 'web-development': 12, 'ai-ml': 20, 'fullstack-ai': 25, 'professional-branding': 5 } },
    ],
  },
  {
    id: 'style',
    label: 'Style',
    title: 'How do you learn best?',
    helper: 'Pick the combination that feels most like you.',
    estMinutes: 1,
    type: 'single',
    options: [
      {
        id: 'fast-independent',
        label: 'Fast-paced, independent',
        description: 'Push hard solo, ship fast, ask for help when stuck.',
        weights: { 'fullstack-ai': 15, 'ai-ml': 10, 'web-development': 5 },
      },
      {
        id: 'fast-collab',
        label: 'Fast-paced, collaborative',
        description: 'Ship fast with study groups and mentor check-ins.',
        weights: { 'web-development': 15, 'fullstack-ai': 10, 'ai-ml': 8 },
      },
      {
        id: 'methodical-independent',
        label: 'Methodical, independent',
        description: 'Steady pace, depth over speed, mostly solo.',
        weights: { 'ai-ml': 15, 'web-development': 10, 'professional-branding': 5 },
      },
      {
        id: 'methodical-collab',
        label: 'Methodical, collaborative',
        description: 'Steady pace, peer review, lots of feedback.',
        weights: { 'professional-branding': 20, 'web-development': 12, 'ai-ml': 8 },
      },
    ],
  },
];

export const assessmentTips = [
  'Your answers are private — only used to recommend a path.',
  'You can skip any step or change answers before submitting.',
  'Most students finish in under 4 minutes.',
];
