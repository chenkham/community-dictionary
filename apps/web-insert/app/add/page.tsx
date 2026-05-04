'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { z } from 'zod';
import { Plus, Loader2, CheckCircle2, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { createWord, type CreateWordInput, type Word } from '@/lib/api';
import { useToast } from '@/components/Toast';

// Mirror of apps/api/src/lib/validation.ts (createWordSchema)
const schema = z.object({
  tai_khamyang_word: z.string().trim().min(1, 'Tai Khamyang word is required'),
  english_word: z.string().trim().min(1, 'English word is required'),
  assamese_word: z.string().trim().min(1, 'Assamese word is required'),
  pronunciation: z.string().trim().optional(),
  audio_url: z
    .string()
    .trim()
    .url('Must be a valid URL (or leave blank)')
    .optional()
    .or(z.literal('')),
});

type FormState = z.input<typeof schema>;
type FieldErrors = Partial<Record<keyof FormState, string>>;

const empty: FormState = {
  tai_khamyang_word: '',
  english_word: '',
  assamese_word: '',
  pronunciation: '',
  audio_url: '',
};

export default function AddWordPage() {
  const router = useRouter();
  const qc = useQueryClient();
  const toast = useToast();

  const [form, setForm] = useState<FormState>(empty);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [lastAdded, setLastAdded] = useState<Word | null>(null);

  const mutation = useMutation({
    mutationFn: (input: CreateWordInput) => createWord(input),
    onSuccess: (created) => {
      toast.push('success', `Added "${created.tai_khamyang_word}"`);
      qc.invalidateQueries({ queryKey: ['words'] });
      setLastAdded(created);
      setForm(empty);
      setErrors({});
    },
    onError: (err: Error) => {
      toast.push('error', err.message || 'Failed to add word');
    },
  });

  const onChange = (key: keyof FormState, value: string) => {
    setForm((f) => ({ ...f, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      const flat: FieldErrors = {};
      for (const issue of parsed.error.issues) {
        const k = issue.path[0] as keyof FormState;
        flat[k] = issue.message;
      }
      setErrors(flat);
      return;
    }
    mutation.mutate(parsed.data as CreateWordInput);
  };

  return (
    <div className="mx-auto w-full max-w-2xl px-5 sm:px-7 pt-8 pb-12">
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--text-muted)] hover:text-[var(--text)] mb-4 transition-colors"
      >
        <ArrowLeft className="w-3.5 h-3.5" /> Back to dashboard
      </Link>

      <section className="mb-7 anim-fade-up">
        <div className="flex items-center gap-2 mb-2">
          <div className="dot dot-ocean" />
          <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--text-muted)]">
            New Entry
          </span>
        </div>
        <h1 className="font-heading text-2xl sm:text-3xl font-bold mb-1">
          Add a <span className="g-text g-ocean">Word</span>
        </h1>
        <p className="text-sm text-[var(--text-muted)]">
          Provide the trilingual entry. Pronunciation and audio are optional.
        </p>
      </section>

      <form onSubmit={onSubmit} className="card space-y-5 anim-fade-up anim-delay-1" noValidate>
        <div>
          <label htmlFor="tai" className="field-label">
            Tai Khamyang Word <span className="text-red-500">*</span>
          </label>
          <input
            id="tai"
            type="text"
            className="field"
            placeholder="e.g. nam"
            value={form.tai_khamyang_word}
            onChange={(e) => onChange('tai_khamyang_word', e.target.value)}
            autoFocus
          />
          {errors.tai_khamyang_word && (
            <p className="field-error">{errors.tai_khamyang_word}</p>
          )}
        </div>

        <div>
          <label htmlFor="en" className="field-label">
            English Translation <span className="text-red-500">*</span>
          </label>
          <input
            id="en"
            type="text"
            className="field"
            placeholder="e.g. water"
            value={form.english_word}
            onChange={(e) => onChange('english_word', e.target.value)}
          />
          {errors.english_word && (
            <p className="field-error">{errors.english_word}</p>
          )}
        </div>

        <div>
          <label htmlFor="as" className="field-label">
            Assamese Translation <span className="text-red-500">*</span>
          </label>
          <input
            id="as"
            type="text"
            className="field"
            placeholder="e.g. পানী"
            value={form.assamese_word}
            onChange={(e) => onChange('assamese_word', e.target.value)}
            lang="as"
          />
          {errors.assamese_word && (
            <p className="field-error">{errors.assamese_word}</p>
          )}
        </div>

        <div className="divider" />

        <div>
          <label htmlFor="pron" className="field-label">
            Pronunciation (IPA or romanised)
          </label>
          <input
            id="pron"
            type="text"
            className="field"
            placeholder="e.g. nam˧"
            value={form.pronunciation || ''}
            onChange={(e) => onChange('pronunciation', e.target.value)}
          />
          <p className="field-hint">Optional — helps learners pronounce the word.</p>
          {errors.pronunciation && <p className="field-error">{errors.pronunciation}</p>}
        </div>

        <div>
          <label htmlFor="audio" className="field-label">
            Audio URL
          </label>
          <input
            id="audio"
            type="url"
            className="field"
            placeholder="https://example.com/audio.mp3"
            value={form.audio_url || ''}
            onChange={(e) => onChange('audio_url', e.target.value)}
          />
          <p className="field-hint">Optional — must be a valid URL if provided.</p>
          {errors.audio_url && <p className="field-error">{errors.audio_url}</p>}
        </div>

        <div className="flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between gap-3 pt-1">
          <button
            type="button"
            onClick={() => {
              setForm(empty);
              setErrors({});
            }}
            disabled={mutation.isPending}
            className="text-sm font-semibold px-4 py-2.5 rounded-lg border border-[var(--border)] text-[var(--text-muted)] hover:text-[var(--text)] hover:border-[var(--border-strong)] transition-colors"
          >
            Reset
          </button>

          <div className="flex flex-col sm:flex-row gap-2">
            <button
              type="submit"
              disabled={mutation.isPending}
              className="btn-ocean inline-flex items-center justify-center gap-2 text-sm font-semibold px-5 py-2.5 rounded-lg shadow-sm"
            >
              {mutation.isPending ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Saving…
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4" />
                  Add Word
                </>
              )}
            </button>
          </div>
        </div>
      </form>

      {/* Last added recap */}
      {lastAdded && (
        <div className="card mt-6 !bg-emerald-50/70 border-emerald-200 anim-fade-up">
          <div className="flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <div className="flex-1 min-w-0">
              <div className="text-sm font-semibold text-emerald-900 mb-1">
                Successfully added
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs text-emerald-900/80">
                <div>
                  <div className="text-[10px] uppercase tracking-wider opacity-70">Tai Khamyang</div>
                  <div className="font-semibold">{lastAdded.tai_khamyang_word}</div>
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-wider opacity-70">English</div>
                  <div className="font-semibold">{lastAdded.english_word}</div>
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-wider opacity-70">Assamese</div>
                  <div className="font-semibold">{lastAdded.assamese_word}</div>
                </div>
              </div>
              <div className="flex gap-2 mt-3">
                <button
                  onClick={() => setLastAdded(null)}
                  className="text-xs font-semibold text-emerald-800 hover:text-emerald-900 px-3 py-1.5 rounded border border-emerald-300/70 hover:bg-emerald-100/40 transition-colors"
                >
                  Add another
                </button>
                <button
                  onClick={() => router.push('/manage')}
                  className="text-xs font-semibold text-emerald-800 hover:text-emerald-900 px-3 py-1.5 rounded transition-colors"
                >
                  View in manager →
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
