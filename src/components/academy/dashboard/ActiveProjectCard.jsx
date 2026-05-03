import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Wrench, Clock, Users } from 'lucide-react';

const statusLabel = {
  draft: 'In progress',
  'review-requested': 'Submitted',
  reviewing: 'In review',
  approved: 'Approved',
  'needs-changes': 'Needs changes',
};

export default function ActiveProjectCard({ project, projectState, pathSlug }) {
  if (!project) return null;
  const total = project.requirements.length;
  const done = project.requirements.filter(
    (r) => projectState.checklist[r.id] === 'done'
  ).length;
  const percent = total > 0 ? (done / total) * 100 : 0;
  const dueLabel = formatDueLabel(project.dueAt);
  const status = statusLabel[projectState.submissionStatus] || 'In progress';

  return (
    <Link
      to={`/academy/learn/${pathSlug}/projects/${project.id}`}
      className="group block rounded-2xl bg-white border border-gw-navy/10 shadow-card hover:shadow-cardHover transition-shadow overflow-hidden"
    >
      <div className="px-5 py-4 flex items-center gap-3 border-b border-gw-navy/10">
        <span className="h-9 w-9 rounded-lg bg-gw-teal/15 text-gw-teal flex items-center justify-center shrink-0">
          <Wrench size={15} />
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-[11px] uppercase tracking-wider font-semibold text-gw-slate">
            Active project
          </p>
          <p className="font-display font-bold text-gw-ink leading-tight truncate">
            {project.title}
          </p>
        </div>
        <ArrowRight
          size={14}
          className="text-gw-slate group-hover:text-gw-teal group-hover:translate-x-0.5 transition shrink-0"
        />
      </div>

      <div className="p-5">
        <div className="flex items-baseline justify-between gap-2 mb-1.5">
          <span className="text-[11px] font-semibold text-gw-slate">
            {done} / {total} requirements
          </span>
          <span className="text-[11px] font-bold text-gw-teal">{status}</span>
        </div>
        <div className="h-1.5 rounded-full bg-gw-ice overflow-hidden">
          <motion.div
            className="h-full bg-gw-teal"
            initial={{ width: 0 }}
            animate={{ width: `${percent}%` }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          />
        </div>

        <dl className="mt-4 grid grid-cols-2 gap-2 text-[11px]">
          <div className="rounded-md bg-gw-ice/60 px-2.5 py-2">
            <dt className="text-gw-slate font-semibold inline-flex items-center gap-1">
              <Clock size={10} /> Due
            </dt>
            <dd className="mt-0.5 text-gw-ink font-bold">{dueLabel}</dd>
          </div>
          <div className="rounded-md bg-gw-ice/60 px-2.5 py-2">
            <dt className="text-gw-slate font-semibold inline-flex items-center gap-1">
              <Users size={10} /> Mentor
            </dt>
            <dd className="mt-0.5 text-gw-ink font-bold truncate">{project.mentor.name}</dd>
          </div>
        </dl>
      </div>
    </Link>
  );
}

function formatDueLabel(iso) {
  if (!iso) return '—';
  const target = new Date(iso + 'T23:59:59');
  const now = new Date();
  const days = Math.ceil((target - now) / (24 * 60 * 60 * 1000));
  if (days < 0) return `${Math.abs(days)}d overdue`;
  if (days === 0) return 'Today';
  if (days === 1) return 'Tomorrow';
  if (days < 14) return `In ${days}d`;
  return `In ${Math.round(days / 7)}w`;
}
