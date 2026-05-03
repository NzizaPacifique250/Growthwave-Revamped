import { Clock, Lightbulb, ShieldCheck } from 'lucide-react';
import { assessmentTips } from '../../../data/assessmentQuestions.js';

export default function AssessmentSidebar({ remainingMinutes, currentStep }) {
  return (
    <aside className="rounded-2xl bg-white border border-gw-navy/10 shadow-card p-5 lg:sticky lg:top-24 self-start">
      <div className="flex items-center gap-2 text-xs font-semibold text-gw-slate">
        <Clock size={14} className="text-gw-teal" />
        <span>~{remainingMinutes} min remaining</span>
      </div>
      <div className="mt-1 font-display font-bold text-gw-ink">{currentStep?.label}</div>

      <div className="mt-4 rounded-xl bg-gw-ice/60 p-4">
        <p className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-wider font-semibold text-gw-slate mb-2">
          <Lightbulb size={11} /> Why we ask
        </p>
        <p className="text-sm text-gw-ink leading-relaxed">{currentStep?.helper}</p>
      </div>

      <div className="mt-5 pt-5 border-t border-gw-navy/10">
        <p className="text-[11px] uppercase tracking-wider font-semibold text-gw-slate mb-2 inline-flex items-center gap-1.5">
          <ShieldCheck size={11} /> Tips
        </p>
        <ul className="space-y-2">
          {assessmentTips.map((tip) => (
            <li key={tip} className="text-xs text-gw-slate leading-relaxed flex gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-gw-teal mt-1.5 shrink-0" />
              {tip}
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
