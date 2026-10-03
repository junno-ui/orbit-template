"use client";
import { useEffect, useRef, useState, useSyncExternalStore, type FormEvent } from "react";
import { ArrowRight, ArrowUpRight, Check } from "lucide-react";
import { cta } from "@/assets/data/cta";
import { pricing } from "@/assets/data/pricing";
import { site } from "@/config/site";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select";

const subscribeToHydration = () => () => {};

export function CtaSection() {
  // Prevent the browser's default GET submission before the client handler is ready.
  const hydrated = useSyncExternalStore(
    subscribeToHydration,
    () => true,
    () => false,
  );
  const [draft, setDraft] = useState("");
  const [journey, setJourney] = useState(pricing.items[0].name);
  const [ready, setReady] = useState(false);
  const status = useRef<HTMLHeadingElement>(null);
  const name = useRef<HTMLInputElement>(null);
  useEffect(() => {
    // Anchors also work without JavaScript; enhance with the selected package.
    const select = (event: MouseEvent) => {
      const target =
        event.target instanceof Element
          ? event.target.closest<HTMLAnchorElement>("a[data-journey]")
          : null;
      const selected = target?.dataset.journey;
      if (selected && pricing.items.some((item) => item.name === selected)) {
        setJourney(selected);
        setReady(false);
      }
    };
    document.addEventListener("click", select);
    return () => document.removeEventListener("click", select);
  }, []);
  useEffect(() => {
    if (ready) status.current?.focus();
  }, [ready]);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setDraft(
      "Name: " +
        String(data.get("name")).trim() +
        "\nEmail: " +
        data.get("email") +
        "\nJourney: " +
        journey +
        "\n\n" +
        String(data.get("message")).trim(),
    );
    setReady(true);
  }

  return (
    <section className="contact-section" id="contact">
      <div className="container contact-grid">
        <div data-reveal>
          <p className="eyebrow">{cta.eyebrow}</p>
          <h2>
            {cta.title}
            <br />
            <em>{cta.titleLine2}</em>
          </h2>
          <p className="section-description">{cta.description}</p>
          <a className="contact-email" href={"mailto:" + site.email}>
            {site.email}
            <ArrowUpRight size={18} aria-hidden="true" />
          </a>
        </div>
        <div className="enquiry-panel" data-reveal>
          <form onSubmit={submit} hidden={ready}>
            <div className="form-row">
              <div className="form-field">
                <Label htmlFor="enquiry-name">{cta.nameLabel}</Label>
                <Input
                  id="enquiry-name"
                  ref={name}
                  name="name"
                  autoComplete="name"
                  placeholder={cta.namePlaceholder}
                  required
                  maxLength={100}
                  pattern={".*\\S.*"}
                />
              </div>
              <div className="form-field">
                <Label htmlFor="enquiry-email">{cta.emailLabel}</Label>
                <Input
                  id="enquiry-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder={cta.emailPlaceholder}
                  required
                  maxLength={254}
                />
              </div>
            </div>
            <div className="form-field">
              <Label htmlFor="enquiry-journey">{cta.journeyLabel}</Label>
              <NativeSelect
                id="enquiry-journey"
                name="journey"
                value={journey}
                onChange={(event) => setJourney(event.target.value)}
              >
                {pricing.items.map((item) => (
                  <NativeSelectOption key={item.name}>{item.name}</NativeSelectOption>
                ))}
              </NativeSelect>
            </div>
            <div className="form-field">
              <Label htmlFor="enquiry-message">{cta.messageLabel}</Label>
              <Textarea
                id="enquiry-message"
                name="message"
                rows={3}
                placeholder={cta.messagePlaceholder}
                maxLength={1200}
              />
            </div>
            <Button type="submit" disabled={!hydrated}>
              {cta.submitLabel}
              <ArrowRight aria-hidden="true" size={17} />
            </Button>
            <p className="form-note">{cta.privacy}</p>
            <noscript>
              <p className="form-note">{cta.noScriptMessage}</p>
            </noscript>
          </form>
          {ready && (
            <div className="enquiry-success">
              <Check size={30} aria-hidden="true" />
              <h3 ref={status} tabIndex={-1}>
                {cta.successTitle}
              </h3>
              <p>{cta.successDescription}</p>
              <div className="form-field">
                <Label htmlFor="enquiry-draft">{cta.draftLabel}</Label>
                <Textarea id="enquiry-draft" rows={6} readOnly value={draft} />
              </div>
              <Button asChild>
                <a
                  href={
                    "mailto:" +
                    site.email +
                    "?subject=" +
                    encodeURIComponent(cta.subject) +
                    "&body=" +
                    encodeURIComponent(draft)
                  }
                >
                  {cta.openEmailLabel}
                  <ArrowUpRight size={16} aria-hidden="true" />
                </a>
              </Button>
              <Button
                type="button"
                variant="ghost"
                onClick={() => {
                  setReady(false);
                  requestAnimationFrame(() => name.current?.focus());
                }}
              >
                {cta.editLabel}
              </Button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
