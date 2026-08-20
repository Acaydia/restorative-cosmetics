import { Button } from "@/components/ui/button";
import { Link } from "wouter";

/**
 * Hero Section - Elegant Restoration Design
 * 
 * Design Notes:
 * - Large, compelling image with warm lighting
 * - Overlaid narrative text with soft background
 * - Clear call-to-action button
 * - Asymmetric layout with text positioned left
 * - Warm color palette reinforces healing theme
 */

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/bethani-working.png"
          alt="Bethani Broussard performing paramedical cosmetic work"
          className="w-full h-full object-cover"
        />
        {/* Gradient overlay for text contrast */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="container relative z-10 py-16 md:py-20">
        <div className="max-w-2xl">
          {/* Accent line */}
          <div className="accent-line mb-4 md:mb-6"></div>

          {/* Main heading */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold text-white mb-4 md:mb-6 leading-tight">
            Reclaim Your Confidence
          </h1>

          {/* Subheading */}
          <p className="text-lg sm:text-xl md:text-2xl text-gray-100 font-light mb-6 md:mb-8 leading-relaxed">
            Every scar tells a story. Through paramedical tattooing and permanent makeup, 
            we help you write a new chapter—one of strength, dignity, and renewal.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col xs:flex-row gap-3 sm:gap-4">
            <Link href="#contact">
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90 text-base sm:text-lg px-6 sm:px-8 py-5 sm:py-6">
                Share Your Story
              </Button>
            </Link>
            <Link href="#services">
              <Button
                variant="outline"
                className="border-white text-white hover:bg-white/10 text-base sm:text-lg px-6 sm:px-8 py-5 sm:py-6"
              >
                Explore Services
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 z-10 animate-bounce">
        <svg
          className="w-5 h-5 sm:w-6 sm:h-6 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </div>
    </section>
  );
}
