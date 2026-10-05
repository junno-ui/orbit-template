import { CtaSection } from "@/components/blocks/cta-section/cta-section";
import { FaqSection } from "@/components/blocks/faq-section/faq-section";
import { PageIntro } from "@/components/ui/page-intro";
import { pageMetadata } from "@/lib/page-metadata";
import { pricing } from "@/assets/data/pricing";

export const metadata = pageMetadata(
  "Begin your journey",
  "Tell us where your curiosity is taking you. Prepare a personal Orbit enquiry.",
  "/contact",
);

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ journey?: string | string[] }>;
}) {
  const { journey } = await searchParams;
  const selected =
    pricing.items.find((item) => item.name === journey)?.name ?? pricing.items[0].name;
  return (
    <main id="main" className="interior-page contact-page">
      <PageIntro
        eyebrow="Get in touch"
        title="Where is your curiosity taking you?"
        description="A first question. A shared idea. A journey you have been imagining. Start with a few details and prepare a message in your own words."
      />
      <CtaSection key={selected} initialJourney={selected} />
      <FaqSection />
    </main>
  );
}
