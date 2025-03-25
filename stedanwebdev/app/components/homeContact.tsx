import React from "react";
import { motion } from "framer-motion";
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


        {/* Contact Form */}
        <ContactForm />
    </motion.div>
  );
};

export default HomeContact;
