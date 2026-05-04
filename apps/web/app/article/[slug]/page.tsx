import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ExternalLink, Info } from 'lucide-react';
import { notFound } from 'next/navigation';

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  return {
    title: `${params.slug.replace(/_/g, ' ')} --- Tai Khamyang Hub`,
  };
}

async function getWikiData(slug: string) {
  try {
    const res = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${slug}`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return null;
    return await res.json();
  } catch (e) {
    return null;
  }
}

export default async function ArticlePage({ params }: { params: { slug: string } }) {
  const data = await getWikiData(params.slug);

  if (!data) {
    notFound();
  }

  return (
    <div className="relative min-h-screen pt-24 sm:pt-32 pb-20 w-full bg-white">
      <div className="w-full max-w-3xl mx-auto px-6 sm:px-8 lg:px-12">
        <Link 
          href="/resources" 
          className="inline-flex items-center gap-2 text-gray-500 hover:text-amber-700 font-medium mb-10 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" /> Back to Resources
        </Link>

        {data.thumbnail && (
          <div className="w-full h-[40vh] min-h-[300px] rounded-[2rem] overflow-hidden mb-12 shadow-xl border border-gray-100">
            <img 
              src={data.thumbnail.source} 
              alt={data.title} 
              className="w-full h-full object-cover"
            />
          </div>
        )}

        <div className="flex items-center gap-3 mb-4">
          <div className="px-3 py-1 bg-amber-50 text-amber-700 rounded-full text-xs font-bold uppercase tracking-widest flex items-center gap-1.5">
            <Info className="w-3.5 h-3.5" /> Wikipedia Article
          </div>
        </div>

        <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 tracking-tight">
          {data.title}
        </h1>
        
        {data.description && (
          <p className="text-xl text-gray-500 font-medium mb-10 pb-10 border-b border-gray-100">
            {data.description}
          </p>
        )}

        <div className="prose prose-lg prose-amber max-w-none mb-12">
          <p className="text-gray-700 leading-relaxed whitespace-pre-line text-lg">
            {data.extract}
          </p>
        </div>

        <div className="bg-gray-50 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 border border-gray-100">
          <div>
            <h4 className="font-bold text-gray-900 mb-1">Want to read more?</h4>
            <p className="text-gray-600">This summary is provided by Wikimedia API.</p>
          </div>
          <a 
            href={data.content_urls?.desktop?.page || `https://en.wikipedia.org/wiki/${params.slug}`} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-3 rounded-full bg-white border border-gray-200 text-gray-900 font-bold hover:bg-gray-50 hover:border-gray-300 transition-all shadow-sm whitespace-nowrap"
          >
            Read on Wikipedia <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
