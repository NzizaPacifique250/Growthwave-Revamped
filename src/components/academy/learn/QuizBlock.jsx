import { motion, AnimatePresence } from 'framer-motion';
import { Check, X, Lightbulb, RefreshCw } from 'lucide-react';

export default function QuizBlock({ block, blockState, updateBlockState, onInteract }) {
  const selected = blockState.data.selected ?? null;
  const submitted = blockState.data.submitted ?? false;

  const select = (idx) => {
    if (submitted) return;
    updateBlockState(block.id, { data: { selected: idx } });
  };

  const submit = () => {
    if (selected === null) return;
    updateBlockState(block.id, { data: { submitted: true } });
    if (!blockState.interacted) onInteract();
  };

  const reset = () => {
    updateBlockState(block.id, { data: { selected: null, submitted: false } });
  };

  const isCorrect = submitted && block.options[selected]?.correct;

  return (
    <article className="rounded-2xl bg-white border border-gw-navy/10 shadow-card p-6 md:p-8">
      <p className="text-[11px] uppercase tracking-wider font-semibold text-gw-slate mb-2">
        Quick check
      </p>
      <h3 className="font-display text-xl md:text-2xl font-bold text-gw-ink leading-tight">
        {block.question}
      </h3>

      <div role="radiogroup" className="mt-5 grid grid-cols-1 gap-2">
        {block.options.map((opt, idx) => {
          const isSelected = selected === idx;
          const correct = submitted && opt.correct;
          const wrong = submitted && isSelected && !opt.correct;

          return (
            <button
              type="button"
              key={idx}
              role="radio"
              aria-checked={isSelected}
              onClick={() => select(idx)}
              disabled={submitted}
              className={`text-left rounded-xl border-2 p-3.5 transition-all flex items-start gap-3 ${
                correct
                  ? 'border-gw-teal bg-gw-teal/5'
                  : wrong
                    ? 'border-red-300 bg-red-50'
                    : isSelected
                      ? 'border-gw-teal bg-gw-teal/5'
                      : 'border-gw-navy/15 hover:border-gw-teal/50 bg-white'
              } ${submitted ? 'cursor-default' : ''}`}
            >
              <span
                className={`mt-0.5 h-5 w-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                  correct
                    ? 'border-gw-teal bg-gw-teal text-white'
                    : wrong
                      ? 'border-red-400 bg-red-400 text-white'
                      : isSelected
                        ? 'border-gw-teal bg-gw-teal'
                        : 'border-gw-navy/25'
                }`}
              >
                {correct ? <Check size={11} /> : wrong ? <X size={11} /> : isSelected ? <span className="h-2 w-2 rounded-full bg-white" /> : null}
              </span>
              <span className="text-sm text-gw-ink leading-snug font-mono">{opt.label}</span>
            </button>
          );
        })}
      </div>

      <AnimatePresence>
        {submitted && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            className={`mt-4 rounded-xl px-4 py-3 flex items-start gap-2 ${
              isCorrect
                ? 'bg-gw-teal/10 text-gw-teal'
                : 'bg-gw-amber/10 text-gw-ink border border-gw-amber/30'
            }`}
          >
            <Lightbulb size={14} className={`mt-0.5 shrink-0 ${isCorrect ? 'text-gw-teal' : 'text-gw-amber'}`} />
            <div>
              <p className="font-semibold text-sm">
                {isCorrect ? 'Correct.' : 'Not quite — here is what is happening.'}
              </p>
              <p className={`mt-1 text-xs leading-relaxed ${isCorrect ? '' : 'text-gw-ink/85'}`}>
                {block.explanation}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mt-5 flex items-center gap-2">
        {submitted ? (
          <button
            type="button"
            onClick={reset}
            className="inline-flex items-center gap-1.5 rounded-md bg-gw-ice text-gw-slate hover:text-gw-ink px-3 py-1.5 text-xs font-semibold transition"
          >
            <RefreshCw size={12} /> Try again
          </button>
        ) : (
          <button
            type="button"
            onClick={submit}
            disabled={selected === null}
            className={`inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-semibold transition ${
              selected === null
                ? 'bg-gw-ice text-gw-slate/60 cursor-not-allowed'
                : 'bg-gw-teal text-white hover:brightness-110'
            }`}
          >
            <Check size={12} /> Submit
          </button>
        )}
      </div>
    </article>
  );
}
