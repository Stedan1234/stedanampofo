"use client";
import React, { JSX } from "react";
import { RiNextjsFill, RiTailwindCssFill } from "react-icons/ri";
import { BiLogoTypescript } from "react-icons/bi";
import { GrMysql } from "react-icons/gr";
import {
  FaFigma,
  FaGitAlt,
  FaHtml5,
  FaJs,
  FaReact,
  FaGithub,
  FaCode,
  FaDatabase,
} from "react-icons/fa6";
import { FaTools, FaPencilRuler } from "react-icons/fa";
import { VscVscode } from "react-icons/vsc";
import { SiMongodb, SiPostman, SiPrisma } from "react-icons/si";
import { motion } from "framer-motion";

// Define a union type for valid categories
type CategoryKey =
  | "Frontend"
  | "DatabaseManagement"
  | "UI/UX"
  | "Methodologies";

const TechExpertise = () => {
  const stacks = [
    {
      id: 1,
      name: "Next.js",
      cat: "Frontend" as CategoryKey, // Explicitly type `cat` as `CategoryKey`
      icon: <RiNextjsFill />,
    },
    {
      id: 2,
      name: "React",
      cat: "Frontend" as CategoryKey,
      icon: <FaReact />,
    },
    {
      id: 3,
      name: "TypeScript",
      cat: "Frontend" as CategoryKey,
      icon: <BiLogoTypescript />,
    },
    {
      id: 4,
      name: "JavaScript",
      cat: "Frontend" as CategoryKey,
      icon: <FaJs />,
    },
    {
      id: 5,
      name: "MySQL",
      cat: "DatabaseManagement" as CategoryKey,
      icon: <GrMysql />,
    },
    {
      id: 6,
      name: "Prisma",
      cat: "DatabaseManagement" as CategoryKey,
      icon: <SiPrisma />,
    },
    {
      id: 7,
      name: "Git",
      cat: "Methodologies" as CategoryKey,
      icon: <FaGitAlt />,
    },
    {
      id: 8,
      name: "GitHub",
      cat: "Methodologies" as CategoryKey,
      icon: <FaGithub />,
    },
    {
      id: 9,
      name: "Postman",
      cat: "Methodologies" as CategoryKey,
      icon: <SiPostman />,
    },
    {
      id: 10,
      name: "Visual Studio Code",
      cat: "Methodologies" as CategoryKey,
      icon: <VscVscode />,
    },
    {
      id: 11,
      name: "MongoDB",
      cat: "DatabaseManagement" as CategoryKey,
      icon: <SiMongodb />,
    },
    {
      id: 12,
      name: "Tailwind CSS",
      cat: "Frontend" as CategoryKey,
      icon: <RiTailwindCssFill />,
    },
    {
      id: 13,
      name: "HTML/CSS",
      cat: "Frontend" as CategoryKey,
      icon: <FaHtml5 />,
    },
    {
      id: 14,
      name: "Figma",
      cat: "UI/UX" as CategoryKey,
      icon: <FaFigma />,
    },
  ];

  const categoryIcons: Record<CategoryKey, JSX.Element> = {
    Frontend: <FaCode />,
    DatabaseManagement: <FaDatabase />,
    "UI/UX": <FaPencilRuler />,
    Methodologies: <FaTools />,
  };

  const categoryLabels: Record<CategoryKey, string> = {
    Frontend: "Frontend Development",
    DatabaseManagement: "Database Management",
    "UI/UX": "UI/UX Design",
    Methodologies: "Tools & Methodologies",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: [20, -5, 0] }}
      transition={{ duration: 0.5, ease: [0.4, 0.0, 0.2, 1] }}
      className="w-full py-6"
    >
      <section className="w-full py-6">
        <div className="inline-block my-6">
          <h2 className="text-2xl font-bold text-[var(--text-color)]">
            Technical Expertise
          </h2>
          <hr className="w-full border-t-2 border-[var(--span-color)] mt-1" />
        </div>
        <div className="flex flex-col space-y-8">
          {(
            [
              "Frontend",
              "DatabaseManagement",
              "Methodologies",
              "UI/UX",
            ] as CategoryKey[]
          ).map((category) => (
            <div key={category} className="space-y-4">
              <h2 className="text-xl font-medium flex items-center gap-2">
                {categoryIcons[category]} {categoryLabels[category]}
              </h2>
              <div className="flex flex-wrap gap-4">
                {stacks
                  .filter((stack) => stack.cat === category)
                  .map((stack) => (
                    <motion.div
                      key={stack.id}
                      className="flex items-center gap-3 py-3 px-4 sm:py-4 sm:px-6 rounded-md text-[var(--text-color)]"
                    >
                      <div className="w-10 h-10 flex items-center justify-center text-[var(--background-color)] rounded-full bg-[var(--text-color)] shadow-md text-xl">
                        {React.cloneElement(stack.icon, {
                          "aria-label": stack.name,
                        })}
                      </div>
                      <span className="text-sm sm:text-base font-medium">
                        {stack.name}
                      </span>
                    </motion.div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </motion.div>
  );
};

export default TechExpertise;
