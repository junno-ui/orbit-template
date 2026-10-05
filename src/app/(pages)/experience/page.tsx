import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PageIntro } from "@/components/ui/page-intro";
import { PageCta } from "@/components/ui/page-cta";
import { FaqSection } from "@/components/blocks/faq-section/faq-section";
import { pageMetadata } from "@/lib/page-metadata";

export const metadata = pageMetadata(
  "The experience",
  "From first curiosity to a new perspective. Explore the thought behind an Orbit journey.",
  "/experience",
);
const chapters = [
  {
    title: "It begins with you.",
    label: "Before the journey",
    image: "/images/features/experience.jpg",
    alt: "An astronaut above the curve of Earth",
    copy: "What would you want to see? Who would you share it with? We imagine the experience beginning with those questions, and with the time to answer them in your own way.",
    detail:
      "Personal conversations, shared preparation, and thoughtful details make the unfamiliar feel a little closer.",
  },
  {
    title: "Room for the extraordinary.",
    label: "Along the way",
    image: "/images/features/earth.jpg",
    alt: "Earth seen against the darkness of space",
    copy: "There is no rush to fill every moment. The view is enough. A coastline passes, the light changes, and familiar things begin to feel extraordinary again.",
    detail:
      "Our imagined journeys balance shared experiences with private observation and space to reflect.",
  },
  {
    title: "Something stays with you.",
    label: "Looking back",
    image: "/images/features/orbit.jpg",
    alt: "The illuminated cities of Earth at night",
    copy: "The most meaningful part of a journey is often what follows it. A conversation you return to. A photograph you see differently. A deeper connection to the place you call home.",
    detail: "The journey becomes a story, and the story becomes part of how you see the world.",
  },
];

export default function ExperiencePage() {
  return (
    <main id="main" className="interior-page">
      <PageIntro
        eyebrow="The experience"
        title="A little further. A little more human."
        description="The destination is only part of the story. We imagine a different approach to exploration: personal, unhurried, and full of wonder."
      />
      <div className="container experience-chapters">
        {chapters.map((chapter, index) => (
          <section className="experience-chapter" key={chapter.title}>
            <div className="chapter-image">
              <img
                src={chapter.image}
                alt={chapter.alt}
                width={900}
                height={900}
                loading={index === 0 ? "eager" : "lazy"}
              />
              <span aria-hidden="true">0{index + 1}</span>
            </div>
            <div className="chapter-copy" data-reveal>
              <p className="page-kicker">{chapter.label}</p>
              <h2>{chapter.title}</h2>
              <p className="lead-copy">{chapter.copy}</p>
              <p>{chapter.detail}</p>
              <Link href="/destinations" className="text-link">
                Find your perspective
                <ArrowUpRight size={18} aria-hidden="true" />
              </Link>
            </div>
          </section>
        ))}
      </div>
      <FaqSection />
      <PageCta />
    </main>
  );
}
