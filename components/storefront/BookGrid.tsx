import { BookCard } from "./BookCard";
import type { MarketplaceTemplateCard } from "@/lib/marketplace/types";

type BookGridProps = {
  templates: MarketplaceTemplateCard[];
};

export function BookGrid({ templates }: BookGridProps) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-8">
      {templates.map((template) => (
        <BookCard key={template.id} template={template} />
      ))}
    </div>
  );
}
