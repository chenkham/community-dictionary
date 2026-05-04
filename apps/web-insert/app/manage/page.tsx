'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  Search,
  X,
  Pencil,
  Trash2,
  Plus,
  Loader2,
  AlertCircle,
  ArrowLeft,
} from 'lucide-react';
import {
  listWords,
  searchWords,
  deleteWord,
  type Word,
} from '@/lib/api';
import EditWordModal from '@/components/EditWordModal';
import { useToast } from '@/components/Toast';

export default function ManagePage() {
  const qc = useQueryClient();
  const toast = useToast();

  const [query, setQuery] = useState('');
  const [editing, setEditing] = useState<Word | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<Word | null>(null);

  const isSearching = query.trim().length > 0;

  const { data: list, isLoading: listLoading, error: listError } = useQuery({
    queryKey: ['words', { page: 1, limit: 100 }],
    queryFn: () => listWords({ page: 1, limit: 100 }),
    enabled: !isSearching,
  });

  const { data: search, isLoading: searchLoading, error: searchError } = useQuery({
    queryKey: ['search', query],
    queryFn: () => searchWords(query),
    enabled: isSearching,
  });

  const words: Word[] = useMemo(() => {
    if (isSearching) return search?.results ?? [];
    return list?.data ?? [];
  }, [isSearching, search, list]);

  const isLoading = isSearching ? searchLoading : listLoading;
  const error = isSearching ? searchError : listError;

  const delMutation = useMutation({
    mutationFn: (id: string) => deleteWord(id),
    onSuccess: (_, id) => {
      const removed = words.find((w) => w.id === id);
      toast.push('success', `Deleted "${removed?.tai_khamyang_word ?? 'word'}"`);
      qc.invalidateQueries({ queryKey: ['words'] });
      qc.invalidateQueries({ queryKey: ['search'] });
      setConfirmDelete(null);
    },
    onError: (err: Error) => {
      toast.push('error', err.message || 'Delete failed');
    },
  });

  return (
    <div className="mx-auto w-full max-w-5xl px-5 sm:px-7 pt-8 pb-12">
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--text-muted)] hover:text-[var(--text)] mb-4 transition-colors"
      >
        <ArrowLeft className="w-3.5 h-3.5" /> Back to dashboard
      </Link>

      {/* Header */}
      <section className="mb-6 anim-fade-up">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="dot dot-jade" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--text-muted)]">
                Manage Entries
              </span>
            </div>
            <h1 className="font-heading text-2xl sm:text-3xl font-bold mb-1">
              All <span className="g-text g-jade">Words</span>
            </h1>
            <p className="text-sm text-[var(--text-muted)]">
              Search, edit, or delete entries.{' '}
              {!isSearching && list && (
                <span className="text-[var(--text-light)]">
                  Showing {list.data.length} of {list.pagination.total}.
                </span>
              )}
            </p>
          </div>

          <Link
            href="/add"
            className="btn-ocean inline-flex items-center gap-1.5 text-sm font-semibold px-4 py-2.5 rounded-lg shrink-0"
          >
            <Plus className="w-4 h-4" /> Add Word
          </Link>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-light)]" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search across all three languages…"
            className="field !pl-10 !pr-10"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              aria-label="Clear search"
              className="absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6 flex items-center justify-center rounded-full text-[var(--text-light)] hover:text-[var(--text)] hover:bg-[var(--bg-soft)] transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </section>

      {/* List */}
      <section className="anim-fade-up anim-delay-1">
        <div className="card !p-0 overflow-hidden">
          {/* Table header (desktop) */}
          <div className="hidden sm:grid grid-cols-[1.2fr_1fr_1fr_auto] gap-4 px-4 py-2.5 bg-[var(--bg-soft)] border-b border-[var(--border)] text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)]">
            <div>Tai Khamyang</div>
            <div>English</div>
            <div>Assamese</div>
            <div className="w-20 text-right">Actions</div>
          </div>

          {error ? (
            <div className="p-5 flex items-start gap-3 text-sm text-red-700 bg-red-50">
              <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
              <div>
                <div className="font-semibold">Failed to load</div>
                <div className="text-xs">{(error as Error).message}</div>
              </div>
            </div>
          ) : isLoading ? (
            <div className="p-4 space-y-3">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="grid grid-cols-3 gap-3">
                  <div className="skeleton h-4 w-28" />
                  <div className="skeleton h-4 w-20" />
                  <div className="skeleton h-4 w-24" />
                </div>
              ))}
            </div>
          ) : words.length === 0 ? (
            <div className="p-10 text-center">
              <p className="text-sm text-[var(--text-muted)] mb-3">
                {isSearching
                  ? `No matches for “${query}”.`
                  : 'No words yet.'}
              </p>
              {!isSearching && (
                <Link
                  href="/add"
                  className="btn-ocean inline-flex items-center gap-1.5 text-sm font-semibold px-4 py-2 rounded-lg"
                >
                  <Plus className="w-4 h-4" /> Add the first word
                </Link>
              )}
            </div>
          ) : (
            words.map((w, i) => (
              <div key={w.id}>
                <div className="grid grid-cols-1 sm:grid-cols-[1.2fr_1fr_1fr_auto] gap-2 sm:gap-4 px-4 py-3 row-hover items-center">
                  <div className="min-w-0">
                    <div className="text-[10px] uppercase tracking-wider text-[var(--text-light)] sm:hidden">
                      Tai Khamyang
                    </div>
                    <div className="text-sm font-bold truncate">{w.tai_khamyang_word}</div>
                    {w.pronunciation && (
                      <div className="text-[11px] text-[var(--text-light)] italic truncate">
                        /{w.pronunciation}/
                      </div>
                    )}
                  </div>
                  <div className="min-w-0">
                    <div className="text-[10px] uppercase tracking-wider text-[var(--text-light)] sm:hidden">
                      English
                    </div>
                    <div className="text-sm text-[var(--text-muted)] truncate">
                      {w.english_word}
                    </div>
                  </div>
                  <div className="min-w-0">
                    <div className="text-[10px] uppercase tracking-wider text-[var(--text-light)] sm:hidden">
                      Assamese
                    </div>
                    <div className="text-sm text-[var(--text-muted)] truncate">
                      {w.assamese_word}
                    </div>
                  </div>
                  <div className="flex items-center justify-end gap-1.5">
                    <button
                      onClick={() => setEditing(w)}
                      aria-label={`Edit ${w.tai_khamyang_word}`}
                      title="Edit"
                      className="w-8 h-8 rounded-lg flex items-center justify-center text-[var(--text-muted)] hover:text-[#0891B2] hover:bg-[#0891B2]/8 transition-colors"
                    >
                      <Pencil className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => setConfirmDelete(w)}
                      aria-label={`Delete ${w.tai_khamyang_word}`}
                      title="Delete"
                      className="w-8 h-8 rounded-lg flex items-center justify-center text-[var(--text-muted)] hover:text-red-600 hover:bg-red-50 transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
                {i < words.length - 1 && <div className="divider" />}
              </div>
            ))
          )}
        </div>
      </section>

      {/* Edit modal */}
      {editing && (
        <EditWordModal word={editing} onClose={() => setEditing(null)} />
      )}

      {/* Delete confirmation */}
      {confirmDelete && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center px-4"
          role="dialog"
          aria-modal="true"
        >
          <div
            className="absolute inset-0 bg-[#0F2027]/40 backdrop-blur-sm"
            onClick={() => !delMutation.isPending && setConfirmDelete(null)}
          />
          <div className="relative card w-full max-w-sm anim-fade-up !bg-white">
            <div className="flex items-start gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center shrink-0">
                <Trash2 className="w-4 h-4 text-red-600" />
              </div>
              <div>
                <h3 className="font-heading text-base font-bold mb-1">
                  Delete this word?
                </h3>
                <p className="text-sm text-[var(--text-muted)]">
                  <span className="font-semibold text-[var(--text)]">
                    {confirmDelete.tai_khamyang_word}
                  </span>{' '}
                  — {confirmDelete.english_word} — {confirmDelete.assamese_word}
                </p>
                <p className="text-xs text-[var(--text-light)] mt-2">
                  This action cannot be undone.
                </p>
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setConfirmDelete(null)}
                disabled={delMutation.isPending}
                className="text-sm font-semibold px-4 py-2 rounded-lg border border-[var(--border)] text-[var(--text-muted)] hover:text-[var(--text)] transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => delMutation.mutate(confirmDelete.id)}
                disabled={delMutation.isPending}
                className="btn-danger inline-flex items-center gap-2 text-sm font-semibold px-4 py-2 rounded-lg"
              >
                {delMutation.isPending ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" /> Deleting…
                  </>
                ) : (
                  <>
                    <Trash2 className="w-4 h-4" /> Delete
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
