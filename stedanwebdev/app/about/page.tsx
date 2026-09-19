import type { Metadata } from "next";
import { Interlace } from "@/components/Interlace";
import { Reveal } from "@/components/Reveal";
import { CTA } from "@/components/CTA";

export const metadata: Metadata = {
  title: "About",
  description: "Stedan Ampofo — product designer, full-stack engineer, AI. Based in Accra.",
};

const stack = [
  { label: "Design", items: "Figma, Webflow, Framer, brand identity, UI systems" },
  { label: "Engineering", items: "Next.js, React, TypeScript, Tailwind, Node, Postgres, Supabase, Prisma" },
  { label: "AI", items: "Anthropic and OpenAI APIs, retrieval, prompt design, product integration" },
  { label: "Also", items: "Analytics, conversion tracking, graphic design, video" },
];

export default function About() {
  return (
    <>
      <section className="mx-auto max-w-[1120px] px-[6vw] pb-10 pt-[clamp(52px,7vw,90px)]">
        <h1 className="display text-[clamp(40px,7vw,86px)]">About</h1>
        <Interlace className="mt-7" />
      </section>

      <Reveal as="section" className="mx-auto max-w-[1120px] px-[6vw] pb-[clamp(48px,7vw,90px)]">
        <div className="grid gap-[clamp(28px,5vw,64px)] md:grid-cols-2">
          <div className="space-y-4 text-[16.5px] font-light leading-[1.65]">
            <p>
              I&apos;m Stedan, based in Accra. I work across brand, product design and engineering,
              which started as necessity and turned into the thing I&apos;m actually good at:
              carrying an idea from positioning through to something running in production without
              losing it in a handoff.
            </p>
            <p>
              By day I&apos;m a marketing associate at Foundervine, a startup accelerator, working
              across programmes run with Barclays, NatWest and others. Alongside that I run the
              website and digital assets for New Leaf Fertility, and build my own products.
            </p>
            <p>
              I&apos;m moving deliberately toward AI engineering. Not as a label, but because the
              interesting design problems now sit in how model-backed products behave when they
              get things wrong.
            </p>
            <p>
              I work with startups and small businesses in the UK and Ghana. If you&apos;re
              building something and the brand, the product and the code keep getting handed
              between people who don&apos;t talk to each other, that&apos;s the problem I solve.
            </p>
          </div>

          <dl className="border-t border-line pt-6">
            {stack.map((s) => (
              <div key={s.label} className="mb-6 last:mb-0">
                <dt className="mb-1 text-[13px] text-ink-soft">{s.label}</dt>
                <dd className="text-[15.5px]">{s.items}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Reveal>

      <CTA />
    </>
  );
}
