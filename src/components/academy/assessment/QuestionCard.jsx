import { Check } from 'lucide-react';

export default function QuestionCard({ step, value, onChange }) {
  return (
    <div className="rounded-2xl bg-white border border-gw-navy/10 shadow-card p-6 md:p-8">
      <h2 className="font-display text-2xl md:text-3xl font-bold text-gw-ink leading-tight">
        {step.title}
      </h2>
      <p className="mt-2 text-sm text-gw-slate leading-relaxed">{step.helper}</p>

      <div className="mt-6">
        {step.type === 'single' && (
          <SingleChoice options={step.options} value={value} onChange={onChange} />
        )}
        {step.type === 'multi' && (
          <MultiChoice options={step.options} value={value || []} onChange={onChange} />
        )}
        {step.type === 'slider' && (
          <SliderInput step={step} value={value ?? step.default} onChange={onChange} />
        )}
      </div>
    </div>
  );
}

function SingleChoice({ options, value, onChange }) {
  return (
    <div role="radiogroup" className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {options.map((opt) => {
        const selected = value === opt.id;
        return (
          <button
            type="button"
            role="radio"
            aria-checked={selected}
            key={opt.id}
            onClick={() => onChange(opt.id)}
            className={`text-left rounded-xl border-2 p-4 transition-all ${
              selected
                ? 'border-gw-teal bg-gw-teal/5 shadow-sm'
                : 'border-gw-navy/15 hover:border-gw-teal/50 bg-white'
            }`}
          >
            <div className="flex items-start gap-3">
              <span
                className={`mt-0.5 h-5 w-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                  selected ? 'border-gw-teal bg-gw-teal' : 'border-gw-navy/25'
                }`}
              >
                {selected && <span className="h-2 w-2 rounded-full bg-white" />}
              </span>
              <div>
                <div className="font-semibold text-gw-ink text-sm">{opt.label}</div>
                {opt.description && (
                  <div className="text-xs text-gw-slate mt-1 leading-relaxed">{opt.description}</div>
                )}
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
}

function MultiChoice({ options, value, onChange }) {
  const toggle = (id) => {
    if (value.includes(id)) onChange(value.filter((x) => x !== id));
    else onChange([...value, id]);
  };
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((opt) => {
        const selected = value.includes(opt.id);
        return (
          <button
            type="button"
            key={opt.id}
            onClick={() => toggle(opt.id)}
            className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-full text-sm font-semibold border-2 transition-all ${
              selected
                ? 'bg-gw-teal text-white border-gw-teal'
                : 'bg-white text-gw-ink border-gw-navy/15 hover:border-gw-teal hover:text-gw-teal'
            }`}
            aria-pressed={selected}
          >
            {selected && <Check size={14} />}
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}

function SliderInput({ step, value, onChange }) {
  return (
    <div>
      <div className="flex items-baseline justify-between">
        <div>
          <div className="font-display text-4xl font-bold text-gw-ink">
            {value}
            <span className="ml-1 text-base font-semibold text-gw-slate">{step.unit}</span>
          </div>
        </div>
        <div className="text-xs text-gw-slate">
          {step.min} – {step.max} {step.unit}
        </div>
      </div>
      <input
        type="range"
        min={step.min}
        max={step.max}
        step={step.step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-3 w-full accent-gw-teal"
        aria-label={step.title}
      />
      <div className="mt-2 flex justify-between text-[11px] text-gw-slate font-semibold">
        <span>Light</span>
        <span>Steady</span>
        <span>Intensive</span>
      </div>
    </div>
  );
}
