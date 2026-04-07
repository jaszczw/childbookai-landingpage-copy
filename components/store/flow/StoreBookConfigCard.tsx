"use client";

import { cn } from "@/utils";
import { Check, Upload } from "lucide-react";
import Image from "next/image";
import { pickCoverIllustrationVariant } from "../storeCoverPresets";
import type { StoreCatalog } from "../storeCatalog";
import { StoreStepCard } from "../StoreStepCard";
import { singleBookPrice } from "../useStoreState";
import type { BookConfig, StoryOption, StoreFormState } from "../useStoreState";
import { StoreUpsellToggle } from "./StoreUpsellToggle";

function addonDef(
  catalog: StoreCatalog,
  id: "dedication" | "finalPage",
) {
  return catalog.bookAddonUpsells.find((u) => u.id === id);
}

export function StoreBookConfigCard({
  catalog,
  story,
  storyId,
  bookIndex,
  totalBooks,
  config,
  formGender: gender,
  visible,
  updateBookConfig,
}: {
  catalog: StoreCatalog;
  story: StoryOption;
  storyId: string;
  bookIndex: number;
  totalBooks: number;
  config: BookConfig;
  formGender: StoreFormState["gender"];
  visible: boolean;
  updateBookConfig: (
    id: string,
    updater: (prev: BookConfig) => BookConfig,
  ) => void;
}) {
  const bookCoverVariant = pickCoverIllustrationVariant(
    story.remotion,
    story.protagonistGender,
    gender,
  );
  const bookCoverImg = bookCoverVariant?.illustrationImage;

  const dedicationUpsell = addonDef(catalog, "dedication");
  const finalPageUpsell = addonDef(catalog, "finalPage");

  return (
    <StoreStepCard visible={visible} autoScroll={false}>
      <div className="mb-5 flex items-center gap-2.5">
        {bookCoverImg ? (
          <div className="relative size-14 shrink-0 overflow-hidden rounded-lg bg-blue-100 shadow-sm ring-1 ring-blue-200/50">
            <Image
              src={bookCoverImg}
              alt=""
              width={56}
              height={56}
              className="h-full w-full object-cover object-center"
              style={
                bookCoverVariant?.illustrationTopOffset != null
                  ? {
                      objectPosition: `center calc(50% + ${bookCoverVariant.illustrationTopOffset * 0.06}px)`,
                    }
                  : undefined
              }
            />
            <span className="absolute bottom-0.5 right-0.5 text-sm drop-shadow">
              {story.coverEmoji}
            </span>
          </div>
        ) : (
          <span className="text-2xl">{story.coverEmoji}</span>
        )}
        <div>
          <h3 className="text-lg font-semibold text-blue-1000">{story.title}</h3>
          <p className="text-xs text-blue-1000/40">
            Książka {bookIndex + 1} z {totalBooks}
          </p>
        </div>
      </div>

      <div className="space-y-5">
        <div>
          <label className="mb-2 block text-sm font-medium text-blue-1000/60">
            Rozmiar
          </label>
          <div className="flex gap-2">
            {catalog.sizeOptions.map((opt) => {
              const extra =
                opt.extraSku === catalog.sizeUpsell.sku
                  ? catalog.sizeUpsell.pricePln
                  : 0;
              return (
                <button
                  key={opt.size}
                  onClick={() =>
                    updateBookConfig(storyId, (prev) => ({
                      ...prev,
                      size: opt.size,
                    }))
                  }
                  className={cn(
                    "flex flex-1 flex-col items-center rounded-xl px-4 py-3 text-sm transition-all",
                    config.size === opt.size
                      ? "bg-white font-medium shadow-md ring-1 ring-blue-400"
                      : "bg-blue-100/80 hover:bg-white hover:shadow-sm",
                  )}
                >
                  <span>{opt.label}</span>
                  {extra > 0 && (
                    <span className="mt-0.5 text-[10px] text-blue-800">
                      +{extra} zł
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {dedicationUpsell && (
          <StoreUpsellToggle
            label={dedicationUpsell.label}
            price={dedicationUpsell.pricePln}
            enabled={config.dedication.enabled}
            onToggle={() =>
              updateBookConfig(storyId, (prev) => ({
                ...prev,
                dedication: {
                  ...prev.dedication,
                  enabled: !prev.dedication.enabled,
                },
              }))
            }
          >
            <div className="space-y-3">
              <div>
                <label className="mb-1 block text-xs font-medium text-blue-1000/60">
                  Tytuł dedykacji
                </label>
                <input
                  type="text"
                  value={config.dedication.title}
                  onChange={(e) =>
                    updateBookConfig(storyId, (prev) => ({
                      ...prev,
                      dedication: {
                        ...prev.dedication,
                        title: e.target.value,
                      },
                    }))
                  }
                  placeholder="np. Dla mojego synka"
                  className="w-full rounded-lg border-0 bg-white px-3 py-2 text-sm text-blue-1000 shadow-sm outline-none ring-1 ring-grey-100 placeholder:text-placeholder focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-blue-1000/60">
                  Treść
                </label>
                <textarea
                  value={config.dedication.text}
                  onChange={(e) =>
                    updateBookConfig(storyId, (prev) => ({
                      ...prev,
                      dedication: {
                        ...prev.dedication,
                        text: e.target.value,
                      },
                    }))
                  }
                  placeholder="Twoja wiadomość..."
                  rows={3}
                  className="w-full resize-none rounded-lg border-0 bg-white px-3 py-2 text-sm text-blue-1000 shadow-sm outline-none ring-1 ring-grey-100 placeholder:text-placeholder focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-blue-1000/60">
                  Podpis
                </label>
                <input
                  type="text"
                  value={config.dedication.underwriting}
                  onChange={(e) =>
                    updateBookConfig(storyId, (prev) => ({
                      ...prev,
                      dedication: {
                        ...prev.dedication,
                        underwriting: e.target.value,
                      },
                    }))
                  }
                  placeholder="np. Od Mamy i Taty"
                  className="w-full rounded-lg border-0 bg-white px-3 py-2 text-sm text-blue-1000 shadow-sm outline-none ring-1 ring-grey-100 placeholder:text-placeholder focus:ring-2 focus:ring-blue-400"
                />
              </div>
            </div>
          </StoreUpsellToggle>
        )}

        {finalPageUpsell && (
          <StoreUpsellToggle
            label={finalPageUpsell.label}
            price={finalPageUpsell.pricePln}
            enabled={config.finalPage.enabled}
            onToggle={() =>
              updateBookConfig(storyId, (prev) => ({
                ...prev,
                finalPage: {
                  ...prev.finalPage,
                  enabled: !prev.finalPage.enabled,
                },
              }))
            }
          >
            <div className="space-y-3">
              <div>
                <label className="mb-1 block text-xs font-medium text-blue-1000/60">
                  Krótki tytuł
                </label>
                <input
                  type="text"
                  value={config.finalPage.shortTitle}
                  onChange={(e) =>
                    updateBookConfig(storyId, (prev) => ({
                      ...prev,
                      finalPage: {
                        ...prev.finalPage,
                        shortTitle: e.target.value,
                      },
                    }))
                  }
                  placeholder="np. Mój najlepszy przyjaciel"
                  className="w-full rounded-lg border-0 bg-white px-3 py-2 text-sm text-blue-1000 shadow-sm outline-none ring-1 ring-grey-100 placeholder:text-placeholder focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-blue-1000/60">
                  Zdjęcie na ostatnią stronę
                </label>
                <button
                  type="button"
                  onClick={() => {
                    updateBookConfig(storyId, (prev) => ({
                      ...prev,
                      finalPage: {
                        ...prev.finalPage,
                        photoUploaded: true,
                        photoUrl: "/mock-final-page.svg",
                      },
                    }));
                  }}
                  className={cn(
                    "flex w-full items-center justify-center gap-2 rounded-xl border-2 border-dashed px-4 py-6 text-sm transition-all",
                    config.finalPage.photoUploaded
                      ? "border-emerald-300 bg-emerald-50/60 text-emerald-700"
                      : "border-grey-100 bg-blue-100/50 text-blue-1000/60 hover:border-blue-400 hover:bg-blue-100",
                  )}
                >
                  {config.finalPage.photoUploaded ? (
                    <>
                      <Check className="h-4 w-4" />
                      Zdjęcie dodane
                    </>
                  ) : (
                    <>
                      <Upload className="h-4 w-4" />
                      Dodaj zdjęcie
                    </>
                  )}
                </button>
              </div>
            </div>
          </StoreUpsellToggle>
        )}

        <div className="rounded-lg bg-blue-100/80 px-3 py-2 text-right text-sm text-blue-1000/60">
          Ta książka:{" "}
          <span className="font-semibold text-blue-1000">
            {singleBookPrice(config, catalog)} zł
          </span>
        </div>
      </div>
    </StoreStepCard>
  );
}
