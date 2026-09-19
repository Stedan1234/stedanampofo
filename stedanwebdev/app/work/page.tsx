import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CaseCard } from "@/components/CaseCard";
import { CTA } from "@/components/CTA";
import { Interlace } from "@/components/Interlace";
import { getDocs } from "@/lib/content";
import { flags } from "@/lib/site";

export const metadata: Metadata = {
  title: "Work",
  description: "Selected client work and design concepts.",
};

export default function WorkIndex() {
  if (!flags.work) notFound();
  const docs = getDocs("work");

  return (
    <>
      <section className="mx-auto max-w-[1120px] px-[6vw] pb-10 pt-[clamp(52px,7vw,90px)]">
        <h1 className="display text-[clamp(40px,7vw,86px)]">Work</h1>
        <p className="mt-5 max-w-[34em] text-[clamp(16px,1.7vw,20px)] font-light text-ink-soft">
          Client projects and self-initiated concepts. Concepts are labelled as concepts — they
          show how I think, not who paid me.
        </p>
        <Interlace className="mt-6" />
      </section>

      <section className="mx-auto max-w-[1120px] px-[6vw] pb-[clamp(48px,7vw,90px)]">
        {docs.length === 0 ? (
          <p className="text-[16px] text-ink-soft">
            Case studies are being written up. In the meantime, the fastest way to see how I work
            is to ask.
          </p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {docs.map((d) => (
              <CaseCard key={d.slug} doc={d} />
            ))}
          </div>
        )}
      </section>

      <CTA />
    </>
  );
}
