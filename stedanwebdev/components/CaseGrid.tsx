import type { Doc } from "@/lib/content";
import { CaseCard } from "./CaseCard";
import { CaseFeature } from "./CaseFeature";

/**
 * Up to two case studies get the large image-led treatment, so the section
 * never looks like a grid with holes in it. Three or more fall back to cards.
 */
export function CaseGrid({ docs }: { docs: Doc[] }) {
  if (docs.length < 3) {
    return (
      <div className="grid gap-4">
        {docs.map((d) => (
          <CaseFeature key={d.slug} doc={d} />
        ))}
      </div>
    );
  }
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {docs.map((d) => (
        <CaseCard key={d.slug} doc={d} />
      ))}
    </div>
  );
}
