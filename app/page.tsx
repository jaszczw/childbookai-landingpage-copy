import Image from "next/image";
import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/sections/Hero";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      {/* Navbar + Hero Background */}
      <div className="relative w-full overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 -z-10">
          <Image
            src="/background/bg-1.jpg"
            alt=""
            fill
            className="object-cover"
            priority
          />
        </div>

        <Navbar />
        <Hero />
      </div>
    </main>
  );
}
