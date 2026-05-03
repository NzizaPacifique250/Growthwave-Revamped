import { motion } from 'framer-motion';
import { PartyPopper, AlertCircle, Sparkles } from 'lucide-react';

export default function ResultsHeader({ result, attemptNumber, assessmentTitle }) {
  const { scorePercent, score, total, passed, mastered } = result;
  const tone = mastered ? 'mastery' : passed ? 'pass' : 'fail';
  const cfg = toneCfg[tone];

  return (
    <div
      className={`rounded-2xl p-6 md:p-8 text-white shadow-cardHover overflow-hidden relative ${cfg.bg}`}
    >
      <div
        className="absolute -top-24 -right-12 h-72 w-72 rounded-full opacity-30 blur-3xl pointer-events-none"
        style={{ background: cfg.glow }}
      />
      <div className="relative flex flex-col md:flex-row md:items-center gap-6">
        <ScoreRing scorePercent={scorePercent} accent={cfg.accent} />
        <div className="flex-1 min-w-0">
          <span className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-wider font-semibold text-white/70">
            <cfg.Icon size={12} className={cfg.iconAccent} /> Attempt {attemptNumber}
          </span>
          <h2 className="mt-2 font-display text-3xl md:text-4xl font-extrabold leading-tight">
            {cfg.headline}
          </h2>
          <p className="mt-2 text-white/75 leading-relaxed">
            You scored <span className="font-bold text-white">{score} out of {total}</span>
            {' '}on {assessmentTitle}.
            {mastered && ' Mastery threshold reached — extra badge unlocked.'}
          </p>
        </div>
      </div>
    </div>
  );
}

const toneCfg = {
  pass: {
    bg: 'bg-gradient-to-br from-gw-midnight to-gw-navy',
    glow: 'radial-gradient(circle, #00A896 0%, transparent 70%)',
    accent: '#00A896',
    iconAccent: 'text-gw-teal',
    Icon: PartyPopper,
    headline: 'You passed.',
  },
  mastery: {
    bg: 'bg-gradient-to-br from-gw-midnight to-gw-navy',
    glow: 'radial-gradient(circle, #F39C12 0%, transparent 70%)',
    accent: '#F39C12',
    iconAccent: 'text-gw-amber',
    Icon: Sparkles,
    headline: 'Mastery achieved.',
  },
  fail: {
    bg: 'bg-gradient-to-br from-[#3B1530] to-[#1A1A2E]',
    glow: 'radial-gradient(circle, #F39C12 0%, transparent 70%)',
    accent: '#F39C12',
    iconAccent: 'text-gw-amber',
    Icon: AlertCircle,
    headline: 'Not yet — but close.',
  },
};

function ScoreRing({ scorePercent, accent }) {
  const radius = 38;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (scorePercent / 100) * circumference;
  return (
    <div className="relative h-24 w-24 shrink-0">
      <svg className="-rotate-90" viewBox="0 0 88 88" width="96" height="96">
        <circle cx="44" cy="44" r={radius} stroke="rgba(255,255,255,0.15)" strokeWidth="6" fill="none" />
        <motion.circle
          cx="44"
          cy="44"
          r={radius}
          stroke={accent}
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
        <span className="font-display text-2xl font-bold leading-none">{scorePercent}%</span>
        <span className="text-[10px] uppercase tracking-wider text-white/60 font-semibold">score</span>
      </div>
    </div>
  );
}
