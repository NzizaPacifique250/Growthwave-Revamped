import { useState } from 'react';
import { Save, Play, Check } from 'lucide-react';

// Multi-file editor surface. The textarea is the actual draft store. Save
// and Run are mock — Save flashes a "Saved" pill for ~1.5s; Run flashes a
// "Build started" pill for ~2s.
export default function MockEditorPane({ file, content, onChange, onSaveFlash, onRunFlash }) {
  const [savedFlash, setSavedFlash] = useState(false);
  const [ranFlash, setRanFlash] = useState(false);

  const handleSave = () => {
    setSavedFlash(true);
    onSaveFlash?.();
    setTimeout(() => setSavedFlash(false), 1500);
  };

  const handleRun = () => {
    setRanFlash(true);
    onRunFlash?.();
    setTimeout(() => setRanFlash(false), 2000);
  };

  return (
    <div className="flex flex-col flex-1 min-h-0">
      <div className="flex items-center gap-2 px-3 py-2 border-b border-white/10 bg-gw-midnightCard">
        <span className="text-[10px] uppercase tracking-wider font-semibold text-white/50 font-mono">
          {file.name}
        </span>
        <div className="ml-auto flex items-center gap-1.5">
          {savedFlash && (
            <span className="inline-flex items-center gap-1 rounded-md bg-gw-teal/20 text-gw-teal px-2 py-0.5 text-[10px] font-bold">
              <Check size={10} /> Saved
            </span>
          )}
          {ranFlash && (
            <span className="inline-flex items-center gap-1 rounded-md bg-gw-amber/20 text-gw-amber px-2 py-0.5 text-[10px] font-bold">
              Build started
            </span>
          )}
          <button
            type="button"
            onClick={handleSave}
            className="inline-flex items-center gap-1 rounded-md bg-white/5 hover:bg-white/10 text-white/80 px-2 py-1 text-[10px] font-semibold transition"
          >
            <Save size={11} /> Save
          </button>
          <button
            type="button"
            onClick={handleRun}
            className="inline-flex items-center gap-1 rounded-md bg-gw-teal text-white hover:brightness-110 px-2 py-1 text-[10px] font-semibold transition"
          >
            <Play size={11} /> Run
          </button>
        </div>
      </div>
      <textarea
        value={content}
        onChange={(e) => onChange(e.target.value)}
        spellCheck={false}
        className="flex-1 w-full bg-gw-midnightCard text-white/90 font-mono text-[12px] leading-relaxed p-4 outline-none resize-none min-h-[280px]"
        aria-label={`Editor for ${file.name}`}
      />
    </div>
  );
}
