'use client';

import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { ChevronLeft, ArrowRight } from 'lucide-react';
import WordCard from '@/components/WordCard';
import { getWord } from '@/lib/api';

export default function FavoritesPage() {
  const router = useRouter();
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);

  useEffect(() => {
    setFavoriteIds(JSON.parse(localStorage.getItem('favorites') || '[]'));
  }, []);

  const { data: favoriteWords, isLoading } = useQuery({
    queryKey: ['favorites', favoriteIds],
    queryFn: async () => {
      if (favoriteIds.length === 0) return [];
      return Promise.all(favoriteIds.map(id => getWord(id)));
    },
    enabled: favoriteIds.length > 0,
  });

  const clearAllFavorites = () => {
    if (confirm('Remove all favorites?')) {
      localStorage.setItem('favorites', '[]');
      setFavoriteIds([]);
    }
  };

  return (
    <main className="mx-auto w-full max-w-[90rem] px-4 pt-20 pb-12 sm:pt-24 sm:px-6">
      <div className="flex items-center justify-between mb-6">
        <button onClick={() => router.push('/dictionary')} className="flex items-center gap-1.5 text-sm text-[var(--text-muted)] hover:text-[var(--text)] transition-colors">
          <ChevronLeft className="w-4 h-4" /> Dictionary
        </button>
        {favoriteIds.length > 0 && (
          <button onClick={clearAllFavorites} className="text-xs font-semibold text-[#F43F5E] hover:text-[#E11D48]">Clear All</button>
        )}
      </div>

      {/* Hero */}
      <section className="mb-10 anim-fade-up">
        <div className="flex items-center gap-2 mb-4">
          <div className="dot dot-rose" />
          <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--text-muted)]">My Favorites</span>
        </div>
        <h1 className="font-heading text-2xl sm:text-3xl font-bold tracking-tight leading-[1.1] mb-2">
          Favorite <span className="g-text g-rose">Words</span>
        </h1>
        <p className="text-sm text-[var(--text-muted)]">
          {favoriteIds.length === 0
            ? 'No favorites yet. Start adding words you love!'
            : `You have ${favoriteIds.length} favorite ${favoriteIds.length === 1 ? 'word' : 'words'}`}
        </p>
      </section>

      {/* Content */}
      <section className="anim-fade-up anim-delay-1">
        {isLoading ? (
          <div className="py-16 flex items-center justify-center">
            <div className="w-6 h-6 border-2 border-[var(--border)] border-t-[#E11D48] rounded-full animate-spin" />
          </div>
        ) : favoriteWords && favoriteWords.length > 0 ? (
          <div className="grid gap-3">
            {favoriteWords.map((word) => (
              <WordCard key={word.id} word={word} />
            ))}
          </div>
        ) : (
          <div className="py-12 text-center">
            <p className="font-heading text-base font-semibold mb-1">No favorites yet</p>
            <p className="text-sm text-[var(--text-muted)] mb-5">Browse the dictionary and add words to your favorites</p>
            <button onClick={() => router.push('/dictionary')} className="btn-ocean text-white text-sm font-semibold px-4 py-2 rounded-md inline-flex items-center gap-2">
              Browse Dictionary <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </section>
    </main>
  );
}
