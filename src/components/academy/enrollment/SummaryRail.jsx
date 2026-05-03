import { Brain, Code2, Sparkles, Layers, Clock, ShieldCheck, MessageCircle } from 'lucide-react';
import { enrollmentPlans, formatCurrency } from '../../../data/plans.js';

const iconMap = { Brain, Code2, Sparkles, Layers };

export default function SummaryRail({ path, formData }) {
  const Icon = iconMap[path.icon] || Code2;
  const plan = enrollmentPlans.find((p) => p.id === formData.planId);

  return (
    <aside className="rounded-2xl bg-white border border-gw-navy/10 shadow-card overflow-hidden lg:sticky lg:top-24 self-start">
      <div className="bg-gradient-to-br from-gw-midnight to-gw-navy text-white p-5">
        <div className="text-[11px] uppercase tracking-wider font-semibold text-white/60">
          Your enrollment
        </div>
        <div className="mt-2 flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-gw-teal/15 border border-gw-teal/40 text-gw-teal flex items-center justify-center shrink-0">
            <Icon size={18} />
          </div>
          <div className="min-w-0">
            <div className="font-display font-bold leading-tight truncate">{path.title}</div>
            <div className="text-[11px] text-white/60 truncate">{path.tagline}</div>
          </div>
        </div>
      </div>

      <div className="p-5 space-y-4">
        <Row label="Path" value={path.title} />
        <Row label="Duration" value={path.duration} />
        <Row label="Commitment" value={`${formData.weeklyHours} hrs/week`} />
        {plan && <Row label="Plan" value={plan.label} />}
        {plan && (
          <Row
            label="Billed"
            value={`${formatCurrency(plan.priceUsd, formData.currency)} ${plan.cadence}`}
          />
        )}

        <div className="pt-3 mt-2 border-t border-gw-navy/10">
          <Row
            label="Today"
            value={<span className="text-gw-teal font-bold">$0.00</span>}
            emphasized
          />
          <p className="mt-2 text-[11px] text-gw-slate leading-relaxed">
            Free for 7 days. Billing kicks in after your trial — and you can cancel any time before then.
          </p>
        </div>

        <div className="pt-4 mt-2 border-t border-gw-navy/10 space-y-2 text-xs">
          <Highlight icon={ShieldCheck} text="30-day money-back guarantee" />
          <Highlight icon={Clock} text="Pause your plan if life happens" />
          <Highlight icon={MessageCircle} text="Live mentor support included" />
        </div>
      </div>
    </aside>
  );
}

function Row({ label, value, emphasized }) {
  return (
    <div className="flex items-baseline justify-between gap-3 text-sm">
      <span className="text-xs uppercase tracking-wider font-semibold text-gw-slate">{label}</span>
      <span
        className={`text-right ${
          emphasized ? 'font-display text-base text-gw-ink' : 'text-gw-ink font-semibold'
        }`}
      >
        {value}
      </span>
    </div>
  );
}

function Highlight({ icon: Icon, text }) {
  return (
    <div className="inline-flex items-center gap-2 text-gw-slate">
      <Icon size={13} className="text-gw-teal shrink-0" />
      <span className="leading-snug">{text}</span>
    </div>
  );
}
