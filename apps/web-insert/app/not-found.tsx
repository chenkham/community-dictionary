import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[100dvh] flex items-center justify-center px-5">
      <div className="text-center anim-fade-up">
        <div className="text-5xl font-heading font-bold g-text g-ocean mb-3">404</div>
        <h1 className="font-heading text-xl font-bold mb-2">Page not found</h1>
        <p className="text-sm text-[var(--text-muted)] mb-5 max-w-sm mx-auto">
          That route doesn&apos;t exist in the Insert Hub.
        </p>
        <Link
          href="/"
          className="btn-ocean inline-flex items-center gap-1.5 text-sm font-semibold px-4 py-2 rounded-lg"
        >
          <ArrowLeft className="w-4 h-4" /> Back to dashboard
        </Link>
      </div>
    </div>
  );
}
