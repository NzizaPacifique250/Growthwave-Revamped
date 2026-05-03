import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { X, Bookmark } from 'lucide-react';

export default function LessonHeader({
  path,
  module: currentModule,
  lesson,
  lessonIdx,
  totalLessons,
  lessonProgress,
  bookmarked,
  onToggleBookmark,
}) {
  const percent = Math.round(lessonProgress * 100);
  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur border-b border-gw-navy/10">
      <div className="container-x py-3 flex items-center gap-4">
        <Link
          to="/academy/learn/dashboard"
          className="text-gw-slate hover:text-gw-ink transition shrink-0"
          aria-label="Back to dashboard"
        >
          <X size={18} />
        </Link>

        <div className="min-w-0 flex-1">
          <p className="text-[11px] uppercase tracking-wider font-semibold text-gw-slate truncate">
            {path.title} · {currentModule.title}
          </p>
          <p className="font-display text-sm font-bold text-gw-ink truncate">
            Lesson {lessonIdx + 1} of {totalLessons} · {lesson.title}
          </p>
        </div>

        <button
          type="button"
          onClick={onToggleBookmark}
          className={`hidden sm:inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-semibold transition ${
            bookmarked
              ? 'border-gw-amber text-gw-amber bg-gw-amber/10'
              : 'border-gw-navy/15 text-gw-slate hover:border-gw-teal hover:text-gw-teal'
          }`}
        >
          <Bookmark size={13} className={bookmarked ? 'fill-gw-amber' : ''} />
          {bookmarked ? 'Bookmarked' : 'Bookmark'}
        </button>
      </div>

      <div className="h-1 bg-gw-ice">
        <motion.div
          className="h-full bg-gw-teal"
          initial={{ width: 0 }}
          animate={{ width: `${percent}%` }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        />
      </div>
    </header>
  );
}
