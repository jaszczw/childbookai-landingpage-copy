import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { cn } from "@/utils";
import { buildSearchHref } from "@/lib/marketplace/format";

type PaginationProps = {
  basePath: string;
  page: number;
  totalCount: number;
  pageSize: number;
  query?: string;
  category?: string;
};

export function Pagination({
  basePath,
  page,
  totalCount,
  pageSize,
  query,
  category,
}: PaginationProps) {
  const totalPages = Math.max(1, Math.ceil(totalCount / pageSize));
  if (totalPages <= 1) return null;

  const prevHref =
    page > 1
      ? buildSearchHref({ basePath, query, category, page: page - 1 })
      : null;
  const nextHref =
    page < totalPages
      ? buildSearchHref({ basePath, query, category, page: page + 1 })
      : null;

  const start = (page - 1) * pageSize + 1;
  const end = Math.min(page * pageSize, totalCount);

  return (
    <nav
      aria-label="Pagination"
      className="mt-10 flex flex-col items-center justify-between gap-4 border-t-2 border-dashed border-blue-1000/10 pt-6 sm:flex-row"
    >
      <p className="text-sm text-blue-1000/70">
        Showing{" "}
        <span className="font-bold tabular-nums text-blue-1000">
          {start}-{end}
        </span>{" "}
        of{" "}
        <span className="font-bold tabular-nums text-blue-1000">
          {totalCount}
        </span>{" "}
        templates
      </p>
      <div className="flex items-center gap-2">
        <PageLink
          href={prevHref}
          disabled={!prevHref}
          label="Previous"
          icon="left"
        />
        <span className="px-2 text-sm font-semibold tabular-nums text-blue-1000">
          {page} / {totalPages}
        </span>
        <PageLink
          href={nextHref}
          disabled={!nextHref}
          label="Next"
          icon="right"
        />
      </div>
    </nav>
  );
}

function PageLink({
  href,
  disabled,
  label,
  icon,
}: {
  href: string | null;
  disabled: boolean;
  label: string;
  icon: "left" | "right";
}) {
  const Icon = icon === "left" ? ChevronLeft : ChevronRight;
  const className = cn(
    "inline-flex h-10 items-center gap-1 rounded-full border-2 border-blue-1000 px-4 text-sm font-bold transition-all duration-150",
    disabled
      ? "cursor-not-allowed border-blue-1000/20 text-blue-1000/30"
      : "bg-white text-blue-1000 shadow-[0_3px_0_var(--blue-800)] hover:translate-y-[1px] hover:shadow-[0_2px_0_var(--blue-800)] active:translate-y-[2px] active:shadow-[0_1px_0_var(--blue-800)]",
  );

  if (disabled || !href) {
    return (
      <span className={className} aria-disabled="true">
        {icon === "left" ? <Icon className="h-4 w-4" aria-hidden /> : null}
        {label}
        {icon === "right" ? <Icon className="h-4 w-4" aria-hidden /> : null}
      </span>
    );
  }
  return (
    <Link href={href} scroll={false} className={className}>
      {icon === "left" ? <Icon className="h-4 w-4" aria-hidden /> : null}
      {label}
      {icon === "right" ? <Icon className="h-4 w-4" aria-hidden /> : null}
    </Link>
  );
}
