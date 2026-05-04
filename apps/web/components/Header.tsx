'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronDown, Heart, Menu, Plus, X } from 'lucide-react';
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
  const dropdownRef = useRef<HTMLDivElement>(null);

  const close = useCallback(() => { setOpen(false); }, []);
  useEffect(() => { close(); setCultureOpen(false); }, [pathname, close]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setCultureOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const isCultureActive = cultureLinks.some((l) => isActive(pathname, l.href));

  return (
    <>
      <header className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-xl shadow-sm border-b border-gray-100 transition-all duration-300">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-4 sm:px-8 lg:px-12">
          {/* Logo Section */}
          <Link href="/" className="flex items-center gap-3 shrink-0 group">
            {/* The user can replace /logo.png with the official Tai Khamyang logo in the public folder */}
            <div className="relative w-10 h-10 rounded-full overflow-hidden bg-gradient-to-tr from-amber-100 to-amber-50 flex items-center justify-center border border-amber-200 shadow-sm transition-transform group-hover:scale-105">
              <img src="/logo.png" alt="Tai Khamyang Logo" className="w-8 h-8 object-contain z-10" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
              {/* Fallback styling if logo.png is not yet present */}
              <span className="absolute text-amber-700 font-bold text-lg font-heading z-0">TK</span>
            </div>
            <div className="flex flex-col">
              <span className="font-heading text-lg font-bold tracking-wide text-gray-900 leading-tight">Tai Khamyang</span>
              <span className="text-[10px] uppercase tracking-[0.2em] text-amber-600 font-semibold leading-tight">People of Gold</span>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {mainLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={`px-4 py-2 text-[15px] font-medium rounded-full transition-all duration-200 ${
                  isActive(pathname, l.href)
                    ? 'text-amber-700 bg-amber-50 shadow-inner'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                {l.label}
              </Link>
            ))}

            {/* Culture Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setCultureOpen(!cultureOpen)}
                className={`flex items-center gap-1 px-4 py-2 text-[15px] font-medium rounded-full transition-all duration-200 ${
                  isCultureActive || cultureOpen
                    ? 'text-amber-700 bg-amber-50 shadow-inner'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                Culture
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${cultureOpen ? 'rotate-180' : ''}`} />
              </button>

              {cultureOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-56 rounded-2xl bg-white shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] border border-gray-100 py-2 overflow-hidden anim-fade-up">
                  {cultureLinks.map((l) => (
                    <Link
                      key={l.href}
                      href={l.href}
                      className={`block px-5 py-2.5 text-[15px] transition-colors ${
                        isActive(pathname, l.href) ? 'text-amber-700 bg-amber-50/50 font-medium' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                      }`}
                    >
                      {l.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </nav>

          {/* Actions */}
          <div className="hidden lg:flex items-center gap-3">
            <Link href="/favorites" className="w-10 h-10 flex items-center justify-center rounded-full text-gray-500 hover:text-rose-500 hover:bg-rose-50 transition-colors">
              <Heart className="w-5 h-5" />
            </Link>
            
            <button
              onClick={() => setModal(true)}
              className="flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white font-medium shadow-md shadow-amber-600/20 transition-all hover:shadow-lg hover:shadow-amber-600/30 hover:-translate-y-0.5"
            >
              <Plus className="w-4 h-4" /> Contribute
            </button>
          </div>

          {/* Mobile toggle */}
          <button onClick={() => setOpen(!open)} className="lg:hidden p-2 -mr-2 text-gray-600">
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile menu */}
        {open && (
          <div className="lg:hidden absolute top-full left-0 w-full bg-white/95 backdrop-blur-xl border-b border-gray-100 shadow-xl overflow-hidden py-4 px-6 flex flex-col gap-2 anim-fade-up">
            {[...mainLinks, ...cultureLinks].map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={`py-3 px-4 text-base font-medium rounded-xl transition-colors ${
                  isActive(pathname, l.href) ? 'text-amber-700 bg-amber-50' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                {l.label}
              </Link>
            ))}
            <div className="h-px bg-gray-100 my-2" />
            <Link href="/favorites" className="flex items-center gap-3 py-3 px-4 text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-xl transition-colors">
              <Heart className="w-5 h-5 text-rose-500" /> Favorites
            </Link>
            <button
              onClick={() => { setModal(true); close(); }}
              className="flex items-center justify-center gap-2 py-3 mt-2 rounded-xl bg-gradient-to-r from-amber-600 to-amber-700 text-white font-medium shadow-md"
            >
              <Plus className="w-5 h-5" /> Contribute Word
            </button>
          </div>
        )}
      </header>

      {modal && <AddWordModal isOpen={modal} onClose={() => setModal(false)} />}
    </>
  );
}
