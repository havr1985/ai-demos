import { ArrowLeft, Phone } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";

import ChatbaseEmbed from "@/components/ChatbaseEmbed";
import { CHATBOTS } from "@/lib/chatbots";

const PAGE_TITLE = "La Strada Trattoria";
const PAGE_DESCRIPTION =
  "Roman and Tuscan cuisine, handmade pasta, and a deep Italian wine list. A neighborhood trattoria in Brooklyn.";

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

export default function RestaurantPage() {
  const restaurant = CHATBOTS.restaurant;

  return (
    <>
      <section className="max-w-6xl mx-auto px-6 md:px-8 py-24 md:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-5">
            <p className="font-sans text-xs uppercase tracking-wider font-medium text-muted">
              Brooklyn · Since 2016
            </p>
            <h1 className="mt-6 font-serif font-normal text-5xl md:text-6xl lg:text-7xl tracking-tight leading-[1.05] text-foreground">
              La <em className="italic">Strada</em> Trattoria
            </h1>
            <p className="mt-6 font-sans text-lg md:text-xl text-foreground leading-relaxed max-w-md">
              Roman and Tuscan cuisine. Handmade pasta. Wood-fired pizza. Wine
              from across Italy.
            </p>
            <div className="mt-8 w-20 h-px bg-border" aria-hidden="true" />
            <div className="mt-6 space-y-1">
              <p className="font-sans text-sm text-muted">
                142 Maple Street, Brooklyn
              </p>
              <p className="font-sans text-sm font-medium text-foreground">
                Open today until 10 PM
              </p>
            </div>
          </div>

          <div
            aria-hidden="true"
            className="lg:col-span-7 bg-accent rounded-lg p-12 md:p-16 aspect-[3/4] lg:aspect-[4/5] flex flex-col items-center justify-center text-background"
          >
            <span className="font-serif font-normal text-[12rem] md:text-[16rem] leading-none">
              L
            </span>
            <span className="mt-6 text-xs uppercase tracking-[0.3em]">
              La Strada · Est. 2016
            </span>
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-muted-background">
        <div className="max-w-6xl mx-auto px-6 md:px-8 py-20 md:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            <div className="lg:col-span-5">
              <p className="font-sans text-xs uppercase tracking-wider font-medium text-muted">
                About us
              </p>
              <h2 className="mt-4 font-serif font-normal text-3xl md:text-4xl tracking-tight leading-tight">
                Family-owned. Ten years on Maple Street.
              </h2>
            </div>

            <div className="lg:col-span-7 space-y-6 font-sans text-base md:text-lg leading-relaxed text-foreground">
              <p>
                La Strada opened in 2016 as a quiet neighborhood trattoria in
                Brooklyn Heights. Two sisters from Bologna who couldn’t find
                the kind of pasta they grew up eating decided to make it
                themselves. The first menu had six dishes.
              </p>
              <p>
                Ten years later, the menu has grown — but the principle hasn’t.
                Pasta is rolled and cut by hand every morning. The pizza dough
                rises for thirty-six hours. The Bolognese simmers for four.
                Nothing about Italian cooking benefits from a shortcut.
              </p>
              <p>
                Our wine list reflects the same impatience with shortcuts —
                over eighty Italian producers, mostly small estates, from
                Piedmont to Sicily. Ask our team. We’ll find you something
                you’ve never tasted.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 md:px-8 py-24 md:py-28">
        <p className="font-sans text-xs uppercase tracking-wider font-medium text-muted">
          From our kitchen
        </p>
        <h2 className="mt-4 font-serif font-normal text-3xl md:text-4xl tracking-tight leading-tight">
          A few of our favorites.
        </h2>
        <p className="mt-4 font-sans text-lg text-muted leading-relaxed max-w-xl">
          The full menu changes with the seasons. These are the dishes we’d
          order ourselves.
        </p>

        <div className="mt-12 md:mt-16 grid grid-cols-1 md:grid-cols-2 gap-y-12 gap-x-12 md:gap-x-16">
          <div>
            <div className="flex flex-wrap items-baseline justify-between gap-x-4">
              <h3 className="font-serif font-medium text-xl text-foreground">
                Spaghetti Carbonara
              </h3>
              <span className="font-sans text-base text-muted tabular-nums">
                $19
              </span>
            </div>
            <p className="mt-2 font-sans text-sm text-muted leading-relaxed max-w-md">
              Guanciale, egg yolk, Pecorino Romano. No cream — never. This is
              the original Roman recipe.
            </p>
          </div>

          <div>
            <div className="flex flex-wrap items-baseline justify-between gap-x-4">
              <h3 className="font-serif font-medium text-xl text-foreground">
                Tagliatelle Bolognese
              </h3>
              <span className="font-sans text-base text-muted tabular-nums">
                $22
              </span>
            </div>
            <p className="mt-2 font-sans text-sm text-muted leading-relaxed max-w-md">
              Our four-hour ragù with beef and pork. Served the way they make
              it in Bologna.
            </p>
          </div>

          <div>
            <div className="flex flex-wrap items-baseline justify-between gap-x-4">
              <h3 className="font-serif font-medium text-xl text-foreground">
                Margherita
              </h3>
              <span className="font-sans text-base text-muted tabular-nums">
                $16
              </span>
            </div>
            <p className="mt-2 font-sans text-sm text-muted leading-relaxed max-w-md">
              Wood-fired. San Marzano tomato, fior di latte, basil. The first
              pizza we ever served.
            </p>
          </div>

          <div>
            <div className="flex flex-wrap items-baseline justify-between gap-x-4">
              <h3 className="font-serif font-medium text-xl text-foreground">
                Osso Buco
              </h3>
              <span className="font-sans text-base text-muted tabular-nums">
                $34
              </span>
            </div>
            <p className="mt-2 font-sans text-sm text-muted leading-relaxed max-w-md">
              Braised veal shank with saffron risotto Milanese. A Sunday dish,
              available all week.
            </p>
          </div>

          <div>
            <div className="flex flex-wrap items-baseline justify-between gap-x-4">
              <h3 className="font-serif font-medium text-xl text-foreground">
                Tiramisu al Pistacchio
              </h3>
              <span className="font-sans text-base text-muted tabular-nums">
                $12
              </span>
            </div>
            <p className="mt-2 font-sans text-sm text-muted leading-relaxed max-w-md">
              Our signature. Sicilian pistachio cream layered the traditional
              way. Made daily.
            </p>
          </div>
        </div>
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
                <div className="flex justify-between max-w-xs">
                  <span className="text-foreground">Monday – Thursday</span>
                  <span className="text-muted tabular-nums">12:00 — 22:00</span>
                </div>
                <div className="flex justify-between max-w-xs">
                  <span className="text-foreground">Friday – Saturday</span>
                  <span className="text-muted tabular-nums">12:00 — 23:00</span>
                </div>
                <div className="flex justify-between max-w-xs">
                  <span className="text-foreground">Sunday</span>
                  <span className="text-muted tabular-nums">13:00 — 21:00</span>
                </div>
                <div className="flex justify-between max-w-xs">
                  <span className="text-foreground">Closed</span>
                  <span className="text-muted">Thanksgiving, Christmas Day</span>
                </div>
              </div>
              <p className="mt-8 font-sans text-sm text-muted leading-relaxed max-w-md">
                Kitchen closes 30 minutes before the dining room. Last
                reservation is taken one hour before kitchen close.
              </p>
            </div>

            <div>
              <p className="font-sans text-xs uppercase tracking-wider font-medium text-muted">
                Location
              </p>
              <h2 className="mt-3 font-serif font-normal text-3xl md:text-4xl tracking-tight leading-tight">
                Find us in Brooklyn Heights.
              </h2>
              <div className="mt-8 font-sans space-y-1">
                <p className="text-lg text-foreground">142 Maple Street</p>
                <p className="text-lg text-foreground">Brooklyn, NY 11201</p>
              </div>
              <div className="mt-6 space-y-1 font-sans text-base">
                <p>
                  <span className="text-muted">Phone </span>
                  <span className="text-foreground">(718) 555-0142</span>
                </p>
                <p>
                  <span className="text-muted">Email </span>
                  <span className="text-foreground">
                    hello@lastrada-trattoria.com
                  </span>
                </p>
              </div>
              <p className="mt-6 font-sans text-sm text-muted leading-relaxed max-w-md">
                Two blocks from Borough Hall (2, 3, 4, 5, R trains). Street
                parking on Maple, public garage on Court Street.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 md:px-8 py-24 md:py-32">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-serif font-normal text-4xl md:text-5xl tracking-tight leading-tight">
            Book a table.
          </h2>
          <p className="mt-4 font-sans text-lg text-muted leading-relaxed">
            Reservations open thirty days in advance. Or just ask{" "}
            <span className="italic font-serif">Sofia</span>, our AI host, in
            the chat — she can answer most questions in seconds.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 items-center justify-center">
            <a
              href="#"
              className="inline-flex items-center justify-center bg-accent text-background font-sans font-medium text-sm tracking-wide uppercase px-8 py-3.5 rounded-md hover:bg-accent-hover transition-colors"
            >
              Make a reservation
            </a>
            <a
              href="tel:+17185550142"
              className="inline-flex items-center gap-1.5 font-sans font-medium text-sm tracking-wide text-foreground hover:text-accent transition-colors"
            >
              <Phone className="size-4" aria-hidden="true" />
              Call (718) 555-0142
            </a>
          </div>
        </div>
      </section>

      <section className="bg-accent text-background">
        <div className="max-w-6xl mx-auto px-6 md:px-8 py-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <p className="font-sans text-sm leading-relaxed">
            This is a portfolio demo by Yurii. The restaurant is fictional —
            the AI assistant is real.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 font-sans text-sm font-medium hover:opacity-80 transition-opacity whitespace-nowrap"
          >
            <ArrowLeft className="size-4" aria-hidden="true" />
            Back to all demos
          </Link>
        </div>
      </section>

      <ChatbaseEmbed chatbotId={restaurant.chatbotId} />
    </>
  );
}
