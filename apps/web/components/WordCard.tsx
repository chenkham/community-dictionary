'use client';

import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

interface Word {
  id: string;
  tai_khamyang_word: string;
  english_word: string;
  assamese_word: string;
  pronunciation?: string;
  audio_url?: string;
}

interface WordCardProps {
  word: Word;
  isFavorite?: boolean;
}

export default function WordCard({ word, isFavorite = false }: WordCardProps) {
  return (
    <Link href={`/word/${word.id}`} className="group block">
      <div className="relative flex items-center justify-between py-3 px-1 row-hover rounded-md">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-1 sm:gap-4 flex-1 min-w-0">
          <div>
            <div className="text-[9px] font-semibold uppercase tracking-wider g-text g-ocean">Tai Khamyang</div>
            <div className="text-sm font-bold leading-tight">{word.tai_khamyang_word}</div>
          </div>
          <div>
            <div className="text-[9px] font-semibold uppercase tracking-wider g-text g-jade">English</div>
            <div className="text-sm font-bold leading-tight">{word.english_word}</div>
          </div>
          <div>
            <div className="text-[9px] font-semibold uppercase tracking-wider g-text g-amber">Assamese</div>
            <div className="text-sm font-bold leading-tight">{word.assamese_word}</div>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0 ml-2">
          {isFavorite && (
            <span className="text-[#E11D48] text-xs">♥</span>
          )}
          <ChevronRight className="w-3.5 h-3.5 text-[var(--text-light)] group-hover:translate-x-0.5 transition-transform" />
        </div>
      </div>
      <div className="divider" />
    </Link>
  );
}
