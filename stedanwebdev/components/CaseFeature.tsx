import Link from "next/link";
import type { Doc } from "@/lib/content";

/** The large, image-led card. Used when there are too few case studies to fill a grid. */
export function CaseFeature({ doc }: { doc: Doc }) {
  return (
    <Link
      href={`/work/${doc.slug}`}
      className="group grid overflow-hidden rounded-[3px] border border-line bg-paper-2 transition hover:border-accent md:grid-cols-[1.25fr_0.75fr]"
    >
      <div className="flex items-center overflow-hidden bg-[var(--wash)] p-[clamp(16px,3vw,40px)]">
        {doc.cover && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={doc.cover}
            alt=""
            className="block w-full rounded-[3px] border border-line shadow-[0_18px_40px_-22px_rgba(10,15,30,.45)] transition-transform duration-700 ease-[cubic-bezier(.22,.61,.36,1)] group-hover:-translate-y-1.5 group-hover:scale-[1.015]"
          />
        )}
      </div>

      <div className="flex flex-col p-[clamp(22px,3vw,36px)]">
        <div className="mb-3 flex items-center gap-2 text-[12px]">
          <span
            className={
              doc.nature === "concept"
                ? "rounded-full border border-line px-2.5 py-0.5 text-ink-soft"
                : "rounded-full bg-[var(--wash)] px-2.5 py-0.5 text-accent-text"
            }
          >
            {doc.nature === "concept" ? "Concept" : "Client work"}
          </span>
          {doc.year && <span className="text-ink-soft">{doc.year}</span>}
        </div>

        <h3 className="display text-[clamp(24px,2.9vw,34px)] leading-[1.02]">{doc.title}</h3>
        <p className="mt-3.5 text-[15.5px] text-ink-soft">{doc.summary}</p>

        {doc.stats.length > 0 && (
          <dl className="mt-6 grid grid-cols-2 gap-x-6 gap-y-4 border-t border-line pt-5">
            {doc.stats.slice(0, 2).map((s) => (
              <div key={s.label}>
                <dd className="display-sm text-[26px] leading-none">{s.value}</dd>
                <dt className="mt-1.5 text-[13px] text-ink-soft">{s.label}</dt>
              </div>
            ))}
          </dl>
        )}

        <p className="mt-auto pt-7 text-[15px] text-accent-text">
          Read the case study{" "}
          <span aria-hidden="true" className="inline-block transition-transform group-hover:translate-x-1">
            →
          </span>
        </p>
      </div>
    </Link>
  );
}
