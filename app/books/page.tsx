import type { Metadata } from "next";

import { Footer, Navbar } from "@/components/layout";
import { CategoryNav, Pagination } from "@/components/marketplace";
import {
  BookEmptyState,
  BookGrid,
  StorefrontHero,
} from "@/components/storefront";
import {
  fetchMarketplaceCategories,
  fetchPublishedTemplates,
} from "@/lib/marketplace/api";

const PAGE_SIZE = 12;
const BASE_PATH = "/books";

export const metadata: Metadata = {
  title: "Spersonalizowane książki dla dzieci | Childbook",
  description:
    "Wybierz historię, dodaj imię i twarz dziecka, a wydrukowaną książkę dostarczymy pod drzwi w 24h.",
  alternates: { canonical: "/books" },
  openGraph: {
    title: "Childbook — księgarnia spersonalizowana",
    description:
      "Spersonalizowane książki, w których bohaterem jest Twoje dziecko.",
    type: "website",
  },
};

type SearchParams = {
  q?: string | string[];
  category?: string | string[];
  page?: string | string[];
};

type BooksPageProps = {
  searchParams: Promise<SearchParams>;
};

function pickString(value: string | string[] | undefined): string | undefined {
  if (Array.isArray(value)) return value[0];
  return value;
}

export default async function BooksPage({ searchParams }: BooksPageProps) {
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
            <StorefrontHero
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

          <section className="mt-8" aria-label="Książki spersonalizowane">
            {isLoadFailed ? (
              <ErrorBanner />
            ) : templates.length === 0 ? (
              <BookEmptyState
                basePath={BASE_PATH}
                query={query}
                category={category}
              />
            ) : (
              <>
                <BookGrid templates={templates} />
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
      <p className="font-bold">Nie udało się załadować księgarni.</p>
      <p className="mt-1">Spróbuj odświeżyć stronę za chwilę.</p>
    </div>
  );
}

async function safeCategoriesCall() {
  try {
    return await fetchMarketplaceCategories();
  } catch (error) {
    console.error("[books] categories load failed", error);
    return [];
  }
}

async function safeListCall(input: Parameters<typeof fetchPublishedTemplates>[0]) {
  try {
    return await fetchPublishedTemplates(input);
  } catch (error) {
    console.error("[books] list load failed", error);
    return null;
  }
}
