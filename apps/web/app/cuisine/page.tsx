import type { Metadata } from 'next';
import { getDishes } from '@/lib/content';
import { UtensilsCrossed } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Cuisine --- Tai Khamyang Hub',
  description: 'Traditional Tai Khamyang food --- rice dishes, fish preparations, festival foods, and bamboo cooking.',
};

const categoryMeta: Record<string, { label: string; grad: string; dot: string }> = {
  rice: { label: 'Rice Dishes', grad: 'g-amber', dot: 'dot-amber' },
  fish: { label: 'Fish & Protein', grad: 'g-ocean', dot: 'dot-ocean' },
  vegetable: { label: 'Vegetables & Condiments', grad: 'g-green', dot: 'dot-green' },
  festival: { label: 'Festival Foods', grad: 'g-fire', dot: 'dot-fire' },
  sweet: { label: 'Sweets', grad: 'g-rose', dot: 'dot-rose' },
  drink: { label: 'Beverages', grad: 'g-jade', dot: 'dot-jade' },
};

export default async function CuisinePage() {
  const dishes = await getDishes();

  const grouped = dishes.reduce<Record<string, typeof dishes>>((acc, d) => {
    (acc[d.category] = acc[d.category] || []).push(d);
    return acc;
  }, {});

  return (
    <div className="relative min-h-screen pt-20 sm:pt-28 pb-12 w-full">
      <div className="w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <section className="mb-10 sm:mb-14 anim-fade-up">
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-start">
            <div className="sm:col-span-8">
              <div className="flex items-center gap-2 mb-4">
                <div className="dot dot-ember" />
                <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--text-muted)]">Traditional Food</span>
              </div>
              <h1 className="font-heading text-2xl sm:text-4xl font-bold tracking-tight leading-[1.1] mb-4">
                Tai Khamyang <span className="g-text g-ember">Cuisine</span>
              </h1>
              <p className="text-sm sm:text-base text-[var(--text-muted)] max-w-lg leading-relaxed">
                Rice is the staple. Steamed in leaves, cooked in bamboo, fermented with fish — Tai Khamyang food reflects Southeast Asian roots with Assamese ingredients.
              </p>
            </div>
            <div className="sm:col-span-4">
              <div className="rounded-2xl overflow-hidden shadow-md aspect-[4/5] sm:aspect-square">
                <img
                  src="https://images.unsplash.com/photo-1518779578993-ec3579fee39f?auto=format&fit=crop&q=80&w=800"
                  alt="Sticky rice in bamboo — Khaulam"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {Object.entries(grouped).map(([cat, catDishes], ci) => {
          const meta = categoryMeta[cat] || { label: cat, grad: 'g-ocean', dot: 'dot-ocean' };
          return (
            <section key={cat} className={`mb-12 sm:mb-16 anim-fade-up anim-delay-${Math.min(ci + 1, 5)}`}>
              <div className="flex items-center gap-2 mb-3">
                <div className={`dot ${meta.dot}`} />
                <h2 className="font-heading text-lg font-bold">{meta.label}</h2>
              </div>
              <div className={`divider-${meta.grad.replace('g-', '')} mb-1`} />
              {catDishes.map((dish, i) => (
                <div key={dish.id}>
                  <div className="py-3 px-1 row-hover rounded-md">
                    <div className="flex items-start gap-3">
                      <UtensilsCrossed className={`w-4 h-4 shrink-0 mt-0.5 g-text ${meta.grad}`} />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <span className={`text-sm font-semibold g-text ${meta.grad}`}>{dish.name}</span>
                          {dish.taiName && <span className="font-heading text-sm text-[var(--text-muted)]">{dish.taiName}</span>}
                        </div>
                        <p className="text-[12px] text-[var(--text-muted)] leading-relaxed">{dish.description}</p>
                      </div>
                    </div>
                  </div>
                  {i < catDishes.length - 1 && <div className="divider" />}
                </div>
              ))}
            </section>
          );
        })}

        {/* External link */}
        <div className="divider-ember mt-4 mb-4" />
        <a href="https://www.rumicooks.com/2018/09/tai-khamyang-cuisine.html" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-sm font-semibold g-text g-amber">
          Read more about Tai Khamyang food on RumiCooks ---
        </a>
      </div>
    </div>
  );
}
