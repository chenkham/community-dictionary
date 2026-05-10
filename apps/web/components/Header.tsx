'use client';

import { useState, useCallback, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';

const mainLinks = [
  { href: '/', label: 'Home' },
  { href: '/dictionary', label: 'Dictionary' },
  { 
    label: 'Culture',
    dropdown: [
      { href: '/festivals', label: 'Festivals' },
      { href: '/cuisine', label: 'Cuisine' },
      { href: '/learn', label: 'Learn' },
      { href: '/resources', label: 'Resources' },
    ]
  },
  { href: '/news', label: 'News' },
  { href: '/about', label: 'About' },
];

function isActive(pathname: string, href?: string, dropdown?: any[]) {
  if (href) return href === '/' ? pathname === '/' : pathname.startsWith(href);
  if (dropdown) return dropdown.some(d => pathname.startsWith(d.href));
  return false;
}

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);
  useEffect(() => { close(); }, [pathname, close]);

  return (
    <header className="fixed top-0 w-full z-50 bg-[var(--header-bg)] backdrop-blur-xl border-b border-[var(--border)]">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-4 sm:px-8 lg:px-12">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 shrink-0 group">
          <div className="relative w-10 h-10 rounded-xl overflow-hidden flex items-center justify-center shadow-md transition-transform group-hover:scale-105"
               style={{ background: 'linear-gradient(135deg, #0891B2 0%, #0E7490 100%)' }}>
            <span className="font-heading text-white font-bold text-base tracking-tight">TK</span>
          </div>
          <div className="flex flex-col">
            <span className="font-heading text-lg font-bold tracking-wide text-[var(--text)] leading-tight">Tai Khamyang</span>
            <span className="text-[10px] uppercase tracking-[0.2em] g-text g-ocean font-semibold leading-tight">People of Gold</span>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {mainLinks.map((l) => {
            if (l.dropdown) {
              return (
                <div key={l.label} className="relative group">
                  <button
                    className={`px-3 py-2 text-[14px] font-medium rounded-full transition-all duration-200 flex items-center gap-1 ${
                      isActive(pathname, undefined, l.dropdown)
                        ? 'text-[#0E7490] bg-[#0891B2]/10'
                        : 'text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--bg-soft)]'
                    }`}
                  >
                    {l.label}
                    <svg className="w-4 h-4 opacity-70 group-hover:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  <div className="absolute left-0 mt-2 w-48 rounded-xl bg-white border border-[var(--border)] shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 overflow-hidden">
                    {l.dropdown.map((d) => (
                      <Link
                        key={d.href}
                        href={d.href}
                        className={`block px-4 py-3 text-[14px] transition-colors ${
                          isActive(pathname, d.href)
                            ? 'bg-[#0891B2]/10 text-[#0E7490] font-semibold'
                            : 'text-[var(--text-muted)] hover:bg-[var(--bg-soft)] hover:text-[var(--text)]'
                        }`}
                      >
                        {d.label}
                      </Link>
                    ))}
                  </div>
                </div>
              );
            }
            return (
              <Link
                key={l.href}
                href={l.href as string}
                className={`px-3 py-2 text-[14px] font-medium rounded-full transition-all duration-200 ${
                  isActive(pathname, l.href)
                    ? 'text-[#0E7490] bg-[#0891B2]/10'
                    : 'text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--bg-soft)]'
                }`}
              >
                {l.label}
              </Link>
            );
          })}
        </nav>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen(!open)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          className="lg:hidden p-2 -mr-2 rounded-md text-white"
          style={{ background: 'linear-gradient(135deg, #0891B2, #0E7490)' }}
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile menu — themed teal/emerald, NOT flashy white */}
      {open && (
        <div
          className="lg:hidden absolute top-full left-0 w-full overflow-hidden anim-fade-up shadow-xl"
          style={{
            background: 'linear-gradient(180deg, #0F2027 0%, #0F766E 100%)',
            color: '#E6F2EC',
          }}
        >
          <nav className="flex flex-col py-3 px-4 gap-1">
            {mainLinks.map((l) => {
              if (l.dropdown) {
                return (
                  <div key={l.label} className="flex flex-col gap-1 py-1">
                    <div className="px-4 py-2 text-[15px] font-semibold text-white/90 border-b border-white/10 uppercase tracking-wider text-xs mt-2 mb-1">
                      {l.label}
                    </div>
                    {l.dropdown.map((d) => (
                      <Link
                        key={d.href}
                        href={d.href}
                        className={`py-3 px-6 text-[15px] font-medium rounded-xl transition-colors ${
                          isActive(pathname, d.href)
                            ? 'bg-white/15 text-white'
                            : 'text-white/85 hover:bg-white/10 hover:text-white'
                        }`}
                      >
                        {d.label}
                      </Link>
                    ))}
                  </div>
                );
              }
              return (
                <Link
                  key={l.href}
                  href={l.href as string}
                  className={`py-3 px-4 text-[15px] font-medium rounded-xl transition-colors ${
                    isActive(pathname, l.href)
                      ? 'bg-white/15 text-white'
                      : 'text-white/85 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  {l.label}
                </Link>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
}
