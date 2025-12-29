// Simple in-memory cache with TTL
interface CacheEntry {
  value: string;
  expiresAt: number;
}

class ResponseCache {
  private cache: Map<string, CacheEntry> = new Map();
  private defaultTTL: number = 1000 * 60 * 60; // 1 hour

  set(key: string, value: string, ttl?: number): void {
    const expiresAt = Date.now() + (ttl || this.defaultTTL);
    this.cache.set(key, { value, expiresAt });
  }

  get(key: string): string | null {
    const entry = this.cache.get(key);

    if (!entry) {
      return null;
    }

    // Check if expired
    if (Date.now() > entry.expiresAt) {
      this.cache.delete(key);
      return null;
    }

    return entry.value;
  }

  has(key: string): boolean {
    return this.get(key) !== null;
  }

  delete(key: string): void {
    this.cache.delete(key);
  }

  clear(): void {
    this.cache.clear();
  }

  // Clean up expired entries
  cleanup(): void {
    const now = Date.now();
    const entries = Array.from(this.cache.entries());
    for (const [key, entry] of entries) {
      if (now > entry.expiresAt) {
        this.cache.delete(key);
      }
    }
  }

  // Get cache stats
  getStats(): { size: number; entries: number } {
    this.cleanup();
    return {
      size: this.cache.size,
      entries: this.cache.size,
    };
  }
}

// Export singleton instance
export const responseCache = new ResponseCache();

// Run cleanup every 10 minutes
if (typeof window === 'undefined') {
  setInterval(() => {
    responseCache.cleanup();
  }, 1000 * 60 * 10);
}

// Generate cache key from query and location
export function generateCacheKey(query: string, location: string): string {
  return `${location.toLowerCase().trim()}:${query.toLowerCase().trim()}`;
}
