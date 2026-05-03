import { motion } from 'framer-motion';
import { Target } from 'lucide-react';

export default function WeeklyGoalCard({ logged, goal, onAdd }) {
  const ratio = Math.min(1, logged / goal);
  const percent = Math.round(ratio * 100);
  const message = messageFor(ratio);

  return (
    <div className="rounded-2xl bg-white border border-gw-navy/10 shadow-card p-5">
      <div className="flex items-baseline justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="h-8 w-8 rounded-lg bg-gw-teal/15 text-gw-teal flex items-center justify-center">
            <Target size={14} />
          </span>
          <p className="text-[11px] uppercase tracking-wider font-semibold text-gw-slate">
            Weekly goal
          </p>
        </div>
        <p className="text-xs font-bold text-gw-ink">
          {logged.toFixed(1)} / {goal} hrs
        </p>
      </div>

      <div className="mt-3 h-2 rounded-full bg-gw-ice overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percent}%` }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="h-full bg-gw-teal"
        />
      </div>

      <p className="mt-3 text-xs text-gw-slate leading-relaxed">{message}</p>

      <button
        type="button"
        onClick={() => onAdd?.(0.5)}
        className="mt-3 text-xs font-semibold text-gw-teal hover:underline"
      >
        + Log 30 minutes
      </button>
    </div>
  );
}

function messageFor(ratio) {
  if (ratio >= 1) return 'Goal hit. Anything beyond this is a bonus.';
  if (ratio >= 0.75) return "You're almost there — finish strong this week.";
  if (ratio >= 0.5) return 'Halfway there. One good session keeps you on track.';
  if (ratio >= 0.25) return "Steady start. The next session puts you ahead of last week.";
  return 'Fresh week — log your first session to set the pace.';
}
