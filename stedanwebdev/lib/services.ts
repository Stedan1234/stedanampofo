export type Service = {
  slug: string;
  title: string;
  short: string;
  intro: string;
  forWho: string[];
  deliverables: string[];
  steps: { title: string; body: string }[];
  /** Shown only when flags.servicePricing is true. Fill in real numbers first. */
  price?: { from: string; timeline: string; note?: string };
  faqs: { q: string; a: string }[];
};

export const services: Service[] = [
  {
    slug: "brand-and-identity",
    title: "Brand and identity",
    short: "Naming direction, visual identity and the system to apply it consistently.",
    intro:
      "Most early-stage brands aren't badly designed. They're inconsistently applied — four versions of a logo, a palette nobody follows, and a tone that changes per page. The deliverable here isn't a logo. It's a system you can hand to anyone.",
    forWho: [
      "Pre-launch startups that need to look credible before they have traction",
      "Businesses whose product has outgrown the brand they started with",
      "Teams with assets but no system holding them together",
    ],
    deliverables: [
      "Positioning statement and audience definition",
      "Logo and mark in every format and orientation you'll need",
      "Colour system with functional values, tested for contrast",
      "Type scale and usage rules",
      "Application examples and a one-page guide anyone can follow",
    ],
    steps: [
      { title: "Strategy first", body: "Positioning, audience and tone documented before anything is drawn. Visual work ahead of strategy is where inconsistency comes from." },
      { title: "Direction", body: "Two or three distinct directions, presented as real applied surfaces rather than mood boards." },
      { title: "Build the system", body: "The chosen direction extended into a full system, with the functional values that make it work in production." },
      { title: "Hand over", body: "Every asset exported, a short guide, and the reasoning written down so future decisions stay consistent." },
    ],
    faqs: [
      { q: "Do I need a full identity or just a logo?", a: "If one person makes everything, a logo and two colours may be enough. The moment a second person touches the brand, you need the system." },
      { q: "Can you work with an existing brand?", a: "Yes. Often the job is resolving inconsistency rather than starting over, which is faster and cheaper." },
    ],
  },
  {
    slug: "product-design-and-build",
    title: "Product design and build",
    short: "Design and engineering in one pass, from direction through to production.",
    intro:
      "The expensive part of building software is rarely the building. It's the handoff — a designer produces screens an engineer can't build, an engineer builds something the designer didn't intend, and three weeks disappear. I do both, so that gap doesn't exist.",
    forWho: [
      "Founders going from idea to a first real version",
      "Teams with a product that works but looks like an internal tool",
      "Anyone who has a Figma file and no one to build it",
    ],
    deliverables: [
      "Product direction and flow definition",
      "Designed screens for the flows that carry the product",
      "A production build in Next.js, React and TypeScript",
      "A CMS you can edit without calling me",
      "Analytics and conversion tracking configured before launch",
    ],
    steps: [
      { title: "Understand what you're actually building", body: "Who it's for, what job it does, what success looks like. Most wasted budget comes from skipping this." },
      { title: "Design the screens that carry the weight", body: "The three or four flows that decide whether the product works. The rest follows the pattern." },
      { title: "Build it, not a mockup of it", body: "What you approve is what gets built, in the same week rather than the next quarter." },
      { title: "Instrument before launch", body: "Events, conversions and analytics defined up front. You can't improve what was never measured." },
      { title: "Hand it over", body: "Documentation, an editable CMS, and the reasoning behind the decisions." },
    ],
    faqs: [
      { q: "What if I already have a designer?", a: "Then I build against their files and we skip the design phase." },
      { q: "Will I be able to change things myself?", a: "That's the point of the handover. Content, copy and images should never require a developer." },
    ],
  },
  {
    slug: "ai-product-features",
    title: "AI product features",
    short: "Model-backed features designed around the product, not bolted onto it.",
    intro:
      "Most AI features fail for the same reason: the model was the starting point rather than the problem. The first useful thing I'll do is tell you whether your feature needs a model at all. Often it doesn't, and that's a cheaper answer than building it and finding out.",
    forWho: [
      "Products where a model could remove real user effort",
      "Teams who have tried an AI feature and found nobody uses it",
      "Founders who need the AI story to be real rather than decorative",
    ],
    deliverables: [
      "A short assessment of whether the feature warrants a model",
      "Interaction design for the feature, including the failure states",
      "Server-side implementation with the key never exposed to the browser",
      "Rate limiting, spend caps and abuse protection",
      "Evaluation approach so you can tell whether it's getting better or worse",
    ],
    steps: [
      { title: "Decide whether it needs a model", body: "Rules, search or a better default often beat a model. This step is short and sometimes ends the project, which is a good outcome." },
      { title: "Design for being wrong", body: "The design problem in AI features is what happens when the output is bad. That gets designed first, not last." },
      { title: "Build it server-side", body: "Keys stay on the server. Rate limits, turn caps and spend caps go in from the first commit, not after the first bill." },
      { title: "Measure it", body: "A way to judge output quality that isn't vibes, so the feature can be improved deliberately." },
    ],
    faqs: [
      { q: "Which models do you work with?", a: "Anthropic and OpenAI APIs mostly. The choice follows the task rather than the brand." },
      { q: "How do you stop a public AI feature running up a bill?", a: "Server-side proxy, per-user rate limits, conversation caps, short output limits and a hard spend cap on the account. All of it on day one." },
    ],
  },
];

export const getService = (slug: string) => services.find((s) => s.slug === slug);
