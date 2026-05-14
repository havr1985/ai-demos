import { ArrowLeft, ArrowUpRight, Phone } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";

import CustomChat from "@/components/CustomChat";

const PAGE_TITLE = "Bright Smile Dental";
const PAGE_DESCRIPTION =
  "AI assistant demo for a family dental practice — chat with the bot, check service pricing, and book an appointment with real Google Sheets integration.";

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

type Service = {
  name: string;
  price: string;
  detail: string;
};

const SERVICES: readonly Service[] = [
  {
    name: "New Patient Exam",
    price: "$179",
    detail: "Full exam, X-rays, and cleaning. 45 minutes.",
  },
  {
    name: "Routine Cleaning",
    price: "$95",
    detail: "Recommended every 6 months.",
  },
  {
    name: "Composite Filling",
    price: "$185",
    detail: "Single surface. Multi-surface fillings start at $245.",
  },
  {
    name: "Teeth Whitening",
    price: "$395",
    detail:
      "Professional in-office treatment. Take-home kits available at $195.",
  },
  {
    name: "Porcelain Crown",
    price: "$1,250",
    detail: "Same-day with our CEREC technology.",
  },
  {
    name: "Invisalign Consultation",
    price: "Free",
    detail: "3D scan included. Full treatment $4,500–$6,800.",
  },
] as const;

export default function ClinicPage() {
  return (
    <>
      <section className="max-w-6xl mx-auto px-6 md:px-8 py-24 md:py-32">
        <div className="max-w-3xl mx-auto text-center">
          <p className="font-sans text-xs uppercase tracking-wider font-medium text-muted">
            Austin, Texas · Family Dentistry
          </p>
          <h1 className="mt-6 font-serif font-normal text-5xl md:text-6xl lg:text-7xl tracking-tight leading-[1.05] text-foreground">
            Bright <em className="italic">Smile</em> Dental
          </h1>
          <p className="mt-6 font-sans text-lg md:text-xl text-muted leading-relaxed max-w-2xl mx-auto">
            Twelve years of calm, judgment-free dental care on Pecan Springs
            Road. Same-day crowns, gentle hygiene, transparent pricing.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 items-center justify-center">
            <a
              href="#chat"
              className="inline-flex items-center justify-center bg-accent text-background font-sans font-medium text-sm tracking-wide uppercase px-8 py-3.5 rounded-md hover:bg-accent-hover transition-colors"
            >
              Book online
            </a>
            <a
              href="tel:+15125550184"
              className="inline-flex items-center gap-1.5 font-sans font-medium text-sm tracking-wide text-foreground hover:text-accent transition-colors"
            >
              <Phone className="size-4" aria-hidden="true" />
              (512) 555-0184
            </a>
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-muted-background">
        <div className="max-w-6xl mx-auto px-6 md:px-8 py-20 md:py-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
            <div>
              <p className="font-sans text-xs uppercase tracking-wider font-medium text-muted">
                About the practice
              </p>
              <h2 className="mt-4 font-serif font-normal text-3xl md:text-4xl tracking-tight leading-tight">
                A practice built around the patient.
              </h2>
            </div>

            <div className="space-y-6 font-sans text-base md:text-lg leading-relaxed text-foreground">
              <p>
                Bright Smile opened in 2014 when Dr. Sarah Chen left a busy
                downtown practice to start something slower. Dr. Marcus Rivera
                joined in 2020. Together they run a four-chair office with two
                hygienists and a front desk that actually picks up the phone.
              </p>
              <p>
                The equipment is modern — digital X-rays, intraoral cameras,
                CEREC same-day crowns. The care is old-school. First visits
                are scheduled for forty-five minutes. Nobody is rushed.
                Treatment plans are explained before they’re started.
              </p>
              <p>
                About thirty percent of our new patients haven’t seen a
                dentist in five years or more. Judgment-free is the practice,
                not a tagline. The team speaks English, Spanish, and Mandarin.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 md:px-8 py-24 md:py-28">
        <p className="font-sans text-xs uppercase tracking-wider font-medium text-muted">
          What we offer
        </p>
        <h2 className="mt-4 font-serif font-normal text-3xl md:text-4xl tracking-tight leading-tight">
          Services and pricing.
        </h2>
        <p className="mt-4 font-sans text-lg text-muted leading-relaxed max-w-xl">
          Transparent costs. Insurance verified before treatment. No
          surprises.
        </p>

        <div className="mt-12 md:mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {SERVICES.map((service) => (
            <div
              key={service.name}
              className="flex flex-col gap-3 rounded-lg border border-border bg-muted-background p-6 md:p-8 transition-colors hover:border-accent"
            >
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <h3 className="font-serif font-medium text-xl text-foreground">
                  {service.name}
                </h3>
                <span className="font-sans text-base text-accent tabular-nums">
                  {service.price}
                </span>
              </div>
              <p className="font-sans text-sm text-muted leading-relaxed">
                {service.detail}
              </p>
            </div>
          ))}
        </div>

        <p className="mt-10 font-sans text-sm text-muted leading-relaxed max-w-2xl">
          Prices shown are without insurance. With most major PPO plans, your
          out-of-pocket is typically 0–40% of these amounts.
        </p>
      </section>

      <section className="border-t border-border bg-muted-background">
        <div className="max-w-6xl mx-auto px-6 md:px-8 py-20 md:py-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
            <div>
              <p className="font-sans text-xs uppercase tracking-wider font-medium text-muted">
                Hours
              </p>
              <h2 className="mt-3 font-serif font-normal text-3xl md:text-4xl tracking-tight leading-tight">
                When we’re open.
              </h2>
              <div className="mt-8 space-y-3 font-sans text-base">
                <div className="flex justify-between max-w-sm">
                  <span className="text-foreground">Monday – Thursday</span>
                  <span className="text-muted tabular-nums">
                    8:00 AM – 6:00 PM
                  </span>
                </div>
                <div className="flex justify-between max-w-sm">
                  <span className="text-foreground">Friday</span>
                  <span className="text-muted tabular-nums">
                    8:00 AM – 4:00 PM
                  </span>
                </div>
                <div className="flex justify-between max-w-sm">
                  <span className="text-foreground">Saturday</span>
                  <span className="text-muted tabular-nums">
                    9:00 AM – 2:00 PM
                  </span>
                </div>
                <div className="flex justify-between max-w-sm">
                  <span className="text-foreground">Sunday</span>
                  <span className="text-muted">Closed</span>
                </div>
              </div>
              <p className="mt-8 font-sans text-sm text-muted leading-relaxed max-w-md">
                Saturdays are reserved for cleanings and emergencies. New
                patient exams are scheduled Monday through Friday.
              </p>
            </div>

            <div>
              <p className="font-sans text-xs uppercase tracking-wider font-medium text-muted">
                Location
              </p>
              <h2 className="mt-3 font-serif font-normal text-3xl md:text-4xl tracking-tight leading-tight">
                Find us in East Austin.
              </h2>
              <div className="mt-8 font-sans space-y-1">
                <p className="text-lg text-foreground">
                  2847 Pecan Springs Road
                </p>
                <p className="text-lg text-foreground">Austin, TX 78723</p>
              </div>
              <p className="mt-6 font-sans text-sm text-muted leading-relaxed max-w-md">
                Free parking on site. Wheelchair accessible entrance off the
                north lot.
              </p>
              <div className="mt-6">
                <a
                  href="tel:+15125550184"
                  className="inline-flex items-center gap-1.5 font-sans font-medium text-base text-foreground hover:text-accent transition-colors"
                >
                  <Phone className="size-4" aria-hidden="true" />
                  (512) 555-0184
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="chat"
        className="max-w-6xl mx-auto px-6 md:px-8 py-20 md:py-28"
      >
        <div className="max-w-3xl mb-12 md:mb-16">
          <p className="font-sans text-xs uppercase tracking-wider font-medium text-muted">
            AI assistant
          </p>
          <h2 className="mt-4 font-serif font-normal text-3xl md:text-4xl tracking-tight leading-tight">
            Try our AI assistant.
          </h2>
          <p className="mt-4 font-sans text-lg text-muted leading-relaxed">
            Chat with Bright Smile Assistant — ask about services, check
            availability, or book an appointment. Real AI, real Google Sheets
            integration behind the scenes.
          </p>
        </div>

        <CustomChat />
      </section>

      <section className="bg-accent text-background">
        <div className="max-w-6xl mx-auto px-6 md:px-8 py-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <p className="font-sans text-sm leading-relaxed">
            This is a portfolio demo by Yurii — a real AI assistant built on
            n8n + OpenAI with live Google Sheets integration.
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
