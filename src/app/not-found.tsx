import { Button } from "@/components/ui/button";
import Link from "next/link";
export default function NotFound() {
  return (
    <main className="not-found" id="main">
      <p className="eyebrow">404 / A LITTLE OFF COURSE</p>
      <h1>Let&apos;s find your orbit.</h1>
      <p>This page is beyond our current horizon.</p>
      <Button asChild>
        <Link href="/">Return to Earth</Link>
      </Button>
    </main>
  );
}
