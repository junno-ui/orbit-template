import type { ReactNode } from "react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { MotionProvider } from "@/components/providers/motion-provider";
import { SmoothScroll } from "@/components/providers/smooth-scroll";
export default function PagesLayout({ children }: { children: ReactNode }) {
  return (
    <MotionProvider>
      <SmoothScroll />
      <Header />
      {children}
      <Footer />
    </MotionProvider>
  );
}
