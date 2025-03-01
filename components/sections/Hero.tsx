"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { scrollToElement } from "@/lib/scroll-utils";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { Parallax } from "@/components/ui/parallax";

export function Hero() {
  return (
    <section id="hero" className="w-full py-16 sm:py-20 md:py-28 lg:py-36 bg-gradient-to-b from-background to-secondary/20 relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 max-w-7xl relative">
        <div className="flex flex-col items-start text-left space-y-6 sm:space-y-8 md:space-y-10">
          <ScrollReveal>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-tight tracking-tight max-w-xs sm:max-w-md md:max-w-xl lg:max-w-4xl">
              <span className="font-normal">We </span>
              <span className="font-bold">build </span>
              <span className="italic">digital </span>
              <span className="font-bold italic">products </span>
              <span className="font-normal">for </span>
              <span className="font-bold">startups </span>
              <span className="font-normal">and </span>
              <span className="italic">enterprises</span>
            </h1>
          </ScrollReveal>
          
          <ScrollReveal delay={0.3}>
            <Button 
              size="lg" 
              asChild
              className="rounded-full bg-slate-900 hover:bg-slate-800 text-white px-5 sm:px-6 h-11 sm:h-12 text-sm sm:text-base"
            >
              <Link href="#contact" className="flex items-center gap-2">
                Get in touch
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                  className="w-4 h-4 sm:w-5 sm:h-5"
                >
                  <path d="M5 12h14"></path>
                  <path d="m12 5 7 7-7 7"></path>
                </svg>
              </Link>
            </Button>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
} 