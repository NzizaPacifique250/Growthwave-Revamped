import { Linkedin, Twitter, Instagram, ShieldCheck } from 'lucide-react';

const quickLinks = [
  ['Home', '#top'],
  ['How It Works', '#how-it-works'],
  ['For Schools', '#audience'],
  ['For Students', '#audience'],
  ['For Employers', '#audience'],
  ['Academy Login', '#academy'],
];

const programs = [
  'High School Developer Program',
  'Coding & Robotics',
  'Innovation Labs',
  'Growthwave Academy',
];

export default function Footer() {
  return (
    <footer className="bg-gw-midnight text-white pt-16 pb-8">
      <div className="container-x grid grid-cols-1 md:grid-cols-12 gap-10">
        {/* Col 1 — brand */}
        <div className="md:col-span-4">
          <div className="flex items-baseline gap-0.5">
            <span className="font-display text-2xl font-extrabold">Growth</span>
            <span className="font-display text-2xl font-extrabold text-gw-teal">wave</span>
          </div>
          <p className="mt-4 text-sm font-semibold text-white/85">
            Building Africa's Tech Talent Pipeline
          </p>
          <p className="mt-2 text-sm text-white/55 leading-relaxed">
            A B2B education infrastructure company, Kigali, Rwanda.
          </p>

          <div className="mt-6 inline-flex items-center gap-3 rounded-lg border border-gw-teal/30 bg-gw-teal/10 px-4 py-2.5">
            <ShieldCheck size={18} className="text-gw-teal" />
            <span className="text-xs font-semibold text-white/85">DBI Trust Seal · Verified</span>
          </div>
        </div>

        {/* Col 2 — quick links */}
        <div className="md:col-span-2">
          <h4 className="text-xs uppercase tracking-[0.18em] font-semibold text-white/50">
            Quick Links
          </h4>
          <ul className="mt-4 space-y-2.5 text-sm text-white/75">
            {quickLinks.map(([label, href]) => (
              <li key={label}>
                <a href={href} className="hover:text-gw-teal transition-colors">
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 3 — programs */}
        <div className="md:col-span-3">
          <h4 className="text-xs uppercase tracking-[0.18em] font-semibold text-white/50">
            Programs
          </h4>
          <ul className="mt-4 space-y-2.5 text-sm text-white/75">
            {programs.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
        </div>

        {/* Col 4 — contact */}
        <div className="md:col-span-3">
          <h4 className="text-xs uppercase tracking-[0.18em] font-semibold text-white/50">
            Contact
          </h4>
          <ul className="mt-4 space-y-2.5 text-sm text-white/75">
            <li>info@growthwave.rw</li>
            <li>+250 7955 955 78</li>
            <li>Kigali, Rwanda</li>
          </ul>
          <div className="mt-5 flex gap-3">
            {[Linkedin, Twitter, Instagram].map((Icon, i) => (
              <a
                key={i}
                href="#"
                aria-label="Social link"
                className="h-9 w-9 rounded-lg border border-white/15 flex items-center justify-center text-white/70 hover:text-gw-teal hover:border-gw-teal transition-all"
              >
                <Icon size={15} />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="container-x mt-14 pt-6 border-t border-white/10 flex flex-col md:flex-row gap-3 items-center justify-between text-xs text-white/55">
        <p>
          © 2024 Growthwave Ltd. All rights reserved. · Made in Rwanda 🇷🇼
        </p>
        <div className="flex gap-5">
          <a href="#" className="hover:text-white">Privacy Policy</a>
          <a href="#" className="hover:text-white">Terms</a>
        </div>
      </div>
    </footer>
  );
}
