'use client';

import { useEffect, useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { z } from 'zod';
import { Loader2, X, Save } from 'lucide-react';
import { updateWord, type UpdateWordInput, type Word } from '@/lib/api';
import { useToast } from '@/components/Toast';

const schema = z.object({
  tai_khamyang_word: z.string().trim().min(1),
  english_word: z.string().trim().min(1),
  assamese_word: z.string().trim().min(1),
  pronunciation: z.string().trim().optional(),
  audio_url: z.string().trim().url().optional().or(z.literal('')),
});

interface Props {
  word: Word;
  onClose: () => void;
}

export default function EditWordModal({ word, onClose }: Props) {
  const qc = useQueryClient();
  const toast = useToast();
  const [form, setForm] = useState({
    tai_khamyang_word: word.tai_khamyang_word,
    english_word: word.english_word,
    assamese_word: word.assamese_word,
    pronunciation: word.pronunciation || '',
    audio_url: word.audio_url || '',
  });
  const [errors, setErrors] = useState<Partial<Record<keyof typeof form, string>>>({});

  // Close on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  const mutation = useMutation({
    mutationFn: (input: UpdateWordInput) => updateWord(word.id, input),
    onSuccess: (updated) => {
      toast.push('success', `Updated "${updated.tai_khamyang_word}"`);
      qc.invalidateQueries({ queryKey: ['words'] });
      onClose();
    },
    onError: (err: Error) => {
      toast.push('error', err.message || 'Update failed');
    },
  });

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      const flat: Partial<Record<keyof typeof form, string>> = {};
      for (const issue of parsed.error.issues) {
        flat[issue.path[0] as keyof typeof form] = issue.message;
      }
      setErrors(flat);
      return;
    }
    // strip empty optional strings before sending
    const payload: UpdateWordInput = {
      tai_khamyang_word: parsed.data.tai_khamyang_word,
      english_word: parsed.data.english_word,
      assamese_word: parsed.data.assamese_word,
    };
    if (parsed.data.pronunciation) payload.pronunciation = parsed.data.pronunciation;
    if (parsed.data.audio_url) payload.audio_url = parsed.data.audio_url;
    mutation.mutate(payload);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
      role="dialog"
      aria-modal="true"
    >
      <div
        className="absolute inset-0 bg-[#0F2027]/40 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative card w-full max-w-lg max-h-[90vh] overflow-y-auto anim-fade-up !p-0 !bg-white">
        <div className="flex items-center justify-between px-5 py-4 border-b border-[var(--border)]">
          <div>
            <div className="text-[10px] uppercase tracking-wider text-[var(--text-light)] mb-0.5">
              Editing
            </div>
            <h2 className="font-heading text-lg font-bold">Edit word</h2>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-[var(--bg-soft)] text-[var(--text-muted)] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={onSubmit} className="px-5 py-5 space-y-4" noValidate>
          <div>
            <label className="field-label">Tai Khamyang</label>
            <input
              className="field"
              value={form.tai_khamyang_word}
              onChange={(e) => setForm({ ...form, tai_khamyang_word: e.target.value })}
              autoFocus
            />
            {errors.tai_khamyang_word && <p className="field-error">{errors.tai_khamyang_word}</p>}
          </div>

          <div>
            <label className="field-label">English</label>
            <input
              className="field"
              value={form.english_word}
              onChange={(e) => setForm({ ...form, english_word: e.target.value })}
            />
            {errors.english_word && <p className="field-error">{errors.english_word}</p>}
          </div>

          <div>
            <label className="field-label">Assamese</label>
            <input
              className="field"
              lang="as"
              value={form.assamese_word}
              onChange={(e) => setForm({ ...form, assamese_word: e.target.value })}
            />
            {errors.assamese_word && <p className="field-error">{errors.assamese_word}</p>}
          </div>

          <div className="divider" />

          <div>
            <label className="field-label">Pronunciation</label>
            <input
              className="field"
              value={form.pronunciation}
              onChange={(e) => setForm({ ...form, pronunciation: e.target.value })}
            />
          </div>

          <div>
            <label className="field-label">Audio URL</label>
            <input
              type="url"
              className="field"
              value={form.audio_url}
              onChange={(e) => setForm({ ...form, audio_url: e.target.value })}
            />
            {errors.audio_url && <p className="field-error">{errors.audio_url}</p>}
          </div>

          <div className="flex justify-end gap-2 pt-1">
            <button
              type="button"
              onClick={onClose}
              disabled={mutation.isPending}
              className="text-sm font-semibold px-4 py-2 rounded-lg border border-[var(--border)] text-[var(--text-muted)] hover:text-[var(--text)] transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={mutation.isPending}
              className="btn-ocean inline-flex items-center gap-2 text-sm font-semibold px-4 py-2 rounded-lg"
            >
              {mutation.isPending ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" /> Saving…
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" /> Save changes
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
