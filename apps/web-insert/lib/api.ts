// Full CRUD API client for the Tai Khamyang Dictionary backend (Hono + Supabase).
// Mirrors the endpoints exposed at apps/api/src/routes/words.ts

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export interface Word {
  id: string;
  tai_khamyang_word: string;
  english_word: string;
  assamese_word: string;
  pronunciation?: string | null;
  audio_url?: string | null;
  created_at: string;
  updated_at: string;
}

export interface PaginatedWords {
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

export interface CreateWordInput {
  tai_khamyang_word: string;
  english_word: string;
  assamese_word: string;
  pronunciation?: string;
  audio_url?: string;
}

export type UpdateWordInput = Partial<CreateWordInput>;

// ---------- helpers ----------

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(init?.headers || {}),
    },
    ...init,
  });

  let body: any = null;
  try {
    body = await res.json();
  } catch {
    /* body may be empty */
  }

  if (!res.ok) {
    const msg =
      body?.details ||
      body?.error ||
      body?.message ||
      `Request failed (${res.status})`;
    throw new Error(msg);
  }
  return body as T;
}

// ---------- endpoints ----------

export function listWords(params: {
  page?: number;
  limit?: number;
  language?: 'tai' | 'en' | 'as';
} = {}): Promise<PaginatedWords> {
  const qs = new URLSearchParams();
  if (params.page) qs.set('page', String(params.page));
  if (params.limit) qs.set('limit', String(params.limit));
  if (params.language) qs.set('language', params.language);
  const suffix = qs.toString() ? `?${qs}` : '';
  return request<PaginatedWords>(`/api/words${suffix}`);
}

export function searchWords(q: string): Promise<SearchResponse> {
  return request<SearchResponse>(
    `/api/words/search?q=${encodeURIComponent(q)}`,
  );
}

export function getWord(id: string): Promise<Word> {
  return request<Word>(`/api/words/${id}`);
}

export function createWord(input: CreateWordInput): Promise<Word> {
  // strip empty optional fields so backend zod accepts them
  const payload: CreateWordInput = {
    tai_khamyang_word: input.tai_khamyang_word.trim(),
    english_word: input.english_word.trim(),
    assamese_word: input.assamese_word.trim(),
  };
  if (input.pronunciation && input.pronunciation.trim()) {
    payload.pronunciation = input.pronunciation.trim();
  }
  if (input.audio_url && input.audio_url.trim()) {
    payload.audio_url = input.audio_url.trim();
  }
  return request<Word>('/api/words', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export function updateWord(
  id: string,
  input: UpdateWordInput,
): Promise<Word> {
  return request<Word>(`/api/words/${id}`, {
    method: 'PUT',
    body: JSON.stringify(input),
  });
}

export function deleteWord(id: string): Promise<{ message: string; id: string }> {
  return request(`/api/words/${id}`, { method: 'DELETE' });
}

export async function getApiHealth(): Promise<{ status: string; uptime: number }> {
  return request('/api/health');
}
