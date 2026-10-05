import Link from "next/link";
import type { ReactNode } from "react";

export function PageIntro({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string;
  title: string;
  description: string;
  children?: ReactNode;
}) {
  return (
    <section className="page-intro container">
      <nav className="breadcrumbs" aria-label="Breadcrumb">
        <Link href="/">Home</Link>
        <span aria-hidden="true">/</span>
        <span aria-current="page">{eyebrow}</span>
      </nav>
      <div className="page-intro-grid">
        <div>
          <p className="page-kicker">{eyebrow}</p>
          <h1>{title}</h1>
        </div>
        <div className="page-intro-copy">
          <p>{description}</p>
          {children}
        </div>
      </div>
    </section>
  );
}
