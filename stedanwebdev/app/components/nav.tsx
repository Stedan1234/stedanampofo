"use client";
import Link from "next/link";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Logo1 from "../../public/logoLg.png";
import { CgMenu } from "react-icons/cg";
import { AiOutlineClose } from "react-icons/ai";
import classnames from "classnames";
import { usePathname } from "next/navigation";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa6";

const Nav = () => {
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [scrollDirection, setScrollDirection] = useState("up");
  const [lastScrollTop, setLastScrollTop] = useState(0);
  const pathname = usePathname();
  const mobileMenuRef = useRef(null);

  const toggleNavbar = () => {
    setMobileDrawerOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollTop = window.scrollY;
      if (currentScrollTop > lastScrollTop + 10) {
        setScrollDirection("down");
      } else if (currentScrollTop < lastScrollTop - 10) {
        setScrollDirection("up");
      }
      setLastScrollTop(currentScrollTop);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollTop]);

  const navLinks = [
    { id: 1, name: "Home", link: "/" },
    { id: 2, name: "Services", link: "/services" },
    { id: 3, name: "Projects", link: "/projects" },
    { id: 4, name: "Contact", link: "/contact" },
  ];

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
  
    return (
      <>
        {/* Navbar */}
        <nav
          className={classnames(
            "w-full bg-[var(--background-color)] shadow-md z-50 fixed top-0 left-0 transition-transform duration-300",
            {
              "-translate-y-full":
                scrollDirection === "down" && !mobileDrawerOpen,
              "translate-y-0": scrollDirection === "up" || mobileDrawerOpen,
            }
          )}
        >
          <div className="container mx-auto px-6 py-4 flex justify-between items-center">
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

            {/* Desktop Navigation */}
            <div className="hidden lg:flex gap-6">
              <ul className="flex gap-4">
                {navLinks.map((link) => (
                  <li key={link.id}>
                    <Link
                      href={link.link}
                      className={classnames(
                        "text-lg font-normal transition-all duration-300",
                        link.link === pathname
                          ? "text-[#8a2be2] font-bold"
                          : "text-[var(--text-color)] hover:text-[var(--span-color)] transition-all duration-300"
                      )}
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
              {/* Social Icons */}
              <ul className="flex gap-4">
                {socials.map((link) => (
                  <li key={link.id}>
                    <a
                      href={link.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xl text-[var(--text-color)] hover:text-[var(--span-color)] transition-all duration-300"
                    >
                      {link.icon}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Mobile Menu Button */}
            <button className="lg:hidden p-2" onClick={toggleNavbar}>
              {mobileDrawerOpen ? (
                <AiOutlineClose className="text-2xl text-[var(--text-color)]" />
              ) : (
                <CgMenu className="text-2xl text-[var(--text-color)]" />
              )}
            </button>
          </div>
        </nav>

        {/* Mobile Menu - Stays Fixed, Allows Page Scrolling */}
        <div
          ref={mobileMenuRef}
          className={classnames(
            "fixed top-[60px] left-0 w-full bg-[var(--background-color)] shadow-md transition-all duration-300 z-40 overflow-hidden",
            {
              "max-h-0 opacity-0": !mobileDrawerOpen,
              "max-h-screen opacity-100": mobileDrawerOpen,
            }
          )}
        >
          <ul className="flex flex-col items-start px-6 py-4 space-y-4">
            {navLinks.map((link) => (
              <li key={link.id}>
                <Link
                  href={link.link}
                  onClick={toggleNavbar}
                  className="text-lg font-medium text-[var(--text-color)] hover:text-[var(--span-color)] transition-all duration-300"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>

          {/* Social Icons - Shown in Mobile */}
          <div className="flex justify-start px-6 space-x-4 pb-4">
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
      </>
    );
  };
export default Nav;
