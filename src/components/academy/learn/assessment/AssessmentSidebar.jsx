import { Lightbulb, ListChecks, History } from 'lucide-react';

export default function AssessmentSidebar({
  attemptNumber,
  hintsAvailable,
  hintsTotal,
  rules,
  attempts,
}) {
  const hintsUnlocked = attemptNumber > 1;
  return (
    <aside className="rounded-2xl bg-white border border-gw-navy/10 shadow-card p-5 lg:sticky lg:top-24 self-start space-y-5">
      <div>
        <p className="text-[11px] uppercase tracking-wider font-semibold text-gw-slate inline-flex items-center gap-1.5">
          <ListChecks size={11} /> Rules
        </p>
        <ul className="mt-2 space-y-1.5">
          {rules.map((r) => (
            <li key={r} className="text-xs text-gw-ink leading-relaxed flex gap-2">
              <span className="h-1 w-1 rounded-full bg-gw-teal mt-2 shrink-0" />
              {r}
            </li>
          ))}
        </ul>
      </div>

      <div className="rounded-xl bg-gw-ice/60 px-3 py-3">
        <p className="text-[11px] uppercase tracking-wider font-semibold text-gw-slate inline-flex items-center gap-1.5">
          <Lightbulb size={11} /> Hints
        </p>
        <p className="mt-1 text-xs text-gw-ink leading-relaxed">
          {hintsUnlocked ? (
            <>
              You have <span className="font-bold">{hintsAvailable}</span> of {hintsTotal} hints
              left this attempt.
            </>
          ) : (
            <>Hints unlock from your second attempt onward.</>
          )}
        </p>
      </div>

      {attempts && attempts.length > 0 && (
        <div>
          <p className="text-[11px] uppercase tracking-wider font-semibold text-gw-slate inline-flex items-center gap-1.5">
            <History size={11} /> Past attempts
          </p>
          <ol className="mt-2 space-y-1.5">
            {attempts.map((a) => (
              <li
                key={a.attemptNumber}
                className="text-xs text-gw-ink leading-snug flex items-baseline justify-between gap-2"
              >
                <span>Attempt {a.attemptNumber}</span>
                <span
                  className={`font-bold ${
                    a.passed ? 'text-gw-teal' : 'text-gw-amber'
                  }`}
                >
                  {a.scorePercent}% {a.passed ? '✓' : ''}
                </span>
              </li>
            ))}
          </ol>
        </div>
      )}
    </aside>
  );
}
