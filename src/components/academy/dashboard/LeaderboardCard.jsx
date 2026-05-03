import { Trophy } from 'lucide-react';

export default function LeaderboardCard({ rank, cohortSize }) {
  const percentile = Math.max(1, Math.round((rank / cohortSize) * 100));
  const topPercent = percentile <= 50 ? `Top ${percentile}%` : `Top ${100 - percentile}%`;

  return (
    <div className="rounded-2xl bg-white border border-gw-navy/10 shadow-card p-5">
      <div className="flex items-center gap-2">
        <span className="h-8 w-8 rounded-lg bg-gw-navy/10 text-gw-navy flex items-center justify-center">
          <Trophy size={14} />
        </span>
        <p className="text-[11px] uppercase tracking-wider font-semibold text-gw-slate">
          Cohort leaderboard
        </p>
      </div>

      <div className="mt-3 flex items-baseline gap-1.5">
        <span className="font-display text-3xl font-extrabold text-gw-ink">#{rank}</span>
        <span className="text-xs text-gw-slate font-semibold">of {cohortSize}</span>
      </div>

      <p className="mt-2 text-xs text-gw-slate leading-relaxed">
        You're in the <span className="font-bold text-gw-ink">{topPercent}</span> of your cohort. Keep your weekly goal to climb.
      </p>

      <div className="mt-4 h-2 rounded-full bg-gw-ice overflow-hidden" aria-hidden>
        <div
          className="h-full bg-gradient-to-r from-gw-teal to-gw-navy"
          style={{ width: `${100 - percentile}%` }}
        />
      </div>
    </div>
  );
}
