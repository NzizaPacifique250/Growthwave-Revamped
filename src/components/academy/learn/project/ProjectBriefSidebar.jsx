import { Link } from 'react-router-dom';
import { BookOpen, FileText, ExternalLink } from 'lucide-react';
import RequirementsChecklist from './RequirementsChecklist.jsx';
import TemplateToggleMenu from './TemplateToggleMenu.jsx';

export default function ProjectBriefSidebar({
  project,
  pathSlug,
  checklist,
  onChecklistChange,
  activeTemplateId,
  onTemplateChange,
}) {
  return (
    <aside className="rounded-2xl bg-white border border-gw-navy/10 shadow-card overflow-hidden">
      <header className="px-5 py-4 border-b border-gw-navy/10">
        <p className="text-[11px] uppercase tracking-wider font-semibold text-gw-slate">
          Project brief
        </p>
        <h2 className="font-display text-lg font-bold text-gw-ink leading-tight">
          {project.title}
        </h2>
        <p className="mt-1 text-xs text-gw-slate">{project.partnerName}</p>
      </header>

      <div className="px-5 py-4 space-y-5">
        <section>
          <p className="text-sm text-gw-ink leading-relaxed">{project.briefSummary}</p>
          {project.briefDetail?.length > 0 && (
            <details className="mt-3 group">
              <summary className="text-[11px] font-semibold text-gw-teal cursor-pointer hover:underline">
                Read the full brief
              </summary>
              <div className="mt-3 space-y-2.5">
                {project.briefDetail.map((b, i) =>
                  b.kind === 'h3' ? (
                    <h4 key={i} className="font-display font-bold text-gw-ink text-sm">
                      {b.text}
                    </h4>
                  ) : (
                    <p key={i} className="text-xs text-gw-ink leading-relaxed">
                      {b.text}
                    </p>
                  )
                )}
              </div>
            </details>
          )}
        </section>

        <section>
          <p className="text-[11px] uppercase tracking-wider font-semibold text-gw-slate mb-2">
            Requirements
          </p>
          <RequirementsChecklist
            requirements={project.requirements}
            checklist={checklist}
            onChange={onChecklistChange}
          />
          <p className="mt-2 text-[11px] text-gw-slate leading-relaxed">
            Tip: tap each item to cycle status (Not started → In progress → Done).
          </p>
        </section>

        {project.templates?.length > 0 && (
          <section>
            <p className="text-[11px] uppercase tracking-wider font-semibold text-gw-slate mb-2">
              Starter template
            </p>
            <TemplateToggleMenu
              templates={project.templates}
              activeId={activeTemplateId}
              onSelect={onTemplateChange}
            />
          </section>
        )}

        {project.resources?.length > 0 && (
          <section>
            <p className="text-[11px] uppercase tracking-wider font-semibold text-gw-slate mb-2">
              Resources
            </p>
            <ul className="space-y-1">
              {project.resources.map((r, i) => {
                if (r.kind === 'lesson') {
                  return (
                    <li key={i}>
                      <Link
                        to={`/academy/learn/${pathSlug}/modules/${r.moduleId}/${r.lessonId}`}
                        className="group inline-flex items-center gap-1.5 text-xs text-gw-ink hover:text-gw-teal transition"
                      >
                        <BookOpen size={12} className="text-gw-slate group-hover:text-gw-teal" />
                        {r.label}
                      </Link>
                    </li>
                  );
                }
                return (
                  <li key={i}>
                    <a
                      href={r.href}
                      target="_blank"
                      rel="noreferrer"
                      className="group inline-flex items-center gap-1.5 text-xs text-gw-ink hover:text-gw-teal transition"
                    >
                      {r.kind === 'doc' ? (
                        <FileText size={12} className="text-gw-slate group-hover:text-gw-teal" />
                      ) : (
                        <ExternalLink size={12} className="text-gw-slate group-hover:text-gw-teal" />
                      )}
                      {r.label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </section>
        )}
      </div>
    </aside>
  );
}
