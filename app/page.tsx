import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
import { CreateABook } from "@/components/sections/CreateABook";
import { Steps } from "@/components/sections/Steps";
import { Pricing } from "@/components/sections/Pricing";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col bg-blue-800">
      <div
        className="relative w-full min-h-screen bg-cover bg-center bg-fixed bg-no-repeat"
        style={{ backgroundImage: "url('/background/bg-2.png')" }}
      >
        <Navbar />
        <Hero />
        <Services />
        <CreateABook />
      </div>
      <div className="relative w-full min-h-screen bg-blue-800 -top-4">
        <Steps />
        <Pricing />
      </div>
    </main>
  );
}


