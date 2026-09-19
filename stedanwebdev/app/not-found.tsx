import Link from "next/link";
import { Mark } from "@/components/Mark";

export default function NotFound() {
  return (
    <section className="mx-auto grid min-h-[60vh] max-w-[1120px] place-items-center px-[6vw] py-24 text-center">
      <div>
        <Mark className="mx-auto mb-8 h-[90px] w-[60px] text-accent opacity-40" />
        <h1 className="display text-[clamp(36px,6vw,64px)]">Nothing here.</h1>
        <p className="mt-4 text-[16.5px] font-light text-ink-soft">
          The page you&apos;re after doesn&apos;t exist, or it moved.
        </p>
        <Link href="/" className="mt-8 inline-block rounded-[3px] bg-accent px-6 py-3.5 text-[15px] text-accent-on">
          Back home
        </Link>
      </div>
    </section>
  );
}
