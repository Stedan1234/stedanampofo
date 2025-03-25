import React from "react";
import { FaLocationDot } from "react-icons/fa6";
import { motion } from "framer-motion";
import Link from "next/link";
import { FaEnvelope, FaPhone } from "react-icons/fa";
import { ContactForm } from "./contactForm";

const HomeContact = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: [20, -5, 0] }}
      transition={{ duration: 0.5, ease: [0.4, 0.0, 0.2, 1] }}
      className="w-full py-6"
    >
      <div className="inline-block my-6">
        <h2 className="text-2xl font-bold text-[var(--text-color)]">
          Get in Touch
        </h2>
        <hr className="w-full border-t-2 border-[var(--span-color)] mt-1" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Contact Information */}
        <div className="flex flex-col gap-6">
          <h2 className="text-2xl font-medium text-[var(--text-color)]">
            Contact Information
          </h2>
          <p className="text-[var(--text-color)]">
            Looking to collaborate or bring an ambitious idea to life? I&apos;m
            open to freelance projects, full-time opportunities, and creative
            partnerships. Whether you need a developer or want to discuss a
            project, reach out!
          </p>
          <div className="flex flex-col gap-10">
            <p className="text-[var(--text-color)] flex items-center gap-2">
              <FaEnvelope />
              <Link
                href="mailto:explorestedan@gmail.com"
                className="hover:text-[var(--span-color)]"
              >
                explorestedan@gmail.com
              </Link>
            </p>
            <p className="text-[var(--text-color)] flex items-center gap-2">
              <FaPhone />
              <Link
                href="tel:+233592753329"
                className="hover:text-[var(--span-color)]"
              >
                +233 59 275 3329
              </Link>
            </p>
            <p className="text-[var(--text-color)] flex items-center gap-2">
              <FaLocationDot />
              <span>Accra, Ghana</span>
            </p>
          </div>
        </div>

        {/* Contact Form */}
        <ContactForm />
      </div>
    </motion.div>
  );
};

export default HomeContact;
