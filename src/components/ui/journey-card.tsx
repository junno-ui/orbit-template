import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Destination } from "@/types/content";

export function JourneyCard({ destination }: { destination: Destination }) {
  return (
    <Link className="journey-tile" href={`/destinations/${destination.slug}`}>
      <div className="journey-tile-image">
        <img
          src={destination.image}
          alt={destination.alt}
          width={900}
          height={700}
          loading="lazy"
        />
        <span>{destination.altitude}</span>
      </div>
      <div className="journey-tile-content">
        <p className="page-kicker">{destination.duration}</p>
        <h3>{destination.name}</h3>
        <p>{destination.description}</p>
        <span className="text-link">
          Explore the journey
          <ArrowUpRight size={18} aria-hidden="true" />
        </span>
      </div>
    </Link>
  );
}
