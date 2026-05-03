import { Search, X } from 'lucide-react';
import { pathFilters } from '../../data/learningPaths.js';

export default function PathFilterPanel({
  query,
  onQueryChange,
  selected,
  onToggle,
  onClear,
}) {
  const hasFilters =
    query.length > 0 ||
    selected.difficulty.length +
      selected.duration.length +
      selected.outcome.length >
      0;

  return (
    <aside className="rounded-2xl bg-white border border-gw-navy/10 shadow-card p-5 lg:sticky lg:top-24 self-start">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-display font-bold text-gw-ink">Filter Paths</h3>
        {hasFilters && (
          <button
            type="button"
            onClick={onClear}
            className="text-xs text-gw-teal font-semibold hover:underline inline-flex items-center gap-1"
          >
            <X size={12} /> Clear
          </button>
        )}
      </div>

      <label className="relative block mb-5">
        <Search
          size={15}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gw-slate pointer-events-none"
        />
        <input
          type="search"
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          placeholder="Search paths or skills"
          className="w-full rounded-lg border border-gw-navy/15 bg-white pl-9 pr-3 py-2 text-sm text-gw-ink placeholder:text-gw-slate focus:outline-none focus:border-gw-teal focus:ring-2 focus:ring-gw-teal/20 transition"
        />
      </label>

      <FilterGroup
        title="Outcome"
        group="outcome"
        options={pathFilters.outcome}
        selected={selected.outcome}
        onToggle={onToggle}
      />
      <FilterGroup
        title="Difficulty"
        group="difficulty"
        options={pathFilters.difficulty}
        selected={selected.difficulty}
        onToggle={onToggle}
      />
      <FilterGroup
        title="Duration"
        group="duration"
        options={pathFilters.duration}
        selected={selected.duration}
        onToggle={onToggle}
      />
    </aside>
  );
}

function FilterGroup({ title, group, options, selected, onToggle }) {
  return (
    <div className="mb-5 last:mb-0">
      <p className="text-[11px] uppercase tracking-wider font-semibold text-gw-slate mb-2">
        {title}
      </p>
      <div className="flex flex-wrap gap-1.5">
        {options.map((opt) => {
          const active = selected.includes(opt.id);
          return (
            <button
              key={opt.id}
              type="button"
              onClick={() => onToggle(group, opt.id)}
              className={`text-xs font-semibold px-3 py-1.5 rounded-full border transition-all ${
                active
                  ? 'bg-gw-teal text-white border-gw-teal'
                  : 'bg-white text-gw-slate border-gw-navy/15 hover:border-gw-teal hover:text-gw-teal'
              }`}
              aria-pressed={active}
            >
              {opt.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
