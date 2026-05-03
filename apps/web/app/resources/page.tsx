import type { Metadata } from 'next';
import { ExternalLink } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Resources — Tai Khamyang Hub',
  description: 'Curated external links to learn more about the Tai Khamyang language, history, culture, and community.',
};

const sections = [
  {
    title: 'Wikipedia & Reference',
    dot: 'dot-ocean',
    bar: 'bar-ocean',
    grad: 'g-ocean',
    links: [
      { title: 'Khamyang People', url: 'https://en.wikipedia.org/wiki/Khamyang_people', source: 'Wikipedia', desc: 'History, culture, distribution, and festivals of the Tai Khamyang.' },
      { title: 'Khamyang Language', url: 'https://en.wikipedia.org/wiki/Khamyang_language', source: 'Wikipedia', desc: 'Linguistics, ISO 639-3:ksu classification, speaker count.' },
      { title: 'Tai Peoples', url: 'https://en.wikipedia.org/wiki/Tai_people', source: 'Wikipedia', desc: 'The broader Tai diaspora across Southeast and South Asia.' },
      { title: 'Southwestern Tai Languages', url: 'https://en.wikipedia.org/wiki/Southwestern_Tai_languages', source: 'Wikipedia', desc: 'Language family tree — Khamyang, Khamti, Phake, Shan, Thai.' },
      { title: 'Sangken Festival', url: 'https://en.wikipedia.org/wiki/Sangken', source: 'Wikipedia', desc: 'The traditional Tai New Year water festival (Poi Sangken).' },
      { title: 'Ahom Kingdom', url: 'https://en.wikipedia.org/wiki/Ahom_kingdom', source: 'Wikipedia', desc: '600-year Tai kingdom in Assam — historical context.' },
    ],
  },
  {
    title: 'Cultural Documentation',
    dot: 'dot-amber',
    bar: 'bar-amber',
    grad: 'g-amber',
    links: [
      { title: 'Tai Khamyang Community of Assam', url: 'https://www.sahapedia.org/tai-khamyang-community-assam', source: 'Sahapedia', desc: 'Comprehensive overview of migration, settlement, and identity.' },
      { title: 'Society, Culture & Religion', url: 'https://www.sahapedia.org/tai-khamyang-community-assam-society-culture-and-religion', source: 'Sahapedia', desc: 'Detailed ethnography — monasteries, marriage, Gaon Sabha.' },
      { title: 'History & Folk Traditions', url: 'https://www.sahapedia.org/tai-khamyangs-assam-history-and-folk-traditions', source: 'Sahapedia', desc: 'Oral histories, Khamyang Chronicle, migration narratives.' },
      { title: 'Interview: Dr Narendra Nath Shyam', url: 'https://map.sahapedia.org/article/In-Conversation%20with%20Dr%20Narendra%20Nath%20Shyam', source: 'Sahapedia', desc: '"Tai Khamyang women share absolute equality with men."' },
      { title: 'Theravada Monasteries of Arunachal', url: 'https://www.sahapedia.org/theravada-buddhist-monasteries-arunachal-pradesh-study-art-and-visual-culture', source: 'Sahapedia', desc: 'Art and visual culture of related Buddhist monasteries.' },
    ],
  },
  {
    title: 'Language Archives & Preservation',
    dot: 'dot-violet',
    bar: 'bar-violet',
    grad: 'g-violet',
    links: [
      { title: 'Oral Literature Documentation', url: 'https://www.elararchive.org/dk0298/', source: 'ELAR', desc: 'Audio and video recordings of Tai Khamyang oral traditions.' },
      { title: 'ELDP Project Highlight', url: 'https://elararchive.org/blog/2019/01/17/eldp-project-highlight-documentation-of-the-oral-literature-of-the-tai-khamyang-community-in-upper-assam-india/', source: 'ELAR Blog', desc: 'Palash Kumar Nath\'s field documentation project details.' },
      { title: 'Archiving 3 Endangered Languages', url: 'https://theprint.in/india/assam-archives-three-endangered-languages-as-lone-khamyang-speaker-battles-extinction/2832131/', source: 'ThePrint', desc: '650 manuscript leaves digitized, 250 cultural photographs archived.' },
      { title: 'Last Guardian of Khamyang', url: 'https://www.devdiscourse.com/article/entertainment/3776425-last-guardian-of-khamyang-digital-efforts-to-preserve-endangered-assamese-languages', source: 'DevDiscourse', desc: 'Bhogeswar Thomung — the sole proficient speaker at 84 years old.' },
      { title: 'Tai Languages: Endangered Status (PDF)', url: 'https://ijirl.com/wp-content/uploads/2025/04/TAI-LANGUAGES-IN-INDIA-THE-ENDANGERED-LANGUAGES-NEED-REVIVAL-AND-PROTECTION-OF-LAW.pdf', source: 'IJIRL', desc: 'Legal protection framework for Tai languages in India.' },
    ],
  },
  {
    title: 'Community & Organizations',
    dot: 'dot-jade',
    bar: 'bar-jade',
    grad: 'g-jade',
    links: [
      { title: 'Tai Khamyang Heritage Society', url: 'https://www.taikhamyang.org/', source: 'Official', desc: 'The official community organization for conservation and upliftment.' },
      { title: 'Rituals, Customs & Village Life', url: 'https://www.taikhamyang.org/copy-of-home', source: 'Heritage Society', desc: 'Gaon Sabha, social structure, and traditional governance.' },
      { title: 'Reviving Heritage, Strengthening Identity', url: 'https://arunachal.mygov.in/group-issue/reviving-heritage-strengthening-identity/', source: 'MyGov India', desc: 'Government initiative for Tai Khamyang heritage preservation.' },
      { title: 'International Tai Youth Festival', url: 'https://assamtribune.com/assam/first-international-tai-youth-festival-strengthens-cross-border-cultural-bonds-1565671', source: 'Assam Tribune', desc: 'Cross-border cultural bonds with Thai, Myanmar, and Chinese Tai.' },
    ],
  },
  {
    title: 'Tourism & Buddhism',
    dot: 'dot-rose',
    bar: 'bar-rose',
    grad: 'g-rose',
    links: [
      { title: 'Buddhism in Assam', url: 'https://assamtourism.gov.in/Buddhism.php', source: 'Assam Tourism', desc: 'Overview of all Theravada Buddhist communities in Assam.' },
      { title: 'Buddhism in Assam (Government)', url: 'https://tourism.assam.gov.in/portlet-sub-innerpage/buddhism-in-assam-0', source: 'Govt. of Assam', desc: 'Historical context — from Mahayana decline to Theravada survival.' },
      { title: 'Namphake Buddhist Village', url: 'https://travellingslacker.com/namphake-buddhist-monastery-village/', source: 'Travel Blog', desc: 'A related Tai Phake monastery village open to visitors.' },
      { title: 'Poi Sangken 2025', url: 'https://bharatarticles.com/sangken-2025-a-vibrant-water-festival-celebrated-in-arunachal-pradesh-and-assam/', source: 'Bharat Articles', desc: 'Latest coverage of the vibrant water festival celebration.' },
    ],
  },
  {
    title: 'Food & Material Culture',
    dot: 'dot-fire',
    bar: 'bar-fire',
    grad: 'g-fire',
    links: [
      { title: 'Tai Khamyang Cuisine', url: 'https://www.rumicooks.com/2018/09/tai-khamyang-cuisine.html', source: 'RumiCooks', desc: 'Khau Hou, Khaulam, fish dishes, bamboo cooking, and festival foods.' },
      { title: 'Tribal Textiles of Assam', url: 'https://www.iiad.edu.in/the-circle/tribal-textiles-of-assam-cotton-silk-weaving-handlooms/', source: 'IIAD', desc: 'Mekhela Sador, Nungwat/Riha — traditional weaving and dress.' },
    ],
  },
];

export default function ResourcesPage() {
  return (
    <div className="relative min-h-screen pt-20 sm:pt-28 pb-12 w-full">
      <div className="w-full max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8">
        <section className="mb-14 sm:mb-20 anim-fade-up">
          <div className="flex items-center gap-2 mb-4">
            <div className="dot dot-ocean" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--text-muted)]">External Links</span>
          </div>
          <h1 className="font-heading text-2xl sm:text-4xl font-bold tracking-tight leading-[1.1] mb-4">
            Resources &amp; <span className="g-text g-ocean">Learn More</span>
          </h1>
          <p className="text-sm sm:text-base text-[var(--text-muted)] max-w-lg leading-relaxed">
            Curated links to Wikipedia, Sahapedia, language archives, government portals, and community websites. Read from authoritative sources, explore further.
          </p>
        </section>

        {sections.map((section, si) => (
          <section key={section.title} className={`mb-14 sm:mb-16 anim-fade-up anim-delay-${Math.min(si + 1, 5)}`}>
            <div className="flex items-center gap-2 mb-3">
              <div className={`dot ${section.dot}`} />
              <h2 className="font-heading text-lg font-bold">{section.title}</h2>
            </div>
            <div className={`divider-${section.grad.replace('g-', '')} mb-1`} />
            {section.links.map((link, li) => (
              <div key={link.url}>
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-start gap-3 py-3 px-1 row-hover rounded-md"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-sm font-semibold group-hover:text-[#0077B6] transition-colors">{link.title}</span>
                      <span className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-[var(--surface)] text-[var(--text-light)] shrink-0">{link.source}</span>
                    </div>
                    <p className="text-[13px] text-[var(--text-muted)] leading-relaxed">{link.desc}</p>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-[var(--text-light)] shrink-0 mt-1 group-hover:text-[#0077B6] transition-colors" />
                </a>
                {li < section.links.length - 1 && <div className="divider" />}
              </div>
            ))}
          </section>
        ))}
      </div>
    </div>
  );
}
