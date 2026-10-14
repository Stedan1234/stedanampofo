"use client";
import { Fragment, useEffect, useRef, useState } from "react";
import { conciergeLimits, site } from "@/lib/site";

type Msg = { role: "user" | "assistant"; content: string };
type Quote = {
  lines: { title: string; from: string; timeline: string }[];
  total: string;
  bundleNote?: string;
  footnote?: string;
  budgetBelow: boolean;
};
type Brief = {
  project: string;
  scope: string;
  approach: string;
  indicative: string;
  lines?: { title: string; from: string; timeline: string }[];
  visitorBudget?: string;
  openQuestions: string[];
  contactName?: string;
  contactEmail?: string;
};

const PROMPTS = [
  "I'm launching an app and need brand plus a site.",
  "What would a project with you cost?",
  "I have Figma designs already — can you build them?",
  "Can you add an AI feature to my product?",
];

export function Concierge() {
  const [seed, setSeed] = useState("");
  const [messages, setMessages] = useState<Msg[]>([]);
  const [draft, setDraft] = useState("");
  const [busy, setBusy] = useState(false);
  const [brief, setBrief] = useState<Brief | null>(null);
  const [quote, setQuote] = useState<Quote | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [askingContact, setAskingContact] = useState(false);
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactError, setContactError] = useState<string | null>(null);
  const logRef = useRef<HTMLDivElement>(null);

  const open = messages.length > 0;
  // Same ceiling the API enforces. Checked here so the visitor is never
  // allowed to send a message that is going to be rejected.
  const atCap = messages.length >= conciergeLimits.maxTurns * 2;

  useEffect(() => {
    if (logRef.current) logRef.current.scrollTop = logRef.current.scrollHeight;
  }, [messages, busy, brief]);

  async function send(text: string) {
    const content = text.trim();
    if (!content || busy || atCap) return;

    const next: Msg[] = [...messages, { role: "user", content }];
    setMessages(next);
    setDraft("");
    setSeed("");
    setBusy(true);
    setNotice(null);

    try {
      const res = await fetch("/api/concierge", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ messages: next, mode: "chat" }),
      });
      const data = await res.json();

      if (!res.ok) {
        setNotice(data.message ?? "That didn't reach the assistant. Write to me directly —");
        // Roll back the optimistic append and hand their text back, so a
        // failed send never leaves an orphaned message in the log.
        setMessages(messages);
        setDraft(content);
        return;
      }
      setMessages([...next, { role: "assistant", content: data.text }]);
      if (data.quote) setQuote(data.quote);
    } catch {
      setNotice("The assistant is offline right now. Write to me directly —");
      setMessages(messages);
      setDraft(content);
    } finally {
      setBusy(false);
    }
  }

  const emailLooksValid = /.+@.+\..+/.test(contactEmail.trim());

  async function makeBrief() {
    if (busy || messages.length < 2) return;
    if (!emailLooksValid) {
      setContactError("I need an address to send the brief to.");
      return;
    }
    setContactError(null);
    setBusy(true);
    setNotice(null);
    try {
      const res = await fetch("/api/concierge", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          messages,
          mode: "brief",
          // Passed explicitly rather than left for the model to pull out of
          // the transcript — a lead with no reply address is not a lead.
          contact: { name: contactName.trim(), email: contactEmail.trim() },
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setNotice(data.message ?? "The brief didn't come together. Send it to me directly —");
        return;
      }
      setBrief(data.brief);
      setAskingContact(false);
    } catch {
      setNotice("The brief didn't come together. Send it to me directly —");
    } finally {
      setBusy(false);
    }
  }

  // mailto alone is a silent dead end for anyone on webmail with no desktop
  // mail client. Copying always works, and the address stays on screen.
  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(site.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(false);
    }
  }

  function reset() {
    setMessages([]);
    setQuote(null);
    setBrief(null);
    setNotice(null);
    setDraft("");
    setAskingContact(false);
    setContactError(null);
  }

  return (
    <div className="mt-10">
      {/* entry */}
      <div className="flex max-w-[620px] items-center gap-2 rounded-[3px] border border-line bg-paper-2 py-1.5 pl-5 pr-1.5 transition focus-within:border-accent">
        <input
          value={seed}
          onChange={(e) => setSeed(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && send(seed)}
          placeholder="Tell me what you're building…"
          aria-label="Tell me what you're building"
          maxLength={conciergeLimits.maxCharsPerMessage}
          className="min-w-0 flex-1 bg-transparent py-2.5 text-[16px] text-ink outline-none placeholder:text-ink-soft"
        />
        <button
          onClick={() => send(seed || "I'm not sure what I need yet.")}
          disabled={busy}
          className="rounded-[2px] bg-accent px-5 py-2.5 text-[14.5px] text-accent-on transition hover:-translate-y-px disabled:opacity-50"
        >
          Start
        </button>
      </div>

      {!open && (
        <div className="mt-3.5 flex flex-wrap gap-2">
          {PROMPTS.map((p) => (
            <button
              key={p}
              onClick={() => send(p)}
              className="rounded-full border border-line px-3.5 py-1.5 text-[13.5px] text-ink-soft transition hover:border-accent hover:text-accent-text"
            >
              {p}
            </button>
          ))}
        </div>
      )}

      {/* panel */}
      {open && (
        <div className="mt-6 max-w-[740px] overflow-hidden rounded-[3px] border border-line bg-paper-2">
          <div className="flex items-center justify-between border-b border-line px-4.5 py-3.5 text-[14px] text-ink-soft">
            <span className="display-sm text-ink">Project assistant</span>
            <button onClick={reset} className="text-[13.5px] transition hover:text-accent-text">
              Start over
            </button>
          </div>

          <div ref={logRef} className="flex max-h-[46vh] flex-col gap-4 overflow-y-auto px-4.5 py-5">
            {messages.map((m, i) =>
              m.role === "user" ? (
                <p key={i} className="max-w-[56ch] self-end rounded-[10px_10px_2px_10px] bg-[var(--wash)] px-4 py-2.5 text-[15.5px]">
                  {m.content}
                </p>
              ) : (
                <div key={i} className="max-w-[56ch] whitespace-pre-wrap text-[15.5px] leading-[1.6]">
                  {m.content}
                </div>
              )
            )}
            {busy && <p className="text-[15px] text-ink-soft">Thinking…</p>}
            {notice && (
              <p className="self-center max-w-[44ch] text-center text-[13.5px] text-ink-soft">
                {notice}{" "}
                <button
                  onClick={copyEmail}
                  title="Click to copy"
                  className="text-accent-text underline"
                >
                  {copied ? "address copied" : site.email}
                </button>
              </p>
            )}
          </div>

          {quote && (
            <div className="mx-3.5 mb-4 rounded-[3px] border border-line bg-paper p-4.5">
              <h4 className="display-sm mb-3 text-[15px]">Indicative costing</h4>
              <dl className="text-[14.5px]">
                {quote.lines.map((l) => (
                  <div key={l.title} className="flex flex-wrap justify-between gap-x-4 border-b border-line py-2 first:pt-0">
                    <dt>{l.title}</dt>
                    <dd className="text-ink-soft">
                      from {l.from} · {l.timeline}
                    </dd>
                  </div>
                ))}
                <div className="flex flex-wrap justify-between gap-x-4 pt-2.5 text-[15.5px]">
                  <dt className="display-sm">Together</dt>
                  <dd className="display-sm text-accent-text">{quote.total}</dd>
                </div>
              </dl>
              {quote.bundleNote && (
                <p className="mt-2.5 text-[13.5px] text-ink-soft">{quote.bundleNote}</p>
              )}
              {quote.budgetBelow && (
                <p className="mt-2.5 text-[13.5px] text-ink-soft">
                  This sits above the budget you mentioned. A narrower piece of
                  work done properly is the honest option — worth talking through.
                </p>
              )}
              <p className="mt-2.5 text-[13px] text-ink-soft">
                Indicative starting figures. Final scope decides the number.
                {quote.footnote ? ` ${quote.footnote}` : ""}
              </p>
            </div>
          )}

          {brief && (
            <div className="mx-3.5 mb-4 rounded-[3px] border border-accent bg-paper p-4.5">
              <h4 className="display-sm mb-3 text-[16px]">Your project brief</h4>
              <dl className="grid grid-cols-[110px_1fr] gap-x-3.5 gap-y-2 text-[14.5px]">
                <dt className="text-ink-soft">Project</dt><dd>{brief.project}</dd>
                <dt className="text-ink-soft">Scope</dt><dd>{brief.scope}</dd>
                <dt className="text-ink-soft">Approach</dt><dd>{brief.approach}</dd>
                {brief.lines?.map((l) => (
                  <Fragment key={l.title}>
                    <dt className="text-ink-soft">{l.title}</dt>
                    <dd>from {l.from} · {l.timeline}</dd>
                  </Fragment>
                ))}
                <dt className="text-ink-soft">Indicative</dt><dd>{brief.indicative}</dd>
                {brief.visitorBudget && (
                  <>
                    <dt className="text-ink-soft">Your budget</dt>
                    <dd>{brief.visitorBudget}</dd>
                  </>
                )}
                {brief.openQuestions?.length > 0 && (
                  <>
                    <dt className="text-ink-soft">Still open</dt>
                    <dd>{brief.openQuestions.join(" · ")}</dd>
                  </>
                )}
              </dl>
              <p className="mt-3.5 text-[13.5px] text-ink-soft">
                Sent to Stedan. He&apos;ll come back to you within two working days.
              </p>
            </div>
          )}

          {askingContact && !brief ? (
            <div className="mx-3.5 mb-4 rounded-[3px] border border-line bg-paper p-4.5">
              <p className="mb-3.5 text-[14px] leading-[1.55] text-ink-soft">
                Where should the brief go? Stedan reads these himself and comes
                back within two working days.
              </p>
              <div className="flex flex-col gap-2 sm:flex-row">
                <input
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  placeholder="Your name (optional)"
                  aria-label="Your name"
                  maxLength={80}
                  className="min-w-0 flex-1 rounded-[2px] border border-line bg-paper-2 px-3.5 py-2.5 text-[15px] text-ink outline-none focus:border-accent"
                />
                <input
                  value={contactEmail}
                  onChange={(e) => {
                    setContactEmail(e.target.value);
                    if (contactError) setContactError(null);
                  }}
                  onKeyDown={(e) => e.key === "Enter" && makeBrief()}
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  placeholder="Email address"
                  aria-label="Email address"
                  aria-invalid={!!contactError}
                  maxLength={120}
                  className="min-w-0 flex-1 rounded-[2px] border border-line bg-paper-2 px-3.5 py-2.5 text-[15px] text-ink outline-none focus:border-accent"
                />
              </div>
              {contactError && (
                <p className="mt-2 text-[13.5px] text-ink-soft">{contactError}</p>
              )}
              <div className="mt-3.5 flex flex-wrap items-center gap-2">
                <button
                  onClick={makeBrief}
                  disabled={busy}
                  className="rounded-[2px] bg-accent px-4.5 py-2.5 text-[14.5px] text-accent-on transition hover:-translate-y-px disabled:opacity-50"
                >
                  {busy ? "Sending…" : "Send the brief"}
                </button>
                <button
                  onClick={() => {
                    setAskingContact(false);
                    setContactError(null);
                  }}
                  className="text-[13.5px] text-ink-soft transition hover:text-accent-text"
                >
                  Not now
                </button>
              </div>
            </div>
          ) : (
            <div className="flex flex-wrap items-center gap-2 px-3.5 pb-3.5">
              <button
                onClick={() => setAskingContact(true)}
                disabled={busy || messages.length < 2 || !!brief}
                className="rounded-full border border-line px-3.5 py-2 text-[13.5px] text-ink-soft transition hover:border-accent hover:text-accent-text disabled:opacity-40"
              >
                {brief ? "Brief sent" : "Turn this into a brief"}
              </button>
              <button
                onClick={copyEmail}
                className="rounded-full border border-line px-3.5 py-2 text-[13.5px] text-ink-soft transition hover:border-accent hover:text-accent-text"
              >
                {copied ? "Address copied" : "Write to him directly"}
              </button>
              <button
                onClick={copyEmail}
                title="Click to copy"
                className="text-[13px] text-ink-soft underline decoration-line underline-offset-2 transition hover:text-accent-text"
              >
                {site.email}
              </button>
            </div>
          )}

          {atCap ? (
            <div className="border-t border-line p-3.5 text-[14px] leading-[1.55] text-ink-soft">
              That&apos;s as far as the assistant takes it. Turn the conversation into a
              brief above and it reaches me in full, or write to me directly.
            </div>
          ) : (
            <div className="flex gap-2 border-t border-line p-3.5">
              <input
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && send(draft)}
                placeholder="Type your reply…"
                aria-label="Message"
                maxLength={conciergeLimits.maxCharsPerMessage}
                className="min-w-0 flex-1 rounded-[2px] border border-line bg-paper px-3.5 py-2.5 text-[15px] text-ink outline-none focus:border-accent"
              />
              <button
                onClick={() => send(draft)}
                disabled={busy}
                className="rounded-[2px] bg-accent px-4.5 py-2.5 text-[14.5px] text-accent-on disabled:opacity-50"
              >
                Send
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
