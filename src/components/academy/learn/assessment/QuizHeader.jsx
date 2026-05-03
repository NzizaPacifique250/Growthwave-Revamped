import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { X, Clock } from 'lucide-react';

export default function QuizHeader({
  pathTitle,
  moduleTitle,
  questionIdx,
  totalQuestions,
  scorePercent,
  timerLabel,
  exitTo,
}) {
  const percent = totalQuestions > 0 ? ((questionIdx + 1) / totalQuestions) * 100 : 0;
  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur border-b border-gw-navy/10">
      <div className="container-x py-3 flex items-center gap-4">
        <Link
          to={exitTo}
          className="text-gw-slate hover:text-gw-ink transition shrink-0"
          aria-label="Exit assessment"
        >
          <X size={18} />
        </Link>
        <div className="min-w-0 flex-1">
          <p className="text-[11px] uppercase tracking-wider font-semibold text-gw-slate truncate">
            {pathTitle} · {moduleTitle}
          </p>
          <p className="font-display text-sm font-bold text-gw-ink truncate">
            Question {questionIdx + 1} of {totalQuestions}
          </p>
        </div>
        {scorePercent !== undefined && scorePercent !== null && (
          <span className="hidden sm:inline-flex items-center gap-1.5 rounded-lg bg-gw-teal/15 text-gw-teal px-3 py-1.5 text-xs font-bold">
            Score so far · {scorePercent}%
          </span>
        )}
        {timerLabel && (
          <span className="inline-flex items-center gap-1 rounded-lg bg-gw-ice text-gw-slate px-2.5 py-1.5 text-xs font-semibold">
            <Clock size={11} /> {timerLabel}
          </span>
        )}
      </div>
      <div className="h-1 bg-gw-ice">
        <motion.div
          className="h-full bg-gw-teal"
          initial={{ width: 0 }}
          animate={{ width: `${percent}%` }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        />
      </div>
    </header>
  );
}
