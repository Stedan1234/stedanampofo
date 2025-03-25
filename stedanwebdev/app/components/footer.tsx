import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Logo2 from "../../public/StedanLogoFooter.png";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa6";

const Footer = () => {
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
    <footer className="footer justify-start lg:justify-between md:justify-evenly px-[var(--page-padding-sm)] lg:px-[var(--page-padding-lg)] sm:footer-horizontal bg-[var(--background-color)] text-[var(--text-color)] py-10">
      <aside>
            <Link href="/" className="flex items-center justify-start">
              <Image
                src={Logo2}
                alt="Logo"
                width={200}
                height={90}
                className="lg:block object-contain"
              />
            </Link>
        <p className='text-[var(--footer-text-color)]'>
          Software Engineer | Developer | UI/UX Designer
        </p>
      </aside>
      <nav>
        <div className="grid grid-flow-col gap-4">
          {socials.map((link) => (
            <Link
              key={link.id}
              href={link.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--footer-text-color)] hover:text-[var(--span-color)] text-xl transition-all duration-300"
            >
              {link.icon}
            </Link>
          ))}
        </div>
        <p className='text-[var(--footer-text-color)]'>
          © {new Date().getFullYear()} Stedan. All rights reserved.
        </p>
        <p>Made with passion using <span className='text-[var(--span-color)]'>Next.js and TypeScript</span></p>
      </nav>
    </footer>
  );
}

export default Footer