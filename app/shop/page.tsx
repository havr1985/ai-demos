import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";

import { CHATBOTS } from "@/lib/chatbots";

export const metadata: Metadata = {
  title: "Loop & Linen",
  description: "E-commerce chatbot demo (coming soon).",
};

export default function ShopPage() {
  const { name, monogram, description } = CHATBOTS.shop;

  return (
    <section className="max-w-6xl mx-auto px-6 md:px-8 py-24 md:py-32">
      <div className="max-w-2xl">
        <span
          aria-hidden="true"
          className="flex size-20 items-center justify-center rounded-full bg-accent font-serif text-4xl font-medium text-background select-none"
        >
          {monogram}
        </span>
        <p className="mt-10 font-sans text-xs uppercase tracking-wider font-medium text-muted">
          Coming soon
        </p>
        <h1 className="mt-4 font-serif font-normal text-5xl md:text-6xl tracking-tight leading-[1.05] text-foreground">
          {name}
        </h1>
        <p className="mt-6 font-sans text-lg md:text-xl text-muted leading-relaxed">
          {description} This demo isn&apos;t ready yet — check back soon, or
          browse the live demo in the meantime.
        </p>
        <Link
          href="/"
          className="mt-10 inline-flex items-center gap-1.5 text-accent hover:text-accent-hover font-sans font-medium text-sm transition-colors"
        >
          <ArrowLeft className="size-4" aria-hidden="true" />
          Back to all demos
        </Link>
      </div>
    </section>
  );
}
