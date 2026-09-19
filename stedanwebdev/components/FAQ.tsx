"use client";
import { useState } from "react";

export function FAQ({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="border-t border-line">
      {items.map((item, i) => (
        <div key={item.q} className="border-b border-line">
          <button
            className="flex w-full items-start justify-between gap-6 py-5 text-left"
            onClick={() => setOpen(open === i ? null : i)}
            aria-expanded={open === i}
          >
            <span className="display-sm text-[clamp(17px,2.2vw,21px)]">{item.q}</span>
            <span className="mt-1 shrink-0 text-accent transition-transform" style={{ transform: open === i ? "rotate(45deg)" : "none" }}>
              <svg viewBox="0 0 24 24" className="h-4 w-4" stroke="currentColor" strokeWidth="1.8" fill="none">
                <path d="M12 5v14M5 12h14" strokeLinecap="round" />
              </svg>
            </span>
          </button>
          {open === i && <p className="max-w-[52em] pb-6 text-[15.5px] text-ink-soft">{item.a}</p>}
        </div>
      ))}
    </div>
  );
}
