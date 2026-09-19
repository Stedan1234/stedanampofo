import Link from "next/link";
import { Hero } from "@/components/Hero";
import { Interlace } from "@/components/Interlace";
import { Reveal } from "@/components/Reveal";
import { CaseCard } from "@/components/CaseCard";
import { Process } from "@/components/Process";
import { FAQ } from "@/components/FAQ";
import { CTA } from "@/components/CTA";
import { disciplines, faqs, flags, processSteps as steps } from "@/lib/site";
import { getDocs, formatDate } from "@/lib/content";


export default function Home() {
  const cases = flags.work ? getDocs("work").slice(0, 3) : [];
  const posts = flags.blog ? getDocs("blog").slice(0, 2) : [];

  return (
    <>
      <Hero />

      <div className="mx-auto max-w-[1120px] px-[6vw]">
        <Interlace />
      </div>

      {/* Disciplines */}
      <Reveal as="section" className="py-[clamp(48px,7vw,90px)]">
        <div className="mx-auto max-w-[1120px] px-[6vw]">
          <p className="mb-4 text-[13.5px] text-ink-soft">One practice, not three services</p>
          <h2 className="display max-w-[16em] text-[clamp(26px,4.2vw,44px)]">
            Most teams hand a product between a designer, an engineer and whoever handles the AI
            part. I don&apos;t hand it over.
          </h2>
          <div className="mt-10 grid border-t border-line md:grid-cols-3">
            {disciplines.map((d, i) => (
              <div
                key={d.title}
                className={`border-t border-line py-6 md:border-l md:border-t-0 md:px-7 md:py-8 ${
                  i === 0 ? "md:border-l-0 md:pl-0" : ""
                }`}
              >
                <h3 className="display-sm text-[21px]">{d.title}</h3>
                <p className="mt-2.5 text-[15.5px] text-ink-soft">{d.body}</p>
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      {/* Featured work — hidden entirely when there are no published case studies */}
      {cases.length > 0 && (
        <Reveal as="section" className="py-[clamp(48px,7vw,90px)]">
          <div className="mx-auto max-w-[1120px] px-[6vw]">
            <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
              <h2 className="display text-[clamp(30px,5.2vw,56px)]">Selected work</h2>
              <Link href="/work" className="text-[15px] text-accent-text hover:underline">
                All work
              </Link>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {cases.map((c) => (
                <CaseCard key={c.slug} doc={c} />
              ))}
            </div>
          </div>
        </Reveal>
      )}

      {flags.services && (
        <Process
          heading="How working together goes"
          intro="No deck, no discovery theatre. Five steps, and you can stop after any of them."
          steps={steps}
        />
      )}

      {/* Recent writing — hidden when there are no published posts */}
      {posts.length > 0 && (
        <Reveal as="section" className="py-[clamp(48px,7vw,90px)]">
          <div className="mx-auto max-w-[1120px] px-[6vw]">
            <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
              <h2 className="display text-[clamp(30px,5.2vw,56px)]">Recent writing</h2>
              <Link href="/blog" className="text-[15px] text-accent-text hover:underline">
                All writing
              </Link>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {posts.map((p) => (
                <Link
                  key={p.slug}
                  href={`/blog/${p.slug}`}
                  className="rounded-[3px] border border-line bg-paper-2 p-6 transition hover:-translate-y-1 hover:border-accent"
                >
                  <p className="text-[13px] text-ink-soft">{formatDate(p.date)}</p>
                  <h3 className="display-sm mt-2 text-[20px]">{p.title}</h3>
                  <p className="mt-2 text-[15px] text-ink-soft">{p.summary}</p>
                </Link>
              ))}
            </div>
          </div>
        </Reveal>
      )}

      <Reveal as="section" className="py-[clamp(48px,7vw,90px)]">
        <div className="mx-auto max-w-[1120px] px-[6vw]">
          <h2 className="display mb-8 text-[clamp(30px,5.2vw,56px)]">Frequently asked</h2>
          <FAQ items={faqs} />
        </div>
      </Reveal>

      <CTA />
    </>
  );
}
