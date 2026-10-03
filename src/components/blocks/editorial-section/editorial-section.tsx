import { ArrowUpRight } from "lucide-react";
import { editorial } from "@/assets/data/editorial";
import ScrollReveal from "@/components/motion/scroll-reveal";
import ScrollExpand from "@/components/motion/scroll-expand";

export function EditorialIntro() {
  return (
    <section className="editorial-intro container" aria-label="Our perspective">
      <p className="eyebrow">{editorial.eyebrow}</p>
      <div className="intro-grid">
        <ScrollReveal as="h2" baseOpacity={0.45} wordAnimationEnd="bottom 65%">
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
    <ScrollExpand src={scene.image} alt={scene.alt} title={scene.title}>
      <p className="eyebrow">{scene.eyebrow}</p>
      <p>{scene.description}</p>
      <a className="text-link" href="#journeys">
        {scene.link}
        <ArrowUpRight size={18} aria-hidden="true" />
      </a>
    </ScrollExpand>
  );
}
