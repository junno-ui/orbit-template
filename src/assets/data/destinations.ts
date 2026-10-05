import type { Destination } from "@/types/content";
export const destinations = {
  eyebrow: "01 / BEYOND THE FAMILIAR",
  title: "Where will wonder take you?",
  description: "Three extraordinary perspectives. One planet you'll never see the same way again.",
  linkLabel: "Find your journey",
  items: [
    {
      id: "edge",
      slug: "edge-of-space",
      journey: "Discover",
      introduction:
        "Not every new perspective begins far from home. This concept journey follows the curve of our atmosphere to the place where blue gives way to black. An intimate introduction to space, imagined around the simple pleasure of looking out of the window.",
      itinerary: [
        {
          title: "Find your bearings",
          description:
            "Begin with a conversation about what draws you beyond the familiar. Explore the concept with your companions and make space for every question.",
        },
        {
          title: "Meet the horizon",
          description:
            "Imagine the ascent: coastlines becoming patterns, clouds becoming a landscape, and the sky gradually opening into something entirely new.",
        },
        {
          title: "Bring it home",
          description:
            "Return to the conversation with a different sense of scale. Reflect on the experience and the moments you would want to remember.",
        },
      ],
      number: "01",
      name: "The edge of space",
      category: "A FIRST STEP BEYOND",
      description: "Watch the blue of our atmosphere meet the infinite black beyond.",
      image: "/images/features/earth.jpg",
      alt: "The blue curve of Earth photographed from space",
      duration: "Half-day experience",
      altitude: "100 km above it all",
    },
    {
      id: "orbit",
      slug: "around-our-world",
      journey: "Voyage",
      introduction:
        "An extended perspective on the place we call home. The orbital concept makes room for unhurried observation: the changing light, familiar continents from unfamiliar angles, and the quiet connection of seeing a whole planet at once.",
      itinerary: [
        {
          title: "A shared beginning",
          description:
            "Meet your imagined crew and shape the experience together. Preparation is part of the story, with time to settle in and feel at ease.",
        },
        {
          title: "Time to simply look",
          description:
            "Move between shared observations and quiet moments at the window. Watch the atmosphere trace a thin line between Earth and space.",
        },
        {
          title: "A new sense of home",
          description:
            "Gather the details that stayed with you: a coastline, a sunrise, a light in the darkness. Make those observations the beginning of another story.",
        },
      ],
      number: "02",
      name: "Around our world",
      category: "A WHOLE NEW WORLDVIEW",
      description: "Sixteen sunrises. Unfamiliar continents. A beautiful new sense of home.",
      image: "/images/features/orbit.jpg",
      alt: "City lights across North America photographed from space",
      duration: "3-day concept journey",
      altitude: "Low Earth orbit",
    },
    {
      id: "moon",
      slug: "lunar-horizon",
      journey: "Beyond",
      introduction:
        "Some ideas begin with a question rather than a destination. The lunar horizon is our invitation to imagine what comes next: a quiet landscape, a longer journey, and an extraordinary view back toward Earth. A future concept for a curiosity without limits.",
      itinerary: [
        {
          title: "Start with a possibility",
          description:
            "Tell us what exploration means to you. Build a shared vision around the landscape, the people, and the perspective you hope to find.",
        },
        {
          title: "Imagine the unfamiliar",
          description:
            "Explore a concept shaped by the Moon's stark light and stillness. A thoughtful exercise in what it might mean to travel further.",
        },
        {
          title: "Look back together",
          description:
            "Imagine Earth hanging above a distant horizon. Let that small, luminous view shape the story you bring back.",
        },
      ],
      number: "03",
      name: "The lunar horizon",
      category: "FOR THE TRUE EXPLORER",
      description: "Follow your curiosity to the quiet, silver landscapes of our nearest neighbor.",
      image: "/images/features/moon.jpg",
      alt: "The illuminated surface of the Moon against black space",
      duration: "Future concept",
      altitude: "384,400 km from home",
    },
  ] satisfies Destination[],
};
