import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext.jsx';
import RouteGuard from './components/RouteGuard.jsx';
import LandingPage from './pages/LandingPage.jsx';
import PathDiscoveryPage from './pages/PathDiscoveryPage.jsx';
import PathDetailPage from './pages/PathDetailPage.jsx';
import SkillAssessmentPage from './pages/SkillAssessmentPage.jsx';
import EnrollmentWizardPage from './pages/EnrollmentWizardPage.jsx';
import DashboardPage from './pages/DashboardPage.jsx';
import ModuleLessonPage from './pages/ModuleLessonPage.jsx';
import ModuleAssessmentPage from './pages/ModuleAssessmentPage.jsx';
import ProjectWorkspacePage from './pages/ProjectWorkspacePage.jsx';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="bg-gw-navy text-white antialiased">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/academy/paths" element={<PathDiscoveryPage />} />
            <Route path="/academy/paths/:slug" element={<PathDetailPage />} />
            <Route path="/academy/assessment" element={<SkillAssessmentPage />} />
            <Route path="/academy/enroll/:slug" element={<EnrollmentWizardPage />} />
            <Route
              path="/academy/learn/dashboard"
              element={
                <RouteGuard>
                  <DashboardPage />
                </RouteGuard>
              }
            />
            <Route
              path="/academy/learn/:slug/modules/:moduleId/assessment"
              element={
                <RouteGuard>
                  <ModuleAssessmentPage />
                </RouteGuard>
              }
            />
            <Route
              path="/academy/learn/:slug/projects/:projectId"
              element={
                <RouteGuard>
                  <ProjectWorkspacePage />
                </RouteGuard>
              }
            />
            <Route
              path="/academy/learn/:slug/modules/:moduleId/:lessonId"
              element={
                <RouteGuard>
                  <ModuleLessonPage />
                </RouteGuard>
              }
            />
            <Route path="*" element={<LandingPage />} />
          </Routes>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}
