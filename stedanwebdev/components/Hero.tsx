import Link from "next/link";
import { Mark } from "./Mark";
import { Concierge } from "./Concierge";
import { flags, site } from "@/lib/site";

export function Hero() {
  return (
    <header className="mx-auto max-w-[1120px] px-[6vw] pb-[clamp(30px,4vw,56px)] pt-[clamp(52px,7vw,96px)]">
      <div className="grid items-center gap-[clamp(24px,5vw,64px)] md:grid-cols-[1.3fr_0.7fr]">
        <div className="order-2 md:order-1">
          {site.availability && (
            <p className="rise mb-6 inline-flex items-center gap-2.5 rounded-full border border-line py-1.5 pl-3 pr-4 text-[13.5px] text-ink-soft">
              <span className="status-dot is-live" aria-hidden="true" />
              {site.availability}
            </p>
          )}
          <h1 className="display hero-lines text-[clamp(44px,8.6vw,106px)]">
            <span>design.</span>
            <span>build.</span>
            <span>
              make it<span className="text-accent">.</span>
            </span>
          </h1>
          <p className="mt-6 max-w-[25em] text-[clamp(16.5px,1.8vw,21px)] font-light leading-[1.5]">
            {site.tagline}
          </p>
          <div className="mt-7 flex flex-wrap gap-x-6 gap-y-2 text-[14px] text-ink-soft">
            <span>Product design</span>
            <span>Full-stack engineering</span>
            <span>AI systems</span>
            <span>Accra, working with UK teams</span>
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/contact" className="rounded-[3px] bg-accent px-6 py-3.5 text-[15px] text-accent-on transition hover:-translate-y-0.5">
              Start a project
            </Link>
            <Link href="/work" className="rounded-[3px] border border-line px-6 py-3.5 text-[15px] transition hover:border-accent hover:text-accent-text">
              See selected work
            </Link>
          </div>
        </div>
        <div className="order-1 md:order-2">
          <Mark draw className="ml-auto block w-full max-w-[110px] text-accent md:max-w-[230px]" />
        </div>
      </div>

      {flags.concierge && (
        <div id="concierge">
          <Concierge />
        </div>
      )}
    </header>
  );
}
