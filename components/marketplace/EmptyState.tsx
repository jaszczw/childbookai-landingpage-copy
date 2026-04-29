import Link from "next/link";
import { SearchX } from "lucide-react";

type EmptyStateProps = {
  query?: string;
  category?: string;
  basePath: string;
};

export function EmptyState({ query, category, basePath }: EmptyStateProps) {
  const filterDescription = [
    query ? `“${query}”` : null,
    category && category !== "all" ? `category “${category}”` : null,
  ]
    .filter(Boolean)
    .join(" in ");

  return (
    <div className="mx-auto flex max-w-md flex-col items-center gap-4 rounded-3xl border-2 border-dashed border-blue-1000/15 bg-white px-6 py-12 text-center">
      <div className="grid h-14 w-14 place-items-center rounded-full bg-blue-100 text-blue-800">
        <SearchX className="h-6 w-6" aria-hidden />
      </div>
      <div className="space-y-1">
        <h3 className="text-heading-sm font-bold text-blue-1000">
          No templates found
        </h3>
        <p className="text-sm text-blue-1000/70">
          {filterDescription
            ? `We could not find any templates for ${filterDescription}.`
            : "We could not find any matching templates."}{" "}
          Try widening your filters or browse all templates.
        </p>
      </div>
      <Link
        href={basePath}
        className="text-sm font-bold text-blue-800 underline-offset-4 hover:underline"
      >
        Browse all templates
      </Link>
    </div>
  );
}
