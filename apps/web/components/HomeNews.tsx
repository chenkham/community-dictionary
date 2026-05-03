'use client';

import { ExternalLink } from 'lucide-react';
import type { NewsItem } from '@/lib/content';

interface Props {
  items: NewsItem[];
}

const categoryColors: Record<string, string> = {
  news: 'bg-[#0891B2]/10 text-[#0891B2]',
  event: 'bg-[#D97706]/10 text-[#D97706]',
  announcement: 'bg-[#7C3AED]/10 text-[#7C3AED]',
  article: 'bg-[#059669]/10 text-[#059669]',
};

export default function HomeNews({ items }: Props) {
  const display = items.slice(0, 4);

  return (
    <div>
      <div className="divider-fire mb-1" />
      {display.map((item, i) => (
        <div key={item.id}>
          <a
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-start gap-3 py-3 px-1 row-hover rounded-md"
          >
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                <span className="text-sm font-semibold group-hover:text-[#0077B6] transition-colors">{item.title}</span>
                <span className={`text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded shrink-0 ${categoryColors[item.category] || categoryColors.news}`}>
                  {item.category}
                </span>
              </div>
              <p className="text-[12px] text-[var(--text-muted)] leading-relaxed line-clamp-2">{item.summary}</p>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-[10px] text-[var(--text-light)]">{item.source}</span>
                <span className="text-[10px] text-[var(--text-light)]">·</span>
                <span className="text-[10px] text-[var(--text-light)]">{new Date(item.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
              </div>
            </div>
            <ExternalLink className="w-3.5 h-3.5 text-[var(--text-light)] shrink-0 mt-1 group-hover:text-[#0077B6] transition-colors" />
          </a>
          {i < display.length - 1 && <div className="divider" />}
        </div>
      ))}
    </div>
  );
}
