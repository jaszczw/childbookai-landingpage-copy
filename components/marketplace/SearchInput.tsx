"use client";

import { useState, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search, X } from "lucide-react";

import { Input } from "@/ui/input";
import { AppButton } from "@/ui/app-button";

type SearchInputProps = {
  basePath: string;
  initialValue?: string;
};

export function SearchInput({ basePath, initialValue = "" }: SearchInputProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  // Adjusting state while rendering pattern (React docs): keep the input in
  // sync with the URL query when the user navigates via category chips or
  // browser back/forward without using a layout effect.
  const urlQuery = searchParams.get("q") ?? initialValue;
  const [lastUrlQuery, setLastUrlQuery] = useState(urlQuery);
  const [value, setValue] = useState(urlQuery);
  if (lastUrlQuery !== urlQuery) {
    setLastUrlQuery(urlQuery);
    setValue(urlQuery);
  }

  const submit = (next: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (next.trim()) {
      params.set("q", next.trim());
    } else {
      params.delete("q");
    }
    params.delete("page");
    const qs = params.toString();
    startTransition(() => {
      router.push(qs ? `${basePath}?${qs}` : basePath);
    });
  };

  return (
    <form
      role="search"
      onSubmit={(e) => {
        e.preventDefault();
        submit(value);
      }}
      className="flex w-full max-w-xl items-center gap-2"
    >
      <div className="relative flex-1">
        <Search
          aria-hidden
          className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-blue-1000/60"
        />
        <Input
          type="search"
          inputMode="search"
          placeholder="Search templates by theme, age, keyword…"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="h-12 rounded-2xl border-blue-1000 bg-white pl-9 pr-9 text-base text-blue-1000 shadow-[0_2px_0_rgba(32,59,83,0.15)] placeholder:text-blue-1000/50"
          aria-label="Search marketplace templates"
        />
        {value ? (
          <button
            type="button"
            onClick={() => {
              setValue("");
              submit("");
            }}
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full p-1 text-blue-1000/60 transition hover:bg-blue-100 hover:text-blue-1000"
            aria-label="Clear search"
          >
            <X className="h-4 w-4" />
          </button>
        ) : null}
      </div>
      <AppButton
        type="submit"
        size="md"
        variant="primary"
        shadow
        loading={isPending}
        className="shrink-0"
      >
        Search
      </AppButton>
    </form>
  );
}
