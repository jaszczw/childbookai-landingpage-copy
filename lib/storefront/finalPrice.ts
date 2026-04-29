import { defaultStoreCatalog } from "@/components/store/storeCatalog";

const PRICE_FORMATTER_PLN = new Intl.NumberFormat("pl-PL", {
  style: "currency",
  currency: defaultStoreCatalog.currency,
  maximumFractionDigits: 0,
});

/** Final consumer price (in PLN) shown on the storefront. */
export function consumerBasePricePln(): number {
  return defaultStoreCatalog.baseBookPricePln;
}

/** Largest size upsell available, used in "from X" hints. */
export function maxConsumerPricePln(): number {
  const sizeExtra = defaultStoreCatalog.sizeUpsell.pricePln;
  const addons = defaultStoreCatalog.bookAddonUpsells.reduce(
    (acc, u) => acc + u.pricePln,
    0,
  );
  return defaultStoreCatalog.baseBookPricePln + sizeExtra + addons;
}

export function formatPln(value: number): string {
  return PRICE_FORMATTER_PLN.format(value);
}

export function consumerCurrency(): string {
  return defaultStoreCatalog.currency;
}
