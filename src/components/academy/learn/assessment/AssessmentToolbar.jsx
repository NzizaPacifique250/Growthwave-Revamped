import { ChevronLeft, ChevronRight, Check } from 'lucide-react';

export default function AssessmentToolbar({
  hasPrev,
  hasNext,
  isAnswered,
  isSubmitted,
  isLast,
  onPrev,
  onSubmitAnswer,
  onNext,
  onFinishAssessment,
}) {
  return (
    <div className="sticky bottom-0 z-30 bg-white border-t border-gw-navy/10 shadow-[0_-4px_18px_-12px_rgba(13,27,75,0.12)]">
      <div className="container-x py-3 flex items-center gap-2 flex-wrap">
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
          <ChevronLeft size={13} /> Previous
        </button>

        <div className="ml-auto flex items-center gap-2">
          {!isSubmitted ? (
            <button
              type="button"
              onClick={onSubmitAnswer}
              disabled={!isAnswered}
              className={`inline-flex items-center gap-1.5 rounded-lg px-4 py-1.5 text-xs font-semibold border transition ${
                isAnswered
                  ? 'bg-gw-teal text-white border-gw-teal hover:brightness-110'
                  : 'bg-gw-ice text-gw-slate/60 border-gw-navy/10 cursor-not-allowed'
              }`}
            >
              <Check size={13} /> Submit answer
            </button>
          ) : isLast ? (
            <button
              type="button"
              onClick={onFinishAssessment}
              className="inline-flex items-center gap-1.5 rounded-lg bg-gw-teal text-white px-4 py-1.5 text-xs font-semibold hover:brightness-110 transition"
            >
              See my results <ChevronRight size={13} />
            </button>
          ) : (
            <button
              type="button"
              onClick={onNext}
              disabled={!hasNext}
              className={`inline-flex items-center gap-1 rounded-lg px-4 py-1.5 text-xs font-semibold border transition ${
                hasNext
                  ? 'bg-gw-teal text-white border-gw-teal hover:brightness-110'
                  : 'border-gw-navy/10 text-gw-slate/50 cursor-not-allowed'
              }`}
            >
              Next question <ChevronRight size={13} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
