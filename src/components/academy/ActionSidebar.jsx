import { Link } from 'react-router-dom';
import { CheckCircle2, GraduationCap, Briefcase, HeartHandshake, ArrowRight } from 'lucide-react';
import { useAuth } from '../../context/AuthContext.jsx';

export default function ActionSidebar({ path, onTryFree, onPreviewLesson }) {
  const { isAuthenticated, isEnrolledIn, getEnrollment } = useAuth();
  const enrolled = isAuthenticated && isEnrolledIn(path.slug);
  const enrollment = enrolled ? getEnrollment(path.slug) : null;

  return (
    <aside className="rounded-2xl bg-white border border-gw-navy/10 shadow-card overflow-hidden lg:sticky lg:top-24 self-start">
      <div className="bg-gradient-to-br from-gw-midnight to-gw-navy p-6 text-white">
        <div className="text-[11px] uppercase tracking-wider font-semibold text-white/60">
          {enrolled ? 'Your progress' : 'Enrollment options'}
        </div>
        <div className="mt-2 font-display text-2xl font-bold">
          {enrolled
            ? `${Math.round((enrollment?.overallProgress || 0) * 100)}% complete`
            : 'Start in 60 seconds'}
        </div>
        <p className="mt-2 text-sm text-white/75 leading-relaxed">
          {enrolled
            ? 'Pick up where you left off — your progress is saved.'
            : 'Free trial first, no card required. Switch to full enrollment any time.'}
        </p>
      </div>

      <div className="p-6 space-y-3">
        {enrolled ? (
          <Link to="/academy/learn/dashboard" className="btn btn-primary w-full">
            Continue Learning <ArrowRight size={14} />
          </Link>
        ) : (
          <>
            <Link to={`/academy/enroll/${path.slug}`} className="btn btn-primary w-full">
              Enroll Now <ArrowRight size={14} />
            </Link>
            <button
              type="button"
              onClick={onTryFree}
              className="w-full text-xs font-semibold text-gw-slate hover:text-gw-ink transition py-1"
            >
              Or try free for 7 days first
            </button>
          </>
        )}
        <button type="button" onClick={onPreviewLesson} className="btn btn-ghost-teal w-full">
          Preview Sample Lesson
        </button>

        <div className="pt-2 border-t border-gw-navy/10">
          <p className="text-[11px] uppercase tracking-wider font-semibold text-gw-slate mb-3">
            What's included
          </p>
          <ul className="space-y-2">
            {[
              'AI mentor on WhatsApp',
              'Mentor + peer code review',
              'Real partner-brief capstone',
              'Shareable certification',
              'Career coaching included',
            ].map((item) => (
              <li
                key={item}
                className="text-sm text-gw-ink leading-relaxed flex items-start gap-2"
              >
                <CheckCircle2 size={15} className="text-gw-teal mt-0.5 shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="pt-4 border-t border-gw-navy/10 space-y-3 text-sm">
          <Highlight icon={GraduationCap} label="Live cohorts" value="Monthly" />
          <Highlight icon={Briefcase} label="Hiring partners" value={`${path.employerCount} active`} />
          <Highlight icon={HeartHandshake} label="Scholarships" value="Available" />
        </div>

        <p className="text-[11px] text-gw-slate text-center pt-2">
          Need a school plan? <a href="/#contact" className="text-gw-teal font-semibold">Talk to us</a>.
        </p>
      </div>
    </aside>
  );
}

function Highlight({ icon: Icon, label, value }) {
  return (
    <div className="flex items-center justify-between text-sm">
      <span className="inline-flex items-center gap-2 text-gw-slate">
        <Icon size={14} className="text-gw-teal" /> {label}
      </span>
      <span className="font-semibold text-gw-ink">{value}</span>
    </div>
  );
}
