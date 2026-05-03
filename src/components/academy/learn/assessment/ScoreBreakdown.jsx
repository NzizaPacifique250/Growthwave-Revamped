import { Disclosure, Transition } from '@headlessui/react';
import { Check, X, ChevronDown } from 'lucide-react';
import { humanizeSkill } from '../../../../utils/assessmentEngine.js';

export default function ScoreBreakdown({ assessment, byQuestion }) {
  return (
    <section>
      <h3 className="font-display text-xl font-bold text-gw-ink">Question by question</h3>
      <p className="text-sm text-gw-slate mt-1">
        Tap any question to see your answer and the explanation.
      </p>

      <div className="mt-4 divide-y divide-gw-navy/10 rounded-2xl border border-gw-navy/10 bg-white">
        {assessment.questions.map((q, idx) => {
          const result = byQuestion.find((r) => r.questionId === q.id);
          if (!result) return null;
          const correct = result.correct;
          return (
            <Disclosure key={q.id}>
              {({ open }) => (
                <div>
                  <Disclosure.Button className="w-full px-4 py-3 flex items-center gap-3 text-left hover:bg-gw-ice/40 transition">
                    <span
                      className={`h-7 w-7 rounded-lg flex items-center justify-center shrink-0 ${
                        correct ? 'bg-gw-teal text-white' : 'bg-red-100 text-red-600'
                      }`}
                    >
                      {correct ? <Check size={14} /> : <X size={14} />}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-gw-ink leading-snug truncate">
                        {idx + 1}. {q.question}
                      </p>
                      <p className="text-[11px] text-gw-slate mt-0.5">
                        {humanizeSkill(q.skillTag)}
                      </p>
                    </div>
                    <span
                      className={`text-[11px] font-bold ${
                        correct ? 'text-gw-teal' : 'text-red-600'
                      }`}
                    >
                      {correct ? 'Correct' : 'Wrong'}
                    </span>
                    <ChevronDown
                      size={16}
                      className={`text-gw-slate transition-transform shrink-0 ${
                        open ? 'rotate-180' : ''
                      }`}
                    />
                  </Disclosure.Button>
                  <Transition
                    enter="transition duration-150 ease-out"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="transition duration-100 ease-out"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <Disclosure.Panel className="px-4 pb-4 pt-0">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
                        <Box label="Your answer">{describeAnswer(q, result.given)}</Box>
                        <Box label="Correct answer">{describeCorrect(q)}</Box>
                      </div>
                      <p className="mt-3 text-sm text-gw-ink leading-relaxed">
                        {q.explanation}
                      </p>
                    </Disclosure.Panel>
                  </Transition>
                </div>
              )}
            </Disclosure>
          );
        })}
      </div>
    </section>
  );
}

function Box({ label, children }) {
  return (
    <div className="rounded-lg bg-gw-ice/60 px-3 py-2.5">
      <div className="text-[10px] uppercase tracking-wider font-semibold text-gw-slate">{label}</div>
      <div className="mt-1 text-xs text-gw-ink leading-relaxed">{children}</div>
    </div>
  );
}

function describeAnswer(q, given) {
  if (given === undefined || given === null) return <em className="text-gw-slate">No answer</em>;
  if (q.type === 'multi') {
    if (!Array.isArray(given) || given.length === 0)
      return <em className="text-gw-slate">No answer</em>;
    return given.map((i) => q.options[i].label).join(' · ');
  }
  return q.options[given]?.label ?? <em className="text-gw-slate">No answer</em>;
}

function describeCorrect(q) {
  if (q.type === 'multi') {
    return q.correctIndices.map((i) => q.options[i].label).join(' · ');
  }
  return q.options[q.correctIndex].label;
}
