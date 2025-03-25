"use client";
import { motion } from "framer-motion";
import { AllProjects } from "@/app/components/allProjects";

const FeaturedProjects: React.FC = () => {
  return (
    <section className="py-12 items-start px-[var(--page-padding-sm)] lg:px-[var(--page-padding-lg)] bg-[var(--background-color)]">
      <motion.div className="max-w-6xl mx-auto text-start">
        <div className="inline-block my-6">
          <h2 className="text-2xl font-bold">Featured Projects</h2>
          <hr className="w-full border-t-2 border-[var(--span-color)] mt-1" />
        </div>
        <AllProjects />
      </motion.div>
    </section>
  );
};

export default FeaturedProjects;
