import { testimonials } from "@/assets/data/testimonials";
import { Orbit } from "lucide-react";
export function TestimonialsSection() {
  return (
    <section className="testimonial-section">
      <div className="container testimonial-content" data-reveal>
        <Orbit aria-hidden="true" className="quote-orbit" strokeWidth={0.75} />
        <p className="eyebrow">{testimonials.eyebrow}</p>
        <blockquote>“{testimonials.quote}”</blockquote>
        <div className="quote-author">
          <span className="avatar">{testimonials.initials}</span>
          <div>
            <p>{testimonials.name}</p>
            <span>{testimonials.role}</span>
          </div>
        </div>
        <p className="sample-note">{testimonials.note}</p>
      </div>
    </section>
  );
}
