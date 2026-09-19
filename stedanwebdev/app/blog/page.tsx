import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Interlace } from "@/components/Interlace";
import { CTA } from "@/components/CTA";
import { formatDate, getDocs } from "@/lib/content";
import { flags } from "@/lib/site";

export const metadata: Metadata = {
  title: "Writing",
  description: "Notes on design, engineering and building AI-backed products.",
};

export default function Blog() {
  if (!flags.blog) notFound();
  const posts = getDocs("blog");

  return (
    <>
      <section className="mx-auto max-w-[1120px] px-[6vw] pb-10 pt-[clamp(52px,7vw,90px)]">
        <h1 className="display text-[clamp(40px,7vw,86px)]">Writing</h1>
        <p className="mt-5 max-w-[34em] text-[clamp(16px,1.7vw,20px)] font-light text-ink-soft">
          Notes on design decisions, engineering trade-offs and what actually happens when you put
          a model inside a product.
        </p>
        <Interlace className="mt-6" />
      </section>

      <section className="mx-auto max-w-[1120px] px-[6vw] pb-[clamp(48px,7vw,90px)]">
        {posts.length === 0 ? (
          <p className="text-[16px] text-ink-soft">First posts are on the way.</p>
        ) : (
          <div className="border-t border-line">
            {posts.map((p) => (
              <Link
                key={p.slug}
                href={`/blog/${p.slug}`}
                className="group grid gap-2 border-b border-line py-7 transition-[padding] hover:pl-4 md:grid-cols-[150px_1fr]"
              >
                <p className="pt-1 text-[13.5px] text-ink-soft">{formatDate(p.date)}</p>
                <div>
                  <h2 className="display-sm text-[clamp(20px,3vw,28px)] transition group-hover:text-accent-text">
                    {p.title}
                  </h2>
                  <p className="mt-2 max-w-[44em] text-[15.5px] text-ink-soft">{p.summary}</p>
                  {p.tags.length > 0 && (
                    <p className="mt-3 text-[13px] text-accent-text">{p.tags.join(" · ")}</p>
                  )}
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      <CTA />
    </>
  );
}
