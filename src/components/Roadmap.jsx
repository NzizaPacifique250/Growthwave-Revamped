import { useReveal } from '../hooks.js';

const phases = [
  {
    label: 'Phase 1 · Rwanda',
    title: 'Prove the Model',
    items: [
      '20 partner schools',
      '1,000+ active users',
      'Formalized employer pipeline',
      '432M RWF ARR',
    ],
    state: 'active',
  },
  {
    label: 'Phase 2 · East Africa',
    title: 'Scale the Playbook',
    items: [
      'Expand to Kenya & Uganda',
      'Government education partnerships',
      'Regional employer network',
    ],
    state: 'upcoming',
  },
  {
    label: 'Phase 3 · Pan-Africa',
    title: 'Continental Standard',
    items: [
      'Primary pre-tertiary pipeline across Africa',
      'Licensing to education ministries',
      'Global employer partnerships',
    ],
    state: 'vision',
  },
];

const nodeStyles = {
  active: 'bg-gw-teal border-gw-teal shadow-[0_0_0_6px_rgba(0,168,150,0.18)]',
  upcoming: 'bg-white border-gw-navy',
  vision: 'bg-white border-dashed border-gw-slate/60',
};

export default function Roadmap() {
  const ref = useReveal();
  return (
    <section ref={ref} className="bg-white py-24 md:py-28">
      <div className="container-x">
        <div className="reveal max-w-3xl">
          <span className="eyebrow">The Roadmap</span>
          <h2 className="h-section mt-3">
            From Rwanda <span className="text-gw-teal">to the Continent.</span>
          </h2>
        </div>

        <div className="mt-16 relative">
          {/* Connecting line (desktop) */}
          <div className="hidden md:block absolute top-3 left-[8%] right-[8%] h-0.5 bg-gradient-to-r from-gw-teal via-gw-navy/40 to-gw-slate/30" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-6 relative">
            {phases.map((p) => (
              <div key={p.title} className="reveal text-center md:text-left">
                <div className="flex md:block items-center gap-4">
                  <span
                    className={`block h-6 w-6 rounded-full border-2 mx-auto md:mx-0 ${nodeStyles[p.state]}`}
                  />
                </div>
                <p className="mt-5 text-xs uppercase tracking-[0.18em] font-semibold text-gw-teal">
                  {p.label}
                </p>
                <h3 className="mt-2 font-display text-2xl font-bold text-gw-ink">
                  {p.title}
                </h3>
                <ul className="mt-4 space-y-2 text-[15px] text-gw-slate">
                  {p.items.map((it) => (
                    <li key={it} className="leading-snug">
                      • {it}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
