# API Documentation

REST API documentation for the Community Dictionary backend.

## Base URL

```
Development: http://localhost:3001
Production: https://api.community-dictionary.com (TBD)
```

## Authentication

Currently, the API uses Supabase authentication. Include the JWT token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

## Endpoints

### Health Check

#### GET /api/health

Check if the API is running.

**Response:**
```json
{
  "status": "ok",
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

### Words

#### GET /api/words

Get all words with pagination.

**Query Parameters:**
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 20, max: 100)
- `language` (optional): Filter by language (tai, en, as)
- `part_of_speech` (optional): Filter by part of speech

**Example:**
```
GET /api/words?page=1&limit=20&language=en
```

**Response:**
```json
{
  "data": [
    {
      "id": "uuid",
      "tai_khamyang_word": "ꤢꤢ꤬",
      "english_word": "water",
      "assamese_word": "পানী",
      "pronunciation": "nam",
      "part_of_speech": "noun",
      "example_sentence": "I drink water every day.",
      "created_at": "2024-01-15T10:00:00.000Z",
      "updated_at": "2024-01-15T10:00:00.000Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 150,
    "totalPages": 8
  }
}
```

#### GET /api/words/:id

Get a specific word by ID.

**Response:**
```json
{
  "id": "uuid",
  "tai_khamyang_word": "ꤢꤢ꤬",
  "english_word": "water",
  "assamese_word": "পানী",
  "pronunciation": "nam",
  "part_of_speech": "noun",
  "example_sentence": "I drink water every day.",
  "created_at": "2024-01-15T10:00:00.000Z",
  "updated_at": "2024-01-15T10:00:00.000Z"
}
```

#### GET /api/words/search

Search for words across all languages.

**Query Parameters:**
- `q` (required): Search query
- `limit` (optional): Max results (default: 20)

**Example:**
```
GET /api/words/search?q=water&limit=10
```

**Response:**
```json
{
  "query": "water",
  "results": [
    {
      "id": "uuid",
      "tai_khamyang_word": "ꤢꤢ꤬",
      "english_word": "water",
      "assamese_word": "পানী",
      "pronunciation": "nam",
      "part_of_speech": "noun",
      "rank": 0.95
    }
  ],
  "count": 1
}
```

#### POST /api/words

Create a new word entry (requires authentication).

**Request Body:**
```json
{
  "tai_khamyang_word": "ꤢꤢ꤬",
  "english_word": "water",
  "assamese_word": "পানী",
  "pronunciation": "nam",
  "part_of_speech": "noun",
  "example_sentence": "I drink water every day."
}
```

**Response:**
```json
{
  "id": "uuid",
  "tai_khamyang_word": "ꤢꤢ꤬",
  "english_word": "water",
  "assamese_word": "পানী",
  "pronunciation": "nam",
  "part_of_speech": "noun",
  "example_sentence": "I drink water every day.",
  "created_at": "2024-01-15T10:00:00.000Z",
  "updated_at": "2024-01-15T10:00:00.000Z"
}
```

#### PUT /api/words/:id

Update a word entry (requires authentication, own entries only).

**Request Body:**
```json
{
  "pronunciation": "naam",
  "example_sentence": "Updated example sentence."
}
```

**Response:**
```json
{
  "id": "uuid",
  "tai_khamyang_word": "ꤢꤢ꤬",
  "english_word": "water",
  "assamese_word": "পানী",
  "pronunciation": "naam",
  "part_of_speech": "noun",
  "example_sentence": "Updated example sentence.",
  "created_at": "2024-01-15T10:00:00.000Z",
  "updated_at": "2024-01-15T11:00:00.000Z"
}
```

#### DELETE /api/words/:id

Delete a word entry (requires authentication, own entries only).

**Response:**
```json
{
  "message": "Word deleted successfully",
  "id": "uuid"
}
```

### Languages

#### GET /api/languages

Get all supported languages.

**Response:**
```json
{
  "languages": [
    {
      "id": "uuid",
      "code": "tai",
      "name": "Tai Khamyang",
      "native_name": "ꤕꤢꤧ ꤊꤢꤧ꤬ꤗꤢꤩ"
    },
    {
      "id": "uuid",
      "code": "en",
      "name": "English",
      "native_name": "English"
    },
    {
      "id": "uuid",
      "code": "as",
      "name": "Assamese",
      "native_name": "অসমীয়া"
    }
  ]
}
```

## Error Responses

### 400 Bad Request
```json
{
  "error": "Bad Request",
  "message": "Invalid input data",
  "details": {
    "field": "english_word",
    "issue": "Required field missing"
  }
}
```

### 401 Unauthorized
```json
{
  "error": "Unauthorized",
  "message": "Authentication required"
}
```

### 403 Forbidden
```json
{
  "error": "Forbidden",
  "message": "You don't have permission to perform this action"
}
```

### 404 Not Found
```json
{
  "error": "Not Found",
  "message": "Word not found"
}
```

### 500 Internal Server Error
```json
{
  "error": "Internal Server Error",
  "message": "An unexpected error occurred"
}
```

## Rate Limiting

- **Anonymous**: 100 requests per 15 minutes
- **Authenticated**: 1000 requests per 15 minutes

## CORS

CORS is enabled for all origins in development. In production, only whitelisted domains are allowed.

## Versioning

The API uses URL versioning. Current version: v1

Future versions will be available at:
```
/api/v2/words
```

## Coming Soon

- [ ] Bulk word upload endpoint
- [ ] Audio pronunciation upload
- [ ] User favorites
- [ ] Word statistics
- [ ] Admin endpoints
