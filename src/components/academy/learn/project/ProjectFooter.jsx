import { motion } from 'framer-motion';

export default function ProjectFooter({ doneCount, totalCount, milestoneLabel, daysLabel }) {
  const percent = totalCount > 0 ? (doneCount / totalCount) * 100 : 0;
  return (
    <footer className="sticky bottom-0 z-30 bg-white border-t border-gw-navy/10 shadow-[0_-4px_18px_-12px_rgba(13,27,75,0.12)]">
      <div className="container-x py-3 flex items-center gap-4 flex-wrap text-xs">
        <div className="flex-1 min-w-[200px]">
          <div className="flex items-baseline justify-between gap-2 mb-1">
            <span className="text-gw-slate font-semibold">{milestoneLabel}</span>
            <span className="text-gw-ink font-bold">
              {doneCount} / {totalCount} requirements
            </span>
          </div>
          <div className="h-1.5 rounded-full bg-gw-ice overflow-hidden">
            <motion.div
              className="h-full bg-gw-teal"
              initial={{ width: 0 }}
              animate={{ width: `${percent}%` }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            />
          </div>
        </div>
        <div className="text-[11px] text-gw-slate font-semibold whitespace-nowrap">
          {daysLabel}
        </div>
      </div>
    </footer>
  );
}
