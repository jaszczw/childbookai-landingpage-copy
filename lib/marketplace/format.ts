import type { MarketplaceTier } from "./types";

const TIER_LABELS: Record<MarketplaceTier, string> = {
  personalized: "Personalized",
  creative: "Creative",
  studio: "Studio",
};

const ALL_TIERS: MarketplaceTier[] = ["personalized", "creative", "studio"];

export function getDisplayedTiers(
  tiers: MarketplaceTier[] | null | undefined,
): MarketplaceTier[] {
  if (!tiers || tiers.length === 0) {
    return ALL_TIERS;
  }
  return ALL_TIERS.filter((t) => tiers.includes(t));
}

export function tierLabel(tier: MarketplaceTier): string {
  return TIER_LABELS[tier];
}

const PRICE_FORMATTER = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

const PRICE_FORMATTER_DECIMALS = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

export function formatPrice(value: number, currency = "USD"): string {
  if (currency === "USD") {
    return PRICE_FORMATTER.format(value);
  }
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatPriceDecimal(value: number, currency = "USD"): string {
  if (currency === "USD") {
    return PRICE_FORMATTER_DECIMALS.format(value);
  }
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

export function buildSearchHref(params: {
  basePath: string;
  query?: string;
  category?: string;
  page?: number;
}): string {
  const search = new URLSearchParams();
  if (params.query) search.set("q", params.query);
  if (params.category && params.category !== "all") {
    search.set("category", params.category);
  }
  if (params.page && params.page > 1) {
    search.set("page", String(params.page));
  }
  const qs = search.toString();
  return qs ? `${params.basePath}?${qs}` : params.basePath;
}
