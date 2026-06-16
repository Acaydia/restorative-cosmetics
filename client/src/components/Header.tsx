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
        <Link href="/">
          <a className="flex items-center gap-2 sm:gap-3 hover:opacity-80 transition-opacity">
            <img
              src="https://d2xsxph8kpxj0f.cloudfront.net/310519663567271102/HFLRAYL8cfaKdwX2Vmsg69/brand-logo-mark-JTvtDdyyFhipn4fm4HuYDh.webp"
              alt="Restorative Cosmetics"
              className="w-8 sm:w-10 h-8 sm:h-10"
            />
            <div className="hidden sm:block">
              <h1 className="text-base sm:text-lg font-display font-bold text-foreground">
                Restorative Cosmetics
              </h1>
              <p className="text-xs text-muted-foreground font-sans">Healing Through Artistry</p>
            </div>
          </a>
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8">
          <Link href="/#services">
            <a className="text-sm font-medium text-foreground hover:text-primary transition-colors">
              Services
            </a>
          </Link>
          <Link href="/#about">
            <a className="text-sm font-medium text-foreground hover:text-primary transition-colors">
              About
            </a>
          </Link>
          <Link href="/#testimonials">
            <a className="text-sm font-medium text-foreground hover:text-primary transition-colors">
              Stories
            </a>
          </Link>
          <Link href="/#contact">
            <a>
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90 text-sm">
                Get Started
              </Button>
            </a>
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
