import type { Metadata } from 'next';
import { getGalleryItems } from '@/lib/content';
import { Camera } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Gallery — Tai Khamyang Hub',
  description: 'Photo gallery of Tai Khamyang culture — festivals, manuscripts, monasteries, traditional dress, and village life.',
};

const categoryLabels: Record<string, { label: string; grad: string; dot: string }> = {
  festival: { label: 'Festivals', grad: 'g-fire', dot: 'dot-fire' },
  monastery: { label: 'Monasteries', grad: 'g-violet', dot: 'dot-violet' },
  manuscript: { label: 'Manuscripts', grad: 'g-amber', dot: 'dot-amber' },
  dress: { label: 'Traditional Dress', grad: 'g-rose', dot: 'dot-rose' },
  village: { label: 'Village Life', grad: 'g-green', dot: 'dot-green' },
  food: { label: 'Food & Cuisine', grad: 'g-ember', dot: 'dot-ember' },
  weaving: { label: 'Weaving & Textiles', grad: 'g-jade', dot: 'dot-jade' },
};

export default async function GalleryPage() {
  const items = await getGalleryItems();

  // Group by category
  const grouped = items.reduce<Record<string, typeof items>>((acc, item) => {
    (acc[item.category] = acc[item.category] || []).push(item);
    return acc;
  }, {});

  return (
    <div className="relative min-h-screen pt-20 sm:pt-28 pb-12 w-full">
      <div className="w-full max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8">
        <section className="mb-10 sm:mb-14 anim-fade-up">
          <div className="flex items-center gap-2 mb-4">
            <div className="dot dot-rose" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--text-muted)]">Visual Archive</span>
          </div>
          <h1 className="font-heading text-2xl sm:text-4xl font-bold tracking-tight leading-[1.1] mb-4">
            Photo <span className="g-text g-rose">Gallery</span>
          </h1>
          <p className="text-sm sm:text-base text-[var(--text-muted)] max-w-lg leading-relaxed">
            Images from Tai Khamyang cultural life. Photos can be contributed via Google Drive, cloud links, or uploaded directly.
          </p>
        </section>

        {Object.entries(grouped).map(([cat, catItems], ci) => {
          const meta = categoryLabels[cat] || { label: cat, grad: 'g-ocean', dot: 'dot-ocean' };
          return (
            <section key={cat} className={`mb-12 sm:mb-16 anim-fade-up anim-delay-${Math.min(ci + 1, 5)}`}>
              <div className="flex items-center gap-2 mb-3">
                <div className={`dot ${meta.dot}`} />
                <h2 className="font-heading text-lg font-bold">{meta.label}</h2>
              </div>
              <div className={`divider-${meta.grad.replace('g-', '')} mb-1`} />
              {catItems.map((item, i) => (
                <div key={item.id}>
                  <div className="py-3 px-1 row-hover rounded-md">
                    <div className="flex items-start gap-3">
                      {/* Placeholder for image — shows icon when no image available */}
                      <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-md bg-[var(--surface)] flex items-center justify-center shrink-0 overflow-hidden">
                        <Camera className="w-5 h-5 text-[var(--text-light)]" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className={`text-sm font-semibold g-text ${meta.grad} mb-0.5`}>{item.title}</h3>
                        <p className="text-[12px] text-[var(--text-muted)] leading-relaxed">{item.description}</p>
                        {item.credit && <p className="text-[10px] text-[var(--text-light)] mt-1">Photo: {item.credit}</p>}
                      </div>
                    </div>
                  </div>
                  {i < catItems.length - 1 && <div className="divider" />}
                </div>
              ))}
            </section>
          );
        })}

        <div className="divider-rose mt-4 mb-4" />
        <p className="text-xs text-[var(--text-light)]">
          Want to contribute photos? Share via Google Drive link, cloud URL, or contact the Heritage Society. Images will be credited to the contributor.
        </p>
      </div>
    </div>
  );
}
