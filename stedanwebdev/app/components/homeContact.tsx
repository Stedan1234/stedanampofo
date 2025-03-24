import React, { useEffect, useState } from "react";
import { useForm, ValidationError } from "@formspree/react";
import { FaEnvelope, FaTelegramPlane, FaPhone } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { motion } from "framer-motion";
import Link from "next/link";

const HomeContact = () => {
  const [state, handleSubmit] = useForm("myzejzew");
  const [isSuccess, setIsSuccess] = useState(false);

  // ✅ Move setIsSuccess into useEffect
  useEffect(() => {
    if (state.succeeded) {
      setIsSuccess(true);
    }
  }, [state.succeeded]);

  // ✅ Delay reload after success message
  useEffect(() => {
    if (isSuccess) {
      const timer = setTimeout(() => {
        window.location.reload();
      }, 3000); // Refresh after 3 seconds

      return () => clearTimeout(timer); // Cleanup function
    }
  }, [isSuccess]);

  return isSuccess ? (
    <p className="text-green-500 font-bold">
      Message has been sent successfully! Refreshing...
    </p>
  ) : (
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
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <h2 className="text-2xl font-medium">Send Me a Message</h2>

          <label htmlFor="name" className="font-medium">
            Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[var(--span-color)] focus:border-transparent"
          />
          <ValidationError prefix="Name" field="name" errors={state.errors} />

          <label htmlFor="email" className="font-medium">
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[var(--span-color)] focus:border-transparent"
          />
          <ValidationError prefix="Email" field="email" errors={state.errors} />

          <label htmlFor="message" className="font-medium">
            Message
          </label>
          <textarea
            name="message"
            id="message"
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[var(--span-color)] focus:border-transparent"
          ></textarea>
          <ValidationError
            prefix="Message"
            field="message"
            errors={state.errors}
          />

          <button
            type="submit"
            disabled={state.submitting}
            className="flex items-center justify-center gap-1 px-4 py-2 text-[var(--text-color)] hover:text-[var(--span-color)] rounded-md hover:bg-text transition-all duration-300"
          >
            Send Message <FaTelegramPlane />
          </button>
        </form>
      </div>
    </motion.div>
  );
};

export default HomeContact;
