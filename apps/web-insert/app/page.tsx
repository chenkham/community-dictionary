'use client';

import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import {
  Plus,
  Database,
  ArrowRight,
  Activity,
  AlertCircle,
} from 'lucide-react';
import { listWords, getApiHealth } from '@/lib/api';

export default function Dashboard() {
  const { data: words, isLoading: wordsLoading, error: wordsError } = useQuery({
    queryKey: ['words', { page: 1, limit: 8 }],
    queryFn: () => listWords({ page: 1, limit: 8 }),
  });

  const { data: health, error: healthError } = useQuery({
    queryKey: ['api-health'],
    queryFn: getApiHealth,
    refetchInterval: 30_000,
  });

  const total = words?.pagination.total ?? 0;
  const recent = words?.data ?? [];

  return (
    <div className="mx-auto w-full max-w-6xl px-5 sm:px-7 pt-8 pb-12">
      {/* Hero */}
      <section className="mb-10 anim-fade-up">
        <div className="flex items-center gap-2 mb-3">
          <div className="dot dot-ocean" />
          <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--text-muted)]">
            Dashboard
          </span>
        </div>
        <h1 className="font-heading text-2xl sm:text-3xl font-bold mb-2">
          Welcome to the <span className="g-text g-ocean">Insert Hub</span>
        </h1>
        <p className="text-sm text-[var(--text-muted)] max-w-xl leading-relaxed">
          Add new words and manage existing entries in the Tai Khamyang
          dictionary. All changes are saved through the official API.
        </p>
      </section>

      {/* Quick actions */}
      <section className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10 anim-fade-up anim-delay-1">
        <Link
          href="/add"
          className="card group hover:shadow-lg hover:-translate-y-0.5 transition-all"
        >
          <div className="flex items-start justify-between">
            <div>
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center shadow-md mb-3"
                style={{ background: 'linear-gradient(135deg, #0891B2, #0E7490)' }}
              >
                <Plus className="w-5 h-5 text-white" />
              </div>
              <h2 className="font-heading text-lg font-bold mb-1">Add a Word</h2>
              <p className="text-sm text-[var(--text-muted)]">
                Submit a new trilingual entry to the dictionary.
              </p>
            </div>
            <ArrowRight className="w-4 h-4 text-[var(--text-light)] group-hover:text-[#0891B2] group-hover:translate-x-0.5 transition-all" />
          </div>
        </Link>

        <Link
          href="/manage"
          className="card group hover:shadow-lg hover:-translate-y-0.5 transition-all"
        >
          <div className="flex items-start justify-between">
            <div>
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center shadow-md mb-3"
                style={{ background: 'linear-gradient(135deg, #059669, #047857)' }}
              >
                <Database className="w-5 h-5 text-white" />
              </div>
              <h2 className="font-heading text-lg font-bold mb-1">Manage Entries</h2>
              <p className="text-sm text-[var(--text-muted)]">
                Search, edit, or delete existing words.
              </p>
            </div>
            <ArrowRight className="w-4 h-4 text-[var(--text-light)] group-hover:text-[#059669] group-hover:translate-x-0.5 transition-all" />
          </div>
        </Link>
      </section>

      {/* Stats + API status */}
      <section className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10 anim-fade-up anim-delay-2">
        <div className="card !p-4">
          <div className="text-[10px] uppercase tracking-wider text-[var(--text-light)] mb-1">
            Total Entries
          </div>
          <div className="text-2xl font-bold g-text g-ocean">
            {wordsLoading ? '…' : total}
          </div>
        </div>
        <div className="card !p-4">
          <div className="text-[10px] uppercase tracking-wider text-[var(--text-light)] mb-1">
            Languages
          </div>
          <div className="text-2xl font-bold g-text g-jade">3</div>
        </div>
        <div className="card !p-4">
          <div className="text-[10px] uppercase tracking-wider text-[var(--text-light)] mb-1">
            API Status
          </div>
          <div className="flex items-center gap-2 mt-1">
            <Activity
              className={`w-4 h-4 ${
                healthError ? 'text-red-500' : 'text-emerald-600'
              }`}
            />
            <span className="text-sm font-semibold">
              {healthError ? 'Unreachable' : health ? 'Online' : '…'}
            </span>
          </div>
        </div>
        <div className="card !p-4">
          <div className="text-[10px] uppercase tracking-wider text-[var(--text-light)] mb-1">
            Uptime
          </div>
          <div className="text-sm font-semibold mt-1">
            {health ? `${Math.round(health.uptime / 60)} min` : '—'}
          </div>
        </div>
      </section>

      {/* Recent words */}
      <section className="anim-fade-up">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-heading text-base font-bold">Recently added</h2>
          <Link
            href="/manage"
            className="text-xs font-semibold g-text g-ocean inline-flex items-center gap-1"
          >
            View all <ArrowRight className="w-3 h-3 text-[#0891B2]" />
          </Link>
        </div>

        <div className="card !p-0 overflow-hidden">
          {wordsError ? (
            <div className="p-5 flex items-start gap-3 text-sm text-red-700 bg-red-50">
              <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
              <div>
                <div className="font-semibold">Could not load words</div>
                <div className="text-xs">{(wordsError as Error).message}</div>
              </div>
            </div>
          ) : wordsLoading ? (
            <div className="p-4 space-y-3">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="grid grid-cols-3 gap-3">
                  <div className="skeleton h-4 w-24" />
                  <div className="skeleton h-4 w-20" />
                  <div className="skeleton h-4 w-20" />
                </div>
              ))}
            </div>
          ) : recent.length === 0 ? (
            <div className="p-8 text-center">
              <p className="text-sm text-[var(--text-muted)] mb-3">
                No words yet. Be the first to add one.
              </p>
              <Link
                href="/add"
                className="btn-ocean inline-flex items-center gap-1.5 text-sm font-semibold px-4 py-2 rounded-lg"
              >
                <Plus className="w-4 h-4" /> Add Word
              </Link>
            </div>
          ) : (
            recent.map((w, i) => (
              <div key={w.id}>
                <Link
                  href={`/manage?id=${w.id}`}
                  className="flex items-center justify-between px-4 py-3 row-hover"
                >
                  <div className="grid grid-cols-3 gap-3 flex-1 min-w-0 text-sm">
                    <div className="font-semibold truncate">{w.tai_khamyang_word}</div>
                    <div className="text-[var(--text-muted)] truncate">{w.english_word}</div>
                    <div className="text-[var(--text-muted)] truncate">{w.assamese_word}</div>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-[var(--text-light)] shrink-0 ml-2" />
                </Link>
                {i < recent.length - 1 && <div className="divider" />}
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
}
