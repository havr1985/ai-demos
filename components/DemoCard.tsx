import Link from "next/link";

import { cn } from "@/lib/utils";

import type { Chatbot } from "@/lib/chatbots";

type DemoCardProps = {
  chatbot: Chatbot;
};

export default function DemoCard({ chatbot }: DemoCardProps) {
  const { slug, name, monogram, description, stack, status } = chatbot;
  const isLive = status === "live";

  return (
    <Link
      href={`/${slug}`}
      className={cn(
        "group flex flex-col gap-5 rounded-lg border border-border bg-background p-6 md:p-8",
        "transition-all duration-200",
        "hover:-translate-y-0.5 hover:border-accent/40",
        !isLive && "opacity-60 hover:opacity-100",
      )}
    >
      <span
        aria-hidden="true"
        className="flex size-12 items-center justify-center rounded-full bg-accent font-serif text-xl font-medium text-background select-none"
      >
        {monogram}
      </span>

      <h3 className="font-serif font-medium text-2xl tracking-tight text-foreground">
        {name}
      </h3>

      <p className="font-sans text-sm text-muted leading-relaxed">
        {description}
      </p>

      <div className="mt-auto flex items-center justify-between gap-4 border-t border-border pt-4">
        <p className="font-sans text-xs tracking-wide text-muted">
          {stack.join(" · ")}
        </p>
        <p className="inline-flex items-center gap-2 text-xs uppercase tracking-wider">
          <span
            aria-hidden="true"
            className={cn(
              "size-2 rounded-full",
              isLive ? "bg-emerald-600" : "bg-muted",
            )}
          />
          <span className={isLive ? "text-foreground" : "text-muted"}>
            {isLive ? "Live" : "Coming soon"}
          </span>
        </p>
      </div>
    </Link>
  );
}
