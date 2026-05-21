"use client";

import {
  motion,
  useScroll,
  useTransform,
  type Variants,
} from "framer-motion";
import { ChevronDown, HeartPulse } from "lucide-react";
import { useEffect, useRef } from "react";

import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";

// ─── Types ───────────────────────────────────────────────────────────────────

type Point = { x: number; y: number };

interface WaveConfig {
  offset: number;
  amplitude: number;
  frequency: number;
  color: string;
  opacity: number;
}

// ─── Content ─────────────────────────────────────────────────────────────────

// ─── Framer variants ─────────────────────────────────────────────────────────

const EASE_EXPO = [0.16, 1, 0.3, 1] as const;

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.11, delayChildren: 0.2 } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.75, ease: EASE_EXPO },
  },
};

// ─── Canvas helpers ───────────────────────────────────────────────────────────

function buildThemeColors() {
  const tmp = document.createElement("div");
  tmp.style.cssText = "position:absolute;visibility:hidden;width:1px;height:1px;";
  document.body.appendChild(tmp);

  const isMobile = window.matchMedia("(max-width: 768px)").matches;

  const resolve = (vars: string[], alpha = 1): string => {
    let out = `rgba(255,255,255,${alpha})`;
    for (const v of vars) {
      const val = getComputedStyle(document.documentElement)
        .getPropertyValue(v)
        .trim();
      if (!val) continue;
      tmp.style.backgroundColor = `var(${v})`;
      const computed = getComputedStyle(tmp).backgroundColor;
      if (computed && computed !== "rgba(0, 0, 0, 0)") {
        if (alpha < 1) {
          const m = computed.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
          out = m ? `rgba(${m[1]},${m[2]},${m[3]},${alpha})` : computed;
        } else {
          out = computed;
        }
        break;
      }
    }
    return out;
  };

  const result = {
    backgroundTop: resolve(["--background"], 1),
    backgroundBottom: resolve(["--muted", "--background"], 0.97),
    wavePalette: [
      {
        offset: 0,
        amplitude: isMobile ? 40 : 68,
        frequency: 0.003,
        color: resolve(["--primary"], 0.8),
        opacity: isMobile ? 0.3 : 0.42,
      },
      {
        offset: Math.PI / 2,
        amplitude: isMobile ? 50 : 88,
        frequency: 0.0026,
        color: resolve(["--accent", "--primary"], 0.7),
        opacity: isMobile ? 0.22 : 0.32,
      },
      {
        offset: Math.PI,
        amplitude: isMobile ? 35 : 58,
        frequency: 0.0034,
        color: resolve(["--secondary", "--foreground"], 0.6),
        opacity: isMobile ? 0.18 : 0.28,
      },
      {
        offset: Math.PI * 1.5,
        amplitude: isMobile ? 45 : 78,
        frequency: 0.0022,
        color: resolve(["--primary"], 0.3),
        opacity: isMobile ? 0.15 : 0.22,
      },
      {
        offset: Math.PI * 2,
        amplitude: isMobile ? 30 : 50,
        frequency: 0.004,
        color: resolve(["--foreground"], 0.15),
        opacity: isMobile ? 0.12 : 0.18,
      },
    ] satisfies WaveConfig[],
  };

  document.body.removeChild(tmp);
  return result;
}

// ─── Component ────────────────────────────────────────────────────────────────

export function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef<Point>({ x: 0, y: 0 });
  const targetRef = useRef<Point>({ x: 0, y: 0 });

  // Scroll-driven parallax: content drifts up and fades out
  const { scrollY } = useScroll();

  // Improved bidirectional scroll animations
  const contentY = useTransform(scrollY, [0, 400, 800], [0, -60, -120]);
  const contentOpacity = useTransform(scrollY, [0, 300, 600], [1, 0.3, 0]);
  const scrollHintOpacity = useTransform(scrollY, [0, 100, 200], [1, 0.5, 0]);

  // Additional smooth transformations
  const contentScale = useTransform(scrollY, [0, 300, 600], [1, 0.96, 0.92]);
  const contentRotation = useTransform(scrollY, [0, 400, 800], [0, -1, -2]);
  const eyebrowSlide = useTransform(scrollY, [0, 200, 400], [0, -20, -40]);

  // Smoother orb movements with different speeds
  const orb1Y = useTransform(scrollY, [0, 500, 1000], [0, 150, 300]);
  const orb2Y = useTransform(scrollY, [0, 500, 1000], [0, -100, -200]);
  const orb3Y = useTransform(scrollY, [0, 500, 1000], [0, 80, 160]);

  // ── Canvas animation ──────────────────────────────────────────────────────

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf: number;
    let time = 0;
    let theme = buildThemeColors();

    const observer = new MutationObserver(() => {
      theme = buildThemeColors();
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class", "data-theme"],
    });

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    const mouseInfluence = reducedMotion || isMobile ? 4 : 65;
    const influenceRadius = reducedMotion || isMobile ? 100 : 300;
    const smoothing = reducedMotion || isMobile ? 0.02 : 0.08;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    const recenter = () => {
      const p = { x: canvas.width / 2, y: canvas.height / 2 };
      mouseRef.current = { ...p };
      targetRef.current = { ...p };
    };

    resize();
    recenter();

    const onResize = () => { resize(); recenter(); };
    const onMove = (e: MouseEvent) => {
      targetRef.current = { x: e.clientX, y: e.clientY };
    };
    const onLeave = () => recenter();

    window.addEventListener("resize", onResize);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseleave", onLeave);

    const drawWave = (wave: WaveConfig) => {
      ctx.save();
      ctx.beginPath();
      for (let x = 0; x <= canvas.width; x += 4) {
        const dx = x - mouseRef.current.x;
        const dy = canvas.height / 2 - mouseRef.current.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const infl = Math.max(0, 1 - dist / influenceRadius);
        const mfx =
          infl * mouseInfluence * Math.sin(time * 0.001 + x * 0.01 + wave.offset);
        const y =
          canvas.height / 2 +
          Math.sin(x * wave.frequency + time * 0.002 + wave.offset) *
            wave.amplitude +
          Math.sin(x * wave.frequency * 0.4 + time * 0.003) *
            (wave.amplitude * 0.45) +
          mfx;
        x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
      ctx.lineWidth = 2.5;
      ctx.strokeStyle = wave.color;
      ctx.globalAlpha = wave.opacity;
      ctx.shadowBlur = 32;
      ctx.shadowColor = wave.color;
      ctx.stroke();
      ctx.restore();
    };

    const tick = () => {
      time++;
      mouseRef.current.x +=
        (targetRef.current.x - mouseRef.current.x) * smoothing;
      mouseRef.current.y +=
        (targetRef.current.y - mouseRef.current.y) * smoothing;

      const grad = ctx.createLinearGradient(0, 0, 0, canvas.height);
      grad.addColorStop(0, theme.backgroundTop);
      grad.addColorStop(1, theme.backgroundBottom);
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.globalAlpha = 1;
      ctx.shadowBlur = 0;
      theme.wavePalette.forEach(drawWave);
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(raf);
      observer.disconnect();
    };
  }, []);

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <section
      className="relative isolate flex min-h-screen w-full items-center justify-center overflow-hidden bg-background"
      aria-label="Hero"
    >
      {/* Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full"
        aria-hidden
      />

      {/* Ambient glow orbs — sit on top of canvas */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <motion.div
          className="absolute left-1/2 top-[-60px] h-[320px] w-[320px] -translate-x-1/2 rounded-full bg-primary/[0.04] blur-[100px] sm:top-[-80px] sm:h-[480px] sm:w-[480px] sm:bg-primary/[0.05] sm:blur-[140px] lg:h-[560px] lg:w-[560px] lg:bg-primary/[0.06] lg:blur-[160px]"
          style={{ y: orb1Y }}
        />
        <motion.div
          className="absolute -bottom-16 right-0 h-[240px] w-[240px] rounded-full bg-secondary/[0.05] blur-[80px] sm:-bottom-20 sm:h-[320px] sm:w-[320px] sm:bg-secondary/[0.06] sm:blur-[120px] lg:h-[400px] lg:w-[400px] lg:bg-secondary/[0.07] lg:blur-[140px]"
          style={{ y: orb2Y }}
        />
        <motion.div
          className="absolute left-1/4 top-1/3 h-[200px] w-[200px] rounded-full bg-accent/[0.03] blur-[70px] sm:h-[260px] sm:w-[260px] sm:bg-accent/[0.035] sm:blur-[100px] lg:h-[320px] lg:w-[320px] lg:bg-accent/[0.04] lg:blur-[130px]"
          style={{ y: orb3Y }}
        />
      </div>

      {/* Bottom fade-out into next section */}
      <div
        className="pointer-events-none absolute bottom-0 left-0 right-0 h-40 z-10"
        style={{
          background:
            "linear-gradient(to bottom, transparent, var(--background))",
        }}
        aria-hidden
      />

      {/* ── Main content (parallax) ── */}
      <motion.div
        style={{
          y: contentY,
          opacity: contentOpacity,
          scale: contentScale,
          rotateZ: contentRotation,
        }}
        className="relative z-10 mx-auto flex w-full max-w-5xl flex-col items-center px-4 pt-20 pb-16 text-center sm:px-6 sm:pt-28 sm:pb-20 md:px-10 md:pt-32 md:pb-28"
      >
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="w-full"
        >
          {/* Eyebrow pill */}
          <motion.div
            variants={fadeUp}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-border/40 bg-background/60 px-3 py-1.5 backdrop-blur-sm sm:mb-8 sm:gap-2.5 sm:px-4 sm:py-2"
            style={{ x: eyebrowSlide }}
          >
            <HeartPulse className="h-3.5 w-3.5 text-primary sm:h-4 sm:w-4" aria-hidden />
            <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-foreground/65 sm:text-xs sm:tracking-[0.28em]">
              Healthcare Operations &amp; AI Intelligence
            </span>
          </motion.div>

          {/* H1 */}
          <motion.h1
            variants={fadeUp}
            className="mb-5 text-2xl font-bold tracking-tight text-foreground sm:mb-7 sm:text-3xl md:text-5xl lg:text-6xl leading-tight sm:leading-tight md:leading-[1.2] lg:leading-[1.15]"
          >
            Modernizing Healthcare Organizations with{" "}
            <span className="bg-gradient-to-r from-primary via-primary/75 to-accent bg-clip-text text-transparent">
              AI-Driven Operational Transformation and Revenue Cycle Optimization
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={fadeUp}
            className="mx-auto mb-6 max-w-2xl text-base leading-relaxed text-foreground/58 sm:mb-8 sm:text-lg md:text-xl lg:mb-11"
          >
            Momentia IO helps healthcare organizations improve operational
            visibility, reduce administrative burden, strengthen revenue cycle
            performance, and support smarter decision-making through automation,
            analytics, and healthcare-focused technology solutions.
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={fadeUp}
            className="mb-8 flex flex-col items-center justify-center gap-2.5 sm:mb-11 sm:flex-wrap sm:gap-3"
          >
            <InteractiveHoverButton
              href="/#contact"
              text="Schedule a Consultation"
            />
            <InteractiveHoverButton
              href="/#contact"
              text="Request a Revenue Cycle Assessment"
            />
            <InteractiveHoverButton
              href="/#contact"
              text="Get a HIPAA Security Assessment"
            />
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Scroll hint */}
      <motion.div
        style={{ opacity: scrollHintOpacity }}
        className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-1 sm:bottom-8 sm:gap-1.5 lg:bottom-10"
        aria-hidden
      >
        <span className="text-[9px] font-semibold uppercase tracking-[0.25em] text-foreground/30 sm:text-[10px] sm:tracking-[0.3em]">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 4, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
        >
          <ChevronDown className="h-3.5 w-3.5 text-foreground/25 sm:h-4 sm:w-4" />
        </motion.div>
      </motion.div>
    </section>
  );
}
