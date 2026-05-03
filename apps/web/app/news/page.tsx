import type { Metadata } from 'next';
import { getNews } from '@/lib/content';
import { ExternalLink } from 'lucide-react';

export const metadata: Metadata = {
  title: 'News & Events — Tai Khamyang Hub',
  description: 'Latest news, events, and announcements from the Tai Khamyang community and heritage preservation efforts.',
};

const categoryColors: Record<string, string> = {
  news: 'bg-[#0891B2]/10 text-[#0891B2]',
  event: 'bg-[#D97706]/10 text-[#D97706]',
  announcement: 'bg-[#7C3AED]/10 text-[#7C3AED]',
  article: 'bg-[#059669]/10 text-[#059669]',
};

export default async function NewsPage() {
  const items = await getNews();

  // Sort by date descending
  const sorted = [...items].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="relative min-h-screen pt-20 sm:pt-28 pb-12 w-full">
      <div className="w-full max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8">
        <section className="mb-10 sm:mb-14 anim-fade-up">
          <div className="flex items-center gap-2 mb-4">
            <div className="dot dot-fire" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--text-muted)]">Updates</span>
          </div>
          <h1 className="font-heading text-2xl sm:text-4xl font-bold tracking-tight leading-[1.1] mb-4">
            News &amp; <span className="g-text g-fire">Events</span>
          </h1>
          <p className="text-sm sm:text-base text-[var(--text-muted)] max-w-lg leading-relaxed">
            Stay informed about the Tai Khamyang community — language preservation, festivals, government initiatives, and cultural events.
          </p>
        </section>

        <section className="anim-fade-up anim-delay-1">
          <div className="divider-fire mb-1" />
          {sorted.map((item, i) => (
            <div key={item.id}>
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-start gap-3 py-4 px-1 row-hover rounded-md"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className={`text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded shrink-0 ${categoryColors[item.category] || categoryColors.news}`}>
                      {item.category}
                    </span>
                    <span className="text-[10px] text-[var(--text-light)]">
                      {new Date(item.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
                    </span>
                  </div>
                  <h3 className="text-sm font-semibold group-hover:text-[#0077B6] transition-colors mb-0.5">{item.title}</h3>
                  <p className="text-[12px] text-[var(--text-muted)] leading-relaxed">{item.summary}</p>
                  <span className="text-[10px] text-[var(--text-light)] mt-1 inline-block">{item.source}</span>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-[var(--text-light)] shrink-0 mt-1 group-hover:text-[#0077B6] transition-colors" />
              </a>
              {i < sorted.length - 1 && <div className="divider" />}
            </div>
          ))}
        </section>

        <div className="divider-fire mt-8 mb-4" />
        <p className="text-xs text-[var(--text-light)]">
          News items are curated from external sources. To submit news or events, contact the Heritage Society or contribute via the database.
        </p>
      </div>
    </div>
  );
}
