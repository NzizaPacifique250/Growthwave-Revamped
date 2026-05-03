import { Brain, Code2, Sparkles, Layers, Clock, Users, Wrench, Star } from 'lucide-react';
import { getCurriculum } from '../../../data/pathDetails.js';

const iconMap = { Brain, Code2, Sparkles, Layers };

export default function ConfirmPathStep({ path, formData, updateField }) {
  const Icon = iconMap[path.icon] || Code2;
  const curriculum = getCurriculum(path.slug);
  const moduleCount = curriculum.reduce((sum, p) => sum + p.modules.length, 0);

  const recommendedFloor = parseRecommendedFloor(path.weeklyHours);
  const tooLight = formData.weeklyHours < recommendedFloor;

  return (
    <div>
      <h2 className="font-display text-2xl md:text-3xl font-bold text-gw-ink leading-tight">
        Confirm your path
      </h2>
      <p className="mt-2 text-sm text-gw-slate leading-relaxed">
        Review what you're committing to. You can switch paths later — but this is the focus we'll build your plan around.
      </p>

      <div className="mt-6 rounded-2xl border border-gw-navy/10 bg-gw-ice/40 p-5">
        <div className="flex items-start gap-4">
          <div className="h-12 w-12 rounded-xl bg-white border border-gw-teal/30 text-gw-teal flex items-center justify-center shrink-0">
            <Icon size={22} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-baseline gap-2">
              <h3 className="font-display text-xl font-bold text-gw-ink">{path.title}</h3>
              <span className="text-xs text-gw-slate">·</span>
              <span className="text-xs text-gw-slate font-semibold">{path.outcomeType}</span>
            </div>
            <p className="text-sm text-gw-slate mt-1 leading-snug">{path.tagline}</p>
          </div>
        </div>

        <dl className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3">
          <Stat icon={Clock} label="Duration" value={path.duration} />
          <Stat icon={Wrench} label="Modules" value={moduleCount} />
          <Stat icon={Users} label="Enrolled" value={path.enrollment.toLocaleString()} />
          <Stat icon={Star} label="Rating" value={path.rating} />
        </dl>
      </div>

      <div className="mt-6 rounded-2xl border border-gw-navy/10 p-5">
        <div className="flex items-baseline justify-between flex-wrap gap-2">
          <div>
            <h4 className="font-display font-bold text-gw-ink">Weekly commitment</h4>
            <p className="text-xs text-gw-slate mt-1">
              How many hours per week can you realistically commit?
            </p>
          </div>
          <div className="font-display text-2xl font-bold text-gw-ink">
            {formData.weeklyHours}
            <span className="ml-1 text-sm text-gw-slate font-semibold">hrs/week</span>
          </div>
        </div>
        <input
          type="range"
          min={2}
          max={20}
          step={1}
          value={formData.weeklyHours}
          onChange={(e) => updateField('weeklyHours', Number(e.target.value))}
          className="mt-4 w-full accent-gw-teal"
          aria-label="Weekly commitment in hours"
        />
        <div className="mt-2 flex justify-between text-[11px] text-gw-slate font-semibold">
          <span>Light · 2 hrs</span>
          <span>Steady · 10 hrs</span>
          <span>Intensive · 20 hrs</span>
        </div>

        {tooLight && (
          <p className="mt-3 text-[12px] text-gw-amber leading-relaxed bg-gw-amber/10 rounded-md px-3 py-2">
            We recommend at least <strong>{recommendedFloor} hrs/week</strong> for {path.title}.
            You can still enroll, but pace will feel slower.
          </p>
        )}
      </div>
    </div>
  );
}

function Stat({ icon: Icon, label, value }) {
  return (
    <div className="rounded-lg bg-white border border-gw-navy/10 px-3 py-2.5">
      <div className="flex items-center gap-1 text-gw-slate text-[10px] uppercase tracking-wide font-semibold">
        <Icon size={11} /> {label}
      </div>
      <div className="text-sm font-bold text-gw-ink mt-0.5 truncate">{value}</div>
    </div>
  );
}

// Path data carries weeklyHours like "8–12 hrs/wk". Take the lower bound.
function parseRecommendedFloor(weeklyHoursLabel) {
  if (!weeklyHoursLabel) return 6;
  const match = weeklyHoursLabel.match(/(\d+)/);
  return match ? parseInt(match[1], 10) : 6;
}
