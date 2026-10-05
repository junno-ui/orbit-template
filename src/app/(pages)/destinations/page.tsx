import { destinations } from "@/assets/data/destinations";
import { JourneyCard } from "@/components/ui/journey-card";
import { PageIntro } from "@/components/ui/page-intro";
import { PageCta } from "@/components/ui/page-cta";
import { PricingSection } from "@/components/blocks/pricing-section/pricing-section";
import { pageMetadata } from "@/lib/page-metadata";

export const metadata = pageMetadata(
  "Destinations",
  "Explore three imagined journeys, from the edge of space to the lunar horizon.",
  "/destinations",
);

export default function DestinationsPage() {
  return (
    <main id="main" className="interior-page">
      <PageIntro
        eyebrow="Destinations"
        title="A different kind of far away."
        description="The edge of the atmosphere. The rhythm of an orbit. The stillness of the Moon. Three ways to imagine a perspective that stays with you."
      />
      <section className="container journey-collection" aria-label="Explore our destinations">
        {destinations.items.map((destination) => (
          <JourneyCard key={destination.id} destination={destination} />
        ))}
      </section>
      <div className="container collection-note">
        <span>Three perspectives. One shared planet.</span>
        <p>Fictional journeys, created to inspire. These experiences are not available to book.</p>
      </div>
      <PricingSection />
      <PageCta />
    </main>
  );
}
