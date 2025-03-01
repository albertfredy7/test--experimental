"use client";

import { useEffect, useRef, useState, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  direction?: "up" | "down" | "left" | "right";
  delay?: number;
  duration?: number;
  threshold?: number;
  once?: boolean;
  style?: React.CSSProperties;
}

export function ScrollReveal({
  children,
  className,
  direction = "up",
  delay = 0,
  duration = 0.6,
  threshold = 0.2,
  once = true,
  style,
  ...props
}: ScrollRevealProps) {
  const elementRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  const getTransform = () => {
    switch (direction) {
      case "up":
        return "translateY(40px)";
      case "down":
        return "translateY(-40px)";
      case "left":
        return "translateX(40px)";
      case "right":
        return "translateX(-40px)";
      default:
        return "translateY(40px)";
    }
  };

  useEffect(() => {
    if (!elementRef.current) return;

    const element = elementRef.current;
    let observer: IntersectionObserver;

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          if (once && observer) {
            observer.unobserve(element);
          }
        } else if (!once) {
          setIsInView(false);
        }
      });
    };

    observer = new IntersectionObserver(handleIntersection, {
      threshold,
      rootMargin: "0px",
    });

    observer.observe(element);

    return () => {
      if (observer) {
        observer.unobserve(element);
      }
    };
  }, [once, threshold]);

  const animationStyles: React.CSSProperties = {
    opacity: isInView ? 1 : 0,
    transform: isInView ? "translate(0)" : getTransform(),
    transition: `opacity ${duration}s ease-out ${delay}s, transform ${duration}s ease-out ${delay}s`,
    ...style,
  };

  return (
    <div
      ref={elementRef}
      className={cn(className)}
      style={animationStyles}
      {...props}
    >
      {children}
    </div>
  );
} 