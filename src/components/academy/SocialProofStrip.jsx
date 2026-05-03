import { Quote } from 'lucide-react';
import { headlineTestimonials, successStats } from '../../data/testimonials.js';

export default function SocialProofStrip() {
  return (
    <section className="bg-gw-ice/60 py-20">
      <div className="container-x">
        <div className="text-center max-w-2xl mx-auto">
          <span className="eyebrow">Real outcomes</span>
          <h2 className="h-section mt-3">
            Students placed at the companies <span className="text-gw-teal">they wanted</span>
          </h2>
        </div>

        <dl className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4">
          {successStats.map((s) => (
            <div
              key={s.label}
              className="rounded-2xl bg-white border border-gw-navy/10 shadow-card px-5 py-6 text-center"
            >
              <dt className="text-xs uppercase tracking-wider font-semibold text-gw-slate">
                {s.label}
              </dt>
              <dd className="mt-2 font-display text-3xl font-bold text-gw-ink">{s.value}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-5">
          {headlineTestimonials.map((t) => (
            <figure
              key={t.name}
              className="rounded-2xl bg-white border border-gw-navy/10 shadow-card p-6 flex flex-col"
            >
              <Quote size={20} className="text-gw-teal" />
              <blockquote className="mt-3 text-sm text-gw-ink leading-relaxed flex-1">
                "{t.quote}"
              </blockquote>
              <figcaption className="mt-5 flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-gw-teal to-gw-navy flex items-center justify-center text-white text-sm font-bold">
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
    </section>
  );
}
