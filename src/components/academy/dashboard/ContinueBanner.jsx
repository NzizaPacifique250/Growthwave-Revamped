import { Link } from 'react-router-dom';
import { Brain, Code2, Sparkles, Layers, Play, Clock } from 'lucide-react';

const iconMap = { Brain, Code2, Sparkles, Layers };
const lessonTypeIcon = {
  video: Play,
  reading: Play,
  interactive: Play,
  quiz: Play,
};

export default function ContinueBanner({ path, module: currentModule, nextLesson }) {
  const PathIcon = iconMap[path.icon] || Code2;
  const LessonIcon = lessonTypeIcon[nextLesson?.type] || Play;
  const lessonHref = nextLesson
    ? `/academy/learn/${path.slug}/modules/${currentModule.id}/${nextLesson.id}`
    : `/academy/paths/${path.slug}`;

  return (
    <div className="rounded-2xl bg-gradient-to-br from-gw-midnight to-gw-navy text-white p-6 md:p-8 shadow-cardHover overflow-hidden relative">
      <div
        className="absolute -top-24 -right-12 h-72 w-72 rounded-full opacity-30 blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, #00A896 0%, transparent 70%)' }}
      />
      <div className="relative grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        <div className="md:col-span-8">
          <div className="inline-flex items-center gap-2">
            <span className="h-9 w-9 rounded-lg bg-gw-teal/15 border border-gw-teal/40 text-gw-teal flex items-center justify-center">
              <PathIcon size={16} />
            </span>
            <span className="text-[11px] uppercase tracking-wider font-semibold text-white/60">
              Pick up where you left off
            </span>
          </div>
          <h2 className="mt-3 font-display text-2xl md:text-3xl font-extrabold leading-tight">
            {nextLesson ? nextLesson.title : currentModule.title}
          </h2>
          <p className="mt-2 text-white/75 text-sm leading-relaxed">
            {currentModule.title}
            {nextLesson && (
              <>
                {' · '}
                <span className="inline-flex items-center gap-1">
                  <Clock size={11} /> {nextLesson.duration}
                </span>
              </>
            )}
          </p>

          <Link
            to={lessonHref}
            className="btn btn-primary mt-5 inline-flex items-center gap-2"
          >
            <LessonIcon size={16} /> Resume lesson
          </Link>
        </div>

        <div className="md:col-span-4">
          <ModuleProgress module={currentModule} />
        </div>
      </div>
    </div>
  );
}

function ModuleProgress({ module: currentModule }) {
  const completed = currentModule.lessons?.filter((l) => l.status === 'completed').length || 0;
  const total = currentModule.lessons?.length || 0;
  return (
    <div className="rounded-xl bg-white/5 border border-white/10 backdrop-blur p-4">
      <p className="text-[10px] uppercase tracking-wider font-semibold text-white/55">
        Module progress
      </p>
      <p className="mt-1 font-display text-xl font-bold">
        {completed}/{total} lessons
      </p>
      <ol className="mt-3 space-y-1.5">
        {currentModule.lessons?.slice(0, 4).map((l) => (
          <li
            key={l.id}
            className={`flex items-center gap-2 text-xs ${
              l.status === 'completed'
                ? 'text-white/60 line-through'
                : l.status === 'in-progress'
                  ? 'text-gw-teal font-semibold'
                  : 'text-white/80'
            }`}
          >
            <span
              className={`h-1.5 w-1.5 rounded-full shrink-0 ${
                l.status === 'completed'
                  ? 'bg-white/30'
                  : l.status === 'in-progress'
                    ? 'bg-gw-teal'
                    : 'bg-white/20'
              }`}
            />
            <span className="truncate">{l.title}</span>
          </li>
        ))}
        {currentModule.lessons && currentModule.lessons.length > 4 && (
          <li className="text-[11px] text-white/50 pl-3.5">
            +{currentModule.lessons.length - 4} more
          </li>
        )}
      </ol>
    </div>
  );
}
