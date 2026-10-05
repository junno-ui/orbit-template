import { ArrowUp, Orbit } from "lucide-react";
import Link from "next/link";
import { footer } from "@/assets/data/footer";
import { site } from "@/config/site";
export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-top">
          <div>
            <Link href="/" className="wordmark" aria-label="Orbit home">
              <Orbit aria-hidden="true" strokeWidth={1.25} />
              {site.name}
            </Link>
            <p>{footer.description}</p>
          </div>
          <nav aria-label="Footer navigation">
            {footer.links.map((link) => (
              <Link key={link.href} href={link.href}>
                {link.label}
              </Link>
            ))}
          </nav>
          <a href="#top" className="back-top" aria-label={footer.backToTop}>
            <ArrowUp aria-hidden="true" />
          </a>
        </div>
        <div className="footer-bottom">
          <p>{site.copyright}</p>
          <a href={site.publisherUrl}>
            Made by {site.publisher}
            <span aria-hidden="true"> ↗</span>
          </a>
        </div>
        <p className="demo-notice">{site.demoNotice}</p>
      </div>
    </footer>
  );
}
