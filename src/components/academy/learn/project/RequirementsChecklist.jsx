import { Check, Clock, Circle } from 'lucide-react';

const states = ['pending', 'in-progress', 'done'];

const stateCfg = {
  pending: { icon: Circle, className: 'bg-white border-gw-navy/25 text-gw-slate', label: 'Not started' },
  'in-progress': { icon: Clock, className: 'bg-gw-amber/15 border-gw-amber text-gw-amber', label: 'In progress' },
  done: { icon: Check, className: 'bg-gw-teal text-white border-gw-teal', label: 'Done' },
};

export default function RequirementsChecklist({ requirements, checklist, onChange }) {
  return (
    <ol className="space-y-2">
      {requirements.map((req) => {
        const status = checklist[req.id] || 'pending';
        const Icon = stateCfg[status].icon;
        return (
          <li key={req.id} className="rounded-lg border border-gw-navy/10 bg-white p-3">
            <button
              type="button"
              onClick={() => onChange(req.id, nextState(status))}
              className="w-full flex items-start gap-3 text-left group"
              title={`Click to cycle status (${stateCfg[status].label})`}
            >
              <span
                className={`h-6 w-6 rounded-full border-2 flex items-center justify-center shrink-0 transition ${stateCfg[status].className}`}
              >
                <Icon size={11} />
              </span>
              <div className="min-w-0 flex-1">
                <p
                  className={`text-sm font-semibold leading-tight ${
                    status === 'done' ? 'text-gw-slate line-through' : 'text-gw-ink'
                  }`}
                >
                  {req.title}
                </p>
                <p className="mt-1 text-[11px] text-gw-slate leading-relaxed">
                  {req.description}
                </p>
              </div>
            </button>
          </li>
        );
      })}
    </ol>
  );
}

function nextState(current) {
  const idx = states.indexOf(current);
  return states[(idx + 1) % states.length];
}
