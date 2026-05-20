"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type FormEvent,
  type KeyboardEvent,
} from "react";

import { cn } from "@/lib/utils";

type ChatResponse = { response: string; sessionId: string };
type ChatErrorResponse = { error: string };

const MAX_LEN = 4000;
const REQUEST_TIMEOUT_MS = 25_000;
const ERROR_DISMISS_MS = 8_000;
const SCROLL_THRESHOLD = 40;

type Role = "user" | "assistant";
type Message = { id: string; role: Role; content: string; timestamp: number };

export type CustomChatProps = {
  apiEndpoint: string;
  assistantName: string;
  welcomeMessage: string;
  suggestionQuestions: readonly string[];
  storageKeyPrefix: string;
};

function safeRead<T>(key: string): T | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(key);
    if (raw === null) return null;
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

function safeWrite(key: string, value: unknown): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Storage may be blocked (private mode, quota, etc.); in-memory state still works.
  }
}

function safeRemove(key: string): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(key);
  } catch {
    // ignore
  }
}

function newId(): string {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  return `id-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
}

function makeWelcome(content: string): Message {
  return { id: newId(), role: "assistant", content, timestamp: Date.now() };
}

function isMessage(value: unknown): value is Message {
  if (typeof value !== "object" || value === null) return false;
  const v = value as Record<string, unknown>;
  return (
    typeof v.id === "string" &&
    (v.role === "user" || v.role === "assistant") &&
    typeof v.content === "string" &&
    typeof v.timestamp === "number"
  );
}

function isMessageArray(value: unknown): value is Message[] {
  return Array.isArray(value) && value.every(isMessage);
}

function Bubble({ msg }: { msg: Message }) {
  const isUser = msg.role === "user";
  return (
    <div
      className={cn(
        "max-w-[75%] whitespace-pre-wrap rounded-2xl px-4 py-2 font-sans text-base leading-relaxed",
        isUser
          ? "self-end rounded-br-md bg-accent text-background"
          : "self-start rounded-bl-md bg-white text-foreground shadow-[0_1px_2px_rgba(0,0,0,0.04)]",
      )}
    >
      {msg.content}
    </div>
  );
}

function TypingBubble() {
  return (
    <div
      aria-label="Assistant is typing"
      className="flex items-center gap-1.5 self-start rounded-2xl rounded-bl-md bg-white px-4 py-3 shadow-[0_1px_2px_rgba(0,0,0,0.04)]"
    >
      <span className="size-2 animate-pulse rounded-full bg-muted/60" style={{ animationDelay: "0ms" }} />
      <span className="size-2 animate-pulse rounded-full bg-muted/60" style={{ animationDelay: "150ms" }} />
      <span className="size-2 animate-pulse rounded-full bg-muted/60" style={{ animationDelay: "300ms" }} />
    </div>
  );
}

function SuggestionRow({
  suggestions,
  onPick,
  disabled,
}: {
  suggestions: readonly string[];
  onPick: (text: string) => void;
  disabled: boolean;
}) {
  return (
    <div className="flex flex-wrap gap-2 self-start pt-1">
      {suggestions.map((s) => (
        <button
          key={s}
          type="button"
          disabled={disabled}
          onClick={() => onPick(s)}
          className="rounded-full border border-border bg-muted-background px-3 py-1.5 font-sans text-sm text-foreground transition-colors hover:border-accent hover:text-accent disabled:cursor-not-allowed disabled:opacity-50"
        >
          {s}
        </button>
      ))}
    </div>
  );
}

export default function CustomChat({
  apiEndpoint,
  assistantName,
  welcomeMessage,
  suggestionQuestions,
  storageKeyPrefix,
}: CustomChatProps) {
  const sessionKey = useMemo(() => `${storageKeyPrefix}-session-id`, [storageKeyPrefix]);
  const messagesKey = useMemo(() => `${storageKeyPrefix}-messages`, [storageKeyPrefix]);

  const [messages, setMessages] = useState<Message[]>([]);
  const [sessionId, setSessionId] = useState<string>("");
  const [input, setInput] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [hydrated, setHydrated] = useState<boolean>(false);
  const [lastUserMessage, setLastUserMessage] = useState<string | null>(null);

  const scrollRef = useRef<HTMLDivElement | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const errorTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const autoScrollRef = useRef<boolean>(true);

  useEffect(() => {
    // Hydrate localStorage-backed state on mount. setState in an effect is the
    // standard pattern for SSR-unsafe client storage; React batches the updates.
    /* eslint-disable react-hooks/set-state-in-effect -- mount-time hydration of localStorage */
    const storedSession = safeRead<string>(sessionKey);
    const session =
      typeof storedSession === "string" && storedSession.length > 0 ? storedSession : newId();
    if (session !== storedSession) safeWrite(sessionKey, session);
    setSessionId(session);

    const storedMessages = safeRead<unknown>(messagesKey);
    const restored =
      isMessageArray(storedMessages) && storedMessages.length > 0
        ? storedMessages
        : [makeWelcome(welcomeMessage)];
    setMessages(restored);

    setHydrated(true);
    /* eslint-enable react-hooks/set-state-in-effect */
  }, [sessionKey, messagesKey, welcomeMessage]);

  useEffect(() => {
    if (!hydrated) return;
    safeWrite(messagesKey, messages);
  }, [messages, hydrated, messagesKey]);

  useEffect(() => {
    const ta = textareaRef.current;
    if (!ta) return;
    ta.style.height = "auto";
    const lineHeight = 24;
    const maxHeight = lineHeight * 4 + 16;
    ta.style.height = `${Math.min(ta.scrollHeight, maxHeight)}px`;
  }, [input]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el || !autoScrollRef.current) return;
    el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [messages, isLoading]);

  useEffect(() => {
    return () => {
      if (errorTimerRef.current) clearTimeout(errorTimerRef.current);
    };
  }, []);

  const clearErrorTimer = useCallback(() => {
    if (errorTimerRef.current) {
      clearTimeout(errorTimerRef.current);
      errorTimerRef.current = null;
    }
  }, []);

  const showError = useCallback(
    (msg: string) => {
      clearErrorTimer();
      setError(msg);
      errorTimerRef.current = setTimeout(() => setError(null), ERROR_DISMISS_MS);
    },
    [clearErrorTimer],
  );

  const postToProxy = useCallback(
    async (messageText: string) => {
      setIsLoading(true);
      setError(null);
      clearErrorTimer();
      try {
        const res = await fetch(apiEndpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: messageText, sessionId }),
          signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
        });
        const data = (await res.json()) as ChatResponse | ChatErrorResponse;
        if (!res.ok || "error" in data) {
          const msg = "error" in data ? data.error : "Something went wrong. Please try again.";
          showError(msg);
          return;
        }
        setMessages((prev) => [
          ...prev,
          { id: newId(), role: "assistant", content: data.response, timestamp: Date.now() },
        ]);
        setLastUserMessage(null);
      } catch {
        showError("The assistant is temporarily unavailable. Please try again in a moment.");
      } finally {
        setIsLoading(false);
        textareaRef.current?.focus();
      }
    },
    [apiEndpoint, sessionId, showError, clearErrorTimer],
  );

  const send = useCallback(
    async (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || trimmed.length > MAX_LEN || isLoading) return;
      setMessages((prev) => [
        ...prev,
        { id: newId(), role: "user", content: trimmed, timestamp: Date.now() },
      ]);
      setLastUserMessage(trimmed);
      setInput("");
      autoScrollRef.current = true;
      await postToProxy(trimmed);
    },
    [isLoading, postToProxy],
  );

  const retry = useCallback(() => {
    if (!lastUserMessage || isLoading) return;
    void postToProxy(lastUserMessage);
  }, [lastUserMessage, isLoading, postToProxy]);

  const reset = useCallback(() => {
    clearErrorTimer();
    safeRemove(sessionKey);
    safeRemove(messagesKey);
    const fresh = newId();
    safeWrite(sessionKey, fresh);
    setSessionId(fresh);
    setMessages([makeWelcome(welcomeMessage)]);
    setLastUserMessage(null);
    setInput("");
    setError(null);
    autoScrollRef.current = true;
    textareaRef.current?.focus();
  }, [clearErrorTimer, sessionKey, messagesKey, welcomeMessage]);

  const handleScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const atBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - SCROLL_THRESHOLD;
    autoScrollRef.current = atBottom;
  }, []);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    void send(input);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (!isLoading) void send(input);
    }
  };

  const showSuggestions =
    hydrated && messages.length === 1 && messages[0].role === "assistant";
  const trimmedInput = input.trim();
  const canSend = !isLoading && trimmedInput.length > 0 && trimmedInput.length <= MAX_LEN;

  return (
    <section
      className="mx-auto flex w-full max-w-4xl flex-col overflow-hidden rounded-xl border border-border bg-background"
      style={{ height: 600 }}
    >
      <div className="flex items-center justify-between border-b border-border bg-background px-5 py-3">
        <span className="font-serif italic text-lg text-foreground">
          {assistantName}
        </span>
        <button
          type="button"
          onClick={reset}
          aria-label="Start a new conversation"
          className="font-sans text-xs text-muted transition-colors hover:text-accent"
        >
          Start over
        </button>
      </div>

      <div
        ref={scrollRef}
        onScroll={handleScroll}
        role="log"
        aria-live="polite"
        aria-label="Conversation"
        className="flex flex-1 flex-col gap-4 overflow-y-auto px-5 py-6"
      >
        {hydrated && messages.map((m) => <Bubble key={m.id} msg={m} />)}
        {showSuggestions && (
          <SuggestionRow suggestions={suggestionQuestions} onPick={send} disabled={isLoading} />
        )}
        {isLoading && <TypingBubble />}
      </div>

      {error && (
        <div className="flex items-center justify-between gap-3 border-t border-border bg-muted-background px-5 py-2">
          <span className="font-sans text-sm text-accent/80">{error}</span>
          {lastUserMessage && (
            <button
              type="button"
              onClick={retry}
              disabled={isLoading}
              className="font-sans text-xs text-accent transition-colors hover:text-accent-hover disabled:opacity-50"
            >
              Retry
            </button>
          )}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="flex items-end gap-2 border-t border-border bg-background p-3"
      >
        <textarea
          ref={textareaRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          aria-label="Type your message"
          placeholder="Type your message..."
          rows={1}
          maxLength={MAX_LEN}
          className="flex-1 resize-none rounded-lg border border-border bg-muted-background px-3 py-2 font-sans text-base placeholder:text-muted/70 focus:outline-none"
        />
        <button
          type="submit"
          disabled={!canSend}
          aria-label="Send message"
          className="rounded-lg bg-accent px-4 py-2 font-sans font-medium text-background transition-colors hover:bg-accent-hover disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isLoading ? "Sending…" : "Send"}
        </button>
      </form>
    </section>
  );
}
