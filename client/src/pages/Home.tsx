import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import About from "@/components/About";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

/**
 * Home Page - Elegant Restoration Design
 * 
 * Design Philosophy:
 * - Warm, compassionate aesthetic celebrating healing and dignity
 * - Sophisticated color palette: soft gold, warm taupe, sage green
 * - Elegant typography: Playfair Display (serif) for headings, Inter (sans-serif) for body
 * - Story-driven narrative guiding visitors through the journey
 * - Generous whitespace and subtle motion for refined feel
 * - Professional yet deeply personal tone
 */

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <Hero />
      <Services />
      <About />
      <Testimonials />
      <Contact />
      <Footer />
    </div>
  );
}
