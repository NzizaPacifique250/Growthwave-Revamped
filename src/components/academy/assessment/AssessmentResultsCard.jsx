import { Link } from 'react-router-dom';
import { Disclosure, Transition } from '@headlessui/react';
import { motion } from 'framer-motion';
import { Sparkles, ChevronDown, ArrowRight, RefreshCw } from 'lucide-react';

export default function AssessmentResultsCard({ result, onRetake }) {
  const { recommended, alternatives, confidence } = result;

  return (
    <div className="space-y-6">
      <div className="rounded-2xl bg-gradient-to-br from-gw-midnight to-gw-navy text-white p-8 shadow-cardHover overflow-hidden relative">
        <div
          className="absolute -top-24 -right-12 h-72 w-72 rounded-full opacity-30 blur-3xl pointer-events-none"
          style={{ background: 'radial-gradient(circle, #00A896 0%, transparent 70%)' }}
        />
        <div className="relative flex flex-col md:flex-row md:items-center gap-6">
          <ConfidenceRing confidence={confidence} />
          <div className="flex-1 min-w-0">
            <span className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-wider font-semibold text-white/60">
              <Sparkles size={12} className="text-gw-teal" /> Recommended for you
            </span>
            <h2 className="mt-2 font-display text-3xl md:text-4xl font-extrabold leading-tight">
              {recommended.path.title}
            </h2>
            <p className="mt-2 text-white/75 leading-relaxed">{recommended.path.tagline}</p>

            <ul className="mt-4 space-y-1.5">
              {recommended.reasons.map((r) => (
                <li key={r} className="text-sm text-white/85 flex items-start gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-gw-teal mt-2 shrink-0" />
                  {r}
                </li>
              ))}
            </ul>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                to={`/academy/enroll/${recommended.path.slug}`}
                className="btn btn-primary inline-flex items-center gap-2"
              >
                Enroll in {recommended.path.title} <ArrowRight size={14} />
              </Link>
              <Link
                to={`/academy/paths/${recommended.path.slug}`}
                className="text-sm font-semibold text-white/85 hover:text-white transition inline-flex items-center gap-1.5"
              >
                See full path
              </Link>
              <button
                type="button"
                onClick={onRetake}
                className="inline-flex items-center gap-2 text-sm font-semibold text-white/70 hover:text-white transition"
              >
                <RefreshCw size={14} /> Retake assessment
              </button>
            </div>
          </div>
        </div>
      </div>

      {alternatives.length > 0 && (
        <div>
          <h3 className="font-display text-xl font-bold text-gw-ink">Other strong fits</h3>
          <p className="text-sm text-gw-slate mt-1">
            Worth a look — these scored close to your top match.
          </p>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            {alternatives.map((alt, idx) => (
              <motion.div
                key={alt.slug}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 * idx }}
              >
                <AlternativeCard alt={alt} />
              </motion.div>
            ))}
          </div>
        </div>
      )}

      <WhyMatchPanel result={result} />
    </div>
  );
}

function AlternativeCard({ alt }) {
  return (
    <article className="rounded-2xl bg-white border border-gw-navy/10 shadow-card p-5 flex flex-col">
      <div className="flex items-baseline justify-between gap-3">
        <h4 className="font-display font-bold text-gw-ink">{alt.path.title}</h4>
        <span className="text-[11px] uppercase tracking-wider font-semibold text-gw-slate">
          {alt.path.outcomeType}
        </span>
      </div>
      <p className="mt-1 text-sm text-gw-slate leading-snug">{alt.path.tagline}</p>
      <ul className="mt-3 space-y-1">
        {alt.reasons.slice(0, 2).map((r) => (
          <li key={r} className="text-xs text-gw-ink flex gap-2">
            <span className="text-gw-teal">·</span> {r}
          </li>
        ))}
      </ul>
      <Link
        to={`/academy/paths/${alt.path.slug}`}
        className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-gw-teal hover:gap-2 transition-all"
      >
        Compare this path <ArrowRight size={14} />
      </Link>
    </article>
  );
}

function WhyMatchPanel({ result }) {
  const top = result.recommended.contributions
    .filter((c) => c.points > 0)
    .sort((a, b) => b.points - a.points)
    .slice(0, 6);
  if (!top.length) return null;
  return (
    <Disclosure>
      {({ open }) => (
        <div className="rounded-2xl bg-white border border-gw-navy/10 overflow-hidden">
          <Disclosure.Button className="w-full px-5 py-4 flex items-center justify-between gap-4 text-left hover:bg-gw-ice/40 transition">
            <span className="text-sm font-semibold text-gw-ink">Why this match?</span>
            <ChevronDown
              size={18}
              className={`text-gw-slate transition-transform ${open ? 'rotate-180' : ''}`}
            />
          </Disclosure.Button>
          <Transition
            enter="transition duration-150 ease-out"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition duration-100 ease-out"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Disclosure.Panel className="px-5 pb-5">
              <p className="text-xs text-gw-slate leading-relaxed mb-3">
                These signals contributed the most points to {result.recommended.path.title}.
              </p>
              <ul className="divide-y divide-gw-navy/10 rounded-lg border border-gw-navy/10">
                {top.map((c, idx) => (
                  <li key={idx} className="px-3 py-2 flex items-center justify-between gap-4">
                    <span className="text-sm text-gw-ink truncate">{c.source}</span>
                    <span className="text-xs font-bold text-gw-teal whitespace-nowrap">
                      +{c.points} pts
                    </span>
                  </li>
                ))}
              </ul>
            </Disclosure.Panel>
          </Transition>
        </div>
      )}
    </Disclosure>
  );
}

function ConfidenceRing({ confidence }) {
  const radius = 38;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (confidence / 100) * circumference;
  return (
    <div className="relative h-24 w-24 shrink-0">
      <svg className="-rotate-90" viewBox="0 0 88 88" width="96" height="96">
        <circle cx="44" cy="44" r={radius} stroke="rgba(255,255,255,0.15)" strokeWidth="6" fill="none" />
        <motion.circle
          cx="44"
          cy="44"
          r={radius}
          stroke="#00A896"
          strokeWidth="6"
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-display text-2xl font-bold leading-none">{confidence}%</span>
        <span className="text-[10px] uppercase tracking-wider text-white/60 font-semibold">match</span>
      </div>
    </div>
  );
}
