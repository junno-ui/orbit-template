import { ArrowDown, ArrowRight, MoveUpRight } from "lucide-react";
import { Badge } from "./badge";
import { Button } from "./button";
import type { hero } from "@/assets/data/hero";
import { HeroVideo } from "./hero-video";
export type ResponsiveHeroBannerProps = typeof hero;
/** Supplied hero adapted to shadcn/ui; navigation lives in the layout. */
export default function ResponsiveHeroBanner(props: ResponsiveHeroBannerProps) {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <HeroVideo src={props.videoUrl} poster={props.backgroundImageUrl} />
      <div className="hero-shade" />
      <div className="hero-content container">
        <div className="hero-badge hero-enter">
          <Badge variant="outline" className="badge">
            <span className="status-dot" />
            {props.badgeLabel}
          </Badge>
          <span>{props.badgeText}</span>
        </div>
        <h1 id="hero-title" className="hero-enter">
          {props.title}
          <br />
          <em>{props.titleLine2}</em>
        </h1>
        <p className="hero-description hero-enter">{props.description}</p>
        <div className="hero-actions hero-enter">
          <Button asChild>
            <a href={props.primaryButtonHref}>
              {props.primaryButtonText}
              <ArrowRight size={17} aria-hidden="true" />
            </a>
          </Button>
          <Button asChild variant="ghost">
            <a href={props.secondaryButtonHref}>
              {props.secondaryButtonText}
              <MoveUpRight size={16} aria-hidden="true" />
            </a>
          </Button>
        </div>
      </div>
      <div className="hero-bottom container">
        <div>
          <p className="coordinates">{props.coordinates}</p>
          <p>{props.location}</p>
        </div>
        <a href="#destinations" className="scroll-cue">
          <ArrowDown aria-hidden="true" size={17} />
          {props.scrollLabel}
        </a>
        <p className="edition">{props.edition}</p>
      </div>
    </section>
  );
}
