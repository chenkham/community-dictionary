'use client';

// Lightweight passcode gate. Not real auth — just a shared secret stored in
// localStorage. Configure the passcode via NEXT_PUBLIC_MEMBER_PASSCODE.
//
// For production, replace this with a real auth provider (Supabase Auth,
// Clerk, NextAuth, etc.) — this layer is intentionally tiny so it stays out
// of the way until the team is ready to harden it.

import { useEffect, useState } from 'react';
import { Lock, KeyRound } from 'lucide-react';

const STORAGE_KEY = 'web-insert.memberToken';
const EXPECTED_PASSCODE =
  process.env.NEXT_PUBLIC_MEMBER_PASSCODE || 'khamyang2025';

export default function MemberGate({ children }: { children: React.ReactNode }) {
  const [unlocked, setUnlocked] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const [input, setInput] = useState('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const stored =
      typeof window !== 'undefined'
        ? window.localStorage.getItem(STORAGE_KEY)
        : null;
    if (stored && stored === EXPECTED_PASSCODE) {
      setUnlocked(true);
    }
    setHydrated(true);
  }, []);

  if (!hydrated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="skeleton w-32 h-4" />
      </div>
    );
  }

  if (unlocked) {
    return <>{children}</>;
  }

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() === EXPECTED_PASSCODE) {
      window.localStorage.setItem(STORAGE_KEY, input.trim());
      setUnlocked(true);
      setError(null);
    } else {
      setError('Wrong passcode. Please try again or contact a moderator.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-5">
      <div className="card w-full max-w-md anim-fade-up">
        <div className="flex flex-col items-center text-center mb-5">
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-md mb-4"
            style={{ background: 'linear-gradient(135deg, #0891B2, #0E7490)' }}
          >
            <Lock className="w-6 h-6 text-white" />
          </div>
          <h1 className="font-heading text-2xl font-bold mb-1">
            Members <span className="g-text g-ocean">Only</span>
          </h1>
          <p className="text-sm text-[var(--text-muted)] max-w-xs">
            Enter the member passcode to add or manage dictionary entries.
          </p>
        </div>

        <form onSubmit={submit} className="space-y-4">
          <div>
            <label className="field-label" htmlFor="passcode">
              Passcode
            </label>
            <div className="relative">
              <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-light)]" />
              <input
                id="passcode"
                type="password"
                autoFocus
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Enter passcode"
                className="field pl-9"
                autoComplete="off"
              />
            </div>
            {error && <p className="field-error">{error}</p>}
          </div>

          <button
            type="submit"
            disabled={!input.trim()}
            className="btn-ocean w-full py-2.5 rounded-lg font-semibold text-sm shadow-sm"
          >
            Unlock
          </button>
        </form>

        <p className="text-[11px] text-[var(--text-light)] mt-5 text-center leading-relaxed">
          Don&apos;t have a passcode? Ask a project moderator.
          <br />
          The passcode is stored locally on this device.
        </p>
      </div>
    </div>
  );
}
