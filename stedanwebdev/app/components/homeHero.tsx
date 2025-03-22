"use client";
import { motion } from "motion/react";
import { HeroHighlight, Highlight } from "./ui/hero-highlight";

export function HomeHero() {
  return (
    <HeroHighlight>
      <motion.h1
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: 1,
          y: [20, -5, 0],
        }}
        transition={{
          duration: 0.5,
          ease: [0.4, 0.0, 0.2, 1],
        }}
        className="text-2xl px-4 md:text-4xl lg:text-7xl font-bold text-text dark:text-[#2e2e2e] max-w-4xl leading-relaxed lg:leading-snug text-center mx-auto "
      >
        <p className="text-2xl px-4 md:text-4xl lg:text-7xl font-bold text-text dark:text-[#2e2e2e] max-w-4xl leading-relaxed lg:leading-snug text-center mx-auto ">
          Stedan.
        </p>
        <p className="text-2xl px-4 md:text-4xl lg:text-5xl font-bold text-text dark:text-[#2e2e2e] max-w-4xl leading-relaxed lg:leading-snug text-center mx-auto ">
          Software Engineer | Developer | UI/UX Designer
        </p>
        <Highlight className="text-black dark:text-white">
          Let&apos;s create something.{" "}
        </Highlight>
      </motion.h1>
    </HeroHighlight>
  );
}
