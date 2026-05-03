import { Disclosure, Transition } from '@headlessui/react';
import { ChevronDown } from 'lucide-react';

export default function PathFaqs({ faqs }) {
  if (!faqs?.length) return null;
  return (
    <div>
      <h3 className="font-display text-2xl font-bold text-gw-ink">
        Frequently asked questions
      </h3>
      <div className="mt-5 divide-y divide-gw-navy/10 rounded-2xl bg-white border border-gw-navy/10">
        {faqs.map((f) => (
          <Disclosure key={f.q}>
            {({ open }) => (
              <>
                <Disclosure.Button className="w-full text-left px-5 py-4 flex items-center justify-between gap-4 hover:bg-gw-ice/50 transition">
                  <span className="font-semibold text-gw-ink text-sm md:text-base">{f.q}</span>
                  <ChevronDown
                    size={18}
                    className={`text-gw-slate transition-transform shrink-0 ${
                      open ? 'rotate-180' : ''
                    }`}
                  />
                </Disclosure.Button>
                <Transition
                  enter="transition duration-150 ease-out"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="transition duration-100 ease-out"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <Disclosure.Panel className="px-5 pb-5 text-sm text-gw-slate leading-relaxed">
                    {f.a}
                  </Disclosure.Panel>
                </Transition>
              </>
            )}
          </Disclosure>
        ))}
      </div>
    </div>
  );
}
