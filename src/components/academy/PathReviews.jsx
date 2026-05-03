import { Star } from 'lucide-react';

export default function PathReviews({ testimonials }) {
  if (!testimonials?.length) return null;
  return (
    <div>
      <h3 className="font-display text-2xl font-bold text-gw-ink">What students say</h3>
      <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-4">
        {testimonials.map((t) => (
          <figure
            key={t.name}
            className="rounded-2xl bg-white border border-gw-navy/10 shadow-card p-6 flex flex-col"
          >
            <div className="flex items-center gap-1 text-gw-amber mb-3">
              {Array.from({ length: t.rating }).map((_, i) => (
                <Star key={i} size={14} className="fill-gw-amber" />
              ))}
            </div>
            <blockquote className="text-sm text-gw-ink leading-relaxed flex-1">
              "{t.quote}"
            </blockquote>
            <figcaption className="mt-4 flex items-center gap-3">
              <div className="h-9 w-9 rounded-full bg-gradient-to-br from-gw-teal to-gw-navy flex items-center justify-center text-white text-xs font-bold">
                {t.avatar}
              </div>
              <div className="min-w-0">
                <div className="text-sm font-semibold text-gw-ink">{t.name}</div>
                <div className="text-xs text-gw-slate truncate">{t.role}</div>
              </div>
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}
