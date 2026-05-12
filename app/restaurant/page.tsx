import ChatbaseEmbed from "@/components/ChatbaseEmbed";
import { CHATBOTS } from "@/lib/chatbots";

export const metadata = {
  title: "La Strada Trattoria",
  description:
    "AI customer service assistant demo — Italian restaurant in Brooklyn.",
};

export default function RestaurantPage() {
  const restaurant = CHATBOTS.restaurant;

  return (
    <>
      <section className="max-w-6xl mx-auto px-6 md:px-8 py-24 md:py-32">
        <div className="space-y-6">
          <p className="text-xs uppercase tracking-wider font-medium text-muted">
            Demo · Italian Restaurant
          </p>
          <h1 className="font-serif font-normal text-5xl md:text-6xl tracking-tight leading-[1.05] text-foreground">
            {restaurant.name}
          </h1>
          <p className="font-sans text-lg text-muted leading-relaxed max-w-2xl">
            This page is a placeholder. The full restaurant landing will be
            built in the next session. The AI assistant in the bottom-right
            corner is fully functional — try it.
          </p>
        </div>
      </section>

      <ChatbaseEmbed chatbotId={restaurant.chatbotId} />
    </>
  );
}
