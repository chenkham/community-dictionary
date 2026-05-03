import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Festivals — Tai Khamyang Hub',
  description: 'Discover the annual festivals and celebrations of the Tai Khamyang Theravada Buddhist community.',
};

export default function FestivalsPage() {
  return (
    <div className="relative min-h-screen pt-20 sm:pt-28 pb-12 w-full">
      <div className="w-full max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero */}
        <section className="mb-14 sm:mb-20 anim-fade-up">
          <div className="flex items-center gap-2 mb-4">
            <div className="dot dot-fire" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--text-muted)]">Annual Calendar</span>
          </div>
          <h1 className="font-heading text-2xl sm:text-4xl font-bold tracking-tight leading-[1.1] mb-4">
            Festivals &amp; <span className="g-text g-fire">Celebrations</span>
          </h1>
          <p className="text-sm sm:text-base text-[var(--text-muted)] max-w-lg leading-relaxed mb-5">
            Most Khamyang festivals are linked to Theravada Buddhism and the lunar calendar. From water festivals to sacred full moons, the year is alive with devotion, community, and tradition.
          </p>

          {/* Featured — Poi Sangken inline */}
          <div className="flex gap-6 mb-2">
            <div>
              <div className="text-lg font-bold g-text g-fire">3</div>
              <div className="text-[10px] uppercase tracking-wider text-[var(--text-light)]">Days</div>
            </div>
            <div>
              <div className="text-lg font-bold g-text g-amber">8+</div>
              <div className="text-[10px] uppercase tracking-wider text-[var(--text-light)]">Villages</div>
            </div>
            <div>
              <div className="text-lg font-bold g-text g-ocean">All</div>
              <div className="text-[10px] uppercase tracking-wider text-[var(--text-light)]">Kyongs</div>
            </div>
          </div>
          <p className="text-[11px] text-[var(--text-light)]">Poi Sangken · April 14–16 · Water festival across all monasteries</p>
        </section>

        {/* All Festivals */}
        <section className="mb-14 sm:mb-20 anim-fade-up anim-delay-1">
          <h2 className="font-heading text-lg font-bold mb-2">
            All Festivals &amp; <span className="g-text g-fire">Observances</span>
          </h2>
          <p className="text-sm text-[var(--text-muted)] mb-5">Following the Tai Buddhist ponjika from Mandalay, aligned with lunar cycles.</p>

          <div className="space-y-5">
            {[
              { name: 'Poi Sangken', time: 'Mid-April', desc: 'Water festival of renewal. Buddha statues bathed with scented water. On the closing day, people splash water to wash away enmity and sin.', bar: 'bar-ocean' },
              { name: 'Maikung-Sungphai', time: 'Jan–Feb', desc: 'Meji (bonfire) burned in remembrance of Buddha\'s announcement. Called "Ayux Khyoy din" — reflects impermanence.', bar: 'bar-amber' },
              { name: 'Buddha Purnima', time: 'Apr–May', desc: 'Marks birth, enlightenment, and passing of Lord Buddha. Devotional activities across all monasteries.', bar: 'bar-jade' },
              { name: 'Phaguni Purnima', time: 'Feb–Mar', desc: 'Commemorates Buddha returning to his kingdom to spread the dharma. A day of teaching and reflection.', bar: 'bar-violet' },
              { name: 'Barsha Bash (Satang)', time: 'Jun–Oct', desc: 'Three-month monsoon fast. Daily monastery visits for prayer. "Satang Khaw Wa" to "Satang Akwa."', bar: 'bar-green' },
              { name: 'Poi Kathin Sivara', time: 'Post-Monsoon', desc: 'Robe-offering ceremony after the fast. Community offers new robes and essentials to monks.', bar: 'bar-rose' },
              { name: 'Poi Patesa (Kalpataru)', time: 'Varies', desc: 'Collective offerings at the monastery — the spirit of the wish-fulfilling tree of Buddhist lore.', bar: 'bar-ember' },
              { name: 'Poi Lu Kyong', time: 'Varies', desc: 'Monastery maintenance, special prayers, and collective spiritual practice reinforcing the kyong\'s central role.', bar: 'bar-ocean' },
            ].map((f) => (
              <div key={f.name} className="relative pl-4">
                <div className={`absolute left-0 top-0.5 bottom-0.5 w-0.5 rounded-full ${f.bar}`} />
                <div className="flex items-baseline gap-2 mb-0.5">
                  <h3 className="text-sm font-semibold">{f.name}</h3>
                  <span className="text-[11px] text-[var(--text-light)]">{f.time}</span>
                </div>
                <p className="text-sm text-[var(--text-muted)] leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
