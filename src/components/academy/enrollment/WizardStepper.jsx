import { Check } from 'lucide-react';

export default function WizardStepper({ steps, currentIndex, onJumpTo }) {
  return (
    <ol className="flex items-center gap-2 overflow-x-auto" aria-label="Enrollment progress">
      {steps.map((step, idx) => {
        const completed = idx < currentIndex;
        const active = idx === currentIndex;
        const enabled = idx <= currentIndex;
        return (
          <li key={step.id} className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              disabled={!enabled}
              onClick={() => enabled && onJumpTo(idx)}
              className={`group inline-flex items-center gap-2 rounded-full pl-1 pr-3 py-1 transition ${
                active
                  ? 'bg-gw-teal/15 text-gw-teal'
                  : completed
                    ? 'text-gw-ink hover:bg-gw-ice'
                    : 'text-gw-slate'
              } ${enabled ? 'cursor-pointer' : 'cursor-not-allowed opacity-60'}`}
              aria-current={active ? 'step' : undefined}
            >
              <span
                className={`h-7 w-7 rounded-full flex items-center justify-center text-xs font-bold ${
                  completed
                    ? 'bg-gw-teal text-white'
                    : active
                      ? 'bg-white border-2 border-gw-teal text-gw-teal'
                      : 'bg-gw-ice text-gw-slate'
                }`}
              >
                {completed ? <Check size={14} /> : idx + 1}
              </span>
              <span className="text-xs font-semibold whitespace-nowrap">{step.label}</span>
            </button>
            {idx < steps.length - 1 && (
              <span
                className={`h-px w-6 ${completed ? 'bg-gw-teal' : 'bg-gw-navy/15'}`}
                aria-hidden
              />
            )}
          </li>
        );
      })}
    </ol>
  );
}
