/**
 * Some menu photos come from delivery-app CDNs (Talabat, Deliveryhero, etc.)
 * whose URLs include small width/height params that make images look
 * blurry when scaled up. This strips those params and sets a larger,
 * consistent size instead.
 *
 * Falls back to the original URL untouched if it isn't a valid absolute URL
 * (e.g. a local/relative path like "./images/kebab.jpg").
 */
export function fixImageUrl(url, size = 800) {
  if (!url) return url;

  try {
    const u = new URL(url);
    u.searchParams.delete("width");
    u.searchParams.delete("height");
    if (size) {
      u.searchParams.set("width", size);
      u.searchParams.set("height", size);
    }
    return u.toString();
  } catch {
    return url;
  }
}
