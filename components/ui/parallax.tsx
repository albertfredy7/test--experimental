"use client";

import { useEffect, useRef, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ParallaxProps {
  children: ReactNode;
  className?: string;
  speed?: number;
  direction?: "up" | "down";
  style?: React.CSSProperties;
}

export function Parallax({
  children,
  className,
  speed = 0.2,
  direction = "up",
  style,
  ...props
}: ParallaxProps) {
  const elementRef = useRef<HTMLDivElement>(null);
  const initialPositionRef = useRef<number | null>(null);
  const translationRef = useRef<number>(0);

  useEffect(() => {
    if (!elementRef.current) return;

    const element = elementRef.current;
    const multiplier = direction === "up" ? -1 : 1;
    
    const handleScroll = () => {
      if (initialPositionRef.current === null) {
        const rect = element.getBoundingClientRect();
        initialPositionRef.current = rect.top + window.scrollY;
      }
      
      const windowHeight = window.innerHeight;
      const elementTop = initialPositionRef.current;
      
      // Calculate how far the element is from the viewport center
      const distanceFromCenter = (elementTop - window.scrollY) - windowHeight / 2;
      
      // Apply parallax effect based on distance from center
      translationRef.current = distanceFromCenter * speed * multiplier;
      
      // Apply the transform
      element.style.transform = `translate3d(0, ${translationRef.current}px, 0)`;
    };

    // Run once on mount to set initial position
    handleScroll();
    
    // Add scroll event listener
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [speed, direction]);

  return (
    <div
      ref={elementRef}
      className={cn("will-change-transform", className)}
      style={style}
      {...props}
    >
      {children}
    </div>
  );
} 