import { Link } from "wouter";
import { Button } from "@/components/ui/button";

/**
 * Header Component - Elegant Restoration Design
 * 
 * Design Notes:
 * - Light background with soft gold accent for logo
 * - Clean navigation with generous spacing
 * - Responsive mobile menu (placeholder for now)
 * - Logo uses brand mark with wordmark
 */

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border/20">
      <div className="container flex items-center justify-between py-4 md:py-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 sm:gap-3 hover:opacity-80 transition-opacity">
          <img
            src="/manus-storage/logo-mark_bc8fbeb8.png"
            alt="Restorative Cosmetics"
            className="w-8 sm:w-10 h-8 sm:h-10"
          />
          <div className="hidden sm:block">
            <h1 className="text-base sm:text-lg font-display font-bold text-foreground">
              Restorative Cosmetics
            </h1>
            <p className="text-xs text-muted-foreground font-sans">Healing Through Artistry</p>
          </div>
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8">
          <Link href="/#services" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
            Services
          </Link>
          <Link href="/#about" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
            About
          </Link>
          <Link href="/knowledge" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
            Learn
          </Link>
          <Link href="/#testimonials" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
            Stories
          </Link>
          <Link href="/#contact">
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90 text-sm">
              Get Started
            </Button>
          </Link>
        </nav>

        {/* Mobile Menu Button (placeholder) */}
        <button className="md:hidden p-2 hover:bg-muted rounded-lg transition-colors" aria-label="Toggle menu">
          <svg
            className="w-5 h-5 sm:w-6 sm:h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>
    </header>
  );
}
