'use client'

import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { useScroll, useTransform } from 'framer-motion'
import { Mail, ArrowRight, Linkedin, Twitter, Github } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

const EASE_EXPO = [0.16, 1, 0.3, 1] as const

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/#services' },
  { label: 'Industries', href: '/#industries' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/#contact' },
]

const legalLinks = [
  { label: 'Privacy Policy', href: '#' },
  { label: 'Terms of Service', href: '#' },
  { label: 'Security', href: '#' },
]

const socialLinks = [
  { icon: Linkedin, label: 'LinkedIn', href: '#' },
  { icon: Twitter, label: 'Twitter', href: '#' },
  { icon: Github, label: 'GitHub', href: '#' },
]

export function Footer() {
  const footerRef = useRef<HTMLElement>(null)
  const [emailFocused, setEmailFocused] = useState(false)

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
            <Link href="/" className="flex items-center gap-2.5 w-fit">
              <Image
                src="/logo.png"
                alt="Momentia IO Logo"
                width={36}
                height={36}
                priority
                quality={100}
                style={{ objectFit: "contain" }}
                className="w-9 h-9"
              />
              <span className="text-lg font-bold text-foreground">Momentia IO</span>
            </Link>
            <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
              Healthcare AI • Revenue Cycle Management • Medical Billing &amp;
              Coding • Data Strategy • Operational Modernization.
            </p>
            <a
              href="mailto:info@momentia.io"
              className="w-fit text-sm text-primary underline-offset-4 hover:underline"
            >
              info@momentia.io
            </a>
            {/* Social links */}
            <div className="flex items-center gap-3 pt-2">
              {socialLinks.map(({ icon: Icon, label, href }) => (
                <motion.a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="group flex h-9 w-9 items-center justify-center rounded-lg border border-border/40 bg-card/40 text-muted-foreground transition-all duration-300 hover:border-primary/40 hover:bg-primary/10 hover:text-primary"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon className="h-4 w-4" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Newsletter signup */}
          <motion.div className="flex flex-col gap-3" variants={itemVariants}>
            <h3 className="text-sm font-semibold text-foreground">
              Healthcare Operations Insights
            </h3>
            <p className="text-xs text-muted-foreground">
              Quarterly perspectives on revenue cycle, AI in healthcare, and operational modernization.
            </p>
            <form className="flex gap-2">
              <motion.input
                type="email"
                placeholder="your@email.com"
                name="email"
                onFocus={() => setEmailFocused(true)}
                onBlur={() => setEmailFocused(false)}
                className="flex-1 rounded-lg border border-border/60 bg-card/50 px-3.5 py-2.5 text-xs text-foreground placeholder:text-muted-foreground/50 outline-none backdrop-blur-sm transition-all duration-200 focus:border-primary/60 focus:bg-card focus:ring-2 focus:ring-primary/10"
                animate={{
                  boxShadow: emailFocused
                    ? '0 0 0 3px var(--primary / 0.1)'
                    : 'none',
                }}
              />
              <motion.button
                type="submit"
                className="flex items-center justify-center rounded-lg bg-primary px-3.5 text-white transition-all duration-300 hover:bg-primary/90 active:scale-95"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <ArrowRight className="h-4 w-4" />
              </motion.button>
            </form>
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
          className="grid gap-8 md:grid-cols-3 lg:gap-12"
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
                { label: 'Medical Coding', href: '/#services' },
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

          {/* Legal & Info */}
          <motion.div className="flex flex-col gap-3" variants={itemVariants}>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Legal
            </h4>
            <div className="flex flex-col gap-2">
              {legalLinks.map((link) => (
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
