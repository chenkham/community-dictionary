'use client';

import { useState } from 'react';
import type { TimelineEvent } from '@/lib/content';

interface Props {
  events: TimelineEvent[];
}

export default function InteractiveTimeline({ events }: Props) {
  const [active, setActive] = useState<string>(events[0]?.id || '');
  const activeEvent = events.find((e) => e.id === active) || events[0];

  return (
    <div>
      {/* Horizontal scrollable track */}
      <div className="overflow-x-auto no-scrollbar pb-2">
        <div className="flex gap-1 min-w-max">
          {events.map((e) => (
            <button
              key={e.id}
              onClick={() => setActive(e.id)}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all whitespace-nowrap ${
                active === e.id
                  ? 'btn-ocean text-white'
                  : 'text-[var(--text-muted)] border border-[var(--border)] hover:text-[var(--text)] hover:bg-[var(--bg-soft)]'
              }`}
            >
              {e.era}
            </button>
          ))}
        </div>
      </div>

      {/* Active event detail */}
      {activeEvent && (
        <div className="mt-4 relative pl-4 anim-fade-up" key={activeEvent.id}>
          <div className={`absolute left-0 top-0.5 bottom-0.5 w-0.5 rounded-full ${activeEvent.bar}`} />
          <h3 className="text-sm font-bold mb-1">{activeEvent.title}</h3>
          <p className="text-sm text-[var(--text-muted)] leading-relaxed">{activeEvent.description}</p>
          {activeEvent.year && (
            <div className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-light)] mt-2">c. {activeEvent.year}</div>
          )}
        </div>
      )}
    </div>
  );
}
