import Link from "next/link";

import { cn } from "@/utils";
import { buildSearchHref } from "@/lib/marketplace/format";
import type { MarketplaceCategory } from "@/lib/marketplace/types";

type CategoryNavProps = {
  basePath: string;
  categories: MarketplaceCategory[];
  activeSlug: string;
  query?: string;
};

export function CategoryNav({
  basePath,
  categories,
  activeSlug,
  query,
}: CategoryNavProps) {
  const items: Array<{ slug: string; label: string; count?: number }> = [
    { slug: "all", label: "All" },
    ...categories.map((c) => ({
      slug: c.slug,
      label: c.name,
      count: c.templateCount,
    })),
  ];

  return (
    <nav
      aria-label="Template categories"
      className="-mx-1 flex flex-nowrap gap-2 overflow-x-auto pb-2 sm:flex-wrap sm:overflow-visible"
    >
      {items.map((item) => {
        const isActive = item.slug === activeSlug;
        const href = buildSearchHref({
          basePath,
          query,
          category: item.slug === "all" ? undefined : item.slug,
        });
        return (
          <Link
            key={item.slug}
            href={href}
            scroll={false}
            aria-current={isActive ? "page" : undefined}
            className={cn(
              "group inline-flex items-center gap-2 rounded-full border-2 px-4 py-2 text-sm font-semibold transition-all duration-200 ease-out",
              isActive
                ? "border-blue-1000 bg-blue-1000 text-white shadow-[0_3px_0_var(--blue-800)]"
                : "border-blue-1000/15 bg-white text-blue-1000 hover:border-blue-1000/40 hover:bg-blue-100",
            )}
          >
            <span>{item.label}</span>
            {typeof item.count === "number" ? (
              <span
                className={cn(
                  "rounded-full px-2 py-0.5 text-[10px] font-bold tabular-nums",
                  isActive
                    ? "bg-white/20 text-white"
                    : "bg-blue-1000/8 text-blue-1000/70 group-hover:bg-white",
                )}
              >
                {item.count}
              </span>
            ) : null}
          </Link>
        );
      })}
    </nav>
  );
}
