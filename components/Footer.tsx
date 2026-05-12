import { ExternalLink } from "lucide-react";

import Logo from "@/components/Logo";

export default function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="max-w-6xl mx-auto px-6 md:px-8 py-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between text-sm text-muted">
        <div className="flex items-center gap-2">
          <Logo size={20} />
          <p>© 2026 Yurii. Built with Next.js.</p>
        </div>
        <a
          href="#"
          className="inline-flex items-center gap-1.5 hover:text-foreground transition-colors"
        >
          Hire me on Fiverr
          <ExternalLink className="size-3.5" aria-hidden="true" />
        </a>
      </div>
    </footer>
  );
}
