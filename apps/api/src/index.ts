import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { logger } from 'hono/logger';
import wordsRoutes from './routes/words';
import languagesRoutes from './routes/languages';

const app = new Hono();

// Middleware
app.use('*', logger());
app.use(
  '*',
  cors({
    origin: ['http://localhost:3000', 'http://localhost:8081'],
    credentials: true,
  })
);

// Root endpoint
app.get('/', (c) => {
  return c.json({
    message: 'Community Dictionary API',
    version: '1.0.0',
    status: 'healthy',
    endpoints: {
      health: '/api/health',
      words: '/api/words',
      search: '/api/words/search',
      languages: '/api/languages',
    },
  });
});

// Health check
app.get('/api/health', (c) => {
  return c.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

// API routes
app.route('/api/words', wordsRoutes);
app.route('/api/languages', languagesRoutes);

// 404 handler
app.notFound((c) => {
  return c.json({ error: 'Not Found', message: 'The requested endpoint does not exist' }, 404);
});

// Error handler
app.onError((err, c) => {
  console.error('Server error:', err);
  return c.json(
    {
      error: 'Internal Server Error',
      message: 'An unexpected error occurred',
    },
    500
  );
});

const port = Number(process.env.PORT) || 3001;

console.log(`🚀 Community Dictionary API`);
console.log(`📍 Server running on http://localhost:${port}`);
console.log(`📚 API Documentation: http://localhost:${port}/`);

serve({
  fetch: app.fetch,
  port,
});
