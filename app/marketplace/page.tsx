import type { Metadata } from "next";

import { Footer, Navbar } from "@/components/layout";
import {
  CategoryNav,
  EmptyState,
  MarketplaceHero,
  Pagination,
  TemplateGrid,
} from "@/components/marketplace";
import {
  fetchMarketplaceCategories,
  fetchPublishedTemplates,
} from "@/lib/marketplace/api";

const PAGE_SIZE = 12;
const BASE_PATH = "/marketplace";

export const metadata: Metadata = {
  title: "Templates Marketplace | Childbook.ai",
  description:
    "Browse production-ready, personalized children's book templates. Pick a story, brand it, and start selling personalized books in days.",
  alternates: { canonical: "/marketplace" },
  openGraph: {
    title: "Childbook Templates Marketplace",
    description:
      "Production-ready, personalized children's book templates ready for your brand.",
    type: "website",
  },
};

type SearchParams = {
  q?: string | string[];
  category?: string | string[];
  page?: string | string[];
};

type MarketplacePageProps = {
  searchParams: Promise<SearchParams>;
};

function pickString(value: string | string[] | undefined): string | undefined {
  if (Array.isArray(value)) return value[0];
  return value;
}

export default async function MarketplacePage({
  searchParams,
}: MarketplacePageProps) {
  const resolved = await searchParams;
  const query = pickString(resolved.q)?.trim() || undefined;
  const category = pickString(resolved.category)?.trim() || undefined;
  const pageParam = Number.parseInt(pickString(resolved.page) ?? "1", 10);
  const page = Number.isFinite(pageParam) && pageParam > 0 ? pageParam : 1;

  const [categories, listResult] = await Promise.all([
    safeCategoriesCall(),
    safeListCall({ search: query, category, page, pageSize: PAGE_SIZE }),
  ]);

  const templates = listResult?.templates ?? [];
  const totalCount = listResult?.totalCount ?? 0;
  const isLoadFailed = listResult === null;

  return (
    <main className="min-h-screen bg-blue-100">
      <Navbar />

      <div className="px-4 pb-20 pt-6 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="rounded-[36px] bg-white px-5 py-10 shadow-[0_18px_60px_rgba(15,23,42,0.08)] ring-1 ring-blue-1000/10 sm:rounded-[44px] sm:px-10 sm:py-14">
            <MarketplaceHero
              basePath={BASE_PATH}
              query={query}
              totalCount={totalCount}
            />
          </div>

          <section className="mt-8 rounded-[28px] bg-white px-5 py-5 shadow-sm ring-1 ring-blue-1000/10 sm:px-7">
            <CategoryNav
              basePath={BASE_PATH}
              categories={categories}
              activeSlug={category ?? "all"}
              query={query}
            />
          </section>

          <section className="mt-8" aria-label="Marketplace templates">
            {isLoadFailed ? (
              <ErrorBanner />
            ) : templates.length === 0 ? (
              <EmptyState
                basePath={BASE_PATH}
                query={query}
                category={category}
              />
            ) : (
              <>
                <TemplateGrid templates={templates} />
                <Pagination
                  basePath={BASE_PATH}
                  page={page}
                  totalCount={totalCount}
                  pageSize={PAGE_SIZE}
                  query={query}
                  category={category}
                />
              </>
            )}
          </section>
        </div>
      </div>

      <Footer />
    </main>
  );
}

function ErrorBanner() {
  return (
    <div className="mx-auto max-w-xl rounded-3xl border-2 border-dashed border-red-300 bg-red-50 px-6 py-8 text-center text-sm text-red-700">
      <p className="font-bold">We could not load the marketplace right now.</p>
      <p className="mt-1">Please refresh the page in a moment.</p>
    </div>
  );
}

async function safeCategoriesCall() {
  try {
    return await fetchMarketplaceCategories();
  } catch (error) {
    console.error("[marketplace] categories load failed", error);
    return [];
  }
}

async function safeListCall(input: Parameters<typeof fetchPublishedTemplates>[0]) {
  try {
    return await fetchPublishedTemplates(input);
  } catch (error) {
    console.error("[marketplace] list load failed", error);
    return null;
  }
}
