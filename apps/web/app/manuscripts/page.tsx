import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Manuscripts --- Tai Khamyang Hub',
  description: 'Explore the sacred Tai Khamyang manuscripts written in Lik Tai script on bark, palm leaves, and handmade paper.',
};

export default function ManuscriptsPage() {
  return (
    <div className="relative min-h-screen pt-20 sm:pt-28 pb-12 w-full">
      <div className="w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Hero */}
        <section className="mb-14 sm:mb-20 anim-fade-up">
          <div className="flex items-center gap-2 mb-4">
            <div className="dot dot-amber" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--text-muted)]">Sacred Archive</span>
          </div>
          <h1 className="font-heading text-2xl sm:text-4xl font-bold tracking-tight leading-[1.1] mb-4">
            Manuscripts &amp; <span className="g-text g-amber">Sacred Texts</span>
          </h1>
          <p className="text-sm sm:text-base text-[var(--text-muted)] max-w-lg leading-relaxed mb-2">
            Sacred manuscripts preserved in Buddhist temples for centuries. Written in the Tai script, these folios contain foundational teachings of Theravada Buddhism, historical chronicles, and ritual instructions.
          </p>
          <p className="text-sm text-[var(--text-light)] max-w-lg leading-relaxed">
            Priests who can read the Tai script chant these verses during religious proceedings. The manuscripts are still kept in the kyongs (monasteries) today.
          </p>
        </section>

        {/* Archive Contents */}
        <section className="mb-14 sm:mb-20 anim-fade-up anim-delay-1">
          <h2 className="font-heading text-lg font-bold mb-4">
            Archive <span className="g-text g-amber">Contents</span>
          </h2>
          <div className="divider-amber mb-1" />
          {[
            'Scanned folios and manuscript cover images in Tai script',
            'Transliteration and translation into Assamese and English',
            'Monastery source, village location, and preservation status',
            'Associated chant, ritual context, and historical notes',
            'Material type --- palm-leaf, handmade paper, or cloth',
          ].map((item, i, arr) => (
            <div key={item}>
              <div className="py-2.5 text-sm text-[var(--text-muted)]">{item}</div>
              {i < arr.length - 1 && <div className="divider" />}
            </div>
          ))}
        </section>

        {/* Preservation Context */}
        <section className="mb-14 sm:mb-20 space-y-5 anim-fade-up anim-delay-2">
          <div className="relative pl-4">
            <div className="absolute left-0 top-0.5 bottom-0.5 w-0.5 rounded-full bar-amber" />
            <h2 className="text-sm font-semibold mb-1">Preservation Context</h2>
            <p className="text-sm text-[var(--text-muted)] leading-relaxed">
              Early Khamyang Buddhism had Mahayana similarities, but through Burmese influence they adopted Theravada --- the most ancient form practiced today. Manuscripts are written on palm leaves and handmade paper, stored in wooden chests inside monasteries.
            </p>
          </div>
          <div className="relative pl-4">
            <div className="absolute left-0 top-0.5 bottom-0.5 w-0.5 rounded-full bar-violet" />
            <h2 className="text-sm font-semibold mb-1">Pali Schools</h2>
            <p className="text-sm text-[var(--text-muted)] leading-relaxed">
              Established in association with Buddhist temples, Pali schools provide spiritual and religious instruction --- safeguarding traditions and legacies for future generations.
            </p>
          </div>
        </section>

        {/* Monastery Sources */}
        <section className="mb-14 sm:mb-20 anim-fade-up anim-delay-3">
          <div className="flex items-center gap-2 mb-4">
            <div className="dot dot-violet" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--text-muted)]">Sources</span>
          </div>
          <h2 className="font-heading text-lg font-bold mb-4">
            Monastery <span className="g-text g-violet">Sources</span>
          </h2>
          <div className="divider-violet mb-1" />
          {[
            { name: 'Chalapather Buddhist Monastery', loc: 'Sivasagar', note: 'Over 150 years old' },
            { name: 'Na Shyam Gaon Vihara', loc: 'Jorhat', note: 'Active Pali school' },
            { name: 'Betbari Shyam Gaon Kyong', loc: 'Jorhat', note: 'Elder manuscript collection' },
            { name: 'Pawaimukh Kyong', loc: 'Tinsukia', note: 'Festival records' },
          ].map((m, i, arr) => (
            <div key={m.name}>
              <div className="flex items-center justify-between py-2.5">
                <div>
                  <span className="text-sm font-semibold">{m.name}</span>
                  <span className="text-[11px] text-[var(--text-light)] ml-2">{m.loc}</span>
                </div>
                <span className="text-[11px] text-[var(--text-light)]">{m.note}</span>
              </div>
              {i < arr.length - 1 && <div className="divider" />}
            </div>
          ))}
        </section>

        {/* Further Reading */}
        <section className="mb-14 sm:mb-20 anim-fade-up anim-delay-4">
          <div className="flex items-center gap-2 mb-3">
            <div className="dot dot-ocean" />
            <h2 className="font-heading text-lg font-bold">Further Reading</h2>
          </div>
          <div className="divider-ocean mb-1" />
          {[
            { title: 'Archiving 3 Endangered Languages --- ThePrint', url: 'https://theprint.in/india/assam-archives-three-endangered-languages-as-lone-khamyang-speaker-battles-extinction/2832131/', desc: '650 manuscript leaves digitized, 250 cultural photographs' },
            { title: 'Tai Khamyang Oral Literature --- ELAR', url: 'https://www.elararchive.org/dk0298/', desc: 'Audio and video recordings of oral traditions' },
            { title: 'Palm Leaf Manuscripts --- British Library', url: 'https://blogs.bl.uk/asian-and-african/2015/01/the-beauty-of-palm-leaf-manuscripts-2-northern-thai-lao-and-shan-traditions.html', desc: 'Northern Thai, Lao, and Shan manuscript traditions' },
            { title: 'Theravada Monasteries of Arunachal --- Sahapedia', url: 'https://www.sahapedia.org/theravada-buddhist-monasteries-arunachal-pradesh-study-art-and-visual-culture', desc: 'Art and visual culture of related monasteries' },
          ].map((link, i, arr) => (
            <div key={link.url}>
              <a href={link.url} target="_blank" rel="noopener noreferrer" className="group flex items-center justify-between py-2.5 px-1 row-hover rounded-md">
                <div>
                  <span className="text-sm font-semibold group-hover:text-[#0077B6] transition-colors">{link.title}</span>
                  <p className="text-[12px] text-[var(--text-light)]">{link.desc}</p>
                </div>
                <svg className="w-3.5 h-3.5 text-[var(--text-light)] shrink-0 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
              </a>
              {i < arr.length - 1 && <div className="divider" />}
            </div>
          ))}
        </section>

        {/* Features */}
        <section className="anim-fade-up anim-delay-5">
          <div className="divider-amber mb-1" />
          {[
            { title: 'Visual Archive', desc: 'High-resolution scans and zoom-ready images for public browsing and research.', grad: 'g-amber' },
            { title: 'Readable Layers', desc: 'Side-by-side: original Tai script, transliteration, and translated passages.', grad: 'g-violet' },
            { title: 'Cultural Context', desc: 'Connect texts to villages, monasteries, ritual use, and living memory.', grad: 'g-ocean' },
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
    </div>
  );
}
