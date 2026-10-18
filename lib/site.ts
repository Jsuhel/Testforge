/**
 * Canonical site origin — used by sitemap.xml, robots.txt and social meta.
 * Set NEXT_PUBLIC_SITE_URL in Vercel (Settings → Environment Variables) to
 * the production domain, e.g. https://testforge-ai.vercel.app.
 */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://testforge-landing.vercel.app";
