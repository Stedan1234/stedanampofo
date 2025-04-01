"use client";
import { motion } from "framer-motion";
import { AllProjects } from "@/app/components/allProjects";
import Link from "next/link";
import { FaArrowRightLong } from "react-icons/fa6";

const FeaturedProjects: React.FC = () => {
  return (
    <section className="py-12 items-start px-[var(--page-padding-sm)] lg:px-[var(--page-padding-lg)] bg-[var(--background-color)]">
      <motion.div className="max-w-6xl mx-auto text-start">
        <div className="flex justify-between">
          <div className="inline-block my-6">
            <h2 className="text-2xl font-bold">Featured Projects</h2>
            <hr className="w-full border-t-2 border-[var(--span-color)] mt-1" />
          </div>
          <Link
            href="/projects"
            className="flex items-center gap-1 text-sm md:text-base font-normal lg:text-lg text-text dark:text-[var(--text-color)] text-center px-4 py-2 hover:bg-text hover:text-[var(--span-color)] transition-all duration-300"
          >
            View All <FaArrowRightLong />
          </Link>
        </div>
        <AllProjects limit={2} /> {/* Show only first two projects */}
      </motion.div>
    </section>
  );
};

export default FeaturedProjects;
