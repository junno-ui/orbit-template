import { PageIntro } from "@/components/ui/page-intro";
import { PageCta } from "@/components/ui/page-cta";
import { pageMetadata } from "@/lib/page-metadata";

export const metadata = pageMetadata(
  "Our perspective",
  "Meet the idea behind Orbit: curiosity, thoughtful exploration, and a shared planet.",
  "/about",
);
const values = [
  {
    title: "Stay curious.",
    description:
      "The best journeys start with an open question. We make room for the unexpected, the unfamiliar, and the possibility of seeing something differently.",
  },
  {
    title: "Travel thoughtfully.",
    description:
      "An extraordinary setting deserves a considered experience. We believe in quieter moments, personal attention, and details that serve a purpose.",
  },
  {
    title: "Remember home.",
    description:
      "Looking outward can bring us closer to what matters here. Our shared planet is the beginning of every story we imagine.",
  },
];

export default function AboutPage() {
  return (
    <main id="main" className="interior-page">
      <PageIntro
        eyebrow="Our perspective"
        title="Further out. Closer to what matters."
        description="Orbit began with a simple idea: a change of perspective can change the way we feel about the world. This is a place for imagining what that might look like."
      />
      <figure className="about-panorama container">
        <img
          src="/images/hero/earth.jpg"
          alt="The Earth's atmosphere viewed from an orbiting spacecraft"
          width={1600}
          height={900}
          fetchPriority="high"
        />
        <figcaption>A shared planet. An endless source of wonder.</figcaption>
      </figure>
      <section className="section container story-layout">
        <div>
          <p className="page-kicker">Why we look up</p>
          <h2>
            Wonder brings
            <br />
            us together.
          </h2>
        </div>
        <div className="prose">
          <p className="lead-copy">
            The horizon has always given us something to imagine. Beyond it, another landscape.
            Another way to understand where we are.
          </p>
          <p>
            Orbit brings that feeling into a travel concept shaped around people. Not a race to go
            further, but an invitation to notice more: the thin line of the atmosphere, the light
            over a continent, the quiet of a shared moment.
          </p>
          <p>
            We are a fictional brand, created by Junno UI to explore how those stories can be told.
            The journeys are imagined; the curiosity behind them is familiar to all of us.
          </p>
        </div>
      </section>
      <section className="section story-surface">
        <div className="container">
          <p className="page-kicker">What guides us</p>
          <h2>A few things we believe.</h2>
          <div className="values-grid">
            {values.map((value) => (
              <article key={value.title}>
                <h3>{value.title}</h3>
                <p>{value.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <PageCta />
    </main>
  );
}
