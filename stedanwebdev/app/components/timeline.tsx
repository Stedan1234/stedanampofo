import React from "react";

export function Timeline() {
  return (
    <section className="flex flex-col items-start min-h-screen">
         <div className="max-w-6xl mx-auto text-start">
      <div className="inline-block my-6">
        <h2 className="text-2xl font-bold">My Process</h2>
        <hr className="w-full border-t-2 border-[var(--span-color)] mt-1" />
      </div>
      <ul className="timeline relative timeline-snap-icon max-md:timeline-compact timeline-vertical justify-start max-w-full">
        <li>
          <div className="timeline-middle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="h-5 w-5"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="timeline-start mb-10 md:text-end">
            <time className="text-gray-500">Step 1</time>
            <div className="text-lg text-[var(--text-color)] font-medium">
              Discovery & Strategy
            </div>
            <div className="text-lg text-[var(--text-color)]">
              I begin by diving deep into your business, understanding your
              goals, audience, and unique challenges. Through in-depth
              consultations, I align with your vision to craft a digital
              experience that truly represents your brand.
            </div>
          </div>
          <hr />
        </li>
        <li>
          <hr />
          <div className="timeline-middle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="h-5 w-5"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="timeline-end md:mb-10">
            <time className="text-gray-500">Step 2</time>
            <div className="text-lg text-[var(--text-color)] font-medium">
              Planning & Roadmap
            </div>
            Together, we map out a clear development strategy with structured
            timelines, key milestones, and deliverables. This ensures a smooth
            and efficient process, keeping everything on track for a successful
            launch.
          </div>
          <hr />
        </li>
        <li>
          <hr />
          <div className="timeline-middle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="h-5 w-5"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="timeline-start mb-10 md:text-end">
            <time className="text-gray-500">Step 3</time>
            <div className="text-lg text-[var(--text-color)] font-medium">
              Design & Development
            </div>
            I design user-friendly, visually stunning, and high-performance
            websites tailored to your brand. Using the latest technologies, I
            develop scalable, responsive, and optimized solutions that provide
            seamless user experiences.
          </div>
          <hr />
        </li>
        <li>
          <hr />
          <div className="timeline-middle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="h-5 w-5"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="timeline-end md:mb-10">
            <time className="text-gray-500">Step 4</time>
            <div className="text-lg text-[var(--text-color)] font-medium">
              Testing & Deployment
            </div>
            Before launch, I conduct rigorous testing to ensure flawless
            functionality across all devices and browsers. Every element is
            fine-tuned for speed, security, and performance, so your website is
            ready to make an impact.
          </div>
          <hr />
        </li>
        <li>
          <hr />
          <div className="timeline-middle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="h-5 w-5"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="timeline-start mb-10 md:text-end">
            <time className="text-gray-500">Step 5</time>
            <div className="text-lg text-[var(--text-color)] font-medium">
              Launch, Ongoing Support & Growth
            </div>
            My work doesn&apos;t stop at launch! I offer continuous support,
            updates, and optimizations to keep your website running smoothly.
            Whether it&apos;s adding new features, improving security, or
            enhancing performance, I&apos;ve got you covered.
          </div>
        </li>
      </ul>
      </div>
    </section>
  );
}
