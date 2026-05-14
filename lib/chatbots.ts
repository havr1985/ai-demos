export type Chatbot = {
  slug: string;
  name: string;
  monogram: string;
  description: string;
  stack: readonly string[];
  status: "live" | "coming-soon";
  chatbotId: string;
};

export const CHATBOTS = {
  restaurant: {
    slug: "restaurant",
    name: "La Strada Trattoria",
    monogram: "L",
    description:
      "AI customer service assistant for an Italian restaurant in Brooklyn. Handles reservations, menu questions, and dietary inquiries.",
    stack: ["Chatbase", "OpenAI"],
    status: "live",
    chatbotId: "F20oeu77ITCBViACqyg7G",
  },
  clinic: {
    slug: "clinic",
    name: "Bright Smile Dental",
    monogram: "B",
    description:
      "Appointment booking and patient intake assistant for a dental clinic.",
    stack: ["n8n", "OpenAI", "Google Sheets"],
    status: "live",
    chatbotId: "",
  },
  shop: {
    slug: "shop",
    name: "Loop & Linen",
    monogram: "&",
    description:
      "E-commerce chatbot with lead capture and backend automation via n8n.",
    stack: ["Chatbase", "n8n", "OpenAI"],
    status: "coming-soon",
    chatbotId: "",
  },
} as const satisfies Record<string, Chatbot>;
