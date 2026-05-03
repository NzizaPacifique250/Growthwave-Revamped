import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { motion } from 'framer-motion';
import { X, Award, Share2, Sparkles } from 'lucide-react';

export default function BadgeAwardModal({ open, onClose, badge, masteryBadge, mastered }) {
  if (!badge) return null;
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
          <div className="fixed inset-0 bg-gw-midnight/80 backdrop-blur-sm" />
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
                <div className="relative bg-gradient-to-br from-gw-midnight to-gw-navy px-6 pt-8 pb-10 text-white text-center overflow-hidden">
                  <button
                    type="button"
                    onClick={onClose}
                    className="absolute top-3 right-3 text-white/60 hover:text-white transition"
                    aria-label="Close"
                  >
                    <X size={18} />
                  </button>

                  <div
                    className="absolute inset-0 opacity-25 pointer-events-none"
                    style={{
                      background:
                        'radial-gradient(circle at 50% 30%, #00A896 0%, transparent 60%)',
                    }}
                  />

                  <motion.div
                    initial={{ scale: 0.6, rotate: -10, opacity: 0 }}
                    animate={{ scale: 1, rotate: 0, opacity: 1 }}
                    transition={{ type: 'spring', stiffness: 220, damping: 14 }}
                    className="relative h-24 w-24 mx-auto rounded-2xl bg-gw-teal/15 border border-gw-teal/40 text-gw-teal flex items-center justify-center"
                  >
                    <Award size={42} />
                  </motion.div>
                  <p className="relative mt-4 text-[11px] uppercase tracking-wider font-semibold text-white/70 inline-flex items-center gap-1.5">
                    <Sparkles size={12} className="text-gw-teal" /> Badge earned
                  </p>
                  <h3 className="relative mt-1 font-display text-2xl font-extrabold leading-tight">
                    {badge.label}
                  </h3>
                  <p className="relative mt-2 text-sm text-white/75 leading-relaxed max-w-sm mx-auto">
                    {badge.description}
                  </p>
                </div>

                {mastered && masteryBadge && (
                  <div className="px-6 py-4 bg-gw-amber/10 border-y border-gw-amber/20 text-sm text-gw-ink flex items-start gap-3">
                    <span className="h-9 w-9 rounded-lg bg-gw-amber/20 text-gw-amber flex items-center justify-center shrink-0">
                      <Sparkles size={16} />
                    </span>
                    <div>
                      <p className="font-semibold">{masteryBadge.label}</p>
                      <p className="text-xs text-gw-slate leading-relaxed">{masteryBadge.description}</p>
                    </div>
                  </div>
                )}

                <div className="p-6 flex flex-col gap-3">
                  <button
                    type="button"
                    className="btn btn-ghost-teal inline-flex items-center justify-center gap-2"
                  >
                    <Share2 size={14} /> Share to LinkedIn
                  </button>
                  <button type="button" onClick={onClose} className="btn btn-primary">
                    Continue to dashboard
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
