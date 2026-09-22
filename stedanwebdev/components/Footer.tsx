import Link from "next/link";
import { Mark } from "./Mark";
import { flags, site } from "@/lib/site";
import Image from "next/image";

export function Footer() {
  const links = [
    flags.work && { href: "/work", label: "Work" },
    flags.services && { href: "/services", label: "Services" },
    flags.blog && { href: "/blog", label: "Writing" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ].filter(Boolean) as { href: string; label: string }[];

  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-[1120px] flex-wrap justify-between gap-8 px-[6vw] py-12">
        <div>
          <Link href="/" className="display-sm mb-3 flex items-center gap-2.5 text-[20px]">
            <Mark className="h-[30px] w-[20px] text-accent" />
            Stedan<span className="text-accent">.</span>
          </Link>
          <p className="max-w-[24em] text-[14.5px] text-ink-soft">{site.role}</p>
          <p className="mt-1 text-[14.5px] text-ink-soft">{site.location}</p>
        </div>
        <a href="https://websitelaunches.com/site/stedan.site" target="_blank" rel="noopener">
          <Image
            src="https://websitelaunches.com/badge/stedan.site.svg"
            alt="Established online - Public launch record"
            width="255"
            height="55"
          />
        </a>
        <div className="flex gap-12 text-[14.5px]">
          <div className="space-y-2">
            {links.map((l) => (
              <Link key={l.href} href={l.href} className="block text-ink-soft transition hover:text-accent-text">
                {l.label}
              </Link>
            ))}
          </div>
          <div className="space-y-2">
            <a href={site.socials.linkedin} target="_blank" rel="noopener" className="block text-ink-soft transition hover:text-accent-text">LinkedIn</a>
            <a href={site.socials.github} target="_blank" rel="noopener" className="block text-ink-soft transition hover:text-accent-text">GitHub</a>
            <a href={`mailto:${site.email}`} className="block text-ink-soft transition hover:text-accent-text">Email</a>
          </div>
        </div>
      </div>
      <div className="mx-auto max-w-[1120px] px-[6vw] pb-10 text-[13.5px] text-ink-soft">
        © {new Date().getFullYear()} {site.fullName}
      </div>
    </footer>
  );
}
