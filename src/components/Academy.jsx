import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Brain, MessageCircle, BarChart3, Compass } from 'lucide-react';
import { useReveal } from '../hooks.js';
import PathCard from './academy/PathCard.jsx';
import SampleLessonModal from './academy/SampleLessonModal.jsx';
import TryFreeModal from './academy/TryFreeModal.jsx';
import { learningPaths, pathFilters } from '../data/learningPaths.js';

const platformPillars = [
  {
    icon: Brain,
    title: 'AI-Personalized Path',
    body: 'Adapts to each student\'s pace and identifies knowledge gaps automatically.',
  },
  {
    icon: MessageCircle,
    title: 'WhatsApp AI Mentor',
    body: 'Coding help and project guidance through WhatsApp — meeting students where they already are.',
  },
  {
    icon: BarChart3,
    title: 'Real-Time Progress',
    body: 'Schools and mentors see live dashboards of student progress and skill assessments.',
  },
];

const outcomeFilters = [{ id: 'all', label: 'All paths' }, ...pathFilters.outcome];

export default function Academy() {
  const ref = useReveal();
  const [activeFilter, setActiveFilter] = useState('all');
  const [sampleLessonPath, setSampleLessonPath] = useState(null);
  const [tryFreePath, setTryFreePath] = useState(null);

  const filteredPaths = useMemo(() => {
    if (activeFilter === 'all') return learningPaths;
    return learningPaths.filter(
      (p) => p.outcomeType.toLowerCase().replace(/\s+/g, '-') === activeFilter
    );
  }, [activeFilter]);

  return (
    <section ref={ref} id="academy" className="bg-white py-24 md:py-28">
      <div className="container-x">
        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end reveal">
          <div className="lg:col-span-7">
            <span className="eyebrow">The Platform</span>
            <h2 className="h-section mt-3">
              Meet <span className="text-gw-teal">Growthwave Academy</span>
            </h2>
            <p className="mt-5 text-lg text-gw-slate leading-relaxed max-w-2xl">
              Structured learning paths that take students from fundamentals to industry-ready
              proficiency — with mentor reviews, real partner-brief projects, and direct
              connections to hiring partners.
            </p>
          </div>

          <div className="lg:col-span-5 grid sm:grid-cols-3 gap-3">
            {platformPillars.map(({ icon: Icon, title, body }) => (
              <div
                key={title}
                className="rounded-xl border border-gw-navy/10 bg-gw-ice/50 p-4"
              >
                <div className="h-9 w-9 rounded-lg bg-white flex items-center justify-center text-gw-teal shadow-sm">
                  <Icon size={16} />
                </div>
                <h4 className="mt-3 font-display font-bold text-gw-ink text-sm">{title}</h4>
                <p className="mt-1 text-xs text-gw-slate leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Path preview block */}
        <div className="mt-14 reveal">
          <div className="flex items-end justify-between gap-4 flex-wrap">
            <div>
              <span className="eyebrow">Learning Paths</span>
              <h3 className="mt-2 font-display text-2xl md:text-3xl font-bold text-gw-ink">
                Choose your path to industry leadership
              </h3>
              <p className="mt-2 text-sm text-gw-slate max-w-xl">
                Role-based tracks with progressive levels and capstone projects.
                Try any path free for a week — no card required.
              </p>
            </div>
            <Link
              to="/academy/paths"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-gw-teal hover:gap-2 transition-all"
            >
              Explore all paths <ArrowRight size={14} />
            </Link>
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            {outcomeFilters.map((opt) => {
              const active = activeFilter === opt.id;
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setActiveFilter(opt.id)}
                  className={`text-xs font-semibold px-3 py-1.5 rounded-full border transition-all ${
                    active
                      ? 'bg-gw-teal text-white border-gw-teal'
                      : 'bg-white text-gw-slate border-gw-navy/15 hover:border-gw-teal hover:text-gw-teal'
                  }`}
                  aria-pressed={active}
                >
                  {opt.label}
                </button>
              );
            })}
          </div>

          <div className="mt-7 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredPaths.slice(0, 3).map((path) => (
              <PathCard
                key={path.slug}
                path={path}
                onTryFree={setTryFreePath}
                onPreviewLesson={setSampleLessonPath}
              />
            ))}
          </div>

          {filteredPaths.length > 3 && (
            <div className="mt-6 text-center">
              <Link to="/academy/paths" className="btn btn-ghost-teal">
                See {filteredPaths.length - 3} more {activeFilter === 'all' ? 'paths' : 'in this track'}
              </Link>
            </div>
          )}

          <div className="mt-8 rounded-2xl border border-gw-navy/10 bg-gw-ice/50 px-5 py-4 flex flex-col md:flex-row md:items-center gap-3">
            <div className="h-9 w-9 rounded-full bg-gw-teal/15 text-gw-teal flex items-center justify-center shrink-0">
              <Compass size={16} />
            </div>
            <div className="flex-1">
              <div className="font-display font-bold text-gw-ink text-sm">
                Not sure which path is right for you?
              </div>
              <p className="text-xs text-gw-slate leading-relaxed">
                Take our 5-minute assessment for a personalized recommendation with confidence scoring.
              </p>
            </div>
            <Link
              to="/academy/assessment"
              className="btn btn-primary !py-2 !px-4 text-xs whitespace-nowrap"
            >
              Take assessment
            </Link>
          </div>
        </div>
      </div>

      <SampleLessonModal
        open={!!sampleLessonPath}
        onClose={() => setSampleLessonPath(null)}
        path={sampleLessonPath}
      />
      <TryFreeModal
        open={!!tryFreePath}
        onClose={() => setTryFreePath(null)}
        path={tryFreePath}
      />
    </section>
  );
}
