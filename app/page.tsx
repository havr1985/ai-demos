import { ArrowUpRight } from "lucide-react";

import DemoCard from "@/components/DemoCard";
import { CHATBOTS } from "@/lib/chatbots";

export default function Home() {
  return (
    <>
      <section className="max-w-6xl mx-auto px-6 md:px-8 py-24 md:py-32">
        <div className="space-y-6">
          <p className="text-xs uppercase tracking-wider font-medium text-muted">
            AI Automation Studio
          </p>
          <h1 className="font-serif font-normal text-5xl md:text-6xl lg:text-7xl tracking-tight leading-[1.05] text-foreground">
            AI chatbots and automation workflows that{" "}
            <em className="italic">actually</em> work.
          </h1>
          <p className="font-sans text-lg md:text-xl text-muted leading-relaxed max-w-2xl">
            Live, interactive demos of AI assistants I’ve built for real-world
            business scenarios. Click any demo to chat with the assistant
            directly.
          </p>
          <a
            href="#"
            className="inline-flex items-center gap-1 text-accent hover:text-accent-hover text-sm font-medium transition-colors"
          >
            Available for hire on Fiverr
            <ArrowUpRight className="size-4" aria-hidden="true" />
          </a>
        </div>
      </section>

      <section
        id="demos"
        className="max-w-6xl mx-auto px-6 md:px-8 py-20 md:py-24"
      >
        <p className="text-xs uppercase tracking-wider font-medium text-muted mb-4">
          Live demos
        </p>
        <h2 className="font-serif font-normal text-3xl md:text-4xl tracking-tight mb-12">
          Three working AI assistants. Click any to interact.
        </h2>
        <div className="grid gap-6 md:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {Object.values(CHATBOTS).map((chatbot) => (
            <DemoCard key={chatbot.slug} chatbot={chatbot} />
          ))}
        </div>
      </section>

      <section
        id="about"
        className="border-t border-border bg-muted-background"
      >
        <div className="max-w-6xl mx-auto px-6 md:px-8 py-20 md:py-24">
          <div className="space-y-4 max-w-2xl">
            <p className="text-xs uppercase tracking-wider font-medium text-muted">
              About this portfolio
            </p>
            <p className="font-sans text-base md:text-lg leading-relaxed text-foreground">
              Each demo is a fully functional AI assistant, trained on a
              realistic knowledge base for the kind of business it represents.
              The frontends are built with Next.js. Chatbots are powered by
              Chatbase, OpenAI, and custom n8n workflows for the more complex
              cases.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
