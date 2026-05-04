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
      <div className="relative w-full py-8 border-b border-gray-200 transition-all duration-500 overflow-hidden group-hover:border-amber-400">

        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-6">
            <div className="text-amber-800 text-xs font-bold uppercase tracking-widest flex items-center gap-1.5">
              <Sparkles className="w-4 h-4" /> Word of the Day
            </div>
            <span className="text-sm font-medium text-gray-400">
              {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h3 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 tracking-tight group-hover:text-amber-700 transition-colors">
                {word.tai_khamyang_word}
              </h3>
              <div className="flex flex-wrap items-center gap-4 text-xl sm:text-2xl text-gray-600">
                <span className="font-medium text-amber-700">{word.english_word}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-gray-300" />
                <span className="font-medium">{word.assamese_word}</span>
              </div>
              {word.pronunciation && (
                <div className="mt-4 flex items-center gap-2 text-gray-500 font-medium">
                  <Volume2 className="w-5 h-5 text-gray-400" />
                  /{word.pronunciation}/
                </div>
              )}
            </div>

            <div className="flex items-center gap-2 text-amber-600 font-bold text-lg group-hover:gap-3 transition-all shrink-0 mt-4 md:mt-0">
              View details <ArrowRight className="w-5 h-5" />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
