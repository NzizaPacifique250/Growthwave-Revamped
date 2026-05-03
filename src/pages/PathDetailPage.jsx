import { useEffect, useState } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { CheckCircle2, ListChecks, Users, Sparkles } from 'lucide-react';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';
import PathDetailHeader from '../components/academy/PathDetailHeader.jsx';
import CurriculumTimeline from '../components/academy/CurriculumTimeline.jsx';
import ActionSidebar from '../components/academy/ActionSidebar.jsx';
import CareerOutcomes from '../components/academy/CareerOutcomes.jsx';
import PathFaqs from '../components/academy/PathFaqs.jsx';
import PathReviews from '../components/academy/PathReviews.jsx';
import QandASection from '../components/academy/QandASection.jsx';
import RelatedPaths from '../components/academy/RelatedPaths.jsx';
import SampleLessonModal from '../components/academy/SampleLessonModal.jsx';
import TryFreeModal from '../components/academy/TryFreeModal.jsx';
import { getPathBySlug } from '../data/learningPaths.js';
import { getCurriculum, getFaqs } from '../data/pathDetails.js';
import { getTestimonialsForPath } from '../data/testimonials.js';
import { useAuth } from '../context/AuthContext.jsx';

export default function PathDetailPage() {
  const { slug } = useParams();
  const path = getPathBySlug(slug);
  const { assessmentResult } = useAuth();

  const [sampleOpen, setSampleOpen] = useState(false);
  const [tryFreeOpen, setTryFreeOpen] = useState(false);
  const [relatedSamplePath, setRelatedSamplePath] = useState(null);
  const [relatedTryFreePath, setRelatedTryFreePath] = useState(null);

  // Scroll to top on slug change so detail navigation feels right.
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [slug]);

  if (!path) return <Navigate to="/academy/paths" replace />;

  const curriculum = getCurriculum(slug);
  const faqs = getFaqs(slug);
  const reviews = getTestimonialsForPath(slug);

  return (
    <>
      <Navbar />
      <main className="bg-white text-gw-ink min-h-screen">
        <PathDetailHeader
          path={path}
          onTryFree={() => setTryFreeOpen(true)}
          onPreviewLesson={() => setSampleOpen(true)}
        />

        <section className="py-16">
          <div className="container-x grid grid-cols-1 lg:grid-cols-12 gap-10">
            <div className="lg:col-span-8 space-y-12">
              <AssessmentMatchBanner result={assessmentResult} currentSlug={slug} />
              <Overview path={path} />
              <div>
                <div className="flex items-baseline gap-3 mb-6">
                  <span className="font-display text-xs font-bold text-gw-teal uppercase tracking-[0.18em]">
                    Curriculum
                  </span>
                  <span className="text-xs text-gw-slate">·</span>
                  <span className="text-xs text-gw-slate font-semibold">
                    {curriculum.reduce((sum, p) => sum + p.modules.length, 0)} modules
                  </span>
                </div>
                <CurriculumTimeline phases={curriculum} />
              </div>
              <CareerOutcomes path={path} />
              <PathReviews testimonials={reviews} />
              <QandASection />
              <PathFaqs faqs={faqs} />
            </div>

            <div className="lg:col-span-4">
              <ActionSidebar
                path={path}
                onTryFree={() => setTryFreeOpen(true)}
                onPreviewLesson={() => setSampleOpen(true)}
              />
            </div>
          </div>
        </section>

        <RelatedPaths
          currentSlug={slug}
          onTryFree={setRelatedTryFreePath}
          onPreviewLesson={setRelatedSamplePath}
        />
      </main>
      <Footer />

      <SampleLessonModal
        open={sampleOpen}
        onClose={() => setSampleOpen(false)}
        path={path}
      />
      <TryFreeModal
        open={tryFreeOpen}
        onClose={() => setTryFreeOpen(false)}
        path={path}
      />

      {/* Related-card modals share state but a different active path. */}
      <SampleLessonModal
        open={!!relatedSamplePath}
        onClose={() => setRelatedSamplePath(null)}
        path={relatedSamplePath}
      />
      <TryFreeModal
        open={!!relatedTryFreePath}
        onClose={() => setRelatedTryFreePath(null)}
        path={relatedTryFreePath}
      />
    </>
  );
}

function AssessmentMatchBanner({ result, currentSlug }) {
  if (!result) return null;
  const isTopMatch = result.recommended.path.slug === currentSlug;
  const isAlternative = result.alternatives.some((a) => a.path.slug === currentSlug);
  if (!isTopMatch && !isAlternative) return null;

  const reasons = isTopMatch
    ? result.recommended.reasons
    : result.alternatives.find((a) => a.path.slug === currentSlug)?.reasons || [];

  return (
    <div className="rounded-2xl border border-gw-teal/30 bg-gw-teal/5 p-5 flex flex-col md:flex-row md:items-center gap-4">
      <div className="h-10 w-10 rounded-full bg-gw-teal/15 text-gw-teal flex items-center justify-center shrink-0">
        <Sparkles size={18} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-[11px] uppercase tracking-wider font-semibold text-gw-teal">
          {isTopMatch
            ? `Your top match · ${result.confidence}% confidence`
            : 'A strong alternative for you'}
        </div>
        <p className="mt-1 text-sm text-gw-ink leading-relaxed">
          {reasons[0] || 'This path lined up well with your assessment answers.'}
        </p>
      </div>
      <Link
        to="/academy/assessment"
        className="text-sm font-semibold text-gw-teal hover:underline whitespace-nowrap"
      >
        Review my assessment →
      </Link>
    </div>
  );
}

function Overview({ path }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <div className="font-display text-xs font-bold text-gw-teal uppercase tracking-[0.18em] mb-3">
          Overview
        </div>
        <h2 className="font-display text-2xl font-bold text-gw-ink leading-tight">
          What you'll get out of this path
        </h2>
        <p className="mt-3 text-sm text-gw-slate leading-relaxed">{path.summary}</p>

        <div className="mt-5">
          <p className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-wider font-semibold text-gw-slate mb-2">
            <Users size={11} /> Who it's for
          </p>
          <ul className="space-y-1.5">
            {path.forWho.map((line) => (
              <li
                key={line}
                className="text-sm text-gw-ink leading-relaxed flex items-start gap-2"
              >
                <CheckCircle2 size={15} className="text-gw-teal mt-0.5 shrink-0" />
                {line}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="rounded-2xl bg-gw-ice/60 border border-gw-navy/10 p-5">
        <p className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-wider font-semibold text-gw-slate mb-3">
          <ListChecks size={11} /> Prerequisites
        </p>
        <ul className="space-y-1.5 mb-5">
          {path.prerequisites.map((p) => (
            <li key={p} className="text-sm text-gw-ink leading-relaxed flex items-start gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-gw-navy/40 mt-2 shrink-0" />
              {p}
            </li>
          ))}
        </ul>

        <p className="text-[11px] uppercase tracking-wider font-semibold text-gw-slate mb-2">
          Skills you'll build
        </p>
        <div className="flex flex-wrap gap-1.5">
          {path.tags.map((t) => (
            <span
              key={t}
              className="text-[11px] px-2.5 py-1 rounded-md bg-white text-gw-navy font-semibold border border-gw-navy/10"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
