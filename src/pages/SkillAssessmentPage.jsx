import { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';
import AssessmentStepper from '../components/academy/assessment/AssessmentStepper.jsx';
import AssessmentSidebar from '../components/academy/assessment/AssessmentSidebar.jsx';
import QuestionCard from '../components/academy/assessment/QuestionCard.jsx';
import SkipModal from '../components/academy/assessment/SkipModal.jsx';
import AssessmentResultsCard from '../components/academy/assessment/AssessmentResultsCard.jsx';
import { assessmentSteps } from '../data/assessmentQuestions.js';
import { scoreAnswers, shouldShowStep } from '../utils/assessmentScorer.js';
import { useAuth } from '../context/AuthContext.jsx';

export default function SkillAssessmentPage() {
  const navigate = useNavigate();
  const { saveAssessmentResult, assessmentResult, clearAssessmentResult } = useAuth();
  const [answers, setAnswers] = useState({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [skipOpen, setSkipOpen] = useState(false);
  const [submittedResult, setSubmittedResult] = useState(assessmentResult);

  // Adaptive: filter steps based on the user's answers so far.
  const visibleSteps = useMemo(
    () => assessmentSteps.filter((s) => shouldShowStep(s, answers)),
    [answers]
  );

  // The active step might shift if a step gets filtered out — clamp to bounds.
  const safeIndex = Math.min(currentIndex, visibleSteps.length - 1);
  const currentStep = visibleSteps[safeIndex];

  const completedIds = useMemo(
    () => visibleSteps.slice(0, safeIndex).map((s) => s.id),
    [visibleSteps, safeIndex]
  );

  const remainingMinutes = useMemo(
    () => visibleSteps.slice(safeIndex).reduce((sum, s) => sum + (s.estMinutes || 1), 0),
    [visibleSteps, safeIndex]
  );

  const updateAnswer = (id, value) => {
    setAnswers((prev) => ({ ...prev, [id]: value }));
  };

  const isAnswered = (step) => {
    const v = answers[step.id];
    if (step.type === 'multi') return Array.isArray(v) && v.length > 0;
    if (step.type === 'slider') return v !== undefined;
    return v !== undefined && v !== null;
  };

  const canGoNext = currentStep && (currentStep.type === 'slider' || isAnswered(currentStep));
  const onLast = safeIndex === visibleSteps.length - 1;

  const handleNext = () => {
    if (onLast) {
      const finalAnswers = answers;
      const result = scoreAnswers(finalAnswers);
      saveAssessmentResult(result);
      setSubmittedResult(result);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setCurrentIndex(safeIndex + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleBack = () => {
    if (safeIndex === 0) return;
    setCurrentIndex(safeIndex - 1);
  };

  const handleRetake = () => {
    clearAssessmentResult();
    setSubmittedResult(null);
    setAnswers({});
    setCurrentIndex(0);
  };

  const handleConfirmSkip = () => {
    setSkipOpen(false);
    navigate('/academy/paths');
  };

  return (
    <>
      <Navbar />
      <main className="bg-white text-gw-ink min-h-screen pt-28 pb-20">
        <div className="container-x">
          <div className="flex items-baseline justify-between gap-4 flex-wrap mb-8">
            <div>
              <Link
                to="/academy/paths"
                className="inline-flex items-center gap-1.5 text-sm text-gw-slate hover:text-gw-ink transition mb-3"
              >
                <ChevronLeft size={14} /> All learning paths
              </Link>
              <span className="eyebrow">Skill Assessment</span>
              <h1 className="mt-2 font-display text-3xl md:text-4xl font-bold text-gw-ink">
                {submittedResult ? 'Your personalized recommendation' : 'Find your right path in 5 questions'}
              </h1>
              {!submittedResult && (
                <p className="mt-2 text-sm text-gw-slate max-w-xl">
                  Answer honestly — there are no wrong answers. We use your answers only to recommend a starting point.
                </p>
              )}
            </div>
            {!submittedResult && (
              <button
                type="button"
                onClick={() => setSkipOpen(true)}
                className="text-xs font-semibold text-gw-slate hover:text-gw-ink underline-offset-4 hover:underline"
              >
                Skip for now
              </button>
            )}
          </div>

          {submittedResult ? (
            <AssessmentResultsCard result={submittedResult} onRetake={handleRetake} />
          ) : (
            <>
              <div className="mb-8">
                <AssessmentStepper
                  steps={visibleSteps}
                  currentIndex={safeIndex}
                  completedIds={completedIds}
                  onJumpTo={setCurrentIndex}
                />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                <div className="lg:col-span-8">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentStep.id}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -12 }}
                      transition={{ duration: 0.2 }}
                    >
                      <QuestionCard
                        step={currentStep}
                        value={answers[currentStep.id]}
                        onChange={(v) => updateAnswer(currentStep.id, v)}
                      />
                    </motion.div>
                  </AnimatePresence>

                  <div className="mt-6 flex items-center justify-between gap-3">
                    <button
                      type="button"
                      onClick={handleBack}
                      disabled={safeIndex === 0}
                      className={`btn btn-ghost-teal !py-2 !px-4 text-xs inline-flex items-center gap-1.5 ${
                        safeIndex === 0 ? 'opacity-50 cursor-not-allowed' : ''
                      }`}
                    >
                      <ChevronLeft size={14} /> Back
                    </button>
                    <div className="text-xs text-gw-slate font-semibold">
                      Step {safeIndex + 1} of {visibleSteps.length}
                    </div>
                    <button
                      type="button"
                      onClick={handleNext}
                      disabled={!canGoNext}
                      className={`btn btn-primary !py-2 !px-4 text-xs inline-flex items-center gap-1.5 ${
                        !canGoNext ? 'opacity-50 cursor-not-allowed' : ''
                      }`}
                    >
                      {onLast ? 'See my recommendation' : 'Next'} <ChevronRight size={14} />
                    </button>
                  </div>
                </div>

                <div className="lg:col-span-4">
                  <AssessmentSidebar
                    remainingMinutes={remainingMinutes}
                    currentStep={currentStep}
                  />
                </div>
              </div>
            </>
          )}
        </div>
      </main>
      <Footer />

      <SkipModal
        open={skipOpen}
        onClose={() => setSkipOpen(false)}
        onConfirm={handleConfirmSkip}
      />
    </>
  );
}
