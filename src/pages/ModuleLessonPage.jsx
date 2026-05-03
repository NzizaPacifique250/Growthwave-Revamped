import { useEffect, useMemo, useState } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import LessonHeader from '../components/academy/learn/LessonHeader.jsx';
import LessonNav from '../components/academy/learn/LessonNav.jsx';
import LessonToolbar from '../components/academy/learn/LessonToolbar.jsx';
import VideoBlock from '../components/academy/learn/VideoBlock.jsx';
import ReadingBlock from '../components/academy/learn/ReadingBlock.jsx';
import InteractiveCodeBlock from '../components/academy/learn/InteractiveCodeBlock.jsx';
import QuizBlock from '../components/academy/learn/QuizBlock.jsx';
import NotesPanel from '../components/academy/learn/NotesPanel.jsx';
import AskMentorModal from '../components/academy/learn/AskMentorModal.jsx';
import { getPathBySlug } from '../data/learningPaths.js';
import { getLessonContent } from '../data/lessonContent.js';
import { useAuth } from '../context/AuthContext.jsx';
import { useLessonState } from '../hooks/useLessonState.js';

export default function ModuleLessonPage() {
  const { slug, moduleId, lessonId } = useParams();
  const navigate = useNavigate();
  const {
    getEnrollment,
    markLessonComplete,
    saveLessonNote,
    toggleBookmark,
    getLessonNote,
  } = useAuth();

  const path = getPathBySlug(slug);
  const enrollment = path ? getEnrollment(path.slug) : null;
  const currentModule = enrollment?.modules.find((m) => m.id === moduleId);
  const lessonIdx = currentModule?.lessons?.findIndex((l) => l.id === lessonId);
  const lesson = lessonIdx >= 0 ? currentModule.lessons[lessonIdx] : null;
  const contentBlocks = useMemo(() => getLessonContent(moduleId, lessonId), [moduleId, lessonId]);

  const lessonState = useLessonState(`${moduleId}:${lessonId}`, contentBlocks);
  const [notesOpen, setNotesOpen] = useState(false);
  const [askMentorOpen, setAskMentorOpen] = useState(false);
  const noteState = getLessonNote(lessonId);

  // Resolve a sibling lesson by offset; honors locked status.
  const siblingLesson = (offset) => {
    if (!currentModule?.lessons) return null;
    const idx = lessonIdx + offset;
    if (idx < 0 || idx >= currentModule.lessons.length) return null;
    const next = currentModule.lessons[idx];
    if (next.status === 'locked' && next.id !== lessonId) return null;
    return next;
  };

  const prevLesson = siblingLesson(-1);
  const nextLesson = siblingLesson(1);
  const isLastLesson = currentModule?.lessons && lessonIdx === currentModule.lessons.length - 1;

  // Scroll to top on lesson change.
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [lessonId]);

  // Bad params → bounce to dashboard.
  if (!path || !enrollment || !currentModule || !lesson) {
    return <Navigate to="/academy/learn/dashboard" replace />;
  }

  const handleMarkComplete = () => {
    markLessonComplete(slug, moduleId, lessonId);
    if (nextLesson) {
      navigate(`/academy/learn/${slug}/modules/${moduleId}/${nextLesson.id}`);
    }
  };

  const handlePrev = () => {
    if (!prevLesson) return;
    navigate(`/academy/learn/${slug}/modules/${moduleId}/${prevLesson.id}`);
  };

  const handleNext = () => {
    if (!nextLesson) return;
    navigate(`/academy/learn/${slug}/modules/${moduleId}/${nextLesson.id}`);
  };

  const activeBlock = contentBlocks[lessonState.activeBlockIdx];
  const activeBlockState = lessonState.blocks[lessonState.activeBlockIdx];

  return (
    <div className="bg-gw-ice/30 min-h-screen">
      <LessonHeader
        path={path}
        module={currentModule}
        lesson={lesson}
        lessonIdx={lessonIdx}
        totalLessons={currentModule.lessons.length}
        lessonProgress={lessonState.lessonProgress}
        bookmarked={noteState.bookmarked}
        onToggleBookmark={() => toggleBookmark(lessonId)}
      />

      <main className="container-x py-6 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <aside className="lg:col-span-3">
            <div className="lg:sticky lg:top-24">
              <LessonNav path={path} module={currentModule} currentLessonId={lessonId} />
            </div>
          </aside>

          <div className="lg:col-span-9 space-y-6">
            {contentBlocks.length === 0 ? (
              <div className="rounded-2xl bg-white border border-gw-navy/10 shadow-card p-8 text-center text-sm text-gw-slate">
                No content has been authored for this lesson yet.
              </div>
            ) : (
              <>
                <BlockTabs
                  blocks={contentBlocks}
                  blockStates={lessonState.blocks}
                  active={lessonState.activeBlockIdx}
                  onSelect={lessonState.setActiveBlockIdx}
                />

                <AnimatePresence mode="wait">
                  <motion.div
                    key={`${lessonId}-${activeBlock?.id}`}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.2 }}
                  >
                    <BlockRenderer
                      block={activeBlock}
                      blockState={activeBlockState}
                      updateBlockState={lessonState.updateBlockState}
                      onInteract={() => lessonState.markBlockInteracted(activeBlock.id)}
                    />
                  </motion.div>
                </AnimatePresence>

                <div className="flex items-center justify-between gap-3 px-1 text-xs text-gw-slate">
                  <button
                    type="button"
                    onClick={lessonState.retreat}
                    disabled={lessonState.activeBlockIdx === 0}
                    className={`inline-flex items-center gap-1 rounded-md px-2.5 py-1.5 transition font-semibold ${
                      lessonState.activeBlockIdx === 0
                        ? 'opacity-40 cursor-not-allowed'
                        : 'hover:text-gw-ink hover:bg-white'
                    }`}
                  >
                    ← Previous block
                  </button>
                  <span className="font-semibold">
                    Block {lessonState.activeBlockIdx + 1} of {contentBlocks.length}
                  </span>
                  <button
                    type="button"
                    onClick={lessonState.advance}
                    disabled={lessonState.activeBlockIdx === contentBlocks.length - 1}
                    className={`inline-flex items-center gap-1 rounded-md px-2.5 py-1.5 transition font-semibold ${
                      lessonState.activeBlockIdx === contentBlocks.length - 1
                        ? 'opacity-40 cursor-not-allowed'
                        : 'hover:text-gw-ink hover:bg-white'
                    }`}
                  >
                    Next block →
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </main>

      <LessonToolbar
        bookmarked={noteState.bookmarked}
        onToggleBookmark={() => toggleBookmark(lessonId)}
        onOpenNotes={() => setNotesOpen(true)}
        onAskMentor={() => setAskMentorOpen(true)}
        onPrev={handlePrev}
        onNext={handleNext}
        onMarkComplete={handleMarkComplete}
        hasPrev={!!prevLesson}
        hasNext={!!nextLesson}
        canMarkComplete={lessonState.canMarkComplete}
        isCompleted={lesson.status === 'completed'}
        isLastLesson={isLastLesson}
        assessmentHref={`/academy/learn/${slug}/modules/${moduleId}/assessment`}
      />

      <NotesPanel
        open={notesOpen}
        onClose={() => setNotesOpen(false)}
        lessonTitle={lesson.title}
        notes={noteState.notes}
        bookmarked={noteState.bookmarked}
        onChangeNotes={(text) => saveLessonNote(lessonId, text)}
        onToggleBookmark={() => toggleBookmark(lessonId)}
      />

      <AskMentorModal
        open={askMentorOpen}
        onClose={() => setAskMentorOpen(false)}
        lessonTitle={lesson.title}
      />
    </div>
  );
}

function BlockTabs({ blocks, blockStates, active, onSelect }) {
  return (
    <div role="tablist" className="flex items-center gap-1.5 overflow-x-auto">
      {blocks.map((b, idx) => {
        const state = blockStates[idx];
        const isActive = idx === active;
        return (
          <button
            type="button"
            key={b.id}
            role="tab"
            aria-selected={isActive}
            onClick={() => onSelect(idx)}
            className={`inline-flex items-center gap-1.5 rounded-full pl-2 pr-3 py-1 text-xs font-semibold whitespace-nowrap transition ${
              isActive
                ? 'bg-gw-teal text-white'
                : state?.interacted
                  ? 'bg-gw-teal/10 text-gw-teal'
                  : 'bg-white border border-gw-navy/10 text-gw-slate hover:border-gw-teal hover:text-gw-teal'
            }`}
          >
            <span
              className={`h-5 w-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                isActive
                  ? 'bg-white/20'
                  : state?.interacted
                    ? 'bg-gw-teal text-white'
                    : 'bg-gw-ice text-gw-slate'
              }`}
            >
              {idx + 1}
            </span>
            <span className="capitalize">{b.type}</span>
          </button>
        );
      })}
    </div>
  );
}

function BlockRenderer({ block, blockState, updateBlockState, onInteract }) {
  if (!block || !blockState) return null;
  const props = { block, blockState, updateBlockState, onInteract };
  if (block.type === 'video') return <VideoBlock {...props} />;
  if (block.type === 'reading') return <ReadingBlock {...props} />;
  if (block.type === 'interactive') return <InteractiveCodeBlock {...props} />;
  if (block.type === 'quiz') return <QuizBlock {...props} />;
  return null;
}
