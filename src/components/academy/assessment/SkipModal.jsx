import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { X, AlertTriangle } from 'lucide-react';

export default function SkipModal({ open, onClose, onConfirm }) {
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
              <Dialog.Panel className="w-full max-w-md rounded-2xl bg-white shadow-cardHover overflow-hidden">
                <div className="flex items-start justify-between gap-4 px-6 py-5 border-b border-gw-navy/10">
                  <div className="flex items-start gap-3">
                    <div className="h-10 w-10 rounded-full bg-gw-amber/15 text-gw-amber flex items-center justify-center shrink-0">
                      <AlertTriangle size={18} />
                    </div>
                    <div>
                      <Dialog.Title className="font-display text-lg font-bold text-gw-ink">
                        Skip the assessment?
                      </Dialog.Title>
                      <p className="text-xs text-gw-slate mt-1">
                        It only takes ~3 minutes and gives you a personalized recommendation.
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={onClose}
                    className="text-gw-slate hover:text-gw-ink transition shrink-0"
                    aria-label="Close"
                  >
                    <X size={20} />
                  </button>
                </div>

                <div className="px-6 py-5 text-sm text-gw-ink leading-relaxed">
                  <p>If you skip, you will:</p>
                  <ul className="mt-3 space-y-1.5">
                    <li className="flex gap-2">
                      <span className="text-gw-teal">·</span> Browse all paths without a personalized match
                    </li>
                    <li className="flex gap-2">
                      <span className="text-gw-teal">·</span> Miss confidence scoring and reasoning
                    </li>
                    <li className="flex gap-2">
                      <span className="text-gw-teal">·</span> Lose alternative-path comparisons
                    </li>
                  </ul>
                  <p className="mt-4 text-gw-slate">
                    You can come back any time — answers are not saved.
                  </p>
                </div>

                <div className="px-6 py-4 bg-gw-ice/50 border-t border-gw-navy/10 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={onClose}
                    className="text-sm font-semibold text-gw-slate hover:text-gw-ink transition"
                  >
                    Keep going
                  </button>
                  <button type="button" onClick={onConfirm} className="btn btn-ghost-teal !py-2 !px-4 text-xs">
                    Skip for now
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
