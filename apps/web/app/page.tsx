import Link from 'next/link';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import WordOfTheDay from '@/components/WordOfTheDay';

export default function Home() {
  return (
    <div className="relative min-h-screen pb-20 w-full">
      {/* === Full Screen Hero Image === */}
      <section className="relative w-full h-[85vh] min-h-[500px] mb-16 sm:mb-24">
        <img 
          src="/images/1.jpg" 
          alt="Tai Khamyang Community" 
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 mt-16">
          <h1 className="text-white text-5xl sm:text-6xl md:text-7xl font-bold font-heading mb-6 tracking-tight drop-shadow-lg">
            Tai Khamyang
          </h1>
          <p className="text-white/90 text-lg sm:text-2xl max-w-2xl font-light drop-shadow-md">
            People of Gold. A vibrant Theravada Buddhist community from Upper Assam, preserving our ancient language, culture, and faith.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link href="/dictionary" className="px-8 py-4 rounded-full bg-[#0891B2] text-white font-semibold text-sm shadow-md hover:bg-[#0E7490] transition-colors">
              Explore Dictionary
            </Link>
            <Link href="/about" className="px-8 py-4 rounded-full border border-white text-white hover:bg-white/20 font-semibold text-sm transition-all backdrop-blur-sm">
              Our Story
            </Link>
          </div>
        </div>
      </section>

      {/* === Who We Are === */}
      <section className="w-full max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 mb-20 text-center">
        <div className="flex items-center justify-center gap-2 mb-4">
          <div className="dot dot-amber" />
          <span className="text-[12px] font-semibold uppercase tracking-[0.2em] text-[var(--text-muted)]">Who We Are</span>
          <div className="dot dot-amber" />
        </div>
        <h2 className="font-heading text-2xl sm:text-4xl font-bold text-[var(--text)] mb-6">
          The <span className="g-text g-amber">Tai Khamyang</span> People
        </h2>
        <p className="text-base sm:text-lg text-[var(--text-muted)] leading-relaxed italic">
          "The Tai Khamyangs, also known as Shyam, are an indigenous Tai community residing primarily in the Tinsukia, Jorhat, Sivasagar, and Golaghat districts of Assam, as well as parts of Arunachal Pradesh. With a rich heritage rooted in Theravada Buddhism, we are committed to preserving our ancient language, vibrant culture, and harmonious way of life."
        </p>
      </section>

      {/* === Word of the Day === */}
      <section className="w-full max-w-5xl mx-auto px-6 sm:px-8 lg:px-12 mb-20">
        <WordOfTheDay />
      </section>

      {/* === Heritage Categories with side image === */}
      <section className="w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 mb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          <div className="lg:col-span-7">
            <div className="flex items-center gap-2 mb-3">
              <div className="dot dot-jade" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--text-muted)]">Heritage</span>
            </div>
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-[var(--text)] mb-2">
              Discover Our <span className="g-text g-ocean">Heritage</span>
            </h2>
            <p className="text-sm text-[var(--text-muted)] mb-6 max-w-xl leading-relaxed">
              Journey through the faith, language, and vibrant culture of the Tai Khamyang way of life.
            </p>
            <div className="divider-ocean mb-2" />

            {[
              { href: '/festivals',  title: 'Festivals',   desc: 'Poi Sangken, Mai-Ko-Sum-Phai, and Buddhist holy days.' },
              { href: '/cuisine',    title: 'Cuisine',     desc: 'Khaulam, sticky rice in Ko-leaves, fermented fish.' },
              { href: '/learn',      title: 'Learn',       desc: 'Phrases, numbers, and greetings in Tai Khamyang.' },
              { href: '/villages',   title: 'Villages',    desc: 'Shyam Gaon settlements across upper Assam.' },
              { href: '/news',       title: 'News',        desc: 'Latest from the community and preservation efforts.' },
              { href: '/resources',  title: 'Resources',   desc: 'External archives, scholarly articles, and links.' },
            ].map((item) => (
              <Link
                key={item.title}
                href={item.href}
                className="group flex items-center justify-between py-5 border-b border-[var(--border)] hover:border-[#0891B2] transition-colors"
              >
                <div className="flex items-center gap-4 min-w-0">
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-[var(--text)] group-hover:text-[#0891B2] transition-colors font-heading mb-0.5">{item.title}</h3>
                    <p className="text-[var(--text-muted)] text-xs sm:text-sm font-light">{item.desc}</p>
                  </div>
                </div>
                <div className="w-9 h-9 rounded-full border border-[var(--border)] flex items-center justify-center text-[var(--text-light)] group-hover:text-[#0891B2] group-hover:border-[#0891B2]/40 group-hover:bg-[#0891B2]/5 transition-all shrink-0">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </Link>
            ))}
          </div>

          {/* Side image — 2nd image (monastery) */}
          <div className="lg:col-span-5 order-first lg:order-last">
            <div className="sticky top-28 rounded-[1.5rem] overflow-hidden shadow-xl relative h-[260px] sm:h-[320px] lg:h-[440px]">
              <img
                src="/images/2.jpg"
                alt="Tai Khamyang village monastery"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0F2027]/70 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-5 right-5 text-white">
                <div className="text-[10px] uppercase tracking-[0.25em] text-cyan-200 mb-1">Heritage</div>
                <div className="font-heading text-base font-bold">Village monastery (kyong)</div>
                <div className="text-xs text-white/80 mt-0.5">Heart of every Tai Khamyang settlement.</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* === Living Tradition text (photo removed as requested) === */}
      <section className="w-full max-w-5xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex flex-col sm:flex-row gap-6 sm:gap-10 items-start py-10">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <div className="dot dot-jade" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--text-muted)]">Community Voice</span>
            </div>
            <h2 className="font-heading text-xl sm:text-2xl font-bold text-[var(--text)] mb-3">
              A <span className="g-text g-jade">Living</span> Tradition
            </h2>
            <p className="text-sm sm:text-base text-[var(--text-muted)] leading-relaxed mb-4 italic">
              “Having left our ancient homeland as a community, having wandered together for ages, and shared all major upheavals together — community living is very significant for us.”
            </p>
            <Link href="/about" className="inline-flex items-center gap-1.5 text-sm font-semibold g-text g-ocean group">
              Learn our full story
              <ArrowRight className="w-4 h-4 text-[#0891B2] group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
