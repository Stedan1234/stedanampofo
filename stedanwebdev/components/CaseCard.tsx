import Link from "next/link";
import type { Doc } from "@/lib/content";

export function CaseCard({ doc }: { doc: Doc }) {
  return (
    <Link
      href={`/work/${doc.slug}`}
      className="group flex flex-col rounded-[3px] border border-line bg-paper-2 p-6 transition hover:-translate-y-1 hover:border-accent"
    >
      <div className="mb-5 grid h-[150px] place-items-center overflow-hidden rounded-[2px] bg-[var(--wash)]">
        {doc.cover ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={doc.cover} alt="" className="h-full w-full object-cover" />
        ) : (
          <svg viewBox="0 0 200 120" className="h-[58%] w-[58%] text-accent opacity-50" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="18" y="18" width="164" height="26" />
            <rect x="18" y="56" width="74" height="46" />
            <rect x="104" y="56" width="78" height="20" />
            <rect x="104" y="84" width="52" height="18" />
          </svg>
        )}
      </div>

      <div className="mb-2.5 flex items-center gap-2 text-[12px]">
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

      <h3 className="display-sm text-[21px]">{doc.title}</h3>
      <p className="mt-2 flex-1 text-[15px] text-ink-soft">{doc.summary}</p>
      {doc.tags.length > 0 && (
        <p className="mt-4 text-[13px] text-accent-text">{doc.tags.join(" · ")}</p>
      )}
    </Link>
  );
}
