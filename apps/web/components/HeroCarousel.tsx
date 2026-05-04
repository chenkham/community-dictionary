'use client';

import { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// Authentic Theravada Buddhist heritage images (Tai community / Brahmaputra valley
// monasteries / Buddha statues). Sourced from Wikimedia Commons and Unsplash.
const slides = [
  {
    src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Namphake_Monastery%2C_Naharkatia.jpg/1280px-Namphake_Monastery%2C_Naharkatia.jpg',
    title: 'Namphake Monastery',
    caption: 'A Theravada Buddhist monastery in Naharkatia, Assam — sister tradition to Tai Khamyang kyong.',
  },
  {
    src: 'https://images.unsplash.com/photo-1605649461784-edc01e8a31c2?auto=format&fit=crop&q=80&w=1600',
    title: 'Lord Buddha',
    caption: 'The serene Buddha — at the heart of every Tai Khamyang village.',
  },
  {
    src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/Golden_pagoda%2C_namsai.jpg/1280px-Golden_pagoda%2C_namsai.jpg',
    title: 'Kongmu Kham — Golden Pagoda',
    caption: 'The golden pagoda in Namsai, Arunachal — built by the Tai Khamti community of Northeast India.',
  },
  {
    src: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&q=80&w=1600',
    title: 'Sacred Manuscripts',
    caption: 'Pali scripture preserved on palm-leaf folios at village monasteries.',
  },
  {
    src: 'https://images.unsplash.com/photo-1545048702-79362596cdc9?auto=format&fit=crop&q=80&w=1600',
    title: 'Brahmaputra Valley',
    caption: 'The river plains of upper Assam where the Tai Khamyang have lived for centuries.',
  },
];

export default function HeroCarousel() {
  const [index, setIndex] = useState(0);

  const next = useCallback(() => setIndex((i) => (i + 1) % slides.length), []);
  const prev = useCallback(() => setIndex((i) => (i - 1 + slides.length) % slides.length), []);

  // Auto-advance every 6s
  useEffect(() => {
    const t = setInterval(next, 6000);
    return () => clearInterval(t);
  }, [next]);

  // Keyboard nav
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [next, prev]);

  return (
    <div className="relative rounded-[2rem] overflow-hidden h-[55vh] min-h-[420px] max-h-[640px] shadow-2xl">
      {slides.map((s, i) => (
        <div
          key={s.src}
          className={`absolute inset-0 transition-opacity duration-700 ${i === index ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        >
          <img
            src={s.src}
            alt={s.title}
            className="w-full h-full object-cover"
            onError={(e) => { (e.currentTarget as HTMLImageElement).src = 'https://images.unsplash.com/photo-1605649461784-edc01e8a31c2?auto=format&fit=crop&q=80&w=1600'; }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0F2027]/95 via-[#0F2027]/45 to-transparent" />
          <div className="relative z-10 flex flex-col justify-end h-full p-6 sm:p-10 lg:p-14">
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.25em] text-cyan-300 mb-3">
              {String(i + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
            </span>
            <h1 className="font-heading text-3xl sm:text-5xl font-bold text-white tracking-tight leading-[1.05] mb-3 max-w-3xl">
              {s.title}
            </h1>
            <p className="text-sm sm:text-base text-white/85 max-w-2xl font-light leading-relaxed">
              {s.caption}
            </p>
          </div>
        </div>
      ))}

      {/* Arrows */}
      <button
        onClick={prev}
        aria-label="Previous slide"
        className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/15 hover:bg-white/30 backdrop-blur-md text-white flex items-center justify-center transition-all border border-white/20"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        onClick={next}
        aria-label="Next slide"
        className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/15 hover:bg-white/30 backdrop-blur-md text-white flex items-center justify-center transition-all border border-white/20"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-4 right-6 sm:bottom-6 sm:right-10 flex items-center gap-1.5 z-10">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`h-1.5 rounded-full transition-all ${i === index ? 'w-8 bg-white' : 'w-1.5 bg-white/40 hover:bg-white/60'}`}
          />
        ))}
      </div>
    </div>
  );
}
