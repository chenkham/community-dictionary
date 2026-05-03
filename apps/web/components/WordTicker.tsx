'use client';

import { useEffect, useState } from 'react';
import type { ImportantWord } from '@/lib/content';

interface Props {
  words: ImportantWord[];
}

export default function WordTicker({ words }: Props) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted || words.length === 0) return null;

  // Duplicate array for seamless infinite scroll
  const doubled = [...words, ...words];

  return (
    <div className="overflow-hidden py-4 relative">
      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-12 z-10 bg-gradient-to-r from-[var(--bg)] to-transparent pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-12 z-10 bg-gradient-to-l from-[var(--bg)] to-transparent pointer-events-none" />
      <div className="ticker-track">
        {doubled.map((w, i) => (
          <div key={`${w.id}-${i}`} className="flex items-center gap-2 px-4 shrink-0">
            <span className="font-heading text-lg font-bold g-text g-ocean">{w.tai}</span>
            <span className="text-[11px] text-[var(--text-light)]">·</span>
            <span className="text-sm font-medium">{w.english}</span>
            {w.pronunciation && (
              <>
                <span className="text-[11px] text-[var(--text-light)]">·</span>
                <span className="text-xs text-[var(--text-muted)] italic">/{w.pronunciation}/</span>
              </>
            )}
            <span className="text-[var(--border)] mx-2">|</span>
          </div>
        ))}
      </div>
    </div>
  );
}
