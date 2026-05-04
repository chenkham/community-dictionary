import Link from 'next/link';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import WordOfTheDay from '@/components/WordOfTheDay';

export default function Home() {
  return (
    <div className="relative min-h-screen pt-20 sm:pt-28 pb-20 w-full bg-transparent">
      {/* -- Premium Hero Section with Buddha Image -- */}
      <section className="relative w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 mb-24 sm:mb-32">
        <div className="relative rounded-none sm:rounded-[2.5rem] overflow-hidden h-[60vh] min-h-[500px] flex items-end shadow-2xl">
          {/* Extremely reliable Unsplash image */}
          <div className="absolute inset-0">
            <img 
              src="https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&q=80&w=2070" 
              alt="Golden Buddha" 
              className="w-full h-full object-cover scale-105 hover:scale-100 transition-transform duration-[10s] ease-out"
            />
            {/* Elegant gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent" />
          </div>
          
          <div className="relative z-10 p-8 sm:p-12 lg:p-16 w-full md:w-3/4 lg:w-2/3">
            <h1 className="font-heading text-4xl sm:text-5xl font-bold tracking-tight text-white mb-6 leading-[1.1]">
              Tai Khamyang <br />
              <span className="text-amber-400 font-light italic">People of Gold</span>
            </h1>
            <p className="text-base sm:text-lg text-gray-200 mb-8 leading-relaxed max-w-2xl font-light">
              Preserving the language, sacred manuscripts, Buddhist chants, and living heritage of our Theravada Buddhist community in Northeast India.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <Link href="/dictionary" className="px-8 py-3.5 rounded-full bg-amber-600 hover:bg-amber-500 text-white font-semibold transition-all text-base">
                Explore Dictionary
              </Link>
              <Link href="/about" className="px-8 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/20 font-semibold transition-all text-base">
                Our Story
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* -- Word of the Day -- */}
      <section className="w-full max-w-5xl mx-auto px-6 sm:px-8 lg:px-12 mb-24 sm:mb-32">
        <WordOfTheDay />
      </section>

      {/* -- Discover Categories (List + Beautiful Photo) -- */}
      <section className="w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 mb-24 sm:mb-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          
          <div className="lg:col-span-7 flex flex-col">
            <div className="mb-10">
              <h2 className="font-heading text-3xl sm:text-4xl font-bold text-gray-900">
                Discover Our Heritage
              </h2>
              <p className="text-base sm:text-lg text-gray-500 mt-3 font-light leading-relaxed">
                Journey through the faith, traditions, and vibrant culture that define the Tai Khamyang way of life.
              </p>
            </div>

            {[
              { href: '/manuscripts', title: 'Sacred Texts', desc: 'Ancient folios and monastery records.' },
              { href: '/chants', title: 'Buddhist Chants', desc: 'The sound of devotion and Pali scriptures.' },
              { href: '/traditions', title: 'Traditions', desc: 'Chang Ghor houses and handloom weaving.' },
              { href: '/gallery', title: 'Photo Gallery', desc: 'Visual archive of cultural life.' },
              { href: '/cuisine', title: 'Cuisine', desc: 'Traditional food and recipes.' },
              { href: '/learn', title: 'Learn', desc: 'Phrases and numbers in Tai Khamyang.' },
            ].map((item) => (
              <Link 
                key={item.title} 
                href={item.href}
                className="group flex items-center justify-between py-6 border-b border-gray-200/60 hover:border-amber-400 transition-colors"
              >
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 group-hover:text-amber-700 transition-colors font-heading mb-1">{item.title}</h3>
                  <p className="text-gray-500 text-sm sm:text-base font-light">{item.desc}</p>
                </div>
                <div className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 group-hover:text-amber-600 group-hover:border-amber-200 group-hover:bg-amber-50 transition-all shrink-0">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </Link>
            ))}
          </div>

          <div className="lg:col-span-5 h-[500px] lg:h-[700px] rounded-[2.5rem] overflow-hidden shadow-2xl relative order-first lg:order-last">
            <img 
              src="https://images.unsplash.com/photo-1540324155974-7523202daa3f?auto=format&fit=crop&q=80&w=1000" 
              alt="Monastery" 
              className="absolute inset-0 w-full h-full object-cover scale-105 hover:scale-100 transition-transform duration-[15s] ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-teal-900/60 to-transparent" />
          </div>

        </div>
      </section>

      {/* -- Cultural Insight -- */}
      <section className="w-full max-w-5xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex flex-col md:flex-row gap-8 items-center justify-center py-16 text-center md:text-left relative">
          
          <div className="w-32 h-32 md:w-48 md:h-48 shrink-0 rounded-full overflow-hidden shadow-xl border-4 border-white">
            <img 
              src="https://images.unsplash.com/photo-1515266597335-b223e7f41539?auto=format&fit=crop&q=80&w=500" 
              alt="Elder in nature" 
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex-1">
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
              A Living Tradition
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 leading-relaxed mb-6 font-light italic">
              "Having left our ancient homeland as a community, having wandered together for ages, and shared all major upheavals together, community living is very significant for us."
            </p>
            <Link href="/community" className="inline-flex items-center gap-2 text-amber-700 font-bold hover:text-amber-600 transition-colors text-base group">
              Meet the Community <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

        </div>
      </section>
    </div>
  );
}
