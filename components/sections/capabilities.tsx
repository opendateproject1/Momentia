"use client";

import { motion } from "framer-motion";
import { useRef } from "react";
import { useScroll, useTransform } from "framer-motion";
import {
  Brain,
  DollarSign,
  FileText,
  Database,
  ShieldCheck,
  LineChart,
  Workflow,
  Sparkles,
  Stethoscope,
  HandHeart,
} from "lucide-react";
import { Radar, CapabilityIcon } from "@/components/ui/radar-effect";

const EASE_EXPO = [0.16, 1, 0.3, 1] as const;

const capabilities = [
  {
    icon: <Brain className="h-6 w-6 text-primary" />,
    text: "AI & Automation",
    delay: 0.2,
  },
  {
    icon: <DollarSign className="h-6 w-6 text-primary" />,
    text: "Revenue Cycle Mgmt",
    delay: 0.3,
  },
  {
    icon: <FileText className="h-6 w-6 text-primary" />,
    text: "Medical Coding",
    delay: 0.4,
  },
  {
    icon: <Database className="h-6 w-6 text-primary" />,
    text: "Data Strategy",
    delay: 0.5,
  },
  {
    icon: <ShieldCheck className="h-6 w-6 text-primary" />,
    text: "HIPAA Compliance",
    delay: 0.6,
  },
  {
    icon: <LineChart className="h-6 w-6 text-primary" />,
    text: "Predictive Analytics",
    delay: 0.7,
  },
  {
    icon: <Workflow className="h-6 w-6 text-primary" />,
    text: "Workflow Automation",
    delay: 0.8,
  },
];

const WHY_REASONS = [
  {
    icon: <Stethoscope className="h-5 w-5 text-primary" />,
    title: "Healthcare-Focused Expertise",
    description:
      "We understand healthcare operations, reimbursement workflows, compliance requirements, and the challenges providers face every day.",
  },
  {
    icon: <Sparkles className="h-5 w-5 text-primary" />,
    title: "AI-Enabled Operational Efficiency",
    description:
      "We help organizations leverage AI responsibly to reduce manual work and improve operational performance.",
  },
  {
    icon: <DollarSign className="h-5 w-5 text-primary" />,
    title: "Revenue-Driven Approach",
    description:
      "Our solutions are designed to improve cash flow, reduce denials, and strengthen long-term financial performance.",
  },
  {
    icon: <Workflow className="h-5 w-5 text-primary" />,
    title: "Practical Modernization",
    description:
      "We focus on scalable solutions that create measurable value without overwhelming internal teams.",
  },
  {
    icon: <HandHeart className="h-5 w-5 text-primary" />,
    title: "Rural Healthcare Understanding",
    description:
      "We understand the unique operational and financial pressures facing rural healthcare organizations and underserved communities.",
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
      aria-label="Healthcare Capabilities"
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
            Healthcare Capabilities
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
            A unified operating model spanning AI, revenue cycle, coding, data strategy, and compliance — built for modern healthcare providers.
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

        {/* Why Momentia IO */}
        <motion.div
          className="mt-16 sm:mt-20 lg:mt-24"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="mb-10 flex flex-col items-center text-center">
            <span className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.28em] text-primary">
              <Sparkles className="h-3.5 w-3.5" aria-hidden />
              Why Momentia IO
            </span>
            <h3 className="mb-4 text-2xl font-bold tracking-tight text-foreground sm:text-3xl md:text-4xl">
              Why Healthcare Organizations Choose Momentia IO
            </h3>
            <motion.div
              className="h-[2px] rounded-full bg-primary sm:h-[3px]"
              initial={{ width: 0 }}
              whileInView={{ width: 60 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.3, ease: EASE_EXPO }}
            />
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {WHY_REASONS.map((reason, idx) => (
              <motion.div
                key={reason.title}
                className="group relative flex flex-col gap-3 rounded-2xl border border-border/50 bg-card/40 p-5 backdrop-blur-sm transition-all duration-300 hover:border-primary/40 hover:bg-card/70 hover:shadow-md hover:shadow-primary/[0.06] sm:p-6"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: idx * 0.08, ease: EASE_EXPO }}
                whileHover={{ y: -4 }}
              >
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-lg ring-1 ring-primary/20"
                  style={{ backgroundColor: "color-mix(in oklab, var(--primary) 10%, transparent)" }}
                >
                  {reason.icon}
                </div>
                <h4 className="text-base font-semibold tracking-tight text-foreground transition-colors duration-200 group-hover:text-primary sm:text-lg">
                  {reason.title}
                </h4>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {reason.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}