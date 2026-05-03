'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function ProfilePage() {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: 'Chenkham',
    email: 'chenkham@example.com',
    bio: 'Language enthusiast and contributor to the Tai Khamyang dictionary.',
    location: 'Assam, India',
    joinedDate: 'January 2024',
  });
  const [editForm, setEditForm] = useState(profile);

  const handleSave = () => { setProfile(editForm); setIsEditing(false); };
  const handleCancel = () => { setEditForm(profile); setIsEditing(false); };

  return (
    <main className="mx-auto w-full max-w-[90rem] px-4 pt-20 pb-12 sm:pt-24 sm:px-6">
      <button onClick={() => router.push('/dictionary')} className="flex items-center gap-1.5 text-sm text-[var(--text-muted)] hover:text-[var(--text)] transition-colors mb-6">
        <ChevronLeft className="w-4 h-4" /> Back to Dictionary
      </button>

      {/* Demo notice */}
      <div className="relative pl-4 mb-8">
        <div className="absolute left-0 top-0.5 bottom-0.5 w-0.5 rounded-full bar-amber" />
        <p className="text-sm font-semibold mb-0.5">Demo Profile</p>
        <p className="text-[11px] text-[var(--text-light)]">This is a demo profile. User authentication will be added later.</p>
      </div>

      {/* Profile header */}
      <section className="mb-10 anim-fade-up">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-14 h-14 rounded-full flex items-center justify-center text-2xl font-heading font-bold g-text g-ocean border border-[var(--border)]">
            {profile.name.charAt(0)}
          </div>
          <div className="flex-1">
            {isEditing ? null : (
              <>
                <h1 className="font-heading text-xl font-bold">{profile.name}</h1>
                <p className="text-sm text-[var(--text-muted)]">{profile.email}</p>
              </>
            )}
          </div>
          {!isEditing && (
            <button onClick={() => setIsEditing(true)} className="btn-ocean text-white text-xs font-semibold px-3 py-1.5 rounded-md">
              Edit
            </button>
          )}
        </div>

        {isEditing ? (
          <div className="space-y-3">
            {[
              { label: 'Name', key: 'name' as const, type: 'text' },
              { label: 'Email', key: 'email' as const, type: 'email' },
              { label: 'Location', key: 'location' as const, type: 'text' },
            ].map((f) => (
              <div key={f.key}>
                <label className="text-[11px] font-semibold text-[var(--text-light)] uppercase tracking-wider">{f.label}</label>
                <input
                  type={f.type}
                  value={editForm[f.key]}
                  onChange={(e) => setEditForm({ ...editForm, [f.key]: e.target.value })}
                  className="mt-1 w-full bg-transparent border border-[var(--border)] rounded-md px-3 py-1.5 text-sm focus:outline-none focus:border-[#38BDF8]"
                />
              </div>
            ))}
            <div>
              <label className="text-[11px] font-semibold text-[var(--text-light)] uppercase tracking-wider">Bio</label>
              <textarea
                value={editForm.bio}
                onChange={(e) => setEditForm({ ...editForm, bio: e.target.value })}
                rows={2}
                className="mt-1 w-full bg-transparent border border-[var(--border)] rounded-md px-3 py-1.5 text-sm focus:outline-none focus:border-[#38BDF8]"
              />
            </div>
            <div className="flex gap-2 pt-1">
              <button onClick={handleCancel} className="text-xs font-semibold px-3 py-1.5 rounded-md border border-[var(--border)] text-[var(--text-muted)] hover:text-[var(--text)]">Cancel</button>
              <button onClick={handleSave} className="btn-ocean text-white text-xs font-semibold px-3 py-1.5 rounded-md">Save</button>
            </div>
          </div>
        ) : (
          <>
            <p className="text-sm text-[var(--text-muted)] mb-2">{profile.bio}</p>
            <div className="flex gap-4 text-[11px] text-[var(--text-light)]">
              <span>{profile.location}</span>
              <span>Joined {profile.joinedDate}</span>
            </div>
          </>
        )}
      </section>

      {/* Stats */}
      <section className="mb-10 anim-fade-up anim-delay-1">
        <div className="divider-ocean mb-1" />
        <div className="flex gap-8 py-3">
          <div>
            <div className="text-lg font-bold g-text g-ocean">12</div>
            <div className="text-[10px] uppercase tracking-wider text-[var(--text-light)]">Contributions</div>
          </div>
          <div>
            <div className="text-lg font-bold g-text g-rose">8</div>
            <div className="text-[10px] uppercase tracking-wider text-[var(--text-light)]">Favorites</div>
          </div>
          <div>
            <div className="text-lg font-bold g-text g-amber">5</div>
            <div className="text-[10px] uppercase tracking-wider text-[var(--text-light)]">Day Streak</div>
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="anim-fade-up anim-delay-2">
        <div className="divider-ocean mb-1" />
        {[
          { label: 'My Favorites', href: '/favorites' },
          { label: 'Browse Dictionary', href: '/dictionary' },
        ].map((link) => (
          <div key={link.href}>
            <button onClick={() => router.push(link.href)} className="flex items-center justify-between w-full py-3 row-hover rounded group">
              <span className="text-sm font-medium group-hover:text-[var(--text)] transition-colors">{link.label}</span>
              <ChevronRight className="w-3.5 h-3.5 text-[var(--text-light)] group-hover:translate-x-0.5 transition-transform" />
            </button>
            <div className="divider" />
          </div>
        ))}
      </section>
    </main>
  );
}
