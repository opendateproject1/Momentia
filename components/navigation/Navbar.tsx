"use client";

import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Contact Us", href: "/contact" },
];

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);

  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => {
    setScrolled(y > 72);
  });

  return (
    <>
      {/* ── Fixed outer shell ── */}
      <div className="fixed inset-x-0 top-0 z-50 flex justify-center pointer-events-none">
        <motion.nav
          initial={{ y: -80, opacity: 0 }}
          animate={{
            y: 0,
            opacity: 1,
            width: scrolled ? "min(880px, 92vw)" : "100%",
            marginTop: scrolled ? 12 : 0,
            borderRadius: scrolled ? 9999 : 0,
            paddingLeft: scrolled ? 16 : 24,
            paddingRight: scrolled ? 16 : 24,
          }}
          transition={{
            y: { duration: 0.7, ease: EASE_OUT_EXPO, delay: 0.1 },
            opacity: { duration: 0.5, delay: 0.1 },
            width: { duration: 0.55, ease: EASE_OUT_EXPO },
            marginTop: { duration: 0.55, ease: EASE_OUT_EXPO },
            borderRadius: { duration: 0.55, ease: EASE_OUT_EXPO },
            paddingLeft: { duration: 0.55, ease: EASE_OUT_EXPO },
            paddingRight: { duration: 0.55, ease: EASE_OUT_EXPO },
          }}
          className="relative flex items-center justify-between py-3 pointer-events-auto overflow-visible"
        >
          {/* ── Glass background layer (animated opacity) ── */}
          <motion.div
            aria-hidden
            className="absolute inset-0 rounded-[inherit] backdrop-blur-2xl"
            animate={{
              opacity: scrolled ? 1 : 0,
            }}
            transition={{ duration: 0.4 }}
            style={{
              backgroundColor: "color-mix(in oklab, var(--card) 80%, transparent)",
              boxShadow:
                "0 4px 32px -4px hsl(0 0% 0% / 0.12), 0 0 0 1px color-mix(in oklab, var(--border) 60%, transparent)",
            }}
          />

          {/* ── Top gradient scrim (only at page top) ── */}
          <motion.div
            aria-hidden
            className="absolute inset-0 pointer-events-none"
            animate={{ opacity: scrolled ? 0 : 1 }}
            transition={{ duration: 0.35 }}
            style={{
              background:
                "linear-gradient(160deg, color-mix(in oklab, var(--background) 95%, transparent) 0%, transparent 100%)",
            }}
          />

          {/* ── Logo ── */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.25, ease: EASE_OUT_EXPO }}
            className="relative z-10 flex-shrink-0"
          >
            <Link href="/" className="group flex items-center">
              <motion.div
                className="relative flex items-center justify-center flex-shrink-0"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
              >
                <Image
                  src="/momentia-logo.png"
                  alt="Momentia IO Logo"
                  width={160}
                  height={44}
                  priority
                  quality={100}
                  className="h-8 w-auto sm:h-9 lg:h-8"
                  style={{ objectFit: "contain" }}
                />
              </motion.div>
            </Link>
          </motion.div>

          {/* ── Desktop nav links ── */}
          <div className="relative z-10 hidden md:flex items-center gap-0.5">
            {NAV_LINKS.map((link, i) => (
              <motion.div
                key={link.label}
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: 0.3 + i * 0.065,
                  ease: EASE_OUT_EXPO,
                }}
                onHoverStart={() => setHoveredLink(link.label)}
                onHoverEnd={() => setHoveredLink(null)}
                className="relative"
              >
                <Link
                  href={link.href}
                  className="relative block px-4 py-2 text-sm font-medium transition-colors duration-150"
                  style={{
                    color:
                      hoveredLink === link.label
                        ? "var(--foreground)"
                        : "var(--muted-foreground)",
                  }}
                >
                  {link.label}

                  {/* Animated hover pill background */}
                  <AnimatePresence>
                    {hoveredLink === link.label && (
                      <motion.span
                        layoutId="nav-hover-bg"
                        className="absolute inset-0 rounded-lg"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{
                          layout: { type: "spring", stiffness: 400, damping: 30 },
                          opacity: { duration: 0.15 },
                        }}
                        style={{
                          backgroundColor:
                            "color-mix(in oklab, var(--muted) 60%, transparent)",
                        }}
                      />
                    )}
                  </AnimatePresence>

                  {/* Animated underline dot */}
                  <AnimatePresence>
                    {hoveredLink === link.label && (
                      <motion.span
                        className="absolute bottom-0.5 left-1/2 h-[3px] w-[3px] rounded-full"
                        initial={{ opacity: 0, scale: 0, x: "-50%" }}
                        animate={{ opacity: 1, scale: 1, x: "-50%" }}
                        exit={{ opacity: 0, scale: 0, x: "-50%" }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        style={{ backgroundColor: "var(--primary)" }}
                      />
                    )}
                  </AnimatePresence>
                </Link>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="relative z-10 hidden md:flex items-center gap-3"
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.45, ease: EASE_OUT_EXPO }}
          >
            {/* ── Desktop CTA ── */}
            <motion.a
              href="/contact"
              className="relative inline-flex items-center gap-2 px-5 py-2 text-sm font-semibold rounded-full overflow-hidden"
              style={{
                color: "var(--primary-foreground)",
                backgroundColor: "var(--primary)",
              }}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              transition={{ type: "spring", stiffness: 450, damping: 22 }}
            >
              {/* Shimmer sweep */}
              <motion.span
                aria-hidden
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(110deg, transparent 20%, rgba(255,255,255,0.22) 50%, transparent 80%)",
                  translateX: "-120%",
                }}
                whileHover={{ translateX: "120%" }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
              />
              {/* Glow ring on hover */}
              <motion.span
                aria-hidden
                className="absolute inset-0 rounded-full opacity-0"
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.25 }}
                style={{
                  boxShadow: "0 0 0 3px color-mix(in oklab, var(--primary) 40%, transparent)",
                }}
              />
              <span className="relative">Schedule a Consultation</span>
              <motion.svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                className="relative"
                initial={{ x: 0 }}
                whileHover={{ x: 2 }}
                transition={{ type: "spring", stiffness: 500, damping: 20 }}
              >
                <path
                  d="M2 7h10M8 3l4 4-4 4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </motion.svg>
            </motion.a>
          </motion.div>

          {/* ── Mobile hamburger ── */}
          <motion.button
            className="relative z-10 md:hidden w-9 h-9 flex flex-col items-center justify-center gap-[4px] sm:w-10 sm:h-10 sm:gap-[5px]"
            onClick={() => setMobileOpen((o) => !o)}
            whileTap={{ scale: 0.88 }}
            aria-label="Toggle menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            {[0, 1, 2].map((i) => (
              <motion.span
                key={i}
                className="block h-[1.5px] rounded-full origin-center sm:h-[2px]"
                style={{ backgroundColor: "var(--foreground)" }}
                animate={
                  mobileOpen
                    ? i === 0
                      ? { rotate: 45, y: 5.5, width: 18 }
                      : i === 1
                        ? { opacity: 0, scaleX: 0 }
                        : { rotate: -45, y: -5.5, width: 18 }
                    : { rotate: 0, y: 0, opacity: 1, scaleX: 1, width: i === 1 ? 12 : 18 }
                }
                transition={{ type: "spring", stiffness: 320, damping: 24 }}
              />
            ))}
          </motion.button>
        </motion.nav>
      </div>

      {/* ── Mobile full-screen menu overlay ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-40 flex flex-col justify-center items-center overflow-hidden"
            initial={{ clipPath: "inset(0 0 100% 0 round 0 0 2rem 2rem)" }}
            animate={{ clipPath: "inset(0 0 0% 0 round 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0 round 0 0 2rem 2rem)" }}
            transition={{ duration: 0.55, ease: EASE_OUT_EXPO }}
            style={{ backgroundColor: "var(--background)" }}
          >
            {/* Subtle radial glow */}
            <div
              aria-hidden
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "radial-gradient(ellipse 60% 50% at 50% 50%, color-mix(in oklab, var(--primary) 8%, transparent), transparent)",
              }}
            />

            {/* Nav links */}
            <nav className="relative flex flex-col items-center gap-3">
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.label}
                  initial={{ opacity: 0, y: 32, filter: "blur(8px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: 16, filter: "blur(4px)" }}
                  transition={{
                    delay: i * 0.06 + 0.1,
                    duration: 0.45,
                    ease: EASE_OUT_EXPO,
                  }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="group flex items-center gap-3 px-6 py-2"
                  >
                    <motion.span
                      className="text-3xl font-bold tracking-tight sm:text-4xl"
                      style={{ color: "var(--foreground)" }}
                      whileHover={{ x: 6, color: "var(--primary)" }}
                      transition={{ type: "spring", stiffness: 400, damping: 22 }}
                    >
                      {link.label}
                    </motion.span>
                    <motion.span
                      className="text-lg opacity-0 group-hover:opacity-100"
                      style={{ color: "var(--primary)" }}
                      initial={{ x: -6 }}
                      whileHover={{ x: 0 }}
                    >
                      →
                    </motion.span>
                  </Link>
                </motion.div>
              ))}

              {/* CTA in mobile menu */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{
                  delay: NAV_LINKS.length * 0.06 + 0.2,
                  duration: 0.45,
                  ease: EASE_OUT_EXPO,
                }}
                className="mt-4"
              >
                <motion.a
                  href="/contact"
                  onClick={() => setMobileOpen(false)}
                  className="inline-flex items-center gap-2 px-6 py-2.5 text-sm font-semibold rounded-full sm:px-8 sm:py-3.5 sm:text-base"
                  style={{
                    color: "var(--primary-foreground)",
                    backgroundColor: "var(--primary)",
                  }}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  transition={{ type: "spring", stiffness: 420, damping: 22 }}
                >
                  Schedule a Consultation
                </motion.a>
              </motion.div>
            </nav>

            {/* Footer tagline */}
            <motion.p
              className="absolute bottom-12 text-xs tracking-widest uppercase"
              style={{ color: "var(--muted-foreground)" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              Healthcare AI &amp; Revenue Cycle Intelligence
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
