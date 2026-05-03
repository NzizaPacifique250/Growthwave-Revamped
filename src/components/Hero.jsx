import { CheckCircle2, Code2, Sparkles, User } from 'lucide-react';
import { useReveal } from '../hooks.js';

export default function Hero() {
  const ref = useReveal();
  return (
    <section
      id="top"
      ref={ref}
      className="relative overflow-hidden bg-gw-midnight text-white pt-28 pb-24 md:pt-36 md:pb-32"
    >
      {/* Mesh grid overlay */}
      <div
        className="absolute inset-0 opacity-40 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(26, 47, 107, 0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(26, 47, 107, 0.5) 1px, transparent 1px)',
          backgroundSize: '56px 56px',
          transform: 'skewY(-2deg)',
        }}
      />
      {/* Teal radial glow */}
      <div
        className="absolute -top-32 right-0 h-[480px] w-[480px] rounded-full opacity-30 blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, #00A896 0%, transparent 70%)' }}
      />

      <div className="container-x relative grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        {/* Left — copy */}
        <div className="lg:col-span-7 reveal">
          <span className="eyebrow inline-flex items-center gap-2 rounded-full border border-gw-teal/30 bg-gw-teal/10 px-3 py-1.5">
            <Sparkles size={14} /> Rwanda's #1 Pre-Tertiary Tech Program
          </span>
          <h1 className="mt-6 font-display text-4xl md:text-5xl lg:text-[60px] font-extrabold leading-[1.05]">
            We Turn High School Students Into{' '}
            <span className="text-gw-teal">Job-Ready Engineers.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg md:text-xl leading-relaxed text-white/75">
            Growthwave embeds AI-powered software engineering training directly into
            secondary schools — then connects the best graduates to top tech employers.
            Before university.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#contact" className="btn btn-primary text-base">
              Partner Your School
            </a>
            <a href="#academy" className="btn btn-ghost-teal text-base">
              Explore the Academy
            </a>
          </div>

          <ul className="mt-8 flex flex-wrap gap-x-7 gap-y-3 text-sm text-white/65">
            {[
              'Rwanda ICT Chamber Certified',
              '800% Oversubscribed Pilot',
              'Live in Kigali Secondary Schools',
            ].map((item) => (
              <li key={item} className="inline-flex items-center gap-2">
                <CheckCircle2 size={16} className="text-gw-teal" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Right — product mockup */}
        <div className="lg:col-span-5 reveal">
          <ProductMockup />
        </div>
      </div>
    </section>
  );
}

function ProductMockup() {
  return (
    <div className="relative animate-floatY">
      {/* outer glow */}
      <div
        className="absolute -inset-4 rounded-3xl blur-2xl opacity-50 pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(0,168,150,0.5), transparent 70%)' }}
      />
      <div className="relative rounded-2xl bg-gw-midnightCard border-t-2 border-gw-teal shadow-tealGlow overflow-hidden">
        {/* window header */}
        <div className="flex items-center gap-1.5 px-4 py-3 border-b border-white/5">
          <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-green-400/70" />
          <span className="ml-3 text-xs text-white/50 font-mono">growthwave.academy / dashboard</span>
        </div>

        <div className="p-5">
          {/* student row */}
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-full bg-gradient-to-br from-gw-teal to-gw-navy flex items-center justify-center text-sm font-bold">
              KM
            </div>
            <div className="flex-1">
              <div className="text-sm font-semibold">Karenzi Marie</div>
              <div className="text-xs text-white/50">Module 4 · React Components</div>
            </div>
            <div className="text-xs px-2 py-1 rounded-md bg-gw-teal/15 text-gw-teal font-semibold">
              Active
            </div>
          </div>

          {/* progress */}
          <div className="mt-5">
            <div className="flex items-center justify-between text-xs text-white/60 mb-2">
              <span>Course Progress</span>
              <span>72%</span>
            </div>
            <div className="h-2 rounded-full bg-white/10 overflow-hidden">
              <div className="h-full w-[72%] rounded-full bg-gradient-to-r from-gw-teal to-emerald-300" />
            </div>
          </div>

          {/* code block */}
          <div className="mt-5 rounded-lg bg-black/40 border border-white/5 p-4 font-mono text-[12px] leading-relaxed">
            <div className="flex items-center gap-2 mb-2 text-white/40">
              <Code2 size={12} /> components/Button.jsx
            </div>
            <div className="text-white/80">
              <span className="text-pink-400">function</span>{' '}
              <span className="text-yellow-300">Button</span>
              <span className="text-white/60">{`({ label, onClick })`}</span> {'{'}
            </div>
            <div className="text-white/80 pl-4">
              <span className="text-pink-400">return</span>{' '}
              <span className="text-blue-300">&lt;button</span>{' '}
              <span className="text-emerald-300">onClick</span>=
              <span className="text-orange-300">{'{onClick}'}</span>
              <span className="text-blue-300">&gt;</span>
              {'{label}'}
              <span className="text-blue-300">&lt;/button&gt;</span>;
            </div>
            <div className="text-white/80">{'}'}</div>
          </div>

          {/* AI mentor bubble */}
          <div className="mt-5 flex gap-3">
            <div className="h-8 w-8 shrink-0 rounded-full bg-gw-teal/20 border border-gw-teal/40 flex items-center justify-center">
              <Sparkles size={14} className="text-gw-teal" />
            </div>
            <div className="rounded-2xl rounded-tl-sm bg-white/5 border border-white/10 p-3 text-xs text-white/85 leading-relaxed">
              <span className="font-semibold text-gw-teal">AI Mentor · </span>
              Good work! Try refactoring this function to use destructured props at the call site.
            </div>
          </div>

          {/* completion badge */}
          <div className="mt-5 flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs text-white/50">
              <User size={12} /> 14-day streak
            </div>
            <div className="rounded-full bg-gw-teal text-white text-xs font-bold px-3 py-1.5 shadow-lg">
              90% completion
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
