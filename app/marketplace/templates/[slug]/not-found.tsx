import Link from "next/link";

import { Footer, Navbar } from "@/components/layout";

export default function TemplateNotFound() {
  return (
    <main className="min-h-screen bg-blue-100">
      <Navbar />
      <div className="mx-auto flex min-h-[60vh] max-w-2xl flex-col items-center justify-center px-6 text-center">
        <p className="text-xs font-bold uppercase tracking-[0.25em] text-blue-800">
          404
        </p>
        <h1 className="mt-3 text-3xl font-bold text-blue-1000 sm:text-4xl">
          Template not found
        </h1>
        <p className="mt-3 text-base text-blue-1000/70">
          This template may have been retired or is not yet published.
        </p>
        <Link
          href="/marketplace"
          className="mt-6 inline-flex h-12 items-center justify-center rounded-2xl bg-primary px-6 text-base font-bold text-foreground shadow-[0_5px_0_var(--blue-800)] transition-all duration-150 hover:translate-y-[1px] hover:bg-blue-600 hover:shadow-[0_4px_0_var(--blue-800)] active:translate-y-[3px] active:shadow-[0_2px_0_var(--blue-800)]"
        >
          Browse all templates
        </Link>
      </div>
      <Footer />
    </main>
  );
}
