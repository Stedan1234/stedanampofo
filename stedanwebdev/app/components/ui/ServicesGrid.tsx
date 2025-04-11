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
import Image from "next/image";

export const services = [
  {
    id: 1,
    title: "Custom Web & App Development",
    image: "/development.jpg",
    icon: <FaLaptopCode className="w-8 h-8" />,
    paragraph:
      "I build high-performance, scalable websites and applications tailored to your business needs.",
  },
  {
    id: 2,
    title: "UI/UX Design",
    image: "/uiux.jpg",
    icon: <FaPencilRuler className="w-8 h-8" />,
    paragraph:
      "Creating visually stunning and user-friendly designs that enhance user experience and engagement.",
  },
  {
    id: 3,
    title: "Database Management",
    image: "/database.jpg",
    icon: <FaDatabase className="w-8 h-8" />,
    paragraph:
      "Ensuring secure, efficient, and well-structured database solutions for optimal performance.",
  },
  {
    id: 4,
    title: "E-Commerce Solutions",
    image: "/e-commerce.jpg",
    icon: <FaShoppingCart className="w-8 h-8" />,
    paragraph:
      "Developing feature-rich online stores with secure payment gateways and seamless shopping experiences.",
  },
  {
    id: 5,
    title: "Branding & Logo Design",
    image: "/branding.avif",
    icon: <FaPaintBrush className="w-8 h-8" />,
    paragraph:
      "Crafting unique brand identities and eye-catching logos to make your business stand out.",
  },
  {
    id: 6,
    title: "API Integration & Development",
    image: "/api-integration.jpg",
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
          className="card bg-[var(--background-color)] image-full flex flex-col w-full items-center shadow-md p-6 rounded-lg"
        >

<figure className="relative w-full h-48">
  <Image
    src={service.image}
    alt={service.title}
    fill
    className="object-cover opacity-35 rounded-lg"
    priority={service.id === 1}
  />
  <div className="absolute inset-0 bg-black/20 rounded-lg" />
</figure>

<div className="card-body flex flex-col text-start justify-start p-2">
  <div className="flex items-center p-2 mb-4 gap-2 text-[var(--text-color)]">
    {service.icon}
    <h2 className="text-xl font-bold mb-2 text-[var(--text-color)]">{service.title}</h2>
  </div>
  <p className="text-sm text-[var(--text-color)]">{service.paragraph}</p>
</div>
        </motion.div>
      ))}
    </div>
  );
};

export default ServicesGrid;



