// Lightweight mock provider buttons. They auto-fill the form with a fake
// profile and advance — no real OAuth.

const providers = {
  google: {
    label: 'Continue with Google',
    profile: { email: 'karenzi.marie@gmail.com', name: 'Karenzi Marie' },
    Icon: GoogleGlyph,
  },
  github: {
    label: 'Continue with GitHub',
    profile: { email: 'karenzi.marie@users.noreply.github.com', name: 'Karenzi Marie' },
    Icon: GitHubGlyph,
  },
};

export default function MockSocialLoginButton({ provider, onSelect, active }) {
  const cfg = providers[provider];
  if (!cfg) return null;
  const Icon = cfg.Icon;
  return (
    <button
      type="button"
      onClick={() => onSelect(provider, cfg.profile)}
      className={`w-full inline-flex items-center justify-center gap-3 rounded-lg border-2 px-4 py-2.5 text-sm font-semibold transition-all ${
        active
          ? 'border-gw-teal bg-gw-teal/5 text-gw-ink'
          : 'border-gw-navy/15 bg-white text-gw-ink hover:border-gw-teal hover:text-gw-teal'
      }`}
      aria-pressed={active}
    >
      <Icon />
      {cfg.label}
      {active && (
        <span className="ml-1 text-[10px] uppercase tracking-wider font-bold text-gw-teal">
          Selected
        </span>
      )}
    </button>
  );
}

function GoogleGlyph() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden>
      <path
        d="M17.64 9.2c0-.64-.06-1.25-.16-1.84H9v3.48h4.84c-.21 1.13-.85 2.09-1.81 2.74v2.27h2.93c1.71-1.58 2.7-3.91 2.7-6.65z"
        fill="#4285F4"
      />
      <path
        d="M9 18c2.43 0 4.47-.81 5.96-2.18l-2.93-2.27c-.81.54-1.85.86-3.03.86-2.33 0-4.31-1.57-5.02-3.69H.96v2.32C2.44 15.98 5.48 18 9 18z"
        fill="#34A853"
      />
      <path
        d="M3.98 10.71A5.41 5.41 0 0 1 3.69 9c0-.59.1-1.17.29-1.71V4.97H.96A8.99 8.99 0 0 0 0 9c0 1.45.35 2.83.96 4.03l3.02-2.32z"
        fill="#FBBC05"
      />
      <path
        d="M9 3.58c1.32 0 2.5.45 3.43 1.35l2.58-2.58C13.46.89 11.43 0 9 0 5.48 0 2.44 2.02.96 4.97l3.02 2.32C4.69 5.15 6.67 3.58 9 3.58z"
        fill="#EA4335"
      />
    </svg>
  );
}

function GitHubGlyph() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden fill="currentColor">
      <path d="M12 0a12 12 0 0 0-3.79 23.39c.6.11.82-.26.82-.58v-2.16c-3.34.73-4.04-1.41-4.04-1.41-.55-1.39-1.34-1.76-1.34-1.76-1.09-.74.08-.73.08-.73 1.2.09 1.83 1.24 1.83 1.24 1.07 1.84 2.81 1.31 3.49 1 .11-.78.42-1.31.76-1.61-2.66-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.13-.3-.54-1.52.12-3.16 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.29-1.55 3.3-1.23 3.3-1.23.66 1.64.25 2.86.12 3.16.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.62-5.49 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.83.58A12 12 0 0 0 12 0z" />
    </svg>
  );
}
