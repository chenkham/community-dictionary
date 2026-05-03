'use client';

import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { Sparkles, ChevronRight } from 'lucide-react';
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
      <div className="relative pl-4 py-4 animate-pulse">
        <div className="absolute left-0 top-0 bottom-0 w-0.5 rounded-full bar-violet" />
        <div className="h-3 bg-[var(--surface)] rounded w-24 mb-3" />
        <div className="h-6 bg-[var(--surface)] rounded w-40 mb-2" />
        <div className="h-4 bg-[var(--surface)] rounded w-32" />
      </div>
    );
  }

  if (!word) return null;

  return (
    <Link href={`/word/${word.id}`} className="group block">
      <div className="relative pl-4 py-1">
        <div className="absolute left-0 top-0 bottom-0 w-0.5 rounded-full bar-violet" />
        <div className="flex items-center gap-1.5 mb-2">
          <Sparkles className="w-3 h-3 g-text g-violet" />
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--text-light)]">Word of the Day</span>
          <span className="text-[10px] text-[var(--text-light)] ml-auto">
            {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
          </span>
        </div>

        <div className="text-lg font-heading font-bold mb-1 g-text g-violet">{word.tai_khamyang_word}</div>

        <div className="flex gap-4 text-sm">
          <span className="text-[var(--text-muted)]">{word.english_word}</span>
          <span className="text-[var(--text-light)]">{word.assamese_word}</span>
        </div>

        <div className="mt-2 flex items-center gap-1 text-[var(--text-light)] group-hover:text-[var(--text)] transition-colors">
          <span className="text-[10px] font-semibold uppercase tracking-wider">Learn more</span>
          <ChevronRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
        </div>
      </div>
    </Link>
  );
}
