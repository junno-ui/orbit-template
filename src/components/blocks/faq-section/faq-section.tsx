import { faq } from "@/assets/data/faq";
import { SectionHeading } from "@/components/ui/section-heading";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
export function FaqSection() {
  return (
    <section className="section container faq-grid" id="faq">
      <SectionHeading {...faq} />
      <Accordion type="single" collapsible className="faq-list" data-reveal>
        {faq.items.map((item, index) => (
          <AccordionItem value={"question-" + index} key={item.question}>
            <AccordionTrigger>{item.question}</AccordionTrigger>
            <AccordionContent>
              <p>{item.answer}</p>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
