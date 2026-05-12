import Link from "next/link";

import Logo from "@/components/Logo";

export default function Header() {
  return (
    <header className="border-b border-border">
      <div className="max-w-6xl mx-auto px-6 md:px-8 py-6 md:py-8 flex items-center justify-between">
        <Link
          href="/"
          className="inline-flex items-center gap-3 text-foreground"
          aria-label="Yurii — AI Automation Studio, home"
        >
          <Logo size={32} />
          <span className="inline-flex items-baseline">
            <span className="font-serif font-medium text-base">Yurii</span>
            <span className="font-sans font-normal text-base text-muted">
              {" — AI Automation Studio"}
            </span>
          </span>
        </Link>

        <nav className="hidden sm:flex items-center gap-8">
          <Link
            href="/#demos"
            className="text-sm text-muted hover:text-foreground transition-colors"
          >
            Demos
          </Link>
          <Link
            href="/#about"
            className="text-sm text-muted hover:text-foreground transition-colors"
          >
            About
          </Link>
        </nav>
      </div>
    </header>
  );
}
