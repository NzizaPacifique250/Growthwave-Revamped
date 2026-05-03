import { Flame } from 'lucide-react';

export default function StreakCalendar({ history, streakDays }) {
  const today = new Date().toISOString().slice(0, 10);
  const recent = history.slice(-7);

  return (
    <div className="rounded-2xl bg-white border border-gw-navy/10 shadow-card p-5">
      <div className="flex items-baseline justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="h-8 w-8 rounded-lg bg-gw-amber/15 text-gw-amber flex items-center justify-center">
            <Flame size={14} />
          </span>
          <p className="text-[11px] uppercase tracking-wider font-semibold text-gw-slate">
            Streak
          </p>
        </div>
        <p className="font-display text-lg font-bold text-gw-ink">
          {streakDays}
          <span className="ml-1 text-xs font-semibold text-gw-slate">days</span>
        </p>
      </div>

      <ol className="mt-4 grid grid-cols-7 gap-1.5" aria-label="Last 7 days">
        {recent.map((day) => {
          const isToday = day.date === today;
          return (
            <li key={day.date} className="flex flex-col items-center gap-1">
              <span
                className={`h-7 w-7 rounded-md flex items-center justify-center text-[10px] font-bold ${
                  day.active
                    ? 'bg-gw-amber/15 text-gw-amber'
                    : 'bg-gw-ice text-gw-slate/60'
                } ${isToday ? 'ring-2 ring-gw-amber' : ''}`}
                aria-label={
                  day.active ? `Active on ${day.date}` : `No activity on ${day.date}`
                }
              >
                {day.active ? <Flame size={11} /> : '·'}
              </span>
              <span className="text-[10px] text-gw-slate font-semibold">
                {dayLabel(day.date)}
              </span>
            </li>
          );
        })}
      </ol>

      <p className="mt-3 text-[11px] text-gw-slate leading-relaxed">
        Show up daily for at least 15 minutes to keep the streak alive.
      </p>
    </div>
  );
}

function dayLabel(iso) {
  const d = new Date(iso + 'T00:00:00');
  return d.toLocaleDateString(undefined, { weekday: 'narrow' });
}
