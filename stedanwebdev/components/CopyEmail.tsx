"use client";
import { useState } from "react";
import { site } from "@/lib/site";

/**
 * The address as selectable text plus a copy button. A bare mailto: link does
 * nothing for someone on webmail with no mail app set up; this always works.
 */
export function CopyEmail() {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(site.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard blocked: the address is on screen and selectable */
    }
  }

  return (
    <span className="inline-flex flex-wrap items-center gap-x-3 gap-y-1">
      <a href={`mailto:${site.email}`} className="text-accent-text hover:underline">
        {site.email}
      </a>
      <button
        type="button"
        onClick={copy}
        className="rounded-full border border-line px-2.5 py-0.5 text-[12.5px] text-ink-soft transition hover:border-accent hover:text-accent-text"
      >
        <span aria-live="polite">{copied ? "Copied" : "Copy"}</span>
      </button>
    </span>
  );
}
