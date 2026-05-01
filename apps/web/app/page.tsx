'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import SearchBar from '@/components/SearchBar';
import WordCard from '@/components/WordCard';
import Header from '@/components/Header';
import { searchWords, getWords } from '@/lib/api';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch all words by default
  const { data: allWords, isLoading: loadingAll } = useQuery({
    queryKey: ['words'],
    queryFn: () => getWords({ page: 1, limit: 50 }),
    enabled: !searchQuery,
  });

  // Search words when query exists
  const { data: searchResults, isLoading: loadingSearch } = useQuery({
    queryKey: ['search', searchQuery],
    queryFn: () => searchWords(searchQuery),
    enabled: searchQuery.length > 0,
  });

  const words = searchQuery ? searchResults?.results : allWords?.data;
  const isLoading = searchQuery ? loadingSearch : loadingAll;

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Header />
      
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Community Dictionary
          </h1>
          <p className="text-base md:text-lg text-gray-600 mb-8">
            Tai Khamyang • English • Assamese
          </p>
          
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search in any language..."
          />
        </div>

        {/* Results Section */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-800">
              {searchQuery ? 'Search Results' : 'All Words'}
            </h2>
            <span className="text-sm text-gray-500">
              {words?.length || 0} {words?.length === 1 ? 'word' : 'words'}
            </span>
          </div>

          {isLoading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
              <p className="mt-4 text-gray-600">Loading...</p>
            </div>
          ) : words && words.length > 0 ? (
            <div className="grid gap-4">
              {words.map((word: any) => (
                <WordCard key={word.id} word={word} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white rounded-lg shadow-sm">
              <p className="text-gray-600">
                {searchQuery
                  ? 'No words found. Try a different search.'
                  : 'No words available yet.'}
              </p>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-50 border-t border-gray-200 mt-16">
        <div className="container mx-auto px-4 py-6 text-center text-sm text-gray-600">
          <p>Community Dictionary © 2024 • Built by Chenkham</p>
        </div>
      </footer>
    </div>
  );
}
