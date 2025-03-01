"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect, useMemo } from "react";
import {
  FiServer,
  FiCircle,
  FiMonitor,
  FiLayers,
  FiGrid,
  FiCheckCircle
} from "react-icons/fi";

// Create a wrapper motion component for the Card
const MotionCard = motion(Card);

// Function to get row and column for grid position
const getGridPosition = (index: number) => {
  // Assuming a 3-column grid (lg:grid-cols-3)
  const row = Math.floor(index / 3);
  const col = index % 3;
  return { row, col };
};

// Calculate diagonal position (higher value = later in diagonal)
const getDiagonalOrder = (index: number) => {
  const { row, col } = getGridPosition(index);
  return row + col;
};

// Custom hook to generate the transforms for each card
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const useCardTransforms = (scrollYProgress: any, diagonalPosition: number) => {
  const borderColor = useTransform(
    scrollYProgress,
    [0.2 + diagonalPosition * 0.15, 0.7 + diagonalPosition * 0.15], // Much wider gaps requiring more scrolling
    ["#E5E7EB", "#3366FF"]
  );

  const iconColor = useTransform(
    scrollYProgress,
    [0.2 + diagonalPosition * 0.15, 0.7 + diagonalPosition * 0.15], // Same timing as border colors
    ["#6B7280", "#3366FF"] // From gray-500 to blue
  );

  const iconBgColor = useTransform(
    scrollYProgress,
    [0.2 + diagonalPosition * 0.15, 0.7 + diagonalPosition * 0.15], // Same timing as border colors
    ["#F3F4F6", "#EBF5FF"] // From gray-100 to light blue
  );

  return { borderColor, iconColor, iconBgColor };
};

export function Features() {
  const sectionRef = useRef(null);

  // Apply smooth scrolling behavior when component mounts
  useEffect(() => {
    // Save the original scroll behavior
    const originalStyle = window.getComputedStyle(document.documentElement).scrollBehavior;

    // Apply smooth scroll behavior
    document.documentElement.style.scrollBehavior = 'smooth';

    // Restore original scroll behavior on unmount
    return () => {
      document.documentElement.style.scrollBehavior = originalStyle;
    };
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"] // Expanded to use the entire scroll area
  });

  // Create an array of card indices to map over
  const cardIndices = useMemo(() => [0, 1, 2, 3, 4, 5], []);

  const diagonalPositions = useMemo(() => cardIndices.map(index => getDiagonalOrder(index)), [cardIndices]);

  // Control sticky behavior - stick until animation completes, then fade out gradually
  const stickyOpacity = useTransform(
    scrollYProgress,
    [0, 0.1, 0.7, 0.85],
    [.8, 1, 1, 1]  // Fade in at start, stay visible during animation, fade out gradually at end
  );

  // Control the scale of the grid for a smooth exit
  const gridScale = useTransform(
    scrollYProgress,
    [0.5, 0.8, 0.95],
    [.98, .95, 0.92] // Slightly scale down as it fades out
  );

  const getBorderClasses = (idx: number): string => {
    switch (idx) {
      case 0:
        return "border";
      case 1:
        return "border";
      case 2:
        return "border";
      case 3:
        return "border";
      case 4:
        return "border";
      case 5:
        return "border";
      default:
        return "border";
    }
  };

  const getCardContent = (idx: number): { title: string; description: string; icon: React.ReactNode } => {
    switch (idx) {
      case 0:
        return {
          title: "Reliable",
          description: "Our network offers high availability with fault-tolerant designs and real-time backups, ensuring uninterrupted service.",
          icon: <FiServer size={24} />
        };
      case 1:
        return {
          title: "Scalable",
          description: "Designed with growth in mind, the Hyperbolic platform effortlessly scales alongside your application and expanding user base.",
          icon: <FiCircle size={24} />
        };
      case 2:
        return {
          title: "Hardware-agnostic",
          description: "Our platform enables any type of GPU to host AI inference endpoints. It's built for inclusivity and performance across various machines.",
          icon: <FiMonitor size={24} />
        };
      case 3:
        return {
          title: "Secure",
          description: "Hyperbolic guarantees the integrity of your requests and ensures unparalleled protection for your data by integrating state-of-the-art cryptography and confidential computation.",
          icon: <FiLayers size={24} />
        };
      case 4:
        return {
          title: "Equitable",
          description: "Our innovative compensation model is designed to reward contributions, so everyone in our ecosystem benefits proportionally as the platform grows.",
          icon: <FiGrid size={24} />
        };
      case 5:
        return {
          title: "Maintainable",
          description: "We deliver clean, well-documented code with future-proof architecture that ensures long-term viability and reduces technical debt for your business applications.",
          icon: <FiCheckCircle size={24} />
        };
      default:
        return { title: "", description: "", icon: null };
    }
  };

  // Custom Card component that handles both mobile and desktop animations
  const AnimatedCard = ({ index, content, borderClasses }: {
    index: number;
    content: { title: string; description: string; icon: React.ReactNode };
    borderClasses: string;
  }) => {
    const { borderColor, iconColor, iconBgColor } = useCardTransforms(scrollYProgress, diagonalPositions[index]);

    // Always create the ref regardless of mobile or desktop
    const cardRef = useRef(null);
    return (
      <MotionCard
        ref={cardRef}
        key={index}
        className={`flex flex-col h-full shadow-none rounded-none ${borderClasses}`}
        style={{ borderColor: borderColor }}
      >
        <CardHeader className="pt-16 pb-8">
          <motion.div
            className="w-16 h-16 mb-8 flex items-center justify-center rounded-md"
            style={{
              backgroundColor: iconBgColor,
              color: iconColor
            }}
          >
            {content.icon}
          </motion.div>
          <CardTitle className="text-xl font-medium">{content.title}</CardTitle>
        </CardHeader>
        <CardContent className="pb-16">
          <p className="text-muted-foreground">
            {content.description}
          </p>
        </CardContent>
      </MotionCard>
    );
  };

  return (
    <section id="features" className="w-full bg-background " ref={sectionRef}>
      <div className="container mx-auto px-4 md:px-6 max-w-7xl pb-10">
        {/* Sticky container for grid */}
        <motion.div
          className="lg:sticky lg:top-20 flex items-center justify-center z-10"
          style={{
            opacity: stickyOpacity,
            scale: gridScale,
            transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)"
          }}
        >
          <div className="w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border border-gray-200">
              {cardIndices.map((index) => {
                const content = getCardContent(index);
                const borderClasses = getBorderClasses(index);

                return (
                  <AnimatedCard
                    key={index}
                    index={index}
                    content={content}
                    borderClasses={borderClasses}
                  />
                );
              })}
            </div>
          </div>
        </motion.div>

        <div className="hidden lg:block h-[250vh] transition-all duration-1000" aria-hidden="true">
        </div>

      </div>
    </section>
  );
}