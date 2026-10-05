import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight, Check } from "lucide-react";
import { destinations } from "@/assets/data/destinations";
import { pricing } from "@/assets/data/pricing";
import { Button } from "@/components/ui/button";
import { JourneyCard } from "@/components/ui/journey-card";
import { pageMetadata } from "@/lib/page-metadata";

type Props = { params: Promise<{ slug: string }> };
export function generateStaticParams() {
  return destinations.items.map(({ slug }) => ({ slug }));
}
export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const destination = destinations.items.find((item) => item.slug === slug);
  if (!destination) notFound();
  return pageMetadata(
    destination.name,
    destination.description,
    `/destinations/${slug}`,
    destination.image,
  );
}

export default async function DestinationPage({ params }: Props) {
  const { slug } = await params;
  const destination = destinations.items.find((item) => item.slug === slug);
  if (!destination) notFound();
  const journey = pricing.items.find((item) => item.name === destination.journey)!;
  return (
    <main id="main" className="interior-page">
      <section className="destination-hero">
        <img
          src={destination.image}
          alt={destination.alt}
          width={1600}
          height={1000}
          fetchPriority="high"
        />
        <div className="container destination-hero-copy">
          <nav className="breadcrumbs" aria-label="Breadcrumb">
            <Link href="/destinations">Destinations</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">{destination.name}</span>
          </nav>
          <p className="page-kicker">{destination.journey} collection</p>
          <h1>{destination.name}</h1>
          <p>{destination.description}</p>
        </div>
      </section>
      <dl className="destination-facts container">
        <div>
          <dt>Perspective</dt>
          <dd>{destination.altitude}</dd>
        </div>
        <div>
          <dt>Time away</dt>
          <dd>{destination.duration}</dd>
        </div>
        <div>
          <dt>The concept</dt>
          <dd>{destination.journey}</dd>
        </div>
      </dl>
      <section className="section container story-layout">
        <div>
          <p className="page-kicker">The journey</p>
          <h2>
            A view that
            <br />
            changes the story.
          </h2>
        </div>
        <div className="prose">
          <p className="lead-copy">{destination.introduction}</p>
          <p>
            Every detail here is an invitation to imagine. Orbit is a fictional travel concept;
            preparation, availability, and eligibility for any real experience would be defined by
            its operator.
          </p>
        </div>
      </section>
      <section className="section story-surface">
        <div className="container">
          <div className="section-heading">
            <p className="page-kicker">An imagined itinerary</p>
            <h2>More than the destination.</h2>
          </div>
          <ol className="journey-steps">
            {destination.itinerary.map((step, index) => (
              <li key={step.title}>
                <span className="step-number" aria-hidden="true">
                  0{index + 1}
                </span>
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>
      <section className="section container journey-enquiry">
        <div>
          <p className="page-kicker">The {journey.name} concept</p>
          <h2>
            Your perspective,
            <br />
            thoughtfully considered.
          </h2>
          <ul className="included-list">
            {journey.features.map((feature) => (
              <li key={feature}>
                <Check size={17} aria-hidden="true" />
                {feature}
              </li>
            ))}
          </ul>
        </div>
        <aside className="enquiry-summary">
          <p className="page-kicker">Imagine your journey</p>
          <p className="enquiry-price">{journey.price}</p>
          <p>{journey.unit}</p>
          <Button asChild>
            <Link href={`/contact?journey=${encodeURIComponent(journey.name)}`}>
              Enquire about {journey.name}
              <ArrowUpRight size={18} aria-hidden="true" />
            </Link>
          </Button>
          <p className="caption-copy">
            Illustrative concept only. No flights, reservations, or payments are offered.
          </p>
        </aside>
      </section>
      <section className="section container">
        <div className="section-heading-row">
          <h2>Another perspective.</h2>
          <Link className="text-link" href="/destinations">
            All destinations
            <ArrowUpRight size={18} aria-hidden="true" />
          </Link>
        </div>
        <div className="related-journeys">
          {destinations.items
            .filter((item) => item.id !== destination.id)
            .map((item) => (
              <JourneyCard key={item.id} destination={item} />
            ))}
        </div>
      </section>
    </main>
  );
}
