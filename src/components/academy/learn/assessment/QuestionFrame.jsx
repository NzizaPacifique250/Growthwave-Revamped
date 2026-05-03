import { motion, AnimatePresence } from 'framer-motion';
import { Lightbulb } from 'lucide-react';
import { humanizeSkill } from '../../../../utils/assessmentEngine.js';

export default function QuestionFrame({
  question,
  isSubmitted,
  isCorrect,
  hintUsed,
  canUseHint,
  onUseHint,
  children,
}) {
  return (
    <article className="rounded-2xl bg-white border border-gw-navy/10 shadow-card p-6 md:p-8">
      <div className="flex items-baseline justify-between gap-3 flex-wrap">
        <p className="text-[11px] uppercase tracking-wider font-semibold text-gw-slate">
          Skill · {humanizeSkill(question.skillTag)}
        </p>
        <button
          type="button"
          onClick={onUseHint}
          disabled={!canUseHint || hintUsed || isSubmitted}
          className={`inline-flex items-center gap-1 px-2.5 py-1.5 rounded-md text-xs font-semibold transition ${
            hintUsed
              ? 'bg-gw-amber/15 text-gw-amber'
              : canUseHint && !isSubmitted
                ? 'bg-gw-ice text-gw-ink hover:bg-gw-amber/15 hover:text-gw-amber'
                : 'bg-gw-ice text-gw-slate/60 cursor-not-allowed'
          }`}
          title={
            hintUsed
              ? 'Hint already used for this question'
              : isSubmitted
                ? 'Hints are not available after submitting'
                : canUseHint
                  ? 'Reveal a hint (costs one hint slot)'
                  : 'Hints unlock from attempt 2 onward'
          }
        >
          <Lightbulb size={12} />
          {hintUsed ? 'Hint shown' : 'Use hint'}
        </button>
      </div>

      <h2 className="mt-3 font-display text-xl md:text-2xl font-bold text-gw-ink leading-snug">
        {question.question}
      </h2>

      <AnimatePresence>
        {hintUsed && question.hintText && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="mt-4 rounded-lg bg-gw-amber/10 border border-gw-amber/30 px-3 py-2.5 text-xs text-gw-ink leading-relaxed">
              <strong className="text-gw-amber">Hint · </strong>
              {question.hintText}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {question.codeSnippet && (
        <pre className="mt-5 rounded-xl bg-gw-midnightCard text-white/90 p-4 overflow-x-auto text-[12px] leading-relaxed">
          <code className="font-mono">{question.codeSnippet}</code>
        </pre>
      )}

      <div className="mt-6">{children}</div>

      <AnimatePresence>
        {isSubmitted && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            className={`mt-5 rounded-xl px-4 py-3 flex items-start gap-2 ${
              isCorrect
                ? 'bg-gw-teal/10 text-gw-teal'
                : 'bg-red-50 text-red-700 border border-red-200'
            }`}
          >
            <Lightbulb
              size={14}
              className={`mt-0.5 shrink-0 ${isCorrect ? 'text-gw-teal' : 'text-red-500'}`}
            />
            <div>
              <p className="font-semibold text-sm">
                {isCorrect ? 'Correct.' : 'Not quite — here is what is happening.'}
              </p>
              <p className="mt-1 text-xs leading-relaxed">{question.explanation}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </article>
  );
}
