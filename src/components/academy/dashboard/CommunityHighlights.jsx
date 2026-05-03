import { Users } from 'lucide-react';
import { getPathBySlug } from '../../../data/learningPaths.js';

export default function CommunityHighlights({ highlights }) {
  if (!highlights?.length) return null;
  return (
    <section className="rounded-2xl bg-white border border-gw-navy/10 shadow-card p-5">
      <div className="flex items-baseline justify-between">
        <div className="flex items-center gap-2">
          <span className="h-8 w-8 rounded-lg bg-gw-navy/10 text-gw-navy flex items-center justify-center">
            <Users size={14} />
          </span>
          <div>
            <h3 className="font-display text-base font-bold text-gw-ink">From your cohort</h3>
            <p className="text-[11px] text-gw-slate">What other students shipped this week.</p>
          </div>
        </div>
        <button type="button" className="text-xs font-semibold text-gw-teal hover:underline">
          See all
        </button>
      </div>

      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {highlights.map((h) => {
          const path = getPathBySlug(h.pathSlug);
          return (
            <article
              key={h.id}
              className="rounded-xl border border-gw-navy/10 p-3 hover:border-gw-teal/40 hover:bg-gw-ice/30 transition"
            >
              <div className="flex items-center gap-2">
                <span className="h-7 w-7 rounded-full bg-gradient-to-br from-gw-teal to-gw-navy flex items-center justify-center text-[10px] font-bold text-white">
                  {h.initials}
                </span>
                <div className="min-w-0">
                  <p className="text-xs font-semibold text-gw-ink truncate">{h.studentName}</p>
                  <p className="text-[10px] text-gw-slate truncate">
                    {path ? path.title : 'Growthwave Academy'}
                  </p>
                </div>
              </div>
              <p className="mt-3 text-sm font-semibold text-gw-ink leading-snug">{h.title}</p>
              <p className="mt-1 text-[11px] text-gw-slate leading-relaxed">{h.description}</p>
            </article>
          );
        })}
      </div>
    </section>
  );
}
