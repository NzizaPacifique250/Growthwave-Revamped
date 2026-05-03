import { CheckCircle2, Award, MessageSquare, BookOpen, Trophy } from 'lucide-react';

const kindStyle = {
  'lesson-completed': { icon: CheckCircle2, accent: 'text-gw-teal bg-gw-teal/15' },
  'badge-earned': { icon: Award, accent: 'text-gw-amber bg-gw-amber/15' },
  'peer-comment': { icon: MessageSquare, accent: 'text-gw-navy bg-gw-navy/10' },
  'mentor-note': { icon: BookOpen, accent: 'text-gw-teal bg-gw-teal/15' },
  'assessment-passed': { icon: Trophy, accent: 'text-gw-amber bg-gw-amber/15' },
};

export default function RecentActivityFeed({ activity }) {
  if (!activity?.length) {
    return (
      <div className="rounded-2xl bg-white border border-gw-navy/10 shadow-card p-5 text-center">
        <p className="text-sm text-gw-slate">Nothing yet — your first lesson will show up here.</p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl bg-white border border-gw-navy/10 shadow-card p-5">
      <h3 className="font-display text-base font-bold text-gw-ink">Recent activity</h3>
      <ul className="mt-4 divide-y divide-gw-navy/10">
        {activity.map((a) => {
          const cfg = kindStyle[a.kind] || kindStyle['lesson-completed'];
          const Icon = cfg.icon;
          return (
            <li key={a.id} className="py-3 flex items-start gap-3 first:pt-0 last:pb-0">
              <span className={`h-8 w-8 rounded-lg flex items-center justify-center shrink-0 ${cfg.accent}`}>
                <Icon size={14} />
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gw-ink leading-snug">{a.title}</p>
                <p className="text-[11px] text-gw-slate mt-0.5">{relativeTime(a.when)}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function relativeTime(iso) {
  const now = new Date();
  const t = new Date(iso);
  const ms = now - t;
  const minutes = Math.round(ms / 60000);
  if (minutes < 1) return 'just now';
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.round(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.round(hours / 24);
  if (days < 7) return `${days}d ago`;
  return t.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
}
