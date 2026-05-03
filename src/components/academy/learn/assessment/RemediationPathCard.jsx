import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen } from 'lucide-react';
import { humanizeSkill } from '../../../../utils/assessmentEngine.js';

export default function RemediationPathCard({
  remediation,
  pathSlug,
  moduleId,
  lessonsLookup,
  onRetry,
}) {
  if (!remediation?.length) return null;
  return (
    <section className="rounded-2xl bg-gw-amber/5 border border-gw-amber/30 p-5 md:p-6">
      <div className="flex items-baseline gap-2 mb-3">
        <span className="font-display text-xs font-bold text-gw-amber uppercase tracking-[0.18em]">
          Recommended next
        </span>
      </div>
      <h3 className="font-display text-xl font-bold text-gw-ink">
        Revisit these before retrying
      </h3>
      <p className="mt-1 text-sm text-gw-slate leading-relaxed">
        These lessons cover the skills that tripped you up. They take just a few minutes each.
      </p>

      <ul className="mt-4 space-y-2">
        {remediation.map((r) => {
          const lessons = r.lessonsToRevisit
            .map((id) => lessonsLookup.find((l) => l.id === id))
            .filter(Boolean);
          if (!lessons.length) return null;
          return (
            <li key={r.skill} className="rounded-xl bg-white border border-gw-navy/10 p-3.5">
              <p className="text-[11px] uppercase tracking-wider font-semibold text-gw-slate">
                Skill · {humanizeSkill(r.skill)}
              </p>
              <ul className="mt-2 space-y-1">
                {lessons.map((lesson) => (
                  <li key={lesson.id}>
                    <Link
                      to={`/academy/learn/${pathSlug}/modules/${moduleId}/${lesson.id}`}
                      className="group inline-flex items-center gap-1.5 text-sm text-gw-ink hover:text-gw-teal transition"
                    >
                      <BookOpen size={13} className="text-gw-slate group-hover:text-gw-teal" />
                      {lesson.title}
                      <ArrowRight size={12} className="opacity-0 group-hover:opacity-100 transition" />
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
          );
        })}
      </ul>

      <button type="button" onClick={onRetry} className="btn btn-primary mt-5 inline-flex items-center gap-2">
        Retry assessment <ArrowRight size={14} />
      </button>
      <p className="mt-2 text-[11px] text-gw-slate">
        Hints unlock from your second attempt onward.
      </p>
    </section>
  );
}
