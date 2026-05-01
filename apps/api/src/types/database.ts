export interface Word {
  id: string;
  tai_khamyang_word: string;
  english_word: string;
  assamese_word: string;
  pronunciation: string | null;
  audio_url: string | null;
  created_at: string;
  updated_at: string;
  created_by: string | null;
}

export interface Language {
  id: string;
  code: string;
  name: string;
  native_name: string;
  created_at: string;
}

export interface SearchResult extends Word {
  rank: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
