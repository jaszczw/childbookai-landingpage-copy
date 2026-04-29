import { ExternalLink, ShieldCheck } from "lucide-react";

import { Sparkle } from "@/ui/sparkle";
import { bookAppTemplateUrl } from "@/lib/marketplace/links";
import { formatPrice } from "@/lib/marketplace/format";

type PurchaseCtaProps = {
  slug: string;
  title: string;
  basePrice: number;
  currency?: string | null;
};

export function PurchaseCta({
  slug,
  title,
  basePrice,
  currency,
}: PurchaseCtaProps) {
  const href = bookAppTemplateUrl(slug);
  return (
    <div className="space-y-4 rounded-3xl border-2 border-blue-1000/10 bg-white p-5 sm:p-6">
      <div className="flex items-baseline gap-2">
        <span className="text-3xl font-bold tabular-nums text-blue-1000">
          {formatPrice(basePrice, currency ?? undefined)}
        </span>
        <span className="text-sm text-blue-1000/60">starting price / mo</span>
      </div>

      <p className="text-sm text-blue-1000/75">
        Continue on Childbook.ai to choose your tier, brand the story, and
        publish personalized copies for your customers.
      </p>

      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-primary text-base font-bold text-foreground shadow-[0_5px_0_var(--blue-800)] transition-all duration-150 hover:translate-y-[1px] hover:bg-blue-600 hover:shadow-[0_4px_0_var(--blue-800)] active:translate-y-[3px] active:bg-blue-800 active:shadow-[0_2px_0_var(--blue-800)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-800 focus-visible:ring-offset-2"
      >
        <Sparkle className="h-4 w-4" />
        Continue on Childbook
        <ExternalLink className="h-4 w-4" aria-hidden />
      </a>

      <p className="flex items-center justify-center gap-1.5 text-xs text-blue-1000/60">
        <ShieldCheck className="h-3.5 w-3.5" aria-hidden />
        Sign in &amp; checkout happen securely on app.childbook.ai
      </p>
      <span className="sr-only">Selected template: {title}</span>
    </div>
  );
}
