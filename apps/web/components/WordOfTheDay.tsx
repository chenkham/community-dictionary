'use client';

import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { Sparkles, ArrowRight, Volume2 } from 'lucide-react';
import { getWords } from '@/lib/api';

export default function WordOfTheDay() {
  const { data: wordsData, isLoading } = useQuery({
    queryKey: ['words-all'],
    queryFn: () => getWords({ page: 1, limit: 100 }),
  });

  const getWordOfTheDay = () => {
    if (!wordsData?.data || wordsData.data.length === 0) return null;
    const today = new Date();
    const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 86400000);
    return wordsData.data[dayOfYear % wordsData.data.length];
  };

  const word = getWordOfTheDay();

  if (isLoading) {
    return (
      <div className="w-full py-8 border-b border-gray-200 animate-pulse">
        <div className="h-4 bg-gray-200 rounded w-32 mb-8" />
        <div className="h-12 bg-gray-200 rounded w-64 mb-4" />
        <div className="h-6 bg-gray-200 rounded w-48" />
      </div>
    );
  }

  if (!word) return null;

  return (
    <Link href={`/word/${word.id}`} className="group block">
      <div className="relative w-full py-7 border-b border-[var(--border)] transition-all duration-500 group-hover:border-[#0891B2]">
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-5">
            <div className="text-xs font-bold uppercase tracking-[0.25em] g-text g-ocean flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-[#0891B2]" /> Word of the Day
            </div>
            <span className="text-xs font-medium text-[var(--text-light)]">
              {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-5">
            <div className="min-w-0">
              <h3 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--text)] mb-3 tracking-tight group-hover:text-[#0E7490] transition-colors break-words">
                {word.tai_khamyang_word}
              </h3>
              <div className="flex flex-wrap items-center gap-3 text-base sm:text-lg text-[var(--text-muted)]">
                <span className="font-semibold g-text g-jade">{word.english_word}</span>
                <span className="w-1 h-1 rounded-full bg-[var(--border-strong)]" />
                <span className="font-medium">{word.assamese_word}</span>
              </div>
              {word.pronunciation && (
                <div className="mt-3 flex items-center gap-2 text-[var(--text-muted)] font-medium text-sm">
                  <Volume2 className="w-4 h-4 text-[var(--text-light)]" />
                  /{word.pronunciation}/
                </div>
              )}
            </div>

            <div className="flex items-center gap-2 g-text g-ocean font-semibold text-sm group-hover:gap-3 transition-all shrink-0">
              View details <ArrowRight className="w-4 h-4 text-[#0891B2]" />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
