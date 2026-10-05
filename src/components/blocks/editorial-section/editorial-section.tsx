import { ArrowUpRight } from "lucide-react";
import { editorial } from "@/assets/data/editorial";
import ScrollReveal from "@/components/motion/scroll-reveal";
import ScrollExpand from "@/components/motion/scroll-expand";

export function EditorialIntro() {
  return (
    <section className="editorial-intro container" aria-label="Our perspective">
      <p className="eyebrow">{editorial.eyebrow}</p>
      <div className="intro-grid">
        <ScrollReveal
          as="h2"
          baseOpacity={0.28}
          enableBlur
          blurStrength={2}
          wordAnimationEnd="bottom 60%"
        >
          {editorial.title}
        </ScrollReveal>
        <div className="intro-copy" data-reveal>
          <p>{editorial.description}</p>
          <a className="text-link" href="#destinations">
            {editorial.link}
            <ArrowUpRight size={18} aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}

export function CinematicBreak() {
  const scene = editorial.cinematic;
  return (
    <ScrollExpand
      src={scene.image}
      alt={scene.alt}
      title={scene.title}
      startWidth={52}
      startHeight={64}
      startRadius={28}
      mediaZoom={1.18}
      scrollDistance={0.9}
      holdDistance={0.25}
      scrollHint="Scroll to see the bigger picture"
    >
      <div>
        <p className="eyebrow">{scene.eyebrow}</p>
        <h3>{scene.heading}</h3>
      </div>
      <div className="cinematic-copy">
        <p>{scene.description}</p>
        <a className="text-link" href="#journeys">
          {scene.link}
          <ArrowUpRight size={18} aria-hidden="true" />
        </a>
      </div>
    </ScrollExpand>
  );
}
