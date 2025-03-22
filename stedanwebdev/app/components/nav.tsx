"use client";
import Link from "next/link";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Logo1 from "../../public/logoLg.png";
import { CgMenu } from "react-icons/cg";
import { AiOutlineClose } from "react-icons/ai";
import classnames from "classnames";
import { usePathname } from "next/navigation";

const Nav = () => {
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const pathname = usePathname();
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  const toggleNavbar = () => {
    setMobileDrawerOpen(!mobileDrawerOpen);
  };

  useEffect(() => {
    if (mobileDrawerOpen) {
      document.body.style.overflow = "hidden";
      mobileMenuRef.current?.querySelector("a")?.focus();
    } else {
      document.body.style.overflow = "auto";
    }
  }, [mobileDrawerOpen]);

  const navLinks = [
    { id: 1, name: "Home", link: "/" },
    { id: 2, name: "Services", link: "/services" },
    { id: 3, name: "Projects", link: "/projects" },
    { id: 4, name: "Contact", link: "/contact" },
  ];

  return (
    <nav className="fixed top-4 z-50 w-[90%] left-1/2 transform -translate-x-1/2 py-3 backdrop-brightness-80 backdrop-blur-md rounded-full shadow-lg">
      <div className="container mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image
            src={Logo1}
            alt="Logo"
            width={200}
            height={90}
            className="lg:block object-contain"
          />
        </Link>

        {/* Desktop Nav Links */}
        <ul className="hidden lg:flex gap-8">
          {navLinks.map((link) => (
            <li key={link.id}>
              <Link
                href={link.link}
                className={classnames({
                  "text-[#8a2be2]": link.link === pathname,
                  "text-[#f5f5f5]": link.link !== pathname,
                  "hover:text-[#8a2be2] transition-colors": true,
                })}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden p-2 focus:outline-none"
          onClick={toggleNavbar}
          aria-label="Toggle Navigation Menu"
          aria-expanded={mobileDrawerOpen}
        >
          {mobileDrawerOpen ? (
            <AiOutlineClose className="text-2xl text-white" />
          ) : (
            <CgMenu className="text-2xl text-white" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        ref={mobileMenuRef}
        className={classnames(
          "lg:hidden fixed top-20 left-1/2 transform -translate-x-1/2 w-[90%] bg-black backdrop-blur-sm rounded-lg shadow-lg transition-all duration-300",
          {
            "opacity-0 translate-y-[-20px] pointer-events-none":
              !mobileDrawerOpen,
            "opacity-100 translate-y-0": mobileDrawerOpen,
          }
        )}
      >
        <ul className="flex flex-col items-center py-6 space-y-4">
          {navLinks.map((link) => (
            <li key={link.id}>
              <Link
                href={link.link}
                onClick={toggleNavbar}
                className={classnames({
                  "text-[#8a2be2]": link.link === pathname,
                  "text-[#f5f5f5]": link.link !== pathname,
                  "hover:text-[#8a2be2] transition-colors": true,
                })}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
        <div className="flex justify-center pb-6">
          <button className="text-white bg-[#8a2e2] px-6 py-2 rounded-md text-sm font-medium">
            Explore The Maps
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
