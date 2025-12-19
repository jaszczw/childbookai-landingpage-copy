import Link from "next/link";
import { ArrowRight2 } from "iconsax-react";
import { AppButton } from "@/components/shared/AppButton";

export function Hero() {
  return (
    <section className="relative flex items-center justify-center px-4 sm:px-5 tablet:px-6 laptop:px-8 desktop:px-10 py-14 sm:py-16 md:py-20 laptop:py-24 desktop:py-28 min-h-[70vh] sm:min-h-[75vh] lg:min-h-[80vh]">
      <div className="max-w-4xl mx-auto text-center space-y-4 sm:space-y-5 md:space-y-6 laptop:space-y-8">
        <p className="text-[11px] sm:text-xs tablet:text-sm md:text-base uppercase tracking-[0.18em] text-blue-600">
          AI-Powered Story Creation
        </p>

        <h1 className="text-3xl sm:text-4xl tablet:text-5xl laptop:text-6xl desktop:text-7xl font-bold text-blue-1000 leading-tight sm:leading-tight md:leading-[1.1]">
          Create Magical Stories for Children
        </h1>

        <p className="text-sm sm:text-base tablet:text-lg laptop:text-xl text-blue-1000/90 max-w-2xl mx-auto">
          Transform your ideas into beautiful, personalized children&apos;s
          books with the power of artificial intelligence.
        </p>

        <div className="flex flex-col items-center gap-3 sm:gap-4 pt-3 sm:pt-4">
          <AppButton
            variant="hero"
            size="lg"
            trailing={<ArrowRight2 size={22} />}
          >
            Get Started
          </AppButton>

          <Link
            href="/styleguide/components"
            className="text-xs sm:text-sm md:text-base text-blue-600 hover:text-blue-800 transition-colors"
          >
            View Style Guide
          </Link>
        </div>
      </div>
    </section>
  );
}


