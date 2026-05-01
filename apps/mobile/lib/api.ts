import Constants from 'expo-constants';

const API_URL = Constants.expoConfig?.extra?.apiUrl || 'http://localhost:3001';

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
  const searchParams = new URLSearchParams();
  if (params.page) searchParams.set('page', params.page.toString());
  if (params.limit) searchParams.set('limit', params.limit.toString());
  if (params.language) searchParams.set('language', params.language);

  const response = await fetch(`${API_URL}/api/words?${searchParams}`);
  if (!response.ok) throw new Error('Failed to fetch words');
  return response.json();
}

export async function searchWords(query: string): Promise<SearchResponse> {
  const response = await fetch(
    `${API_URL}/api/words/search?q=${encodeURIComponent(query)}`
  );
  if (!response.ok) throw new Error('Failed to search words');
  return response.json();
}

export async function getWord(id: string): Promise<Word> {
  const response = await fetch(`${API_URL}/api/words/${id}`);
  if (!response.ok) throw new Error('Failed to fetch word');
  return response.json();
}
