import type { Metadata, Viewport } from 'next';
import { Playfair_Display, Source_Sans_3 } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';
import Header from '@/components/Header';
import ServiceWorker from '@/components/ServiceWorker';
import InstallBanner from '@/components/InstallBanner';
import Link from 'next/link';

const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-heading' });
const sourceSans = Source_Sans_3({ subsets: ['latin'], variable: '--font-body' });

export const metadata: Metadata = {
  title: 'Tai Khamyang Hub - People of Gold',
  description: 'Preserving the Tai Khamyang language, sacred manuscripts, Buddhist chants, festivals, and community memory.',
  manifest: '/manifest.json',
  appleWebApp: { capable: true, statusBarStyle: 'default', title: 'TK Hub' },
  icons: {
    icon: [
      { url: '/favicon-32.png', sizes: '32x32', type: 'image/png' },
      { url: '/logo-192.png', sizes: '192x192', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
  },
};

export const viewport: Viewport = {
  themeColor: '#0891B2',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="bg-[#FAFAFA]">
      <body className={`${playfair.variable} ${sourceSans.variable} font-body text-gray-900 antialiased selection:bg-amber-100 selection:text-amber-900`}>
        
        {/* Artistic Brush Colors Background */}
        <div className="bg-brush">
          <div className="bg-brush-2" />
        </div>

        <ServiceWorker />
        <InstallBanner />
        <Providers>
          <div className="min-h-[100dvh] flex flex-col selection:bg-amber-100 selection:text-amber-900 relative z-0">
            <Header />
            <main className="flex-1 w-full">{children}</main>

            <footer className="relative z-10 border-t border-gray-100 mt-20 sm:mt-32 bg-white/40 backdrop-blur-3xl" role="contentinfo">
              <div className="mx-auto w-full max-w-7xl px-6 py-12 sm:px-8 lg:px-12 sm:py-16">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-10">
                  <div className="max-w-sm">
                    <span className="font-heading text-lg font-bold text-gray-900 tracking-tight">Tai Khamyang Hub</span>
                    <p className="mt-3 text-sm text-gray-500 leading-relaxed font-medium">
                      Preserving the language, manuscripts, and Buddhist heritage of the Tai Khamyang community of Northeast India.
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-x-8 gap-y-3 text-sm font-semibold text-gray-600">
                    <Link href="/dictionary" className="hover:text-[#0891B2] transition-colors">Dictionary</Link>
                    <Link href="/about" className="hover:text-[#0891B2] transition-colors">About</Link>
                    <Link href="/festivals" className="hover:text-[#0891B2] transition-colors">Festivals</Link>
                    <Link href="/cuisine" className="hover:text-[#0891B2] transition-colors">Cuisine</Link>
                    <Link href="/learn" className="hover:text-[#0891B2] transition-colors">Learn</Link>
                    <Link href="/news" className="hover:text-[#0891B2] transition-colors">News</Link>
                    <Link href="/resources" className="hover:text-[#0891B2] transition-colors">Resources</Link>
                  </div>
                </div>
                <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent my-8 opacity-50" />
                <p className="text-xs text-center text-gray-400 font-medium tracking-wide">
                  Built with care for the Tai Khamyang community - Theravada Buddhist heritage of Northeast India
                </p>
              </div>
            </footer>
          </div>
        </Providers>
      </body>
    </html>
  );
}
