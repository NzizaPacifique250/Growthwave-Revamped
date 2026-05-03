import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { ChevronDown, Layers, Check } from 'lucide-react';

export default function TemplateToggleMenu({ templates, activeId, onSelect }) {
  if (!templates?.length) return null;
  const active = templates.find((t) => t.id === activeId) || templates[0];
  return (
    <Menu as="div" className="relative">
      <Menu.Button className="w-full inline-flex items-center justify-between gap-2 rounded-lg border border-gw-navy/15 bg-white px-3 py-2 text-xs font-semibold text-gw-ink hover:border-gw-teal hover:text-gw-teal transition">
        <span className="inline-flex items-center gap-2">
          <Layers size={13} className="text-gw-slate" /> {active.label}
        </span>
        <ChevronDown size={13} className="text-gw-slate" />
      </Menu.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-150"
        enterFrom="opacity-0 translate-y-1"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-100"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-1"
      >
        <Menu.Items className="absolute z-30 mt-2 w-full origin-top-left rounded-xl bg-white shadow-cardHover border border-gw-navy/10 overflow-hidden focus:outline-none">
          {templates.map((t) => {
            const isActive = t.id === activeId;
            return (
              <Menu.Item key={t.id}>
                {({ active }) => (
                  <button
                    type="button"
                    onClick={() => onSelect(t.id)}
                    className={`w-full text-left px-3 py-2.5 transition ${
                      active ? 'bg-gw-ice' : ''
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-sm font-semibold text-gw-ink">{t.label}</span>
                      {isActive && <Check size={13} className="text-gw-teal" />}
                    </div>
                    <p className="text-[11px] text-gw-slate mt-0.5 leading-snug">{t.description}</p>
                  </button>
                )}
              </Menu.Item>
            );
          })}
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
