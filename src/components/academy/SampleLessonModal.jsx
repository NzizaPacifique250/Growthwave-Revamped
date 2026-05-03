import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { X, PlayCircle, FileText, Code2, Clock } from 'lucide-react';

const typeIcon = {
  video: PlayCircle,
  reading: FileText,
  interactive: Code2,
  project: Code2,
};

export default function SampleLessonModal({ open, onClose, path }) {
  if (!path) return null;
  const lesson = path.sampleLesson;
  const Icon = typeIcon[lesson?.type] || PlayCircle;

  return (
    <Transition show={open} as={Fragment}>
      <Dialog as="div" className="relative z-[60]" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gw-midnight/70 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-200"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-150"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-2xl rounded-2xl bg-white shadow-cardHover overflow-hidden">
                <div className="flex items-center justify-between px-6 py-4 border-b border-gw-navy/10">
                  <div>
                    <Dialog.Title className="font-display text-lg font-bold text-gw-ink">
                      Sample Lesson · {path.title}
                    </Dialog.Title>
                    <p className="text-xs text-gw-slate mt-0.5">
                      A taste of what learning feels like inside this path.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={onClose}
                    className="text-gw-slate hover:text-gw-ink transition"
                    aria-label="Close"
                  >
                    <X size={20} />
                  </button>
                </div>

                <div className="p-6">
                  <div className="aspect-video rounded-xl bg-gw-midnightCard relative overflow-hidden flex items-center justify-center">
                    <div
                      className="absolute inset-0 opacity-30"
                      style={{
                        backgroundImage:
                          'linear-gradient(rgba(0,168,150,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(0,168,150,0.3) 1px, transparent 1px)',
                        backgroundSize: '32px 32px',
                      }}
                    />
                    <button
                      type="button"
                      className="relative h-16 w-16 rounded-full bg-gw-teal text-white flex items-center justify-center shadow-tealGlow hover:scale-105 transition"
                      aria-label="Play sample lesson"
                    >
                      <Icon size={28} />
                    </button>
                    <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-white/80">
                      <span className="font-semibold">{lesson.title}</span>
                      <span className="inline-flex items-center gap-1 bg-black/40 rounded-full px-2 py-1">
                        <Clock size={11} /> {lesson.duration}
                      </span>
                    </div>
                  </div>

                  <div className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
                    <InfoCard label="What you'll learn">
                      The core idea behind this lesson, with a working example you can edit.
                    </InfoCard>
                    <InfoCard label="Format">
                      {labelForType(lesson.type)} with mentor notes and an in-line check-in.
                    </InfoCard>
                    <InfoCard label="Time">
                      About {lesson.duration} including the practice exercise.
                    </InfoCard>
                  </div>

                  <p className="mt-5 text-xs italic text-gw-slate">
                    Prototype preview — full lessons unlock with a free trial or enrollment.
                  </p>
                </div>

                <div className="px-6 py-4 bg-gw-ice/50 border-t border-gw-navy/10 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={onClose}
                    className="text-sm font-semibold text-gw-slate hover:text-gw-ink transition"
                  >
                    Close
                  </button>
                  <button type="button" className="btn btn-primary !py-2 !px-4 text-xs">
                    Start Free Trial
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}

function InfoCard({ label, children }) {
  return (
    <div className="rounded-lg bg-gw-ice/60 px-3 py-3">
      <div className="text-[10px] uppercase tracking-wider font-semibold text-gw-slate">{label}</div>
      <div className="mt-1 text-xs text-gw-ink leading-relaxed">{children}</div>
    </div>
  );
}

function labelForType(type) {
  return (
    {
      video: 'Video',
      reading: 'Reading',
      interactive: 'Interactive coding',
      project: 'Project walkthrough',
    }[type] || 'Lesson'
  );
}
