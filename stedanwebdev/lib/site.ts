/**
 * Single source of truth for site config and feature flags.
 * Flip a flag to false and the section + its nav link disappear everywhere.
 * Sections also auto-hide when they have no published content.
 */
export const site = {
  name: "Stedan.",
  fullName: "Stedan Ampofo",
  url: "https://stedanampofo.com",            // <-- change when the domain is live
  role: "Product designer, full-stack engineer, AI",
  tagline:
    "I help ambitious startups and small businesses build a brand and digital presence that matches what they're actually building.",
  location: "Accra, Ghana",
  email: "stedanampofo19@gmail.com",           // <-- swap for hello@yourdomain when ready
  socials: {
    linkedin: "https://www.linkedin.com/in/stedan-ampofo-235820230",
    github: "https://github.com/Stedan1234",
  },
  formspreeId: process.env.NEXT_PUBLIC_FORMSPREE_ID ?? "",
};

export const flags = {
  work: true,
  services: true,
  servicePricing: false,   // turn on once you've decided real numbers
  blog: true,
  concierge: false,        // the AI assistant — needs pricing first
} as const;

export const disciplines = [
  {
    title: "Product design",
    body: "Interface, flow and brand identity, designed against the constraint of what can actually be shipped.",
  },
  {
    title: "Full-stack engineering",
    body: "Next.js, React, TypeScript, Tailwind, Node and Postgres. Products that hold up after launch, not prototypes that need rewriting.",
  },
  {
    title: "AI systems",
    body: "Model-backed features built around what the product needs, and built to degrade gracefully when the model doesn't cooperate.",
  },
];

export const processSteps = [
  {
    title: "Understand what you're actually building",
    body: "Before anything gets designed we establish the product direction: who it's for, what job it does, and what success looks like. Most wasted budget comes from skipping this.",
  },
  {
    title: "Design the screens that carry the weight",
    body: "Not every screen. The three or four flows that decide whether the product works, designed properly, so the rest can follow the pattern.",
  },
  {
    title: "Build it, not a mockup of it",
    body: "Because I design and engineer, there's no handoff gap. What you approve is what gets built, in the same week rather than the next quarter.",
  },
  {
    title: "Instrument it before launch",
    body: "Analytics, conversion tracking and event definitions go in before you ship, not after. You can't improve what was never measured properly.",
  },
  {
    title: "Hand it over so you can run it",
    body: "Documentation, a CMS you can actually edit, and the reasoning behind the decisions. The goal is that you don't need me to change a headline.",
  },
];

export const faqs = [
  {
    q: "Do you work with people outside Ghana?",
    a: "Yes. Most of my work is with teams in the UK. I'm on GMT year-round, which overlaps with UK and most of Europe for a full working day.",
  },
  {
    q: "Can you do just design, or just the build?",
    a: "Yes, though the value is highest when it's both. If you already have a designer, I'll build against their files. If you have engineers, I'll design to their stack.",
  },
  {
    q: "What if I already have a product and just need AI added?",
    a: "That's a common shape. It usually starts with working out whether the feature needs a model at all, which is a shorter and cheaper conversation than most people expect.",
  },
  {
    q: "How do projects usually start?",
    a: "A short call where you describe what you're building. I'll tell you what I think it needs and whether I'm the right person for it. No deck, no pitch.",
  },
];
