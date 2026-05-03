export default function FieldGroup({ label, htmlFor, error, hint, children }) {
  return (
    <label htmlFor={htmlFor} className="block">
      <span className="text-xs uppercase tracking-wider font-semibold text-gw-slate">
        {label}
      </span>
      <div className="mt-1">{children}</div>
      {hint && !error && (
        <p className="mt-1 text-[11px] text-gw-slate leading-relaxed">{hint}</p>
      )}
      {error && (
        <p className="mt-1 text-[11px] text-red-500 leading-relaxed">{error}</p>
      )}
    </label>
  );
}

export function TextInput({
  id,
  value,
  onChange,
  type = 'text',
  placeholder,
  autoComplete,
  inputMode,
  maxLength,
  hasIcon = false,
}) {
  return (
    <input
      id={id}
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      autoComplete={autoComplete}
      inputMode={inputMode}
      maxLength={maxLength}
      className={`w-full rounded-lg border border-gw-navy/15 bg-white py-2 pr-3 text-sm text-gw-ink placeholder:text-gw-slate focus:outline-none focus:border-gw-teal focus:ring-2 focus:ring-gw-teal/20 transition ${
        hasIcon ? 'pl-9' : 'pl-3'
      }`}
    />
  );
}
