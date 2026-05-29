import "server-only";

import superjson from "superjson";

import type {
  MarketplaceCategory,
  MarketplaceListInput,
  MarketplaceTemplateDetail,
  MarketplaceTemplateListResponse,
} from "./types";

/**
 * Base URL of the book-illustrator tRPC API. The landing app calls these
 * public procedures from the server only, so requests stay inside our network
 * and credentials/headers are never exposed to the browser.
 */
const DEFAULT_TRPC_BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://www.childbook.ai/api/trpc"
    : "http://localhost:3000/api/trpc";

const TRPC_BASE_URL = resolveTrpcBaseUrl(
  process.env.BOOK_ILLUSTRATOR_TRPC_URL ?? DEFAULT_TRPC_BASE_URL,
);

function resolveTrpcBaseUrl(value: string): string {
  const trimmed = value.trim().replace(/\/+$/, "");

  if (trimmed.endsWith("/api/trpc")) {
    return trimmed;
  }

  return `${trimmed}/api/trpc`;
}

type TrpcSuccess = {
  result: { data: unknown };
};

type TrpcError = {
  error: {
    json?: { message?: string; code?: string | number };
    message?: string;
    code?: string | number;
  };
};

type TrpcResponse = TrpcSuccess | TrpcError;

class TrpcRequestError extends Error {
  readonly status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = "TrpcRequestError";
    this.status = status;
  }
}

type FetchOptions = {
  /** ISR revalidate window in seconds. */
  revalidate?: number;
  /** Tags for `revalidateTag`. */
  tags?: string[];
  /** Force `no-store` to bypass caching entirely. */
  noStore?: boolean;
};

async function trpcQuery<TInput, TOutput>(
  procedure: string,
  input: TInput,
  options: FetchOptions = {},
): Promise<TOutput> {
  const encodedInput = encodeURIComponent(superjson.stringify(input));
  const url = `${TRPC_BASE_URL}/${procedure}?input=${encodedInput}`;

  const next: { revalidate?: number; tags?: string[] } = {};
  if (typeof options.revalidate === "number") {
    next.revalidate = options.revalidate;
  }
  if (options.tags) {
    next.tags = options.tags;
  }

  const res = await fetch(url, {
    method: "GET",
    headers: { Accept: "application/json" },
    cache: options.noStore ? "no-store" : undefined,
    next: options.noStore ? undefined : next,
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new TrpcRequestError(
      `tRPC ${procedure} HTTP ${res.status}: ${text.slice(0, 200)}`,
      res.status,
    );
  }

  const body = (await res.json()) as TrpcResponse;

  if ("error" in body) {
    const message =
      body.error?.json?.message ?? body.error?.message ?? "tRPC error";
    const status =
      Number(body.error?.json?.code ?? body.error?.code ?? 500) || 500;
    throw new TrpcRequestError(`tRPC ${procedure}: ${message}`, status);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return superjson.deserialize(body.result.data as any) as TOutput;
}

const DEFAULT_REVALIDATE_SECONDS = 60;

export async function fetchPublishedTemplates(
  input: MarketplaceListInput = {},
): Promise<MarketplaceTemplateListResponse> {
  const payload = {
    page: input.page ?? 1,
    pageSize: input.pageSize ?? 12,
    search: input.search,
    category: input.category,
    minPrice: input.minPrice,
    maxPrice: input.maxPrice,
  };
  return trpcQuery<typeof payload, MarketplaceTemplateListResponse>(
    "b2bMarketplace.getPublishedTemplates",
    payload,
    { revalidate: DEFAULT_REVALIDATE_SECONDS, tags: ["marketplace:list"] },
  );
}

export async function fetchMarketplaceCategories(): Promise<
  MarketplaceCategory[]
> {
  return trpcQuery<undefined, MarketplaceCategory[]>(
    "b2bMarketplace.getCategories",
    undefined,
    {
      revalidate: 60 * 10,
      tags: ["marketplace:categories"],
    },
  );
}

export async function fetchTemplateBySlug(
  slug: string,
): Promise<MarketplaceTemplateDetail | null> {
  return trpcQuery<{ slug: string }, MarketplaceTemplateDetail | null>(
    "b2bMarketplace.getTemplateBySlug",
    { slug },
    {
      revalidate: DEFAULT_REVALIDATE_SECONDS,
      tags: [`marketplace:template:${slug}`],
    },
  );
}

export { TrpcRequestError };
