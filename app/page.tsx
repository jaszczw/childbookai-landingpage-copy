import { Navbar } from "@/components/layout";
import { Hero, Services, CreateABook, Steps, Pricing, Features } from "@/sections";
import { Footer } from "@/components/layout/Footer";

export default function Home() {
  return (
    <main id="main-content" className="min-h-screen flex flex-col bg-blue-800 overflow-x-hidden">
      <div className="relative w-full min-h-screen bg-hero">
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
  );
}
