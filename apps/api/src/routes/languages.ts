import { Hono } from 'hono';
import { supabase } from '../lib/supabase';
import type { Language } from '../types/database';

const languages = new Hono();

// GET /api/languages - Get all supported languages
languages.get('/', async (c) => {
  try {
    const { data, error } = await supabase
      .from('languages')
      .select('*')
      .order('code', { ascending: true });

    if (error) {
      return c.json({ error: 'Failed to fetch languages', details: error.message }, 500);
    }

    return c.json({ languages: data as Language[] });
  } catch (error: any) {
    return c.json({ error: 'Invalid request', details: error.message }, 400);
  }
});

export default languages;
