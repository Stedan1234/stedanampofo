import React from "react";
import ServicesGrid from "../../components/ui/ServicesGrid";
import { Timeline } from "../../components/timeline";
import { WorkWithMe } from "@/app/components/workWithMe";
import Link from "next/link";
import { FaArrowRightLong } from "react-icons/fa6";


const Page = () => {
  return (
    <main className="flex-grow">
      <div className="px-[var(--page-padding-sm)] lg:px-[var(--page-padding-lg)] pt-20">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-[var(--text-color)]">
            Services
          </h1>
          <p className="text-xl opacity-90 text-[var(--text-color)]">
            I craft high-quality, custom web solutions that empower businesses
            to build a strong online presence, enhance user experiences, and
            achieve their digital goals with confidence.
          </p>
        </div>
        <ServicesGrid />
        <Timeline />
        <WorkWithMe />
        <section>
          <section className="py-16 text-center">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold mb-6 text-[var(--text-color)]">
                Let&apos;s Build Something Incredible Together!
              </h2>
              <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto text-[var(--text-color)]">
                Have an idea in mind? Let&apos;s collaborate and turn your
                vision into a reality with precision, creativity, and
                innovation.
              </p>
              <Link
                href="/contact"
                className="flex justify-center items-center gap-1 text-sm md:text-base font-medium lg:text-lg text-text dark:text-[var(--text-color)] text-center px-4 py-2 hover:bg-text hover:text-[var(--span-color)] transition-all duration-300"
              >
                Get in Touch <FaArrowRightLong />
              </Link>
            </div>
          </section>
        </section>
      </div>
    </main>
  );
};

export default Page;
