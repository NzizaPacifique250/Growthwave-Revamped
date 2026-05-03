// Student reviews and success stories. Keyed by path slug.

export const pathTestimonials = {
  'web-development': [
    {
      name: 'Karenzi Marie',
      role: 'Junior Frontend Developer at Awesomity Lab',
      avatar: 'KM',
      quote:
        'Six months ago I had never written a line of code. The capstone gave me a project I could actually show in interviews — that\'s what got me hired.',
      rating: 5,
    },
    {
      name: 'Eric Niyongabo',
      role: 'Web Engineer Intern at Irembo',
      avatar: 'EN',
      quote:
        'The mentor reviews are what set this apart. I learned more from one PR review than from weeks of YouTube tutorials.',
      rating: 5,
    },
    {
      name: 'Aline Uwase',
      role: 'Full-Stack Developer at BK Tech House',
      avatar: 'AU',
      quote:
        'I appreciated how the curriculum mirrored what we actually do at work — Git, code review, real briefs.',
      rating: 4,
    },
  ],
  'ai-ml': [
    {
      name: 'Patrick Habineza',
      role: 'ML Engineer at Zipline',
      avatar: 'PH',
      quote:
        'I came in knowing Python and left having shipped a model behind a real API. The MLOps module is worth the price alone.',
      rating: 5,
    },
    {
      name: 'Diane Mukamana',
      role: 'Data Scientist at AC Group',
      avatar: 'DM',
      quote:
        'The capstone forced me to think about evaluation and monitoring, not just accuracy. That\'s the gap most courses miss.',
      rating: 5,
    },
  ],
  'professional-branding': [
    {
      name: 'Yvette Ingabire',
      role: 'Software Engineer Intern at Andela',
      avatar: 'YI',
      quote:
        'I had skills but no one was finding me. Eight weeks later, three recruiters reached out the same week.',
      rating: 5,
    },
    {
      name: 'Brian Mugisha',
      role: 'Junior Engineer at Klab',
      avatar: 'BM',
      quote:
        'My LinkedIn went from invisible to interview-ready. The mentor feedback is honest and actionable.',
      rating: 5,
    },
  ],
  'fullstack-ai': [
    {
      name: 'Jean-Paul Kagame',
      role: 'Founding Engineer at a YC-backed startup',
      avatar: 'JK',
      quote:
        'This path is what I wish I had two years ago. It taught me how to think about AI as a product, not a science project.',
      rating: 5,
    },
  ],
};

export const headlineTestimonials = [
  {
    name: 'Karenzi Marie',
    role: 'Junior Frontend Developer · Awesomity Lab',
    avatar: 'KM',
    pathSlug: 'web-development',
    quote:
      'Six months ago I had never written a line of code. Today I\'m shipping production features with a team in Kigali.',
  },
  {
    name: 'Patrick Habineza',
    role: 'ML Engineer · Zipline',
    avatar: 'PH',
    pathSlug: 'ai-ml',
    quote:
      'The capstone got me my first ML role. The fact that I shipped a model behind an API made all the difference.',
  },
  {
    name: 'Yvette Ingabire',
    role: 'Software Engineer Intern · Andela',
    avatar: 'YI',
    pathSlug: 'professional-branding',
    quote:
      'Three recruiters reached out the week after I finished. Worth every hour.',
  },
];

export const successStats = [
  { label: 'Students placed', value: '780+' },
  { label: 'Avg. days to first offer', value: '47' },
  { label: 'Hiring partners', value: '24' },
  { label: 'Cohort completion', value: '85%' },
];

export function getTestimonialsForPath(slug) {
  return pathTestimonials[slug] || [];
}
