import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center anim-fade-up">
        <div className="text-6xl font-heading font-bold g-text g-ocean mb-4">404</div>
        <h1 className="font-heading text-xl font-bold mb-2">Page Not Found</h1>
        <p className="text-sm text-[var(--text-muted)] mb-6 max-w-sm mx-auto">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <div className="flex gap-3 justify-center">
          <Link href="/" className="btn-ocean text-white text-sm font-semibold px-4 py-2 rounded-md inline-flex items-center gap-2">
            Go Home <ArrowRight className="w-3.5 h-3.5" />
          </Link>
          <Link href="/dictionary" className="text-sm font-semibold px-4 py-2 rounded-md border border-[var(--border)] text-[var(--text-muted)] hover:text-[var(--text)] transition-colors">
            Dictionary
          </Link>
        </div>
      </div>
    </div>
  );
}
