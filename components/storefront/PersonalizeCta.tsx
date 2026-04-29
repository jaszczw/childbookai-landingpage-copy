import Link from "next/link";
import { Heart, ShieldCheck, Sparkles, Truck } from "lucide-react";

import {
  consumerBasePricePln,
  formatPln,
  maxConsumerPricePln,
} from "@/lib/storefront/finalPrice";

type PersonalizeCtaProps = {
  slug: string;
  title: string;
};

const BADGES = [
  { icon: Sparkles, label: "Hardcover · 21×21 lub 30×30 cm" },
  { icon: Heart, label: "Dedykacja i strona końcowa w cenie" },
  { icon: Truck, label: "Wysyłka w 24 godziny" },
];

export function PersonalizeCta({ slug, title }: PersonalizeCtaProps) {
  const basePrice = consumerBasePricePln();
  const maxPrice = maxConsumerPricePln();
  const href = `/store?preselect=${encodeURIComponent(slug)}`;

  return (
    <div className="space-y-5 rounded-3xl border-2 border-blue-1000/10 bg-white p-5 sm:p-6">
      <div>
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-bold tabular-nums text-blue-1000">
            {formatPln(basePrice)}
          </span>
          <span className="text-sm text-blue-1000/60">cena finalna</span>
        </div>
        <p className="mt-1 text-xs text-blue-1000/60">
          {`Z dodatkami do ${formatPln(maxPrice)} · Im więcej książek, tym taniej.`}
        </p>
      </div>

      <p className="text-sm text-blue-1000/75">
        Dodaj imię, wgraj zdjęcie i sprawdź podgląd okładki w 5 minut. Książkę
        wydrukujemy i wyślemy w 24h.
      </p>

      <Link
        href={href}
        className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-primary text-base font-bold text-foreground shadow-[0_5px_0_var(--blue-800)] transition-all duration-150 hover:translate-y-[1px] hover:bg-blue-600 hover:shadow-[0_4px_0_var(--blue-800)] active:translate-y-[3px] active:bg-blue-800 active:shadow-[0_2px_0_var(--blue-800)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-800 focus-visible:ring-offset-2"
      >
        <Heart className="h-4 w-4" aria-hidden />
        Personalizuj tę książkę
      </Link>

      <ul className="space-y-2 text-xs text-blue-1000/70">
        {BADGES.map((b) => (
          <li key={b.label} className="flex items-start gap-2">
            <b.icon className="mt-0.5 h-3.5 w-3.5 shrink-0 text-blue-800" aria-hidden />
            <span>{b.label}</span>
          </li>
        ))}
      </ul>

      <p className="flex items-center justify-center gap-1.5 text-[11px] text-blue-1000/55">
        <ShieldCheck className="h-3 w-3" aria-hidden />
        Bezpieczna płatność i 30 dni na zwrot
      </p>
      <span className="sr-only">Wybrana książka: {title}</span>
    </div>
  );
}
