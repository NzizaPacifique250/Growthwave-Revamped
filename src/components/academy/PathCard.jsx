import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Brain,
  Code2,
  Sparkles,
  Layers,
  Clock,
  Users,
  TrendingUp,
  Star,
  ArrowRight,
  PlayCircle,
} from 'lucide-react';

const iconMap = {
  Brain,
  Code2,
  Sparkles,
  Layers,
};

const colorMap = {
  teal: {
    accent: 'text-gw-teal',
    bg: 'bg-gw-teal/10',
    border: 'border-gw-teal',
    chip: 'bg-gw-teal/15 text-gw-teal',
  },
  navy: {
    accent: 'text-gw-navy',
    bg: 'bg-gw-navy/10',
    border: 'border-gw-navy',
    chip: 'bg-gw-navy/10 text-gw-navy',
  },
  amber: {
    accent: 'text-gw-amber',
    bg: 'bg-gw-amber/10',
    border: 'border-gw-amber',
    chip: 'bg-gw-amber/15 text-gw-amber',
  },
};

export default function PathCard({ path, onTryFree, onPreviewLesson }) {
  const Icon = iconMap[path.icon] || Code2;
  const colors = colorMap[path.color] || colorMap.teal;

  return (
    <motion.article
      whileHover={{ y: -4 }}
      transition={{ type: 'spring', stiffness: 320, damping: 24 }}
      className="group relative flex flex-col rounded-2xl bg-white border border-gw-navy/10 shadow-card hover:shadow-cardHover transition-shadow overflow-hidden"
    >
      {path.hybrid && (
        <div className="absolute top-4 right-4 pill bg-gradient-to-r from-gw-teal to-gw-navy text-white">
          Hybrid
        </div>
      )}

      <div className={`h-1.5 w-full ${colors.border.replace('border-', 'bg-')}`} />

      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-start gap-4">
          <div className={`h-12 w-12 shrink-0 rounded-xl ${colors.bg} flex items-center justify-center ${colors.accent}`}>
            <Icon size={22} />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-display text-xl font-bold text-gw-ink leading-tight">
              {path.title}
            </h3>
            <p className="mt-1 text-sm text-gw-slate leading-snug">{path.tagline}</p>
          </div>
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          <span className={`pill ${colors.chip}`}>{path.outcomeType}</span>
          <span className="pill bg-gw-ice text-gw-navy normal-case tracking-normal !text-[11px]">
            {path.levelRange}
          </span>
        </div>

        <dl className="mt-5 grid grid-cols-3 gap-3 text-xs">
          <Stat icon={Clock} label="Duration" value={path.duration} />
          <Stat icon={Users} label="Enrolled" value={path.enrollment.toLocaleString()} />
          <Stat icon={TrendingUp} label="Completion" value={`${path.completionRate}%`} />
        </dl>

        <div className="mt-5">
          <p className="text-[11px] uppercase tracking-wider font-semibold text-gw-slate mb-2">
            Preview Modules
          </p>
          <div className="flex flex-wrap gap-1.5">
            {path.previewModules.map((m) => (
              <span
                key={m}
                className="text-[11px] px-2.5 py-1 rounded-md bg-gw-ice text-gw-navy font-medium"
              >
                {m}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-5 flex items-center gap-2 text-xs text-gw-slate">
          <Star size={14} className="text-gw-amber fill-gw-amber" />
          <span className="font-semibold text-gw-ink">{path.rating}</span>
          <span>·</span>
          <span>{path.employerCount} hiring partners</span>
        </div>

        <div className="mt-auto pt-6 flex items-center gap-3">
          <Link
            to={`/academy/paths/${path.slug}`}
            className="btn btn-primary flex-1 !py-2.5 text-xs"
          >
            Learn More <ArrowRight size={14} />
          </Link>
          <button
            type="button"
            onClick={() => onTryFree?.(path)}
            className="btn btn-ghost-teal !py-2.5 !px-4 text-xs"
          >
            Try Free
          </button>
        </div>

        {onPreviewLesson && (
          <button
            type="button"
            onClick={() => onPreviewLesson(path)}
            className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-gw-teal hover:gap-2 transition-all"
          >
            <PlayCircle size={14} /> Preview a sample lesson
          </button>
        )}
      </div>
    </motion.article>
  );
}

function Stat({ icon: Icon, label, value }) {
  return (
    <div className="rounded-lg bg-gw-ice/60 px-2.5 py-2">
      <div className="flex items-center gap-1 text-gw-slate text-[10px] uppercase tracking-wide font-semibold">
        <Icon size={11} /> {label}
      </div>
      <div className="text-sm font-bold text-gw-ink mt-0.5 truncate">{value}</div>
    </div>
  );
}
