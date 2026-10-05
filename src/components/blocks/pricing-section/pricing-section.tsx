import { ArrowUpRight, Check } from "lucide-react";
import Link from "next/link";
import { pricing } from "@/assets/data/pricing";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { SectionHeading } from "@/components/ui/section-heading";
export function PricingSection() {
  return (
    <section className="section container" id="journeys">
      <SectionHeading {...pricing} />
      <div className="pricing-grid">
        {pricing.items.map((item) => (
          <Card
            id={"journey-" + item.name.toLowerCase()}
            className={"pricing-card " + (item.featured ? "is-featured" : "")}
            key={item.name}
            data-reveal
          >
            {item.featured && <p className="featured-label">{pricing.featuredLabel}</p>}
            <CardHeader>
              <CardTitle>
                <h3>{item.name}</h3>
              </CardTitle>
              <CardDescription className="pricing-description">{item.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="price">{item.price}</p>
              <p className="price-unit">{item.unit}</p>
              <Button asChild variant={item.featured ? "default" : "secondary"}>
                <Link href={`/contact?journey=${encodeURIComponent(item.name)}`}>
                  {pricing.actionLabel}
                  <ArrowUpRight aria-hidden="true" size={16} />
                </Link>
              </Button>
              <ul>
                {item.features.map((feature) => (
                  <li key={feature}>
                    <Check size={16} aria-hidden="true" />
                    {feature}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
      <p className="pricing-note">{pricing.note}</p>
    </section>
  );
}
