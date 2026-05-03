import { Code2, FileJson } from 'lucide-react';

const fileIcon = {
  jsx: Code2,
  js: Code2,
  json: FileJson,
};

export default function FileNavigatorTabs({ files, activeFileId, onSelect, dirtyMap }) {
  return (
    <div role="tablist" className="flex items-center gap-1 px-3 py-2 border-b border-white/10 overflow-x-auto bg-gw-midnightCard">
      {files.map((f) => {
        const Icon = fileIcon[f.language] || Code2;
        const isActive = f.id === activeFileId;
        const isDirty = !!dirtyMap[f.id];
        return (
          <button
            type="button"
            role="tab"
            aria-selected={isActive}
            key={f.id}
            onClick={() => onSelect(f.id)}
            className={`group inline-flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs font-mono whitespace-nowrap transition ${
              isActive
                ? 'bg-white/10 text-white'
                : 'text-white/60 hover:text-white hover:bg-white/5'
            }`}
          >
            <Icon size={11} className="text-white/50 group-hover:text-white/80" />
            <span>{f.name}</span>
            <span
              className={`h-1.5 w-1.5 rounded-full ${
                isDirty ? 'bg-gw-amber' : 'bg-transparent'
              }`}
              aria-label={isDirty ? 'unsaved changes' : 'saved'}
            />
          </button>
        );
      })}
    </div>
  );
}
