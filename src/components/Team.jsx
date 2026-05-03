import { Linkedin } from 'lucide-react';
import { useReveal } from '../hooks.js';

const founders = [
  {
    initials: 'NAP',
    name: 'Nziza Aime Pacifique',
    role: 'Founder & CEO',
    roleColor: 'bg-gw-teal text-white',
    avatarColor: 'bg-gw-navy',
    focus: 'Strategy · Partnerships · Business Development',
    bullets: [
      "Grew up navigating Rwanda's education system firsthand",
      'Secured Rwanda ICT Chamber EdTech Trust Seal',
      'Led Kagarama pilot — 240+ applicants, 1.5M RWF revenue',
      'Leads all school B2B partnerships and government relations',
    ],
  },
  {
    initials: 'AO',
    name: 'Abizera Oreste',
    role: 'Co-Founder & CTO',
    roleColor: 'bg-gw-navy text-white',
    avatarColor: 'bg-gw-teal',
    focus: 'Machine Learning · Platform Engineering · AI Systems',
    bullets: [
      'Built Growthwave Academy LMS from scratch',
      'Designed WhatsApp AI coding mentor prototype',
      'Owns AI architecture and scalability roadmap',
      'Responsible for all product delivery and technical systems',
    ],
  },
];

export default function Team() {
  const ref = useReveal();
  return (
    <section ref={ref} className="bg-gw-ice py-24 md:py-28">
      <div className="container-x">
        <div className="reveal max-w-3xl">
          <span className="eyebrow">The Team</span>
          <h2 className="h-section mt-3">
            Lived experience meets <span className="text-gw-teal">technical execution.</span>
          </h2>
        </div>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-6">
          {founders.map((f) => (
            <div key={f.name} className="reveal card card-hover p-7 md:p-8">
              <div className="flex items-start gap-5">
                <div
                  className={`h-16 w-16 shrink-0 rounded-full ${f.avatarColor} text-white flex items-center justify-center font-bold text-lg`}
                >
                  {f.initials}
                </div>
                <div className="flex-1">
                  <h3 className="font-display text-xl font-bold text-gw-ink">{f.name}</h3>
                  <span className={`mt-2 pill ${f.roleColor}`}>{f.role}</span>
                  <p className="mt-3 text-sm text-gw-slate italic">{f.focus}</p>
                </div>
                <a
                  href="#"
                  aria-label="LinkedIn"
                  className="text-gw-slate hover:text-gw-navy transition-colors"
                >
                  <Linkedin size={20} />
                </a>
              </div>

              <ul className="mt-6 space-y-2.5 border-t border-gw-navy/10 pt-5">
                {f.bullets.map((b) => (
                  <li key={b} className="flex gap-3 text-[15px] text-gw-ink/85">
                    <span className="text-gw-teal mt-1.5 shrink-0">•</span>
                    <span className="leading-snug">{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
