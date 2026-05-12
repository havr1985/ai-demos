"use client";

import { useEffect } from "react";

type ChatbaseEmbedProps = {
  chatbotId: string;
};

type ChatbaseFn = ((...args: unknown[]) => unknown) & { q?: unknown[] };

type ChatbaseWindow = {
  chatbase?: ChatbaseFn;
};

export default function ChatbaseEmbed({ chatbotId }: ChatbaseEmbedProps) {
  useEffect(() => {
    if (!chatbotId) return;

    const w = window as unknown as ChatbaseWindow;

    if (!w.chatbase || w.chatbase("getState") !== "initialized") {
      const queue: ChatbaseFn = ((...args: unknown[]) => {
        if (!queue.q) queue.q = [];
        queue.q.push(args);
      }) as ChatbaseFn;

      w.chatbase = new Proxy(queue, {
        get(target, prop) {
          if (prop === "q") return target.q;
          return (...args: unknown[]) =>
            (target as (...a: unknown[]) => unknown)(prop, ...args);
        },
      });
    }

    const onLoad = () => {
      const script = document.createElement("script");
      script.src = "https://www.chatbase.co/embed.min.js";
      script.id = chatbotId;
      (script as unknown as { domain: string }).domain = "www.chatbase.co";
      document.body.appendChild(script);
    };

    if (document.readyState === "complete") {
      onLoad();
    } else {
      window.addEventListener("load", onLoad);
    }

    return () => {
      window.removeEventListener("load", onLoad);

      document.getElementById(chatbotId)?.remove();
      document
        .querySelectorAll('[id^="chatbase-"], [class^="chatbase-"]')
        .forEach((el) => el.remove());

      w.chatbase = undefined;
    };
  }, [chatbotId]);

  return null;
}
