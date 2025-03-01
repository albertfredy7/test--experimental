'use client';

import { motion, useSpring } from 'framer-motion';
import React, { useState, MouseEvent, useRef } from 'react';

interface ServiceItem {
  img: string;
  label: string;
  description: string;
}

export function Services() {
  const [img, setImg] = useState<{ src: string | null; alt: string; opacity: number }>(
    {
      src: null,
      alt: '',
      opacity: 0,
    }
  );

  const imageRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const servicesList: ServiceItem[] = [
    {
      img: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2072&auto=format&fit=crop',
      label: 'Web Development',
      description: 'Custom websites and applications',
    },
    {
      img: 'https://images.unsplash.com/photo-1607252650355-f7fd0460ccdb?q=80&w=2070&auto=format&fit=crop',
      label: 'Mobile Apps',
      description: 'iOS and Android solutions',
    },
    {
      img: 'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?q=80&w=2070&auto=format&fit=crop',
      label: 'UI/UX Design',
      description: 'User-centered digital experiences',
    },
    {
      img: 'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?q=80&w=2070&auto=format&fit=crop',
      label: 'Cloud Services',
      description: 'Scalable infrastructure solutions',
    },
  ];

  const spring = {
    stiffness: 150,
    damping: 15,
    mass: 0.1,
  };

  const imagePos = {
    x: useSpring(0, spring),
    y: useSpring(0, spring),
  };

  const handleMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!imageRef.current || !containerRef.current) return;

    const containerRect = containerRef.current.getBoundingClientRect();
    const { clientX, clientY } = e;
    const relativeX = clientX - containerRect.left;
    const relativeY = clientY - containerRect.top;

    imagePos.x.set(relativeX - imageRef.current.offsetWidth / 2);
    imagePos.y.set(relativeY - imageRef.current.offsetHeight / 2);
  };

  const handleImageInteraction = (item: ServiceItem, opacity: number) => {
    setImg({ src: item.img, alt: item.label, opacity });
  };

  return (
    <section id="services" className="w-full py-20 bg-black">
      <div className="container mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center text-white mb-16">Our Services</h2>
        
        <div
          ref={containerRef}
          onMouseMove={handleMove}
          className="relative w-4/5 mx-auto p-4"
        >
          {servicesList.map((service) => (
            <div
              key={service.label}
              onMouseEnter={() => handleImageInteraction(service, 1)}
              onMouseMove={() => handleImageInteraction(service, 1)}
              onMouseLeave={() => handleImageInteraction(service, 0)}
              className="w-full py-5 cursor-pointer text-center flex justify-between text-white border-b border-white/30 last:border-none"
            >
              <p className="text-3xl md:text-5xl">{service.label}</p>
              <span className="self-center">{service.description}</span>
            </div>
          ))}

          <motion.img
            ref={imageRef}
            src={img.src || undefined}
            alt={img.alt}
            className="w-[300px] h-[220px] rounded-lg object-cover absolute top-0 left-0 transition-opacity duration-200 ease-in-out pointer-events-none"
            style={{
              x: imagePos.x,
              y: imagePos.y,
              opacity: img.opacity,
            }}
          />
        </div>
      </div>
    </section>
  );
}

export default Services; 