'use client';

import { useRef } from 'react';
import { motion } from 'framer-motion';
import { useScroll, useTransform } from 'framer-motion';
import { DollarSign, FileText, Brain, ShieldCheck, HeartPulse, Briefcase } from 'lucide-react';
import { GridCard } from '@/components/ui/grid-card';

const EASE_EXPO = [0.16, 1, 0.3, 1] as const;

// Main service offerings for the grid section
const MAIN_SERVICES = [
  {
    icon: <DollarSign className="h-8 w-8 text-primary" />,
    title: "Medical Billing & Revenue Cycle Management",
    subtitle: "End-to-End RCM",
    description: "Revenue cycle services designed to optimize reimbursements and improve financial performance.",
    highlights: [
      "Claims submission",
      "Denial management",
      "Eligibility verification",
      "Prior authorization support",
      "Accounts receivable follow-up",
      "Revenue cycle analytics",
    ],
  },
  {
    icon: <FileText className="h-8 w-8 text-primary" />,
    title: "EHR Integration & Workflow Solutions",
    subtitle: "Secure Data Exchange",
    description: "Healthcare data integration solutions that connect EHRs, EDI workflows, payer systems, and healthcare applications through secure data exchange.",
    highlights: [
      "EHR integrations",
      "EDI workflow connectivity",
      "Payer system integration",
      "Healthcare application interoperability",
      "Secure data exchange",
      "HL7 / FHIR support",
    ],
  },
  {
    icon: <Brain className="h-8 w-8 text-primary" />,
    title: "AI-Powered Automation",
    subtitle: "Intelligent Operations",
    description: "AI-enabled operational solutions that reduce administrative burden, streamline workflows and improve efficiency.",
    highlights: [
      "AI-assisted denial prediction",
      "Workflow automation",
      "Predictive analytics",
      "Intelligent reporting",
      "AI operational assessments",
      "Revenue cycle intelligence",
    ],
  },
  {
    icon: <Briefcase className="h-8 w-8 text-primary" />,
    title: "Strategic Advisory Services",
    subtitle: "Expert Consultation",
    description: "Performance improvement consulting that helps healthcare organizations overcome operational challenges and achieve sustainable growth.",
    highlights: [
      "Operational assessments",
      "Revenue cycle consulting",
      "Process improvement",
      "Strategic roadmapping",
      "Change management support",
    ],
  },
  {
    icon: <ShieldCheck className="h-8 w-8 text-primary" />,
    title: "Compliance and Risk Management",
    subtitle: "Strengthening Regulatory Compliance",
    description: "Supporting healthcare organizations with HIPAA compliance, data privacy, and risk management initiatives.",
    highlights: [
      "HIPAA security assessments",
      "Vendor risk analysis",
      "Cybersecurity readiness",
      "Identity & access advisory",
      "Security awareness support",
    ],
  },
];

export function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress: sectionProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const { scrollYProgress: headerProgress } = useScroll({
    target: headerRef,
    offset: ['start center', 'end center'],
  });

  const { scrollYProgress: gridProgress } = useScroll({
    target: gridRef,
    offset: ['start center', 'end center'],
  });

  // Main header animations
  const mainHeaderOpacity = useTransform(headerProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0.8]);
  const mainHeaderScale = useTransform(headerProgress, [0, 0.2, 0.8, 1], [0.95, 1, 1, 0.98]);

  // Grid section animations
  const gridY = useTransform(gridProgress, [0, 0.25, 0.75, 1], [60, 0, 0, -30]);
  const gridOpacity = useTransform(gridProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0.8]);

  // Orb parallax
  const orb1Y = useTransform(sectionProgress, [0, 0.5, 1], [0, -80, -160]);
  const orb2Y = useTransform(sectionProgress, [0, 0.5, 1], [0, 80, 160]);

  return (
    <section
      ref={sectionRef}
      id="services"
      className="relative w-full overflow-hidden py-16 md:py-20"
      aria-label="Healthcare Services"
    >
      {/* Ambient orbs */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -right-48 top-0 h-96 w-96 rounded-full bg-primary/[0.03] blur-[160px]"
        style={{ y: orb1Y }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -left-48 bottom-0 h-96 w-96 rounded-full bg-secondary/[0.04] blur-[160px]"
        style={{ y: orb2Y }}
      />

      <div className="relative mx-auto max-w-6xl px-6 md:px-10">
        {/* Main Section Header */}
        <motion.div
          ref={headerRef}
          className="mb-12 flex flex-col items-center text-center"
          style={{
            opacity: mainHeaderOpacity,
            scale: mainHeaderScale,
          }}
        >

        </motion.div>

        {/* Services Grid Section */}
        <motion.div
          ref={gridRef}
          className="mb-20"
          style={{
            opacity: gridOpacity,
            y: gridY,
          }}
        >
          {/* Services Grid Header */}
          <motion.div
            className="mb-12 flex flex-col items-center text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <motion.span
              className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.28em] text-primary"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <HeartPulse className="h-3.5 w-3.5" aria-hidden />
              Services
            </motion.span>

            <motion.h3
              className="mb-5 text-4xl font-bold tracking-tight text-foreground md:text-5xl"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              What We Do
            </motion.h3>

            <motion.div
              className="mb-3 h-[2px] rounded-full bg-primary"
              initial={{ width: 0 }}
              whileInView={{ width: 60 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.5, ease: EASE_EXPO }}
            />
          </motion.div>

          {/* Services Cards Grid */}
          <div className="grid gap-6 lg:grid-cols-3">
            {MAIN_SERVICES.slice(0, 3).map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1, ease: EASE_EXPO }}
                whileHover={{ y: -4, scale: 1.02 }}
              >
                <GridCard className="h-full">
                  <div className="relative z-10">
                    {/* Icon */}
                    <motion.div
                      className="mb-4 flex h-16 w-16 items-center justify-center rounded-xl bg-primary/10 ring-1 ring-primary/20"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    >
                      {service.icon}
                    </motion.div>

                    {/* Title and subtitle */}
                    <div className="mb-3">
                      <h4 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                        {service.title}
                      </h4>
                      <span className="text-sm font-medium uppercase tracking-wider text-primary/70">
                        {service.subtitle}
                      </span>
                    </div>

                    {/* Description */}
                    <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
                      {service.description}
                    </p>

                  </div>
                </GridCard>
              </motion.div>
            ))}
          </div>

          {/* Second row — 2 cards centered */}
          <div className="mt-6 flex justify-center gap-6">
            {MAIN_SERVICES.slice(3).map((service, index) => (
              <motion.div
                key={service.title}
                className="w-full lg:w-[calc(33.333%-12px)]"
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1, ease: EASE_EXPO }}
                whileHover={{ y: -4, scale: 1.02 }}
              >
                <GridCard className="h-full">
                  <div className="relative z-10">
                    <motion.div
                      className="mb-4 flex h-16 w-16 items-center justify-center rounded-xl bg-primary/10 ring-1 ring-primary/20"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    >
                      {service.icon}
                    </motion.div>
                    <div className="mb-3">
                      <h4 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                        {service.title}
                      </h4>
                      <span className="text-sm font-medium uppercase tracking-wider text-primary/70">
                        {service.subtitle}
                      </span>
                    </div>
                    <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
                      {service.description}
                    </p>
                  </div>
                </GridCard>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
