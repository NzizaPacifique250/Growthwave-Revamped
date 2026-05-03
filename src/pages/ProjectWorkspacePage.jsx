import { useEffect, useMemo, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import ProjectToolbar from '../components/academy/learn/project/ProjectToolbar.jsx';
import ProjectFooter from '../components/academy/learn/project/ProjectFooter.jsx';
import ProjectBriefSidebar from '../components/academy/learn/project/ProjectBriefSidebar.jsx';
import FileNavigatorTabs from '../components/academy/learn/project/FileNavigatorTabs.jsx';
import MockEditorPane from '../components/academy/learn/project/MockEditorPane.jsx';
import MockPreviewPane from '../components/academy/learn/project/MockPreviewPane.jsx';
import CollaborationPanel from '../components/academy/learn/project/CollaborationPanel.jsx';
import BookCheckInModal from '../components/academy/learn/project/BookCheckInModal.jsx';
import AskMentorModal from '../components/academy/learn/AskMentorModal.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import { getProject } from '../data/projects.js';

export default function ProjectWorkspacePage() {
  const { slug, projectId } = useParams();
  const {
    getEnrollment,
    getProjectState,
    updateProjectFile,
    setProjectChecklistItem,
    setProjectReviewerNote,
    requestProjectReview,
    seedProjectReviews,
  } = useAuth();

  const project = getProject(projectId);
  const enrollment = project ? getEnrollment(project.pathSlug) : null;

  const [activeTemplateId, setActiveTemplateId] = useState(
    project?.templates?.[0]?.id || null
  );
  const [activeFileId, setActiveFileId] = useState(project?.files?.[0]?.id || null);
  const [askMentorOpen, setAskMentorOpen] = useState(false);
  const [bookCheckInOpen, setBookCheckInOpen] = useState(false);

  // Reset active file when the project changes.
  useEffect(() => {
    setActiveFileId(project?.files?.[0]?.id || null);
    setActiveTemplateId(project?.templates?.[0]?.id || null);
  }, [projectId, project]);

  // Bad params or not enrolled → bounce to dashboard.
  if (!project || !enrollment || enrollment.pathSlug !== slug) {
    return <Navigate to="/academy/learn/dashboard" replace />;
  }

  const projectState = getProjectState(projectId);
  const activeFile = project.files.find((f) => f.id === activeFileId) || project.files[0];
  const fileContent =
    projectState.fileDrafts[activeFile?.id] ?? activeFile?.starterContent ?? '';
  const dirtyMap = computeDirtyMap(project, projectState);

  const checklistDoneCount = project.requirements.filter(
    (r) => projectState.checklist[r.id] === 'done'
  ).length;
  const allRequirementsDone = checklistDoneCount === project.requirements.length;

  const canRequestReview = allRequirementsDone && projectState.submissionStatus === 'draft';

  // After requesting review, seed peer comments on a short delay so the UI
  // can show the "routing to reviewers" loading state first.
  useEffect(() => {
    if (projectState.submissionStatus !== 'review-requested') return;
    const t = setTimeout(() => {
      seedProjectReviews(projectId, project.seededReviews, project.mentorNote);
    }, 1800);
    return () => clearTimeout(t);
  }, [projectState.submissionStatus, projectId, project, seedProjectReviews]);

  const dueLabel = useMemo(() => formatDueLabel(project.dueAt), [project.dueAt]);

  const handleRequestReview = () => {
    if (!canRequestReview) return;
    requestProjectReview(projectId);
  };

  const handleTemplateChange = (templateId) => {
    setActiveTemplateId(templateId);
    // For the demo, swapping templates resets file drafts to the starter
    // for the active file. (A real product would swap the whole scaffold.)
    if (activeFile) {
      updateProjectFile(projectId, activeFile.id, activeFile.starterContent);
    }
  };

  return (
    <div className="bg-gw-ice/30 min-h-screen flex flex-col">
      <ProjectToolbar
        project={project}
        submissionStatus={projectState.submissionStatus}
        daysLabel={dueLabel.label}
        isOverdue={dueLabel.overdue}
        canRequestReview={canRequestReview}
        onRequestReview={handleRequestReview}
        onAskMentor={() => setAskMentorOpen(true)}
      />

      <main className="container-x py-6 flex-1">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Brief sidebar */}
          <div className="lg:col-span-3">
            <div className="lg:sticky lg:top-24">
              <ProjectBriefSidebar
                project={project}
                pathSlug={slug}
                checklist={projectState.checklist}
                onChecklistChange={(reqId, status) =>
                  setProjectChecklistItem(projectId, reqId, status)
                }
                activeTemplateId={activeTemplateId}
                onTemplateChange={handleTemplateChange}
              />
            </div>
          </div>

          {/* Workspace center */}
          <div className="lg:col-span-6 flex flex-col rounded-2xl bg-gw-midnightCard border border-gw-navy/10 shadow-card overflow-hidden">
            <FileNavigatorTabs
              files={project.files}
              activeFileId={activeFileId}
              onSelect={setActiveFileId}
              dirtyMap={dirtyMap}
            />
            <div className="grid grid-cols-1 lg:grid-cols-2 flex-1 min-h-[420px]">
              <MockEditorPane
                file={activeFile}
                content={fileContent}
                onChange={(c) => updateProjectFile(projectId, activeFile.id, c)}
              />
              <MockPreviewPane file={activeFile} content={fileContent} />
            </div>
          </div>

          {/* Collaboration panel */}
          <div className="lg:col-span-3">
            <div className="lg:sticky lg:top-24">
              <CollaborationPanel
                project={project}
                submissionStatus={projectState.submissionStatus}
                reviewerComments={projectState.reviewerComments}
                mentorNote={projectState.mentorNote}
                onAskMentor={() => setAskMentorOpen(true)}
                onBookCheckIn={() => setBookCheckInOpen(true)}
                onRequestReview={handleRequestReview}
                canRequestReview={canRequestReview}
                reviewerNote={projectState.reviewerNote}
                onChangeReviewerNote={(t) => setProjectReviewerNote(projectId, t)}
              />
            </div>
          </div>
        </div>
      </main>

      <ProjectFooter
        doneCount={checklistDoneCount}
        totalCount={project.requirements.length}
        milestoneLabel={milestoneLabel(checklistDoneCount, project.requirements.length)}
        daysLabel={dueLabel.label}
      />

      <AskMentorModal
        open={askMentorOpen}
        onClose={() => setAskMentorOpen(false)}
        lessonTitle={project.title}
      />
      <BookCheckInModal
        open={bookCheckInOpen}
        onClose={() => setBookCheckInOpen(false)}
        mentor={project.mentor}
      />
    </div>
  );
}

function computeDirtyMap(project, projectState) {
  const map = {};
  for (const f of project.files) {
    const draft = projectState.fileDrafts[f.id];
    map[f.id] = draft !== undefined && draft !== f.starterContent;
  }
  return map;
}

function formatDueLabel(iso) {
  if (!iso) return { label: 'No deadline', overdue: false };
  const target = new Date(iso + 'T23:59:59');
  const now = new Date();
  const ms = target - now;
  const days = Math.ceil(ms / (24 * 60 * 60 * 1000));
  if (days < 0) return { label: `${Math.abs(days)}d overdue`, overdue: true };
  if (days === 0) return { label: 'Due today', overdue: false };
  if (days === 1) return { label: 'Due tomorrow', overdue: false };
  if (days < 14) return { label: `Due in ${days}d`, overdue: false };
  return { label: `Due in ${Math.round(days / 7)}w`, overdue: false };
}

function milestoneLabel(done, total) {
  if (done === 0) return 'Milestone 1 — Get the requirements scoped';
  if (done === total) return 'Milestone — Ready for review';
  if (done < total / 2) return 'Milestone 2 — First requirements landing';
  return 'Milestone 3 — Polish and submit';
}
