'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import { ArrowRight, Search, X } from 'lucide-react';
import WordCard from '@/components/WordCard';
import WordOfTheDay from '@/components/WordOfTheDay';
import { getWords, searchWords } from '@/lib/api';

const languageFilters = [
  { value: 'all', label: 'All' },
  { value: 'tai', label: 'Tai Khamyang' },
  { value: 'en', label: 'English' },
  { value: 'as', label: 'Assamese' },
] as const;

export default function DictionaryPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState<'all' | 'tai' | 'en' | 'as'>('all');

  const { data: allWords, isLoading: loadingAll } = useQuery({
    queryKey: ['words', selectedLanguage],
    queryFn: () => getWords({ page: 1, limit: 100, language: selectedLanguage === 'all' ? undefined : selectedLanguage }),
    enabled: !searchQuery,
  });

  const { data: searchResults, isLoading: loadingSearch } = useQuery({
    queryKey: ['search', searchQuery],
    queryFn: () => searchWords(searchQuery),
    enabled: searchQuery.length > 0,
  });

  const words = searchQuery ? searchResults?.results : allWords?.data;
  const isLoading = searchQuery ? loadingSearch : loadingAll;
  const totalWords = allWords?.pagination?.total ?? words?.length ?? 0;

  return (
    <main className="mx-auto w-full max-w-5xl px-5 pt-24 pb-16 sm:pt-28 sm:px-8">
      {/* === SEARCH-FIRST HERO — the most prominent thing on the page === */}
      <section className="anim-fade-up text-center mb-6 sm:mb-8">
        <div className="inline-flex items-center gap-2 mb-3">
          <div className="dot dot-jade" />
          <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[var(--text-muted)]">Living Dictionary</span>
        </div>
        <h1 className="font-heading text-2xl sm:text-4xl font-bold mb-2 leading-tight">
          Search the <span className="g-text g-ocean">Tai Khamyang</span> word
        </h1>
        <p className="text-sm text-[var(--text-muted)] mb-6 max-w-md mx-auto">
          Type any word in Tai Khamyang, English, or Assamese.
        </p>

        {/* The big search bar */}
        <div className="relative max-w-2xl mx-auto">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-[#0891B2]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search words, meanings, or phrases…"
            autoFocus
            className="w-full rounded-full border-2 border-[var(--border)] bg-white py-4 pl-14 pr-12 text-base shadow-md outline-none transition-all focus:border-[#0891B2] focus:ring-4 focus:ring-[#0891B2]/15"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              aria-label="Clear search"
              className="absolute right-4 top-1/2 -translate-y-1/2 w-7 h-7 flex items-center justify-center rounded-full bg-[var(--bg-soft)] text-[var(--text-muted)] hover:text-[var(--text)] transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Language filters — right under search */}
        <div className="flex flex-wrap justify-center gap-2 mt-4">
          {languageFilters.map((f) => (
            <button
              key={f.value}
              onClick={() => setSelectedLanguage(f.value)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                selectedLanguage === f.value
                  ? 'btn-ocean text-white shadow-sm'
                  : 'bg-white border border-[var(--border)] text-[var(--text-muted)] hover:border-[#0891B2]/40 hover:text-[var(--text)]'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </section>

      {/* === RESULTS — immediately under the search === */}
      <section className="anim-fade-up anim-delay-1 mb-12">
        {searchQuery ? (
          <div className="text-[12px] text-[var(--text-muted)] mb-3 px-1">
            {isLoading ? 'Searching…' : `${words?.length || 0} result${words?.length === 1 ? '' : 's'} for “${searchQuery}”`}
          </div>
        ) : (
          <div className="text-[12px] text-[var(--text-muted)] mb-3 px-1">
            Browsing {totalWords} entries
          </div>
        )}

        {isLoading ? (
          <div className="grid gap-2 sm:grid-cols-2">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="py-3 px-1 space-y-2">
                <div className="grid grid-cols-3 gap-4">
                  <div><div className="skeleton h-2.5 w-16 mb-1.5" /><div className="skeleton h-4 w-24" /></div>
                  <div><div className="skeleton h-2.5 w-12 mb-1.5" /><div className="skeleton h-4 w-20" /></div>
                  <div><div className="skeleton h-2.5 w-14 mb-1.5" /><div className="skeleton h-4 w-20" /></div>
                </div>
                <div className="divider" />
              </div>
            ))}
          </div>
        ) : words && words.length > 0 ? (
          <div className="grid gap-2 sm:grid-cols-2">
            {words.map((word: any) => (
              <WordCard key={word.id} word={word} />
            ))}
          </div>
        ) : (
          <div className="py-16 text-center">
            <Search className="w-6 h-6 text-[var(--text-light)] mx-auto mb-3" />
            <h3 className="text-sm font-semibold mb-1">No matching results</h3>
            <p className="text-xs text-[var(--text-light)]">Try a simpler query or switch filters.</p>
          </div>
        )}
      </section>

      {/* === SECONDARY: Stats + Word of the Day at the BOTTOM === */}
      <div className="divider-ocean mb-10" />

      <section className="anim-fade-up anim-delay-2 mb-10">
        <div className="flex flex-wrap gap-x-10 gap-y-4">
          <div>
            <div className="text-xl font-bold g-text g-jade">{totalWords}</div>
            <div className="text-[10px] uppercase tracking-wider text-[var(--text-light)]">Entries</div>
          </div>
          <div>
            <div className="text-xl font-bold g-text g-ocean">3</div>
            <div className="text-[10px] uppercase tracking-wider text-[var(--text-light)]">Languages</div>
          </div>
          <div>
            <div className="text-xl font-bold g-text g-amber">Tai-Kadai</div>
            <div className="text-[10px] uppercase tracking-wider text-[var(--text-light)]">Family</div>
          </div>
        </div>
      </section>

      <section className="anim-fade-up">
        <WordOfTheDay />
      </section>

    </main>
  );
}
