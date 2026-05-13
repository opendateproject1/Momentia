"use client";

import { motion } from "framer-motion";
import { useRef } from "react";
import { useScroll, useTransform } from "framer-motion";
import {
  Shield,
  Cloud,
  Lock,
  Zap,
  Bug,
  Eye,
  Network,
  Check,
} from "lucide-react";
import { Radar, CapabilityIcon } from "@/components/ui/radar-effect";

const EASE_EXPO = [0.16, 1, 0.3, 1] as const;

const capabilities = [
  {
    icon: <Shield className="h-6 w-6 text-primary" />,
    text: "Cloud & Identity Security",
    delay: 0.2,
  },
  {
    icon: <Cloud className="h-6 w-6 text-primary" />,
    text: "Endpoint Threat Defense",
    delay: 0.3,
  },
  {
    icon: <Lock className="h-6 w-6 text-primary" />,
    text: "Resilient Backup Architecture",
    delay: 0.4,
  },
  {
    icon: <Network className="h-6 w-6 text-primary" />,
    text: "Executive Risk Assessments",
    delay: 0.5,
  },
  {
    icon: <Zap className="h-6 w-6 text-primary" />,
    text: "Identity Governance",
    delay: 0.6,
  },
  {
    icon: <Eye className="h-6 w-6 text-primary" />,
    text: "Cloud Configuration",
    delay: 0.7,
  },
  {
    icon: <Bug className="h-6 w-6 text-primary" />,
    text: "Monitoring Visibility",
    delay: 0.8,
  },
];

export function Capabilities() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress: sectionProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const { scrollYProgress: contentProgress } = useScroll({
    target: contentRef,
    offset: ["start center", "end center"],
  });

  // Header animations with improved bidirectional smoothness
  const headerOpacity = useTransform(contentProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0.8]);
  const headerScale = useTransform(contentProgress, [0, 0.15, 0.85, 1], [0.95, 1, 1, 0.98]);

  // Content animations with improved bidirectional smoothness
  const contentY = useTransform(contentProgress, [0.15, 0.4, 0.8, 1], [40, 0, 0, -30]);
  const contentOpacity = useTransform(contentProgress, [0.15, 0.35, 0.8, 1], [0, 1, 1, 0.7]);

  // Radar animations
  const radarScale = useTransform(contentProgress, [0.3, 0.6], [0.8, 1.1]);
  const radarOpacity = useTransform(contentProgress, [0.3, 0.5], [0, 1]);

  // Orb parallax with improved smoothness
  const orb1Y = useTransform(sectionProgress, [0, 0.5, 1], [0, -60, -120]);
  const orb2Y = useTransform(sectionProgress, [0, 0.5, 1], [0, 60, 120]);

  return (
    <section
      ref={sectionRef}
      id="capabilities"
      className="relative w-full overflow-hidden py-12 md:py-16 lg:py-20"
      aria-label="Security Capabilities"
    >
      {/* Ambient orbs */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -left-48 top-0 h-96 w-96 rounded-full bg-primary/[0.03] blur-[160px]"
        style={{ y: orb1Y }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -right-48 bottom-0 h-96 w-96 rounded-full bg-secondary/[0.04] blur-[160px]"
        style={{ y: orb2Y }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 md:px-10">
        {/* Header */}
        <motion.div
          ref={contentRef}
          className="mb-8 flex flex-col items-center text-center sm:mb-10 lg:mb-12"
          style={{ opacity: headerOpacity, scale: headerScale }}
        >
          <motion.h2
            className="mb-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl lg:text-6xl sm:mb-5"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Capabilities
          </motion.h2>

          <motion.div
            className="mb-5 h-[2px] rounded-full bg-primary sm:mb-6 sm:h-[3px] lg:mb-7"
            initial={{ width: 0 }}
            whileInView={{ width: 60 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.4, ease: EASE_EXPO }}
          />

          <motion.p
            className="max-w-2xl text-sm text-muted-foreground sm:text-base lg:text-lg"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            Comprehensive cybersecurity capabilities designed to protect your organization from evolving threats.
          </motion.p>
        </motion.div>

        {/* Main content with radar */}
        <motion.div
          className="relative mx-auto max-w-5xl"
          style={{
            opacity: contentOpacity,
            y: contentY,
          }}
        >
          {/* Background grid effect */}
          <div className="absolute inset-0 opacity-3 sm:opacity-5">
            <div
              className="h-full w-full sm:bg-[length:40px_40px] lg:bg-[length:50px_50px]"
              style={{
                backgroundImage:
                  "linear-gradient(var(--primary) 1px, transparent 1px), linear-gradient(90deg, var(--primary) 1px, transparent 1px)",
                backgroundSize: "30px 30px",
              }}
            />
          </div>

          {/* Radar in center bottom */}
          <motion.div
            className="relative mx-auto flex items-center justify-center py-8 sm:py-12 lg:py-16"
            style={{
              scale: radarScale,
              opacity: radarOpacity,
            }}
          >
            <Radar className="h-40 w-40 sm:h-52 sm:w-52 lg:h-64 lg:w-64" />
          </motion.div>

          {/* Capabilities in semicircle (top half) */}
          <div className="absolute inset-0 flex items-center justify-center">
            {/* Top row - 2 items */}
            <motion.div
              className="absolute top-[8%] flex w-full items-center justify-center gap-4 px-4 sm:gap-6 md:gap-8 lg:gap-16 sm:top-[10%]"
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <CapabilityIcon icon={capabilities[5].icon} text={capabilities[5].text} delay={0.7} />
              <CapabilityIcon icon={capabilities[6].icon} text={capabilities[6].text} delay={0.8} />
            </motion.div>

            {/* Middle left - 1 item */}
            <motion.div
              className="absolute left-2 top-1/2 flex flex-col items-center justify-center gap-8 -translate-y-1/2 sm:left-0 sm:gap-12"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.35 }}
            >
              <CapabilityIcon icon={capabilities[3].icon} text={capabilities[3].text} delay={0.5} />
            </motion.div>

            {/* Middle right - 1 item */}
            <motion.div
              className="absolute right-2 top-1/2 flex flex-col items-center justify-center gap-8 -translate-y-1/2 sm:right-0 sm:gap-12"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.35 }}
            >
              <CapabilityIcon icon={capabilities[4].icon} text={capabilities[4].text} delay={0.6} />
            </motion.div>

            {/* Bottom row - 3 items */}
            <motion.div
              className="absolute bottom-[8%] flex w-full items-center justify-center gap-3 px-2 sm:gap-6 md:gap-8 lg:gap-16 sm:bottom-[10%]"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <CapabilityIcon icon={capabilities[0].icon} text={capabilities[0].text} delay={0.2} />
              <CapabilityIcon icon={capabilities[1].icon} text={capabilities[1].text} delay={0.3} />
              <CapabilityIcon icon={capabilities[2].icon} text={capabilities[2].text} delay={0.4} />
            </motion.div>
          </div>
        </motion.div>

        {/* Bottom description */}
        <motion.div
          className="mt-12 max-w-4xl mx-auto text-center sm:mt-16 lg:mt-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <p className="text-xs text-muted-foreground sm:text-sm">
            Each capability is designed to provide comprehensive protection while integrating seamlessly with your existing security infrastructure.
          </p>
        </motion.div>
      </div>
    </section>
  );
}