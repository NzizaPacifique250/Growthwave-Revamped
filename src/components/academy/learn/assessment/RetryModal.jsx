import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { X, RefreshCw, Lightbulb } from 'lucide-react';

export default function RetryModal({ open, onClose, onConfirm, attemptNumber }) {
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
                <div className="flex items-start justify-between gap-3 px-6 py-5 border-b border-gw-navy/10">
                  <div className="flex items-start gap-3">
                    <div className="h-10 w-10 rounded-full bg-gw-teal/15 text-gw-teal flex items-center justify-center shrink-0">
                      <RefreshCw size={18} />
                    </div>
                    <div>
                      <Dialog.Title className="font-display text-lg font-bold text-gw-ink">
                        Start attempt {attemptNumber}?
                      </Dialog.Title>
                      <p className="text-xs text-gw-slate mt-1">
                        Your best score across attempts is what counts.
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

                <div className="px-6 py-5 text-sm text-gw-ink leading-relaxed space-y-3">
                  <div className="flex items-start gap-2">
                    <Lightbulb size={16} className="text-gw-amber mt-0.5 shrink-0" />
                    <p>
                      Hints are unlocked on this attempt — up to 3 per attempt. Use them on the
                      questions where you got stuck.
                    </p>
                  </div>
                  <p className="text-gw-slate">
                    Take a moment to review the recommended lessons first if you have not yet —
                    most students score 15+ points higher after a quick refresher.
                  </p>
                </div>

                <div className="px-6 py-4 bg-gw-ice/50 border-t border-gw-navy/10 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={onClose}
                    className="text-sm font-semibold text-gw-slate hover:text-gw-ink transition"
                  >
                    Not yet
                  </button>
                  <button type="button" onClick={onConfirm} className="btn btn-primary !py-2 !px-4 text-xs">
                    Begin attempt
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
