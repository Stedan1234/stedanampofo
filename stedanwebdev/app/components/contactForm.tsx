"use client";
import { useForm, ValidationError } from "@formspree/react";
import { FaTelegramPlane } from "react-icons/fa";
import { useEffect, useState } from "react";
import { FaLocationDot } from "react-icons/fa6";
import Link from "next/link";
import { FaEnvelope, FaPhone } from "react-icons/fa";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa6";
import { motion } from "framer-motion";
export function ContactForm() {
  const [state, handleSubmit] = useForm("myzejzew");
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (state.succeeded) {
      setIsSuccess(true);
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    }
  }, [state.succeeded]);

      const socials = [
      { id: 1, icon: <FaGithub />, link: "https://www.github.com/Stedan1234" },
      {
        id: 2,
        icon: <FaLinkedin />,
        link: "https://www.linkedin.com/in/stedan-ampofo-235820230",
      },
      {
        id: 3,
        icon: <FaInstagram />,
        link: "https://www.instagram.com/stedan.webdev/#",
      },
    ];



  return isSuccess ? (
    <p className="text-green-500 font-bold">
      Message has been sent successfully! Refreshing...
    </p>
  ) : (
    <section className="grid grid-cols-1 lg:grid-cols-2 min-h-screen gap-10">
      <div className="flex flex-col gap-6">
        {/* Contact Information */}
        <div className="flex flex-col gap-8">
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
        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-medium text-[var(--text-color)]">
            Connect with me
          </h2>

          <div className="flex justify-start space-x-4 pb-4">
            {socials.map((link) => (
              <a
                key={link.id}
                href={link.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--text-color)] hover:text-[var(--span-color)] text-xl transition-all duration-300"
              >
                {link.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
      <motion.form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
          className="flex items-center justify-center gap-1 px-4 py-2 text-[var(--text-color)] hover:text-[var(--span-color)] rounded-md hover:bg-text transition-all duration-300 cursor-pointer"
        >
          Send Message <FaTelegramPlane />
        </button>
      </motion.form>
    </section>
  );
}
