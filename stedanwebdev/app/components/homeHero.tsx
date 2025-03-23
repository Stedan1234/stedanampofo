"use client";
import { motion } from "motion/react";
import { HeroHighlight, Highlight } from "./ui/hero-highlight";
import Link from "next/link";
import { FaArrowRightLong } from "react-icons/fa6";
import { RxExternalLink } from "react-icons/rx";


export function HomeHero() {
  return (
    <HeroHighlight className="sm:text-start">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: [20, -5, 0] }}
        transition={{ duration: 0.5, ease: [0.4, 0.0, 0.2, 1] }}
        className="text-2xl px-4 md:text-4xl lg:text-7xl font-bold text-text dark:text-[var(--text-color)] max-w-4xl leading-relaxed lg:leading-snug sm:text-left md:text-center sm:mx-0 md:mx-auto"
      >
        <p className="text-2xl lg:px-4 md:text-3xl lg:text-5xl font-bold text-text dark:text-[var(--text-color)] max-w-4xl leading-relaxed lg:leading-snug sm:text-left md:text-center sm:mx-0 md:mx-auto">
          Stedan.
        </p>
        <p className="text-2xl lg:px-4 md:text-3xl lg:text-4xl font-medium text-text dark:text-[var(--text-color)] max-w-4xl leading-relaxed lg:leading-snug sm:text-left md:text-center sm:mx-0 md:mx-auto">
          Software Engineer | Developer | UI/UX Designer
        </p>
        <p className="text-[16px] md:text-base lg:text-lg  text-text dark:text-[var(--text-color)] font-normal max-w-4xl leading-relaxed lg:leading-snug sm:text-left md:text-center sm:mx-0 md:mx-auto my-2">
          I craft visually stunning and highly functional websites and apps that
          don’t just look great but deliver real impact. With precision in
          execution, a creative touch, and a commitment to timely delivery, I
          turn ideas into seamless digital experiences that engage users and
          drive business growth.
        </p>
        <Highlight className="text-black dark:text-white text-2xl px-4 md:text-3xl lg:text-5xl font-bold sm:text-left md:text-center">
          Let&apos;s create something.
        </Highlight>
        <div className="flex sm:justify-start md:justify-center gap-6 my-4">
          <Link
            href="/contact"
            className="flex items-center gap-1 text-sm md:text-base font-medium lg:text-lg text-text dark:text-[var(--text-color)] text-center px-4 py-2 hover:bg-text hover:text-[var(--span-color)] transition-all duration-300"
          >
            Get in Touch <FaArrowRightLong />
          </Link>
          <Link
            href="/cv.pdf"
            target="_blank"
            rel="noopener noreferrer"
            download
            className="flex items-center gap-1 text-sm md:text-base lg:text-lg font-medium text-text dark:text-[var(--text-color)] text-center px-4 py-2 hover:bg-text hover:text-[var(--span-color)] transition-all duration-300"
          >
            View Resume <RxExternalLink />
          </Link>
        </div>
      </motion.h1>
    </HeroHighlight>
  );
}
