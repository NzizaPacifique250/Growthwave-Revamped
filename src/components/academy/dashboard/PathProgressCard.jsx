import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export default function PathProgressCard({ path, enrollment }) {
  const totalModules = enrollment.modules.length;
  const completedModules = enrollment.modules.filter((m) => m.status === 'completed').length;
  const currentModule = enrollment.modules.find((m) => m.status === 'in-progress');
  const overall = enrollment.overallProgress;
  const percent = Math.round(overall * 100);

  return (
    <div className="rounded-2xl bg-white border border-gw-navy/10 shadow-card p-5">
      <div className="flex items-center gap-4">
        <ProgressRing value={overall} />
        <div className="flex-1 min-w-0">
          <p className="text-[11px] uppercase tracking-wider font-semibold text-gw-slate">
            Path progress
          </p>
          <p className="font-display text-lg font-bold text-gw-ink truncate">{path.title}</p>
          <p className="text-xs text-gw-slate mt-0.5">
            {completedModules} of {totalModules} modules complete
          </p>
        </div>
      </div>

      {currentModule && (
        <div className="mt-4 pt-4 border-t border-gw-navy/10">
          <p className="text-[11px] uppercase tracking-wider font-semibold text-gw-slate">
            Current module
          </p>
          <p className="mt-1 text-sm font-semibold text-gw-ink">{currentModule.title}</p>
          <div className="mt-2 h-1.5 rounded-full bg-gw-ice overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${Math.round((currentModule.progress || 0) * 100)}%` }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="h-full bg-gw-teal"
            />
          </div>
          <div className="mt-2 flex items-center justify-between text-[11px] text-gw-slate">
            <span>{Math.round((currentModule.progress || 0) * 100)}% complete</span>
            <Link
              to={`/academy/paths/${path.slug}`}
              className="font-semibold text-gw-teal hover:underline inline-flex items-center gap-1"
            >
              See path <ArrowRight size={11} />
            </Link>
          </div>
        </div>
      )}

      <div className="mt-4 inline-flex items-center gap-1 text-[11px] text-gw-slate">
        Overall <span className="font-bold text-gw-ink">{percent}%</span>
      </div>
    </div>
  );
}

function ProgressRing({ value }) {
  const radius = 28;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - value * circumference;
  const percent = Math.round(value * 100);
  return (
    <div className="relative h-20 w-20 shrink-0">
      <svg className="-rotate-90" viewBox="0 0 72 72" width="80" height="80">
        <circle cx="36" cy="36" r={radius} stroke="rgba(13,27,75,0.10)" strokeWidth="6" fill="none" />
        <motion.circle
          cx="36"
          cy="36"
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
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="font-display text-lg font-bold text-gw-ink">{percent}%</span>
      </div>
    </div>
  );
}
