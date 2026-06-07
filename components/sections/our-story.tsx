"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Compass } from "lucide-react";
import { useRef } from "react";

const EASE_EXPO = [0.16, 1, 0.3, 1] as const;

export function OurStory() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const contentProgress = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
  const headerOpacity = useTransform(contentProgress, [0, 0.25], [0, 1]);
  const headerY = useTransform(contentProgress, [0, 0.25], [32, 0]);
  const bodyOpacity = useTransform(contentProgress, [0.1, 0.4], [0, 1]);
  const bodyY = useTransform(contentProgress, [0.1, 0.4], [24, 0]);
  const missionOpacity = useTransform(contentProgress, [0.3, 0.6], [0, 1]);
  const missionY = useTransform(contentProgress, [0.3, 0.6], [24, 0]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-background py-20 sm:py-28 lg:py-36"
      aria-label="Our Story"
    >
      <div className="absolute inset-x-0 top-0 h-px bg-border/40" />

      <div className="mx-auto max-w-6xl px-10 sm:px-16 lg:px-24">

        {/* Section label */}
        <motion.div
          style={{ opacity: headerOpacity, y: headerY }}
          className="mb-8 flex items-center gap-3"
        >
          <span className="h-[2px] w-8 rounded-full bg-primary" />
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-primary">
            Our Story
          </span>
        </motion.div>

        {/* Body */}
        <motion.p
          style={{ opacity: bodyOpacity, y: bodyY }}
          className="mb-12 text-2xl font-normal leading-relaxed text-foreground/80 sm:text-3xl sm:leading-relaxed"
        >
          Momentia IO was founded to help healthcare organizations improve
          financial performance by strengthening{" "}
          <strong className="font-bold text-foreground">
            Revenue Cycle Management
          </strong>
          , reduce administrative burden by streamlining operations, and support
          smarter decision-making through healthcare-focused technology
          solutions.
        </motion.p>

        {/* Mission card — green left border, icon + label row, then text */}
        <motion.div
          style={{ opacity: missionOpacity, y: missionY }}
          className="flex overflow-hidden rounded-2xl border border-border/40 bg-primary/[0.04] shadow-sm"
        >
          {/* Green left accent bar */}
          <div className="w-1.5 flex-shrink-0 rounded-l-2xl bg-primary" />

          <div className="flex-1 px-7 py-7 sm:px-8 sm:py-8">
            {/* Icon + label row */}
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/20">
                <Compass className="h-5 w-5" />
              </div>
              <span className="text-xs font-semibold uppercase tracking-[0.25em] text-primary">
                Our Mission
              </span>
            </div>

            {/* Mission text */}
            <p className="text-base leading-relaxed text-foreground sm:text-lg">
              Momentia IO empowers healthcare organizations with practical
              solutions that optimize workflows, drive efficiency, and strengthen
              long-term growth.
            </p>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
