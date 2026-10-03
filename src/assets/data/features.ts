import type { Feature } from "@/types/content";
export const features = {
  eyebrow: "02 / THE ORBIT EXPERIENCE",
  title: "A little further.",
  titleLine2: "A little more human.",
  description:
    "The destination is only part of the story. From your first conversation to your last look back, every detail is designed around you.",
  imageAlt: "A space explorer floating above the curve of Earth",
  caption: "A SMALL STEP. AN ENTIRELY NEW PERSPECTIVE.",
  items: [
    {
      icon: "shield",
      image: "/images/features/experience.jpg",
      title: "Confidence at every step",
      description:
        "A considered introduction to the mission, with preparation and personal guidance built into the experience.",
    },
    {
      icon: "orbit",
      image: "/images/features/earth.jpg",
      title: "Room for wonder",
      description:
        "Unhurried moments, extraordinary views, and the space to simply take it all in.",
    },
    {
      icon: "sparkles",
      image: "/images/features/orbit.jpg",
      title: "Your own kind of extraordinary",
      description:
        "Small groups and thoughtful details make a remarkable journey feel distinctly yours.",
    },
  ] satisfies Feature[],
};
