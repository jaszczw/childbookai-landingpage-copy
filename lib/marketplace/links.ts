/**
 * Public URL of the book-illustrator app where authenticated marketplace
 * actions live (sign-in, purchase, slot claim, custom-template requests).
 * The landing app forwards CTAs there so it never needs auth itself.
 */
const BOOK_APP_URL =
  process.env.NEXT_PUBLIC_BOOK_ILLUSTRATOR_URL ??
  process.env.BOOK_ILLUSTRATOR_PUBLIC_URL ??
  "https://app.childbook.ai";

export function bookAppMarketplaceUrl(): string {
  return `${BOOK_APP_URL}/business/marketplace`;
}

export function bookAppTemplateUrl(slug: string): string {
  return `${BOOK_APP_URL}/business/marketplace/templates/${encodeURIComponent(
    slug,
  )}`;
}

export function bookAppCategoryUrl(categorySlug: string): string {
  return `${BOOK_APP_URL}/business/marketplace/categories/${encodeURIComponent(
    categorySlug,
  )}`;
}
