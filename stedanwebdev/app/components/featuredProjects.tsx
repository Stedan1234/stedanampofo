"use client";

import Image from "next/image";
import Link from "next/link";
import { FaGithub } from "react-icons/fa";
import { FaFigma } from "react-icons/fa6";
import { RxExternalLink } from "react-icons/rx";
import { motion } from "framer-motion";

interface Project {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  stacks: string[];
  previewLink: string;
  sourceCode: string;
  previewIcon: React.ReactNode;
  codeIcon: React.ReactNode;
  previewText: string;
  codeText: string;
  status: string;
  type: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: "E-commerce Platform for Malawi Village Tea and Juice Online Shop",
    description:
      "Malawi Village is an e-commerce platform dedicated to selling high-quality, locally sourced tea and fresh juices.",
    imageUrl: "/malawi.jpg",
    stacks: ["React", "Javascript", "Tailwind CSS"],
    previewLink: "/projects/project-one",
    sourceCode: "https://github.com/username/project-one",
    previewIcon: <RxExternalLink />,
    codeIcon: <FaGithub />,
    previewText: "Preview",
    codeText: "Source Code",
    status: "In Progress",
    type: "Team Project",
  },
  {
    id: 2,
    title: "Project Two",
    description: "A brief description of Project Two.",
    imageUrl: "/malawi.jpg",
    stacks: ["Figma"],
    sourceCode: "",
    previewLink: "/projects/project-two",
    previewIcon: <RxExternalLink />,
    codeIcon: <FaFigma />,
    previewText: "Preview",
    codeText: "Source",
    status: "In Progress",
    type: "Personal Project",
  },
];

const FeaturedProjects: React.FC = () => {
  return (
    <section className="py-12 items-start px-[var(--page-padding-sm)] lg:px-[var(--page-padding-lg)] bg-[var(--background-color)]">
      <motion.div className="max-w-6xl mx-auto text-start">
        <div className="inline-block my-6">
          <h2 className="text-2xl font-bold">Featured Projects</h2>
          <hr className="w-full border-t-2 border-[var(--span-color)] mt-1" />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {projects.map((project) => (
            <motion.div
              key={project.id}
              className="card bg-[var(--background-color)] w-full shadow-sm" // Removed fixed width (w-96)
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <figure>
                <Image
                  src={project.imageUrl || "/default-image.jpg"}
                  alt={project.title || "Project image"}
                  width={600}
                  height={400}
                  className="w-full h-48 object-cover"
                  priority={project.id === 1}
                />
              </figure>
              <div className="card-body bg-[var(--background-color)] gap-4 p-4">
                {" "}
                {/* Added padding for better spacing */}
                <h2 className="card-title">{project.title}</h2>
                <div className="flex gap-2">
                  <div
                    className={`badge ${
                      project.status === "In Progress"
                        ? "bg-none text-[var(--background-color)]"
                        : "bg-green-500 text-[var(--text-color)]"
                    }`}
                  >
                    {project.status}
                  </div>
                  <div className="badge bg-[var(--span-color)] border-none">
                    {project.type}
                  </div>
                </div>
                <p>{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.stacks.map((stack) => (
                    <div
                      className="flex items-center gap-2 badge py-2 px-4 rounded-md bg-[var(--background-color)] drop-shadow-lg text-[var(--text-color)] border-none" // Adjusted padding for smaller screens
                      key={stack}
                    >
                      {stack}
                    </div>
                  ))}
                </div>
                <div className="card-actions justify-end">
                  <Link
                    href={project.previewLink}
                    className="badge"
                    aria-label={`Preview ${project.title}`}
                    title={`Preview ${project.title}`}
                  >
                    {project.previewText} {project.previewIcon}
                  </Link>
                  {project.sourceCode && (
                    <Link
                      href={project.sourceCode}
                      className="badge"
                      aria-label={`View source code for ${project.title}`}
                      title={`View source code for ${project.title}`}
                    >
                      {project.codeText} {project.codeIcon}
                    </Link>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default FeaturedProjects;
