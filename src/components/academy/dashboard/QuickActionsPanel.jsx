import { Link } from 'react-router-dom';
import { Play, MessageCircle, Users, Smartphone } from 'lucide-react';

export default function QuickActionsPanel({ resumeHref }) {
  const actions = [
    {
      id: 'resume',
      label: 'Continue learning',
      sub: 'Pick up the next lesson',
      icon: Play,
      to: resumeHref,
      primary: true,
    },
    {
      id: 'mentor',
      label: 'Book mentor session',
      sub: 'Live 1:1 review or office hours',
      icon: MessageCircle,
      to: '#',
    },
    {
      id: 'group',
      label: 'Join a study group',
      sub: 'Cohort + path peer groups',
      icon: Users,
      to: '#',
    },
    {
      id: 'whatsapp',
      label: 'WhatsApp AI Mentor',
      sub: 'Ask anything, any time',
      icon: Smartphone,
      to: '#',
    },
  ];

  return (
    <div className="rounded-2xl bg-white border border-gw-navy/10 shadow-card p-5">
      <h3 className="font-display text-base font-bold text-gw-ink">Quick actions</h3>
      <div className="mt-3 grid grid-cols-1 gap-2">
        {actions.map((a) => {
          const Icon = a.icon;
          const Wrapper = a.to.startsWith('#') ? 'button' : Link;
          const wrapperProps = a.to.startsWith('#') ? { type: 'button' } : { to: a.to };
          return (
            <Wrapper
              key={a.id}
              {...wrapperProps}
              className={`group inline-flex items-center gap-3 rounded-xl px-3 py-3 text-left transition-all border ${
                a.primary
                  ? 'bg-gradient-to-br from-gw-teal to-gw-tealDark text-white border-transparent shadow-sm hover:brightness-110'
                  : 'border-gw-navy/10 hover:border-gw-teal/40 hover:bg-gw-ice/40 text-gw-ink'
              }`}
            >
              <span
                className={`h-9 w-9 rounded-lg flex items-center justify-center shrink-0 ${
                  a.primary ? 'bg-white/15 text-white' : 'bg-gw-teal/15 text-gw-teal'
                }`}
              >
                <Icon size={15} />
              </span>
              <div className="flex-1 min-w-0">
                <p
                  className={`text-sm font-semibold leading-tight ${
                    a.primary ? 'text-white' : 'text-gw-ink'
                  }`}
                >
                  {a.label}
                </p>
                <p
                  className={`text-[11px] leading-snug ${
                    a.primary ? 'text-white/75' : 'text-gw-slate'
                  }`}
                >
                  {a.sub}
                </p>
              </div>
            </Wrapper>
          );
        })}
      </div>
    </div>
  );
}
