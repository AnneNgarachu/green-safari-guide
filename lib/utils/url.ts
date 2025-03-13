/**
 * Get the absolute URL for a path
 * Uses NEXT_PUBLIC_SITE_URL environment variable if available
 * Falls back to localhost:3000 for development
 */
export function getAbsoluteUrl(path: string): string {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
  return `${baseUrl}${path.startsWith("/") ? path : `/${path}`}`
}

/**
 * Get the site's base URL
 */
export function getSiteUrl(): string {
  return process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
}

