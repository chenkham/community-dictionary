import type { Metadata, Viewport } from 'next';
import { Playfair_Display, Source_Sans_3 } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';
import Header from '@/components/Header';
import MemberGate from '@/components/MemberGate';

const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-heading' });
const sourceSans = Source_Sans_3({ subsets: ['latin'], variable: '--font-body' });

export const metadata: Metadata = {
  title: 'Tai Khamyang — Insert Hub',
  description:
    'Members-only editor for adding and managing entries in the Tai Khamyang Dictionary.',
};

export const viewport: Viewport = {
  themeColor: '#0891B2',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body
        className={`${playfair.variable} ${sourceSans.variable} font-body antialiased`}
        style={{ fontFamily: 'var(--font-body), system-ui, sans-serif' }}
      >
        <div className="bg-brush" />

        <Providers>
          <MemberGate>
            <div className="min-h-[100dvh] flex flex-col relative z-0">
              <Header />
              <main className="flex-1 w-full pt-16">{children}</main>

              <footer className="relative z-10 mt-16 py-8 border-t border-[var(--border)]">
                <div className="mx-auto w-full max-w-6xl px-5 sm:px-7 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <p className="text-xs text-[var(--text-muted)]">
                    Tai Khamyang Insert Hub — internal editor
                  </p>
                  <p className="text-[11px] text-[var(--text-light)]">
                    Connected to{' '}
                    <code className="px-1.5 py-0.5 rounded bg-[var(--bg-soft)] text-[var(--text-muted)]">
                      {process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}
                    </code>
                  </p>
                </div>
              </footer>
            </div>
          </MemberGate>
        </Providers>
      </body>
    </html>
  );
}
