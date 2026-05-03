import { Link } from 'react-router-dom';
import {
  Brain,
  Code2,
  Sparkles,
  Layers,
  ChevronLeft,
  Clock,
  Users,
  TrendingUp,
  Star,
  PlayCircle,
  Compass,
} from 'lucide-react';

const iconMap = { Brain, Code2, Sparkles, Layers };

export default function PathDetailHeader({ path, onPreviewLesson, onTryFree }) {
  const Icon = iconMap[path.icon] || Code2;

  return (
    <section className="relative overflow-hidden bg-gw-midnight text-white pt-28 pb-16">
      <div
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(26, 47, 107, 0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(26, 47, 107, 0.5) 1px, transparent 1px)',
          backgroundSize: '56px 56px',
          transform: 'skewY(-2deg)',
        }}
      />
      <div
        className="absolute -top-24 right-0 h-[400px] w-[400px] rounded-full opacity-25 blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, #00A896 0%, transparent 70%)' }}
      />

      <div className="container-x relative">
        <Link
          to="/academy/paths"
          className="inline-flex items-center gap-1.5 text-sm text-white/70 hover:text-white transition mb-6"
        >
          <ChevronLeft size={16} /> All learning paths
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-8">
            <div className="flex items-start gap-4">
              <div className="h-14 w-14 rounded-2xl bg-gw-teal/15 border border-gw-teal/40 flex items-center justify-center text-gw-teal shrink-0">
                <Icon size={26} />
              </div>
              <div className="min-w-0">
                <div className="flex flex-wrap gap-2 mb-3">
                  <span className="pill bg-gw-teal/20 text-gw-teal">{path.outcomeType}</span>
                  <span className="pill bg-white/10 text-white normal-case tracking-normal !text-[11px]">
                    {path.levelRange}
                  </span>
                  {path.hybrid && (
                    <span className="pill bg-gradient-to-r from-gw-teal to-gw-navy text-white">
                      Hybrid Track
                    </span>
                  )}
                </div>
                <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight">
                  {path.title}
                </h1>
                <p className="mt-3 text-lg text-white/75 leading-relaxed max-w-2xl">
                  {path.tagline}
                </p>
              </div>
            </div>

            <dl className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl">
              <Stat icon={Clock} label="Duration" value={path.duration} />
              <Stat icon={Users} label="Enrolled" value={path.enrollment.toLocaleString()} />
              <Stat icon={TrendingUp} label="Completion" value={`${path.completionRate}%`} />
              <Stat icon={Star} label="Rating" value={path.rating} />
            </dl>

            <div className="mt-8 flex flex-wrap gap-3">
              <button type="button" onClick={onTryFree} className="btn btn-primary">
                Start Free Week
              </button>
              <button
                type="button"
                onClick={onPreviewLesson}
                className="btn btn-ghost-teal text-white border-white/30 hover:bg-white hover:text-gw-midnight inline-flex items-center gap-2"
              >
                <PlayCircle size={16} /> Preview a lesson
              </button>
            </div>
            <Link
              to="/academy/assessment"
              className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-white/60 hover:text-white transition"
            >
              <Compass size={12} /> Not sure this is right? Take the assessment
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({ icon: Icon, label, value }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 backdrop-blur px-4 py-3">
      <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-white/55 font-semibold">
        <Icon size={11} /> {label}
      </div>
      <div className="mt-1 font-display text-lg font-bold text-white">{value}</div>
    </div>
  );
}
