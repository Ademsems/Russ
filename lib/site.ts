// Must match the Primary domain in Vercel: the apex 308-redirects to www, so URLs on the apex show as "Page with redirect" in Search Console.
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.advancednavigation.sk"
).replace(/\/+$/, "");
