import Link from "next/link";
import { Reveal } from "./Reveal";
import { bench } from "@/lib/site";

/** What's being built right now. Hidden when the list in lib/site.ts is empty. */
export function Bench() {
  if (bench.length === 0) return null;
  return (
    <Reveal as="section" className="py-[clamp(48px,7vw,90px)]">
      <div className="mx-auto max-w-[1120px] px-[6vw]">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <h2 className="display text-[clamp(30px,5.2vw,56px)]">On the bench</h2>
          <p className="max-w-[24em] text-[15px] text-ink-soft">
            What I&apos;m building when I&apos;m not building for someone else.
          </p>
        </div>
        <ul className="border-t border-line">
          {bench.map((b) => {
            const row = (
              <div className="grid gap-x-8 gap-y-2 py-6 md:grid-cols-[0.8fr_1.6fr_auto] md:items-baseline">
                <h3 className="display-sm text-[21px] transition-colors group-hover:text-accent-text">
                  {b.title}
                </h3>
                <p className="max-w-[40em] text-[15.5px] text-ink-soft">{b.body}</p>
                <p className="flex items-center gap-2 text-[13px] text-ink-soft md:justify-end">
                  <span className={`status-dot ${b.live ? "is-live" : ""}`} aria-hidden="true" />
                  {b.status}
                </p>
              </div>
            );
            return (
              <li key={b.title} className="border-b border-line">
                {b.href ? (
                  <Link href={b.href} className="group block">
                    {row}
                  </Link>
                ) : (
                  <div className="group">{row}</div>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </Reveal>
  );
}
