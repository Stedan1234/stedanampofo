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
        className="text-2xl px-4 md:text-4xl lg:text-7xl font-bold text-neutral-700 dark:text-white max-w-4xl leading-relaxed lg:leading-snug text-center mx-auto "
          >
            <h1 className="text-2xl px-4 md:text-4xl lg:text-7xl font-bold text-[#8a2be2] dark:text-white max-w-4xl leading-relaxed lg:leading-snug text-center mx-auto ">Stedan.</h1>
            <h2 className="text-2xl px-4 md:text-4xl lg:text-5xl font-bold text-neutral-700 dark:text-white max-w-4xl leading-relaxed lg:leading-snug text-center mx-auto ">Software Engineer | Developer | UI/UX Designer</h2>
        <Highlight className="text-black dark:text-white">
          Let&apos;s create something.{" "}
        </Highlight>
      </motion.h1>
    </HeroHighlight>
  );
}
