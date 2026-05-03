import { assessmentSteps } from '../data/assessmentQuestions.js';
import { learningPaths, getPathBySlug } from '../data/learningPaths.js';

const ALL_PATHS = learningPaths.map((p) => p.slug);

// Generate human-readable reasoning for a path based on which answers
// contributed the most points to it.
function explain(slug, answers, contributions) {
  const reasons = [];

  if (answers.experience === 'never' && slug === 'web-development') {
    reasons.push('Right ramp for someone starting from scratch');
  }
  if (answers.experience === 'pro' && (slug === 'fullstack-ai' || slug === 'ai-ml')) {
    reasons.push('Built for engineers who want depth');
  }
  if (answers.goals?.includes('explore-ai') && (slug === 'ai-ml' || slug === 'fullstack-ai')) {
    reasons.push('Matches your interest in AI/ML');
  }
  if (answers.goals?.includes('first-job') && slug === 'web-development') {
    reasons.push('Highest job-placement rate of all paths');
  }
  if (answers.goals?.includes('rebrand') && slug === 'professional-branding') {
    reasons.push('Direct answer to recruiter visibility');
  }
  if (answers.goals?.includes('build-product') && slug === 'fullstack-ai') {
    reasons.push('Designed for product builders');
  }
  if (answers.time !== undefined && answers.time < 6 && slug === 'professional-branding') {
    reasons.push('Fits a tight weekly schedule');
  }
  if (answers.time !== undefined && answers.time >= 12 && slug === 'fullstack-ai') {
    reasons.push('Matches your weekly commitment');
  }
  if (answers.skills?.length >= 3 && (slug === 'fullstack-ai' || slug === 'ai-ml')) {
    reasons.push('Your existing skills carry forward');
  }

  // Fallback so every path has at least one explanation.
  if (reasons.length === 0) {
    const top = contributions
      .filter((c) => c.points > 0)
      .sort((a, b) => b.points - a.points)
      .slice(0, 1);
    if (top.length) {
      reasons.push(`Strongest signal: ${top[0].source}`);
    } else {
      reasons.push('A solid alternative worth considering');
    }
  }

  return reasons;
}

function applyWeights(scores, contributionsByPath, weights, source) {
  if (!weights) return;
  for (const slug of Object.keys(weights)) {
    if (scores[slug] === undefined) continue;
    const points = weights[slug];
    scores[slug] += points;
    if (points !== 0) {
      contributionsByPath[slug].push({ source, points });
    }
  }
}

// Score answers and return the recommendation payload. Pure — no side effects.
// `answers` shape: { experience: 'pro', skills: ['js','python'], goals: [...], time: 10, style: '...' }
export function scoreAnswers(answers) {
  const scores = Object.fromEntries(ALL_PATHS.map((slug) => [slug, 0]));
  const contributionsByPath = Object.fromEntries(ALL_PATHS.map((slug) => [slug, []]));

  for (const step of assessmentSteps) {
    const value = answers[step.id];
    if (value === undefined || value === null) continue;
    if (step.type === 'single') {
      const opt = step.options.find((o) => o.id === value);
      if (opt) applyWeights(scores, contributionsByPath, opt.weights, opt.label);
    } else if (step.type === 'multi') {
      for (const id of value) {
        const opt = step.options.find((o) => o.id === id);
        if (opt) applyWeights(scores, contributionsByPath, opt.weights, opt.label);
      }
    } else if (step.type === 'slider') {
      const band = step.bands.find((b) => value <= b.max);
      if (band) applyWeights(scores, contributionsByPath, band.weights, `${value} ${step.unit}`);
    }
  }

  const ranked = ALL_PATHS
    .map((slug) => ({
      slug,
      path: getPathBySlug(slug),
      score: scores[slug],
      contributions: contributionsByPath[slug],
      reasons: explain(slug, answers, contributionsByPath[slug]),
    }))
    .sort((a, b) => b.score - a.score);

  const [recommended, ...alternatives] = ranked;
  const second = alternatives[0];
  // Confidence = relative gap between #1 and #2, normalized.
  const gap = recommended.score - (second?.score ?? 0);
  const max = Math.max(recommended.score, 1);
  const confidence = Math.min(100, Math.round(50 + (gap / max) * 50));

  return {
    recommended,
    alternatives: alternatives.slice(0, 2),
    confidence,
    answers,
    completedAt: new Date().toISOString(),
  };
}

// Predicate used by the page to decide whether to show the next step,
// honoring the `skipIfAnswer` rule on a step.
export function shouldShowStep(step, answers) {
  if (!step.skipIfAnswer) return true;
  const { stepId, is } = step.skipIfAnswer;
  return answers[stepId] !== is;
}
