import { NextResponse } from "next/server";

import type {
  ChatErrorResponse,
  ChatRequest,
  ChatResponse,
} from "@/lib/clinic-chat";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 0;

const N8N_TIMEOUT_MS = 20_000;
const MAX_BODY_BYTES = 10_240;
const MAX_MESSAGE_CHARS = 4_000;

const GENERIC_ERROR = "Something went wrong. Please try again.";
const UNAVAILABLE_ERROR =
  "The assistant is temporarily unavailable. Please try again in a moment.";

const shortSid = (s: string) => `${s.slice(0, 8)}...`;

function errorResponse(status: number, error: string) {
  const body: ChatErrorResponse = { error };
  return NextResponse.json(body, { status });
}

function parsePayload(raw: unknown):
  | { ok: true; value: ChatRequest }
  | { ok: false; reason: string } {
  if (typeof raw !== "object" || raw === null) {
    return { ok: false, reason: "Body must be a JSON object" };
  }
  const obj = raw as Record<string, unknown>;

  const message = obj.message;
  if (typeof message !== "string" || message.trim().length === 0) {
    return { ok: false, reason: "message must be a non-empty string" };
  }
  if (message.length > MAX_MESSAGE_CHARS) {
    return { ok: false, reason: "message exceeds maximum length" };
  }

  const sessionId = obj.sessionId;
  if (typeof sessionId !== "string" || sessionId.length === 0) {
    return { ok: false, reason: "sessionId is required" };
  }

  return { ok: true, value: { message, sessionId } };
}

export async function POST(req: Request) {
  const contentLengthHeader = req.headers.get("content-length");
  if (contentLengthHeader !== null) {
    const declared = Number(contentLengthHeader);
    if (Number.isFinite(declared) && declared > MAX_BODY_BYTES) {
      return errorResponse(413, "Payload too large");
    }
  }

  let raw: unknown;
  try {
    raw = await req.json();
  } catch {
    return errorResponse(400, "Invalid JSON body");
  }

  const parsed = parsePayload(raw);
  if (!parsed.ok) {
    return errorResponse(400, parsed.reason);
  }
  const { message, sessionId } = parsed.value;

  const webhookUrl = process.env.N8N_CLINIC_WEBHOOK_URL;
  if (!webhookUrl) {
    console.error("[clinic-chat] N8N_CLINIC_WEBHOOK_URL is not set");
    return errorResponse(500, GENERIC_ERROR);
  }

  console.log("[clinic-chat] →", {
    sessionId: shortSid(sessionId),
    len: message.length,
  });

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), N8N_TIMEOUT_MS);
  const startedAt = Date.now();

  let upstream: Response;
  try {
    upstream = await fetch(webhookUrl, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ message, sessionId } satisfies ChatRequest),
      signal: controller.signal,
    });
  } catch (err) {
    clearTimeout(timeout);
    const { name, message: errMessage } =
      err instanceof Error
        ? err
        : { name: "UnknownError", message: String(err) };
    console.error("[clinic-chat] n8n unreachable", { name, message: errMessage });
    return errorResponse(503, UNAVAILABLE_ERROR);
  }
  clearTimeout(timeout);

  const elapsedMs = Date.now() - startedAt;

  if (!upstream.ok) {
    const text = await upstream.text().catch(() => "");
    console.error("[clinic-chat] n8n non-2xx", {
      status: upstream.status,
      body: text.slice(0, 500),
    });
    return errorResponse(500, GENERIC_ERROR);
  }

  let data: unknown;
  try {
    data = await upstream.json();
  } catch (err) {
    const errMessage = err instanceof Error ? err.message : String(err);
    console.error("[clinic-chat] n8n returned non-JSON", { message: errMessage });
    return errorResponse(500, GENERIC_ERROR);
  }

  console.log("[clinic-chat] ← n8n ok", {
    sessionId: shortSid(sessionId),
    ms: elapsedMs,
  });

  return NextResponse.json(data as ChatResponse, { status: 200 });
}
