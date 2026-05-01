import { z } from 'zod';

// Word validation schema
export const createWordSchema = z.object({
  tai_khamyang_word: z.string().min(1, 'Tai Khamyang word is required'),
  english_word: z.string().min(1, 'English word is required'),
  assamese_word: z.string().min(1, 'Assamese word is required'),
  pronunciation: z.string().optional(),
  audio_url: z.string().url().optional().or(z.literal('')),
});

export const updateWordSchema = z.object({
  tai_khamyang_word: z.string().min(1).optional(),
  english_word: z.string().min(1).optional(),
  assamese_word: z.string().min(1).optional(),
  pronunciation: z.string().optional(),
  audio_url: z.string().url().optional().or(z.literal('')),
});

export const searchQuerySchema = z.object({
  q: z.string().min(1, 'Search query is required'),
  limit: z.string().optional().transform((val) => (val ? parseInt(val, 10) : 20)),
});

export const paginationSchema = z.object({
  page: z.string().optional().transform((val) => (val ? parseInt(val, 10) : 1)),
  limit: z.string().optional().transform((val) => (val ? parseInt(val, 10) : 20)),
  language: z.enum(['tai', 'en', 'as']).optional(),
});

export type CreateWordInput = z.infer<typeof createWordSchema>;
export type UpdateWordInput = z.infer<typeof updateWordSchema>;
export type SearchQuery = z.infer<typeof searchQuerySchema>;
export type PaginationQuery = z.infer<typeof paginationSchema>;
