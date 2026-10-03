import ResponsiveHeroBanner from "@/components/ui/responsive-hero-banner";
import { hero } from "@/assets/data/hero";
import { Asterisk } from "lucide-react";
export function HeroSection() {
  return (
    <>
      <ResponsiveHeroBanner {...hero} />
      <div className="values-strip">
        <div className="container">
          <p className="eyebrow">{hero.partnersTitle}</p>
          <div>
            {hero.partners.map((partner) => (
              <span key={partner}>
                <Asterisk aria-hidden="true" size={20} />
                {partner}
              </span>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
