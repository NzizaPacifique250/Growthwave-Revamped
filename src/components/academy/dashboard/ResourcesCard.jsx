import { CalendarDays, Users, FolderOpen, LifeBuoy, ArrowRight } from 'lucide-react';
import { mockResources } from '../../../data/dashboard.js';

const iconMap = { CalendarDays, Users, FolderOpen, LifeBuoy };

export default function ResourcesCard() {
  return (
    <div className="rounded-2xl bg-white border border-gw-navy/10 shadow-card p-5">
      <h3 className="font-display text-base font-bold text-gw-ink">Resources</h3>
      <ul className="mt-3 space-y-1">
        {mockResources.map((r) => {
          const Icon = iconMap[r.icon] || LifeBuoy;
          return (
            <li key={r.id}>
              <a
                href={r.href}
                className="flex items-center gap-2 rounded-lg px-2 py-2 text-sm text-gw-ink hover:bg-gw-ice/60 hover:text-gw-teal transition group"
              >
                <Icon size={14} className="text-gw-slate group-hover:text-gw-teal" />
                <span className="flex-1">{r.label}</span>
                <ArrowRight size={12} className="text-gw-slate/40 group-hover:text-gw-teal" />
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
