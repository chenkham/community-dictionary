'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BookHeart, ChevronDown, Heart, Menu, Moon, Plus, Sun, User, X } from 'lucide-react';
import AddWordModal from './AddWordModal';

const mainLinks = [
  { href: '/', label: 'Home' },
  { href: '/dictionary', label: 'Dictionary' },
  { href: '/about', label: 'About' },
  { href: '/resources', label: 'Resources' },
];

const cultureLinks = [
  { href: '/manuscripts', label: 'Manuscripts' },
  { href: '/chants', label: 'Chants' },
  { href: '/traditions', label: 'Traditions' },
  { href: '/festivals', label: 'Festivals' },
  { href: '/community', label: 'Community' },
];

function isActive(pathname: string, href: string) {
  return href === '/' ? pathname === '/' : pathname.startsWith(href);
}

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [modal, setModal] = useState(false);
  const [cultureOpen, setCultureOpen] = useState(false);
  const [mobileCultureOpen, setMobileCultureOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [dark, setDark] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);
  const mobileProfileRef = useRef<HTMLDivElement>(null);

  const close = useCallback(() => { setOpen(false); setMobileCultureOpen(false); }, []);
  useEffect(() => { close(); setCultureOpen(false); setProfileOpen(false); }, [pathname, close]);

  // Dark mode: init from localStorage + sync to html class
  useEffect(() => {
    const saved = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const isDark = saved === 'dark' || (!saved && prefersDark);
    setDark(isDark);
    document.documentElement.classList.toggle('dark', isDark);
  }, []);
  const toggleDark = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle('dark', next);
    localStorage.setItem('theme', next ? 'dark' : 'light');
  };
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  // Close dropdowns on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) setCultureOpen(false);
      if (profileRef.current && !profileRef.current.contains(e.target as Node) && mobileProfileRef.current && !mobileProfileRef.current.contains(e.target as Node)) setProfileOpen(false);
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const isCultureActive = cultureLinks.some((l) => isActive(pathname, l.href));

  return (
    <>
      <header className="fixed top-0 w-full z-50 bg-[var(--header-bg)] backdrop-blur-md border-b border-[var(--border)]">
        <div className="mx-auto flex w-full max-w-[90rem] items-center justify-between px-4 py-2.5 sm:px-6 lg:px-12 xl:px-20">
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <div className="w-7 h-7 rounded-md btn-ocean flex items-center justify-center">
              <BookHeart className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="font-heading text-sm font-bold tracking-wide text-[var(--text)]">TK Hub</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {mainLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={`px-2.5 py-1.5 text-[13px] font-medium rounded-md transition-colors ${
                  isActive(pathname, l.href)
                    ? 'text-[#0077B6] bg-[#0077B6]/5'
                    : 'text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--bg-soft)]'
                }`}
              >
                {l.label}
              </Link>
            ))}

            {/* Culture dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setCultureOpen((o) => !o)}
                className={`flex items-center gap-1 px-2.5 py-1.5 text-[13px] font-medium rounded-md transition-colors ${
                  isCultureActive
                    ? 'text-[#0077B6] bg-[#0077B6]/5'
                    : 'text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--bg-soft)]'
                }`}
              >
                Culture
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${cultureOpen ? 'rotate-180' : ''}`} />
              </button>
              {cultureOpen && (
                <div className="absolute top-full left-0 mt-1 w-44 bg-[var(--modal-bg)] rounded-lg border border-[var(--border)] shadow-lg shadow-black/5 py-1 z-50">
                  {cultureLinks.map((l) => (
                    <Link
                      key={l.href}
                      href={l.href}
                      className={`block px-3 py-2 text-[13px] font-medium transition-colors ${
                        isActive(pathname, l.href)
                          ? 'text-[#0077B6] bg-[#0077B6]/5'
                          : 'text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--bg-soft)]'
                      }`}
                    >
                      {l.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </nav>

          {/* Desktop right: theme toggle + profile dropdown */}
          <div className="hidden lg:flex items-center gap-2 shrink-0">
            <button onClick={toggleDark} className="p-1.5 rounded-md text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--bg-soft)] transition-colors" aria-label="Toggle theme">
              {dark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Profile dropdown */}
            <div className="relative" ref={profileRef}>
              <button
                onClick={() => setProfileOpen((o) => !o)}
                className={`p-1.5 rounded-md transition-colors ${profileOpen ? 'text-[#0077B6] bg-[#0077B6]/5' : 'text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--bg-soft)]'}`}
                aria-label="Profile menu"
              >
                <User className="w-4 h-4" />
              </button>
              {profileOpen && (
                <div className="absolute top-full right-0 mt-1 w-48 bg-[var(--modal-bg)] rounded-lg border border-[var(--border)] shadow-lg shadow-black/5 py-1 z-50">
                  <Link href="/profile" className="flex items-center gap-2 px-3 py-2 text-[13px] font-medium text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--bg-soft)] transition-colors">
                    <User className="w-3.5 h-3.5" /> Profile
                  </Link>
                  <Link href="/favorites" className="flex items-center gap-2 px-3 py-2 text-[13px] font-medium text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--bg-soft)] transition-colors">
                    <Heart className="w-3.5 h-3.5" /> Favorites
                  </Link>
                  <div className="my-1 border-t border-[var(--border)]" />
                  <button
                    onClick={() => { setModal(true); setProfileOpen(false); }}
                    className="w-full flex items-center gap-2 px-3 py-2 text-[13px] font-semibold text-[#0077B6] hover:bg-[#0077B6]/5 transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" /> Contribute a Word
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Mobile: profile icon + hamburger */}
          <div className="flex lg:hidden items-center gap-1">
            <div className="relative" ref={mobileProfileRef}>
              <button
                onClick={() => setProfileOpen((o) => !o)}
                className={`p-2 rounded-md transition-colors ${profileOpen ? 'text-[#0077B6]' : 'text-[var(--text-muted)]'} active:bg-[var(--bg-soft)]`}
                aria-label="Profile menu"
              >
                <User className="w-5 h-5" />
              </button>
              {profileOpen && (
                <div className="absolute top-full right-0 mt-1 w-48 bg-[var(--modal-bg)] rounded-lg border border-[var(--border)] shadow-lg shadow-black/5 py-1 z-50">
                  <Link href="/profile" onClick={() => setProfileOpen(false)} className="flex items-center gap-2 px-3 py-2.5 text-[14px] font-medium text-[var(--text-muted)] active:bg-[var(--bg-soft)] transition-colors">
                    <User className="w-4 h-4" /> Profile
                  </Link>
                  <Link href="/favorites" onClick={() => setProfileOpen(false)} className="flex items-center gap-2 px-3 py-2.5 text-[14px] font-medium text-[var(--text-muted)] active:bg-[var(--bg-soft)] transition-colors">
                    <Heart className="w-4 h-4" /> Favorites
                  </Link>
                  <div className="my-1 border-t border-[var(--border)]" />
                  <button
                    onClick={() => { setModal(true); setProfileOpen(false); }}
                    className="w-full flex items-center gap-2 px-3 py-2.5 text-[14px] font-semibold text-[#0077B6] active:bg-[#0077B6]/5 transition-colors"
                  >
                    <Plus className="w-4 h-4" /> Contribute a Word
                  </button>
                </div>
              )}
            </div>
            <button onClick={() => setOpen(o => !o)} className="p-2 rounded-md text-[var(--text-muted)] active:bg-[var(--bg-soft)]" aria-label="Menu">
              {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu — nav links + dark mode only */}
        <div className={`lg:hidden overflow-hidden transition-all duration-300 ${open ? 'max-h-[80vh] opacity-100' : 'max-h-0 opacity-0'}`}>
          <div className="border-t border-[var(--border)] bg-[var(--bg)] px-4 py-3 sm:px-6 space-y-0.5 overflow-y-auto max-h-[75vh]">
            {mainLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={close}
                className={`block px-3 py-2.5 text-[15px] font-medium rounded-md transition-colors active:bg-[var(--bg-soft)] ${
                  isActive(pathname, l.href) ? 'text-[#0077B6]' : 'text-[var(--text-muted)]'
                }`}
              >
                {l.label}
              </Link>
            ))}

            {/* Mobile culture dropdown */}
            <button
              onClick={() => setMobileCultureOpen((o) => !o)}
              className={`w-full flex items-center justify-between px-3 py-2.5 text-[15px] font-medium rounded-md transition-colors active:bg-[var(--bg-soft)] ${
                isCultureActive ? 'text-[#0077B6]' : 'text-[var(--text-muted)]'
              }`}
            >
              Culture
              <ChevronDown className={`w-4 h-4 transition-transform ${mobileCultureOpen ? 'rotate-180' : ''}`} />
            </button>
            <div className={`overflow-hidden transition-all duration-200 ${mobileCultureOpen ? 'max-h-80' : 'max-h-0'}`}>
              <div className="pl-4 space-y-0.5 pb-1">
                {cultureLinks.map((l) => (
                  <Link
                    key={l.href}
                    href={l.href}
                    onClick={close}
                    className={`block px-3 py-2 text-[14px] font-medium rounded-md transition-colors active:bg-[var(--bg-soft)] ${
                      isActive(pathname, l.href) ? 'text-[#0077B6]' : 'text-[var(--text-muted)]'
                    }`}
                  >
                    {l.label}
                  </Link>
                ))}
              </div>
            </div>

            <div className="divider my-2" />
            <button onClick={toggleDark} className="w-full flex items-center gap-2.5 px-3 py-2.5 text-[15px] font-medium rounded-md text-[var(--text-muted)] active:bg-[var(--bg-soft)] transition-colors">
              {dark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              {dark ? 'Light Mode' : 'Dark Mode'}
            </button>
          </div>
        </div>
      </header>

      <AddWordModal isOpen={modal} onClose={() => setModal(false)} />
    </>
  );
}
