import { Quote } from 'lucide-react';
import { useReveal } from '../hooks.js';

const testimonials = [
  {
    quote:
      'This program helped me develop essential skills like problem-solving and teamwork. Working on projects from start to finish taught me persistence. These experiences have prepared me to contribute meaningfully to real-world, team-based projects.',
    name: 'Semaza Emmanuel',
    initials: 'SE',
    badge: 'Now: Software Developer',
    color: 'bg-gw-teal',
  },
  {
    quote:
      'Before joining, I had no knowledge of JavaScript or React. Through hands-on projects, I learned how to use technology to solve real problems. I now feel confident in my ability to build solutions that can make an impact.',
    name: 'Ricky Nicole',
    initials: 'RN',
    badge: 'HSDP Graduate',
    color: 'bg-gw-navy',
  },
  {
    quote:
      "I highly recommend this program, especially to other girls. It empowers us to create solutions to real-world problems. Beyond coding, it strengthens critical thinking and challenges the stereotypes suggesting girls can't succeed in tech.",
    name: 'Iness Umuhoza',
    initials: 'IU',
    badge: 'HSDP Graduate',
    color: 'bg-gw-amber',
  },
];

export default function Testimonials() {
  const ref = useReveal();
  return (
    <section ref={ref} className="bg-gw-ice py-24 md:py-28">
      <div className="container-x">
        <div className="reveal max-w-3xl">
          <span className="eyebrow">Voices</span>
          <h2 className="h-section mt-3">
            From Students Who've <span className="text-gw-teal">Been Through It.</span>
          </h2>
        </div>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div key={t.name} className="reveal card card-hover p-7 flex flex-col">
              <Quote size={32} className="text-gw-teal/40" />
              <p className="mt-4 text-[15px] leading-relaxed text-gw-ink/85 flex-1">
                "{t.quote}"
              </p>
              <div className="mt-6 pt-6 border-t border-gw-navy/10 flex items-center gap-3">
                <div
                  className={`h-11 w-11 rounded-full ${t.color} text-white flex items-center justify-center font-bold text-sm`}
                >
                  {t.initials}
                </div>
                <div>
                  <div className="font-semibold text-gw-ink text-sm">{t.name}</div>
                  <div className="text-xs text-gw-slate">{t.badge}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="reveal mt-8 mx-auto max-w-2xl">
          <div className="rounded-2xl border-2 border-dashed border-gw-teal/40 bg-white/40 px-6 py-6 text-center">
            <p className="text-sm text-gw-slate">
              <span className="font-semibold text-gw-teal">
                Employer testimonial coming soon
              </span>{' '}
              — hiring partners being onboarded Q3 2024.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
