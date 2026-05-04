'use client';

import { useQuery } from '@tanstack/react-query';
import { useParams, useRouter } from 'next/navigation';
import { getWordById } from '@/lib/api';
import { useState, useEffect } from 'react';
import { ChevronLeft, Heart, Share2, Printer } from 'lucide-react';
import { useToast } from '@/components/Toast';

export default function WordDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const [isFavorite, setIsFavorite] = useState(false);
  const { toast } = useToast();

  const { data: word, isLoading, error } = useQuery({
    queryKey: ['word', id],
    queryFn: () => getWordById(id),
  });

  useEffect(() => {
    if (word) {
      setIsFavorite(JSON.parse(localStorage.getItem('favorites') || '[]').includes(word.id));
    }
  }, [word]);

  const toggleFavorite = () => {
    if (!word) return;
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    if (isFavorite) {
      localStorage.setItem('favorites', JSON.stringify(favorites.filter((f: string) => f !== word.id)));
      setIsFavorite(false);
    } else {
      favorites.push(word.id);
      localStorage.setItem('favorites', JSON.stringify(favorites));
      setIsFavorite(true);
    }
  };

  const shareWord = () => {
    if (navigator.share && word) {
      navigator.share({ title: `${word.english_word}`, text: `${word.tai_khamyang_word} = ${word.english_word} = ${word.assamese_word}`, url: window.location.href });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast('Link copied to clipboard!', 'success');
    }
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="w-6 h-6 border-2 border-[var(--border)] border-t-[#0077B6] rounded-full animate-spin" />
      </div>
    );
  }

  if (error || !word) {
    return (
      <div className="flex min-h-screen items-center justify-center text-center px-4">
        <div>
          <h1 className="font-heading text-xl font-bold mb-1">Word Not Found</h1>
          <p className="text-sm text-[var(--text-muted)] mb-4">The word you&apos;re looking for doesn&apos;t exist.</p>
          <button onClick={() => router.push('/dictionary')} className="btn-ocean text-white text-sm font-semibold px-4 py-2 rounded-md">
            Back to Dictionary
          </button>
        </div>
      </div>
    );
  }

  return (
    <main className="mx-auto w-full max-w-7xl px-6 pt-24 pb-16 sm:pt-32 sm:px-8 lg:px-12">
      {/* Nav */}
      <div className="flex items-center justify-between mb-6">
        <button onClick={() => router.push('/dictionary')} className="flex items-center gap-1.5 text-sm text-[var(--text-muted)] hover:text-[var(--text)] transition-colors">
          <ChevronLeft className="w-4 h-4" /> Dictionary
        </button>
        <div className="flex items-center gap-2">
          <button onClick={toggleFavorite} className={`p-1.5 rounded-md border border-[var(--border)] transition-colors ${isFavorite ? 'text-[#F43F5E]' : 'text-[var(--text-muted)]'}`}>
            <Heart className="w-4 h-4" fill={isFavorite ? 'currentColor' : 'none'} />
          </button>
          <button onClick={shareWord} className="p-1.5 rounded-md border border-[var(--border)] text-[var(--text-muted)] hover:text-[var(--text)]">
            <Share2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Word translations */}
      <section className="mb-8 anim-fade-up">
        <div className="space-y-4">
          <div className="relative pl-4">
            <div className="absolute left-0 top-0.5 bottom-0.5 w-0.5 rounded-full bar-ocean" />
            <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--text-light)] mb-0.5">Tai Khamyang</div>
            <div className="text-2xl font-heading font-bold">{word.tai_khamyang_word}</div>
          </div>
          <div className="relative pl-4">
            <div className="absolute left-0 top-0.5 bottom-0.5 w-0.5 rounded-full bar-jade" />
            <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--text-light)] mb-0.5">English</div>
            <div className="text-2xl font-heading font-bold">{word.english_word}</div>
          </div>
          <div className="relative pl-4">
            <div className="absolute left-0 top-0.5 bottom-0.5 w-0.5 rounded-full bar-amber" />
            <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--text-light)] mb-0.5">Assamese</div>
            <div className="text-2xl font-heading font-bold">{word.assamese_word}</div>
          </div>
        </div>

        {word.pronunciation && (
          <div className="mt-5 pt-4">
            <div className="divider-ocean mb-3" />
            <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--text-light)] mb-0.5">Pronunciation</div>
            <div className="text-lg font-semibold g-text g-ocean">{word.pronunciation}</div>
          </div>
        )}
      </section>

      {/* Word Info */}
      <section className="mb-8 anim-fade-up anim-delay-1">
        <div className="divider-ocean mb-1" />
        {[
          { label: 'Word ID', value: word.id },
          { label: 'Added', value: new Date(word.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) },
          { label: 'Last Updated', value: new Date(word.updated_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) },
        ].map((item, i, arr) => (
          <div key={item.label}>
            <div className="flex items-center justify-between py-2.5">
              <span className="text-sm text-[var(--text-light)]">{item.label}</span>
              <span className="text-sm font-semibold font-mono">{item.value}</span>
            </div>
            {i < arr.length - 1 && <div className="divider" />}
          </div>
        ))}
      </section>

      {/* Actions */}
      <section className="anim-fade-up anim-delay-2">
        <div className="divider-ocean mb-1" />
        {[
          { label: isFavorite ? 'Remove from Favorites' : 'Add to Favorites', icon: Heart, action: toggleFavorite },
          { label: 'Share Word', icon: Share2, action: shareWord },
          { label: 'Print Word', icon: Printer, action: () => window.print() },
        ].map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.label}>
              <button onClick={item.action} className="flex items-center gap-3 w-full py-3 row-hover rounded group">
                <Icon className="w-4 h-4 text-[var(--text-light)] group-hover:text-[var(--text)] transition-colors" />
                <span className="text-sm font-medium group-hover:text-[var(--text)] transition-colors">{item.label}</span>
              </button>
              <div className="divider" />
            </div>
          );
        })}
      </section>
    </main>
  );
}
