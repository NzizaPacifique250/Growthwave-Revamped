import { useEffect, useMemo, useState } from 'react';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, Clock, ListChecks, Award, ArrowRight } from 'lucide-react';
import QuizHeader from '../components/academy/learn/assessment/QuizHeader.jsx';
import AssessmentSidebar from '../components/academy/learn/assessment/AssessmentSidebar.jsx';
import AssessmentToolbar from '../components/academy/learn/assessment/AssessmentToolbar.jsx';
import QuestionFrame from '../components/academy/learn/assessment/QuestionFrame.jsx';
import { SingleChoice, MultiChoice } from '../components/academy/learn/assessment/QuestionTypes.jsx';
import ResultsHeader from '../components/academy/learn/assessment/ResultsHeader.jsx';
import ScoreBreakdown from '../components/academy/learn/assessment/ScoreBreakdown.jsx';
import SkillGapMatrix from '../components/academy/learn/assessment/SkillGapMatrix.jsx';
import RemediationPathCard from '../components/academy/learn/assessment/RemediationPathCard.jsx';
import BadgeAwardModal from '../components/academy/learn/assessment/BadgeAwardModal.jsx';
import RetryModal from '../components/academy/learn/assessment/RetryModal.jsx';
import { getPathBySlug } from '../data/learningPaths.js';
import { getModuleAssessment } from '../data/moduleAssessments.js';
import { useAuth } from '../context/AuthContext.jsx';
import { scoreAssessment } from '../utils/assessmentEngine.js';

const HINTS_PER_ATTEMPT = 3;
const RULES = [
  'Per-question feedback after each submit',
  '70% to pass · 90% for mastery',
  'Multiple attempts allowed — best score counts',
  'Hints unlock from attempt 2 onward',
];

export default function ModuleAssessmentPage() {
  const { slug, moduleId } = useParams();
  const navigate = useNavigate();
  const { getEnrollment, getModuleAttempts, recordAssessmentAttempt } = useAuth();

  const path = getPathBySlug(slug);
  const enrollment = path ? getEnrollment(path.slug) : null;
  const currentModule = enrollment?.modules.find((m) => m.id === moduleId);
  const assessment = getModuleAssessment(slug, moduleId);

  const pastAttempts = getModuleAttempts(slug, moduleId);
  const attemptNumber = pastAttempts.length + 1;
  const hintsUnlocked = attemptNumber > 1;

  const [phase, setPhase] = useState('intro'); // intro | taking | results
  const [questionIdx, setQuestionIdx] = useState(0);
  const [answers, setAnswers] = useState({});
  const [submittedQuestionIds, setSubmittedQuestionIds] = useState(new Set());
  const [hintsUsed, setHintsUsed] = useState({});
  const [hintsRemaining, setHintsRemaining] = useState(HINTS_PER_ATTEMPT);
  const [retryOpen, setRetryOpen] = useState(false);
  const [result, setResult] = useState(null);
  const [badgeOpen, setBadgeOpen] = useState(false);

  // Reset transient state whenever the assessment key changes (e.g. retry).
  const assessmentKey = `${slug}:${moduleId}:${attemptNumber}`;
  useEffect(() => {
    setQuestionIdx(0);
    setAnswers({});
    setSubmittedQuestionIds(new Set());
    setHintsUsed({});
    setHintsRemaining(HINTS_PER_ATTEMPT);
    setResult(null);
  }, [assessmentKey]);

  // Bad params or not enrolled → kick to dashboard.
  if (!path || !enrollment || !currentModule || !assessment) {
    return <Navigate to="/academy/learn/dashboard" replace />;
  }

  const totalQuestions = assessment.questions.length;
  const currentQuestion = assessment.questions[questionIdx];
  const isAnswered = isQuestionAnswered(currentQuestion, answers[currentQuestion.id]);
  const isSubmitted = submittedQuestionIds.has(currentQuestion.id);
  const isLast = questionIdx === totalQuestions - 1;

  // Running tally for the header score chip while taking.
  const runningCorrect = assessment.questions.reduce((sum, q) => {
    if (!submittedQuestionIds.has(q.id)) return sum;
    const r = scoreSingleQuestion(q, answers[q.id]);
    return sum + (r ? 1 : 0);
  }, 0);
  const runningPercent = submittedQuestionIds.size
    ? Math.round((runningCorrect / submittedQuestionIds.size) * 100)
    : null;

  const setAnswer = (qid, value) => {
    setAnswers((prev) => ({ ...prev, [qid]: value }));
  };

  const submitAnswer = () => {
    setSubmittedQuestionIds((prev) => new Set([...prev, currentQuestion.id]));
  };

  const useHint = () => {
    if (!hintsUnlocked || hintsUsed[currentQuestion.id] || hintsRemaining <= 0) return;
    setHintsUsed((prev) => ({ ...prev, [currentQuestion.id]: true }));
    setHintsRemaining((n) => Math.max(0, n - 1));
  };

  const beginAssessment = () => {
    setPhase('taking');
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const finishAssessment = () => {
    const r = scoreAssessment({ assessment, answers, pathSlug: slug, moduleId });
    recordAssessmentAttempt(slug, moduleId, r, {
      badge: assessment.badge,
      masteryBadge: assessment.masteryBadge,
      nextModuleId: assessment.nextModuleId,
      moduleTitle: currentModule.title,
    });
    setResult(r);
    setPhase('results');
    if (r.passed) setBadgeOpen(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRetryConfirm = () => {
    setRetryOpen(false);
    setPhase('taking');
    setQuestionIdx(0);
    setAnswers({});
    setSubmittedQuestionIds(new Set());
    setHintsUsed({});
    setHintsRemaining(HINTS_PER_ATTEMPT);
    setResult(null);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const goPrev = () => setQuestionIdx((i) => Math.max(0, i - 1));
  const goNext = () => setQuestionIdx((i) => Math.min(totalQuestions - 1, i + 1));

  return (
    <div className="bg-gw-ice/30 min-h-screen">
      {phase !== 'intro' && (
        <QuizHeader
          pathTitle={path.title}
          moduleTitle={currentModule.title}
          questionIdx={Math.min(questionIdx, totalQuestions - 1)}
          totalQuestions={totalQuestions}
          scorePercent={phase === 'results' ? result?.scorePercent : runningPercent}
          exitTo="/academy/learn/dashboard"
        />
      )}

      <main className="container-x py-8 pb-24">
        <AnimatePresence mode="wait">
          {phase === 'intro' && (
            <motion.div
              key="intro"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
            >
              <IntroPhase
                path={path}
                module={currentModule}
                assessment={assessment}
                pastAttempts={pastAttempts}
                attemptNumber={attemptNumber}
                onBegin={beginAssessment}
              />
            </motion.div>
          )}

          {phase === 'taking' && currentQuestion && (
            <motion.div
              key={`taking-${currentQuestion.id}-${attemptNumber}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                <div className="lg:col-span-8">
                  <QuestionFrame
                    question={currentQuestion}
                    isSubmitted={isSubmitted}
                    isCorrect={
                      isSubmitted && scoreSingleQuestion(currentQuestion, answers[currentQuestion.id])
                    }
                    hintUsed={!!hintsUsed[currentQuestion.id]}
                    canUseHint={hintsUnlocked && hintsRemaining > 0}
                    onUseHint={useHint}
                  >
                    {(currentQuestion.type === 'single' || currentQuestion.type === 'code-output') && (
                      <SingleChoice
                        question={currentQuestion}
                        value={answers[currentQuestion.id]}
                        onChange={(v) => setAnswer(currentQuestion.id, v)}
                        isSubmitted={isSubmitted}
                      />
                    )}
                    {currentQuestion.type === 'multi' && (
                      <MultiChoice
                        question={currentQuestion}
                        value={answers[currentQuestion.id]}
                        onChange={(v) => setAnswer(currentQuestion.id, v)}
                        isSubmitted={isSubmitted}
                      />
                    )}
                  </QuestionFrame>
                </div>
                <div className="lg:col-span-4">
                  <AssessmentSidebar
                    attemptNumber={attemptNumber}
                    hintsAvailable={hintsRemaining}
                    hintsTotal={HINTS_PER_ATTEMPT}
                    rules={RULES}
                    attempts={pastAttempts}
                  />
                </div>
              </div>
            </motion.div>
          )}

          {phase === 'results' && result && (
            <motion.div
              key="results"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="space-y-6"
            >
              <ResultsHeader
                result={result}
                attemptNumber={attemptNumber}
                assessmentTitle={assessment.title}
              />

              {result.passed ? (
                <PassActions
                  pathSlug={slug}
                  result={result}
                  badge={assessment.badge}
                  masteryBadge={assessment.masteryBadge}
                  onShowBadge={() => setBadgeOpen(true)}
                />
              ) : (
                <RemediationPathCard
                  remediation={result.recommendedRemediation}
                  pathSlug={slug}
                  moduleId={moduleId}
                  lessonsLookup={currentModule.lessons || []}
                  onRetry={() => setRetryOpen(true)}
                />
              )}

              <SkillGapMatrix assessment={assessment} byQuestion={result.byQuestion} />
              <ScoreBreakdown assessment={assessment} byQuestion={result.byQuestion} />

              {result.passed && (
                <div className="flex flex-wrap gap-3">
                  <Link to="/academy/learn/dashboard" className="btn btn-primary inline-flex items-center gap-2">
                    Go to dashboard <ArrowRight size={14} />
                  </Link>
                  <button
                    type="button"
                    onClick={() => setRetryOpen(true)}
                    className="btn btn-ghost-teal"
                  >
                    Retry for a higher score
                  </button>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {phase === 'taking' && (
        <AssessmentToolbar
          hasPrev={questionIdx > 0}
          hasNext={questionIdx < totalQuestions - 1}
          isAnswered={isAnswered}
          isSubmitted={isSubmitted}
          isLast={isLast}
          onPrev={goPrev}
          onSubmitAnswer={submitAnswer}
          onNext={goNext}
          onFinishAssessment={finishAssessment}
        />
      )}

      <BadgeAwardModal
        open={badgeOpen}
        onClose={() => setBadgeOpen(false)}
        badge={assessment.badge}
        masteryBadge={assessment.masteryBadge}
        mastered={result?.mastered}
      />

      <RetryModal
        open={retryOpen}
        onClose={() => setRetryOpen(false)}
        onConfirm={handleRetryConfirm}
        attemptNumber={attemptNumber + (result ? 1 : 0)}
      />
    </div>
  );
}

function IntroPhase({ path, module: currentModule, assessment, pastAttempts, attemptNumber, onBegin }) {
  return (
    <div className="max-w-3xl mx-auto">
      <Link
        to={`/academy/learn/${path.slug}/modules/${currentModule.id}/${currentModule.lessons?.[0]?.id || ''}`}
        className="inline-flex items-center gap-1.5 text-sm text-gw-slate hover:text-gw-ink transition mb-3"
      >
        <ChevronLeft size={14} /> Back to module
      </Link>

      <span className="eyebrow">Module assessment</span>
      <h1 className="mt-2 font-display text-3xl md:text-4xl font-bold text-gw-ink leading-tight">
        {assessment.title}
      </h1>
      <p className="mt-3 text-sm md:text-base text-gw-slate leading-relaxed">
        {assessment.description}
      </p>

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
        <Stat icon={Clock} label="Estimated time" value={`${assessment.estMinutes} min`} />
        <Stat icon={ListChecks} label="Questions" value={assessment.questions.length} />
        <Stat icon={Award} label="Badge" value={assessment.badge?.label || '—'} />
      </div>

      <div className="mt-6 rounded-2xl bg-white border border-gw-navy/10 shadow-card p-5 md:p-6">
        <p className="text-[11px] uppercase tracking-wider font-semibold text-gw-slate">Rules</p>
        <ul className="mt-2 space-y-1.5">
          {RULES.map((r) => (
            <li key={r} className="text-sm text-gw-ink leading-relaxed flex items-start gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-gw-teal mt-2 shrink-0" />
              {r}
            </li>
          ))}
        </ul>
      </div>

      {pastAttempts.length > 0 && (
        <div className="mt-6 rounded-2xl bg-white border border-gw-navy/10 shadow-card p-5">
          <p className="text-[11px] uppercase tracking-wider font-semibold text-gw-slate mb-2">
            Past attempts
          </p>
          <ol className="divide-y divide-gw-navy/10">
            {pastAttempts.map((a) => (
              <li
                key={a.attemptNumber}
                className="py-2 text-sm flex items-baseline justify-between gap-2"
              >
                <span className="text-gw-ink">Attempt {a.attemptNumber}</span>
                <span className={`font-bold ${a.passed ? 'text-gw-teal' : 'text-gw-amber'}`}>
                  {a.scorePercent}% {a.passed ? '· passed' : '· retry available'}
                </span>
              </li>
            ))}
          </ol>
        </div>
      )}

      <div className="mt-8">
        <button type="button" onClick={onBegin} className="btn btn-primary inline-flex items-center gap-2">
          {attemptNumber === 1 ? 'Begin assessment' : `Begin attempt ${attemptNumber}`} <ArrowRight size={14} />
        </button>
        <p className="mt-2 text-[11px] text-gw-slate">
          You can exit and resume — your in-progress answers persist for this session.
        </p>
      </div>
    </div>
  );
}

function Stat({ icon: Icon, label, value }) {
  return (
    <div className="rounded-xl bg-white border border-gw-navy/10 px-4 py-3">
      <div className="inline-flex items-center gap-1 text-[10px] uppercase tracking-wider text-gw-slate font-semibold">
        <Icon size={11} /> {label}
      </div>
      <div className="mt-1 font-display text-lg font-bold text-gw-ink">{value}</div>
    </div>
  );
}

function PassActions({ pathSlug, result, badge, masteryBadge, onShowBadge }) {
  return (
    <div className="rounded-2xl bg-white border border-gw-navy/10 shadow-card p-5 md:p-6">
      <div className="flex items-start gap-4">
        <span className="h-12 w-12 rounded-xl bg-gw-teal/15 text-gw-teal flex items-center justify-center shrink-0">
          <Award size={20} />
        </span>
        <div className="flex-1 min-w-0">
          <h3 className="font-display text-lg font-bold text-gw-ink">
            Module complete · next module unlocked
          </h3>
          <p className="text-sm text-gw-slate leading-relaxed mt-1">
            You earned the <span className="font-semibold text-gw-ink">{badge?.label}</span> badge
            {result.mastered && masteryBadge && (
              <>
                {' '}plus the <span className="font-semibold text-gw-ink">{masteryBadge.label}</span> bonus badge
              </>
            )}
            . Your dashboard now points at the next module.
          </p>
          <div className="mt-3 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={onShowBadge}
              className="text-sm font-semibold text-gw-teal hover:underline inline-flex items-center gap-1"
            >
              View badge <ArrowRight size={12} />
            </button>
            <Link
              to={`/academy/paths/${pathSlug}`}
              className="text-sm font-semibold text-gw-slate hover:text-gw-ink inline-flex items-center gap-1"
            >
              See path overview <ArrowRight size={12} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

// Helpers ─────────────────────────────────────────────────────────────────

function isQuestionAnswered(question, given) {
  if (given === undefined || given === null) return false;
  if (question.type === 'multi') return Array.isArray(given) && given.length > 0;
  return given !== undefined && given !== null;
}

function scoreSingleQuestion(question, given) {
  if (given === undefined || given === null) return false;
  if (question.type === 'single' || question.type === 'code-output') {
    return given === question.correctIndex;
  }
  if (question.type === 'multi') {
    if (!Array.isArray(given)) return false;
    const a = [...given].sort();
    const b = [...question.correctIndices].sort();
    return a.length === b.length && a.every((v, i) => v === b[i]);
  }
  return false;
}
