'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface SlideData {
  title: string;
  subtitle: string;
  description: string;
  imageUrl: string;
  blurDataURL: string;
}

const slides: SlideData[] = [
  {
    title: 'Rural Hospitals',
    subtitle: 'Critical Access & Community Facilities',
    description:
      'Tailored revenue cycle and operational support that addresses the unique financial pressures facing rural and underserved healthcare communities.',
    imageUrl:
      'https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=900&h=1200&fit=crop&q=80',
    blurDataURL:
      'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAIBAQIBAQICAgICAgICAwUDAwwUAxUTAwsTBhYTB9kYFhYaHx8aHh8ZIB4cIB4eHSMpJSUnKi4tMzM1NTc5OT3/2wBDAQICAgMDAwYDAwYMCAcIDAwwMjAxMjAxNDc1Nzc3NTU5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OT/wAARCAApACgDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8VAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCwAA8A/9k=',
  },
  {
    title: 'Physician Groups & Specialty Practices',
    subtitle: 'Independent & Multi-Specialty',
    description:
      'End-to-end billing, coding, and AI-enabled automation purpose-built for physician groups and specialty practices.',
    imageUrl:
      'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=900&h=1200&fit=crop&q=80',
    blurDataURL:
      'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAIBAQIBAQICAgICAgICAwUDAwwUAxUTAwsTBhYTB9kYFhYaHx8aHh8ZIB4cIB4eHSMpJSUnKi4tMzM1NTc5OT3/2wBDAQICAgMDAwYDAwYMCAcIDAwwMjAxMjAxNDc1Nzc3NTU5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OT/wAARCAApACgDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8VAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCwAA8A/9k=',
  },
  {
    title: 'Community Health Centers & FQHCs',
    subtitle: 'Federally Qualified Health Centers',
    description:
      'Operational and reimbursement strategies that support mission-driven providers serving the highest-need patient populations.',
    imageUrl:
      'https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?w=900&h=1200&fit=crop&q=80',
    blurDataURL:
      'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAIBAQIBAQICAgICAgICAwUDAwwUAxUTAwsTBhYTB9kYFhYaHx8aHh8ZIB4cIB4eHSMpJSUnKi4tMzM1NTc5OT3/2wBDAQICAgMDAwYDAwYMCAcIDAwwMjAxMjAxNDc1Nzc3NTU5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OT/wAARCAApACgDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8VAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCwAA8A/9k=',
  },
  {
    title: 'Ambulatory Surgery Centers',
    subtitle: 'High-Volume Surgical Operations',
    description:
      'Coding accuracy, claims optimization, and operational reporting designed for the speed and precision ASCs demand.',
    imageUrl:
      'https://images.unsplash.com/photo-1551076805-e1869033e561?w=900&h=1200&fit=crop&q=80',
    blurDataURL:
      'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAIBAQIBAQICAgICAgICAwUDAwwUAxUTAwsTBhYTB9kYFhYaHx8aHh8ZIB4cIB4eHSMpJSUnKi4tMzM1NTc5OT3/2wBDAQICAgMDAwYDAwYMCAcIDAwwMjAxMjAxNDc1Nzc3NTU5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OT/wAARCAApACgDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8VAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCwAA8A/9k=',
  },
  {
    title: 'Behavioral Health & Multi-Location Practices',
    subtitle: 'Distributed Care Delivery',
    description:
      'Unified data, billing, and reporting across distributed locations — so leadership has a single source of operational truth.',
    imageUrl:
      'https://images.unsplash.com/photo-1559757175-5700dde675bc?w=900&h=1200&fit=crop&q=80',
    blurDataURL:
      'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAIBAQIBAQICAgICAgICAwUDAwwUAxUTAwsTBhYTB9kYFhYaHx8aHh8ZIB4cIB4eHSMpJSUnKi4tMzM1NTc5OT3/2wBDAQICAgMDAwYDAwYMCAcIDAwwMjAxMjAxNDc1Nzc3NTU5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OT/wAARCAApACgDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8VAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCwAA8A/9k=',
  },
];

const SLIDE_DURATION = 6000;

export default function ElegantCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const progressMotionValue = useMotionValue(0);
  const progressWidth = useTransform(progressMotionValue, (v) => `${v}%`);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const startTimeRef = useRef<number>(0);

  const goNext = useCallback(() => {
    progressMotionValue.set(0);
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  }, [progressMotionValue]);

  const goPrev = useCallback(() => {
    progressMotionValue.set(0);
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  }, [progressMotionValue]);

  const goToSlide = useCallback((index: number) => {
    progressMotionValue.set(0);
    setCurrentIndex(index);
  }, [progressMotionValue]);

  useEffect(() => {
    if (isPaused) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
      return;
    }

    startTimeRef.current = Date.now();

    // Smooth progress animation using requestAnimationFrame
    const animate = () => {
      const elapsed = Date.now() - startTimeRef.current;
      const progress = Math.min((elapsed / SLIDE_DURATION) * 100, 100);
      progressMotionValue.set(progress);

      if (progress < 100) {
        animationFrameRef.current = requestAnimationFrame(animate);
      }
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    intervalRef.current = setInterval(() => {
      goNext();
    }, SLIDE_DURATION);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, [currentIndex, isPaused, goNext, progressMotionValue]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 60) {
      if (diff > 0) goNext();
      else goPrev();
    }
  };

  const current = slides[currentIndex];

  return (
    <div
      className="relative w-full overflow-hidden rounded-3xl"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Background accent wash */}
      <div
        className="pointer-events-none absolute inset-0 transition-all duration-1000"
        style={{
          background: `radial-gradient(ellipse at 70% 50%, color-mix(in oklab, var(--primary) 6%, transparent) 0%, transparent 70%)`,
        }}
      />

      <div className="flex min-h-[520px] flex-col md:flex-row">
        {/* Left: Text Content */}
        <div className="relative flex flex-1 flex-col justify-center px-8 py-10 md:px-12 md:py-12">
          {/* Slide number */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`num-${currentIndex}`}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="mb-6 flex items-center gap-3"
            >
              <div className="h-[1px] w-8 bg-primary/60" />
              <span className="text-xs font-semibold tracking-[0.2em] text-primary/80">
                {String(currentIndex + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
              </span>
            </motion.div>
          </AnimatePresence>

          {/* Title */}
          <AnimatePresence mode="wait">
            <motion.h3
              key={`title-${currentIndex}`}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
              className="mb-2 text-3xl font-bold tracking-tight text-foreground md:text-4xl"
            >
              {current.title}
            </motion.h3>
          </AnimatePresence>

          {/* Subtitle */}
          <AnimatePresence mode="wait">
            <motion.p
              key={`subtitle-${currentIndex}`}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              className="mb-5 text-sm font-semibold uppercase tracking-[0.2em] text-primary"
            >
              {current.subtitle}
            </motion.p>
          </AnimatePresence>

          {/* Description */}
          <AnimatePresence mode="wait">
            <motion.p
              key={`desc-${currentIndex}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
              className="mb-10 max-w-md text-base leading-relaxed text-muted-foreground"
            >
              {current.description}
            </motion.p>
          </AnimatePresence>

          {/* Navigation Arrows */}
          <div className="flex items-center gap-3">
            <button
              onClick={goPrev}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border/60 bg-background/40 text-foreground/70 transition-all hover:border-primary/60 hover:bg-primary/10 hover:text-primary"
              aria-label="Previous slide"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
            <button
              onClick={goNext}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border/60 bg-background/40 text-foreground/70 transition-all hover:border-primary/60 hover:bg-primary/10 hover:text-primary"
              aria-label="Next slide"
            >
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Right: Image */}
        <div className="relative w-full overflow-hidden md:w-[45%]">
          <AnimatePresence mode="wait">
            <motion.div
              key={`img-${currentIndex}`}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="h-full w-full will-change-transform"
            >
              <Image
                src={current.imageUrl}
                alt={current.title}
                fill
                priority={currentIndex === 0}
                placeholder="blur"
                blurDataURL={current.blurDataURL}
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 45vw"
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    'linear-gradient(135deg, color-mix(in oklab, var(--primary) 15%, transparent) 0%, transparent 50%)',
                }}
              />
            </motion.div>
          </AnimatePresence>

          {/* Decorative corners */}
          <div
            className="pointer-events-none absolute left-3 top-3 h-8 w-8 border-l-2 border-t-2"
            style={{ borderColor: 'var(--primary)' }}
          />
          <div
            className="pointer-events-none absolute bottom-3 right-3 h-8 w-8 border-b-2 border-r-2"
            style={{ borderColor: 'var(--primary)' }}
          />
        </div>
      </div>

      {/* Progress Indicators */}
      <div className="flex items-end gap-4 border-t border-border/30 px-8 py-5 md:px-12">
        {slides.map((slide, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className="group flex flex-1 flex-col gap-1.5"
            aria-label={`Go to slide ${index + 1}: ${slide.title}`}
          >
            <div className="h-[2px] w-full overflow-hidden rounded-full bg-border/40 will-change-contents">
              <motion.div
                className="h-full rounded-full bg-primary"
                style={{
                  width: index === currentIndex
                    ? progressWidth
                    : index < currentIndex
                      ? '100%'
                      : '0%',
                }}
              />
            </div>
            <span
              className={`text-left text-xs font-medium transition-colors ${
                index === currentIndex
                  ? 'text-primary'
                  : 'text-muted-foreground/50 group-hover:text-muted-foreground'
              }`}
            >
              {slide.title}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
