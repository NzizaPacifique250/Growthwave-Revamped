import { School, Laptop, Rocket, ArrowRight } from 'lucide-react';
import { useReveal } from '../hooks.js';

const steps = [
  {
    badge: 'LEVEL 1',
    badgeClass: 'bg-gw-teal text-white',
    icon: School,
    title: 'Discover',
    sub: 'In Schools',
    body:
      'We partner with secondary schools to launch on-campus tech clubs. Our talent scouts find motivated students early — before bootcamps, before university. Zero acquisition cost.',
    tag: 'School Partnership',
  },
  {
    badge: 'LEVEL 2',
    badgeClass: 'bg-gw-navy text-white',
    icon: Laptop,
    title: 'Develop',
    sub: 'AI-Powered Platform',
    body:
      'Students access Growthwave Academy — our AI-powered LMS — plus a WhatsApp AI mentor available 24/7. Personalized learning paths in software engineering, web development, and problem-solving.',
    tag: 'Growthwave Academy',
  },
  {
    badge: 'LEVEL 3',
    badgeClass: 'bg-gw-amber text-white',
    icon: Rocket,
    title: 'Accelerate',
    sub: 'Real World',
    body:
      'Top performers enter intensive bootcamps and attend field trips to leading tech companies. They build and deploy live systems. They graduate with a real portfolio and employer introductions — before they turn 18.',
    tag: 'Employer Pipeline',
  },
];

export default function HowItWorks() {
  const ref = useReveal();
  return (
    <section ref={ref} id="how-it-works" className="bg-gw-ice py-24 md:py-28">
      <div className="container-x">
        <div className="reveal max-w-3xl">
          <span className="eyebrow">How It Works</span>
          <h2 className="h-section mt-3">
            One Ecosystem. Three Levels.{' '}
            <span className="text-gw-teal">One Outcome: Hired.</span>
          </h2>
        </div>

        <div className="mt-14 relative">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-5 relative">
            {steps.map((s, i) => (
              <div key={s.title} className="reveal relative">
                <div className="card card-hover border-t-[3px] border-gw-teal p-7 h-full flex flex-col">
                  <div className="flex items-center justify-between mb-4">
                    <span className={`pill ${s.badgeClass}`}>{s.badge}</span>
                    <div className="h-12 w-12 rounded-xl bg-gw-ice flex items-center justify-center text-gw-navy">
                      <s.icon size={22} />
                    </div>
                  </div>
                  <h3 className="font-display text-2xl font-bold text-gw-ink">{s.title}</h3>
                  <p className="mt-1 text-sm font-semibold uppercase tracking-wider text-gw-teal">
                    {s.sub}
                  </p>
                  <p className="mt-4 text-base text-gw-slate leading-relaxed flex-1">
                    {s.body}
                  </p>
                  <div className="mt-6 pt-5 border-t border-gw-navy/10 text-sm font-semibold text-gw-navy inline-flex items-center gap-2">
                    <ArrowRight size={16} className="text-gw-teal" />
                    {s.tag}
                  </div>
                </div>

                {/* Connecting arrow (desktop only) */}
                {i < steps.length - 1 && (
                  <div className="hidden md:flex absolute -right-3 top-1/2 -translate-y-1/2 z-10 h-8 w-8 items-center justify-center rounded-full bg-white shadow-md border border-gw-navy/10 text-gw-teal">
                    <ArrowRight size={16} />
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="reveal mt-10 rounded-2xl bg-white border border-gw-teal/30 px-8 py-6 text-center shadow-sm">
            <p className="text-base md:text-lg text-gw-ink">
              <span className="font-bold text-gw-navy">Result:</span> Verified, job-ready
              engineers — hired before or shortly after secondary school graduation.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
