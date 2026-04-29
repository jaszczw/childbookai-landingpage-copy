import { Footer, Navbar } from "@/components/layout";
import { Skeleton } from "@/ui/skeleton";

export default function BooksLoading() {
  return (
    <main className="min-h-screen bg-blue-100">
      <Navbar />
      <div className="px-4 pb-20 pt-6 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="rounded-[36px] bg-white px-5 py-10 ring-1 ring-blue-1000/10 sm:rounded-[44px] sm:px-10 sm:py-14">
            <div className="mx-auto flex max-w-2xl flex-col items-center gap-4">
              <Skeleton className="h-6 w-64 rounded-full" />
              <Skeleton className="h-16 w-full rounded-2xl" />
              <Skeleton className="h-6 w-72 rounded-full" />
              <Skeleton className="mt-2 h-12 w-full rounded-2xl" />
            </div>
          </div>

          <section className="mt-8 rounded-[28px] bg-white px-5 py-5 ring-1 ring-blue-1000/10 sm:px-7">
            <div className="flex gap-2 overflow-hidden">
              {Array.from({ length: 5 }).map((_, i) => (
                <Skeleton key={i} className="h-10 w-24 rounded-full" />
              ))}
            </div>
          </section>

          <section className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="overflow-hidden rounded-3xl border-2 border-blue-1000/10 bg-white"
              >
                <Skeleton className="aspect-square w-full rounded-none" />
                <div className="space-y-3 p-5">
                  <Skeleton className="h-5 w-3/4 rounded-md" />
                  <Skeleton className="h-4 w-full rounded-md" />
                  <Skeleton className="h-4 w-2/3 rounded-md" />
                </div>
              </div>
            ))}
          </section>
        </div>
      </div>
      <Footer />
    </main>
  );
}
