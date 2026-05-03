import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, BookOpenText, CalendarDays, ChevronRight, GraduationCap, Library, MapPin, Music, Newspaper, ScrollText, Sparkles, UtensilsCrossed, Users, Image } from 'lucide-react';
import { getImportantWords, getNews } from '@/lib/content';
import WordTicker from '@/components/WordTicker';
import WordOfTheDay from '@/components/WordOfTheDay';
import HomeNews from '@/components/HomeNews';

export const metadata: Metadata = {
  title: 'Tai Khamyang Hub — People of Gold',
  description: 'A digital sanctuary preserving the language, sacred manuscripts, Buddhist chants, and living heritage of the Tai Khamyang community.',
  openGraph: { title: 'Tai Khamyang Hub', description: 'Preserving the Tai Khamyang language and Buddhist heritage of Northeast India.' },
};

export default async function Home() {
  const [importantWords, newsItems] = await Promise.all([getImportantWords(), getNews()]);

  return (
    <div className="relative min-h-screen pt-20 sm:pt-28 pb-12 w-full">
      {/* ── Hero ── */}
      <section className="w-full max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-12 xl:px-20 mb-10 sm:mb-16 anim-fade-up">
        <div className="flex items-center gap-2 mb-5">
          <div className="dot dot-ocean" />
          <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--text-muted)]">Living Heritage Portal</span>
        </div>

        <h1 className="font-heading text-3xl sm:text-5xl font-bold tracking-tight leading-[1.1] mb-4">
          Khamyang —{' '}
          <span className="g-text g-ocean">People of Gold</span>
        </h1>

        <p className="text-sm sm:text-base text-[var(--text-muted)] max-w-lg leading-relaxed mb-6">
          A digital sanctuary preserving the language, sacred manuscripts, Buddhist chants, and living heritage of the Tai Khamyang community.
        </p>

        <div className="flex gap-3 mb-10">
          <Link href="/dictionary" className="btn-ocean text-white text-sm font-semibold px-4 py-2 rounded-md flex items-center gap-2">
            Explore Dictionary <ArrowRight className="w-3.5 h-3.5" />
          </Link>
          <Link href="/about" className="text-sm font-semibold px-4 py-2 rounded-md border border-[var(--border)] text-[var(--text-muted)] hover:text-[var(--text)] transition-colors">
            Our Story
          </Link>
        </div>

        {/* Stats — simple text row */}
        <div className="flex flex-wrap gap-x-8 gap-y-3">
          {[
            { v: '~7,000', l: 'Population' },
            { v: '~15', l: 'Speakers Left' },
            { v: '10+', l: 'Villages' },
            { v: '600+', l: 'Years of Heritage' },
          ].map((s) => (
            <div key={s.l}>
              <div className="text-lg font-bold g-text g-ocean">{s.v}</div>
              <div className="text-[10px] uppercase tracking-wider text-[var(--text-light)]">{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Word Ticker ── */}
      <section className="w-full mb-10 sm:mb-16 anim-fade-up anim-delay-1">
        <div className="border-y border-[var(--border)] bg-[var(--bg-soft)]">
          <WordTicker words={importantWords} />
        </div>
      </section>

      {/* ── Word of the Day ── */}
      <section className="w-full max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-12 xl:px-20 mb-16 sm:mb-24 anim-fade-up anim-delay-1">
        <WordOfTheDay />
      </section>

      {/* ── Explore Navigation ── */}
      <section className="w-full max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-12 xl:px-20 mb-16 sm:mb-24 anim-fade-up anim-delay-1">
        <div className="flex items-center gap-2 mb-4">
          <div className="dot dot-jade" />
          <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--text-muted)]">Explore</span>
        </div>

        <h2 className="font-heading text-xl sm:text-2xl font-bold mb-1">
          Discover Our <span className="g-text g-jade">Heritage</span>
        </h2>
        <p className="text-sm text-[var(--text-muted)] mb-5">Language, faith, festivals, and traditions of the Tai Khamyang community.</p>

        <div className="divider-jade mb-1" />
        {[
          { icon: BookOpenText, label: 'Dictionary', desc: 'Search across Tai Khamyang, English & Assamese', href: '/dictionary', grad: 'g-ocean' },
          { icon: Library, label: 'Sacred Manuscripts', desc: 'Palm-leaf folios and monastery records', href: '/manuscripts', grad: 'g-amber' },
          { icon: Music, label: 'Buddhist Chants', desc: 'Audio recitations from monks and elders', href: '/chants', grad: 'g-violet' },
          { icon: CalendarDays, label: 'Festivals', desc: 'Poi Sangken, Maikung-Sungphai & more', href: '/festivals', grad: 'g-fire' },
          { icon: Sparkles, label: 'Traditions', desc: 'Stilt houses, weaving, rituals & food', href: '/traditions', grad: 'g-rose' },
          { icon: Users, label: 'Community', desc: 'Villages, monasteries & elder stories', href: '/community', grad: 'g-green' },
          { icon: GraduationCap, label: 'Learn Language', desc: 'Words, phrases, numbers & greetings', href: '/learn', grad: 'g-jade' },
          { icon: MapPin, label: 'Villages', desc: '10+ settlements across Assam & Arunachal', href: '/villages', grad: 'g-ocean' },
          { icon: UtensilsCrossed, label: 'Cuisine', desc: 'Bamboo rice, fish, and festival foods', href: '/cuisine', grad: 'g-ember' },
          { icon: Image, label: 'Gallery', desc: 'Photos of culture, dress & monasteries', href: '/gallery', grad: 'g-rose' },
          { icon: Newspaper, label: 'News & Events', desc: 'Latest community updates & festivals', href: '/news', grad: 'g-fire' },
        ].map((item) => {
          const Icon = item.icon;
          return (
            <Link key={item.href} href={item.href} className="group">
              <div className="flex items-center justify-between py-3 row-hover rounded">
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 g-text ${item.grad} shrink-0`} />
                  <div>
                    <div className="text-sm font-medium group-hover:text-[var(--text)] transition-colors">{item.label}</div>
                    <div className="text-[11px] text-[var(--text-light)]">{item.desc}</div>
                  </div>
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-[var(--text-light)] group-hover:translate-x-0.5 transition-transform" />
              </div>
              <div className="divider" />
            </Link>
          );
        })}
      </section>

      {/* ── Who Are the Tai Khamyang ── */}
      <section className="w-full max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-12 xl:px-20 mb-16 sm:mb-24 anim-fade-up anim-delay-2">
        <div className="flex items-center gap-2 mb-4">
          <div className="dot dot-amber" />
          <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--text-muted)]">Our People</span>
        </div>

        <h2 className="font-heading text-xl sm:text-2xl font-bold mb-2">
          Who Are the <span className="g-text g-amber">Tai Khamyang</span>?
        </h2>
        <p className="text-sm text-[var(--text-muted)] mb-6 max-w-lg leading-relaxed">
          One of six Tai groups that migrated to Northeast India — a small but culturally rich Theravada Buddhist community with a critically endangered language.
        </p>

        <div className="space-y-4">
          {[
            { title: 'Origin', text: 'Migrated from Mong-Mao (Yunnan, China) through the Patkai Hills to Assam, beginning in the 13th century.', bar: 'bar-ocean' },
            { title: 'Etymology', text: '"Kham" means gold and "Yang" means to have — Khamyang literally translates to "People Having Gold."', bar: 'bar-amber' },
            { title: 'Religion', text: 'Followers of Theravada Buddhism since ancient times, with Pali scriptures preserved in monastery manuscripts.', bar: 'bar-violet' },
            { title: 'Homeland', text: 'Settled across Jorhat, Sivasagar, Tinsukia, and Golaghat districts of Assam, and parts of Arunachal Pradesh.', bar: 'bar-green' },
          ].map((f) => (
            <div key={f.title} className="relative pl-4">
              <div className={`absolute left-0 top-0.5 bottom-0.5 w-0.5 rounded-full ${f.bar}`} />
              <h3 className="text-sm font-semibold mb-0.5">{f.title}</h3>
              <p className="text-sm text-[var(--text-muted)] leading-relaxed">{f.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Manuscripts & Chants ── */}
      <section className="w-full max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-12 xl:px-20 mb-16 sm:mb-24 space-y-12 anim-fade-up anim-delay-3">
        {/* Manuscripts */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="dot dot-amber" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--text-muted)]">Sacred Texts</span>
          </div>
          <h2 className="font-heading text-xl sm:text-2xl font-bold mb-2">
            Scripts & <span className="g-text g-amber">Memories</span>
          </h2>
          <p className="text-sm text-[var(--text-muted)] leading-relaxed mb-2 max-w-lg">
            Ancient folios and monastery records carry foundational teachings of Theravada Buddhism and the history of our ancestors. Manuscripts are recorded in the Tai script and preserved in Buddhist temples.
          </p>
          <p className="text-sm text-[var(--text-light)] leading-relaxed mb-4 max-w-lg">
            Priests who can read Tai script chant these verses during religious proceedings. Pali schools provide spiritual and religious instruction to preserve these traditions.
          </p>
          <Link href="/manuscripts" className="inline-flex items-center gap-1.5 text-sm font-semibold g-text g-amber group">
            View Manuscripts <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        <div className="divider-amber" />

        {/* Chants */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="dot dot-violet" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--text-muted)]">Buddhist Recitations</span>
          </div>
          <h2 className="font-heading text-xl sm:text-2xl font-bold mb-2">
            The Sound of <span className="g-text g-violet">Devotion</span>
          </h2>
          <p className="text-sm text-[var(--text-muted)] leading-relaxed mb-2 max-w-lg">
            Listen to authentic Buddhist recitations recorded from elders and monks. The Mangala Sutta, Metta Sutta, and Ratana Sutta have been chanted for centuries.
          </p>
          <p className="text-sm text-[var(--text-light)] leading-relaxed mb-4 max-w-lg">
            These recitations follow specific patterns recorded in the ancient manuscripts, preserving the spiritual rhythm through generations of faith.
          </p>
          <Link href="/chants" className="inline-flex items-center gap-1.5 text-sm font-semibold g-text g-violet group">
            Listen to Chants <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </section>

      {/* ── Elder Quote ── */}
      <section className="w-full max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-12 xl:px-20 mb-16 sm:mb-24 anim-fade-up anim-delay-4">
        <div className="relative pl-4">
          <div className="absolute left-0 top-0 bottom-0 w-0.5 rounded-full bar-rose" />
          <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--text-light)] mb-2">Voices of Our Community</div>
          <blockquote className="font-heading text-base sm:text-lg italic leading-relaxed mb-2 max-w-xl">
            &ldquo;Having left our ancient homeland as a community, having wandered together for ages, and shared all major upheavals together, community living is very significant for us.&rdquo;
          </blockquote>
          <cite className="text-sm text-[var(--text-light)] not-italic g-text g-rose">— Resident of Chalapathar Shyam Gaon, Sivasagar</cite>
        </div>
      </section>

      {/* ── Latest News & Events ── */}
      <section className="w-full max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-12 xl:px-20 mb-16 sm:mb-24 anim-fade-up anim-delay-5">
        <div className="flex items-center gap-2 mb-4">
          <div className="dot dot-fire" />
          <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--text-muted)]">Latest Updates</span>
        </div>

        <h2 className="font-heading text-xl sm:text-2xl font-bold mb-1">
          News &amp; <span className="g-text g-fire">Events</span>
        </h2>
        <p className="text-sm text-[var(--text-muted)] mb-5">Recent happenings from the Tai Khamyang world.</p>

        <HomeNews items={newsItems} />

        <Link href="/news" className="inline-flex items-center gap-1.5 text-sm font-semibold g-text g-fire mt-4 group">
          View All News <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </section>

      {/* ── Cultural Highlights ── */}
      <section className="w-full max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-12 xl:px-20 anim-fade-up anim-delay-5">
        <div className="flex items-center gap-2 mb-4">
          <div className="dot dot-ember" />
          <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--text-muted)]">Living Culture</span>
        </div>

        <div className="divider-ember mb-1" />
        {[
          { title: 'Chang Ghor', desc: 'Traditional stilt houses with granary and handloom — the heart of Khamyang village life.', grad: 'g-ember' },
          { title: 'Theravada Faith', desc: 'Buddhist monasteries (kyong) in every village, with monks preserving Pali scriptures and traditions.', grad: 'g-jade' },
          { title: 'Master Weavers', desc: 'Women weave on unique 2-foot handlooms, creating flower-patterned textiles like chin, pha-mai and chyu.', grad: 'g-rose' },
        ].map((item) => (
          <div key={item.title}>
            <div className="py-3">
              <h3 className={`text-sm font-semibold g-text ${item.grad} mb-0.5`}>{item.title}</h3>
              <p className="text-sm text-[var(--text-muted)] leading-relaxed">{item.desc}</p>
            </div>
            <div className="divider" />
          </div>
        ))}
      </section>
    </div>
  );
}
