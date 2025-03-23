import React from "react";
import { RiNextjsFill } from "react-icons/ri";
import { BiLogoTypescript } from "react-icons/bi";
import { GrMysql } from "react-icons/gr";
import { FaGitAlt, FaHtml5 } from "react-icons/fa6";
import { VscVscode } from "react-icons/vsc";
import { SiMongodb,  SiPostman, SiPrisma } from "react-icons/si";
import { RiTailwindCssFill } from "react-icons/ri";
import { FaCode, FaDatabase, FaTools, FaJs, FaReact, FaGithub } from "react-icons/fa";
import { motion } from "motion/react";


const TechExpertise = () => {
  const stacks = [
    {
      id: 1,
      name: "Next.js",
      cat: "Frontend",
      icon: <RiNextjsFill />,
    },
    {
      id: 2,
      name: "React",
      cat: "Frontend",
      icon: <FaReact />,
    },
    {
      id: 3,
      name: "TypeScript",
      cat: "Frontend",
      icon: <BiLogoTypescript />,
    },
    {
      id: 4,
      name: "JavaScript",
      cat: "Frontend",
      icon: <FaJs />,
    },
    {
      id: 5,
      name: "MySQL",
      cat: "DatabaseManagement",
      icon: <GrMysql />,
    },
    {
      id: 6,
      name: "Prisma",
      cat: "DatabaseManagement",
      icon: <SiPrisma />,
    },
    {
      id: 7,
      name: "Git",
      cat: "Methodologies",
      icon: <FaGitAlt />,
    },
    {
      id: 8,
      name: "GitHub",
      cat: "Methodologies",
      icon: <FaGithub />,
    },
    {
      id: 9,
      name: "Postman",
      cat: "Methodologies",
      icon: <SiPostman />,
    },
    {
      id: 10,
      name: "Visual Studio Code",
      cat: "Methodologies",
      icon: <VscVscode />,
    },
    {
      id: 11,
      name: "MongoDB",
      cat: "DatabaseManagement",
      icon: <SiMongodb />,
    },
    {
      id: 12,
      name: "Tailwind CSS",
      cat: "Frontend",
      icon: <RiTailwindCssFill />,
    },
    {
      id: 13,
      name: "HTML/CSS",
      cat: "Frontend",
      icon: <FaHtml5 />,
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: [20, -5, 0] }}
      transition={{ duration: 0.5, ease: [0.4, 0.0, 0.2, 1] }}
      className="w-full p-6"
    >
    <section className="w-full p-6">
      <div className="inline-block my-6">
        <h2 className="text-2xl font-bold">Technical Expertise</h2>
        <hr className="w-full border-t-2 border-[#8a2be2] mt-1" />
      </div>
      <div className="flex flex-col space-y-8">
        {["Frontend", "DatabaseManagement", "Methodologies"].map((category) => (
          <div key={category} className="space-y-4">
            <h2 className="text-xl font-medium flex items-center gap-2">
              {category === "Frontend" ? (
                <>
                  <FaCode /> Frontend Development
                </>
              ) : category === "DatabaseManagement" ? (
                <>
                  <FaDatabase /> Database Management
                </>
              ) : (
                <>
                  <FaTools /> Tools & Methodologies
                </>
              )}
            </h2>
            <div className="flex flex-wrap gap-4">
              {stacks
                .filter((stack) => stack.cat === category)
                .map((stack) => (
                  <div
                    key={stack.id}
                    className="flex items-center gap-2 badge py-5 px-8 rounded-md bg-gray-100 drop-shadow-lg text-gray-800 border-none"
                  >
                    {stack.icon}
                    {stack.name}
                  </div>
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
