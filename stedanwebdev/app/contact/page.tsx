import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { Interlace } from "@/components/Interlace";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Tell me what you're building.",
};

export default function Contact() {
  return (
    <section className="mx-auto max-w-[1120px] px-[6vw] pb-[clamp(64px,9vw,120px)] pt-[clamp(52px,7vw,90px)]">
      <h1 className="display max-w-[12em] text-[clamp(36px,6.4vw,72px)]">
        Tell me what you&apos;re building.
      </h1>
      <p className="mt-5 max-w-[32em] text-[clamp(16px,1.7vw,20px)] font-light text-ink-soft">
        A sentence is enough to start. I&apos;ll reply within two working days, and if I&apos;m not
        the right person I&apos;ll say so.
      </p>
      <Interlace className="mt-7" />

      <div className="mt-10 grid gap-[clamp(28px,5vw,64px)] md:grid-cols-[1.1fr_0.9fr]">
        <ContactForm />
        <div className="border-t border-line pt-6 text-[15.5px]">
          <p className="mb-1 text-[13px] text-ink-soft">Email</p>
          <a href={`mailto:${site.email}`} className="text-accent-text hover:underline">{site.email}</a>
          <p className="mb-1 mt-6 text-[13px] text-ink-soft">Elsewhere</p>
          <a href={site.socials.linkedin} target="_blank" rel="noopener" className="block hover:text-accent-text">LinkedIn</a>
          <a href={site.socials.github} target="_blank" rel="noopener" className="block hover:text-accent-text">GitHub</a>
          <p className="mb-1 mt-6 text-[13px] text-ink-soft">Based in</p>
          <p>{site.location} — GMT, all year</p>
        </div>
      </div>
    </section>
  );
}
