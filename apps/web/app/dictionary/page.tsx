'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import { ArrowRight, Search } from 'lucide-react';
import SearchBar from '@/components/SearchBar';
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
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    setFavorites(JSON.parse(localStorage.getItem('favorites') || '[]'));
  }, []);

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
    <main className="mx-auto w-full max-w-7xl px-6 pt-24 pb-16 sm:pt-32 sm:px-8 lg:px-12">
      {/* Header */}
      <div className="mb-8 anim-fade-up">
        <div className="flex items-center gap-2 mb-4">
          <div className="dot dot-jade" />
          <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--text-muted)]">Living Dictionary</span>
        </div>

        <h1 className="font-heading text-2xl sm:text-3xl font-bold mb-2">
          Tai Khamyang <span className="g-text g-jade">Dictionary</span>
        </h1>
        <p className="text-sm text-[var(--text-muted)] max-w-lg leading-relaxed mb-5">
          Search across three languages --- Tai Khamyang, English, and Assamese. Part of the Southwestern Tai language family.
        </p>

        {/* Stats inline */}
        <div className="flex gap-6 mb-6">
          <div>
            <div className="text-lg font-bold g-text g-jade">{totalWords}</div>
            <div className="text-[10px] uppercase tracking-wider text-[var(--text-light)]">Entries</div>
          </div>
          <div>
            <div className="text-lg font-bold g-text g-ocean">3</div>
            <div className="text-[10px] uppercase tracking-wider text-[var(--text-light)]">Languages</div>
          </div>
          <div>
            <div className="text-lg font-bold g-text g-amber">Tai-Kadai</div>
            <div className="text-[10px] uppercase tracking-wider text-[var(--text-light)]">Family</div>
          </div>
        </div>

        <div className="divider-jade mb-5" />

        {/* Word of the Day */}
        <WordOfTheDay />
      </div>

      {/* Search + Filters */}
      <div className="mb-6 anim-fade-up anim-delay-1">
        <SearchBar value={searchQuery} onChange={setSearchQuery} placeholder="Search words, meanings, or phrases..." />

        <div className="flex flex-wrap gap-1.5 mt-3">
          {languageFilters.map((f) => (
            <button
              key={f.value}
              onClick={() => setSelectedLanguage(f.value)}
              className={`px-3 py-1 rounded-md text-xs font-semibold transition-all ${
                selectedLanguage === f.value
                  ? 'btn-jade text-white'
                  : 'text-[var(--text-muted)] border border-[var(--border)] hover:text-[var(--text)]'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Results */}
      <div className="anim-fade-up anim-delay-2">
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
              <WordCard key={word.id} word={word} isFavorite={favorites.includes(word.id)} />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center">
            <Search className="w-5 h-5 text-[var(--text-light)] mx-auto mb-3" />
            <h3 className="text-sm font-semibold mb-1">No matching results</h3>
            <p className="text-sm text-[var(--text-light)]">Try a simpler query or switch filters.</p>
          </div>
        )}
      </div>

      {/* Footer link */}
      <div className="divider-jade mt-8 mb-4" />
      <Link href="/manuscripts" className="inline-flex items-center gap-1.5 text-sm font-semibold g-text g-amber">
        Continue to manuscripts <ArrowRight className="w-3.5 h-3.5" />
      </Link>
    </main>
  );
}
