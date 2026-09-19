import { Reveal } from "./Reveal";

export function Process({
  heading,
  intro,
  steps,
}: {
  heading: string;
  intro?: string;
  steps: { title: string; body: string }[];
}) {
  return (
    <Reveal as="section" className="py-[clamp(64px,9vw,120px)]">
      <div className="mx-auto grid max-w-[1120px] gap-[clamp(28px,5vw,72px)] px-[6vw] md:grid-cols-[0.9fr_1.1fr]">
        <div>
          <h2 className="display text-[clamp(30px,5vw,50px)]">{heading}</h2>
          {intro && <p className="mt-5 max-w-[26em] text-[16.5px] font-light text-ink-soft">{intro}</p>}
        </div>
        <ol className="space-y-0">
          {steps.map((s, i) => (
            <li key={s.title} className="relative border-l border-line pb-8 pl-8 last:pb-0">
              <span className="absolute -left-[13px] top-0 grid h-[26px] w-[26px] place-items-center rounded-full border border-line bg-paper text-[12px] text-accent-text">
                {i + 1}
              </span>
              <h3 className="display-sm text-[18.5px]">{s.title}</h3>
              <p className="mt-2 max-w-[38em] text-[15.5px] text-ink-soft">{s.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </Reveal>
  );
}
