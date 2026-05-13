'use client'

import { useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useScroll, useTransform } from 'framer-motion'
import { Mail, MapPin, Phone, ArrowRight, CheckCircle, HeartPulse } from 'lucide-react'

const EASE_EXPO = [0.16, 1, 0.3, 1] as const

const contactDetails = [
  { icon: Mail, label: 'Email', value: 'info@momentia.io', href: 'mailto:info@momentia.io' },
  { icon: Phone, label: 'Phone', value: '+1 (555) 000-0000', href: 'tel:+15550000000' },
  { icon: MapPin, label: 'Website', value: 'momentia.io', href: '#' },
]

const AREAS_OF_INTEREST = [
  'Medical Billing & Revenue Cycle',
  'Medical Coding',
  'AI & Healthcare Automation',
  'Healthcare Data Strategy',
  'Cybersecurity & Compliance',
  'General Inquiry',
] as const

const inputBase =
  'w-full rounded-lg border border-border/60 bg-card/50 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 outline-none backdrop-blur-sm transition-all duration-200 focus:border-primary/60 focus:bg-card focus:ring-2 focus:ring-primary/10'

export function Contact() {
  const sectionRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const { scrollYProgress: sectionProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  const { scrollYProgress: contentProgress } = useScroll({
    target: contentRef,
    offset: ['start center', 'end center'],
  })

  // Enhanced header animations with bidirectional smoothness
  const headerOpacity = useTransform(contentProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0.9])
  const headerScale = useTransform(contentProgress, [0, 0.15, 0.85, 1], [0.95, 1, 1, 0.98])

  // Content animations with improved bidirectional behavior
  const leftY = useTransform(contentProgress, [0, 0.3, 0.7, 1], [60, 0, 0, -20])
  const leftOpacity = useTransform(contentProgress, [0, 0.25, 0.75, 1], [0, 1, 1, 0.8])
  const rightY = useTransform(contentProgress, [0, 0.35, 0.75, 1], [80, 0, 0, -30])
  const rightOpacity = useTransform(contentProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0.8])

  // Orb parallax with improved smoothness
  const orb1Y = useTransform(sectionProgress, [0, 0.5, 1], [0, -70, -140])
  const orb2Y = useTransform(sectionProgress, [0, 0.5, 1], [0, 70, 140])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    await new Promise((r) => setTimeout(r, 1200))
    setLoading(false)
    setSubmitted(true)
  }

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative w-full overflow-hidden py-20 md:py-28"
      aria-label="Contact Us"
    >
      {/* Ambient orbs */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/4 h-[500px] w-[500px] rounded-full bg-primary/[0.04] blur-[180px]"
        style={{ y: orb1Y }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -bottom-40 right-1/4 h-96 w-96 rounded-full bg-secondary/[0.04] blur-[160px]"
        style={{ y: orb2Y }}
      />

      <div className="relative mx-auto max-w-7xl px-6 md:px-10">
        {/* Header */}
        <motion.div
          ref={contentRef}
          className="mb-14 flex flex-col items-center text-center"
          style={{ opacity: headerOpacity, scale: headerScale }}
        >
          <motion.span
            className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.28em] text-primary"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <HeartPulse className="h-3.5 w-3.5" aria-hidden />
            Contact
          </motion.span>

          <motion.h2
            className="mb-5 text-5xl font-bold tracking-tight text-foreground md:text-6xl"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Let&apos;s Modernize Healthcare Operations Together
          </motion.h2>

          <motion.div
            className="mb-7 h-[3px] rounded-full bg-primary"
            initial={{ width: 0 }}
            whileInView={{ width: 80 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.4, ease: EASE_EXPO }}
          />

          <motion.p
            className="max-w-xl text-lg leading-relaxed text-muted-foreground"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            Whether you&apos;re looking to improve revenue cycle performance, reduce operational inefficiencies, strengthen data visibility, or explore AI-enabled healthcare solutions, Momentia IO is ready to help.
          </motion.p>
        </motion.div>

        {/* Two-column layout */}
        <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
          {/* Left — info */}
          <motion.div
            className="flex flex-col gap-8"
            style={{ y: leftY, opacity: leftOpacity }}
          >
            {/* Contact details */}
            <div className="flex flex-col gap-4">
              {contactDetails.map(({ icon: Icon, label, value, href }) => (
                <motion.a
                  key={label}
                  href={href}
                  className="group flex items-start gap-4 p-4 backdrop-blur-sm transition-all duration-300 hover:border-primary/30 hover:bg-card/60 hover:shadow-md hover:shadow-primary/[0.06]"
                  whileHover={{ x: 4 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                >
                  <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary ring-1 ring-primary/20 transition-colors duration-300 group-hover:bg-primary/15">
                    <Icon className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      {label}
                    </p>
                    <p className="mt-0.5 text-sm font-medium text-foreground">
                      {value}
                    </p>
                  </div>
                </motion.a>
              ))}
            </div>

            {/* Divider */}
            <div className="h-px w-full bg-gradient-to-r from-transparent via-border to-transparent" />

            {/* Trust statement */}
              <p className="text-sm leading-relaxed text-muted-foreground">
                <span className="font-semibold text-foreground">
                  HIPAA-aware &amp; confidential.
                </span>{' '}
                We treat every inquiry with strict professional discretion and
                handle organizational details with the care healthcare demands.
              </p>
          </motion.div>

          {/* Right — form */}
          <motion.div
            className="relative p-7 backdrop-blur-sm md:p-9"
            style={{ y: rightY, opacity: rightOpacity }}
          >
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  className="flex flex-col items-center justify-center gap-5 py-16 text-center"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, ease: EASE_EXPO }}
                >
                  <motion.div
                    className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/15 ring-2 ring-primary/30"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20, delay: 0.1 }}
                  >
                    <CheckCircle className="h-8 w-8 text-primary" />
                  </motion.div>
                  <h3 className="text-xl font-bold text-foreground">
                    Message Sent!
                  </h3>
                  <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
                    Thank you for reaching out. Our healthcare operations team
                    will respond within one business day.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-2 text-sm font-medium text-primary underline-offset-4 hover:underline"
                  >
                    Send another message
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  className="relative flex flex-col gap-5"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        Name *
                      </label>
                      <input
                        required
                        type="text"
                        placeholder="Jane Smith"
                        className={inputBase}
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        Organization *
                      </label>
                      <input
                        required
                        type="text"
                        placeholder="Healthcare provider, group, or facility"
                        className={inputBase}
                      />
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        Email *
                      </label>
                      <input
                        required
                        type="email"
                        placeholder="jane@organization.com"
                        className={inputBase}
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        placeholder="+1 (555) 000-0000"
                        className={inputBase}
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Area of Interest *
                    </label>
                    <select required defaultValue="" className={inputBase}>
                      <option value="" disabled>
                        Select an area of interest…
                      </option>
                      {AREAS_OF_INTEREST.map((area) => (
                        <option key={area} value={area}>
                          {area}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Message *
                    </label>
                    <textarea
                      required
                      rows={5}
                      placeholder="Tell us about your goals — revenue cycle, denials, data visibility, AI automation, compliance…"
                      className={`${inputBase} resize-none`}
                    />
                  </div>

                  <motion.button
                    type="submit"
                    disabled={loading}
                    className="group mt-1 flex w-full items-center justify-center gap-2.5 rounded-xl bg-primary px-6 py-3.5 font-semibold text-white shadow-md shadow-primary/20 transition-all duration-300 hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/30 disabled:cursor-not-allowed disabled:opacity-70"
                    whileHover={{ scale: loading ? 1 : 1.02 }}
                    whileTap={{ scale: loading ? 1 : 0.98 }}
                  >
                    {loading ? (
                      <>
                        <motion.div
                          className="h-4 w-4 rounded-full border-2 border-white/30 border-t-white"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                        />
                        Sending…
                      </>
                    ) : (
                      <>
                        Schedule Your Consultation
                        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                      </>
                    )}
                  </motion.button>

                  <p className="text-center text-xs text-muted-foreground">
                    Or email us directly at{' '}
                    <a
                      href="mailto:info@momentia.io"
                      className="text-primary hover:underline underline-offset-4"
                    >
                      info@momentia.io
                    </a>
                  </p>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
