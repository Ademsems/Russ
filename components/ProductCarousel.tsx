"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export interface CarouselSlide {
  name: string;
  href: string;
  heroImage: string;
}

interface ProductCarouselProps {
  slides: CarouselSlide[];
}

const INTERVAL = 5000;

export default function ProductCarousel({ slides }: ProductCarouselProps) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [paused, setPaused] = useState(false);
  const prefersReduced = useRef(false);

  useEffect(() => {
    prefersReduced.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  const go = useCallback(
    (next: number, dir: number) => {
      setDirection(dir);
      setIndex((next + slides.length) % slides.length);
    },
    [slides.length]
  );

  useEffect(() => {
    if (paused || prefersReduced.current || slides.length <= 1) return;
    const id = setInterval(() => go(index + 1, 1), INTERVAL);
    return () => clearInterval(id);
  }, [paused, index, go, slides.length]);

  // Touch swipe support
  const touchStartX = useRef<number | null>(null);
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(dx) > 40) {
      go(index + (dx < 0 ? 1 : -1), dx < 0 ? 1 : -1);
    }
    touchStartX.current = null;
  };

  if (slides.length === 0) return null;

  const slide = slides[index];

  const variants = {
    enter: (d: number) => ({ opacity: 0, x: d > 0 ? 60 : -60 }),
    center: { opacity: 1, x: 0 },
    exit: (d: number) => ({ opacity: 0, x: d > 0 ? -60 : 60 }),
  };

  return (
    <section
      className="relative overflow-hidden bg-[#0D2E5A]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      aria-label="Product showcase carousel"
    >
      <div className="relative h-[420px] sm:h-[520px]">
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.div
            key={index}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <Link href={slide.href} className="block w-full h-full" tabIndex={0} aria-label={`View ${slide.name}`}>
              <Image
                src={slide.heroImage}
                alt={slide.name}
                fill
                priority
                className="object-cover object-center"
                sizes="100vw"
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0D1A2E]/80 via-[#0D1A2E]/20 to-transparent" />
              {/* Product name label */}
              <div className="absolute bottom-16 sm:bottom-20 left-0 right-0 px-6 sm:px-12">
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                >
                  <span className="inline-block text-[#00B89F] text-xs font-semibold tracking-[0.25em] uppercase border border-[#00B89F]/40 px-3 py-1 rounded-full mb-3">
                    Advanced Navigation
                  </span>
                  <h3 className="text-3xl sm:text-4xl font-bold text-white">{slide.name}</h3>
                  <span className="inline-flex items-center gap-1.5 mt-3 text-white/70 text-sm font-medium group-hover:text-white transition-colors">
                    Learn more
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M2 7H12M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </motion.div>
              </div>
            </Link>
          </motion.div>
        </AnimatePresence>

        {/* Prev / Next arrows */}
        {slides.length > 1 && (
          <>
            <button
              onClick={() => go(index - 1, -1)}
              aria-label="Previous product"
              className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-black/40 hover:bg-black/60 border border-white/20 flex items-center justify-center text-white transition-colors"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button
              onClick={() => go(index + 1, 1)}
              aria-label="Next product"
              className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-black/40 hover:bg-black/60 border border-white/20 flex items-center justify-center text-white transition-colors"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </>
        )}

        {/* Dot indicators */}
        {slides.length > 1 && (
          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2 z-10">
            {slides.map((s, i) => (
              <button
                key={s.href}
                onClick={() => go(i, i > index ? 1 : -1)}
                aria-label={`Go to ${s.name}`}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === index ? "w-6 bg-[#00B89F]" : "w-1.5 bg-white/40 hover:bg-white/70"
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
