import { Disclosure, Transition } from '@headlessui/react';
import { ChevronDown, BookOpen, Wrench, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

export default function CurriculumTimeline({ phases }) {
  return (
    <div className="space-y-10">
      {phases.map((phase, phaseIdx) => (
        <motion.div
          key={phase.phase}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.4, delay: phaseIdx * 0.05 }}
        >
          <div className="flex items-baseline gap-3 mb-4">
            <span className="font-display text-xs font-bold text-gw-teal uppercase tracking-[0.18em]">
              Phase {phaseIdx + 1}
            </span>
            <span className="text-xs text-gw-slate">·</span>
            <span className="text-xs text-gw-slate font-semibold">Weeks {phase.weeks}</span>
          </div>
          <h3 className="font-display text-2xl font-bold text-gw-ink">{phase.phase}</h3>

          <div className="mt-5 relative pl-8">
            <div className="absolute left-3 top-2 bottom-2 w-px bg-gw-navy/15" />
            <div className="space-y-3">
              {phase.modules.map((mod, idx) => (
                <ModuleAccordion key={mod.title} module={mod} index={idx} />
              ))}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

function ModuleAccordion({ module, index }) {
  return (
    <Disclosure>
      {({ open }) => (
        <div className="relative">
          <span
            className={`absolute -left-[26px] top-5 h-3 w-3 rounded-full border-2 ${
              open
                ? 'bg-gw-teal border-gw-teal'
                : 'bg-white border-gw-navy/30'
            }`}
            aria-hidden
          />
          <Disclosure.Button className="w-full text-left rounded-xl bg-white border border-gw-navy/10 hover:border-gw-teal/40 hover:shadow-card transition-all px-5 py-4 flex items-center gap-4">
            <span className="text-xs font-bold text-gw-slate w-6">
              {String(index + 1).padStart(2, '0')}
            </span>
            <div className="flex-1 min-w-0">
              <h4 className="font-display font-bold text-gw-ink">{module.title}</h4>
              <p className="text-xs text-gw-slate mt-1 inline-flex items-center gap-1.5">
                <Clock size={11} /> {module.duration}
              </p>
            </div>
            <ChevronDown
              size={18}
              className={`text-gw-slate transition-transform shrink-0 ${
                open ? 'rotate-180' : ''
              }`}
            />
          </Disclosure.Button>

          <Transition
            enter="transition duration-150 ease-out"
            enterFrom="transform scale-95 opacity-0"
            enterTo="transform scale-100 opacity-100"
            leave="transition duration-100 ease-out"
            leaveFrom="transform scale-100 opacity-100"
            leaveTo="transform scale-95 opacity-0"
          >
            <Disclosure.Panel className="px-5 pb-5 pt-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-3">
                <div>
                  <p className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-wider font-semibold text-gw-slate mb-2">
                    <BookOpen size={11} /> What you'll learn
                  </p>
                  <ul className="space-y-1.5">
                    {module.objectives.map((o) => (
                      <li
                        key={o}
                        className="text-sm text-gw-ink leading-relaxed flex gap-2 items-start"
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-gw-teal mt-2 shrink-0" />
                        {o}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-wider font-semibold text-gw-slate mb-2">
                    <Wrench size={11} /> Project
                  </p>
                  <p className="text-sm text-gw-ink leading-relaxed">{module.project}</p>
                </div>
              </div>
            </Disclosure.Panel>
          </Transition>
        </div>
      )}
    </Disclosure>
  );
}
