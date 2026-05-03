import type { Metadata, Viewport } from 'next';
import { Playfair_Display, Source_Sans_3 } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';
import Header from '@/components/Header';
import ServiceWorker from '@/components/ServiceWorker';
import Link from 'next/link';

const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-heading' });
const sourceSans = Source_Sans_3({ subsets: ['latin'], variable: '--font-body' });

export const metadata: Metadata = {
  title: 'Tai Khamyang Hub — People of Gold',
  description: 'Preserving the Tai Khamyang language, sacred manuscripts, Buddhist chants, festivals, and community memory.',
  manifest: '/manifest.json',
  appleWebApp: { capable: true, statusBarStyle: 'default', title: 'TK Hub' },
};

export const viewport: Viewport = {
  themeColor: '#0077B6',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${playfair.variable} ${sourceSans.variable} font-body`}>
        <div className="bg-mesh" aria-hidden="true" />
        <ServiceWorker />
        <Providers>
          <div className="min-h-[100dvh] flex flex-col">
            <Header />
            <main className="flex-1">{children}</main>

            <footer className="relative z-10 border-t border-[var(--border)] mt-16 sm:mt-24 bg-[var(--bg-soft)]" role="contentinfo">
              <div className="mx-auto w-full max-w-[90rem] px-4 py-8 sm:px-6 lg:px-12 xl:px-20 sm:py-10">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6">
                  <div>
                    <span className="font-heading text-sm font-semibold">Tai Khamyang Hub</span>
                    <p className="mt-1 text-xs text-[var(--text-light)] max-w-xs leading-relaxed">
                      Preserving the language, manuscripts, and Buddhist heritage of the Tai Khamyang community.
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-x-5 gap-y-1.5 text-xs text-[var(--text-muted)]">
                    <Link href="/dictionary" className="hover:text-[var(--text)] transition-colors">Dictionary</Link>
                    <Link href="/about" className="hover:text-[var(--text)] transition-colors">About</Link>
                    <Link href="/manuscripts" className="hover:text-[var(--text)] transition-colors">Manuscripts</Link>
                    <Link href="/chants" className="hover:text-[var(--text)] transition-colors">Chants</Link>
                    <Link href="/festivals" className="hover:text-[var(--text)] transition-colors">Festivals</Link>
                    <Link href="/traditions" className="hover:text-[var(--text)] transition-colors">Traditions</Link>
                    <Link href="/community" className="hover:text-[var(--text)] transition-colors">Community</Link>
                    <Link href="/learn" className="hover:text-[var(--text)] transition-colors">Learn</Link>
                    <Link href="/villages" className="hover:text-[var(--text)] transition-colors">Villages</Link>
                    <Link href="/cuisine" className="hover:text-[var(--text)] transition-colors">Cuisine</Link>
                    <Link href="/gallery" className="hover:text-[var(--text)] transition-colors">Gallery</Link>
                    <Link href="/news" className="hover:text-[var(--text)] transition-colors">News</Link>
                    <Link href="/resources" className="hover:text-[var(--text)] transition-colors">Resources</Link>
                  </div>
                </div>
                <div className="divider-ocean mt-6 mb-4" />
                <p className="text-[11px] text-[var(--text-light)]">
                  Built with care for the Tai Khamyang community · Theravada Buddhist heritage of Northeast India
                </p>
              </div>
            </footer>
          </div>
        </Providers>
      </body>
    </html>
  );
}
