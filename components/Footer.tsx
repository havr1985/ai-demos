import { ExternalLink } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="max-w-6xl mx-auto px-6 md:px-8 py-8 flex items-center justify-between text-sm text-muted">
        <p>© 2026 Yurii. Built with Next.js.</p>
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
