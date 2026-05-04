'use client';

import { useState, useMemo } from 'react';
import { getPhrases, type Phrase } from '@/lib/content';
import { useQuery } from '@tanstack/react-query';
import { Volume2 } from 'lucide-react';

const categories = [
  { value: 'all', label: 'All' },
  { value: 'greeting', label: 'Greetings' },
  { value: 'number', label: 'Numbers' },
  { value: 'daily', label: 'Daily Life' },
  { value: 'family', label: 'Family' },
  { value: 'food', label: 'Food' },
  { value: 'nature', label: 'Nature' },
  { value: 'religion', label: 'Religion' },
] as const;

export default function LearnPage() {
  const [cat, setCat] = useState<string>('all');

  const { data: phrases = [] } = useQuery({
    queryKey: ['phrases'],
    queryFn: getPhrases,
  });

  const filtered = useMemo(
    () => (cat === 'all' ? phrases : phrases.filter((p) => p.category === cat)),
    [phrases, cat]
  );

  // Pick a "phrase of the day" based on date
  const phraseOfDay = useMemo(() => {
    if (phrases.length === 0) return null;
    const dayIndex = Math.floor(Date.now() / 86400000) % phrases.length;
    return phrases[dayIndex];
  }, [phrases]);

  return (
    <div className="relative min-h-screen pt-20 sm:pt-28 pb-12 w-full">
      <div className="w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <section className="mb-10 sm:mb-14 anim-fade-up">
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-start">
            <div className="sm:col-span-8">
              <div className="flex items-center gap-2 mb-4">
                <div className="dot dot-jade" />
                <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--text-muted)]">Language Learning</span>
              </div>
              <h1 className="font-heading text-2xl sm:text-4xl font-bold tracking-tight leading-[1.1] mb-4">
                Learn Tai <span className="g-text g-jade">Khamyang</span>
              </h1>
              <p className="text-sm sm:text-base text-[var(--text-muted)] max-w-lg leading-relaxed">
                Start with basic words and phrases. The Khamyang language belongs to the Southwestern Tai family — related to Thai, Shan, and Khamti.
              </p>
            </div>
            <div className="sm:col-span-4">
              <div className="rounded-2xl overflow-hidden shadow-md aspect-[4/5] sm:aspect-square">
                <img
                  src="https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&q=80&w=800"
                  alt="Palm-leaf manuscript pages"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Phrase of the Day */}
        {phraseOfDay && (
          <section className="mb-10 sm:mb-14 anim-fade-up anim-delay-1">
            <div className="relative pl-4">
              <div className="absolute left-0 top-0 bottom-0 w-0.5 rounded-full bar-amber" />
              <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--text-light)] mb-1">Phrase of the Day</div>
              <div className="font-heading text-2xl font-bold g-text g-amber mb-1">{phraseOfDay.tai}</div>
              <div className="text-sm font-semibold mb-0.5">{phraseOfDay.english}</div>
              {phraseOfDay.assamese && <div className="text-sm text-[var(--text-muted)]">{phraseOfDay.assamese}</div>}
              {phraseOfDay.pronunciation && <div className="text-xs text-[var(--text-light)] italic mt-1">/{phraseOfDay.pronunciation}/</div>}
            </div>
          </section>
        )}

        {/* Category filters */}
        <section className="mb-6 anim-fade-up anim-delay-2">
          <div className="flex flex-wrap gap-1.5">
            {categories.map((c) => (
              <button
                key={c.value}
                onClick={() => setCat(c.value)}
                className={`px-3 py-1 rounded-md text-xs font-semibold transition-all ${
                  cat === c.value
                    ? 'btn-jade text-white'
                    : 'text-[var(--text-muted)] border border-[var(--border)] hover:text-[var(--text)]'
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>
        </section>

        {/* Phrase list */}
        <section className="anim-fade-up anim-delay-3">
          <div className="divider-jade mb-1" />
          {filtered.map((p, i) => (
            <div key={p.id}>
              <div className="flex items-center justify-between py-3 px-1 row-hover rounded-md">
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-1 sm:gap-4 flex-1 min-w-0">
                  <div>
                    <div className="text-[10px] uppercase tracking-wider text-[var(--text-light)] mb-0.5 sm:hidden">Tai Khamyang</div>
                    <span className="font-heading text-base font-bold g-text g-jade">{p.tai}</span>
                  </div>
                  <div>
                    <div className="text-[10px] uppercase tracking-wider text-[var(--text-light)] mb-0.5 sm:hidden">English</div>
                    <span className="text-sm font-medium">{p.english}</span>
                  </div>
                  <div>
                    <div className="text-[10px] uppercase tracking-wider text-[var(--text-light)] mb-0.5 sm:hidden">Assamese</div>
                    <span className="text-sm text-[var(--text-muted)]">{p.assamese || '---'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {p.pronunciation && (
                      <span className="text-xs text-[var(--text-light)] italic">/{p.pronunciation}/</span>
                    )}
                    {p.audioUrl && (
                      <button className="p-1 rounded hover:bg-[var(--bg-soft)] text-[var(--text-light)] hover:text-[var(--text)]" aria-label="Play pronunciation">
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
              {i < filtered.length - 1 && <div className="divider" />}
            </div>
          ))}
          {filtered.length === 0 && (
            <div className="py-12 text-center text-sm text-[var(--text-light)]">No phrases in this category yet.</div>
          )}
        </section>

        {/* External resource link */}
        <div className="divider-jade mt-8 mb-4" />
        <a href="https://www.elararchive.org/dk0298/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-sm font-semibold g-text g-violet">
          Listen to audio recordings at ELAR Archive ---
        </a>
      </div>
    </div>
  );
}
