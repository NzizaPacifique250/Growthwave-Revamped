import { GraduationCap, Briefcase, TrendingUp } from 'lucide-react';
import { useReveal } from '../hooks.js';

const problems = [
  {
    icon: GraduationCap,
    title: 'Theory Without Practice',
    body:
      "Students graduate with degrees but can't write a working API, deploy a web app, or collaborate on a real codebase.",
  },
  {
    icon: Briefcase,
    title: 'Employers Pay the Price',
    body:
      'Tech companies spend months on remedial training before new hires can contribute — a massive hidden cost on every junior hire.',
  },
  {
    icon: TrendingUp,
    title: 'The Gap Is Widening',
    body:
      'AI is raising the skills bar faster than any university can adapt. Theoretical degrees are losing value every year.',
  },
];

export default function Problem() {
  const ref = useReveal();
  return (
    <section ref={ref} className="bg-white py-24 md:py-28">
      <div className="container-x">
        <div className="reveal max-w-3xl">
          <span className="eyebrow">The Problem</span>
          <h2 className="h-section mt-3">
            Africa Is Producing Graduates.{' '}
            <span className="text-gw-navy">Not Engineers.</span>
          </h2>
        </div>

        <div className="mt-14 grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left — stat block */}
          <div className="lg:col-span-5 reveal">
            <div className="rounded-2xl bg-gw-ice p-10">
              <div className="font-display text-7xl md:text-8xl font-extrabold text-gw-navy leading-none">
                61%
              </div>
              <p className="mt-4 text-lg font-semibold text-gw-ink">
                of Rwanda's ICT graduates fail to meet employer expectations
              </p>
              <p className="mt-2 text-sm text-gw-slate italic">
                Source: RISA Skills Gap Report
              </p>

              <div className="my-8 h-px bg-gw-navy/10" />

              <div className="font-display text-5xl md:text-6xl font-extrabold text-gw-teal leading-none">
                $85B
              </div>
              <p className="mt-3 text-base text-gw-ink/80">
                Global developer talent shortage projected by 2030
              </p>
            </div>
          </div>

          {/* Right — three problem cards */}
          <div className="lg:col-span-7 grid gap-5">
            {problems.map(({ icon: Icon, title, body }) => (
              <div
                key={title}
                className="reveal card card-hover card-teal-left p-6 flex gap-5"
              >
                <div className="shrink-0 h-12 w-12 rounded-xl bg-gw-ice flex items-center justify-center text-gw-navy">
                  <Icon size={22} />
                </div>
                <div>
                  <h3 className="font-display text-xl font-bold text-gw-ink">{title}</h3>
                  <p className="mt-2 text-base text-gw-slate leading-relaxed">{body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
