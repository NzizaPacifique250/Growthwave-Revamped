import { Link } from 'react-router-dom';
import { Check, Lock, Play, FileText, Wrench, ClipboardCheck, Hammer } from 'lucide-react';
import { getProjectForModule } from '../../../data/projects.js';

const lessonTypeIcon = {
  video: Play,
  reading: FileText,
  interactive: Wrench,
  quiz: ClipboardCheck,
};

export default function LessonNav({ path, module: currentModule, currentLessonId }) {
  const linkedProject = getProjectForModule(path.slug, currentModule.id);
  return (
    <nav className="rounded-2xl bg-white border border-gw-navy/10 shadow-card overflow-hidden">
      <div className="px-4 py-3 border-b border-gw-navy/10">
        <p className="text-[11px] uppercase tracking-wider font-semibold text-gw-slate">
          Module
        </p>
        <p className="font-display font-bold text-gw-ink leading-tight">
          {currentModule.title}
        </p>
      </div>

      <ol className="py-2">
        {linkedProject && (
          <li>
            <Link
              to={`/academy/learn/${path.slug}/projects/${linkedProject.id}`}
              className="flex items-center gap-3 px-4 py-2.5 text-sm transition text-gw-ink hover:bg-gw-ice/60"
            >
              <span className="h-7 w-7 rounded-lg bg-gw-amber/15 text-gw-amber flex items-center justify-center shrink-0">
                <Hammer size={13} />
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-sm leading-tight truncate">Project · {linkedProject.title}</p>
                <p className="text-[11px] text-gw-slate">
                  Capstone-style brief · {linkedProject.estimatedHours}h
                </p>
              </div>
            </Link>
          </li>
        )}
        {currentModule.lessons?.map((lesson, idx) => {
          const Icon = lessonTypeIcon[lesson.type] || FileText;
          const isCurrent = lesson.id === currentLessonId;
          const status = lesson.status;
          const isLocked = status === 'locked' && !isCurrent;
          const Wrapper = isLocked ? 'div' : Link;
          const wrapperProps = isLocked
            ? {}
            : { to: `/academy/learn/${path.slug}/modules/${currentModule.id}/${lesson.id}` };

          return (
            <li key={lesson.id}>
              <Wrapper
                {...wrapperProps}
                className={`flex items-center gap-3 px-4 py-2.5 text-sm transition ${
                  isCurrent
                    ? 'bg-gw-teal/10 text-gw-ink border-l-2 border-gw-teal'
                    : isLocked
                      ? 'text-gw-slate/60 cursor-not-allowed'
                      : 'text-gw-ink hover:bg-gw-ice/60'
                }`}
              >
                <span
                  className={`h-7 w-7 rounded-lg flex items-center justify-center shrink-0 ${
                    status === 'completed'
                      ? 'bg-gw-teal text-white'
                      : isCurrent
                        ? 'bg-white border-2 border-gw-teal text-gw-teal'
                        : isLocked
                          ? 'bg-gw-ice text-gw-slate/60'
                          : 'bg-gw-ice text-gw-slate'
                  }`}
                >
                  {status === 'completed' ? (
                    <Check size={13} />
                  ) : isLocked ? (
                    <Lock size={11} />
                  ) : (
                    <Icon size={13} />
                  )}
                </span>
                <div className="flex-1 min-w-0">
                  <p
                    className={`text-sm leading-tight truncate ${
                      isCurrent ? 'font-semibold' : ''
                    }`}
                  >
                    {idx + 1}. {lesson.title}
                  </p>
                  <p className="text-[11px] text-gw-slate capitalize">
                    {lesson.type}
                    {lesson.duration ? ` · ${lesson.duration}` : ''}
                  </p>
                </div>
              </Wrapper>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
