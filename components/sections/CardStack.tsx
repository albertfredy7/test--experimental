"use client";

import { useTransform, motion, useScroll, MotionValue } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';

// Project data
const projects = [
  {
    title: 'Matthias Leidinger',
    description:
      'Originally hailing from Austria, Berlin-based photographer Matthias Leindinger is a young creative brimming with talent and ideas.',
    link: 'https://images.unsplash.com/photo-1605106702842-01a887a31122?q=80&w=500&auto=format&fit=crop',
    color: '#5196fd',
  },
  {
    title: 'Clément Chapillon',
    description:
      "This is a story on the border between reality and imaginary, about the contradictory feelings that the insularity of a rocky, arid, and wild territory provokes\"—so French photographer Clément.",
    link: 'https://images.unsplash.com/photo-1605106250963-ffda6d2a4b32?w=500&auto=format&fit=crop&q=60',
    color: '#8f89ff',
  },
  {
    title: 'Zissou',
    description:
      "Though he views photography as a medium for storytelling, Zissou's images don't insist on a narrative. Both crisp and ethereal.",
    link: 'https://images.unsplash.com/photo-1605106901227-991bd663255c?w=500&auto=format&fit=crop',
    color: '#13056c',
  },
  {
    title: 'Mathias Svold and Ulrik Hasemann',
    description:
      "The coastlines of Denmark are documented in tonal colors in a pensive new series by Danish photographers Ulrik Hasemann and Mathias Svold; an ongoing project investigating how humans interact with and disrupt the Danish coast.",
    link: 'https://images.unsplash.com/photo-1605106715994-18d3fecffb98?w=500&auto=format&fit=crop&q=60',
    color: '#ed649e',
  },
  {
    title: 'Mark Rammers',
    description:
      "Dutch photographer Mark Rammers has shared with IGNANT the first chapter of his latest photographic project, 'all over again'—captured while in residency at Hektor, an old farm in Los Valles, Lanzarote.",
    link: 'https://images.unsplash.com/photo-1506792006437-256b665541e2?w=500&auto=format&fit=crop',
    color: '#fd521a',
  },
];

export function CardStack() {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end end'],
  });

  return (
    <main id="cardstack" className="bg-background" ref={container}>


      {/* Cards section */}
      <section className="text-foreground w-full py-10 md:py-0 bg-muted/20">
        {projects.map((project, i) => {
          const targetScale = 1 - (projects.length - i) * 0.05;
          return (
            <Card
              key={`p_${i}`}
              i={i}
              url={project.link}
              title={project.title}
              color={project.color}
              description={project.description}
              progress={scrollYProgress}
              range={[i * 0.25, 1]}
              targetScale={targetScale}
            />
          );
        })}
      </section>

    </main>
  );
}

interface CardProps {
  i: number;
  title: string;
  description: string;
  url: string;
  color: string;
  progress: MotionValue<number>;
  range: [number, number];
  targetScale: number;
}

// Responsive Card component with optimizations
function Card({
  i,
  title,
  description,
  url,
  color,
  progress,
  range,
  targetScale,
}: CardProps) {
  const container = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start end', 'start start'],
  });

  // Handle responsive spacing based on screen width
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    
    // Initial check
    checkMobile();
    
    // Listen for resize events
    window.addEventListener('resize', checkMobile);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Optimize by pre-calculating transform values
  const imageScale = useTransform(scrollYProgress, [0, 1], [2, 1]);
  const scale = useTransform(progress, range, [1, targetScale]);

  return (
    <div
      ref={container}
      className="min-h-[100svh] flex items-center justify-center sticky top-0 px-4 sm:px-6 md:px-0"
    >
      <motion.div
        style={{
          backgroundColor: color,
          scale,
          top: `calc(-5vh + ${i * (isMobile ? 15 : 25)}px)`,
        }}
        className="flex flex-col relative -top-[15%] sm:-top-[20%] md:-top-[25%] 
                  h-auto sm:h-auto md:h-[450px] w-[95%] sm:w-[85%] md:w-[80%] lg:w-[70%] 
                  rounded-lg p-4 sm:p-6 md:p-10 origin-top shadow-lg"
        layout
        viewport={{ once: true }}
        initial={{ willChange: "transform, opacity" }}
      >
        <h2 className="text-xl text-white sm:text-2xl text-center font-semibold mb-3 md:mb-2">{title}</h2>
        <div className="flex flex-col md:flex-row h-full mt-2 md:mt-5 gap-5 md:gap-10">
          <div className="w-full md:w-[40%] relative order-2 md:order-1 md:top-[10%]">
            <p className=" text-white text-sm md:text-base">{description}</p>
            <span className="text-white flex items-center gap-2 pt-3 sm:pt-4">
              <a
                href={"#"}
                target="_blank"
                rel="noopener noreferrer"
                className="underline cursor-pointer"
              >
                See more
              </a>
              <svg
                width="22"
                height="12"
                viewBox="0 0 22 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M21.5303 6.53033C21.8232 6.23744 21.8232 5.76256 21.5303 5.46967L16.7574 0.696699C16.4645 0.403806 15.9896 0.403806 15.6967 0.696699C15.4038 0.989592 15.4038 1.46447 15.6967 1.75736L19.9393 6L15.6967 10.2426C15.4038 10.5355 15.4038 11.0104 15.6967 11.3033C15.9896 11.5962 16.4645 11.5962 16.7574 11.3033L21.5303 6.53033ZM0 6.75L21 6.75V5.25L0 5.25L0 6.75Z"
                  fill="currentColor"
                />
              </svg>
            </span>
          </div>

          {/* Image container with optimized Next.js Image and motion */}
          <div className="relative w-full md:w-[60%] h-[200px] sm:h-[250px] md:h-full 
                        rounded-lg overflow-hidden order-1 md:order-2 mb-4 md:mb-0">
            <motion.div
              className="w-full h-full"
              style={{ scale: imageScale }}
              initial={{ willChange: "transform" }}
            >
              <Image
                fill
                src={url}
                alt={title}
                className="object-cover"
                sizes="(max-width: 640px) 95vw, (max-width: 768px) 85vw, (max-width: 1024px) 80vw, 70vw"
                priority={i < 2}
                loading={i < 2 ? "eager" : "lazy"}
              />
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
} 