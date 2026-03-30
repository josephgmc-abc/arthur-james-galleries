/**
 * Simple In-Memory Rate Limiter
 * Tracks requests by IP address to prevent API abuse.
 */

interface RateLimitStore {
  [key: string]: {
    count: number;
    resetTime: number;
  };
}

const store: RateLimitStore = {};

export interface RateLimitConfig {
  limit: number;      // Max requests
  windowMs: number;   // Time window in milliseconds
}

export function isRateLimited(identifier: string, config: RateLimitConfig): boolean {
  const now = Date.now();
  const record = store[identifier];

  // If no record exists or window has passed, reset
  if (!record || now > record.resetTime) {
    store[identifier] = {
      count: 1,
      resetTime: now + config.windowMs,
    };
    return false;
  }

  // Increment count
  record.count += 1;

  // Check if limit exceeded
  if (record.count > config.limit) {
    return true;
  }

  return false;
}

/**
 * Cleanup expired records from memory every 10 minutes
 */
setInterval(() => {
  const now = Date.now();
  Object.keys(store).forEach((key) => {
    if (now > store[key].resetTime) {
      delete store[key];
    }
  });
}, 600000);
