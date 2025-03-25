import React from "react";

export function WorkWithMe() {
  const benefits = [
    "Custom-built solutions tailored to your unique needs.",
    "Modern, responsive designs for a seamless user experience.",
    "Clean, efficient, and scalable code for future growth.",
    "SEO-friendly development to maximize visibility.",
    "Ongoing support and timely updates when you need them.",
    "Clear and transparent communication throughout the process.",
  ];

  return (
    <section className="py-8">
      <div className="container mx-auto px-4">
        <div>
          <div className="inline-block my-6">
            <h2 className="text-2xl font-bold">Why Work With Me</h2>
            <hr className="w-full border-t-2 border-[var(--span-color)] mt-1" />
          </div>
          <p className="text-center text-[var(--text-color)] mb-8 font-semibold">
            Precision, Creativity, and Timeliness – The foundation of every
            project I build.
          </p>
        </div>
        <div className="max-w-3xl mx-auto">
          <div className="grid md:grid-cols-2 gap-6">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-start">
                <div className="text-accent mr-3 mt-1">
                  <svg
                    stroke="black"
                    fill="black"
                    strokeWidth="0"
                    viewBox="0 0 512 512"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z"></path>
                  </svg>
                </div>
                <p className="text-[var(--text-color)]">{benefit}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
