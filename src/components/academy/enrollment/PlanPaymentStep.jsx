import { CreditCard, Lock, AlertCircle, HeartHandshake } from 'lucide-react';
import FieldGroup, { TextInput } from './FieldGroup.jsx';
import { enrollmentPlans, billingCurrencies, formatCurrency } from '../../../data/plans.js';

// Format a card number into 4-digit groups as the user types.
function formatCardNumber(raw) {
  const digits = raw.replace(/\D/g, '').slice(0, 19);
  return digits.replace(/(.{4})/g, '$1 ').trim();
}

function formatExpiry(raw) {
  const digits = raw.replace(/\D/g, '').slice(0, 4);
  if (digits.length <= 2) return digits;
  return `${digits.slice(0, 2)}/${digits.slice(2)}`;
}

export default function PlanPaymentStep({
  formData,
  updateField,
  paymentError,
  onOpenScholarship,
}) {
  const selectedPlan = enrollmentPlans.find((p) => p.id === formData.planId);

  return (
    <div>
      <h2 className="font-display text-2xl md:text-3xl font-bold text-gw-ink leading-tight">
        Pick a plan and pay
      </h2>
      <p className="mt-2 text-sm text-gw-slate leading-relaxed">
        Pay nothing today — billing starts after your free week. Scholarships available.
      </p>

      {/* Plans */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-3">
        {enrollmentPlans.map((plan) => {
          const selected = formData.planId === plan.id;
          return (
            <button
              type="button"
              key={plan.id}
              onClick={() => updateField('planId', plan.id)}
              className={`text-left rounded-2xl border-2 p-4 transition-all relative ${
                selected
                  ? 'border-gw-teal bg-gw-teal/5 shadow-card'
                  : 'border-gw-navy/15 bg-white hover:border-gw-teal/50'
              }`}
              aria-pressed={selected}
            >
              {plan.badge && (
                <span className="absolute -top-2.5 right-4 pill bg-gw-teal text-white">
                  {plan.badge}
                </span>
              )}
              <div className="font-display font-bold text-gw-ink">{plan.label}</div>
              <div className="mt-2 flex items-baseline gap-1">
                <span className="font-display text-2xl font-extrabold text-gw-ink">
                  {formatCurrency(plan.priceUsd, formData.currency)}
                </span>
                <span className="text-xs text-gw-slate">{plan.cadence}</span>
              </div>
              <p className="mt-2 text-xs text-gw-slate leading-snug">{plan.description}</p>
              <ul className="mt-3 space-y-1">
                {plan.features.map((f) => (
                  <li key={f} className="text-xs text-gw-ink flex gap-1.5">
                    <span className="text-gw-teal">·</span> {f}
                  </li>
                ))}
              </ul>
            </button>
          );
        })}
      </div>

      {/* Currency toggle */}
      <div className="mt-4 flex items-center justify-between flex-wrap gap-3 text-xs">
        <div className="inline-flex items-center gap-2 rounded-full bg-gw-ice px-1 py-1">
          {billingCurrencies.map((c) => {
            const active = formData.currency === c.id;
            return (
              <button
                type="button"
                key={c.id}
                onClick={() => updateField('currency', c.id)}
                className={`px-3 py-1 rounded-full text-[11px] font-bold transition ${
                  active ? 'bg-white text-gw-ink shadow-sm' : 'text-gw-slate'
                }`}
                aria-pressed={active}
              >
                {c.label}
              </button>
            );
          })}
        </div>
        <button
          type="button"
          onClick={onOpenScholarship}
          className="inline-flex items-center gap-1.5 text-gw-teal font-semibold hover:underline"
        >
          <HeartHandshake size={13} /> Need financial aid? Apply for a scholarship
        </button>
      </div>

      {/* Payment fields */}
      <div className="mt-6 rounded-2xl border border-gw-navy/10 p-5">
        <div className="flex items-center justify-between gap-3 flex-wrap mb-4">
          <h3 className="font-display font-bold text-gw-ink inline-flex items-center gap-2">
            <CreditCard size={16} className="text-gw-teal" /> Payment details
          </h3>
          <span className="inline-flex items-center gap-1 text-[11px] text-gw-slate">
            <Lock size={11} /> Encrypted in transit · billing starts after your free week
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FieldGroup label="Name on card" htmlFor="card-name">
            <TextInput
              id="card-name"
              value={formData.cardName}
              onChange={(v) => updateField('cardName', v)}
              placeholder="Karenzi Marie"
              autoComplete="cc-name"
            />
          </FieldGroup>

          <FieldGroup label="Card number" htmlFor="card-number" hint="Try 4242 4242 4242 4242 to test.">
            <TextInput
              id="card-number"
              value={formData.cardNumber}
              onChange={(v) => updateField('cardNumber', formatCardNumber(v))}
              placeholder="4242 4242 4242 4242"
              autoComplete="cc-number"
              inputMode="numeric"
              maxLength={23}
            />
          </FieldGroup>

          <FieldGroup label="Expiry" htmlFor="card-expiry">
            <TextInput
              id="card-expiry"
              value={formData.cardExpiry}
              onChange={(v) => updateField('cardExpiry', formatExpiry(v))}
              placeholder="12/28"
              autoComplete="cc-exp"
              inputMode="numeric"
              maxLength={5}
            />
          </FieldGroup>

          <FieldGroup label="CVC" htmlFor="card-cvc">
            <TextInput
              id="card-cvc"
              value={formData.cardCvc}
              onChange={(v) => updateField('cardCvc', v.replace(/\D/g, '').slice(0, 4))}
              placeholder="123"
              autoComplete="cc-csc"
              inputMode="numeric"
              maxLength={4}
            />
          </FieldGroup>
        </div>

        {paymentError && (
          <div
            role="alert"
            className="mt-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2.5 flex items-start gap-2 text-sm text-red-700"
          >
            <AlertCircle size={16} className="mt-0.5 shrink-0" />
            <span>{paymentError}</span>
          </div>
        )}
      </div>

      {selectedPlan && (
        <p className="mt-4 text-xs text-gw-slate text-center">
          You'll be charged{' '}
          <strong>{formatCurrency(selectedPlan.priceUsd, formData.currency)}</strong>{' '}
          {selectedPlan.cadence} after your 7-day free trial. Cancel anytime.
        </p>
      )}
    </div>
  );
}
