import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Chants — Tai Khamyang Hub',
  description: 'Listen to and learn about Buddhist chants and recitations preserved by the Tai Khamyang community.',
};

export default function ChantsPage() {
  return (
    <div className="relative min-h-screen pt-20 sm:pt-28 pb-12 w-full">
      <div className="w-full max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero */}
        <section className="mb-14 sm:mb-20 anim-fade-up">
          <div className="flex items-center gap-2 mb-4">
            <div className="dot dot-violet" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--text-muted)]">Buddhist Recitations</span>
          </div>
          <h1 className="font-heading text-2xl sm:text-4xl font-bold tracking-tight leading-[1.1] mb-4">
            Sacred <span className="g-text g-violet">Chants</span>
          </h1>
          <p className="text-sm sm:text-base text-[var(--text-muted)] max-w-lg leading-relaxed">
            Authentic Pali recitations recorded from monks and elders. These sacred sounds carry centuries of spiritual heritage from Tai Khamyang monasteries.
          </p>
        </section>

        {/* Playlist */}
        <section className="mb-14 sm:mb-20 anim-fade-up anim-delay-1">
          <h2 className="font-heading text-lg font-bold mb-4">
            Chant <span className="g-text g-violet">Collection</span>
          </h2>
          <div className="divider-violet mb-1" />
          {[
            { title: 'Mangala Sutta', dur: '8:45', desc: 'The Discourse on Blessings — protective chant' },
            { title: 'Metta Sutta', dur: '6:30', desc: 'Loving-Kindness — universal compassion' },
            { title: 'Ratana Sutta', dur: '7:15', desc: 'The Jewel Discourse — Triple Gem' },
            { title: 'Karaniya Metta Sutta', dur: '5:50', desc: 'Extended loving-kindness meditation' },
            { title: 'Dhammacakkappavattana Sutta', dur: '9:10', desc: 'The First Sermon — wheel of Dharma' },
            { title: 'Parabhava Sutta', dur: '4:30', desc: 'Discourse on moral decline' },
          ].map((c, i, arr) => (
            <div key={c.title}>
              <div className="flex items-center justify-between py-3 row-hover rounded cursor-pointer group">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold g-text g-violet w-5">{i + 1}</span>
                  <div>
                    <div className="text-sm font-medium group-hover:text-[var(--text)] transition-colors">{c.title}</div>
                    <div className="text-[11px] text-[var(--text-light)]">{c.desc}</div>
                  </div>
                </div>
                <span className="text-[11px] text-[var(--text-light)]">{c.dur}</span>
              </div>
              {i < arr.length - 1 && <div className="divider" />}
            </div>
          ))}
        </section>

        {/* The Role of Chanting */}
        <section className="mb-14 sm:mb-20 space-y-5 anim-fade-up anim-delay-2">
          <div className="relative pl-4">
            <div className="absolute left-0 top-0.5 bottom-0.5 w-0.5 rounded-full bar-violet" />
            <h2 className="text-sm font-semibold mb-1">The Role of Chanting</h2>
            <p className="text-sm text-[var(--text-muted)] leading-relaxed">
              In Tai Khamyang tradition, chanting is a direct link to ancestral knowledge. Suttas are recited in Pali following specific patterns recorded in ancient manuscripts.
            </p>
          </div>
          <div className="relative pl-4">
            <div className="absolute left-0 top-0.5 bottom-0.5 w-0.5 rounded-full bar-ocean" />
            <h2 className="text-sm font-semibold mb-1">Monastery Practice</h2>
            <p className="text-sm text-[var(--text-muted)] leading-relaxed">
              Monks lead sessions at the kyong during festivals, funerals, and daily prayers. During the three-month Satang (monsoon fast), daily recitations are mandatory for monks and devout followers.
            </p>
          </div>
        </section>

        {/* Key Suttas */}
        <section className="anim-fade-up anim-delay-3">
          <div className="flex items-center gap-2 mb-4">
            <div className="dot dot-ocean" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--text-muted)]">Key Suttas</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {['Mangala Sutta', 'Metta Sutta', 'Ratana Sutta', 'Karaniya Metta', 'Dhammacakkappavattana', 'Parabhava Sutta'].map((s) => (
              <span key={s} className="text-xs font-medium text-[var(--text-muted)] border border-white/[0.08] px-2.5 py-1 rounded-md">{s}</span>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
