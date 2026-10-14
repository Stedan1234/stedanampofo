import { NextRequest, NextResponse } from "next/server";
import {
  BRIEF_PROMPT,
  CLASSIFY_PROMPT,
  LIMITS,
  SYSTEM_PROMPT,
  budgetCeiling,
  floorFor,
  indicativeFor,
  quoteFor,
} from "@/lib/concierge";
import type { Quote } from "@/lib/concierge";
import { globalDaily, perIpDaily, sweep } from "@/lib/rate-limit";

export const runtime = "nodejs";

type Msg = { role: "user" | "assistant"; content: string };

/* ------------------------------------------------------------------ *
 * Provider adapters. Switch with CONCIERGE_PROVIDER=anthropic|openai.
 * Both take the same arguments and return the same string, so nothing
 * else in the app knows or cares which one is running.
 * ------------------------------------------------------------------ */

async function callAnthropic(system: string, messages: Msg[], maxTokens: number) {
  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-api-key": process.env.ANTHROPIC_API_KEY!,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: process.env.CONCIERGE_MODEL || "claude-haiku-4-5-20251001",
      max_tokens: maxTokens,
      system,
      messages,
    }),
  });
  if (!res.ok) throw new Error(`anthropic ${res.status}: ${await res.text()}`);
  const data = await res.json();
  return (data.content?.[0]?.text ?? "").trim();
}

async function callOpenAI(system: string, messages: Msg[], maxTokens: number) {
  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${process.env.CONCIERGE_OPENAI_KEY!}`,
    },
    body: JSON.stringify({
      model: process.env.CONCIERGE_MODEL || "gpt-4o-mini",
      max_tokens: maxTokens,
      messages: [{ role: "system", content: system }, ...messages],
    }),
  });
  if (!res.ok) throw new Error(`openai ${res.status}: ${await res.text()}`);
  const data = await res.json();
  return (data.choices?.[0]?.message?.content ?? "").trim();
}

/**
 * Which provider to call, worked out from which key is actually present.
 *
 * This used to read CONCIERGE_PROVIDER and default to "anthropic". Forgetting
 * that one variable in a deployment silently sent every request to Anthropic
 * with an undefined key — a 401 that surfaced as a generic 502. The key that
 * exists is a better signal than a variable that has to be remembered.
 * CONCIERGE_PROVIDER still wins if set, for when both keys are present.
 */
function resolveProvider(): "openai" | "anthropic" {
  const explicit = (process.env.CONCIERGE_PROVIDER || "").toLowerCase();
  if (explicit === "openai" || explicit === "anthropic") return explicit;
  if (process.env.CONCIERGE_OPENAI_KEY) return "openai";
  if (process.env.ANTHROPIC_API_KEY) return "anthropic";
  throw new Error(
    "no provider key set — expected CONCIERGE_OPENAI_KEY or ANTHROPIC_API_KEY"
  );
}

function complete(system: string, messages: Msg[], maxTokens: number) {
  const provider = resolveProvider();
  if (provider === "openai" && !process.env.CONCIERGE_OPENAI_KEY) {
    throw new Error("provider is openai but CONCIERGE_OPENAI_KEY is not set");
  }
  if (provider === "anthropic" && !process.env.ANTHROPIC_API_KEY) {
    throw new Error("provider is anthropic but ANTHROPIC_API_KEY is not set");
  }
  return provider === "openai"
    ? callOpenAI(system, messages, maxTokens)
    : callAnthropic(system, messages, maxTokens);
}

/* ------------------------------------------------------------------ *
 * Brief handoff — posts to the same Formspree form the contact page uses.
 * Fire and forget: a failed email must never break the visitor's session.
 * ------------------------------------------------------------------ */

function esc(v: unknown): string {
  return String(v ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

async function emailBrief(brief: Record<string, unknown>, transcript: string) {
  const key = process.env.CONCIERGE_RESEND_KEY;
  const to = process.env.BRIEF_TO_EMAIL;
  if (!key || !to) {
    console.warn("[concierge] CONCIERGE_RESEND_KEY or BRIEF_TO_EMAIL missing — brief not emailed");
    return;
  }

  const visitorEmail =
    typeof brief.contactEmail === "string" && /.+@.+\..+/.test(brief.contactEmail)
      ? brief.contactEmail
      : null;

  const row = (label: string, value: unknown) =>
    `<tr><td style="padding:6px 14px 6px 0;color:#6b6b6b;vertical-align:top;white-space:nowrap">${label}</td>` +
    `<td style="padding:6px 0">${esc(value)}</td></tr>`;

  const questions = Array.isArray(brief.openQuestions)
    ? brief.openQuestions.map((q) => `<li>${esc(q)}</li>`).join("")
    : "";

  const html = `
<div style="font:15px/1.55 -apple-system,Segoe UI,Roboto,sans-serif;color:#141414;max-width:640px">
  <h2 style="font-size:17px;margin:0 0 4px">New brief from the site assistant</h2>
  <p style="margin:0 0 18px;color:#6b6b6b">${esc(brief.contactName || "No name given")} — ${esc(visitorEmail || "no email")}</p>
  <table style="border-collapse:collapse;width:100%">
    ${row("Project", brief.project)}
    ${row("Scope", brief.scope)}
    ${row("Approach", brief.approach)}
    ${
      Array.isArray(brief.lines) && brief.lines.length
        ? (brief.lines as { title: string; from: string; timeline: string }[])
            .map((l) => row(esc(l.title), `from ${l.from} · ${l.timeline}`))
            .join("")
        : ""
    }
    ${row("<strong>Indicative</strong>", brief.indicative)}
    ${row("Their budget", brief.visitorBudget || "(not stated)")}
  </table>
  ${questions ? `<p style="margin:18px 0 6px;color:#6b6b6b">Still open</p><ul style="margin:0;padding-left:18px">${questions}</ul>` : ""}
  <p style="margin:24px 0 6px;color:#6b6b6b">Transcript</p>
  <pre style="white-space:pre-wrap;font:13px/1.5 ui-monospace,SFMono-Regular,Menlo,monospace;background:#f6f4f0;padding:14px;border-radius:3px;margin:0">${esc(transcript)}</pre>
</div>`.trim();

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        authorization: `Bearer ${key}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        from: process.env.BRIEF_FROM_EMAIL || "Stedan site <onboarding@resend.dev>",
        to: [to],
        // Hitting reply goes straight to the visitor, not to Resend.
        ...(visitorEmail ? { reply_to: visitorEmail } : {}),
        subject: `Brief: ${String(brief.project ?? "new enquiry").slice(0, 70)}`,
        html,
      }),
    });
    if (!res.ok) {
      console.error(`[concierge] resend ${res.status}: ${await res.text()}`);
    } else {
      console.log("[concierge] brief emailed via resend");
    }
  } catch (err) {
    console.error("[concierge] resend unreachable", err);
  }
}

/* ------------------------------------------------------------------ *
 * Scope classification. Its own small call: the model is good at reading
 * a rambling enquiry and naming the services, and bad at pricing them.
 * It never sees a figure, and a failure here degrades to "no costing"
 * rather than breaking the visitor's reply.
 * ------------------------------------------------------------------ */

async function classifyScope(messages: Msg[]): Promise<{ slugs: string[]; budget: string }> {
  const empty = { slugs: [], budget: "" };
  try {
    const transcript = messages
      .map((m) => `${m.role === "user" ? "Visitor" : "Assistant"}: ${m.content}`)
      .join("\n\n");
    const raw = await complete(CLASSIFY_PROMPT, [{ role: "user", content: transcript }], 150);
    const match = raw.match(/\{[\s\S]*\}/);
    if (!match) return empty;
    const parsed = JSON.parse(match[0]);
    return {
      slugs: Array.isArray(parsed.services)
        ? parsed.services.filter((v: unknown): v is string => typeof v === "string")
        : [],
      budget: typeof parsed.budget === "string" ? parsed.budget : "",
    };
  } catch (err) {
    console.error("[concierge] classify failed", err);
    return empty;
  }
}

/* ------------------------------------------------------------------ */

export async function POST(req: NextRequest) {
  sweep();

  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "unknown";

  const global = globalDaily(LIMITS.globalRequestsPerDay);
  if (!global.ok) {
    return NextResponse.json(
      { error: "busy", message: "The assistant has done its work for today. Write to me directly and I'll pick it up —" },
      { status: 429 }
    );
  }

  const perIp = perIpDaily(ip, LIMITS.conversationsPerIpPerDay * LIMITS.maxTurnsPerConversation);
  if (!perIp.ok) {
    return NextResponse.json(
      { error: "rate_limited", message: "That's as far as the assistant goes today. Write to me directly and we'll take it properly —" },
      { status: 429 }
    );
  }

  let body: {
    messages?: Msg[];
    mode?: "chat" | "brief";
    contact?: { name?: string; email?: string };
  };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "bad_request" }, { status: 400 });
  }

  const messages = (body.messages ?? []).filter(
    (m) => (m.role === "user" || m.role === "assistant") && typeof m.content === "string"
  );

  if (messages.length === 0) {
    return NextResponse.json({ error: "bad_request" }, { status: 400 });
  }
  // The turn cap applies to CHAT only. A brief is built from the whole
  // transcript, so capping it here would seal the exit the cap points at.
  if (body.mode !== "brief" && messages.length > LIMITS.maxTurnsPerConversation * 2) {
    return NextResponse.json(
      {
        error: "too_long",
        message: "We've covered plenty here. Turn it into a brief and I'll pick it up from there.",
      },
      { status: 400 }
    );
  }
  // Separate, generous ceiling so a brief can't be used to smuggle in a huge payload.
  if (messages.length > 60) {
    return NextResponse.json({ error: "too_long" }, { status: 400 });
  }
  // Visitor input only. The assistant's own replies are governed by
  // maxOutputTokens, and are legitimately longer than this cap.
  for (const m of messages) {
    if (m.role === "user" && m.content.length > LIMITS.maxCharsPerMessage) {
      return NextResponse.json(
        { error: "too_long", message: `Keep it under ${LIMITS.maxCharsPerMessage} characters and I'll follow better.` },
        { status: 400 }
      );
    }
  }

  try {
    if (body.mode === "brief") {
      const transcript = messages
        .map((m) => `${m.role === "user" ? "Visitor" : "Assistant"}: ${m.content}`)
        .join("\n\n");

      const raw = await complete(
        BRIEF_PROMPT,
        [{ role: "user", content: transcript }],
        LIMITS.maxOutputTokens
      );

      const match = raw.match(/\{[\s\S]*\}/);
      if (!match) throw new Error("no json in brief response");
      const brief = JSON.parse(match[0]);

      // The price is computed from the services the model picked, never
      // taken from its own arithmetic.
      const briefSlugs: string[] = Array.isArray(brief.services)
        ? brief.services.filter((v: unknown): v is string => typeof v === "string")
        : [];
      const briefQuote = quoteFor(briefSlugs, String(brief.visitorBudget ?? ""));
      brief.indicative = briefQuote?.total ?? indicativeFor(briefSlugs);
      // Show WHICH services make up the figure. Without this you get a total
      // you can't audit — and the classifier's judgement is worth seeing.
      brief.lines = briefQuote?.lines ?? [];

      // Anything about money is written here, not by the model: it kept
      // quoting a figure that contradicted the computed one.
      const slugs: string[] = Array.isArray(brief.services)
        ? brief.services.filter((v: unknown) => typeof v === "string")
        : [];
      const rawQuestions: unknown[] = Array.isArray(brief.openQuestions) ? brief.openQuestions : [];
      const questions: string[] = rawQuestions
        .filter((q: unknown): q is string => typeof q === "string")
        .map((q) => q.trim())
        .filter(
          (q) =>
            q.length > 0 &&
            !/£|budget|price|cost|\bfee\b/i.test(q) &&
            !/^to be confirmed\.?$/i.test(q)
        );

      const floor = floorFor(slugs);
      const ceiling = budgetCeiling(String(brief.visitorBudget ?? ""));
      if (floor !== null && ceiling !== null && ceiling < floor) {
        questions.unshift(
          `Budget stated tops out at £${ceiling.toLocaleString("en-GB")} — below the £${floor.toLocaleString("en-GB")} floor for this scope.`
        );
      }
      brief.openQuestions = questions.slice(0, 3);

      // The form is the source of truth for contact details. The model may
      // have picked something up from the transcript; the form overrides it.
      const name = (body.contact?.name ?? "").trim().slice(0, 80);
      const email = (body.contact?.email ?? "").trim().slice(0, 120);
      if (name) brief.contactName = name;
      if (/.+@.+\..+/.test(email)) brief.contactEmail = email;

      if (!brief.contactEmail) {
        return NextResponse.json(
          {
            error: "no_contact",
            message: "I need an address to send the brief to.",
          },
          { status: 400 }
        );
      }

      await emailBrief(brief, transcript);
      return NextResponse.json({ brief });
    }

    // Skipped on the opening turn — that reply is a read-back plus questions,
    // and there is rarely enough said yet to cost anything.
    const userTurns = messages.filter((m) => m.role === "user").length;
    let quote: Quote | null = null;

    if (userTurns >= 2) {
      const { slugs, budget } = await classifyScope(messages);
      quote = quoteFor(slugs, budget);
    }

    const pricingContext = quote
      ? [
          "",
          "PRICING CONTEXT FOR THIS TURN — facts, not text to repeat.",
          "Never restate a figure from here; the costing panel shows them.",
          `- Services identified: ${quote.lines.map((l) => l.title).join(", ")}`,
          "- A costed breakdown is rendered beneath your message.",
          quote.budgetBelow
            ? "- Their stated budget is BELOW the floor for this scope. Say so plainly, in words, with no figures."
            : "- Their budget is not below the floor, or they have not stated one. Do not raise money unprompted.",
        ].join("\n")
      : "\nPRICING CONTEXT: not enough detail to cost this yet. Do not discuss money.";

    const text = await complete(
      SYSTEM_PROMPT + "\n" + pricingContext,
      messages,
      LIMITS.maxOutputTokens
    );
    return NextResponse.json({ text, quote });
  } catch (err) {
    console.error("[concierge]", err);
    return NextResponse.json(
      {
        error: "upstream",
        message: "That didn't reach the assistant. Try again, or write to me directly —",
        // Development only. Never leaks the real fault to visitors in production.
        detail:
          process.env.NODE_ENV === "production"
            ? undefined
            : err instanceof Error
              ? err.message
              : String(err),
      },
      { status: 502 }
    );
  }
}
