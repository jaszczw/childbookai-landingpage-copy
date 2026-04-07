/**
 * Store catalog: prices, discounts, and per-book upsells.
 * Intended to be replaceable with an API response (same shape).
 */

export type StoreBookSizeId = "21x21" | "30x30";

/** Line-item id for analytics / cart; stable across locales */
export type StoreUpsellSku =
  | "book_size_30x30"
  | "book_dedication"
  | "book_final_page";

export interface StoreSizeUpsell {
  sku: StoreUpsellSku;
  /** Charged when a size option references this upsell */
  pricePln: number;
}

export interface StoreBookAddonUpsell {
  id: "dedication" | "finalPage";
  sku: StoreUpsellSku;
  label: string;
  pricePln: number;
}

export interface StoreSizeOption {
  size: StoreBookSizeId;
  label: string;
  /** When set, selecting this size adds `sizeUpsell.pricePln` */
  extraSku: StoreUpsellSku | null;
}

export interface StoreCatalog {
  /** Optional version string from backend */
  version?: string;
  currency: string;
  baseBookPricePln: number;
  /** Per-book index: 0 = first book full price, 1+ = discount rates */
  bookDiscountRates: readonly number[];
  sizeUpsell: StoreSizeUpsell;
  bookAddonUpsells: readonly StoreBookAddonUpsell[];
  sizeOptions: readonly StoreSizeOption[];
}

export const defaultStoreCatalog: StoreCatalog = {
  currency: "PLN",
  baseBookPricePln: 89,
  bookDiscountRates: [0, 0.1, 0.15, 0.2],
  sizeUpsell: { sku: "book_size_30x30", pricePln: 30 },
  bookAddonUpsells: [
    {
      id: "dedication",
      sku: "book_dedication",
      label: "Dedykacja",
      pricePln: 15,
    },
    {
      id: "finalPage",
      sku: "book_final_page",
      label: "Strona końcowa",
      pricePln: 15,
    },
  ],
  sizeOptions: [
    { size: "21x21", label: "21×21 cm", extraSku: null },
    { size: "30x30", label: "30×30 cm", extraSku: "book_size_30x30" },
  ],
};

export function getBookDiscountRate(
  catalog: StoreCatalog,
  bookIndex: number,
): number {
  const rates = catalog.bookDiscountRates;
  if (bookIndex <= 0) return 0;
  if (bookIndex >= rates.length) return rates[rates.length - 1]!;
  return rates[bookIndex]!;
}

export function sizeExtraPln(
  catalog: StoreCatalog,
  size: StoreBookSizeId,
): number {
  const opt = catalog.sizeOptions.find((o) => o.size === size);
  if (!opt?.extraSku || opt.extraSku !== catalog.sizeUpsell.sku) return 0;
  return catalog.sizeUpsell.pricePln;
}

export function addonUpsellPln(
  catalog: StoreCatalog,
  id: StoreBookAddonUpsell["id"],
): number {
  return (
    catalog.bookAddonUpsells.find((u) => u.id === id)?.pricePln ?? 0
  );
}

/** Map used by legacy call sites; built from catalog */
export function upsellPricesMap(catalog: StoreCatalog): {
  size_30x30: number;
  dedication: number;
  finalPage: number;
} {
  return {
    size_30x30: catalog.sizeUpsell.pricePln,
    dedication: addonUpsellPln(catalog, "dedication"),
    finalPage: addonUpsellPln(catalog, "finalPage"),
  };
}
