import { ArrowUpRight } from "lucide-react";
import { destinations } from "@/assets/data/destinations";
import ScrollFloat from "@/components/motion/scroll-float";
import ScrollStack, { ScrollStackItem } from "@/components/motion/scroll-stack";
export function DestinationsSection() {
  return (
    <section className="section container" id="destinations">
      <div className="section-heading-row">
        <div className="section-heading">
          <p className="eyebrow">{destinations.eyebrow}</p>
          <ScrollFloat
            ease="power2.out"
            scrollStart="top bottom-=5%"
            scrollEnd="bottom 65%"
            stagger={0.015}
          >
            {destinations.title}
          </ScrollFloat>
          <p className="section-description">{destinations.description}</p>
        </div>
        <a href="#journeys" className="text-link">
          {destinations.linkLabel}
          <ArrowUpRight aria-hidden="true" size={18} />
        </a>
      </div>
      <ScrollStack itemDistance={100} itemStackDistance={24} baseScale={0.9} itemScale={0.035}>
        {destinations.items.map((item) => (
          <ScrollStackItem key={item.id} itemClassName={`destination-${item.id}`}>
            <a
              className="destination-card"
              href={`#journey-${item.id === "edge" ? "discover" : item.id === "orbit" ? "voyage" : "beyond"}`}
            >
              <img src={item.image} alt={item.alt} width={700} height={900} loading="lazy" />
              <div className="destination-top">
                <span>{item.category}</span>
                <span>{item.number}</span>
              </div>
              <div className="destination-content">
                <p className="destination-altitude">{item.altitude}</p>
                <h3>{item.name}</h3>
                <p className="destination-description">{item.description}</p>
                <div className="destination-bottom">
                  <span>{item.duration}</span>
                  <span className="destination-action">
                    Explore journey
                    <span className="circle-arrow">
                      <ArrowUpRight aria-hidden="true" size={19} />
                    </span>
                  </span>
                </div>
              </div>
            </a>
          </ScrollStackItem>
        ))}
      </ScrollStack>
    </section>
  );
}
