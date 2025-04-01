import React from "react";
import Breadcrumbs from "@/app/components/ui/breadCrumbs";
import { AllProjects, CurrentProjects } from "@/app/components/allProjects";
import { FaCode } from "react-icons/fa6";
import { FaClock } from "react-icons/fa";

const page = () => {
  return (
    <main className="flex-grow">
      <div className="px-[var(--page-padding-sm)] lg:px-[var(--page-padding-lg)] pt-20">
        <Breadcrumbs />
        <div className="container mx-auto pb-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-[var(--text-color)]">
            Projects
          </h1>
          <p className="text-xl opacity-90 text-[var(--text-color)]">
            Explore my latest projects—each one is a testament to innovation,
            problem-solving, and passion for great design.
          </p>
        </div>
        <section className="flex flex-col">
          <div className="flex flex-col justify-center gap-4">
            <div className="container mx-auto px-4">
              <h2 className="flex items-center justify-center gap-2 text-3xl font-bold mb-6 text-[var(--text-color)]">
                <FaClock /> Currently Working On
              </h2>
            </div>
            <CurrentProjects />
          </div>
          <div className="flex flex-col">
            <h2 className="flex items-center gap-2 text-2xl font-bold my-4 mt-10 text-[var(--text-color)]">
              <FaCode /> All Projects
            </h2>
            <AllProjects /> {/* Show all projects */}
          </div>
        </section>
      </div>
    </main>
  );
};

export default page;
