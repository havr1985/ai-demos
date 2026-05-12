import ChatbaseEmbed from "@/components/ChatbaseEmbed";
import { CHATBOTS } from "@/lib/chatbots";

export const metadata = {
  title: "La Strada Trattoria",
  description:
    "Roman and Tuscan cuisine, handmade pasta, and a deep Italian wine list. A neighborhood trattoria in Brooklyn.",
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

      <ChatbaseEmbed chatbotId={restaurant.chatbotId} />
    </>
  );
}
