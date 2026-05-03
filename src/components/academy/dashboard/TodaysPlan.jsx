import { Link } from 'react-router-dom';
import { Clock, Play, Wrench, MessageCircle, ArrowRight } from 'lucide-react';

const kindStyle = {
  lesson: { icon: Play, label: 'Lesson', accent: 'text-gw-teal bg-gw-teal/15' },
  practice: { icon: Wrench, label: 'Practice', accent: 'text-gw-navy bg-gw-navy/10' },
  mentor: { icon: MessageCircle, label: 'Mentor', accent: 'text-gw-amber bg-gw-amber/15' },
};

export default function TodaysPlan({ items, pathSlug, moduleId }) {
  return (
    <div className="rounded-2xl bg-white border border-gw-navy/10 shadow-card p-5">
      <div className="flex items-baseline justify-between">
        <h3 className="font-display text-base font-bold text-gw-ink">Today's plan</h3>
        <span className="text-[11px] text-gw-slate font-semibold">
          ~{totalMinutes(items)} min total
        </span>
      </div>
      <ul className="mt-4 space-y-2">
        {items.map((item) => {
          const cfg = kindStyle[item.kind] || kindStyle.lesson;
          const Icon = cfg.icon;
          const href = item.lessonId
            ? `/academy/learn/${pathSlug}/modules/${item.moduleId || moduleId}/${item.lessonId}`
            : null;
          const Wrapper = href ? Link : 'div';
          const wrapperProps = href ? { to: href } : {};

          return (
            <li key={item.id}>
              <Wrapper
                {...wrapperProps}
                className={`group flex items-center gap-3 rounded-xl border border-gw-navy/10 px-3 py-2.5 transition-all ${
                  href ? 'hover:border-gw-teal/40 hover:bg-gw-ice/40' : ''
                }`}
              >
                <span className={`h-8 w-8 rounded-lg flex items-center justify-center shrink-0 ${cfg.accent}`}>
                  <Icon size={14} />
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gw-ink truncate">{item.title}</p>
                  <p className="text-[11px] text-gw-slate inline-flex items-center gap-1">
                    <Clock size={10} /> {item.durationMin} min
                    {item.when && <> · {item.when}</>}
                    <span className="text-gw-slate/60"> · {cfg.label}</span>
                  </p>
                </div>
                {item.status === 'in-progress' && (
                  <span className="text-[10px] uppercase tracking-wider font-bold text-gw-teal">
                    Resume
                  </span>
                )}
                {href && (
                  <ArrowRight
                    size={14}
                    className="text-gw-slate group-hover:text-gw-teal transition shrink-0"
                  />
                )}
              </Wrapper>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function totalMinutes(items) {
  return items.reduce((sum, i) => sum + (i.durationMin || 0), 0);
}
