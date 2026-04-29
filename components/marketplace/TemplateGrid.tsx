import { TemplateCard } from "./TemplateCard";
import type { MarketplaceTemplateCard } from "@/lib/marketplace/types";

type TemplateGridProps = {
  templates: MarketplaceTemplateCard[];
};

export function TemplateGrid({ templates }: TemplateGridProps) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-8">
      {templates.map((template) => (
        <TemplateCard key={template.id} template={template} />
      ))}
    </div>
  );
}
