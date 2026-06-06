import Link from "next/link";
import Image from "next/image";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-6 text-center">
      {/* Logo */}
      <Link href="/" className="mb-10 flex items-center">
        <Image
          src="/momentia-logo.png"
          alt="Momentia IO"
          width={160}
          height={44}
          priority
          style={{ objectFit: "contain" }}
          className="h-20 w-auto"
        />
      </Link>

      {/* 404 label */}
      <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-primary">
        404 — Page Not Found
      </p>

      <h1 className="mb-4 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
        This page doesn&apos;t exist.
      </h1>

      <p className="mb-10 max-w-sm text-base leading-relaxed text-muted-foreground">
        The link may be broken or the page may have moved. Head back to the
        homepage to find what you need.
      </p>

      <Link
        href="/"
        className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/20"
      >
        Back to Homepage
      </Link>
    </div>
  );
}
