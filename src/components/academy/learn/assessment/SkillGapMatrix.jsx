import { humanizeSkill } from '../../../../utils/assessmentEngine.js';

export default function SkillGapMatrix({ assessment, byQuestion }) {
  // Aggregate per-skill correct/total counts.
  const skillStats = {};
  for (const q of assessment.questions) {
    if (!skillStats[q.skillTag]) skillStats[q.skillTag] = { total: 0, correct: 0 };
    skillStats[q.skillTag].total += 1;
    const r = byQuestion.find((b) => b.questionId === q.id);
    if (r?.correct) skillStats[q.skillTag].correct += 1;
  }

  const skills = Object.entries(skillStats).map(([skill, s]) => ({
    skill,
    label: humanizeSkill(skill),
    ratio: s.correct / s.total,
    correct: s.correct,
    total: s.total,
  }));

  return (
    <section className="rounded-2xl bg-white border border-gw-navy/10 shadow-card p-5 md:p-6">
      <h3 className="font-display text-xl font-bold text-gw-ink">Skills covered</h3>
      <p className="text-sm text-gw-slate mt-1">
        Here is how each skill held up in this attempt.
      </p>

      <ul className="mt-4 space-y-3">
        {skills.map((s) => (
          <li key={s.skill}>
            <div className="flex items-baseline justify-between gap-2 text-sm">
              <span className="font-semibold text-gw-ink">{s.label}</span>
              <span
                className={`text-xs font-bold ${
                  s.ratio === 1 ? 'text-gw-teal' : s.ratio === 0 ? 'text-red-500' : 'text-gw-amber'
                }`}
              >
                {s.correct}/{s.total}
              </span>
            </div>
            <div className="mt-1.5 h-2 rounded-full bg-gw-ice overflow-hidden">
              <div
                className={`h-full rounded-full ${
                  s.ratio === 1
                    ? 'bg-gw-teal'
                    : s.ratio === 0
                      ? 'bg-red-400'
                      : 'bg-gw-amber'
                }`}
                style={{ width: `${Math.max(8, s.ratio * 100)}%` }}
              />
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
