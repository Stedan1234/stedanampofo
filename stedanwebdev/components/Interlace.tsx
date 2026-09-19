"use client";
import { useEffect, useRef } from "react";

/** The woven line. Draws in proportion to scroll position. */
export function Interlace({ className = "" }: { className?: string }) {
  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = ref.current;
    if (!svg) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      svg.querySelectorAll("path").forEach((p) => (p.style.strokeDashoffset = "0"));
      return;
    }
    const paths = Array.from(svg.querySelectorAll("path"));
    const lens = paths.map((p) => {
      const l = p.getTotalLength();
      p.style.strokeDasharray = String(l);
      p.style.strokeDashoffset = String(l);
      return l;
    });

    const draw = () => {
      const r = svg.getBoundingClientRect();
      if (!r.height) return;
      const vh = window.innerHeight;
      const start = vh * 0.92;
      const end = vh * 0.34;
      let p = (start - r.top) / Math.max(start - end + r.height, 1);
      p = Math.max(0, Math.min(1, p));
      paths.forEach((el, i) => (el.style.strokeDashoffset = String(lens[i] * (1 - p))));
    };

    const onScroll = () => requestAnimationFrame(draw);
    draw();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <svg
      ref={ref}
      viewBox="0 0 1000 130"
      preserveAspectRatio="none"
      aria-hidden="true"
      className={`block w-full h-[clamp(80px,10vw,130px)] overflow-visible text-accent ${className}`}
    >
      <path
        d="M0 65 C 150 5, 230 125, 375 65 S 600 5, 745 65 S 900 125, 1000 65"
        fill="none"
        stroke="var(--ink)"
        strokeWidth="1.7"
        strokeLinecap="round"
        opacity="0.14"
      />
      <path
        d="M0 65 C 150 125, 230 5, 375 65 S 600 125, 745 65 S 900 5, 1000 65"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}
