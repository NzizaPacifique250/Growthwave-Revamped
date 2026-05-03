import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Popover, Menu, Transition } from '@headlessui/react';
import { Bell, Flame, Search, ChevronDown, Settings, LogOut, ArrowLeftRight, Check } from 'lucide-react';
import { useAuth } from '../../../context/AuthContext.jsx';
import { timeOfDayGreeting } from '../../../data/dashboard.js';

export default function DashboardHeader({ pathTitle, onLogToday }) {
  const { user, notifications, markNotificationRead, signOut } = useAuth();
  const unreadCount = notifications.filter((n) => !n.read).length;
  const greeting = timeOfDayGreeting();

  return (
    <div className="rounded-2xl bg-white border border-gw-navy/10 shadow-card p-5 md:p-6">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <p className="text-xs uppercase tracking-wider font-semibold text-gw-slate">
            {greeting}
          </p>
          <h1 className="mt-1 font-display text-2xl md:text-3xl font-bold text-gw-ink leading-tight">
            Welcome back, {user.firstName}
          </h1>
          <p className="mt-1 text-sm text-gw-slate">
            Here's where you left off in <span className="font-semibold text-gw-ink">{pathTitle}</span>.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <SearchPopover />
          <StreakChip
            count={user.streakDays}
            loggedToday={user.loggedToday}
            onLogToday={onLogToday}
          />
          <NotificationsPopover
            notifications={notifications}
            unreadCount={unreadCount}
            onMarkRead={markNotificationRead}
          />
          <AvatarMenu user={user} signOut={signOut} />
        </div>
      </div>
    </div>
  );
}

function SearchPopover() {
  return (
    <Popover className="relative hidden md:block">
      <Popover.Button
        className="inline-flex items-center gap-2 rounded-lg border border-gw-navy/15 px-3 py-2 text-xs text-gw-slate hover:border-gw-teal hover:text-gw-teal transition focus:outline-none focus:ring-2 focus:ring-gw-teal/20"
        aria-label="Search"
      >
        <Search size={14} /> Search
      </Popover.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-150"
        enterFrom="opacity-0 translate-y-1"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-100"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-1"
      >
        <Popover.Panel className="absolute right-0 z-30 mt-2 w-72 rounded-xl bg-white shadow-cardHover border border-gw-navy/10 p-4">
          <p className="text-xs text-gw-slate">
            Lessons, mentors, and community search coming soon.
          </p>
          <p className="mt-2 text-[11px] text-gw-slate">
            For now, navigate via the dashboard cards or use your browser's URL bar.
          </p>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
}

function StreakChip({ count, loggedToday, onLogToday }) {
  return (
    <button
      type="button"
      onClick={onLogToday}
      disabled={loggedToday}
      className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-bold transition ${
        loggedToday
          ? 'bg-gw-amber/15 text-gw-amber cursor-default'
          : 'bg-gw-amber text-white hover:brightness-105'
      }`}
      title={loggedToday ? 'You have logged time today' : 'Log time today to keep your streak'}
    >
      <Flame size={14} className={loggedToday ? '' : 'animate-pulse'} />
      {count}-day streak
      {!loggedToday && <span className="ml-1 text-[10px] uppercase tracking-wide">Log today</span>}
    </button>
  );
}

function NotificationsPopover({ notifications, unreadCount, onMarkRead }) {
  return (
    <Popover className="relative">
      <Popover.Button
        className="relative inline-flex items-center justify-center h-10 w-10 rounded-lg border border-gw-navy/15 text-gw-slate hover:border-gw-teal hover:text-gw-teal transition focus:outline-none focus:ring-2 focus:ring-gw-teal/20"
        aria-label={`Notifications (${unreadCount} unread)`}
      >
        <Bell size={16} />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 h-4 min-w-4 px-1 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </Popover.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-150"
        enterFrom="opacity-0 translate-y-1"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-100"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-1"
      >
        <Popover.Panel className="absolute right-0 z-30 mt-2 w-80 rounded-xl bg-white shadow-cardHover border border-gw-navy/10 overflow-hidden">
          <div className="px-4 py-3 border-b border-gw-navy/10">
            <p className="font-display font-bold text-gw-ink text-sm">Notifications</p>
            <p className="text-[11px] text-gw-slate">{unreadCount} unread</p>
          </div>
          <ul className="max-h-80 overflow-y-auto divide-y divide-gw-navy/10">
            {notifications.length === 0 && (
              <li className="px-4 py-6 text-sm text-gw-slate text-center">All caught up.</li>
            )}
            {notifications.map((n) => (
              <li
                key={n.id}
                className={`px-4 py-3 flex items-start gap-3 ${n.read ? '' : 'bg-gw-teal/5'}`}
              >
                <span
                  className={`mt-1 h-2 w-2 rounded-full shrink-0 ${
                    n.read ? 'bg-gw-navy/15' : 'bg-gw-teal'
                  }`}
                  aria-hidden
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gw-ink leading-snug">{n.text}</p>
                  <p className="text-[11px] text-gw-slate mt-0.5 capitalize">{n.kind}</p>
                </div>
                {!n.read && (
                  <button
                    type="button"
                    onClick={() => onMarkRead(n.id)}
                    className="text-[11px] font-semibold text-gw-teal hover:underline shrink-0"
                  >
                    Mark read
                  </button>
                )}
              </li>
            ))}
          </ul>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
}

function AvatarMenu({ user, signOut }) {
  return (
    <Menu as="div" className="relative">
      <Menu.Button className="inline-flex items-center gap-2 rounded-lg border border-gw-navy/15 pl-1 pr-2 py-1 hover:border-gw-teal transition focus:outline-none focus:ring-2 focus:ring-gw-teal/20">
        <span className="h-8 w-8 rounded-full bg-gradient-to-br from-gw-teal to-gw-navy flex items-center justify-center text-xs font-bold text-white">
          {user.initials}
        </span>
        <ChevronDown size={14} className="text-gw-slate" />
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
        <Menu.Items className="absolute right-0 z-30 mt-2 w-56 origin-top-right rounded-xl bg-white shadow-cardHover border border-gw-navy/10 overflow-hidden focus:outline-none">
          <div className="px-4 py-3 border-b border-gw-navy/10">
            <p className="text-sm font-semibold text-gw-ink truncate">{user.fullName}</p>
            <p className="text-[11px] text-gw-slate truncate">{user.email}</p>
          </div>
          <div className="py-1 text-sm">
            <MenuLink icon={Settings}>Account settings</MenuLink>
            <MenuLink icon={ArrowLeftRight}>Switch path</MenuLink>
            <MenuLink icon={Check}>Help & feedback</MenuLink>
          </div>
          <div className="border-t border-gw-navy/10 py-1">
            <Menu.Item>
              {({ active }) => (
                <button
                  type="button"
                  onClick={signOut}
                  className={`w-full flex items-center gap-2 px-4 py-2 text-sm ${
                    active ? 'bg-gw-ice text-gw-ink' : 'text-gw-slate'
                  }`}
                >
                  <LogOut size={14} /> Sign out
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}

function MenuLink({ icon: Icon, children }) {
  return (
    <Menu.Item>
      {({ active }) => (
        <button
          type="button"
          className={`w-full flex items-center gap-2 px-4 py-2 text-sm transition ${
            active ? 'bg-gw-ice text-gw-ink' : 'text-gw-ink/85'
          }`}
        >
          <Icon size={14} className="text-gw-slate" /> {children}
        </button>
      )}
    </Menu.Item>
  );
}
