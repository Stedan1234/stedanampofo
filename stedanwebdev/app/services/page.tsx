import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Interlace } from "@/components/Interlace";
import { Reveal } from "@/components/Reveal";
import { Process } from "@/components/Process";
import { FAQ } from "@/components/FAQ";
import { CTA } from "@/components/CTA";
import { services } from "@/lib/services";
import { faqs, flags, processSteps as steps } from "@/lib/site";

export const metadata: Metadata = {
  title: "Services",
  description: "Brand and identity, product design and build, AI product features.",
};

export default function Services() {
  if (!flags.services) notFound();

  return (
    <>
      <section className="mx-auto max-w-[1120px] px-[6vw] pb-10 pt-[clamp(52px,7vw,90px)]">
        <h1 className="display text-[clamp(40px,7vw,86px)]">Services</h1>
        <p className="mt-5 max-w-[34em] text-[clamp(16px,1.7vw,20px)] font-light text-ink-soft">
          Three things, done by one person, which is the whole point. No handoff, no translation
          layer, no week lost explaining a design to the person building it.
        </p>
        <Interlace className="mt-6" />
      </section>

      <Reveal as="section" className="mx-auto max-w-[1120px] px-[6vw] pb-[clamp(40px,6vw,80px)]">
        <div className="grid gap-4 md:grid-cols-3">
          {services.map((s) => (
            <Link
              key={s.slug}
              href={`/services/${s.slug}`}
              className="flex flex-col rounded-[3px] border border-line bg-paper-2 p-7 transition hover:-translate-y-1 hover:border-accent"
            >
              <h2 className="display-sm text-[22px]">{s.title}</h2>
              <p className="mt-3 flex-1 text-[15.5px] text-ink-soft">{s.short}</p>
              {flags.servicePricing && s.price && (
                <p className="mt-5 text-[14px] text-accent-text">
                  From {s.price.from} · {s.price.timeline}
                </p>
              )}
              <span className="mt-5 text-[14px] text-accent-text">Read more →</span>
            </Link>
          ))}
        </div>
      </Reveal>

      <Process
        heading="How working together goes"
        intro="Five steps, and you can stop after any of them."
        steps={steps}
      />

      <Reveal as="section" className="mx-auto max-w-[1120px] px-[6vw] py-[clamp(48px,7vw,90px)]">
        <h2 className="display mb-8 text-[clamp(30px,5.2vw,56px)]">Frequently asked</h2>
        <FAQ items={faqs} />
      </Reveal>

      <CTA />
    </>
  );
}
