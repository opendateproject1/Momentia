import React from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface InteractiveHoverButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string;
  href?: string;
  interest?: string;
}

const InteractiveHoverButton = React.forwardRef<
  HTMLButtonElement,
  InteractiveHoverButtonProps
>(({ text = "Button", className, href, interest, onClick, ...props }, ref) => {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (interest && typeof window !== "undefined") {
      sessionStorage.setItem("momentia:interest", interest);
      window.dispatchEvent(new CustomEvent("momentia:interest", { detail: interest }));
    }
    if (href) {
      const hashIndex = href.indexOf("#");
      if (hashIndex !== -1) {
        e.preventDefault();
        const hash = href.slice(hashIndex);
        const element = document.querySelector(hash);
        element?.scrollIntoView({ behavior: "smooth" });
      } else {
        window.location.href = href;
      }
    }
    onClick?.(e);
  };

  return (
    <button
      ref={ref}
      className={cn(
        "group relative cursor-pointer overflow-hidden rounded-full border border-border bg-background px-6 py-2.5 text-center text-xs font-semibold text-foreground transition-all duration-300 hover:border-primary",
        className,
      )}
      onClick={handleClick}
      {...props}
    >
      <span className="inline-flex items-center gap-1.5 translate-x-1 transition-all duration-300 group-hover:translate-x-12 group-hover:opacity-0">
        <span className="h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0"></span>
        {text}
      </span>
      <div className="absolute top-0 z-10 flex h-full w-full translate-x-12 items-center justify-center gap-2 text-primary-foreground opacity-0 transition-all duration-300 group-hover:-translate-x-8 group-hover:opacity-100">
        <span>{text}</span>
        <ArrowRight className="h-4 w-4" />
      </div>
    </button>
  );
});

InteractiveHoverButton.displayName = "InteractiveHoverButton";

export { InteractiveHoverButton };