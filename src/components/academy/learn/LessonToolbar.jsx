import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Pencil, Bookmark, MessageCircle, Check } from 'lucide-react';

export default function LessonToolbar({
  bookmarked,
  onToggleBookmark,
  onOpenNotes,
  onAskMentor,
  onPrev,
  onNext,
  onMarkComplete,
  hasPrev,
  hasNext,
  canMarkComplete,
  isCompleted,
  isLastLesson,
  assessmentHref,
}) {
  return (
    <div className="sticky bottom-0 z-30 bg-white border-t border-gw-navy/10 shadow-[0_-4px_18px_-12px_rgba(13,27,75,0.12)]">
      <div className="container-x py-3 flex items-center gap-2 flex-wrap">
        {/* Left utilities */}
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={onOpenNotes}
            className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-semibold text-gw-slate hover:text-gw-ink hover:bg-gw-ice transition"
          >
            <Pencil size={13} /> Notes
          </button>
          <button
            type="button"
            onClick={onToggleBookmark}
            className={`sm:hidden inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-semibold transition ${
              bookmarked
                ? 'text-gw-amber bg-gw-amber/10'
                : 'text-gw-slate hover:text-gw-ink hover:bg-gw-ice'
            }`}
          >
            <Bookmark size={13} className={bookmarked ? 'fill-gw-amber' : ''} />
            {bookmarked ? 'Saved' : 'Save'}
          </button>
          <button
            type="button"
            onClick={onAskMentor}
            className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-semibold text-gw-slate hover:text-gw-ink hover:bg-gw-ice transition"
          >
            <MessageCircle size={13} /> Ask mentor
          </button>
        </div>

        <div className="ml-auto flex items-center gap-2">
          <button
            type="button"
            onClick={onPrev}
            disabled={!hasPrev}
            className={`inline-flex items-center gap-1 rounded-lg px-3 py-1.5 text-xs font-semibold border transition ${
              hasPrev
                ? 'border-gw-navy/15 text-gw-ink hover:border-gw-teal hover:text-gw-teal'
                : 'border-gw-navy/10 text-gw-slate/50 cursor-not-allowed'
            }`}
          >
            <ChevronLeft size={13} /> Prev
          </button>

          {isLastLesson && assessmentHref ? (
            <Link
              to={assessmentHref}
              className="btn btn-primary !py-1.5 !px-3 text-xs inline-flex items-center gap-1.5"
            >
              <ClipboardCheckIcon /> Take module quiz
            </Link>
          ) : isCompleted ? (
            <span className="inline-flex items-center gap-1 rounded-lg bg-gw-teal/15 text-gw-teal px-3 py-1.5 text-xs font-semibold">
              <Check size={13} /> Completed
            </span>
          ) : (
            <button
              type="button"
              onClick={onMarkComplete}
              disabled={!canMarkComplete}
              title={
                canMarkComplete
                  ? 'Mark this lesson as complete'
                  : 'Interact with the lesson content to enable this'
              }
              className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold border transition ${
                canMarkComplete
                  ? 'bg-gw-teal text-white border-gw-teal hover:brightness-110'
                  : 'bg-gw-ice text-gw-slate/60 border-gw-navy/10 cursor-not-allowed'
              }`}
            >
              <Check size={13} /> Mark complete
            </button>
          )}

          <button
            type="button"
            onClick={onNext}
            disabled={!hasNext}
            className={`inline-flex items-center gap-1 rounded-lg px-3 py-1.5 text-xs font-semibold border transition ${
              hasNext
                ? 'border-gw-navy/15 text-gw-ink hover:border-gw-teal hover:text-gw-teal'
                : 'border-gw-navy/10 text-gw-slate/50 cursor-not-allowed'
            }`}
          >
            Next <ChevronRight size={13} />
          </button>
        </div>
      </div>
    </div>
  );
}

function ClipboardCheckIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
      <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
      <path d="m9 14 2 2 4-4" />
    </svg>
  );
}
