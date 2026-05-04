import { ExternalLink, BookOpen } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: 'Resources --- Tai Khamyang Hub',
  description: 'Curated external links, language archives, Wikipedia articles, and academic papers about the Tai Khamyang community.',
};

const resourceSections = [
  {
    title: 'Wikipedia & Reference (Internal)',
    dot: 'dot-ocean',
    bar: 'bar-ocean',
    grad: 'g-ocean',
    internal: true,
    links: [
      { title: 'Tai Khamyang People', url: '/article/Khamyang_people', source: 'Wikipedia', desc: 'History, culture, distribution, and festivals of the Tai Khamyang.' },
      { title: 'Khamyang Language', url: '/article/Khamyang_language', source: 'Wikipedia', desc: 'Linguistics, ISO 639-3:ksu classification, speaker count.' },
      { title: 'Tai Peoples', url: '/article/Tai_peoples', source: 'Wikipedia', desc: 'The broader Tai diaspora across Southeast and South Asia.' },
      { title: 'Southwestern Tai Languages', url: '/article/Southwestern_Tai_languages', source: 'Wikipedia', desc: 'Language family tree --- Khamyang, Khamti, Phake, Shan, Thai.' },
      { title: 'Sangken Festival', url: '/article/Sangken', source: 'Wikipedia', desc: 'The traditional Tai New Year water festival (Poi Sangken).' },
    ],
  },
  {
    title: 'Language Archives & Preservation',
    dot: 'dot-violet',
    bar: 'bar-violet',
    grad: 'g-violet',
    links: [
      { title: 'Oral Literature Documentation', url: 'https://www.elararchive.org/dk0298/', source: 'ELAR', desc: 'Audio and video recordings of Tai Khamyang oral traditions.' },
      { title: 'Last Guardian of Khamyang', url: 'https://www.devdiscourse.com/article/entertainment/3776425-last-guardian-of-khamyang-digital-efforts-to-preserve-endangered-assamese-languages', source: 'DevDiscourse', desc: 'Bhogeswar Thomung --- the sole proficient speaker at 84 years old.' },
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
      { title: 'Reviving Heritage, Strengthening Identity', url: 'https://arunachal.mygov.in/group-issue/reviving-heritage-strengthening-identity/', source: 'MyGov India', desc: 'Government initiative for Tai Khamyang heritage preservation.' },
    ],
  },
];

export default function ResourcesPage() {
  return (
    <div className="relative min-h-screen pt-24 sm:pt-32 pb-20 w-full bg-white">
      <div className="w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <section className="mb-16 sm:mb-24">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center shadow-sm border border-amber-100">
              <BookOpen className="w-6 h-6" />
            </div>
            <span className="text-sm font-bold uppercase tracking-[0.2em] text-amber-700">Knowledge Base</span>
          </div>
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 mb-6">
            Resources & <span className="text-amber-600">Learn More</span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl leading-relaxed">
            Curated links to Wikipedia (readable natively), Sahapedia, language archives, government portals, and community websites.
          </p>
        </section>

        <div className="space-y-16">
          {resourceSections.map((section) => (
            <div key={section.title} className="relative">
              <div className="flex items-center gap-3 mb-8">
                <h2 className="font-heading text-2xl sm:text-3xl font-bold text-gray-900">{section.title}</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {section.links.map((link) => (
                  <div key={link.title} className="group">
                    {section.internal ? (
                      <Link 
                        href={link.url}
                        className="flex flex-col h-full p-6 rounded-2xl bg-gray-50 hover:bg-amber-50 border border-gray-100 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                      >
                        <div className="flex items-start justify-between gap-4 mb-3">
                          <h3 className="font-bold text-lg text-gray-900 font-heading">{link.title}</h3>
                          <span className="shrink-0 px-2.5 py-1 bg-white text-gray-500 text-[10px] font-bold uppercase tracking-widest rounded-full border border-gray-200 shadow-sm">{link.source}</span>
                        </div>
                        <p className="text-gray-600 leading-relaxed">{link.desc}</p>
                      </Link>
                    ) : (
                      <a 
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex flex-col h-full p-6 rounded-2xl bg-gray-50 hover:bg-gray-100 border border-gray-100 transition-all duration-300 hover:shadow-md hover:-translate-y-1"
                      >
                        <div className="flex items-start justify-between gap-4 mb-3">
                          <h3 className="font-bold text-lg text-gray-900 font-heading">{link.title}</h3>
                          <div className="flex items-center gap-2">
                            <span className="shrink-0 px-2.5 py-1 bg-white text-gray-500 text-[10px] font-bold uppercase tracking-widest rounded-full border border-gray-200 shadow-sm">{link.source}</span>
                            <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-gray-900 transition-colors" />
                          </div>
                        </div>
                        <p className="text-gray-600 leading-relaxed">{link.desc}</p>
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
