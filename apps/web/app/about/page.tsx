import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { getTimeline } from '@/lib/content';
import InteractiveTimeline from '@/components/InteractiveTimeline';

export const metadata: Metadata = {
  title: 'About — Tai Khamyang Hub',
  description: 'Learn about the Tai Khamyang community, their history, etymology, religion, and homeland in Northeast India.',
};

export default async function AboutPage() {
  const timeline = await getTimeline();
  return (
    <div className="relative min-h-screen pt-20 sm:pt-28 pb-12 w-full">
      <div className="w-full max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero */}
        <section className="mb-14 sm:mb-20 anim-fade-up">
          <div className="flex items-center gap-2 mb-4">
            <div className="dot dot-amber" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--text-muted)]">Our Story</span>
          </div>
          <h1 className="font-heading text-2xl sm:text-4xl font-bold tracking-tight leading-[1.1] mb-4">
            About the <span className="g-text g-amber">Tai Khamyang</span>
          </h1>
          <p className="text-sm sm:text-base text-[var(--text-muted)] max-w-lg leading-relaxed mb-2">
            The Tai Khamyang — literally &ldquo;People Having Gold&rdquo; (Kham = gold, Yang = to have) — are one of six Tai groups that migrated from Mong-Mao in present-day Yunnan, China to the Brahmaputra valley of Northeast India.
          </p>
          <p className="text-sm text-[var(--text-light)] max-w-lg leading-relaxed">
            A small but culturally rich Theravada Buddhist community, the Khamyangs have preserved their distinct identity through centuries of change — maintaining sacred manuscripts, Buddhist monasteries, traditional weaving, and a deep commitment to community living.
          </p>
        </section>

        {/* Etymology & Religion */}
        <section className="mb-14 sm:mb-20 space-y-5 anim-fade-up anim-delay-1">
          <div className="relative pl-4">
            <div className="absolute left-0 top-0.5 bottom-0.5 w-0.5 rounded-full bar-amber" />
            <h2 className="text-sm font-semibold mb-1">Etymology</h2>
            <p className="text-sm text-[var(--text-muted)] leading-relaxed">
              The word <strong className="text-[var(--text)]">Khamyang</strong> comes from two Tai words: <strong className="g-text g-amber">Kham</strong> (gold) and <strong className="g-text g-amber">Yang</strong> (to have/possess). This translates to &ldquo;People Having Gold&rdquo; — a name reflecting their golden heritage.
            </p>
          </div>
          <div className="relative pl-4">
            <div className="absolute left-0 top-0.5 bottom-0.5 w-0.5 rounded-full bar-violet" />
            <h2 className="text-sm font-semibold mb-1">Religion &amp; Faith</h2>
            <p className="text-sm text-[var(--text-muted)] leading-relaxed">
              Followers of <strong className="text-[var(--text)]">Theravada Buddhism</strong> since ancient times. Every village has a <strong className="text-[var(--text)]">kyong</strong> (monastery) at its center, with a resident Bhante who leads spiritual life. Alongside Buddhism, remnants of pre-Buddhist <strong className="text-[var(--text)]">Phi-hon</strong> (house deity) worship survive.
            </p>
          </div>
        </section>

        {/* Language Info */}
        <section className="mb-14 sm:mb-20 anim-fade-up anim-delay-2">
          <div className="flex items-center gap-2 mb-4">
            <div className="dot dot-ember" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--text-muted)]">Language</span>
          </div>
          <h2 className="font-heading text-xl sm:text-2xl font-bold mb-2">
            The Tai Khamyang <span className="g-text g-ember">Language</span>
          </h2>
          <p className="text-sm text-[var(--text-muted)] mb-5">Classified as critically endangered by UNESCO, with fewer than 15 fluent speakers remaining.</p>

          <div className="divider-ember mb-1" />
          {[
            { label: 'Classification', value: 'Southwestern Tai' },
            { label: 'Script', value: 'Tai (Brahmic)' },
            { label: 'UNESCO Status', value: 'Critically Endangered' },
            { label: 'Fluent Speakers', value: '< 15' },
            { label: 'Related To', value: 'Khamti, Phake, Shan' },
            { label: 'Region', value: 'Upper Assam' },
          ].map((l, i, arr) => (
            <div key={l.label}>
              <div className="flex items-center justify-between py-2.5">
                <span className="text-sm text-[var(--text-light)]">{l.label}</span>
                <span className="text-sm font-semibold">{l.value}</span>
              </div>
              {i < arr.length - 1 && <div className="divider" />}
            </div>
          ))}
        </section>

        {/* Six Tai Groups */}
        <section className="mb-14 sm:mb-20 anim-fade-up anim-delay-3">
          <div className="flex items-center gap-2 mb-4">
            <div className="dot dot-ocean" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--text-muted)]">Tai Groups</span>
          </div>
          <h2 className="font-heading text-xl sm:text-2xl font-bold mb-2">
            Six Tai Groups of <span className="g-text g-ocean">Northeast India</span>
          </h2>
          <p className="text-sm text-[var(--text-muted)] mb-5">The Khamyangs are one of six distinct Tai communities that migrated to Assam and Arunachal Pradesh.</p>

          <div className="divider-ocean mb-1" />
          {[
            { name: 'Tai Ahom', pop: '~1.3M (assimilated)', note: 'Ruled the Ahom Kingdom for 600 years', highlight: false },
            { name: 'Tai Khamyang', pop: '~7,000', note: '"People of Gold" — Theravada Buddhist', highlight: true },
            { name: 'Tai Khamti', pop: '~12,000', note: 'Largest Tai Buddhist group in NE India', highlight: false },
            { name: 'Tai Phake', pop: '~2,000', note: 'Closely related to Khamyang linguistically', highlight: false },
            { name: 'Tai Aiton', pop: '~2,500', note: 'Buddhist community in Golaghat district', highlight: false },
            { name: 'Tai Turung', pop: '~5,000', note: 'Settled in Lakhimpur and Golaghat', highlight: false },
          ].map((g, i, arr) => (
            <div key={g.name}>
              <div className="flex items-center justify-between py-2.5">
                <div>
                  <span className={`text-sm font-semibold ${g.highlight ? 'g-text g-amber' : ''}`}>{g.name}</span>
                  <span className="text-[11px] text-[var(--text-light)] ml-2">{g.pop}</span>
                </div>
                <span className="text-[11px] text-[var(--text-light)] text-right max-w-[45%]">{g.note}</span>
              </div>
              {i < arr.length - 1 && <div className="divider" />}
            </div>
          ))}
        </section>

        {/* Interactive Timeline */}
        <section className="mb-14 sm:mb-20 anim-fade-up anim-delay-4">
          <div className="flex items-center gap-2 mb-4">
            <div className="dot dot-rose" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--text-muted)]">History</span>
          </div>
          <h2 className="font-heading text-xl sm:text-2xl font-bold mb-5">
            Historical <span className="g-text g-rose">Timeline</span>
          </h2>

          <InteractiveTimeline events={timeline} />
        </section>

        {/* Geography */}
        <section className="mb-14 sm:mb-20 anim-fade-up anim-delay-5">
          <div className="relative pl-4">
            <div className="absolute left-0 top-0 bottom-0 w-0.5 rounded-full bar-green" />
            <h2 className="font-heading text-lg font-bold mb-2">Geography &amp; Settlement</h2>
            <div className="space-y-2 text-sm text-[var(--text-muted)] leading-relaxed">
              <p>Concentrated in four districts of <strong className="text-[var(--text)]">Upper Assam</strong>: Jorhat, Sivasagar, Tinsukia, and Golaghat. Some families also live in Namsai, Arunachal Pradesh.</p>
              <p>Their migration route: <strong className="text-[var(--text)]">Mong-Mao</strong> → <strong className="text-[var(--text)]">Patkai Hills</strong> → <strong className="text-[var(--text)]">Nong Yang Lake</strong> → Brahmaputra valley.</p>
              <p>Villages are named with the suffix <strong className="text-[var(--text)]">&ldquo;Shyam Gaon&rdquo;</strong> and organized around a central <strong className="text-[var(--text)]">kyong</strong> (monastery).</p>
            </div>
          </div>
        </section>

        {/* Further Reading */}
        <section className="mb-14 sm:mb-20 anim-fade-up">
          <div className="flex items-center gap-2 mb-4">
            <div className="dot dot-violet" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--text-muted)]">Further Reading</span>
          </div>
          <h2 className="font-heading text-lg font-bold mb-4">
            Learn More <span className="g-text g-violet">Externally</span>
          </h2>
          <div className="divider-violet mb-1" />
          {[
            { title: 'Khamyang People — Wikipedia', url: 'https://en.wikipedia.org/wiki/Khamyang_people', desc: 'History, etymology, distribution, and culture' },
            { title: 'Tai Khamyang Community — Sahapedia', url: 'https://www.sahapedia.org/tai-khamyang-community-assam', desc: 'Comprehensive cultural documentation' },
            { title: 'Society, Culture & Religion — Sahapedia', url: 'https://www.sahapedia.org/tai-khamyang-community-assam-society-culture-and-religion', desc: 'Detailed ethnography and social life' },
            { title: 'ELAR: Oral Literature Archive', url: 'https://www.elararchive.org/dk0298/', desc: 'Audio/video recordings of Tai Khamyang traditions' },
            { title: 'Tai Khamyang Heritage Society', url: 'https://www.taikhamyang.org/', desc: 'Official community organization' },
          ].map((link, i, arr) => (
            <div key={link.url}>
              <a href={link.url} target="_blank" rel="noopener noreferrer" className="group flex items-center justify-between py-2.5 px-1 row-hover rounded-md">
                <div>
                  <span className="text-sm font-semibold group-hover:text-[#0077B6] transition-colors">{link.title}</span>
                  <p className="text-[12px] text-[var(--text-light)]">{link.desc}</p>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-[var(--text-light)] shrink-0 group-hover:translate-x-0.5 transition-transform" />
              </a>
              {i < arr.length - 1 && <div className="divider" />}
            </div>
          ))}
        </section>

        {/* CTA */}
        <section className="anim-fade-up">
          <div className="divider-amber mb-5" />
          <p className="text-sm text-[var(--text-muted)] mb-4 max-w-md">
            Help preserve this living heritage. Explore the dictionary, listen to chants, and discover the traditions.
          </p>
          <div className="flex gap-3">
            <Link href="/dictionary" className="btn-ocean text-white text-sm font-semibold px-4 py-2 rounded-md flex items-center gap-2">
              Explore Dictionary <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <Link href="/traditions" className="text-sm font-semibold px-4 py-2 rounded-md border border-[var(--border)] text-[var(--text-muted)] hover:text-[var(--text)] transition-colors">
              View Traditions
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
