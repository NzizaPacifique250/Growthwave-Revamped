import { useEffect, useState } from 'react';
import { useNavigate, useParams, Navigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Lock } from 'lucide-react';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';
import WizardStepper from '../components/academy/enrollment/WizardStepper.jsx';
import AccountStep from '../components/academy/enrollment/AccountStep.jsx';
import ConfirmPathStep from '../components/academy/enrollment/ConfirmPathStep.jsx';
import PlanPaymentStep from '../components/academy/enrollment/PlanPaymentStep.jsx';
import WelcomeStep from '../components/academy/enrollment/WelcomeStep.jsx';
import SummaryRail from '../components/academy/enrollment/SummaryRail.jsx';
import ScholarshipModal from '../components/academy/enrollment/ScholarshipModal.jsx';
import { useEnrollmentWizard } from '../hooks/useEnrollmentWizard.js';
import { useAuth } from '../context/AuthContext.jsx';
import { getPathBySlug } from '../data/learningPaths.js';

export default function EnrollmentWizardPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const path = getPathBySlug(slug);
  const { user, signIn, isAuthenticated, enrollInPath, assessmentResult } = useAuth();
  const [scholarshipOpen, setScholarshipOpen] = useState(false);

  // Prefill weekly hours from the assessment, if available.
  const prefilledHours =
    assessmentResult?.recommended.path.slug === slug
      ? assessmentResult.answers?.time
      : null;

  // Prefill name/email if the user is already signed in (covers the "enrolled
  // user adds another path" case).
  const initialFormData = isAuthenticated
    ? {
        fullName: user?.fullName || '',
        email: user?.email || '',
        password: 'already-signed-in',
      }
    : {};

  const wizard = useEnrollmentWizard({ initialFormData, prefilledHours });

  // Submit on entry to welcome step. We trigger it once when stepIndex becomes
  // the welcome index so AuthContext picks up the enrollment.
  useEffect(() => {
    if (!path) return;
    if (wizard.currentStep.id === 'welcome') {
      if (!isAuthenticated) signIn();
      enrollInPath(slug, { kind: 'full', planId: wizard.formData.planId });
    }
  }, [wizard.currentStep.id, slug, path, isAuthenticated, signIn, enrollInPath, wizard.formData.planId]);

  if (!path) return <Navigate to="/academy/paths" replace />;

  const handleNext = () => {
    wizard.goNext();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBack = () => {
    if (wizard.stepIndex === 0) {
      navigate(`/academy/paths/${slug}`);
      return;
    }
    wizard.goBack();
  };

  return (
    <>
      <Navbar />
      <main className="bg-white text-gw-ink min-h-screen pt-28 pb-32">
        <div className="container-x">
          <div className="flex items-baseline justify-between gap-4 flex-wrap mb-6">
            <div>
              <Link
                to={`/academy/paths/${slug}`}
                className="inline-flex items-center gap-1.5 text-sm text-gw-slate hover:text-gw-ink transition mb-2"
              >
                <ChevronLeft size={14} /> Back to {path.title}
              </Link>
              <span className="eyebrow">Enrollment</span>
              <h1 className="mt-1 font-display text-2xl md:text-3xl font-bold text-gw-ink">
                {wizard.currentStep.id === 'welcome'
                  ? 'You did it.'
                  : `Enroll in ${path.title}`}
              </h1>
            </div>
            <span className="inline-flex items-center gap-1.5 text-[11px] text-gw-slate font-semibold">
              <Lock size={11} /> Secure checkout
            </span>
          </div>

          {wizard.currentStep.id !== 'welcome' && (
            <div className="mb-8">
              <WizardStepper
                steps={wizard.steps.slice(0, 3)}
                currentIndex={wizard.stepIndex}
                onJumpTo={wizard.jumpTo}
              />
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className={wizard.currentStep.id === 'welcome' ? 'lg:col-span-12' : 'lg:col-span-8'}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={wizard.currentStep.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.2 }}
                  className="rounded-2xl bg-white border border-gw-navy/10 shadow-card p-6 md:p-8"
                >
                  {wizard.currentStep.id === 'account' && (
                    <AccountStep
                      formData={wizard.formData}
                      updateField={wizard.updateField}
                      setSocialProvider={wizard.setSocialProvider}
                    />
                  )}
                  {wizard.currentStep.id === 'confirm' && (
                    <ConfirmPathStep
                      path={path}
                      formData={wizard.formData}
                      updateField={wizard.updateField}
                    />
                  )}
                  {wizard.currentStep.id === 'payment' && (
                    <PlanPaymentStep
                      formData={wizard.formData}
                      updateField={wizard.updateField}
                      paymentError={wizard.paymentError}
                      onOpenScholarship={() => setScholarshipOpen(true)}
                    />
                  )}
                  {wizard.currentStep.id === 'welcome' && (
                    <WelcomeStep user={user} path={path} />
                  )}
                </motion.div>
              </AnimatePresence>

              {wizard.currentStep.id !== 'welcome' && (
                <div className="mt-6 flex items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={handleBack}
                    className="btn btn-ghost-teal !py-2 !px-4 text-xs inline-flex items-center gap-1.5"
                  >
                    <ChevronLeft size={14} /> Back
                  </button>

                  <div className="text-xs text-gw-slate font-semibold">
                    Step {wizard.stepIndex + 1} of 3
                  </div>

                  <button
                    type="button"
                    onClick={handleNext}
                    disabled={!wizard.canGoNext}
                    className={`btn btn-primary !py-2 !px-4 text-xs inline-flex items-center gap-1.5 ${
                      !wizard.canGoNext ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                  >
                    {wizard.currentStep.id === 'payment'
                      ? 'Confirm & enroll'
                      : 'Continue'}
                    <ChevronRight size={14} />
                  </button>
                </div>
              )}
            </div>

            {wizard.currentStep.id !== 'welcome' && (
              <div className="lg:col-span-4">
                <SummaryRail path={path} formData={wizard.formData} />
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />

      <ScholarshipModal open={scholarshipOpen} onClose={() => setScholarshipOpen(false)} />
    </>
  );
}
