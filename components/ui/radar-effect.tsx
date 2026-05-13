"use client";

import { motion } from "framer-motion";
import { twMerge } from "tailwind-merge";
import React from "react";

export const Circle = ({ className, children, idx, ...rest }: any) => {
  return (
    <motion.div
      {...rest}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: idx * 0.1, duration: 0.2 }}
      className={twMerge(
        "absolute inset-0 left-1/2 top-1/2 h-10 w-10 -translate-x-1/2 -translate-y-1/2 transform rounded-full border",
        className
      )}
      style={{
        borderColor: `color-mix(in oklab, var(--primary) ${100 - (idx + 1) * 10}%, transparent)`,
        ...rest.style,
      }}
    />
  );
};

export const Radar = ({ className }: { className?: string }) => {
  const circles = new Array(8).fill(1);
  return (
    <div
      className={twMerge(
        "relative flex h-20 w-20 items-center justify-center rounded-full",
        className
      )}
    >
      <style>{`
        @keyframes radar-spin {
          from { transform: rotate(20deg); }
          to   { transform: rotate(380deg); }
        }
        .animate-radar-spin {
          animation: radar-spin 10s linear infinite;
        }
      `}</style>

      {/* Rotating sweep line */}
      <div
        style={{ transformOrigin: "right center" }}
        className="animate-radar-spin absolute right-1/2 top-1/2 z-40 flex h-[3px] w-[250px] items-end justify-center overflow-hidden bg-transparent sm:h-[4px] sm:w-[320px] lg:h-[5px] lg:w-[400px]"
      >
        <div className="relative z-40 h-[1px] w-full bg-gradient-to-r from-transparent via-[var(--primary)] to-transparent" />
      </div>

      {/* Concentric circles */}
      {circles.map((_, idx) => (
        <Circle
          style={{
            height: `${(idx + 1) * 5}rem`,
            width: `${(idx + 1) * 5}rem`,
          }}
          key={`circle-${idx}`}
          idx={idx}
        />
      ))}
    </div>
  );
};

export const CapabilityIcon = ({
  icon,
  text,
  delay,
}: {
  icon?: React.ReactNode;
  text?: string;
  delay?: number;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, delay: delay ?? 0, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{
        scale: 1.08,
        transition: { type: "spring", stiffness: 400, damping: 25 },
      }}
      className="relative z-50 flex flex-col items-center justify-center space-y-1 sm:space-y-2"
    >
      <div className="flex h-8 w-8 items-center justify-center rounded-xl border transition-all duration-300 sm:h-10 sm:w-10 lg:h-12 lg:w-12 sm:rounded-2xl"
        style={{
          borderColor: "var(--primary)",
          backgroundColor: "color-mix(in oklab, var(--primary) 10%, transparent)",
        }}>
        <div className="scale-75 sm:scale-90 lg:scale-100">
          {icon}
        </div>
      </div>
      <div className="hidden rounded-md px-2 py-1 md:block">
        <div className="text-center text-xs font-bold text-foreground/70">
          {text || "Capability"}
        </div>
      </div>
    </motion.div>
  );
};
