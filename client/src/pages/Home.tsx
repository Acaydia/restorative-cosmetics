import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import About from "@/components/About";
import Testimonials from "@/components/Testimonials";
import ContactEnhanced from "@/components/ContactEnhanced";
import Footer from "@/components/Footer";
import { useAuth } from "@/_core/hooks/useAuth";

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
  // The userAuth hooks provides authentication state
  // To implement login/logout functionality, simply call logout() or redirect to getLoginUrl()
  const { user, loading, error, isAuthenticated, logout } = useAuth();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <Hero />
      <Services />
      <About />
      <Testimonials />
      <ContactEnhanced />
      <Footer />
    </div>
  );
}
