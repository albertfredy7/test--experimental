"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export function LineAnimation() {
  const sectionRef = useRef<HTMLElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  // Transform scrollYProgress to control animation progress
  const animationProgress = useTransform(scrollYProgress, [0, 1.6], [0, 1.75]);
  
  return (
    <section 
      ref={sectionRef} 
      id="line-animation" 
      className="hidden md:block w-full h-[50vh] relative overflow-hidden"
    >
      <div className="absolute inset-0 top-10 translate-x-64 -right-32 ">
        <svg 
          width="100%" 
          height="100%" 
          viewBox="0 0 1399 458" 
          preserveAspectRatio="none"
          className="absolute inset-0 translate-y-10 translate-x-80"
        >
          <motion.path
            d="M1398 39.9996C1050.33 10.4996 313.5 -30.8004 147.5 39.9996C-18.4997 110.8 -10.6664 159.833 14.0003 175.5C22.0002 193.5 78.8 234.4 242 254C446 278.5 601.5 268 606 350.5C609.6 416.5 607.5 449.333 606 457.5"
            stroke="hsl(210, 70%, 60%)"
            strokeWidth={1}
            fill="none"
            animate={{ pathLength: 0, opacity: 1 }}
            style={{ pathLength: animationProgress }}
          />
        </svg>
      </div>
      <div className="h-[200vh] aria-hidden:"></div>
    </section>
  );
}
