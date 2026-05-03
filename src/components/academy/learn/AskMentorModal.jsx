import { Fragment, useEffect, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { X, MessageCircle, Smartphone, CheckCircle2 } from 'lucide-react';

export default function AskMentorModal({ open, onClose, lessonTitle }) {
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  // Pre-fill the message body whenever the modal opens for a new lesson.
  useEffect(() => {
    if (open && !submitted) {
      setMessage(`I'm stuck on "${lessonTitle}" — `);
    }
  }, [open, lessonTitle, submitted]);

  const handleClose = () => {
    onClose();
    setTimeout(() => {
      setSubmitted(false);
      setMessage('');
    }, 200);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    setSubmitted(true);
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
                      <MessageCircle size={18} />
                    </div>
                    <Dialog.Title className="font-display text-lg font-bold text-gw-ink">
                      Ask your mentor
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
                  <form onSubmit={handleSubmit} className="p-6">
                    <p className="text-sm text-gw-slate leading-relaxed">
                      Send a question to your mentor team. They typically reply on WhatsApp within an hour during the day.
                    </p>
                    <label className="block mt-5">
                      <span className="text-xs uppercase tracking-wider font-semibold text-gw-slate">
                        Your question
                      </span>
                      <textarea
                        required
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        rows={5}
                        className="mt-1 w-full rounded-lg border border-gw-navy/15 bg-white px-3 py-2 text-sm text-gw-ink placeholder:text-gw-slate focus:outline-none focus:border-gw-teal focus:ring-2 focus:ring-gw-teal/20 transition resize-none"
                      />
                    </label>
                    <button type="submit" className="btn btn-primary w-full mt-5">
                      Send question
                    </button>
                    <p className="mt-3 text-[11px] text-gw-slate text-center inline-flex items-center gap-1.5 w-full justify-center">
                      <Smartphone size={12} /> Replies arrive on WhatsApp via the AI Mentor.
                    </p>
                  </form>
                ) : (
                  <div className="p-8 text-center">
                    <div className="h-14 w-14 mx-auto rounded-full bg-gw-teal/15 text-gw-teal flex items-center justify-center">
                      <CheckCircle2 size={28} />
                    </div>
                    <h3 className="mt-4 font-display text-lg font-bold text-gw-ink">
                      Sent to your mentor
                    </h3>
                    <p className="mt-2 text-sm text-gw-slate leading-relaxed">
                      You'll get a reply on WhatsApp shortly. Keep working in the meantime — staying in flow helps.
                    </p>
                    <button type="button" onClick={handleClose} className="btn btn-ghost-teal mt-5">
                      Back to lesson
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
