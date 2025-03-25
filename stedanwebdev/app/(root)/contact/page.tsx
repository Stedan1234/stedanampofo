import React from 'react'
import { ContactForm } from '@/app/components/contactForm'
import { FaWhatsapp } from 'react-icons/fa'

const page = () => {

  return (
    <main className="flex-grow">
      <div className="px-[var(--page-padding-sm)] lg:px-[var(--page-padding-lg)] pt-20">
                <div className="container mx-auto py-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-[var(--text-color)]">
            Contact Me
          </h1>
          <p className="text-xl opacity-90 text-[var(--text-color)]">
            Got an exciting project in mind or looking to collaborate on something amazing? Let&apos;s bring your ideas to life! Reach out—I&apos;d love to chat and explore how we can create something impactful together.
          </p>
      <div 
        className="badge text-white bg-[var(--text-color)] hover:bg-green-400 hover:text-white border-none py-4 px-8 flex items-center gap-2 my-4 group transition duration-300 cursor-pointer">
        <FaWhatsapp className="text-green-400 transition duration-300 group-hover:text-white" />
        Let&apos;s start a conversation
        </div>
        </div>
        <ContactForm/>
      </div>
    </main>
  )
}

export default page