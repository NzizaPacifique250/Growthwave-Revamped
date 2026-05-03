import { Check, X } from 'lucide-react';

export function SingleChoice({ question, value, onChange, isSubmitted }) {
  return (
    <div role="radiogroup" className="grid grid-cols-1 gap-2">
      {question.options.map((opt, idx) => {
        const isSelected = value === idx;
        const isCorrect = idx === question.correctIndex;
        const showCorrect = isSubmitted && isCorrect;
        const showWrong = isSubmitted && isSelected && !isCorrect;
        return (
          <button
            type="button"
            key={idx}
            role="radio"
            aria-checked={isSelected}
            disabled={isSubmitted}
            onClick={() => onChange(idx)}
            className={`text-left rounded-xl border-2 p-3.5 transition-all flex items-start gap-3 ${
              showCorrect
                ? 'border-gw-teal bg-gw-teal/5'
                : showWrong
                  ? 'border-red-300 bg-red-50'
                  : isSelected
                    ? 'border-gw-teal bg-gw-teal/5'
                    : 'border-gw-navy/15 hover:border-gw-teal/50 bg-white'
            } ${isSubmitted ? 'cursor-default' : ''}`}
          >
            <Marker selected={isSelected} correct={showCorrect} wrong={showWrong} />
            <span className="text-sm text-gw-ink leading-snug font-mono">
              {opt.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}

export function MultiChoice({ question, value, onChange, isSubmitted }) {
  const selected = Array.isArray(value) ? value : [];

  const toggle = (idx) => {
    if (isSubmitted) return;
    if (selected.includes(idx)) onChange(selected.filter((x) => x !== idx));
    else onChange([...selected, idx]);
  };

  return (
    <>
      <div className="grid grid-cols-1 gap-2">
        {question.options.map((opt, idx) => {
          const isSelected = selected.includes(idx);
          const shouldHaveSelected = question.correctIndices.includes(idx);
          const showCorrect = isSubmitted && shouldHaveSelected;
          const showWrong = isSubmitted && isSelected && !shouldHaveSelected;
          return (
            <button
              type="button"
              key={idx}
              disabled={isSubmitted}
              onClick={() => toggle(idx)}
              aria-pressed={isSelected}
              className={`text-left rounded-xl border-2 p-3.5 transition-all flex items-start gap-3 ${
                showCorrect
                  ? 'border-gw-teal bg-gw-teal/5'
                  : showWrong
                    ? 'border-red-300 bg-red-50'
                    : isSelected
                      ? 'border-gw-teal bg-gw-teal/5'
                      : 'border-gw-navy/15 hover:border-gw-teal/50 bg-white'
              } ${isSubmitted ? 'cursor-default' : ''}`}
            >
              <CheckMarker selected={isSelected} correct={showCorrect} wrong={showWrong} />
              <span className="text-sm text-gw-ink leading-snug">{opt.label}</span>
            </button>
          );
        })}
      </div>
      <p className="mt-3 text-[11px] text-gw-slate">Select all that apply.</p>
    </>
  );
}

function Marker({ selected, correct, wrong }) {
  return (
    <span
      className={`mt-0.5 h-5 w-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
        correct
          ? 'border-gw-teal bg-gw-teal text-white'
          : wrong
            ? 'border-red-400 bg-red-400 text-white'
            : selected
              ? 'border-gw-teal bg-gw-teal'
              : 'border-gw-navy/25'
      }`}
    >
      {correct ? <Check size={11} /> : wrong ? <X size={11} /> : selected ? <span className="h-2 w-2 rounded-full bg-white" /> : null}
    </span>
  );
}

function CheckMarker({ selected, correct, wrong }) {
  return (
    <span
      className={`mt-0.5 h-5 w-5 rounded border-2 flex items-center justify-center shrink-0 ${
        correct
          ? 'border-gw-teal bg-gw-teal text-white'
          : wrong
            ? 'border-red-400 bg-red-400 text-white'
            : selected
              ? 'border-gw-teal bg-gw-teal text-white'
              : 'border-gw-navy/25'
      }`}
    >
      {(selected || correct) && !wrong && <Check size={11} />}
      {wrong && <X size={11} />}
    </span>
  );
}
