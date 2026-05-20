import { ArrowLeft, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";

import CustomChat from "@/components/CustomChat";

const PAGE_TITLE = "Loop & Linen";
const PAGE_DESCRIPTION =
  "AI shopping assistant demo for a slow-textiles boutique — RAG-powered chat with semantic search, multi-step lead capture into Google Sheets + Slack.";

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  openGraph: {
    type: "website",
    title: `${PAGE_TITLE} · Demo`,
    description: PAGE_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: `${PAGE_TITLE} · Demo`,
    description: PAGE_DESCRIPTION,
  },
};

type Product = {
  name: string;
  price: string;
  detail: string;
};

const PRODUCTS: readonly Product[] = [
  {
    name: "Linen Sheet Set (Queen)",
    price: "$265",
    detail: "165gsm French flax, stonewashed at the mill.",
  },
  {
    name: "Linen Duvet Cover (Queen)",
    price: "$245",
    detail: "Coconut buttons, corner ties, 7 colors.",
  },
  {
    name: "Turkish Towel Set (6-piece)",
    price: "$145",
    detail: "600gsm Turkish cotton, mid-weight.",
  },
  {
    name: "Linen Throw Blanket",
    price: "$145",
    detail: "Waffle weave, fringed, Portugal-made.",
  },
  {
    name: "Wool Throw (Lithuanian)",
    price: "$225",
    detail: "Lambswool, warmer than synthetic at the same weight.",
  },
  {
    name: "Linen Robe",
    price: "$185",
    detail: "Mid-weight kimono cut, one size relaxed.",
  },
] as const;

type Material = {
  label: string;
  source: string;
  character: string;
};

const MATERIALS: readonly Material[] = [
  {
    label: "Linen",
    source:
      "French flax, grown in Normandy and Belgium — the world's best flax-growing region.",
    character: "Wrinkles. Softens for years. Lasts decades.",
  },
  {
    label: "Cotton",
    source:
      "Long-staple Egyptian for our percale sheets. Turkish cotton for our towels.",
    character: "Familiar care, cool feel, durable.",
  },
  {
    label: "Wool",
    source:
      "Lambswool from one Lithuanian mill, four generations of the same family.",
    character: "Warm without weight. Twenty-year lifespan with care.",
  },
] as const;

type Practical = {
  title: string;
  detail: string;
};

const PRACTICAL: readonly Practical[] = [
  {
    title: "Free shipping over $100",
    detail: "US standard, 3–5 days.",
  },
  {
    title: "30-day returns, free in US",
    detail: "Prepaid label, no questions asked.",
  },
  {
    title: "We ship internationally",
    detail: "US, Canada, UK, EU, Australia.",
  },
  {
    title: "Paper packaging",
    detail: "Recycled, recyclable, no plastic.",
  },
] as const;

export default function ShopPage() {
  return (
    <>
      <section className="max-w-6xl mx-auto px-6 md:px-8 py-24 md:py-32">
        <div className="max-w-3xl mx-auto text-center">
          <p className="font-sans text-xs uppercase tracking-wider font-medium text-muted">
            Portland, Oregon · Slow-made home textiles
          </p>
          <h1 className="mt-6 font-serif font-normal text-5xl md:text-6xl lg:text-7xl tracking-tight leading-[1.05] text-foreground">
            Loop & <em className="italic">Linen</em>
          </h1>
          <p className="mt-6 font-sans text-lg md:text-xl text-muted leading-relaxed max-w-2xl mx-auto">
            Bedding, towels, throws made the slow way — by small mills in
            Portugal, Turkey, and Lithuania. Honest about trade-offs. Stable
            prices, no flash sales.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 items-center justify-center">
            <a
              href="#products"
              className="inline-flex items-center justify-center bg-accent text-background font-sans font-medium text-sm tracking-wide uppercase px-8 py-3.5 rounded-md hover:bg-accent-hover transition-colors"
            >
              Browse collection
            </a>
            <a
              href="#about"
              className="inline-flex items-center gap-1.5 font-sans font-medium text-sm tracking-wide text-foreground hover:text-accent transition-colors"
            >
              Why slow-made?
            </a>
          </div>
        </div>
      </section>

      <section
        id="about"
        className="border-t border-border bg-muted-background"
      >
        <div className="max-w-6xl mx-auto px-6 md:px-8 py-20 md:py-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
            <div>
              <p className="font-sans text-xs uppercase tracking-wider font-medium text-muted">
                About Loop & Linen
              </p>
              <h2 className="mt-4 font-serif font-normal text-3xl md:text-4xl tracking-tight leading-tight">
                Six years of slow textile work.
              </h2>
            </div>

            <div className="space-y-6 font-sans text-base md:text-lg leading-relaxed text-foreground">
              <p>
                Loop & Linen started in 2019 when Emma Larsen, a former fashion
                designer, left New York for Portland and spent a year studying
                weaving in northern Portugal. The mill relationships came out
                of that year — not a catalog.
              </p>
              <p>
                Today the range is small on purpose. Linen comes from a
                family-run mill outside Porto. Towels are woven in Denizli, in
                southwestern Turkey. Wool throws are made by one Lithuanian
                mill that’s been in the same family for four generations.
                Everyone we work with pays a fair wage and works on a humane
                schedule. We’ve visited each mill ourselves.
              </p>
              <p>
                We don’t pretend to be perfect. Cotton is water-intensive;
                shipping has a carbon cost; even slow fashion is fashion. We
                try to do the right thing where we can, and tell you when we
                can’t.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section
        id="products"
        className="max-w-6xl mx-auto px-6 md:px-8 py-24 md:py-28"
      >
        <p className="font-sans text-xs uppercase tracking-wider font-medium text-muted">
          What we make
        </p>
        <h2 className="mt-4 font-serif font-normal text-3xl md:text-4xl tracking-tight leading-tight">
          A small range, built to last.
        </h2>
        <p className="mt-4 font-sans text-lg text-muted leading-relaxed max-w-xl">
          Prices without coupons. We don’t run sales except End of Season — in
          January and July.
        </p>

        <div className="mt-12 md:mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {PRODUCTS.map((product) => (
            <div
              key={product.name}
              className="flex flex-col gap-3 rounded-lg border border-border bg-muted-background p-6 md:p-8 transition-colors hover:border-accent"
            >
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <h3 className="font-serif font-medium text-xl text-foreground">
                  {product.name}
                </h3>
                <span className="font-sans text-base text-accent tabular-nums">
                  {product.price}
                </span>
              </div>
              <p className="font-sans text-sm text-muted leading-relaxed">
                {product.detail}
              </p>
            </div>
          ))}
        </div>

        <p className="mt-10 font-sans text-sm text-muted leading-relaxed max-w-2xl">
          Want to chat about which is right for you? Try the assistant below.
        </p>
      </section>

      <section className="border-t border-border bg-muted-background">
        <div className="max-w-6xl mx-auto px-6 md:px-8 py-20 md:py-24">
          <p className="font-sans text-xs uppercase tracking-wider font-medium text-muted">
            What we work with
          </p>
          <h2 className="mt-4 font-serif font-normal text-3xl md:text-4xl tracking-tight leading-tight">
            Materials we trust.
          </h2>

          <div className="mt-12 md:mt-16 grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-12">
            {MATERIALS.map((material, idx) => (
              <div
                key={material.label}
                className={
                  idx === 0
                    ? "lg:pl-0"
                    : "lg:border-l lg:border-border lg:pl-12"
                }
              >
                <p className="font-sans text-xs uppercase tracking-[0.2em] font-medium text-accent">
                  {material.label}
                </p>
                <p className="mt-4 font-sans text-base md:text-lg leading-relaxed text-foreground">
                  {material.source}
                </p>
                <p className="mt-4 font-sans text-sm text-muted leading-relaxed">
                  {material.character}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 md:px-8 py-20 md:py-24">
        <p className="font-sans text-xs uppercase tracking-wider font-medium text-muted">
          Practical stuff
        </p>
        <h2 className="mt-4 font-serif font-normal text-3xl md:text-4xl tracking-tight leading-tight">
          Shipping, returns, packaging.
        </h2>

        <div className="mt-12 md:mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
          {PRACTICAL.map((item) => (
            <div key={item.title}>
              <h3 className="font-serif font-medium text-lg text-foreground leading-snug">
                {item.title}
              </h3>
              <p className="mt-2 font-sans text-sm text-muted leading-relaxed">
                {item.detail}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section
        id="chat"
        className="border-t border-border bg-muted-background"
      >
        <div className="max-w-6xl mx-auto px-6 md:px-8 py-20 md:py-28">
          <div className="max-w-3xl mb-12 md:mb-16">
            <p className="font-sans text-xs uppercase tracking-wider font-medium text-muted">
              AI assistant
            </p>
            <h2 className="mt-4 font-serif font-normal text-3xl md:text-4xl tracking-tight leading-tight">
              Ask our AI shopping assistant.
            </h2>
            <p className="mt-4 font-sans text-lg text-muted leading-relaxed">
              Chat about products, materials, sizing, shipping. For wholesale
              or custom requests, leave your details and our team follows up
              within a business day. RAG-powered — pulls from our actual
              catalog and policies.
            </p>
          </div>

          <CustomChat
            apiEndpoint="/api/shop-chat"
            assistantName="Loop & Linen Assistant"
            welcomeMessage="Hi! I'm Loop & Linen Assistant. Ask me about our products, materials, shipping, or sizing. For wholesale or custom orders, I can take down your details and have our team reach out. What brings you in today?"
            suggestionQuestions={[
              "What's the difference between linen and cotton sheets?",
              "Do you ship internationally?",
              "I'm interested in wholesale",
            ]}
            storageKeyPrefix="loop-linen"
          />
        </div>
      </section>

      <section className="bg-accent text-background">
        <div className="max-w-6xl mx-auto px-6 md:px-8 py-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <p className="font-sans text-sm leading-relaxed">
            This is a portfolio demo by Yurii — a real AI shopping assistant
            built on n8n + Pinecone (semantic RAG) + OpenAI, with live Google
            Sheets integration for lead capture and Slack notifications for
            team alerts.
          </p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 font-sans text-sm font-medium hover:opacity-80 transition-opacity whitespace-nowrap"
            >
              <ArrowLeft className="size-4" aria-hidden="true" />
              Back to all demos
            </Link>
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 font-sans text-sm font-medium hover:opacity-80 transition-opacity whitespace-nowrap"
            >
              Yurii AI Studio
              <ArrowUpRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
