import { supabase } from './supabase';

export interface Word {
  id: string;
  tai_khamyang_word: string;
  english_word: string;
  assamese_word: string;
  pronunciation?: string;
  audio_url?: string;
  created_at: string;
  updated_at: string;
}

export interface PaginatedResponse {
  data: Word[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface SearchResponse {
  query: string;
  results: Word[];
  count: number;
}

export async function getWords(params: {
  page?: number;
  limit?: number;
  language?: 'tai' | 'en' | 'as';
}): Promise<PaginatedResponse> {
  const page = params.page || 1;
  const limit = params.limit || 100;
  const offset = (page - 1) * limit;

  let queryBuilder = supabase
    .from('words')
    .select('*', { count: 'exact' })
    .order('created_at', { ascending: false })
    .range(offset, offset + limit - 1);

  if (params.language) {
    const langField =
      params.language === 'tai'
        ? 'tai_khamyang_word'
        : params.language === 'en'
        ? 'english_word'
        : 'assamese_word';
    queryBuilder = queryBuilder.not(langField, 'is', null);
  }

  const { data, error, count } = await queryBuilder;

  if (error) {
    throw new Error(`Failed to fetch words: ${error.message}`);
  }

  const totalPages = count ? Math.ceil(count / limit) : 0;

  return {
    data: data as Word[],
    pagination: {
      page,
      limit,
      total: count || 0,
      totalPages,
    },
  };
}

export async function searchWords(query: string): Promise<SearchResponse> {
  // Try calling the custom RPC if it exists
  const { data, error } = await supabase.rpc('search_words', {
    search_query: query,
  });

  if (error) {
    console.error('RPC search failed, falling back to local search:', error.message);
    
    // Fallback: simple text search
    const { data: fallbackData, error: fallbackError } = await supabase
      .from('words')
      .select('*')
      .or(`tai_khamyang_word.ilike.%${query}%,english_word.ilike.%${query}%,assamese_word.ilike.%${query}%`)
      .limit(50);
      
    if (fallbackError) {
      throw new Error(`Failed to search words: ${fallbackError.message}`);
    }
    
    return {
      query,
      results: fallbackData as Word[],
      count: fallbackData.length,
    };
  }

  return {
    query,
    results: (data || []) as Word[],
    count: (data || []).length,
  };
}

export async function getWord(id: string): Promise<Word> {
  const { data, error } = await supabase
    .from('words')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    throw new Error(`Failed to fetch word: ${error.message}`);
  }

  return data as Word;
}

export async function getWordById(id: string): Promise<Word> {
  return getWord(id);
}
