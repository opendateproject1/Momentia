"use client";

import { motion, useScroll, useTransform } from "framer-motion";
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
      {/* Subtle top border */}
      <div className="absolute inset-x-0 top-0 h-px bg-border/40" />

      <div className="mx-auto max-w-3xl px-6 sm:px-8 lg:px-10">

        {/* Section label */}
        <motion.div
          style={{ opacity: headerOpacity, y: headerY }}
          transition={{ ease: EASE_EXPO }}
          className="mb-6 flex items-center gap-3"
        >
          <span className="h-px w-8 bg-primary" />
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-primary">
            Our Story
          </span>
        </motion.div>

        {/* Body */}
        <motion.p
          style={{ opacity: bodyOpacity, y: bodyY }}
          transition={{ ease: EASE_EXPO }}
          className="mb-12 text-lg leading-relaxed text-foreground/75 sm:text-xl sm:leading-relaxed"
        >
          Momentia IO was founded to help healthcare organizations improve
          financial performance by strengthening Revenue Cycle Management,
          reduce administrative burden by streamlining operations and support
          smarter decision-making through healthcare focused technology
          solutions.
        </motion.p>

        {/* Mission statement card */}
        <motion.div
          style={{ opacity: missionOpacity, y: missionY }}
          transition={{ ease: EASE_EXPO }}
          className="relative rounded-2xl border border-primary/20 bg-primary/[0.04] px-8 py-8 sm:px-10 sm:py-10"
        >
          <span className="mb-3 block text-xs font-semibold uppercase tracking-[0.25em] text-primary">
            Our Mission
          </span>
          <p className="text-base leading-relaxed text-foreground sm:text-lg sm:leading-relaxed font-medium">
            Momentia IO empowers healthcare organizations with practical
            solutions that optimize workflows, drive efficiency, and strengthen
            long-term growth.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
