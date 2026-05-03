import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { X, Pencil, Bookmark } from 'lucide-react';

export default function NotesPanel({
  open,
  onClose,
  lessonTitle,
  notes,
  bookmarked,
  onChangeNotes,
  onToggleBookmark,
}) {
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

        <div className="fixed inset-y-0 right-0 flex w-full max-w-sm">
          <Transition.Child
            as={Fragment}
            enter="transform transition ease-out duration-200"
            enterFrom="translate-x-full"
            enterTo="translate-x-0"
            leave="transform transition ease-in duration-150"
            leaveFrom="translate-x-0"
            leaveTo="translate-x-full"
          >
            <Dialog.Panel className="relative w-full bg-white shadow-cardHover flex flex-col">
              <div className="px-5 py-4 border-b border-gw-navy/10 flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="h-9 w-9 rounded-lg bg-gw-teal/15 text-gw-teal flex items-center justify-center">
                    <Pencil size={16} />
                  </span>
                  <div>
                    <Dialog.Title className="font-display font-bold text-gw-ink leading-tight">
                      Lesson notes
                    </Dialog.Title>
                    <p className="text-[11px] text-gw-slate truncate max-w-[200px]">
                      {lessonTitle}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  className="text-gw-slate hover:text-gw-ink transition"
                  aria-label="Close"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="flex-1 p-5 overflow-y-auto">
                <p className="text-[11px] uppercase tracking-wider font-semibold text-gw-slate">
                  Notes
                </p>
                <textarea
                  value={notes}
                  onChange={(e) => onChangeNotes(e.target.value)}
                  rows={10}
                  placeholder="Write down what stuck. Even one sentence helps."
                  className="mt-2 w-full rounded-lg border border-gw-navy/15 bg-white px-3 py-2 text-sm text-gw-ink placeholder:text-gw-slate focus:outline-none focus:border-gw-teal focus:ring-2 focus:ring-gw-teal/20 transition resize-none"
                />
                <p className="mt-1 text-[11px] text-gw-slate">
                  Saved automatically — tied to this lesson.
                </p>

                <div className="mt-5 pt-5 border-t border-gw-navy/10">
                  <button
                    type="button"
                    onClick={onToggleBookmark}
                    className={`w-full inline-flex items-center justify-center gap-2 rounded-lg border-2 px-3 py-2 text-sm font-semibold transition ${
                      bookmarked
                        ? 'border-gw-amber text-gw-amber bg-gw-amber/10'
                        : 'border-gw-navy/15 text-gw-ink hover:border-gw-teal hover:text-gw-teal'
                    }`}
                  >
                    <Bookmark size={14} className={bookmarked ? 'fill-gw-amber' : ''} />
                    {bookmarked ? 'Bookmarked — find from your dashboard' : 'Bookmark this lesson'}
                  </button>
                </div>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}
