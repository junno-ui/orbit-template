import type { Link } from "@/types/content";
export const header = {
  links: [
    { label: "Destinations", href: "#destinations" },
    { label: "The experience", href: "#experience" },
    { label: "Your journey", href: "#journeys" },
  ] satisfies Link[],
  cta: { label: "Begin your journey", href: "#contact" },
  menuLabel: "Toggle navigation",
  menuDescription: "A new perspective is closer than you think.",
};
