import { Navigation } from "@/components/Navigation";
import { CardStack } from "@/components/sections/CardStack";
import { FAQ } from "@/components/sections/FAQ";
import { Features } from "@/components/sections/Features";
import { Hero } from "@/components/sections/Hero";
import { LineAnimation } from "@/components/sections/LineAnimation";
import { Services } from "@/components/sections/Services";

export default function Home() {
  return (
    <>
      <Navigation />
      <main className="flex min-h-screen gap-0 flex-col w-full pt-16">
        <Hero />
        <LineAnimation />
        <Features />
        <Services />
        <CardStack />
        <FAQ />
      </main>
    </>
  );
}
