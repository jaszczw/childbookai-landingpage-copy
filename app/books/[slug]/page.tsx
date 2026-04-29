import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, BookOpen, Languages, Tags, Users } from "lucide-react";

import { Footer, Navbar } from "@/components/layout";
import { Cover } from "@/components/marketplace";
import { PreviewGallery } from "@/components/marketplace/PreviewGallery";
import { PersonalizeCta } from "@/components/storefront";
import { fetchTemplateBySlug } from "@/lib/marketplace/api";
import { buildSearchHref } from "@/lib/marketplace/format";

type DetailPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: DetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const template = await safeFetch(slug);

  if (!template) {
    return {
      title: "Spersonalizowane książki dla dzieci | Childbook",
      description:
        "Wybierz historię, dodaj imię i twarz dziecka, a wydrukowaną książkę dostarczymy pod drzwi.",
    };
  }

  const title = `${template.title} | Childbook`;
  const description = template.excerpt || template.description || undefined;
  return {
    title,
    description: description ?? undefined,
    keywords: template.keywords?.length
      ? [...template.keywords, template.category, "Childbook"]
      : undefined,
    alternates: { canonical: `/books/${template.slug}` },
    openGraph: {
      title,
      description: description ?? undefined,
      type: "website",
      images: template.coverImg ? [{ url: template.coverImg }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: description ?? undefined,
      images: template.coverImg ? [template.coverImg] : undefined,
    },
  };
}

export default async function BookDetailPage({ params }: DetailPageProps) {
  const { slug } = await params;
  const template = await safeFetch(slug);
  if (!template) notFound();

  const themePoints = (template.theme || "")
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);

  const spreads = (template.spreads ?? [])
    .filter((s) => Boolean(s && s.img))
    .map((s) => ({ page: s.page, img: s.img, text: s.text ?? "" }));

  const tagList = template.tags?.slice(0, 8) ?? [];

  return (
    <main className="min-h-screen bg-blue-100">
      <Navbar />

      <div className="px-4 pb-20 pt-6 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-7xl space-y-6">
          <div className="flex items-center justify-between gap-3">
            <Link
              href="/books"
              className="inline-flex items-center gap-1.5 rounded-full border-2 border-blue-1000/15 bg-white px-3 py-1.5 text-sm font-bold text-blue-1000 transition hover:border-blue-1000/40 hover:bg-blue-100"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden />
              Wszystkie książki
            </Link>
            <Link
              href={buildSearchHref({
                basePath: "/books",
                category: template.categorySlug,
              })}
              className="inline-flex items-center gap-1.5 rounded-full border-2 border-blue-1000/15 bg-white px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-blue-800 transition hover:border-blue-1000/40 hover:bg-blue-100"
            >
              <Tags className="h-3 w-3" aria-hidden />
              {template.category}
            </Link>
          </div>

          <div className="grid gap-6 lg:grid-cols-[minmax(0,1.4fr)_360px]">
            <div className="space-y-6">
              <section className="rounded-[32px] bg-white p-6 ring-1 ring-blue-1000/10 sm:p-8">
                <h1 className="text-3xl font-bold leading-tight text-blue-1000 sm:text-4xl md:text-[2.75rem]">
                  {template.title}
                </h1>
                {template.excerpt ? (
                  <p className="mt-4 max-w-3xl text-lg leading-relaxed text-blue-1000/75">
                    {template.excerpt}
                  </p>
                ) : null}

                {template.description &&
                template.description !== template.excerpt ? (
                  <p className="mt-3 max-w-3xl text-base leading-relaxed text-blue-1000/70">
                    {template.description}
                  </p>
                ) : null}

                <dl className="mt-6 grid gap-3 sm:grid-cols-3">
                  <SnapshotItem
                    icon={Users}
                    label="Wiek"
                    value={template.age ?? "Każdy wiek"}
                  />
                  <SnapshotItem
                    icon={BookOpen}
                    label="Liczba stron"
                    value={
                      template.pages ? `${template.pages} stron` : "Wiele stron"
                    }
                  />
                  <SnapshotItem
                    icon={Languages}
                    label="Język"
                    value={template.language?.toUpperCase() ?? "PL"}
                  />
                </dl>
              </section>

              {spreads.length > 0 ? (
                <section className="rounded-[32px] bg-white p-6 ring-1 ring-blue-1000/10 sm:p-8">
                  <h2 className="text-heading-sm font-bold text-blue-1000">
                    Przykładowe rozkładówki
                  </h2>
                  <p className="mt-1 text-sm text-blue-1000/70">
                    Zobacz, jak wyglądają strony z ilustracjami.
                  </p>
                  <div className="mt-5">
                    <PreviewGallery
                      spreads={spreads}
                      title={template.title}
                    />
                  </div>
                </section>
              ) : null}

              {(themePoints.length > 0 || tagList.length > 0) && (
                <section className="rounded-[32px] bg-white p-6 ring-1 ring-blue-1000/10 sm:p-8">
                  {themePoints.length > 0 ? (
                    <div>
                      <h2 className="text-heading-sm font-bold text-blue-1000">
                        Tematy historii
                      </h2>
                      <ul className="mt-3 flex flex-wrap gap-2">
                        {themePoints.map((point) => (
                          <li
                            key={point}
                            className="rounded-full bg-blue-100 px-3 py-1 text-xs font-bold text-blue-1000"
                          >
                            {point}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : null}

                  {tagList.length > 0 ? (
                    <div className={themePoints.length > 0 ? "mt-5" : undefined}>
                      <h3 className="text-xs font-bold uppercase tracking-wider text-blue-1000/60">
                        Tagi
                      </h3>
                      <ul className="mt-2 flex flex-wrap gap-2">
                        {tagList.map((tag) => (
                          <li
                            key={tag}
                            className="rounded-full border border-blue-1000/15 px-2.5 py-0.5 text-[11px] font-semibold text-blue-1000/70"
                          >
                            #{tag}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : null}
                </section>
              )}
            </div>

            <aside className="space-y-6 lg:sticky lg:top-6 lg:self-start">
              <Cover
                src={template.coverImg}
                alt={template.title}
                seed={template.id}
                className="aspect-square w-full"
                rounded="rounded-[28px]"
              />
              <PersonalizeCta slug={template.slug} title={template.title} />
            </aside>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}

function SnapshotItem({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof BookOpen;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border-2 border-blue-1000/10 bg-white p-4">
      <dt className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-blue-1000/60">
        <Icon className="h-3.5 w-3.5 text-blue-800" aria-hidden />
        {label}
      </dt>
      <dd className="mt-1 text-sm font-bold text-blue-1000">{value}</dd>
    </div>
  );
}

async function safeFetch(slug: string) {
  try {
    return await fetchTemplateBySlug(slug);
  } catch (error) {
    console.error("[books] template fetch failed", { slug, error });
    return null;
  }
}
