import { Hono } from 'hono';
import { supabase } from '../lib/supabase';
import {
  createWordSchema,
  updateWordSchema,
  searchQuerySchema,
  paginationSchema,
} from '../lib/validation';
import type { Word, SearchResult, PaginatedResponse } from '../types/database';

const words = new Hono();

// GET /api/words - Get all words with pagination
words.get('/', async (c) => {
  try {
    const query = c.req.query();
    const validated = paginationSchema.parse(query);
    const { page, limit, language } = validated;

    const offset = (page - 1) * limit;

    // Build query
    let queryBuilder = supabase
      .from('words')
      .select('*', { count: 'exact' })
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    // Apply language filter if provided
    if (language) {
      const langField =
        language === 'tai'
          ? 'tai_khamyang_word'
          : language === 'en'
          ? 'english_word'
          : 'assamese_word';
      queryBuilder = queryBuilder.not(langField, 'is', null);
    }

    const { data, error, count } = await queryBuilder;

    if (error) {
      return c.json({ error: 'Failed to fetch words', details: error.message }, 500);
    }

    const totalPages = count ? Math.ceil(count / limit) : 0;

    const response: PaginatedResponse<Word> = {
      data: data || [],
      pagination: {
        page,
        limit,
        total: count || 0,
        totalPages,
      },
    };

    return c.json(response);
  } catch (error: any) {
    return c.json({ error: 'Invalid request', details: error.message }, 400);
  }
});

// GET /api/words/search - Search words
words.get('/search', async (c) => {
  try {
    const query = c.req.query();
    const validated = searchQuerySchema.parse(query);
    const { q, limit } = validated;

    // Use the search_words function from database
    const { data, error } = await supabase.rpc('search_words', {
      search_query: q,
    });

    if (error) {
      return c.json({ error: 'Search failed', details: error.message }, 500);
    }

    // Limit results
    const results = (data || []).slice(0, limit) as SearchResult[];

    return c.json({
      query: q,
      results,
      count: results.length,
    });
  } catch (error: any) {
    return c.json({ error: 'Invalid search query', details: error.message }, 400);
  }
});

// GET /api/words/:id - Get a specific word
words.get('/:id', async (c) => {
  try {
    const id = c.req.param('id');

    const { data, error } = await supabase.from('words').select('*').eq('id', id).single();

    if (error) {
      if (error.code === 'PGRST116') {
        return c.json({ error: 'Word not found' }, 404);
      }
      return c.json({ error: 'Failed to fetch word', details: error.message }, 500);
    }

    return c.json(data);
  } catch (error: any) {
    return c.json({ error: 'Invalid request', details: error.message }, 400);
  }
});

// POST /api/words - Create a new word
words.post('/', async (c) => {
  try {
    const body = await c.req.json();
    const validated = createWordSchema.parse(body);

    const { data, error } = await supabase
      .from('words')
      .insert([validated])
      .select()
      .single();

    if (error) {
      return c.json({ error: 'Failed to create word', details: error.message }, 500);
    }

    return c.json(data, 201);
  } catch (error: any) {
    return c.json({ error: 'Invalid input data', details: error.message }, 400);
  }
});

// PUT /api/words/:id - Update a word
words.put('/:id', async (c) => {
  try {
    const id = c.req.param('id');
    const body = await c.req.json();
    const validated = updateWordSchema.parse(body);

    // Check if word exists
    const { data: existing, error: fetchError } = await supabase
      .from('words')
      .select('id')
      .eq('id', id)
      .single();

    if (fetchError || !existing) {
      return c.json({ error: 'Word not found' }, 404);
    }

    // Update word
    const { data, error } = await supabase
      .from('words')
      .update(validated)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      return c.json({ error: 'Failed to update word', details: error.message }, 500);
    }

    return c.json(data);
  } catch (error: any) {
    return c.json({ error: 'Invalid input data', details: error.message }, 400);
  }
});

// DELETE /api/words/:id - Delete a word
words.delete('/:id', async (c) => {
  try {
    const id = c.req.param('id');

    // Check if word exists
    const { data: existing, error: fetchError } = await supabase
      .from('words')
      .select('id')
      .eq('id', id)
      .single();

    if (fetchError || !existing) {
      return c.json({ error: 'Word not found' }, 404);
    }

    // Delete word
    const { error } = await supabase.from('words').delete().eq('id', id);

    if (error) {
      return c.json({ error: 'Failed to delete word', details: error.message }, 500);
    }

    return c.json({ message: 'Word deleted successfully', id });
  } catch (error: any) {
    return c.json({ error: 'Invalid request', details: error.message }, 400);
  }
});

export default words;
