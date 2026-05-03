import type { Metadata } from 'next';
import { getVillages } from '@/lib/content';
import { MapPin } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Villages — Tai Khamyang Hub',
  description: 'Directory of Tai Khamyang villages across Assam and Arunachal Pradesh — monasteries, population, and history.',
};

export default async function VillagesPage() {
  const villages = await getVillages();

  // Group by state
  const byState = villages.reduce<Record<string, typeof villages>>((acc, v) => {
    (acc[v.state] = acc[v.state] || []).push(v);
    return acc;
  }, {});

  return (
    <div className="relative min-h-screen pt-20 sm:pt-28 pb-12 w-full">
      <div className="w-full max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8">
        <section className="mb-10 sm:mb-14 anim-fade-up">
          <div className="flex items-center gap-2 mb-4">
            <div className="dot dot-green" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--text-muted)]">Settlement Directory</span>
          </div>
          <h1 className="font-heading text-2xl sm:text-4xl font-bold tracking-tight leading-[1.1] mb-4">
            Khamyang <span className="g-text g-green">Villages</span>
          </h1>
          <p className="text-sm sm:text-base text-[var(--text-muted)] max-w-lg leading-relaxed">
            The Tai Khamyang are settled across four districts of Upper Assam and parts of Arunachal Pradesh. Every village is organized around a central kyong (monastery).
          </p>
        </section>

        {/* Stats */}
        <section className="mb-10 anim-fade-up anim-delay-1">
          <div className="flex flex-wrap gap-x-8 gap-y-3">
            <div>
              <div className="text-lg font-bold g-text g-green">{villages.length}</div>
              <div className="text-[10px] uppercase tracking-wider text-[var(--text-light)]">Settlements</div>
            </div>
            <div>
              <div className="text-lg font-bold g-text g-ocean">4</div>
              <div className="text-[10px] uppercase tracking-wider text-[var(--text-light)]">Districts</div>
            </div>
            <div>
              <div className="text-lg font-bold g-text g-amber">2</div>
              <div className="text-[10px] uppercase tracking-wider text-[var(--text-light)]">States</div>
            </div>
          </div>
        </section>

        {Object.entries(byState).map(([state, stateVillages], si) => (
          <section key={state} className={`mb-12 sm:mb-16 anim-fade-up anim-delay-${Math.min(si + 2, 5)}`}>
            <div className="flex items-center gap-2 mb-3">
              <div className={`dot ${si === 0 ? 'dot-jade' : 'dot-violet'}`} />
              <h2 className="font-heading text-lg font-bold">{state}</h2>
            </div>
            <div className={`divider-${si === 0 ? 'jade' : 'violet'} mb-1`} />
            {stateVillages.map((v, i) => (
              <div key={v.id}>
                <div className="py-3 px-1 row-hover rounded-md">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-[var(--text-light)] shrink-0 mt-0.5" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-0.5">
                        <span className="text-sm font-semibold">{v.name}</span>
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-[var(--surface)] text-[var(--text-light)]">{v.district}</span>
                        {v.population && <span className="text-[10px] text-[var(--text-light)]">Pop: {v.population}</span>}
                      </div>
                      <p className="text-[12px] text-[var(--text-muted)] leading-relaxed">{v.description}</p>
                      {v.monastery && (
                        <p className="text-[11px] text-[var(--text-light)] mt-1 flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#D97706] inline-block" /> {v.monastery}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
                {i < stateVillages.length - 1 && <div className="divider" />}
              </div>
            ))}
          </section>
        ))}

        <div className="divider-green mt-4 mb-4" />
        <p className="text-xs text-[var(--text-light)]">
          Coordinates are approximate. Village data can be updated via database, Google Sheets, or API integration.
        </p>
      </div>
    </div>
  );
}
