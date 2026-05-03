import { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Check, Lightbulb, RefreshCw, AlertCircle, CheckCircle2 } from 'lucide-react';

// Mock code editor + validator. No real sandbox — `requiredSubstrings` on
// the block fixture lists what must appear in the user's code for the check
// to pass. "Run" shows pre-canned output; "Check" runs the validator.
export default function InteractiveCodeBlock({ block, blockState, updateBlockState, onInteract }) {
  const code = blockState.data.code ?? block.starter;
  const ranOnce = blockState.data.ran ?? false;
  const checkResult = blockState.data.checkResult ?? null;
  const showHint = blockState.data.showHint ?? false;
  const [runOutput, setRunOutput] = useState(block.mockOutput);

  const updateCode = (next) => {
    updateBlockState(block.id, { data: { code: next } });
  };

  const handleRun = () => {
    setRunOutput(block.mockOutput);
    updateBlockState(block.id, { data: { ran: true } });
    if (!blockState.interacted) onInteract();
  };

  const handleCheck = () => {
    const ok = block.requiredSubstrings.every((s) => code.includes(s));
    updateBlockState(block.id, {
      data: {
        ran: true,
        checkResult: ok ? 'pass' : 'fail',
      },
    });
    if (ok) setRunOutput(block.successOutput);
    if (!blockState.interacted) onInteract();
  };

  const reset = () => {
    updateBlockState(block.id, {
      data: { code: block.starter, ran: false, checkResult: null, showHint: false },
    });
    setRunOutput(block.mockOutput);
  };

  const toggleHint = () => {
    updateBlockState(block.id, { data: { showHint: !showHint } });
  };

  return (
    <article className="rounded-2xl bg-white border border-gw-navy/10 shadow-card overflow-hidden">
      <div className="px-5 py-3 border-b border-gw-navy/10 flex items-center justify-between gap-3 flex-wrap">
        <div>
          <p className="text-[11px] uppercase tracking-wider font-semibold text-gw-slate">
            Try it
          </p>
          <h3 className="font-display text-lg font-bold text-gw-ink">{block.title}</h3>
        </div>
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={toggleHint}
            className={`inline-flex items-center gap-1 px-2.5 py-1.5 rounded-md text-xs font-semibold transition ${
              showHint ? 'bg-gw-amber/15 text-gw-amber' : 'bg-gw-ice text-gw-slate hover:text-gw-ink'
            }`}
          >
            <Lightbulb size={12} /> Hint
          </button>
          <button
            type="button"
            onClick={reset}
            className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-md text-xs font-semibold bg-gw-ice text-gw-slate hover:text-gw-ink transition"
          >
            <RefreshCw size={12} /> Reset
          </button>
        </div>
      </div>

      <p className="px-5 pt-3 text-sm text-gw-slate leading-relaxed">{block.brief}</p>

      {showHint && (
        <div className="mx-5 mt-3 rounded-lg bg-gw-amber/10 border border-gw-amber/30 px-3 py-2 text-xs text-gw-ink leading-relaxed">
          <strong className="text-gw-amber">Hint · </strong>
          {block.hint}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 p-5">
        {/* Editor */}
        <div className="rounded-xl bg-gw-midnightCard border border-white/10 overflow-hidden">
          <div className="flex items-center gap-1.5 px-3 py-2 border-b border-white/5">
            <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-green-400/70" />
            <span className="ml-2 text-[10px] text-white/50 font-mono">editor.jsx</span>
          </div>
          <textarea
            value={code}
            onChange={(e) => updateCode(e.target.value)}
            spellCheck={false}
            className="w-full bg-transparent text-white/90 font-mono text-[12px] leading-relaxed p-3 outline-none resize-none min-h-[220px]"
            aria-label="Code editor"
          />
        </div>

        {/* Output / status */}
        <div className="rounded-xl bg-gw-ice/50 border border-gw-navy/10 overflow-hidden flex flex-col">
          <div className="px-3 py-2 border-b border-gw-navy/10 text-[10px] uppercase tracking-wider font-semibold text-gw-slate">
            Output
          </div>
          <pre className="flex-1 p-3 font-mono text-[12px] leading-relaxed text-gw-ink whitespace-pre-wrap min-h-[120px]">
            {ranOnce ? runOutput : '// Click Run to see output'}
          </pre>
          {checkResult && (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex items-start gap-2 px-3 py-2.5 text-xs leading-relaxed ${
                checkResult === 'pass'
                  ? 'bg-gw-teal/10 text-gw-teal'
                  : 'bg-red-50 text-red-700 border-t border-red-200'
              }`}
            >
              {checkResult === 'pass' ? (
                <CheckCircle2 size={14} className="mt-0.5 shrink-0" />
              ) : (
                <AlertCircle size={14} className="mt-0.5 shrink-0" />
              )}
              <span>
                {checkResult === 'pass' ? block.successMessage : block.failureMessage}
              </span>
            </motion.div>
          )}
        </div>
      </div>

      <div className="px-5 pb-5 flex items-center gap-2 flex-wrap">
        <button
          type="button"
          onClick={handleRun}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-gw-ice text-gw-ink text-xs font-semibold hover:bg-gw-navy/10 transition"
        >
          <Play size={12} /> Run
        </button>
        <button
          type="button"
          onClick={handleCheck}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-gw-teal text-white text-xs font-semibold hover:brightness-110 transition"
        >
          <Check size={12} /> Check answer
        </button>
        {checkResult === 'pass' && (
          <span className="text-[11px] text-gw-teal font-semibold inline-flex items-center gap-1">
            <CheckCircle2 size={12} /> Block complete
          </span>
        )}
      </div>
    </article>
  );
}
