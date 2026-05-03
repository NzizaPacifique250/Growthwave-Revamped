import { useCallback, useMemo, useState } from 'react';

export const wizardSteps = [
  { id: 'account', label: 'Account', estMinutes: 1 },
  { id: 'confirm', label: 'Confirm path', estMinutes: 1 },
  { id: 'payment', label: 'Plan & payment', estMinutes: 2 },
  { id: 'welcome', label: 'Welcome', estMinutes: 0 },
];

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Luhn checksum for the mock card validation. Accepts a digits-only string.
function luhnValid(cardNumber) {
  const digits = cardNumber.replace(/\s+/g, '');
  if (digits.length < 13 || digits.length > 19) return false;
  let sum = 0;
  let alt = false;
  for (let i = digits.length - 1; i >= 0; i--) {
    let n = parseInt(digits[i], 10);
    if (Number.isNaN(n)) return false;
    if (alt) {
      n *= 2;
      if (n > 9) n -= 9;
    }
    sum += n;
    alt = !alt;
  }
  return sum % 10 === 0;
}

function expiryInFuture(mmYY) {
  const m = mmYY.match(/^(\d{2})\s*\/\s*(\d{2})$/);
  if (!m) return false;
  const month = parseInt(m[1], 10);
  const year = 2000 + parseInt(m[2], 10);
  if (month < 1 || month > 12) return false;
  const now = new Date();
  const last = new Date(year, month, 0, 23, 59, 59);
  return last >= now;
}

const declineSuffix = '0000';

export function useEnrollmentWizard({ initialFormData = {}, prefilledHours = null } = {}) {
  const [stepIndex, setStepIndex] = useState(0);
  const [paymentError, setPaymentError] = useState(null);
  const [formData, setFormData] = useState({
    // Account
    email: '',
    password: '',
    fullName: '',
    socialProvider: null,
    // Confirm
    weeklyHours: prefilledHours ?? 8,
    // Payment
    planId: 'annual',
    currency: 'USD',
    cardNumber: '',
    cardExpiry: '',
    cardCvc: '',
    cardName: '',
    ...initialFormData,
  });

  const updateField = useCallback((key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
    if (key.startsWith('card')) setPaymentError(null);
  }, []);

  const validators = useMemo(
    () => ({
      account: () => {
        if (formData.socialProvider) return { ok: true };
        if (!formData.fullName.trim()) return { ok: false, reason: 'Add your name to continue.' };
        if (!emailPattern.test(formData.email)) return { ok: false, reason: 'Enter a valid email address.' };
        if (formData.password.length < 6) return { ok: false, reason: 'Password must be at least 6 characters.' };
        return { ok: true };
      },
      confirm: () => {
        if (formData.weeklyHours < 2) return { ok: false, reason: 'Pick at least 2 hours per week.' };
        return { ok: true };
      },
      payment: () => {
        if (!formData.planId) return { ok: false, reason: 'Pick a plan to continue.' };
        if (!formData.cardName.trim()) return { ok: false, reason: 'Add the name on the card.' };
        const digits = formData.cardNumber.replace(/\s+/g, '');
        if (!luhnValid(formData.cardNumber)) {
          return { ok: false, reason: 'That card number is invalid.' };
        }
        if (digits.endsWith(declineSuffix)) {
          return { ok: false, reason: 'Card declined. Try a different card.' };
        }
        if (!expiryInFuture(formData.cardExpiry)) {
          return { ok: false, reason: 'Expiry must be a future MM/YY date.' };
        }
        if (!/^\d{3,4}$/.test(formData.cardCvc.trim())) {
          return { ok: false, reason: 'CVC should be 3 or 4 digits.' };
        }
        return { ok: true };
      },
      welcome: () => ({ ok: true }),
    }),
    [formData]
  );

  const currentStep = wizardSteps[stepIndex];
  const validation = validators[currentStep.id]();
  const canGoNext = validation.ok;
  const onLast = stepIndex === wizardSteps.length - 1;
  const onWelcome = currentStep.id === 'welcome';

  const goNext = useCallback(() => {
    const v = validators[wizardSteps[stepIndex].id]();
    if (!v.ok) {
      if (wizardSteps[stepIndex].id === 'payment') setPaymentError(v.reason);
      return;
    }
    setStepIndex((i) => Math.min(i + 1, wizardSteps.length - 1));
  }, [stepIndex, validators]);

  const goBack = useCallback(() => {
    setStepIndex((i) => Math.max(i - 1, 0));
    setPaymentError(null);
  }, []);

  const jumpTo = useCallback(
    (idx) => {
      // Only allow jumping to a previously-completed step or the current one.
      if (idx <= stepIndex) setStepIndex(idx);
    },
    [stepIndex]
  );

  const setSocialProvider = useCallback((provider, profile) => {
    setFormData((prev) => ({
      ...prev,
      socialProvider: provider,
      email: profile?.email || prev.email,
      fullName: profile?.name || prev.fullName,
      password: prev.password || 'social-login',
    }));
  }, []);

  return {
    steps: wizardSteps,
    stepIndex,
    currentStep,
    formData,
    updateField,
    setSocialProvider,
    canGoNext,
    validation,
    paymentError,
    goNext,
    goBack,
    jumpTo,
    onLast,
    onWelcome,
  };
}
