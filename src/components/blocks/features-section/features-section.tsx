import { Orbit, ShieldCheck, Sparkles } from "lucide-react";
import { features } from "@/assets/data/features";
import { Badge } from "@/components/ui/badge";
import { ScrollStory } from "@/components/ui/scroll-story";
const icons = { orbit: Orbit, shield: ShieldCheck, sparkles: Sparkles };
export function FeaturesSection() {
  return (
    <section className="experience-section" id="experience">
      <ScrollStory>
        <div className="experience-visual">
          <div className="experience-image">
            {features.items.map((item, index) => (
              <img
                key={item.image}
                data-scene={index}
                src={item.image}
                alt={index === 0 ? features.imageAlt : ""}
                width={900}
                height={1100}
                loading="lazy"
              />
            ))}
            <div className="image-reticle" aria-hidden="true">
              +
            </div>
            <p>{features.caption}</p>
          </div>
          <div className="story-captions" aria-hidden="true">
            {features.items.map((item, index) => (
              <div key={item.title} data-scene={index}>
                <Badge variant="outline">0{index + 1} / 03</Badge>
                <span>{item.title}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="experience-copy">
          <div data-reveal>
            <p className="eyebrow">{features.eyebrow}</p>
            <h2>
              {features.title}
              <br />
              <em>{features.titleLine2}</em>
            </h2>
            <p className="section-description">{features.description}</p>
          </div>
          <div className="feature-list">
            {features.items.map((item, index) => {
              const Icon = icons[item.icon];
              return (
                <div className="story-chapter" data-chapter={index} key={item.title}>
                  <div className="feature" data-reveal>
                    <span className="feature-icon">
                      <Icon aria-hidden="true" size={21} strokeWidth={1.4} />
                    </span>
                    <div>
                      <span className="chapter-number" aria-hidden="true">
                        0{index + 1}
                      </span>
                      <h3>{item.title}</h3>
                      <p>{item.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </ScrollStory>
    </section>
  );
}
