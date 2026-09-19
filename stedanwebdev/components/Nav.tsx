"use client";
import Link from "next/link";
import { useState } from "react";
import { Mark } from "./Mark";
import { ThemeToggle } from "./ThemeToggle";
import { flags, site } from "@/lib/site";

const links = [
  flags.work && { href: "/work", label: "Work" },
  flags.services && { href: "/services", label: "Services" },
  flags.blog && { href: "/blog", label: "Writing" },
  { href: "/about", label: "About" },
].filter(Boolean) as { href: string; label: string }[];

export function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-[color-mix(in_srgb,var(--paper)_88%,transparent)] backdrop-blur-md">
      <nav className="mx-auto flex max-w-[1120px] items-center justify-between px-[6vw] py-3.5">
        <Link href="/" className="display-sm flex items-center gap-2.5 text-[20px]">
          <Mark className="h-[30px] w-[20px] shrink-0 text-accent" />
          {site.name.replace(".", "")}
          <span className="text-accent">.</span>
        </Link>

        <div className="hidden gap-7 text-[14.5px] text-ink-soft md:flex">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="transition hover:text-accent-text">
              {l.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <Link
            href="/contact"
            className="hidden rounded-[3px] bg-accent px-4 py-2 text-[14px] text-accent-on transition hover:-translate-y-px sm:inline-block"
          >
            Start a project
          </Link>
          <button
            className="grid h-9 w-9 place-items-center rounded-full border border-line text-ink-soft md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
            aria-expanded={open}
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" stroke="currentColor" strokeWidth="1.8" fill="none">
              {open ? <path d="M5 5l14 14M19 5L5 19" /> : <path d="M4 8h16M4 16h16" />}
            </svg>
          </button>
        </div>
      </nav>

      {open && (
        <div className="border-t border-line px-[6vw] py-4 md:hidden">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block py-2.5 text-[16px]"
            >
              {l.label}
            </Link>
          ))}
          <Link href="/contact" onClick={() => setOpen(false)} className="block py-2.5 text-[16px] text-accent-text">
            Start a project
          </Link>
        </div>
      )}
    </header>
  );
}
