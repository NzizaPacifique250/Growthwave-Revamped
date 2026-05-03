import { useEffect, useRef } from 'react';
import { Lightbulb } from 'lucide-react';

// Reading is the simplest block type. We auto-mark it as interacted after
// the user has had it visible for ~2 seconds, mirroring how a reader would
// spend at least a moment on each section.
export default function ReadingBlock({ block, blockState, onInteract }) {
  const fired = useRef(false);
  useEffect(() => {
    if (blockState.interacted || fired.current) return;
    const t = setTimeout(() => {
      fired.current = true;
      onInteract();
    }, 2000);
    return () => clearTimeout(t);
  }, [blockState.interacted, onInteract]);

  return (
    <article className="rounded-2xl bg-white border border-gw-navy/10 shadow-card p-6 md:p-8">
      <h3 className="font-display text-2xl font-bold text-gw-ink leading-tight">
        {block.title}
      </h3>
      <div className="mt-5 space-y-4">
        {block.blocks.map((b, i) => (
          <RenderInline key={i} block={b} />
        ))}
      </div>
    </article>
  );
}

function RenderInline({ block }) {
  if (block.kind === 'h3') {
    return (
      <h4 className="font-display text-lg font-bold text-gw-ink mt-3">{block.text}</h4>
    );
  }
  if (block.kind === 'p') {
    return (
      <p className="text-sm md:text-base text-gw-ink leading-relaxed">{block.text}</p>
    );
  }
  if (block.kind === 'code') {
    return (
      <pre className="rounded-xl bg-gw-midnightCard text-white/90 p-4 overflow-x-auto text-[12px] leading-relaxed">
        <code className="font-mono">{block.text}</code>
      </pre>
    );
  }
  if (block.kind === 'callout') {
    return (
      <div className="flex items-start gap-3 rounded-xl border border-gw-teal/30 bg-gw-teal/5 p-4">
        <span className="h-7 w-7 rounded-lg bg-gw-teal/15 text-gw-teal flex items-center justify-center shrink-0">
          <Lightbulb size={14} />
        </span>
        <p className="text-sm text-gw-ink leading-relaxed">{block.text}</p>
      </div>
    );
  }
  return null;
}
