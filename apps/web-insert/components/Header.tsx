'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Plus, Database, LogOut, Menu, X } from 'lucide-react';

const links = [
  { href: '/', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/add', label: 'Add Word', icon: Plus },
  { href: '/manage', label: 'Manage', icon: Database },
];

function isActive(pathname: string, href: string) {
  return href === '/' ? pathname === '/' : pathname.startsWith(href);
}

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const signOut = () => {
    window.localStorage.removeItem('web-insert.memberToken');
    window.location.href = '/';
  };

  return (
    <header className="fixed top-0 w-full z-50 bg-[var(--header-bg)] backdrop-blur-xl border-b border-[var(--border)]">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-5 py-3.5 sm:px-7">
        <Link href="/" className="flex items-center gap-2.5 shrink-0 group">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center shadow-md transition-transform group-hover:scale-105"
            style={{ background: 'linear-gradient(135deg, #0891B2 0%, #0E7490 100%)' }}
          >
            <span className="font-heading text-white font-bold text-sm tracking-tight">TK</span>
          </div>
          <div className="flex flex-col leading-tight">
            <span className="font-heading text-[15px] font-bold text-[var(--text)]">
              Insert Hub
            </span>
            <span className="text-[10px] uppercase tracking-[0.18em] g-text g-ocean font-semibold">
              Member Editor
            </span>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {links.map((l) => {
            const Icon = l.icon;
            const active = isActive(pathname, l.href);
            return (
              <Link
                key={l.href}
                href={l.href}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-[13px] font-medium rounded-full transition-all ${
                  active
                    ? 'text-[#0E7490] bg-[#0891B2]/10'
                    : 'text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--bg-soft)]'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {l.label}
              </Link>
            );
          })}
          <button
            onClick={signOut}
            className="ml-2 flex items-center gap-1.5 px-3 py-1.5 text-[13px] font-medium text-[var(--text-muted)] hover:text-[var(--danger)] rounded-full transition-colors"
            title="Sign out"
          >
            <LogOut className="w-3.5 h-3.5" />
            Sign out
          </button>
        </nav>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen(!open)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          className="md:hidden p-2 rounded-md text-white"
          style={{ background: 'linear-gradient(135deg, #0891B2, #0E7490)' }}
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {open && (
        <div
          className="md:hidden absolute top-full left-0 w-full overflow-hidden anim-fade-up shadow-xl"
          style={{
            background: 'linear-gradient(180deg, #0F2027 0%, #0F766E 100%)',
            color: '#E6F2EC',
          }}
        >
          <nav className="flex flex-col py-3 px-4 gap-1">
            {links.map((l) => {
              const Icon = l.icon;
              const active = isActive(pathname, l.href);
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  className={`flex items-center gap-2 py-3 px-4 text-[15px] font-medium rounded-xl transition-colors ${
                    active
                      ? 'bg-white/15 text-white'
                      : 'text-white/85 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {l.label}
                </Link>
              );
            })}
            <button
              onClick={signOut}
              className="flex items-center gap-2 py-3 px-4 mt-1 text-[15px] font-medium rounded-xl text-white/85 hover:bg-white/10 hover:text-white transition-colors text-left"
            >
              <LogOut className="w-4 h-4" />
              Sign out
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
