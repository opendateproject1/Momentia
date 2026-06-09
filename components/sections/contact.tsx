'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useScroll, useTransform } from 'framer-motion'
import { Mail, MapPin, ArrowRight, CheckCircle, HeartPulse } from 'lucide-react'

const EASE_EXPO = [0.16, 1, 0.3, 1] as const

const CONTACT_EMAIL = 'info@momentia.io'

const contactDetails = [
  { icon: Mail, label: 'Email', value: CONTACT_EMAIL, href: `mailto:${CONTACT_EMAIL}` },
  { icon: MapPin, label: 'Website', value: 'momentiaio.com', href: 'https://www.momentiaio.com' },
]

const socialLinks = [
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/company/momentia-io-inc/',
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden>
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/momentia.io?igsh=MXZsYW8zeWVpaGdydg%3D%3D&utm_source=qr',
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden>
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
      </svg>
    ),
  },
]

const AREAS_OF_INTEREST = [
  'Medical Billing & Revenue Cycle Management',
  'EHR Integration Solutions',
  'Healthcare Data Strategy',
  'AI Solutions',
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
  const [interest, setInterest] = useState<string>('')

  useEffect(() => {
    const stored = sessionStorage.getItem('momentia:interest')
    if (stored) {
      setInterest(stored)
      sessionStorage.removeItem('momentia:interest')
    }
    const handler = (e: Event) => {
      const detail = (e as CustomEvent<string>).detail
      if (detail) setInterest(detail)
    }
    window.addEventListener('momentia:interest', handler)
    return () => window.removeEventListener('momentia:interest', handler)
  }, [])

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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    const formEl = e.currentTarget
    const data = new FormData(formEl)
    const name = (data.get('name') as string) ?? ''
    const organization = (data.get('organization') as string) ?? ''
    const email = (data.get('email') as string) ?? ''
    const phone = (data.get('phone') as string) ?? ''
    const area = (data.get('area') as string) ?? ''
    const subject = `Inquiry — ${area || 'General Inquiry'}`
    const body = [
      `Name: ${name}`,
      `Organization: ${organization}`,
      `Email: ${email}`,
      `Phone: ${phone || '—'}`,
      `Area of Interest: ${area}`,
    ].join('\n')

    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`

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
          <motion.h2
            className="mb-5 text-5xl font-bold tracking-tight text-foreground md:text-6xl"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Let&apos;s Connect
          </motion.h2>

          <motion.div
            className="mb-7 h-[3px] rounded-full bg-primary"
            initial={{ width: 0 }}
            whileInView={{ width: 80 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.4, ease: EASE_EXPO }}
          />

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

            {/* Social links */}
            <div className="flex flex-col gap-4">
              {socialLinks.map(({ label, href, icon }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-start gap-4 p-4 backdrop-blur-sm transition-all duration-300 hover:border-primary/30 hover:bg-card/60 hover:shadow-md hover:shadow-primary/[0.06]"
                  whileHover={{ x: 4 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                >
                  <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary ring-1 ring-primary/20 transition-colors duration-300 group-hover:bg-primary/15">
                    {icon}
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      {label}
                    </p>
                    <p className="mt-0.5 text-sm font-medium text-foreground">
                      Follow us on {label}
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
                We treat every inquiry with strict professional discretion.
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
                        name="name"
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
                        name="organization"
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
                        name="email"
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
                        name="phone"
                        type="tel"
                        placeholder="Optional"
                        className={inputBase}
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Area of Interest *
                    </label>
                    <select
                      required
                      name="area"
                      value={interest}
                      onChange={(e) => setInterest(e.target.value)}
                      className={inputBase}
                    >
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
