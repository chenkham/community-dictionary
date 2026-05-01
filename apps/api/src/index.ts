import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { logger } from 'hono/logger';

const app = new Hono();

// Middleware
app.use('*', logger());
app.use('*', cors());

// Health check
app.get('/', (c) => {
  return c.json({
    message: 'Community Dictionary API',
    version: '1.0.0',
    status: 'healthy',
  });
});

// API routes will be added here
app.get('/api/health', (c) => {
  return c.json({ status: 'ok', timestamp: new Date().toISOString() });
});

const port = Number(process.env.PORT) || 3001;

console.log(`🚀 Server is running on http://localhost:${port}`);

serve({
  fetch: app.fetch,
  port,
});
