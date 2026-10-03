import { HeroSection } from "@/components/blocks/hero-section/hero-section";
import { DestinationsSection } from "@/components/blocks/destinations-section/destinations-section";
import { FeaturesSection } from "@/components/blocks/features-section/features-section";
import { PricingSection } from "@/components/blocks/pricing-section/pricing-section";
import { TestimonialsSection } from "@/components/blocks/testimonials-section/testimonials-section";
import { FaqSection } from "@/components/blocks/faq-section/faq-section";
import { CtaSection } from "@/components/blocks/cta-section/cta-section";
import {
  EditorialIntro,
  CinematicBreak,
} from "@/components/blocks/editorial-section/editorial-section";
export default function Home() {
  return (
    <main id="main">
      <HeroSection />
      <EditorialIntro />
      <DestinationsSection />
      <FeaturesSection />
      <CinematicBreak />
      <PricingSection />
      <TestimonialsSection />
      <FaqSection />
      <CtaSection />
    </main>
  );
}
