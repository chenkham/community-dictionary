#!/bin/bash

# Community Dictionary API Test Script
# This script tests all API endpoints

BASE_URL="http://localhost:3001"

echo "🧪 Testing Community Dictionary API"
echo "===================================="
echo ""

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Test counter
PASSED=0
FAILED=0

# Function to test endpoint
test_endpoint() {
    local method=$1
    local endpoint=$2
    local description=$3
    local data=$4
    
    echo -n "Testing: $description... "
    
    if [ -z "$data" ]; then
        response=$(curl -s -w "\n%{http_code}" -X $method "$BASE_URL$endpoint")
    else
        response=$(curl -s -w "\n%{http_code}" -X $method "$BASE_URL$endpoint" \
            -H "Content-Type: application/json" \
            -d "$data")
    fi
    
    http_code=$(echo "$response" | tail -n1)
    body=$(echo "$response" | sed '$d')
    
    if [ "$http_code" -ge 200 ] && [ "$http_code" -lt 300 ]; then
        echo -e "${GREEN}✓ PASSED${NC} (HTTP $http_code)"
        PASSED=$((PASSED + 1))
    else
        echo -e "${RED}✗ FAILED${NC} (HTTP $http_code)"
        echo "Response: $body"
        FAILED=$((FAILED + 1))
    fi
}

# Check if server is running
echo "Checking if API server is running..."
if ! curl -s "$BASE_URL/api/health" > /dev/null; then
    echo -e "${RED}Error: API server is not running at $BASE_URL${NC}"
    echo "Please start the server with: npm run dev"
    exit 1
fi
echo -e "${GREEN}✓ Server is running${NC}"
echo ""

# Run tests
echo "Running API tests..."
echo ""

# Health check
test_endpoint "GET" "/api/health" "Health check"

# Root endpoint
test_endpoint "GET" "/" "Root endpoint"

# Get all words
test_endpoint "GET" "/api/words" "Get all words"

# Get words with pagination
test_endpoint "GET" "/api/words?page=1&limit=5" "Get words with pagination"

# Get words by language
test_endpoint "GET" "/api/words?language=en" "Get English words"
test_endpoint "GET" "/api/words?language=tai" "Get Tai Khamyang words"
test_endpoint "GET" "/api/words?language=as" "Get Assamese words"

# Search words
test_endpoint "GET" "/api/words/search?q=water" "Search for 'water'"
test_endpoint "GET" "/api/words/search?q=house&limit=5" "Search with limit"

# Get languages
test_endpoint "GET" "/api/languages" "Get all languages"

# Create a new word
test_endpoint "POST" "/api/words" "Create new word" '{
  "tai_khamyang_word": "ꤕꤦꤢ꤬",
  "english_word": "test",
  "assamese_word": "পৰীক্ষা",
  "pronunciation": "test"
}'

# Test error cases
echo ""
echo "Testing error cases..."
echo ""

# 404 - Word not found
test_endpoint "GET" "/api/words/00000000-0000-0000-0000-000000000000" "404 - Word not found (expected to fail)"

# 400 - Invalid search
test_endpoint "GET" "/api/words/search" "400 - Missing search query (expected to fail)"

# 404 - Invalid endpoint
test_endpoint "GET" "/api/invalid" "404 - Invalid endpoint (expected to fail)"

# Summary
echo ""
echo "===================================="
echo "Test Summary"
echo "===================================="
echo -e "Passed: ${GREEN}$PASSED${NC}"
echo -e "Failed: ${RED}$FAILED${NC}"
echo "Total: $((PASSED + FAILED))"
echo ""

if [ $FAILED -eq 0 ]; then
    echo -e "${GREEN}✓ All tests passed!${NC}"
    exit 0
else
    echo -e "${YELLOW}⚠ Some tests failed${NC}"
    exit 1
fi
