import { Link } from 'react-router-dom';
import { Calendar, ClipboardCheck, Users, GraduationCap, ArrowRight } from 'lucide-react';

const typeStyle = {
  module: { icon: ClipboardCheck, label: 'Module', accent: 'text-gw-teal bg-gw-teal/15' },
  assessment: { icon: ClipboardCheck, label: 'Quiz', accent: 'text-gw-navy bg-gw-navy/10' },
  event: { icon: Users, label: 'Event', accent: 'text-gw-amber bg-gw-amber/15' },
  capstone: { icon: GraduationCap, label: 'Capstone', accent: 'text-gw-teal bg-gw-teal/15' },
};

export default function MilestoneTimeline({ milestones }) {
  return (
    <div className="rounded-2xl bg-white border border-gw-navy/10 shadow-card p-5">
      <div className="flex items-baseline justify-between">
        <h3 className="font-display text-base font-bold text-gw-ink">Upcoming milestones</h3>
        <span className="inline-flex items-center gap-1 text-[11px] text-gw-slate font-semibold">
          <Calendar size={11} /> Next {milestones.length}
        </span>
      </div>

      <ol className="mt-4 relative pl-7 border-l border-gw-navy/15">
        {milestones.map((m) => {
          const cfg = typeStyle[m.type] || typeStyle.module;
          const Icon = cfg.icon;
          const due = formatDate(m.dueAt);
          const meta = (
            <p className="mt-1 text-[11px] text-gw-slate inline-flex items-center gap-1.5">
              <span className="capitalize">{cfg.label}</span>
              <span>·</span>
              <span>{due}</span>
              <span>·</span>
              <span>{daysUntil(m.dueAt)}</span>
            </p>
          );
          const dot = (
            <span
              className={`absolute -left-[34px] top-0 h-6 w-6 rounded-full flex items-center justify-center ${cfg.accent}`}
            >
              <Icon size={12} />
            </span>
          );
          return (
            <li key={m.id} className="relative pb-4 last:pb-0">
              {dot}
              {m.href ? (
                <Link
                  to={m.href}
                  className="group block rounded-md -mx-2 px-2 py-1 hover:bg-gw-ice/40 transition"
                >
                  <p className="text-sm font-semibold text-gw-ink leading-snug inline-flex items-center gap-1">
                    {m.title}
                    <ArrowRight
                      size={12}
                      className="opacity-0 group-hover:opacity-100 text-gw-teal transition"
                    />
                  </p>
                  {meta}
                </Link>
              ) : (
                <>
                  <p className="text-sm font-semibold text-gw-ink leading-snug">{m.title}</p>
                  {meta}
                </>
              )}
            </li>
          );
        })}
      </ol>
    </div>
  );
}

function formatDate(iso) {
  const d = new Date(iso + 'T00:00:00');
  return d.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
}

function daysUntil(iso) {
  const target = new Date(iso + 'T00:00:00');
  const now = new Date();
  const ms = target - now;
  const days = Math.ceil(ms / (24 * 60 * 60 * 1000));
  if (days < 0) return `${Math.abs(days)}d overdue`;
  if (days === 0) return 'today';
  if (days === 1) return 'tomorrow';
  if (days < 14) return `in ${days}d`;
  return `in ${Math.round(days / 7)}w`;
}
