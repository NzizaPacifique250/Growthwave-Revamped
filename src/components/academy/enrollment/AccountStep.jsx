import { Mail, Lock, User } from 'lucide-react';
import FieldGroup, { TextInput } from './FieldGroup.jsx';
import MockSocialLoginButton from './MockSocialLoginButton.jsx';

export default function AccountStep({ formData, updateField, setSocialProvider }) {
  return (
    <div>
      <h2 className="font-display text-2xl md:text-3xl font-bold text-gw-ink leading-tight">
        Create your account
      </h2>
      <p className="mt-2 text-sm text-gw-slate leading-relaxed">
        Sign up with one click — or fill in your details below. You can change anything later.
      </p>

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
        <MockSocialLoginButton
          provider="google"
          active={formData.socialProvider === 'google'}
          onSelect={setSocialProvider}
        />
        <MockSocialLoginButton
          provider="github"
          active={formData.socialProvider === 'github'}
          onSelect={setSocialProvider}
        />
      </div>

      <div className="my-6 flex items-center gap-3 text-[11px] uppercase tracking-wider font-semibold text-gw-slate">
        <span className="h-px flex-1 bg-gw-navy/15" />
        Or with email
        <span className="h-px flex-1 bg-gw-navy/15" />
      </div>

      <div className="grid grid-cols-1 gap-4">
        <FieldGroup label="Full name" htmlFor="enroll-name">
          <div className="relative">
            <User
              size={15}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gw-slate pointer-events-none"
            />
            <TextInput
              id="enroll-name"
              value={formData.fullName}
              onChange={(v) => updateField('fullName', v)}
              placeholder="Karenzi Marie"
              autoComplete="name"
              hasIcon
            />
          </div>
        </FieldGroup>

        <FieldGroup label="Email" htmlFor="enroll-email">
          <div className="relative">
            <Mail
              size={15}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gw-slate pointer-events-none"
            />
            <TextInput
              id="enroll-email"
              type="email"
              value={formData.email}
              onChange={(v) => updateField('email', v)}
              placeholder="you@school.rw"
              autoComplete="email"
              hasIcon
            />
          </div>
        </FieldGroup>

        <FieldGroup
          label="Password"
          htmlFor="enroll-password"
          hint="At least 6 characters. You can update it any time."
        >
          <div className="relative">
            <Lock
              size={15}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gw-slate pointer-events-none"
            />
            <TextInput
              id="enroll-password"
              type="password"
              value={formData.password}
              onChange={(v) => updateField('password', v)}
              placeholder="••••••••"
              autoComplete="new-password"
              hasIcon
            />
          </div>
        </FieldGroup>
      </div>

      <p className="mt-5 text-[11px] text-gw-slate">
        By continuing you agree to our terms and acknowledge our privacy policy.
      </p>
    </div>
  );
}
