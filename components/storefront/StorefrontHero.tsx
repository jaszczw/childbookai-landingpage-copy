import { Heart, ShieldCheck, Sparkles, Truck } from "lucide-react";

import { HeadingText, ParagraphText } from "@/components/typography";
import { SearchInput } from "@/components/marketplace/SearchInput";

type StorefrontHeroProps = {
  basePath: string;
  query?: string;
  totalCount: number;
};

const HIGHLIGHTS = [
  { icon: Heart, label: "Twoje dziecko bohaterem" },
  { icon: Sparkles, label: "Personalizacja w 5 minut" },
  { icon: Truck, label: "Wysyłka w 24h" },
  { icon: ShieldCheck, label: "Gwarancja zwrotu 30 dni" },
];

export function StorefrontHero({
  basePath,
  query,
  totalCount,
}: StorefrontHeroProps) {
  return (
    <section className="relative">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-6 px-2 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border-2 border-blue-1000/15 bg-white/90 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-blue-800 shadow-[0_3px_0_rgba(48,160,166,0.15)]">
          <Sparkles className="h-3.5 w-3.5" aria-hidden />
          Księgarnia Childbook
        </div>

        <HeadingText
          as="h1"
          variant="h1"
          title="Książka, w której bohaterem jest Twoje dziecko."
          className="font-bold"
          coloredPhrases={[{ text: "Twoje dziecko", color: "text-primary" }]}
          defaultTextColor="text-foreground"
          endl={["bohaterem"]}
        />

        <ParagraphText
          as="p"
          variant="lead"
          defaultTextColor="text-foreground/75"
          className="max-w-2xl"
        >
          {totalCount > 0
            ? `Wybierz spośród ${totalCount} historii, dodaj imię i twarz dziecka, a wydrukowaną książkę dostarczymy pod drzwi.`
            : "Wybierz historię, dodaj imię i twarz dziecka, a wydrukowaną książkę dostarczymy pod drzwi."}
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
