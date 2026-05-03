import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useScrollSolid } from '../hooks.js';
import { useAuth } from '../context/AuthContext.jsx';

const links = [
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'For Schools', href: '#audience' },
  { label: 'For Students', href: '#audience' },
  { label: 'Learning Paths', href: '/academy/paths', route: true },
  { label: 'Traction', href: '#traction' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const solid = useScrollSolid(20);
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const onLanding = location.pathname === '/';
  const { isAuthenticated, user, signOut } = useAuth();

  // Anchor links resolve to /#hash when not on the landing page so the
  // browser navigates back home and scrolls.
  const resolveHref = (href) => {
    if (href.startsWith('#') && !onLanding) return `/${href}`;
    return href;
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        solid
          ? 'bg-gw-midnight/95 backdrop-blur-md shadow-lg'
          : 'bg-gw-midnight/80 backdrop-blur-sm'
      }`}
    >
      <div className="container-x flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <img
            src="/G ICON BLUE-01.png"
            alt="Growthwave logo"
            className="h-10 w-auto"
          />
          <span className="font-display text-lg font-bold tracking-tight text-white">
            Growthwave
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-7">
          {links.map((l) =>
            l.route ? (
              <Link
                key={l.label}
                to={l.href}
                className="text-sm font-medium text-white/80 hover:text-white transition-colors"
              >
                {l.label}
              </Link>
            ) : (
              <a
                key={l.label}
                href={resolveHref(l.href)}
                className="text-sm font-medium text-white/80 hover:text-white transition-colors"
              >
                {l.label}
              </a>
            )
          )}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          {isAuthenticated ? (
            <>
              <Link
                to="/academy/learn/dashboard"
                className="btn btn-ghost-teal !py-2 !px-4 text-xs inline-flex items-center gap-2"
              >
                <span className="h-6 w-6 rounded-full bg-gradient-to-br from-gw-teal to-gw-navy flex items-center justify-center text-[10px] font-bold text-white">
                  {user.initials}
                </span>
                Dashboard
              </Link>
              <button
                type="button"
                onClick={signOut}
                className="text-xs font-semibold text-white/60 hover:text-white transition"
              >
                Sign out
              </button>
            </>
          ) : (
            <Link to="/academy/paths" className="btn btn-ghost-teal !py-2 !px-4 text-xs">
              Explore Academy
            </Link>
          )}
          <a href={resolveHref('#contact')} className="btn btn-primary !py-2 !px-4 text-xs">
            Partner With Us
          </a>
        </div>

        <button
          className="lg:hidden text-white"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden bg-gw-midnight border-t border-white/10">
          <div className="container-x py-4 flex flex-col gap-3">
            {links.map((l) =>
              l.route ? (
                <Link
                  key={l.label}
                  to={l.href}
                  onClick={() => setOpen(false)}
                  className="text-sm font-medium text-white/80 hover:text-white py-2"
                >
                  {l.label}
                </Link>
              ) : (
                <a
                  key={l.label}
                  href={resolveHref(l.href)}
                  onClick={() => setOpen(false)}
                  className="text-sm font-medium text-white/80 hover:text-white py-2"
                >
                  {l.label}
                </a>
              )
            )}
            <div className="flex flex-col gap-2 pt-2">
              <Link to="/academy/paths" className="btn btn-ghost-teal text-xs">
                Explore Academy
              </Link>
              <a href={resolveHref('#contact')} className="btn btn-primary text-xs">
                Partner With Us
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
