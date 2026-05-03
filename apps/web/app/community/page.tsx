import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Community — Tai Khamyang Hub',
  description: 'Meet the Tai Khamyang community: villages, notable people, and the living memory of a Theravada Buddhist community in Assam.',
};

export default function CommunityPage() {
  return (
    <div className="relative min-h-screen pt-20 sm:pt-28 pb-12 w-full">
      <div className="w-full max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero */}
        <section className="mb-14 sm:mb-20 anim-fade-up">
          <div className="flex items-center gap-2 mb-4">
            <div className="dot dot-green" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--text-muted)]">Community Hub</span>
          </div>
          <h1 className="font-heading text-2xl sm:text-4xl font-bold tracking-tight leading-[1.1] mb-4">
            People, Places &amp; <span className="g-text g-green">Living Memory</span>
          </h1>
          <p className="text-sm sm:text-base text-[var(--text-muted)] max-w-lg leading-relaxed mb-2">
            The Tai Khamyang community is spread across Assam and Arunachal Pradesh, with each village maintaining its own monastery and cultural identity.
          </p>
          <p className="text-sm text-[var(--text-light)] max-w-lg leading-relaxed">
            ~7,000 people living primarily in Jorhat, Sivasagar, Tinsukia, and Golaghat districts. A strong collective identity through shared Buddhist faith.
          </p>
        </section>

        {/* Villages */}
        <section className="mb-14 sm:mb-20 anim-fade-up anim-delay-1">
          <div className="flex items-center gap-2 mb-4">
            <div className="dot dot-jade" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--text-muted)]">Villages</span>
          </div>
          <h2 className="font-heading text-lg font-bold mb-4">
            Khamyang <span className="g-text g-jade">Villages</span>
          </h2>
          <div className="divider-jade mb-1" />
          {[
            { name: 'Chalapathar Shyam Gaon', dist: 'Sivasagar', note: 'Oldest monastery (150+ years)' },
            { name: 'Na Shyam Gaon', dist: 'Jorhat', note: 'Active Pali school' },
            { name: 'Betbari Shyam Gaon', dist: 'Jorhat', note: 'Elder manuscript collection' },
            { name: 'Pawaimukh', dist: 'Tinsukia', note: 'Festival coordination center' },
            { name: 'Borahi Shyam Gaon', dist: 'Golaghat', note: 'Traditional stilt houses' },
            { name: 'Rajmai', dist: 'Jorhat', note: 'Cultural organizations nearby' },
            { name: 'Namsai Area', dist: 'Arunachal Pradesh', note: 'Connected to Khamti communities' },
            { name: 'Powai Area', dist: 'Tinsukia', note: 'River-side monastery settlement' },
          ].map((v, i, arr) => (
            <div key={v.name}>
              <div className="flex items-center justify-between py-2.5">
                <div>
                  <span className="text-sm font-semibold">{v.name}</span>
                  <span className="text-[11px] text-[var(--text-light)] ml-2">{v.dist}</span>
                </div>
                <span className="text-[11px] text-[var(--text-light)]">{v.note}</span>
              </div>
              {i < arr.length - 1 && <div className="divider" />}
            </div>
          ))}
        </section>

        {/* Focus Areas */}
        <section className="mb-14 sm:mb-20 anim-fade-up anim-delay-2">
          <div className="space-y-5">
            {[
              { title: 'Elders & Contributors', desc: 'Oral historians, language speakers, monks, and cultural knowledge-keepers who preserve living memory.', bar: 'bar-amber' },
              { title: 'Media & Stories', desc: 'Photo essays, video documentaries, and recorded interviews capturing the Khamyang way of life.', bar: 'bar-rose' },
              { title: 'Future Roadmap', desc: 'Digitization goals, youth involvement, field visits, language classes, and preservation plans.', bar: 'bar-ocean' },
              { title: 'Cultural Organizations', desc: 'Groups like the Tai Khamyang Development Council working for cultural revival and community welfare.', bar: 'bar-green' },
            ].map((f) => (
              <div key={f.title} className="relative pl-4">
                <div className={`absolute left-0 top-0.5 bottom-0.5 w-0.5 rounded-full ${f.bar}`} />
                <h3 className="text-sm font-semibold mb-0.5">{f.title}</h3>
                <p className="text-sm text-[var(--text-muted)] leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Quote */}
        <section className="anim-fade-up anim-delay-3">
          <div className="relative pl-4 mb-6">
            <div className="absolute left-0 top-0 bottom-0 w-0.5 rounded-full bar-green" />
            <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--text-light)] mb-2">Community Voice</div>
            <blockquote className="font-heading text-base sm:text-lg italic leading-relaxed mb-2">
              &ldquo;Language becomes stronger when people, place, and memory stay visible. Our villages are not just locations — they are living archives of who we are.&rdquo;
            </blockquote>
          </div>
          <Link href="/about" className="inline-flex items-center gap-1.5 text-sm font-semibold g-text g-ocean group">
            Learn our full story <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </section>
      </div>
    </div>
  );
}
