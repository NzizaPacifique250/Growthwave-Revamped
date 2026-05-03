// Mock pricing for the enrollment wizard. USD prices with an RWF conversion
// for the Rwanda audience. No real billing — fields validate shape only.

export const billingCurrencies = [
  { id: 'USD', label: 'USD', symbol: '$', rate: 1 },
  { id: 'RWF', label: 'RWF', symbol: 'RWF ', rate: 1290 },
];

export const enrollmentPlans = [
  {
    id: 'monthly',
    label: 'Monthly',
    cadence: 'per month',
    priceUsd: 39,
    annualEquivalentUsd: 468,
    badge: null,
    description: 'Most flexibility — cancel any time.',
    features: [
      'AI mentor on WhatsApp',
      'Mentor + peer code review',
      'Monthly cohort access',
      'Cancel any time',
    ],
  },
  {
    id: 'quarterly',
    label: 'Quarterly',
    cadence: 'per 3 months',
    priceUsd: 99,
    annualEquivalentUsd: 396,
    badge: 'Save 15%',
    description: 'Steady commitment, lower per-month cost.',
    features: [
      'Everything in Monthly',
      'Project review queue priority',
      'Discounted by 15%',
    ],
  },
  {
    id: 'annual',
    label: 'Annual',
    cadence: 'per year',
    priceUsd: 299,
    annualEquivalentUsd: 299,
    badge: 'Recommended',
    description: 'Lowest cost. Best for capstone-bound students.',
    features: [
      'Everything in Quarterly',
      'Capstone employer review',
      'Career coaching included',
      'Discounted by 36%',
    ],
  },
];

export function formatCurrency(amountUsd, currency) {
  const c = billingCurrencies.find((x) => x.id === currency) || billingCurrencies[0];
  const value = amountUsd * c.rate;
  if (c.id === 'RWF') {
    return `${c.symbol}${Math.round(value).toLocaleString()}`;
  }
  return `${c.symbol}${value.toLocaleString(undefined, { maximumFractionDigits: 0 })}`;
}

export function getPlan(planId) {
  return enrollmentPlans.find((p) => p.id === planId) || null;
}

export const onboardingChecklist = [
  {
    id: 'orientation',
    title: 'Watch 2-minute orientation',
    description: 'Meet your mentor team and learn how the platform works.',
    actionLabel: 'Watch now',
  },
  {
    id: 'whatsapp',
    title: 'Connect the WhatsApp AI Mentor',
    description: 'Save the bot to your phone so you can ask questions any time.',
    actionLabel: 'Get the link',
  },
  {
    id: 'cohort',
    title: 'Join your cohort space',
    description: 'Meet the other students starting alongside you.',
    actionLabel: 'Join now',
  },
];
