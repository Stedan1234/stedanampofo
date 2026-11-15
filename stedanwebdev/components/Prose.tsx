"use client";
import { useEffect, useState } from "react";

/** Rendered Markdown. Any image in it opens full-size on click. */
export function Prose({ html }: { html: string }) {
  const [open, setOpen] = useState<{ src: string; alt: string } | null>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(null);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <div
        className="prose-s"
        onClick={(e) => {
          const t = e.target as HTMLElement;
          if (t instanceof HTMLImageElement) setOpen({ src: t.src, alt: t.alt });
        }}
        dangerouslySetInnerHTML={{ __html: html }}
      />
      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={open.alt || "Image"}
          onClick={() => setOpen(null)}
          className="lightbox fixed inset-0 z-[60] grid cursor-zoom-out place-items-center bg-[color-mix(in_srgb,var(--ink)_82%,transparent)] p-[3vw] backdrop-blur-sm"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={open.src} alt={open.alt} className="max-h-full max-w-full rounded-[4px] shadow-2xl" />
          <button
            autoFocus
            aria-label="Close"
            className="absolute right-5 top-5 grid h-10 w-10 place-items-center rounded-full bg-paper text-ink"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" stroke="currentColor" strokeWidth="1.8" fill="none">
              <path d="M5 5l14 14M19 5L5 19" />
            </svg>
          </button>
        </div>
      )}
    </>
  );
}
