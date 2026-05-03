import { Link } from 'react-router-dom';
import { X, Clock, AlertTriangle, CheckCircle2, MessageCircle } from 'lucide-react';

const statusCfg = {
  draft: { label: 'Draft', className: 'bg-gw-ice text-gw-slate' },
  'review-requested': { label: 'Review requested', className: 'bg-gw-amber/15 text-gw-amber' },
  reviewing: { label: 'In review', className: 'bg-gw-teal/15 text-gw-teal' },
  approved: { label: 'Approved', className: 'bg-gw-teal/20 text-gw-teal' },
  'needs-changes': { label: 'Needs changes', className: 'bg-red-50 text-red-700' },
};

export default function ProjectToolbar({
  project,
  submissionStatus,
  daysLabel,
  isOverdue,
  canRequestReview,
  onRequestReview,
  onAskMentor,
}) {
  const status = statusCfg[submissionStatus] || statusCfg.draft;
  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur border-b border-gw-navy/10">
      <div className="container-x py-3 flex items-center gap-4 flex-wrap">
        <Link
          to="/academy/learn/dashboard"
          className="text-gw-slate hover:text-gw-ink transition shrink-0"
          aria-label="Back to dashboard"
        >
          <X size={18} />
        </Link>
        <div className="min-w-0 flex-1">
          <p className="text-[11px] uppercase tracking-wider font-semibold text-gw-slate truncate">
            {project.partnerName} · {project.kind === 'capstone' ? 'Capstone' : 'Module project'}
          </p>
          <p className="font-display text-sm font-bold text-gw-ink truncate">{project.title}</p>
        </div>

        <span
          className={`inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-[11px] font-bold ${
            isOverdue ? 'bg-red-50 text-red-700' : 'bg-gw-ice text-gw-slate'
          }`}
        >
          {isOverdue ? <AlertTriangle size={11} /> : <Clock size={11} />}
          {daysLabel}
        </span>

        <span
          className={`inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-[11px] font-bold ${status.className}`}
        >
          {submissionStatus === 'approved' && <CheckCircle2 size={11} />} {status.label}
        </span>

        <button
          type="button"
          onClick={onAskMentor}
          className="hidden md:inline-flex items-center gap-1 rounded-lg border border-gw-navy/15 px-2.5 py-1.5 text-xs font-semibold text-gw-slate hover:border-gw-teal hover:text-gw-teal transition"
        >
          <MessageCircle size={12} /> Ask mentor
        </button>

        <button
          type="button"
          onClick={onRequestReview}
          disabled={!canRequestReview}
          className={`inline-flex items-center gap-1 rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
            canRequestReview
              ? 'bg-gw-teal text-white hover:brightness-110'
              : 'bg-gw-ice text-gw-slate/60 cursor-not-allowed'
          }`}
          title={
            canRequestReview
              ? 'Submit for peer review'
              : submissionStatus !== 'draft'
                ? 'Already submitted'
                : 'Complete the requirements first'
          }
        >
          {submissionStatus === 'draft' ? 'Request review' : 'Submitted'}
        </button>
      </div>
    </header>
  );
}
