import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
import { CreateABook } from "@/components/sections/CreateABook";
import { Steps } from "@/components/sections/Steps";
import { Pricing } from "@/components/sections/Pricing";
import { Features } from "@/components/sections/Features";
import { Footer } from "@/components/layout/Footer";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col bg-blue-800 overflow-x-hidden">
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
  );
}
