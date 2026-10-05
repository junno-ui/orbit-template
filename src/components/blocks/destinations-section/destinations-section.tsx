import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
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
        <Link href="/destinations" className="text-link">
          {destinations.linkLabel}
          <ArrowUpRight aria-hidden="true" size={18} />
        </Link>
      </div>
      <ScrollStack itemDistance={100} itemStackDistance={24} baseScale={0.9} itemScale={0.035}>
        {destinations.items.map((item) => (
          <ScrollStackItem key={item.id} itemClassName={`destination-${item.id}`}>
            <Link className="destination-card" href={`/destinations/${item.slug}`}>
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
            </Link>
          </ScrollStackItem>
        ))}
      </ScrollStack>
    </section>
  );
}
