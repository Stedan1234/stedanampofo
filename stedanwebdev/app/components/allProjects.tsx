"use client";
import { motion } from "framer-motion";
import { FaGithub } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import { FaFigma } from "react-icons/fa6";
import { RxExternalLink } from "react-icons/rx";

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
  progress: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: "E-commerce Platform for Malawi Village Tea and Juice Online Shop",
    description:
      "Malawi Village is an e-commerce platform dedicated to selling high-quality, locally sourced tea and fresh juices.",
    imageUrl: "/MalawiMockup.png",
    stacks: ["React", "Javascript", "Tailwind CSS"],
    previewLink: "https://malawi-village.vercel.app/",
    sourceCode: "",
    previewIcon: <RxExternalLink />,
    codeIcon: <FaGithub />,
    previewText: "Preview",
    codeText: "Source Code",
    status: "Completed",
    type: "Team Project",
    progress: "100%",
  },
  {
    id: 2,
    title: "StedFit Fitness App Ui/Ux Design",
    description:
      "StedFit is a fitness app that helps users track their progress and stay motivated.",
    imageUrl: "/StedFitMockup.png",
    stacks: ["Figma"],
    sourceCode: "",
    previewLink:
      "https://www.figma.com/proto/YJnbgrLTsfJ0vIj4ZPRf3Z/StedFit?node-id=0-1&t=gKM3H0ZH1SDUthMc-1",
    previewIcon: <RxExternalLink />,
    codeIcon: <FaFigma />,
    previewText: "Preview",
    codeText: "Source",
    status: "In Progress",
    type: "Personal Project",
    progress: "25%",
  },
];

export function AllProjects() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 my-4">
      {projects.map((project) => (
        <motion.div
          key={project.id}
          className="card bg-[var(--background-color)] w-full shadow-sm drop-shadow-lg hover:drop-shadow-2xl transition-all duration-300"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <figure className="w-full h-48">
            <Image
              src={project.imageUrl || "/default-image.jpg"}
              alt={project.title || "Project image"}
              width={400}
              height={400}
              className="w-full h-48 object-contain bg-[var(--background-color)]"
              priority={project.id === 1}
            />
          </figure>
          <div className="card-body bg-[var(--background-color)] gap-4 p-4">
            {" "}
            {/* Added padding for better spacing */}
            <h2 className="card-title">{project.title}</h2>
            <div className="flex gap-2">
              <div
                className={`badge border-none ${
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
                  className="flex items-center gap-2 badge py-2 px-4 rounded-md bg-[var(--background-color)] shadow-sm drop-shadow-lg  text-[var(--text-color)] border-none" 
                  key={stack}
                >
                  {stack}
                </div>
              ))}
            </div>
            <div className="card-actions justify-end">
              <Link
                href={project.previewLink}
                target="_blank"
                className="badge py-2 px-4"
                aria-label={`Preview ${project.title}`}
                title={`Preview ${project.title}`}
              >
                {project.previewText} {project.previewIcon}
              </Link>
              {project.sourceCode && (
                <Link
                  href={project.sourceCode}
                  target="_blank"
                  className="badge py-2 px-4"
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
  );
}

export function CurrentProjects() {
  return (
    <div className="flex flex-wrap gap-4 my-4">
      {projects
        .filter((project) => project.status === "In Progress") // Filter projects with "In Progress" status
        .map((project) => (
          <motion.div
            key={project.id}
            className="card grid grid-cols-1 lg:grid-cols-2 bg-[var(--background-color)] w-full shadow-sm drop-shadow-lg hover:drop-shadow-2xl transition-all duration-300"
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
                className="w-full h-48 object-contain"
                priority={project.id === 1}
              />
            </figure>
            <div className="card-body bg-[var(--background-color)] gap-4 p-4">
              <h2 className="card-title">{project.title}</h2>

              <div className="flex gap-2">
                <div className="badge  border-none">{project.status}</div>
                <div className="badge bg-[var(--span-color)] border-none">
                  {project.type}
                </div>
              </div>

              <p>{project.description}</p>

              <div className="flex flex-wrap gap-2">
                {project.stacks.map((stack) => (
                  <div
                    className="flex items-center gap-2 badge py-2 px-4 rounded-md bg-[var(--background-color)] drop-shadow-lg text-[var(--text-color)] border-none"
                    key={stack}
                  >
                    {stack}
                  </div>
                ))}
              </div>

              {/* Project Progress Bar */}
              <div className="flex gap-1">
                <p className="flex text-sm text-[var(--text-color)]">
                  Progress:
                </p>
                <progress
                  className="progress progress-neutral bg-gray-200 w-full mt-2"
                  value={parseInt(project.progress)}
                  max="100"
                ></progress>
                <p className="flex *:text-sm text-[var(--text-color)]">
                  {project.progress}
                </p>
              </div>

              <div className="card-actions justify-end">
                <Link
                  href={project.previewLink}
                  target="_blank"
                  className="badge py-2 px-4"
                  aria-label={`Preview ${project.title}`}
                  title={`Preview ${project.title}`}
                >
                  {project.previewText} {project.previewIcon}
                </Link>
                {project.sourceCode && (
                  <Link
                    href={project.sourceCode}
                    target="_blank"
                    className="badge py-2 px-4"
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
  );
}
