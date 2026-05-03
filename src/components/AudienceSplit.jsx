import { GraduationCap, Building2, Briefcase, Check } from 'lucide-react';
import { useReveal } from '../hooks.js';

const audiences = [
  {
    icon: GraduationCap,
    label: 'For Students',
    headline: 'Your roadmap to a tech career starts here — not at university.',
    benefits: [
      'Structured learning path from zero to job-ready',
      'AI mentor available 24/7 on WhatsApp',
      'Real projects in your portfolio before graduation',
      'Direct introductions to top tech employers',
      "Join a cohort of Rwanda's most motivated young builders",
    ],
    cta: 'Apply to a Program',
    ctaClass: 'btn btn-navy',
    border: 'border-t-[3px] border-gw-navy',
    badge: null,
  },
  {
    icon: Building2,
    label: 'For Schools',
    headline:
      'Give your students a modern tech curriculum — without hiring expensive instructors.',
    benefits: [
      'Plug-in AI curriculum, no extra staff needed',
      'Annual licensing model — predictable cost',
      'Students build real software during school hours',
      'Certified program boosts institutional reputation',
      'Your best students get placed with top employers',
    ],
    cta: 'Request a Proposal',
    ctaClass: 'btn btn-primary',
    border: 'border-t-[3px] border-gw-teal',
    badge: 'PRIMARY PARTNER',
    note: '15M RWF/year · Includes full platform + support',
    featured: true,
  },
  {
    icon: Briefcase,
    label: 'For Employers',
    headline:
      'Stop spending months training new hires. Hire verified engineers from day one.',
    benefits: [
      'Early access to pre-vetted junior engineering talent',
      '3+ years of skill-velocity data per graduate',
      'Sponsor a cohort aligned to your tech stack',
      "Build your brand with Rwanda's next tech generation",
      'Direct-to-hire pipeline, no guesswork',
    ],
    cta: 'Become a Hiring Partner',
    ctaClass: 'btn btn-amber',
    border: 'border-t-[3px] border-gw-amber',
    badge: null,
  },
];

export default function AudienceSplit() {
  const ref = useReveal();
  return (
    <section ref={ref} id="audience" className="bg-white py-24 md:py-28">
      <div className="container-x">
        <div className="reveal max-w-3xl">
          <span className="eyebrow">Who It's For</span>
          <h2 className="h-section mt-3">
            Built for Three Stakeholders.{' '}
            <span className="text-gw-navy">One Platform.</span>
          </h2>
        </div>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6">
          {audiences.map((a) => (
            <div
              key={a.label}
              className={`reveal card card-hover ${a.border} p-7 flex flex-col ${
                a.featured ? 'lg:scale-[1.03] shadow-cardHover' : ''
              }`}
            >
              <div className="flex items-center justify-between mb-5">
                <div className="h-12 w-12 rounded-xl bg-gw-ice flex items-center justify-center text-gw-navy">
                  <a.icon size={22} />
                </div>
                {a.badge && (
                  <span className="pill bg-gw-teal/15 text-gw-teal">{a.badge}</span>
                )}
              </div>

              <p className="text-xs uppercase tracking-[0.18em] font-semibold text-gw-slate">
                {a.label}
              </p>
              <h3 className="mt-2 font-display text-xl font-bold text-gw-ink leading-snug">
                {a.headline}
              </h3>

              <ul className="mt-6 space-y-3 flex-1">
                {a.benefits.map((b) => (
                  <li key={b} className="flex gap-3 items-start text-[15px] text-gw-ink/85">
                    <span className="mt-0.5 h-5 w-5 shrink-0 rounded-full bg-gw-teal/15 text-gw-teal flex items-center justify-center">
                      <Check size={12} strokeWidth={3} />
                    </span>
                    <span className="leading-snug">{b}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-7">
                <a href="#contact" className={`${a.ctaClass} w-full`}>
                  {a.cta}
                </a>
                {a.note && (
                  <p className="mt-3 text-xs text-center text-gw-slate">{a.note}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
