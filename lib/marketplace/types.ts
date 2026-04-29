/**
 * Landing-safe shape of a marketplace template card. Mirrors the public
 * `b2bMarketplace.getPublishedTemplates` response from book-illustrator.
 */
export type MarketplaceTier = "personalized" | "creative" | "studio";

export type MarketplaceTemplateCard = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  description?: string | null;
  category: string;
  categorySlug: string;
  age: string | null;
  pages: number | null;
  characterPages?: number | null;
  characterPagesExtended?: number | null;
  basePrice: number;
  generationPrice: number;
  coverImg: string;
  previewImages?: string[];
  keywords?: string[];
  tags?: string[];
  difficulty?: string | null;
  language?: string | null;
  viewCount?: number;
  purchaseCount?: number;
  rating?: number | null;
  reviewCount?: number;
  availableTiers?: MarketplaceTier[] | null;
  templateType?: "BASIC" | "PREMIUM";
  bookId?: string;
};

export type MarketplaceTemplateDetail = MarketplaceTemplateCard & {
  theme?: string | null;
  currency?: string | null;
  videoPreview?: string | null;
  samplePages?: unknown;
  spreads?: Array<{ page: number; text: string; img: string }>;
};

export type MarketplaceTemplateListResponse = {
  templates: MarketplaceTemplateCard[];
  totalCount: number;
  hasNextPage: boolean;
  page: number;
  pageSize: number;
};

export type MarketplaceCategory = {
  name: string;
  slug: string;
  description: string;
  templateCount: number;
};

export type MarketplaceListInput = {
  page?: number;
  pageSize?: number;
  search?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
};
