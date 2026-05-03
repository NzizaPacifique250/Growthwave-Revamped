import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle2, ArrowRight, Brain, Code2, Sparkles, Layers, PartyPopper } from 'lucide-react';
import { onboardingChecklist } from '../../../data/plans.js';

const iconMap = { Brain, Code2, Sparkles, Layers };

export default function WelcomeStep({ user, path }) {
  const Icon = iconMap[path.icon] || Code2;

  return (
    <div>
      <div className="rounded-2xl bg-gradient-to-br from-gw-midnight to-gw-navy text-white p-8 overflow-hidden relative">
        <div
          className="absolute -top-24 -right-12 h-72 w-72 rounded-full opacity-30 blur-3xl pointer-events-none"
          style={{ background: 'radial-gradient(circle, #00A896 0%, transparent 70%)' }}
        />
        <div className="relative flex flex-col md:flex-row md:items-center gap-6">
          <motion.div
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 220, damping: 18 }}
            className="h-16 w-16 rounded-2xl bg-gw-teal/15 border border-gw-teal/40 text-gw-teal flex items-center justify-center shrink-0"
          >
            <Icon size={28} />
          </motion.div>
          <div className="flex-1 min-w-0">
            <span className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-wider font-semibold text-white/60">
              <PartyPopper size={12} className="text-gw-teal" /> You're in
            </span>
            <h2 className="mt-1 font-display text-3xl md:text-4xl font-extrabold leading-tight">
              Welcome to {path.title}, {user?.firstName || 'friend'}.
            </h2>
            <p className="mt-2 text-white/75 leading-relaxed">
              Your first lesson is ready. Take 2 minutes to set up your tools so you can hit the ground running.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <h3 className="font-display text-xl font-bold text-gw-ink">Get set up</h3>
        <p className="text-sm text-gw-slate mt-1">
          Knock these out now — they take less than 5 minutes total.
        </p>
        <ol className="mt-5 space-y-3">
          {onboardingChecklist.map((item, idx) => (
            <motion.li
              key={item.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 * idx + 0.2 }}
              className="rounded-xl bg-white border border-gw-navy/10 p-4 flex items-start gap-4"
            >
              <span className="h-8 w-8 rounded-full bg-gw-ice text-gw-navy text-xs font-bold flex items-center justify-center shrink-0">
                {idx + 1}
              </span>
              <div className="flex-1 min-w-0">
                <div className="font-display font-bold text-gw-ink">{item.title}</div>
                <p className="text-xs text-gw-slate mt-1 leading-relaxed">{item.description}</p>
              </div>
              <button
                type="button"
                className="text-xs font-semibold text-gw-teal hover:underline whitespace-nowrap"
              >
                {item.actionLabel} →
              </button>
            </motion.li>
          ))}
        </ol>
      </div>

      <div className="mt-8 flex flex-wrap gap-3">
        <Link to="/academy/learn/dashboard" className="btn btn-primary inline-flex items-center gap-2">
          Go to my dashboard <ArrowRight size={14} />
        </Link>
        <Link to="/academy/paths" className="btn btn-ghost-teal">
          Browse other paths
        </Link>
      </div>

      <p className="mt-4 inline-flex items-center gap-1.5 text-xs text-gw-slate">
        <CheckCircle2 size={13} className="text-gw-teal" /> Your free trial runs for 7 days. We'll remind you before billing starts.
      </p>
    </div>
  );
}
