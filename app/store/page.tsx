import { StoreView } from "@/components/store/StoreView";
import type { StoryOption } from "@/components/store/storeCoverPresets";
import { fetchTemplateBySlug } from "@/lib/marketplace/api";
import { templateToStory } from "@/lib/storefront/templateToStory";

type SearchParams = {
  preselect?: string | string[];
};

type StorePageProps = {
  searchParams: Promise<SearchParams>;
};

function pickString(value: string | string[] | undefined): string | undefined {
  if (Array.isArray(value)) return value[0];
  return value;
}

async function loadPreselect(
  slug: string | undefined,
): Promise<StoryOption | null> {
  if (!slug) return null;
  try {
    const template = await fetchTemplateBySlug(slug);
    if (!template) return null;
    return templateToStory(template);
  } catch (error) {
    console.error("[store] preselect fetch failed", { slug, error });
    return null;
  }
}

export default async function StorePage({ searchParams }: StorePageProps) {
  const resolved = await searchParams;
  const slug = pickString(resolved.preselect)?.trim() || undefined;
  const preselect = await loadPreselect(slug);

  return <StoreView preselect={preselect} />;
}
