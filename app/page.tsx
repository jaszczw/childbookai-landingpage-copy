import { Navbar } from "@/components/layout";
import { Hero, Services, CreateABook } from "@/components/sections";
import dynamic from "next/dynamic";

// Lazy load below-the-fold components for better initial load performance
const Steps = dynamic(() => import("@/components/sections").then((mod) => ({ default: mod.Steps })), {
  loading: () => <div className="min-h-[400px]" />, // Prevent layout shift
});

const Pricing = dynamic(() => import("@/components/sections").then((mod) => ({ default: mod.Pricing })), {
  loading: () => <div className="min-h-[500px]" />,
});

const Features = dynamic(() => import("@/components/sections").then((mod) => ({ default: mod.Features })), {
  loading: () => <div className="min-h-[600px]" />,
});

const Footer = dynamic(() => import("@/components/layout").then((mod) => ({ default: mod.Footer })));

export default function Home() {
  return (
    <>
      {/* Skip to main content link for keyboard navigation */}
      {/* <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-white focus:rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
      >
        Skip to main content
      </a> */}
      <main id="main-content" className="min-h-screen flex flex-col bg-blue-800 overflow-x-hidden">
      <div className="relative w-full min-h-screen bg-contain bg-hero bg-repeat bg-center">
        <Navbar />
        <Hero />
        <Services />
        <CreateABook />
      </div>
      <div className="relative w-full min-h-screen bg-blue-800 -top-2 sm:-top-4">
        <Steps />
        <Pricing />
      </div>
      <div className="relative w-full min-h-screen bg-contain bg-center mt-12 sm:mt-16 lg:mt-24 bg-footer">
        <Features />
        <Footer />
      </div>
    </main>
    </>
  );
}
