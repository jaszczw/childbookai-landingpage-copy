import { BookOpen, Globe2, Sparkles, Wand2 } from "lucide-react";

import { HeadingText } from "@/components/typography";
import { ParagraphText } from "@/components/typography";
import { SearchInput } from "./SearchInput";

type MarketplaceHeroProps = {
  basePath: string;
  query?: string;
  totalCount: number;
};

const HIGHLIGHTS = [
  { icon: Wand2, label: "Production-ready" },
  { icon: Sparkles, label: "Personalized covers" },
  { icon: BookOpen, label: "Editable in Studio" },
  { icon: Globe2, label: "Print-on-demand" },
];

export function MarketplaceHero({
  basePath,
  query,
  totalCount,
}: MarketplaceHeroProps) {
  return (
    <section className="relative">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-6 px-2 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border-2 border-blue-1000/15 bg-white/90 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-blue-800 shadow-[0_3px_0_rgba(48,160,166,0.15)]">
          <Sparkles className="h-3.5 w-3.5" aria-hidden />
          Childbook Templates Marketplace
        </div>

        <HeadingText
          as="h1"
          variant="h1"
          title="Launch a personalized book line in days, not months."
          className="font-bold"
          coloredPhrases={[
            { text: "personalized book line", color: "text-primary" },
          ]}
          defaultTextColor="text-foreground"
          endl={["in days"]}
        />

        <ParagraphText
          as="p"
          variant="lead"
          defaultTextColor="text-foreground/75"
          className="max-w-2xl"
        >
          {totalCount > 0
            ? `Browse ${totalCount} ready-to-sell story templates with built-in personalization. Edit, brand, and ship the resulting books straight from Childbook.ai.`
            : "Browse our growing collection of ready-to-sell story templates with built-in personalization. Edit, brand, and ship straight from Childbook.ai."}
        </ParagraphText>

        <div className="mt-2 w-full">
          <div className="mx-auto flex justify-center">
            <SearchInput basePath={basePath} initialValue={query} />
          </div>
        </div>

        <ul className="mt-2 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs font-bold text-blue-1000/70 sm:text-sm">
          {HIGHLIGHTS.map((item) => (
            <li
              key={item.label}
              className="inline-flex items-center gap-1.5 rounded-full bg-white/80 px-3 py-1.5 ring-1 ring-blue-1000/10"
            >
              <item.icon className="h-3.5 w-3.5 text-blue-800" aria-hidden />
              {item.label}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
