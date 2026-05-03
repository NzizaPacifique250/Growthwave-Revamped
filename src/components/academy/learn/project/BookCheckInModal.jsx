import { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { X, Calendar, CheckCircle2 } from 'lucide-react';

const SLOTS = [
  { id: 'tue-1800', label: 'Tue · 18:00 CAT', when: 'this week' },
  { id: 'thu-1800', label: 'Thu · 18:00 CAT', when: 'this week' },
  { id: 'tue-1800-next', label: 'Tue · 18:00 CAT', when: 'next week' },
];

export default function BookCheckInModal({ open, onClose, mentor }) {
  const [selected, setSelected] = useState(SLOTS[0].id);
  const [submitted, setSubmitted] = useState(false);

  const handleClose = () => {
    onClose();
    setTimeout(() => {
      setSubmitted(false);
      setSelected(SLOTS[0].id);
    }, 200);
  };

  return (
    <Transition show={open} as={Fragment}>
      <Dialog as="div" className="relative z-[60]" onClose={handleClose}>
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
                <div className="flex items-center justify-between gap-3 px-6 py-4 border-b border-gw-navy/10">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-gw-teal/15 text-gw-teal flex items-center justify-center">
                      <Calendar size={18} />
                    </div>
                    <Dialog.Title className="font-display text-lg font-bold text-gw-ink">
                      Book a check-in
                    </Dialog.Title>
                  </div>
                  <button
                    type="button"
                    onClick={handleClose}
                    className="text-gw-slate hover:text-gw-ink transition"
                    aria-label="Close"
                  >
                    <X size={20} />
                  </button>
                </div>

                {!submitted ? (
                  <div className="p-6">
                    <p className="text-sm text-gw-slate leading-relaxed">
                      Pick a slot with{' '}
                      <span className="font-semibold text-gw-ink">{mentor?.name || 'your mentor'}</span>. They'll send a calendar invite via WhatsApp.
                    </p>
                    <div role="radiogroup" className="mt-4 grid grid-cols-1 gap-2">
                      {SLOTS.map((s) => {
                        const active = selected === s.id;
                        return (
                          <button
                            type="button"
                            role="radio"
                            aria-checked={active}
                            key={s.id}
                            onClick={() => setSelected(s.id)}
                            className={`text-left rounded-lg border-2 px-3 py-2.5 transition ${
                              active
                                ? 'border-gw-teal bg-gw-teal/5'
                                : 'border-gw-navy/15 hover:border-gw-teal/50'
                            }`}
                          >
                            <span className="text-sm font-semibold text-gw-ink">{s.label}</span>
                            <p className="text-[11px] text-gw-slate">{s.when}</p>
                          </button>
                        );
                      })}
                    </div>
                    <button
                      type="button"
                      onClick={() => setSubmitted(true)}
                      className="btn btn-primary w-full mt-5"
                    >
                      Confirm booking
                    </button>
                  </div>
                ) : (
                  <div className="p-8 text-center">
                    <div className="h-14 w-14 mx-auto rounded-full bg-gw-teal/15 text-gw-teal flex items-center justify-center">
                      <CheckCircle2 size={28} />
                    </div>
                    <h3 className="mt-4 font-display text-lg font-bold text-gw-ink">
                      Check-in booked
                    </h3>
                    <p className="mt-2 text-sm text-gw-slate leading-relaxed">
                      You'll get a WhatsApp confirmation shortly with the meeting link.
                    </p>
                    <button type="button" onClick={handleClose} className="btn btn-ghost-teal mt-5">
                      Back to project
                    </button>
                  </div>
                )}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
