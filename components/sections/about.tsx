"use client";

import {
  motion,
  useScroll,
  useTransform,
  type Variants,
} from "framer-motion";
import {
  Activity,
  ArrowRight,
  DollarSign,
  Eye,
  HeartPulse,
  TrendingUp,
  Workflow,
} from "lucide-react";
import { type ReactNode, useRef } from "react";


// ─── Types ────────────────────────────────────────────────────────────────────

interface ServiceItem {
  icon: ReactNode;
  title: string;
  description: string;
  side: "left" | "right";
}


// ─── Data ─────────────────────────────────────────────────────────────────────

const SERVICES: ServiceItem[] = [
  {
    icon: <DollarSign className="w-5 h-5" />,
    title: "Increase reimbursements",
    description:
      "Optimize claim quality and coding accuracy to recover revenue that's currently slipping through the cracks.",
    side: "left",
  },
  {
    icon: <TrendingUp className="w-5 h-5" />,
    title: "Reduce claim denials",
    description:
      "AI-assisted denial prediction and proactive workflows that catch issues before claims are submitted.",
    side: "left",
  },
  {
    icon: <Workflow className="w-5 h-5" />,
    title: "Improve workflow efficiency",
    description:
      "Automate administrative burden so clinical and operations teams focus on what matters most.",
    side: "left",
  },
  {
    icon: <Eye className="w-5 h-5" />,
    title: "Strengthen data visibility",
    description:
      "Turn fragmented healthcare data into dashboards, KPI reporting, and decision-ready insight.",
    side: "right",
  },
  {
    icon: <Activity className="w-5 h-5" />,
    title: "Enhance operational performance",
    description:
      "Measurable improvements across revenue cycle, scheduling, prior authorization, and AR follow-up.",
    side: "right",
  },
  {
    icon: <HeartPulse className="w-5 h-5" />,
    title: "Modernize healthcare systems",
    description:
      "Practical, scalable modernization that delivers value without overwhelming your internal teams.",
    side: "right",
  },
];


// ─── Framer variants ─────────────────────────────────────────────────────────

const EASE_EXPO = [0.16, 1, 0.3, 1] as const;

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: EASE_EXPO },
  },
};

const slideLeft: Variants = {
  hidden: { opacity: 0, x: -32, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: { duration: 0.65, ease: EASE_EXPO },
  },
};

const slideRight: Variants = {
  hidden: { opacity: 0, x: 32, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: { duration: 0.65, ease: EASE_EXPO },
  },
};

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
};

// ─── Service item ─────────────────────────────────────────────────────────────

function ServiceCard({
  icon,
  title,
  description,
  side,
}: ServiceItem) {
  const variant = side === "left" ? slideLeft : slideRight;

  return (
    <motion.div
      variants={variant}
      className="group flex flex-col gap-2.5 sm:gap-3"
      whileHover={{ y: -3, transition: { type: "spring", stiffness: 400, damping: 25 } }}
    >
      <div className="flex items-center gap-2.5 sm:gap-3">
        <motion.div
          className="relative flex-shrink-0 rounded-lg p-2 text-primary sm:rounded-xl sm:p-2.5"
          style={{ backgroundColor: "color-mix(in oklab, var(--primary) 12%, transparent)" }}
          whileHover={{
            rotate: [0, -8, 8, -4, 0],
            transition: { duration: 0.45 },
          }}
        >
          {icon}
          {/* Key accent dot */}
          <span
            className="absolute -top-0.5 -right-0.5 h-1.5 w-1.5 rounded-full bg-primary opacity-70 sm:h-2 sm:w-2"
          />
        </motion.div>
        <h3 className="font-semibold text-foreground text-sm group-hover:text-primary transition-colors duration-200 sm:text-base">
          {title}
        </h3>
      </div>
      <p className="text-xs leading-relaxed text-muted-foreground pl-[38px] sm:text-sm sm:pl-[46px]">
        {description}
      </p>
      {/* Hover CTA */}

    </motion.div>
  );
}

// ─── Main section ─────────────────────────────────────────────────────────────

export function About() {
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

  // Parallax for orbs and image
  const imgY = useTransform(sectionProgress, [0, 1], [-24, 24]);
  const orb1Y = useTransform(sectionProgress, [0, 1], [0, -48]);
  const orb2Y = useTransform(sectionProgress, [0, 1], [0, 48]);

  // Scroll-driven opacity and scale for content elements with improved bidirectional smoothness
  const headerOpacity = useTransform(contentProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0.8]);
  const headerScale = useTransform(contentProgress, [0, 0.2, 0.8, 1], [0.95, 1, 1, 0.98]);

  // Service cards scroll animations with improved bidirectional smoothness
  const servicesY = useTransform(contentProgress, [0, 0.2, 0.8, 1], [60, 0, 0, -20]);
  const servicesOpacity = useTransform(contentProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0.7]);

  // Stats section animations

  // Rotation animations for service cards with smoother bidirectional behavior
  const leftServiceRotation = useTransform(contentProgress, [0, 0.3, 0.7, 1], [-2, 0, 0, 1]);
  const rightServiceRotation = useTransform(contentProgress, [0, 0.3, 0.7, 1], [2, 0, 0, -1]);

  // Image container animations with enhanced bidirectional smoothness
  const imgScale = useTransform(contentProgress, [0.3, 0.5, 1], [0.9, 1.05, 0.95]);
  const imgRotation = useTransform(contentProgress, [0.2, 0.5, 1], [-1, 0, 1]);

  const leftServices = SERVICES.filter((s) => s.side === "left");
  const rightServices = SERVICES.filter((s) => s.side === "right");

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative w-full overflow-hidden py-12 md:py-16 lg:py-20"
      aria-label="About Momentia"
    >
      {/* ── Ambient orbs ── */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute left-0 top-1/4 h-[500px] w-[500px] rounded-full bg-primary/[0.04] blur-[160px]"
        style={{ y: orb1Y }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute bottom-1/4 right-0 h-[400px] w-[400px] rounded-full bg-secondary/[0.05] blur-[140px]"
        style={{ y: orb2Y }}
      />

      {/* ── Floating particles ── */}
      {[
        { top: "20%", left: "8%", size: 5, delay: 0 },
        { top: "65%", right: "7%", size: 7, delay: 1.2 },
        { top: "40%", left: "40%", size: 4, delay: 0.6 },
      ].map((p, i) => (
        <motion.span
          key={i}
          aria-hidden
          className="pointer-events-none absolute rounded-full bg-primary/25"
          style={{ top: p.top, left: "left" in p ? p.left : undefined, right: "right" in p ? p.right : undefined, width: p.size, height: p.size }}
          animate={{ y: [0, -12, 0], opacity: [0.4, 0.9, 0.4] }}
          transition={{ duration: 3 + i * 0.7, repeat: Infinity, ease: "easeInOut", delay: p.delay }}
        />
      ))}

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 md:px-10" ref={contentRef}>

        {/* ── Section header ── */}
        <motion.div
          className="mb-8 flex flex-col items-center text-center sm:mb-10 lg:mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={fadeUp}
          style={{
            opacity: headerOpacity,
            scale: headerScale,
          }}
        >
          <motion.span
            className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-primary sm:mb-3 sm:gap-2 sm:tracking-[0.28em]"
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <HeartPulse className="h-3 w-3 sm:h-3.5 sm:w-3.5" aria-hidden />
            About Momentia IO
          </motion.span>

          <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl lg:text-6xl sm:mb-5">
            Healthcare Operations Built for the Future
          </h2>

          {/* Animated underline */}
          <motion.div
            className="mb-5 h-[2px] rounded-full bg-primary sm:mb-6 sm:h-[3px] lg:mb-7"
            initial={{ width: 0 }}
            whileInView={{ width: 60 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.4, ease: EASE_EXPO }}
          />

          <p className="max-w-2xl text-base leading-relaxed text-muted-foreground mb-3 sm:text-lg sm:mb-4">
            We combine healthcare expertise with AI-driven operational strategies.
          </p>
          <p className="max-w-2xl text-base font-semibold leading-relaxed text-muted-foreground sm:text-lg">
            Here&apos;s how we help providers:
          </p>
        </motion.div>

        {/* ── 3-col layout ── */}
        <div className="grid grid-cols-1 gap-8 sm:gap-10 md:grid-cols-3 md:gap-8 lg:gap-12">

          {/* Left services */}
          <motion.div
            className="flex flex-col gap-6 sm:gap-8 md:gap-10"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            variants={stagger}
            style={{
              y: servicesY,
              opacity: servicesOpacity,
              rotateZ: leftServiceRotation,
            }}
          >
            {leftServices.map((s) => (
              <ServiceCard key={s.title} {...s} />
            ))}
          </motion.div>

          {/* Center image */}
          <div className="flex items-center justify-center order-first md:order-none">
            <motion.div
              className="relative w-full max-w-[220px] sm:max-w-[260px] md:max-w-[280px]"
              initial={{ opacity: 0, scale: 0.9, filter: "blur(8px)" }}
              whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.9, ease: EASE_EXPO }}
              style={{
                scale: imgScale,
                rotateZ: imgRotation,
              }}
            >
              {/* Border frame */}
              <motion.div
                className="absolute -inset-3 rounded-2xl border-2 border-primary/20 z-[-1]"
                initial={{ opacity: 0, scale: 1.06 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 }}
              />

              {/* Image with parallax */}
              <motion.div
                className="overflow-hidden rounded-xl shadow-2xl"
                style={{ y: imgY }}
                whileHover={{ scale: 1.02, transition: { duration: 0.35 } }}
              >
                <img
                  src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&auto=format&fit=crop&q=80"
                  alt="Momentia IO healthcare operations team"
                  className="h-full w-full object-cover"
                  style={{ aspectRatio: "3/4" }}
                />
                {/* Gradient overlay + CTA */}
                <motion.div
                  className="absolute inset-0 flex items-end justify-center p-5"
                  style={{
                    background:
                      "linear-gradient(to top, color-mix(in oklab, var(--foreground) 55%, transparent) 0%, transparent 55%)",
                  }}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: 0.6 }}
                >
                  <motion.a
                    href="/#services"
                    className="flex items-center gap-2 rounded-full bg-background/90 px-4 py-2 text-sm font-semibold text-foreground backdrop-blur-sm"
                    whileHover={{ scale: 1.06 }}
                    whileTap={{ scale: 0.97 }}
                    transition={{ type: "spring", stiffness: 400, damping: 22 }}
                  >
                    Our Services <ArrowRight className="h-3.5 w-3.5" />
                  </motion.a>
                </motion.div>
              </motion.div>

              {/* Floating accent orbs */}
              <motion.div
                className="absolute -right-4 -top-4 h-10 w-10 rounded-full bg-primary/10 sm:-right-6 sm:-top-6 sm:h-14 sm:w-14"
                style={{ y: orb1Y }}
              />
              <motion.div
                className="absolute -bottom-6 -left-6 h-12 w-12 rounded-full bg-secondary/10 sm:-bottom-8 sm:-left-8 sm:h-16 sm:w-16"
                style={{ y: orb2Y }}
              />
            </motion.div>
          </div>

          {/* Right services */}
          <motion.div
            className="flex flex-col gap-6 sm:gap-8 md:gap-10"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            variants={stagger}
            style={{
              y: servicesY,
              opacity: servicesOpacity,
              rotateZ: rightServiceRotation,
            }}
          >
            {rightServices.map((s) => (
              <ServiceCard key={s.title} {...s} />
            ))}
          </motion.div>
        </div>

      </div>
    </section>
  );
}
