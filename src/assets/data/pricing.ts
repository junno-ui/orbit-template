import type { Journey } from "@/types/content";
export const pricing = {
  eyebrow: "03 / FIND YOUR HORIZON",
  title: "Your next chapter starts here.",
  description: "Choose your perspective. We'll help you imagine the rest.",
  note: "Illustrative packages and prices. No flights are offered for sale.",
  featuredLabel: "THE SIGNATURE EXPERIENCE",
  actionLabel: "Enquire about this journey",
  items: [
    {
      name: "Discover",
      description: "An introduction to the extraordinary.",
      price: "$125,000",
      unit: "illustrative / per explorer",
      features: [
        "The edge-of-space concept",
        "Personal preparation programme",
        "A small group of fellow explorers",
        "Your journey, beautifully documented",
      ],
    },
    {
      name: "Voyage",
      description: "A different view of everything.",
      price: "$450,000",
      unit: "illustrative / per explorer",
      featured: true,
      features: [
        "The orbital journey concept",
        "A dedicated mission concierge",
        "Extended preparation experience",
        "Private observation time",
        "A personal mission keepsake",
      ],
    },
    {
      name: "Beyond",
      description: "For a curiosity without limits.",
      price: "Let's imagine",
      unit: "a bespoke future experience",
      features: [
        "A tailored exploration concept",
        "One-to-one planning sessions",
        "Your own group of explorers",
        "Early access to future concepts",
      ],
    },
  ] satisfies Journey[],
};
