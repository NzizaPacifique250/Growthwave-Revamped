import { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Link } from 'react-router-dom';
import { X, CheckCircle2, Mail } from 'lucide-react';

export default function TryFreeModal({ open, onClose, path }) {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
  };

  const handleClose = () => {
    onClose();
    // Reset after the close animation completes.
    setTimeout(() => {
      setSubmitted(false);
      setEmail('');
    }, 200);
  };

  if (!path) return null;

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
                <div className="flex items-center justify-between px-6 py-4 border-b border-gw-navy/10">
                  <Dialog.Title className="font-display text-lg font-bold text-gw-ink">
                    Try {path.title} Free
                  </Dialog.Title>
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
                      Get full access to two complete modules, the first project, and our
                      AI mentor — for one week, no card required.
                    </p>

                    <ul className="mt-4 space-y-2">
                      {[
                        '2 full modules unlocked',
                        'AI mentor on WhatsApp',
                        'Sample peer review',
                        'Cancel anytime',
                      ].map((item) => (
                        <li
                          key={item}
                          className="flex items-center gap-2 text-sm text-gw-ink"
                        >
                          <CheckCircle2 size={16} className="text-gw-teal" /> {item}
                        </li>
                      ))}
                    </ul>

                    <label className="block mt-5">
                      <span className="text-xs uppercase tracking-wider font-semibold text-gw-slate">
                        Your email
                      </span>
                      <div className="relative mt-1">
                        <Mail
                          size={15}
                          className="absolute left-3 top-1/2 -translate-y-1/2 text-gw-slate pointer-events-none"
                        />
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="you@school.rw"
                          className="w-full rounded-lg border border-gw-navy/15 bg-white pl-9 pr-3 py-2 text-sm text-gw-ink placeholder:text-gw-slate focus:outline-none focus:border-gw-teal focus:ring-2 focus:ring-gw-teal/20 transition"
                        />
                      </div>
                    </label>

                    <p className="mt-3 text-[11px] text-gw-slate">
                      By starting a trial you agree to our terms. We'll never share your email.
                    </p>

                    <button type="submit" className="btn btn-primary w-full mt-5">
                      Start Free Week
                    </button>

                    <div className="mt-4 text-center">
                      <Link
                        to={`/academy/enroll/${path.slug}`}
                        onClick={handleClose}
                        className="text-xs font-semibold text-gw-slate hover:text-gw-ink underline-offset-4 hover:underline"
                      >
                        Skip the trial — enroll directly →
                      </Link>
                    </div>
                  </form>
                ) : (
                  <div className="p-8 text-center">
                    <div className="h-14 w-14 mx-auto rounded-full bg-gw-teal/15 text-gw-teal flex items-center justify-center">
                      <CheckCircle2 size={28} />
                    </div>
                    <h3 className="mt-4 font-display text-lg font-bold text-gw-ink">
                      Check your inbox
                    </h3>
                    <p className="mt-2 text-sm text-gw-slate leading-relaxed">
                      We just sent your trial access link to{' '}
                      <span className="font-semibold text-gw-ink">{email}</span>. See you inside.
                    </p>
                    <button
                      type="button"
                      onClick={handleClose}
                      className="btn btn-ghost-teal mt-5"
                    >
                      Done
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
