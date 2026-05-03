import { getSkillLessons } from '../data/moduleAssessments.js';

// Pure scorer for module assessments. `answers` is keyed by question id and
// stores the student's choice(s):
//   single / code-output: number (selected index)
//   multi: number[] (selected indices, order doesn't matter)
export function scoreAssessment({ assessment, answers, pathSlug, moduleId }) {
  const total = assessment.questions.length;
  const byQuestion = assessment.questions.map((q) => {
    const given = answers[q.id];
    const correct = isAnswerCorrect(q, given);
    return {
      questionId: q.id,
      skillTag: q.skillTag,
      given,
      correct,
      explanation: q.explanation,
    };
  });

  const correctCount = byQuestion.filter((r) => r.correct).length;
  const scorePercent = Math.round((correctCount / total) * 100);
  const passed = scorePercent >= assessment.passingScore;
  const mastered = scorePercent >= assessment.masteryScore;

  // Aggregate weak skills (any skill with at least one wrong answer).
  const weakSkillSet = new Set(
    byQuestion.filter((r) => !r.correct).map((r) => r.skillTag)
  );
  const weakSkills = [...weakSkillSet];

  const recommendedRemediation = weakSkills.map((skill) => ({
    skill,
    lessonsToRevisit: getSkillLessons(pathSlug, moduleId, skill),
  }));

  // Aggregate strong skills (all questions tagged that skill were correct).
  const strongSkillSet = new Set();
  for (const skill of allSkillsIn(assessment)) {
    const qs = byQuestion.filter((r) => r.skillTag === skill);
    if (qs.length && qs.every((r) => r.correct)) strongSkillSet.add(skill);
  }
  const strongSkills = [...strongSkillSet];

  return {
    score: correctCount,
    total,
    scorePercent,
    passed,
    mastered,
    byQuestion,
    weakSkills,
    strongSkills,
    recommendedRemediation,
    completedAt: new Date().toISOString(),
  };
}

function isAnswerCorrect(question, given) {
  if (given === undefined || given === null) return false;
  if (question.type === 'single' || question.type === 'code-output') {
    return given === question.correctIndex;
  }
  if (question.type === 'multi') {
    if (!Array.isArray(given)) return false;
    const a = [...given].sort();
    const b = [...question.correctIndices].sort();
    return a.length === b.length && a.every((v, i) => v === b[i]);
  }
  return false;
}

function allSkillsIn(assessment) {
  return [...new Set(assessment.questions.map((q) => q.skillTag))];
}

export function humanizeSkill(skill) {
  return skill
    .split('-')
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join(' ');
}
