import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Reveal } from "@/components/Reveal";
import { Process } from "@/components/Process";
import { FAQ } from "@/components/FAQ";
import { CTA } from "@/components/CTA";
import { Interlace } from "@/components/Interlace";
import { getService, services } from "@/lib/services";
import { flags } from "@/lib/site";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const s = getService(slug);
  return s ? { title: s.title, description: s.short } : {};
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  if (!flags.services) notFound();
  const { slug } = await params;
  const s = getService(slug);
  if (!s) notFound();

  return (
    <>
      <section className="mx-auto max-w-[1120px] px-[6vw] pb-8 pt-[clamp(44px,6vw,80px)]">
        <Link href="/services" className="text-[14px] text-ink-soft transition hover:text-accent-text">
          ← All services
        </Link>
        <h1 className="display mt-7 max-w-[13em] text-[clamp(36px,6.4vw,72px)]">{s.title}</h1>
        <p className="mt-6 max-w-[34em] text-[clamp(16.5px,1.8vw,21px)] font-light leading-[1.5]">
          {s.intro}
        </p>
        {flags.servicePricing && s.price && (
          <p className="mt-7 inline-block rounded-[3px] border border-line bg-paper-2 px-5 py-3 text-[15px]">
            From <strong className="text-accent-text">{s.price.from}</strong> · {s.price.timeline}
            {s.price.note && <span className="text-ink-soft"> — {s.price.note}</span>}
          </p>
        )}
        <Interlace className="mt-8" />
      </section>

      <Reveal as="section" className="mx-auto max-w-[1120px] px-[6vw] py-[clamp(40px,6vw,80px)]">
        <div className="grid gap-[clamp(28px,5vw,72px)] md:grid-cols-2">
          <div>
            <h2 className="display text-[clamp(24px,3.6vw,36px)]">Who it&apos;s for</h2>
            <ul className="mt-5 space-y-3">
              {s.forWho.map((x) => (
                <li key={x} className="flex gap-3 text-[15.5px] text-ink-soft">
                  <span className="mt-[9px] h-[5px] w-[5px] shrink-0 bg-accent" />
                  {x}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="display text-[clamp(24px,3.6vw,36px)]">What you get</h2>
            <ul className="mt-5 space-y-3">
              {s.deliverables.map((x) => (
                <li key={x} className="flex gap-3 text-[15.5px] text-ink-soft">
                  <span className="mt-[9px] h-[5px] w-[5px] shrink-0 bg-accent" />
                  {x}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Reveal>

      <Process heading="How it runs" steps={s.steps} />

      <Reveal as="section" className="mx-auto max-w-[1120px] px-[6vw] py-[clamp(40px,6vw,80px)]">
        <h2 className="display mb-8 text-[clamp(26px,4.4vw,44px)]">Questions</h2>
        <FAQ items={s.faqs} />
      </Reveal>

      <CTA heading={`Thinking about ${s.title.toLowerCase()}? Tell me what you're building.`} />
    </>
  );
}
