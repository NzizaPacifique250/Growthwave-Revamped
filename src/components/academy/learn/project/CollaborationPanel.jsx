import { Tab } from '@headlessui/react';
import { Fragment } from 'react';
import { MessageCircle, Users, FileText, Calendar, Loader2, ThumbsUp, AlertTriangle, Clock } from 'lucide-react';

export default function CollaborationPanel({
  project,
  submissionStatus,
  reviewerComments,
  mentorNote,
  onAskMentor,
  onBookCheckIn,
  onRequestReview,
  canRequestReview,
  reviewerNote,
  onChangeReviewerNote,
}) {
  return (
    <aside className="rounded-2xl bg-white border border-gw-navy/10 shadow-card overflow-hidden flex flex-col">
      <Tab.Group>
        <Tab.List className="flex border-b border-gw-navy/10">
          {[
            { label: 'Mentor', Icon: MessageCircle },
            { label: 'Reviews', Icon: Users },
            { label: 'Notes', Icon: FileText },
          ].map((t) => (
            <Tab key={t.label} as={Fragment}>
              {({ selected }) => (
                <button
                  type="button"
                  className={`flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2.5 text-xs font-semibold transition focus:outline-none ${
                    selected
                      ? 'text-gw-teal border-b-2 border-gw-teal -mb-px'
                      : 'text-gw-slate hover:text-gw-ink'
                  }`}
                >
                  <t.Icon size={12} /> {t.label}
                </button>
              )}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels className="flex-1">
          <Tab.Panel className="p-4 space-y-4">
            <MentorTab
              mentor={project.mentor}
              onAskMentor={onAskMentor}
              onBookCheckIn={onBookCheckIn}
              mentorNote={mentorNote}
            />
          </Tab.Panel>
          <Tab.Panel className="p-4 space-y-4">
            <ReviewsTab
              status={submissionStatus}
              comments={reviewerComments}
              onRequestReview={onRequestReview}
              canRequestReview={canRequestReview}
              reviewerNote={reviewerNote}
              onChangeReviewerNote={onChangeReviewerNote}
            />
          </Tab.Panel>
          <Tab.Panel className="p-4 space-y-3">
            <NotesTab project={project} />
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </aside>
  );
}

function MentorTab({ mentor, onAskMentor, onBookCheckIn, mentorNote }) {
  return (
    <>
      <div className="flex items-center gap-3">
        <span className="h-10 w-10 rounded-full bg-gradient-to-br from-gw-teal to-gw-navy text-white text-xs font-bold flex items-center justify-center shrink-0">
          {mentor.initials}
        </span>
        <div className="min-w-0">
          <p className="text-sm font-semibold text-gw-ink truncate">{mentor.name}</p>
          <p className="text-[11px] text-gw-slate truncate">{mentor.role}</p>
        </div>
      </div>
      <p className="inline-flex items-center gap-1.5 text-[11px] text-gw-slate">
        <Clock size={11} className="text-gw-teal" /> {mentor.availability}
      </p>

      {mentorNote && (
        <div className="rounded-lg bg-gw-teal/5 border border-gw-teal/20 px-3 py-2.5">
          <p className="text-[10px] uppercase tracking-wider font-semibold text-gw-teal mb-1">
            Mentor note
          </p>
          <p className="text-xs text-gw-ink leading-relaxed">{mentorNote}</p>
        </div>
      )}

      <div className="grid grid-cols-1 gap-2">
        <button
          type="button"
          onClick={onAskMentor}
          className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-gw-navy/15 px-3 py-2 text-xs font-semibold text-gw-ink hover:border-gw-teal hover:text-gw-teal transition"
        >
          <MessageCircle size={12} /> Ask a question
        </button>
        <button
          type="button"
          onClick={onBookCheckIn}
          className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-gw-navy/15 px-3 py-2 text-xs font-semibold text-gw-ink hover:border-gw-teal hover:text-gw-teal transition"
        >
          <Calendar size={12} /> Book a check-in
        </button>
      </div>
    </>
  );
}

function ReviewsTab({ status, comments, onRequestReview, canRequestReview, reviewerNote, onChangeReviewerNote }) {
  if (status === 'draft') {
    return (
      <div>
        <p className="text-[11px] uppercase tracking-wider font-semibold text-gw-slate mb-2">
          Peer review
        </p>
        <p className="text-xs text-gw-ink leading-relaxed">
          Three reviewers will use the rubric (Code · Design · Polish) to give you feedback. Most reviews come back within 24 hours.
        </p>

        <label className="block mt-4">
          <span className="text-[11px] uppercase tracking-wider font-semibold text-gw-slate">
            Notes for reviewers
          </span>
          <textarea
            value={reviewerNote}
            onChange={(e) => onChangeReviewerNote(e.target.value)}
            rows={3}
            placeholder="What would you like feedback on most?"
            className="mt-1 w-full rounded-lg border border-gw-navy/15 bg-white px-3 py-2 text-xs text-gw-ink placeholder:text-gw-slate focus:outline-none focus:border-gw-teal focus:ring-2 focus:ring-gw-teal/20 transition resize-none"
          />
        </label>

        <button
          type="button"
          onClick={onRequestReview}
          disabled={!canRequestReview}
          className={`mt-3 w-full inline-flex items-center justify-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold transition ${
            canRequestReview
              ? 'bg-gw-teal text-white hover:brightness-110'
              : 'bg-gw-ice text-gw-slate/60 cursor-not-allowed'
          }`}
        >
          Request peer review
        </button>
        {!canRequestReview && (
          <p className="mt-2 text-[11px] text-gw-slate inline-flex items-start gap-1">
            <AlertTriangle size={11} className="text-gw-amber mt-0.5 shrink-0" />
            Mark all requirements as Done first.
          </p>
        )}
      </div>
    );
  }

  if (status === 'review-requested') {
    return (
      <div className="text-center py-6">
        <Loader2 size={20} className="text-gw-teal mx-auto animate-spin" />
        <p className="mt-3 text-sm font-semibold text-gw-ink">Routing to reviewers</p>
        <p className="mt-1 text-xs text-gw-slate leading-relaxed max-w-[220px] mx-auto">
          Three peers in your cohort are being matched. Feedback usually arrives within a day.
        </p>
      </div>
    );
  }

  // status === 'reviewing' or later
  return (
    <div className="space-y-3">
      <div className="flex items-baseline justify-between">
        <p className="text-[11px] uppercase tracking-wider font-semibold text-gw-slate">
          Reviews ({comments.length})
        </p>
        <span className="text-[11px] text-gw-teal font-bold">In review</span>
      </div>
      {comments.map((c, i) => (
        <ReviewerCard key={i} review={c} />
      ))}
    </div>
  );
}

function ReviewerCard({ review }) {
  const total = review.rubric.code + review.rubric.design + review.rubric.polish;
  return (
    <article className="rounded-lg border border-gw-navy/10 p-3">
      <header className="flex items-center gap-2">
        <span className="h-7 w-7 rounded-full bg-gradient-to-br from-gw-teal to-gw-navy text-white text-[10px] font-bold flex items-center justify-center">
          {review.reviewer.initials}
        </span>
        <div className="flex-1 min-w-0">
          <p className="text-xs font-semibold text-gw-ink truncate">{review.reviewer.name}</p>
          <p className="text-[10px] text-gw-slate">Peer reviewer</p>
        </div>
        <span className="text-[10px] font-bold text-gw-ink bg-gw-ice px-2 py-0.5 rounded-full">
          {total}/30
        </span>
      </header>

      <dl className="mt-2 grid grid-cols-3 gap-1 text-[10px]">
        <RubricCell label="Code" value={review.rubric.code} />
        <RubricCell label="Design" value={review.rubric.design} />
        <RubricCell label="Polish" value={review.rubric.polish} />
      </dl>

      <p className="mt-2.5 text-xs text-gw-ink leading-relaxed">{review.comment}</p>

      {review.kudos?.length > 0 && (
        <div className="mt-2.5">
          <p className="text-[10px] uppercase tracking-wider font-semibold text-gw-teal mb-1 inline-flex items-center gap-1">
            <ThumbsUp size={10} /> Kudos
          </p>
          <ul className="space-y-0.5">
            {review.kudos.map((k, i) => (
              <li key={i} className="text-[11px] text-gw-ink">
                · {k}
              </li>
            ))}
          </ul>
        </div>
      )}
      {review.suggestions?.length > 0 && (
        <div className="mt-2">
          <p className="text-[10px] uppercase tracking-wider font-semibold text-gw-amber mb-1">
            Suggestions
          </p>
          <ul className="space-y-0.5">
            {review.suggestions.map((s, i) => (
              <li key={i} className="text-[11px] text-gw-ink">
                · {s}
              </li>
            ))}
          </ul>
        </div>
      )}
    </article>
  );
}

function RubricCell({ label, value }) {
  return (
    <div className="rounded-md bg-gw-ice/60 px-2 py-1 text-center">
      <div className="text-[9px] uppercase tracking-wider font-semibold text-gw-slate">{label}</div>
      <div className="text-xs font-bold text-gw-ink">{value}/10</div>
    </div>
  );
}

function NotesTab({ project }) {
  return (
    <div className="space-y-3">
      <p className="text-[11px] uppercase tracking-wider font-semibold text-gw-slate">
        Project notes
      </p>
      <p className="text-xs text-gw-ink leading-relaxed">
        Use the lesson notes panel for per-lesson notes. Project-wide notes can live here in a future update — for now, keep ideas in your editor as comments.
      </p>
      <p className="text-[11px] text-gw-slate leading-relaxed">
        Estimated time · {project.estimatedHours} hours total
      </p>
    </div>
  );
}
