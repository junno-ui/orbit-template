import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function PageCta() {
  return (
    <section className="page-cta container">
      <div>
        <p className="page-kicker">Where curiosity leads</p>
        <h2>
          Your story starts
          <br />
          with a conversation.
        </h2>
      </div>
      <Button asChild>
        <Link href="/contact">
          Begin your journey
          <ArrowUpRight size={18} aria-hidden="true" />
        </Link>
      </Button>
    </section>
  );
}
