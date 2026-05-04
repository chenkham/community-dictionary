import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Traditions --- Tai Khamyang Hub',
  description: 'Explore the living traditions of the Tai Khamyang community: Chang Ghor houses, handloom weaving, and Theravada practices.',
};

export default function TraditionsPage() {
  return (
    <div className="relative min-h-screen pt-20 sm:pt-28 pb-12 w-full">
      <div className="w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Hero */}
        <section className="mb-14 sm:mb-20 anim-fade-up">
          <div className="flex items-center gap-2 mb-4">
            <div className="dot dot-rose" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--text-muted)]">Heritage &amp; Lifestyle</span>
          </div>
          <h1 className="font-heading text-2xl sm:text-4xl font-bold tracking-tight leading-[1.1] mb-4">
            Traditions &amp; <span className="g-text g-rose">Living Culture</span>
          </h1>
          <p className="text-sm sm:text-base text-[var(--text-muted)] max-w-lg leading-relaxed mb-2">
            A rich tapestry of traditions rooted in Theravada Buddhism and the Tai way of life --- from sacred rituals and handwoven textiles to stilt-house architecture.
          </p>
          <p className="text-sm text-[var(--text-light)] max-w-lg leading-relaxed">
            Community living is central to Khamyang identity. As one elder said: &ldquo;Having wandered together for ages, community living is very significant for us.&rdquo;
          </p>
        </section>

        {/* Traditions list */}
        <section className="mb-14 sm:mb-20 anim-fade-up anim-delay-1">
          <div className="space-y-5">
            {[
              { title: 'Rituals & Ceremonies', desc: 'Birth naming, coming-of-age, marriage customs, and funeral rites define the spiritual arc of Tai Khamyang life. The Bhante decides auspicious days for cremation. The community gathers at the kyong for collective prayers.', bar: 'bar-violet' },
              { title: 'Weaving & Textiles', desc: 'Women weave on unique 2-foot handlooms (taat-xaal), producing intricate flower-patterned fabrics. Key garments: chin (long skirt), pha-lung (hip wrap), pha-mai (shawl), and chyu (towel).', bar: 'bar-rose' },
              { title: 'Food & Cuisine', desc: 'Steamed sticky rice central to every meal. Traditional preparations include fermented bamboo shoots, dried fish, and elaborate festival foods --- special sweets and rice cakes for Poi Sangken.', bar: 'bar-amber' },
              { title: 'Chang Ghor (Stilt Houses)', desc: 'Built on stilts with the main living area, a granary for storing rice, and a space under the house for weaving looms. Architecture protects against monsoon flooding.', bar: 'bar-jade' },
              { title: "Women's Equal Status", desc: 'Women hold remarkably equal status --- master weavers, household managers, active in community decisions. Marriage is by mutual consent with community blessing.', bar: 'bar-ember' },
              { title: 'Community Life', desc: 'Village life centers on the kyong (monastery). Phi-hon (house deity) worship coexists with Buddhism --- reflecting the animist heritage of the Tai people.', bar: 'bar-ocean' },
              { title: 'Marriage Customs', desc: "Both matrilocal and patrilocal residence practiced. Ceremonies involve the Bhante's blessing, community feasting, and elders' blessings by pouring water on hands.", bar: 'bar-green' },
              { title: 'Death Rituals', desc: 'Cremation on an auspicious day chosen by the Bhante. Merit-making ceremonies on the 7th and 49th day after death, following Theravada Buddhist custom.', bar: 'bar-violet' },
            ].map((t) => (
              <div key={t.title} className="relative pl-4">
                <div className={`absolute left-0 top-0.5 bottom-0.5 w-0.5 rounded-full ${t.bar}`} />
                <h3 className="text-sm font-semibold mb-0.5">{t.title}</h3>
                <p className="text-sm text-[var(--text-muted)] leading-relaxed">{t.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="anim-fade-up anim-delay-2">
          <div className="divider-rose mb-5" />
          <h2 className="font-heading text-lg font-bold mb-2">Living <span className="g-text g-rose">Heritage</span></h2>
          <p className="text-sm text-[var(--text-muted)] mb-4 max-w-md">
            A growing archive. As we collect stories, photographs, and recordings, it will document the living culture of the Tai Khamyang people.
          </p>
          <Link href="/community" className="inline-flex items-center gap-1.5 text-sm font-semibold g-text g-green group">
            Explore Community <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </section>
      </div>
    </div>
  );
}
