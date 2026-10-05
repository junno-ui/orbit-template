"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Menu, Orbit } from "lucide-react";
import { header } from "@/assets/data/header";
import { site } from "@/config/site";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const sentinel = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setScrolled(!entry.isIntersecting);
    });
    if (sentinel.current) observer.observe(sentinel.current);
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    const media = window.matchMedia("(min-width: 900px)");
    const close = () => {
      if (media.matches) setOpen(false);
    };
    media.addEventListener("change", close);
    return () => media.removeEventListener("change", close);
  }, []);
  return (
    <>
      <span ref={sentinel} className="header-sentinel" aria-hidden="true" />
      <header className="site-header" data-scrolled={scrolled} data-interior={pathname !== "/"}>
        <div className="container header-inner">
          <Link href="/" className="wordmark" aria-label={site.name + " home"}>
            <Orbit aria-hidden="true" strokeWidth={1.25} />
            {site.name}
          </Link>
          <nav className="desktop-nav" aria-label="Main navigation">
            {header.links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                aria-current={pathname.startsWith(link.href) ? "page" : undefined}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <Button asChild variant="secondary" className="header-cta">
            <Link href={header.cta.href}>
              {header.cta.label}
              <ArrowUpRight aria-hidden="true" size={16} />
            </Link>
          </Button>
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="menu-toggle"
                aria-label={header.menuLabel}
              >
                <Menu aria-hidden="true" />
              </Button>
            </SheetTrigger>
            <SheetContent side="top" className="mobile-sheet" data-lenis-prevent>
              <SheetHeader>
                <SheetTitle className="wordmark">
                  <Orbit aria-hidden="true" strokeWidth={1.25} />
                  {site.name}
                </SheetTitle>
                <SheetDescription>{header.menuDescription}</SheetDescription>
              </SheetHeader>
              <nav className="mobile-nav" aria-label="Mobile navigation">
                {[...header.links, header.cta].map((link) => (
                  <SheetClose key={link.href} asChild>
                    <Link
                      href={link.href}
                      aria-current={pathname.startsWith(link.href) ? "page" : undefined}
                    >
                      {link.label}
                      <ArrowUpRight size={18} aria-hidden="true" />
                    </Link>
                  </SheetClose>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </header>
      <span className="reading-progress" aria-hidden="true" />
    </>
  );
}
