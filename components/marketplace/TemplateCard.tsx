import Link from "next/link";
import { ArrowUpRight, BookOpen, Sparkles } from "lucide-react";

import { Cover } from "./Cover";
import { formatPrice } from "@/lib/marketplace/format";
import type { MarketplaceTemplateCard } from "@/lib/marketplace/types";

type TemplateCardProps = {
  template: MarketplaceTemplateCard;
};

export function TemplateCard({ template }: TemplateCardProps) {
  const href = `/marketplace/templates/${encodeURIComponent(template.slug)}`;
  const ages = template.age ?? "All ages";
  const pages = template.pages ?? null;

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-3xl border-2 border-blue-1000/10 bg-white shadow-[0_4px_0_rgba(32,59,83,0.08)] transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-1000/30 hover:shadow-[0_8px_0_rgba(32,59,83,0.12)] focus-within:border-blue-1000/40">
      <Link
        href={href}
        className="absolute inset-0 z-10 rounded-3xl outline-none focus-visible:ring-2 focus-visible:ring-blue-800"
        aria-label={`View ${template.title}`}
      >
        <span className="sr-only">View {template.title}</span>
      </Link>

      <Cover
        src={template.coverImg}
        alt={template.title}
        seed={template.id}
        className="aspect-square w-full"
        rounded="rounded-none"
      />

      <div className="absolute left-4 top-4 z-20 inline-flex items-center gap-1.5 rounded-full border-2 border-white/70 bg-white/90 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-blue-1000 backdrop-blur-sm">
        <Sparkles className="h-3 w-3 text-blue-800" aria-hidden />
        {template.category}
      </div>

      <div className="absolute right-4 top-4 z-20 inline-flex items-center gap-1 rounded-full bg-blue-1000 px-3 py-1 text-[11px] font-bold tabular-nums text-white shadow-md">
        from {formatPrice(template.basePrice)}
      </div>

      <div className="relative z-20 flex flex-1 flex-col gap-3 bg-white p-5">
        <h3 className="text-heading-sm font-bold leading-snug text-blue-1000 group-hover:text-blue-800">
          {template.title}
        </h3>
        {template.excerpt ? (
          <p className="line-clamp-2 text-sm leading-relaxed text-blue-1000/70">
            {template.excerpt}
          </p>
        ) : null}
        <dl className="mt-auto flex items-center justify-between gap-2 border-t-2 border-dashed border-blue-1000/10 pt-3 text-xs font-semibold text-blue-1000/70">
          <div className="flex items-center gap-1.5">
            <BookOpen className="h-3.5 w-3.5" aria-hidden />
            <dt className="sr-only">Pages</dt>
            <dd>{pages ? `${pages} pages` : "Variable length"}</dd>
          </div>
          <div className="flex items-center gap-1.5">
            <dt className="sr-only">Age</dt>
            <dd className="rounded-full bg-blue-100 px-2 py-0.5 text-blue-1000">
              Age {ages}
            </dd>
          </div>
          <div className="flex items-center gap-1 text-blue-800">
            <span className="hidden sm:inline">Explore</span>
            <ArrowUpRight className="h-4 w-4" aria-hidden />
          </div>
        </dl>
      </div>
    </article>
  );
}
