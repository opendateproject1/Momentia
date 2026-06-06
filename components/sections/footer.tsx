'use client'

import { useRef } from 'react'
import { motion } from 'framer-motion'
import { useScroll, useTransform } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

const EASE_EXPO = [0.16, 1, 0.3, 1] as const

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/#services' },
  { label: 'Industries', href: '/#industries' },
  { label: 'Contact', href: '/#contact' },
]

export function Footer() {
  const footerRef = useRef<HTMLElement>(null)

  const { scrollYProgress } = useScroll({
    target: footerRef,
    offset: ['start end', 'end end'],
  })

  const orb1Y = useTransform(scrollYProgress, [0, 1], [0, -80])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.05 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE_EXPO } },
  }

  return (
    <footer
      ref={footerRef}
      className="relative w-full border-t border-border/50 bg-background"
      aria-label="Footer"
    >
      {/* Ambient orb */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/3 h-96 w-96 rounded-full bg-primary/[0.03] blur-[160px]"
        style={{ y: orb1Y }}
      />

      <div className="relative mx-auto max-w-7xl px-6 py-16 md:px-10 md:py-20">
        {/* Top section — logo + newsletter */}
        <motion.div
          className="mb-12 grid gap-8 md:grid-cols-[1.2fr_1fr] lg:gap-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          {/* Branding */}
          <motion.div className="flex flex-col gap-4" variants={itemVariants}>
            <Link href="/" className="flex items-center w-fit">
              <Image
                src="/momentia-logo.png"
                alt="Momentia IO Logo"
                width={160}
                height={44}
                priority
                quality={100}
                style={{ objectFit: "contain" }}
                className="h-20 w-auto"
              />
            </Link>
            <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
              Healthcare AI • Revenue Cycle Management • EHR Integration •
              Data Strategy • Operational Modernization.
            </p>
            <a
              href="mailto:info@momentia.io"
              className="w-fit text-sm text-primary underline-offset-4 hover:underline"
            >
              info@momentia.io
            </a>
          </motion.div>

          {/* Talk to us */}
          <motion.div className="flex flex-col gap-3" variants={itemVariants}>
            <h3 className="text-sm font-semibold text-foreground">
              Ready to modernize your operations?
            </h3>
            <p className="text-xs text-muted-foreground">
              Reach out for a consultation, revenue cycle assessment, or HIPAA security review.
            </p>
            <motion.a
              href="/#contact"
              className="mt-1 inline-flex w-fit items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-xs font-semibold text-white transition-all duration-300 hover:bg-primary/90"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
            >
              Schedule a Consultation
              <ArrowRight className="h-3.5 w-3.5" />
            </motion.a>
          </motion.div>
        </motion.div>

        {/* Divider */}
        <motion.div
          className="my-8 h-px w-full bg-gradient-to-r from-transparent via-border to-transparent"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        />

        {/* Bottom section — links */}
        <motion.div
          className="grid gap-8 md:grid-cols-2 lg:gap-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          {/* Navigation */}
          <motion.div className="flex flex-col gap-3" variants={itemVariants}>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Navigation
            </h4>
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="group w-fit text-sm text-muted-foreground transition-colors duration-200 hover:text-primary"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.div>

          {/* Services */}
          <motion.div className="flex flex-col gap-3" variants={itemVariants}>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Services
            </h4>
            <div className="flex flex-col gap-2">
              {[
                { label: 'Medical Billing & RCM', href: '/#services' },
                { label: 'EHR Integration Solutions', href: '/#services' },
                { label: 'AI & Healthcare Automation', href: '/#services' },
                { label: 'Healthcare Data Strategy', href: '/#services' },
                { label: 'Cybersecurity & Compliance', href: '/#services' },
              ].map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="group w-fit text-sm text-muted-foreground transition-colors duration-200 hover:text-primary"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Footer bottom */}
        <motion.div
          className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border/40 pt-8 text-center sm:flex-row"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Momentia IO. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">
            Intelligent healthcare operations for modern providers.
          </p>
        </motion.div>
      </div>
    </footer>
  )
}
