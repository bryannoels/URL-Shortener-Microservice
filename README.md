# URL Shortener API

## Overview

The URL Shortener API is a smart and simple tool that helps users transform long, complicated web addresses into short, easy-to-share links. This service is perfect for businesses, marketers, and individuals who want to streamline their URLs for better usability and sharing.

With this API, you can quickly create shortened links that redirect to the original websites, making links easier to remember and distribute.

## Key Benefits

- **Simplified URLs:** Convert lengthy web addresses into compact, user-friendly short links
- **Reliable Redirection:** Shortened URLs seamlessly redirect users to the original web pages
- **Duplicate Handling:** Avoid creating multiple short links for the same original URL, the API reuses existing ones
- **URL Validation:** Ensures only valid web addresses are shortened by verifying the domain's existence
- **Easy Access:** Simple API endpoints for creating and using short URLs

## Who Can Use This?

- **Businesses & Marketers:** Share promotional links cleanly across campaigns and social media
- **Developers & Startups:** Integrate efficient URL shortening in apps or websites without hassle
- **Individual Users:** Manage and share links that are easier to communicate and remember
- **Content Creators:** Track and optimize the sharing of articles, videos, or resources

## How It Works

1. **Create a Short URL:** Submit a valid long URL, and receive a unique short link that's easy to share
2. **Reuse Existing Links:** If a URL was previously shortened, the same short link is returned for consistency
3. **Redirect Users:** Accessing the short URL automatically sends users to the original website without delay
4. **Validation Checks:** The system confirms that the original URL's domain exists before shortening to avoid dead links

## Why Choose This API?

- **User-Friendly:** Straightforward to use with minimal setup and easy integration
- **Trustworthy:** Only accepts valid URLs ensuring quality and reliability of shortened links
- **Efficient:** Reuses short links to keep your data organized and avoid unnecessary duplicates
- **Flexible:** Works for personal use or large-scale business applications alike

## Getting Started

No technical expertise needed to start shortening URLs. Simply send your long link to the API and get a short version instantly. Share, track, and manage your URLs effortlessly.

---

# Software Architecture & API Documentation

## Software Architecture Overview

This URL Shortener API is built on a simple and efficient architecture to ensure reliability, scalability, and ease of maintenance:

- **Express.js Framework:** Handles HTTP requests and routing
- **In-Memory Database:** Stores URL mappings (`original_url` → `short_url`) in a JavaScript array for fast access. *(Note: suitable for small-scale or testing; a persistent database is recommended for production.)*
- **URL Validation:** Uses Node.js `URL` constructor for parsing and `dns.lookup` for domain verification, ensuring only valid URLs are shortened
- **Stateless Design:** Each request is independent, enabling easy horizontal scaling if deployed behind a load balancer
- **Simple Incremental ID Generator:** Generates short URLs using a numeric ID counter

## API Documentation

### 1. Create a Short URL

**Endpoint:**  
`POST /api/shorturl`

**Request Body:**
- `url` (string): The full original URL you want to shorten

**Behavior:**
- Validates the URL format
- Checks if the domain exists (DNS lookup)
- If the URL was previously shortened, returns the existing short URL
- Otherwise, creates a new short URL and stores it

**Response:**
- On success:
  ```json
  {
    "original_url": "https://example.com",
    "short_url": 1
  }
  ```
- On error (invalid URL or domain not found):
  ```json
  { "error": "invalid url" }
  ```

### 2. Redirect Using Short URL

**Endpoint:**  
`GET /api/shorturl/:short_url`

**Parameters:**
- `short_url` (number) — The numeric short URL identifier

**Behavior:**
- Looks up the original URL corresponding to the short URL
- Redirects the client to the original URL
- If no match is found, returns an error

**Response:**
- On success: HTTP redirect to the original URL
- On error:
  ```json
  { "error": "invalid url" }
  ```

### 3. Test Endpoint

**Endpoint:**  
`GET /api/hello`

**Response:**
```json
{ "greeting": "hello API" }
```

## Summary

This architecture and API design prioritize simplicity, validation, and reusability; making URL shortening fast, reliable, and easy to integrate with your applications.

---

*Last updated: June 2, 2025*