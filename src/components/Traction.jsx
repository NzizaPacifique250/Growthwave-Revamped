import { CheckCircle2, Award, Handshake, BarChart3 } from 'lucide-react';
import { useReveal, useCountUp } from '../hooks.js';

function StatCounter({ target, suffix, decimals = 0, label, sub }) {
  const [ref, value] = useCountUp(target, { decimals });
  return (
    <div ref={ref} className="text-center">
      <div className="font-display text-5xl md:text-6xl font-extrabold text-gw-teal leading-none">
        {value}
        <span>{suffix}</span>
      </div>
      <p className="mt-3 text-sm md:text-base font-semibold text-white">{label}</p>
      <p className="mt-1 text-xs text-white/55">{sub}</p>
    </div>
  );
}

const evidence = [
  {
    icon: CheckCircle2,
    title: 'Live Software Deployed',
    body:
      'Students built and shipped real systems during the pilot — including a live Voting System and Club Management Platform.',
  },
  {
    icon: Award,
    title: 'Rwanda ICT Chamber Certified',
    body:
      "Growthwave holds the EdTech Trust Seal — the official certification from Rwanda's ICT regulatory body.",
  },
  {
    icon: Handshake,
    title: 'Employer Exposure Established',
    body:
      "Pilot students attended field trips to Zipline and Irembo — two of Rwanda's most recognized tech companies.",
  },
  {
    icon: BarChart3,
    title: 'Curriculum Validated',
    body:
      '90% completion rate versus the industry average of ~40% for online technical learning programs.',
  },
];

export default function Traction() {
  const ref = useReveal();
  return (
    <section
      ref={ref}
      id="traction"
      className="relative bg-gw-midnight py-24 md:py-28 text-white overflow-hidden"
    >
      <div
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(26, 47, 107, 0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(26, 47, 107, 0.5) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
        }}
      />
      <div className="container-x relative">
        <div className="reveal max-w-3xl">
          <span className="eyebrow">Traction</span>
          <h2 className="h-section-light mt-3">
            One Pilot School. <span className="text-gw-teal">Overwhelming Results.</span>
          </h2>
        </div>

        <div className="reveal mt-14 grid grid-cols-2 lg:grid-cols-4 gap-y-10 gap-x-6">
          <StatCounter
            target={800}
            suffix="%"
            label="Pilot Oversubscription"
            sub="240 applicants, 30 seats"
          />
          <StatCounter
            target={40}
            suffix="+"
            label="Students Trained"
            sub="Cohort 1, Kagarama Secondary"
          />
          <StatCounter
            target={90}
            suffix="%"
            label="Project Completion"
            sub="vs. ~40% industry average"
          />
          <StatCounter
            target={1.5}
            suffix="M"
            decimals={1}
            label="RWF Revenue Generated"
            sub="From pilot phase alone"
          />
        </div>

        <div className="reveal mx-auto mt-14 mb-10 h-px w-2/5 bg-gw-teal/40" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {evidence.map(({ icon: Icon, title, body }) => (
            <div
              key={title}
              className="reveal rounded-2xl bg-gw-midnightCard border border-gw-teal/25 p-6 transition-all hover:-translate-y-1 hover:border-gw-teal/60"
            >
              <div className="flex items-start gap-4">
                <div className="h-11 w-11 shrink-0 rounded-xl bg-gw-teal/15 text-gw-teal flex items-center justify-center">
                  <Icon size={20} />
                </div>
                <div>
                  <h3 className="font-display text-lg font-bold text-white">{title}</h3>
                  <p className="mt-2 text-sm text-white/70 leading-relaxed">{body}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
