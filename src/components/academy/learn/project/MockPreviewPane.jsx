import { Eye, AlertTriangle } from 'lucide-react';

// Static preview panel. For JSON files we attempt to parse and render a
// styled list; for code files we show a stylized "would render" placeholder.
// No real iframe — this is purely illustrative.
export default function MockPreviewPane({ file, content }) {
  return (
    <div className="flex flex-col flex-1 min-h-0 bg-white">
      <div className="flex items-center gap-2 px-3 py-2 border-b border-gw-navy/10 bg-gw-ice/40">
        <Eye size={12} className="text-gw-slate" />
        <span className="text-[10px] uppercase tracking-wider font-semibold text-gw-slate">
          Preview
        </span>
        <span className="ml-auto text-[10px] text-gw-slate font-mono">{file.name}</span>
      </div>

      <div className="flex-1 overflow-auto p-4">
        {file.language === 'json' ? (
          <JsonListPreview content={content} />
        ) : (
          <CodePreview content={content} />
        )}
      </div>
    </div>
  );
}

function JsonListPreview({ content }) {
  let parsed = null;
  try {
    parsed = JSON.parse(content);
  } catch {
    return (
      <div className="rounded-md bg-red-50 border border-red-200 px-3 py-2 text-xs text-red-700 inline-flex items-start gap-2">
        <AlertTriangle size={13} className="mt-0.5 shrink-0" />
        Invalid JSON — fix syntax to render the list.
      </div>
    );
  }
  if (!Array.isArray(parsed)) {
    return (
      <pre className="text-xs text-gw-ink font-mono whitespace-pre-wrap">
        {JSON.stringify(parsed, null, 2)}
      </pre>
    );
  }
  return (
    <ul className="space-y-3">
      {parsed.map((item, i) => (
        <li key={item.id || i} className="rounded-lg border border-gw-navy/10 p-3">
          <div className="flex items-center justify-between gap-2">
            <p className="font-display font-bold text-gw-ink text-sm">
              {item.title || `Item ${i + 1}`}
            </p>
            {item.difficulty && (
              <span className="text-[10px] uppercase tracking-wider font-bold text-gw-teal bg-gw-teal/10 px-2 py-0.5 rounded-full">
                {item.difficulty}
              </span>
            )}
          </div>
          {Array.isArray(item.ingredients) && (
            <p className="mt-2 text-xs text-gw-slate leading-relaxed">
              <strong className="text-gw-ink">Ingredients · </strong>
              {item.ingredients.join(', ')}
            </p>
          )}
          {Array.isArray(item.steps) && (
            <ol className="mt-2 list-decimal pl-4 text-xs text-gw-ink leading-relaxed space-y-0.5">
              {item.steps.map((step, j) => (
                <li key={j}>{step}</li>
              ))}
            </ol>
          )}
        </li>
      ))}
    </ul>
  );
}

function CodePreview({ content }) {
  return (
    <div className="space-y-3">
      <p className="text-[11px] text-gw-slate leading-relaxed">
        Preview is a stub for the demo — your code would render in this panel during a live build.
      </p>
      <pre className="rounded-lg bg-gw-midnightCard text-white/90 p-3 overflow-auto text-[11px] leading-relaxed font-mono">
        {content}
      </pre>
    </div>
  );
}
