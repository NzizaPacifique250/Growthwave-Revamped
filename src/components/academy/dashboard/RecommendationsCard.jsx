import { Sparkles, ArrowRight } from 'lucide-react';

export default function RecommendationsCard({ recommendations }) {
  if (!recommendations?.length) return null;
  return (
    <div className="rounded-2xl bg-white border border-gw-navy/10 shadow-card p-5">
      <div className="flex items-center gap-2">
        <span className="h-7 w-7 rounded-lg bg-gw-teal/15 text-gw-teal flex items-center justify-center">
          <Sparkles size={13} />
        </span>
        <h3 className="font-display text-base font-bold text-gw-ink">For you</h3>
      </div>
      <ul className="mt-3 space-y-3">
        {recommendations.map((r) => (
          <li
            key={r.id}
            className="rounded-xl border border-gw-navy/10 p-3 hover:border-gw-teal/40 hover:bg-gw-ice/30 transition"
          >
            <p className="text-sm font-semibold text-gw-ink leading-snug">{r.title}</p>
            <p className="mt-1 text-[11px] text-gw-slate leading-relaxed">{r.description}</p>
            <button
              type="button"
              className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-gw-teal hover:underline"
            >
              {r.actionLabel} <ArrowRight size={11} />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
