import Link from "next/link";
import { Reveal } from "./Reveal";

export function CTA({
  heading = "Tell me what you're building and I'll tell you what it needs.",
  label = "Start a project",
}: { heading?: string; label?: string }) {
  return (
    <Reveal as="section" className="border-t border-line py-[clamp(64px,9vw,120px)]">
      <div className="mx-auto max-w-[1120px] px-[6vw]">
        <h2 className="display max-w-[13em] text-[clamp(30px,5.2vw,56px)]">{heading}</h2>
        <Link
          href="/contact"
          className="mt-8 inline-block rounded-[3px] bg-accent px-6 py-3.5 text-[15px] text-accent-on transition hover:-translate-y-0.5"
        >
          {label}
        </Link>
      </div>
    </Reveal>
  );
}
