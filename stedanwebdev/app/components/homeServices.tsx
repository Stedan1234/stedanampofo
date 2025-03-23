import {
  FaLaptopCode,
  FaPencilRuler,
  FaDatabase,
  FaShoppingCart,
  FaPaintBrush,
  FaCodeBranch,
} from "react-icons/fa";
import { FaArrowRightLong } from "react-icons/fa6";

import { motion } from "motion/react";
import Link from "next/link";

const services = [
  {
    id: 1,
    title: "Custom Web & App Development",
    icon: <FaLaptopCode className="w-8 h-8" />,
    paragraph:
      "We build high-performance, scalable websites and applications tailored to your business needs.",
  },
  {
    id: 2,
    title: "UI/UX Design",
    icon: <FaPencilRuler className="w-8 h-8" />,
    paragraph:
      "Creating visually stunning and user-friendly designs that enhance user experience and engagement.",
  },
  {
    id: 3,
    title: "Database Management",
    icon: <FaDatabase className="w-8 h-8" />,
    paragraph:
      "Ensuring secure, efficient, and well-structured database solutions for optimal performance.",
  },
  {
    id: 4,
    title: "E-Commerce Solutions",
    icon: <FaShoppingCart className="w-8 h-8" />,
    paragraph:
      "Developing feature-rich online stores with secure payment gateways and seamless shopping experiences.",
  },
  {
    id: 5,
    title: "Branding & Logo Design",
    icon: <FaPaintBrush className="w-8 h-8" />,
    paragraph:
      "Crafting unique brand identities and eye-catching logos to make your business stand out.",
  },
  {
    id: 6,
    title: "API Integration & Development",
    icon: <FaCodeBranch className="w-8 h-8" />,
    paragraph:
      "Connecting your applications with third-party services and building robust APIs for seamless data flow.",
  },
];

const Services = () => {
  return (
    <motion.div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex justify-between">
        <div className="inline-block my-6">
          <h2 className="text-2xl font-bold">Services</h2>
          <hr className="w-full border-t-2 border-[var(--span-color)] mt-1" />
        </div>

        <Link
          href="/services"
          className="flex items-center gap-1 text-sm md:text-base font-normal lg:text-lg text-text dark:text-[var(--text-color)] text-center px-4 py-2 hover:bg-text hover:text-[var(--span-color)] transition-all duration-300"
        >
          Explore My Process <FaArrowRightLong />
        </Link>
      </div>

      {/* Services Grid */}
      <div className="grid lg:grid-cols-3 grid-cols-1 gap-8 my-10">
        {services.map((service) => (
          <motion.div
            key={service.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: [20, -5, 0] }}
            transition={{ duration: 0.5, ease: [0.4, 0.0, 0.2, 1] }}
            className="flex flex-col w-full items-center bg-white shadow-md p-6 rounded-lg"
          >
            {/* Title and Description */}
            <div className="flex flex-col text-start justify-start p-2">
              <div className="flex items-center p-2 mb-4 gap-2">
                {service.icon}
                <h2 className="text-xl font-bold mb-2">{service.title}</h2>
              </div>
              <p className="text-sm text-gray-700">{service.paragraph}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default Services;
