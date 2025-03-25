"use client";
import React from "react";
import { motion } from "framer-motion";
import {
  FaLaptopCode,
  FaPencilRuler,
  FaDatabase,
  FaShoppingCart,
  FaPaintBrush,
  FaCodeBranch,
} from "react-icons/fa";

export const services = [
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

const ServicesGrid = () => {
  return (
    <div className="grid lg:grid-cols-3 grid-cols-1 gap-8 my-10">
      {services.map((service) => (
        <motion.div
          key={service.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: [20, -5, 0] }}
          transition={{ duration: 0.5, ease: [0.4, 0.0, 0.2, 1] }}
          className="flex flex-col w-full items-center bg-white shadow-md p-6 rounded-lg"
        >
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
  );
};

export default ServicesGrid;
