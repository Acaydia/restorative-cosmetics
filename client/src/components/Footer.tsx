import { Link } from "wouter";

/**
 * Footer Component - Elegant Restoration Design
 * 
 * Design Notes:
 * - Warm, inviting footer with brand colors
 * - Links to key sections and contact info
 * - Reinforces brand mission and values
 * - Simple, elegant layout
 */

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-secondary/20 border-t border-border/20 py-16">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img
                src="https://d2xsxph8kpxj0f.cloudfront.net/310519663567271102/HFLRAYL8cfaKdwX2Vmsg69/brand-logo-mark-JTvtDdyyFhipn4fm4HuYDh.webp"
                alt="Restorative Cosmetics"
                className="w-8 h-8"
              />
              <h3 className="font-display font-bold text-foreground">
                Restorative Cosmetics
              </h3>
            </div>
            <p className="text-sm text-muted-foreground font-light">
              Healing through artistry. Restoring dignity, one story at a time.
            </p>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-display font-semibold text-foreground mb-4">Services</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#services"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Scar Camouflage
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Permanent Makeup
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Restorative Artistry
                </a>
              </li>
            </ul>
          </div>

          {/* About */}
          <div>
            <h4 className="font-display font-semibold text-foreground mb-4">About</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#about"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  My Practice
                </a>
              </li>
              <li>
                <a
                  href="#testimonials"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Client Stories
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Get Started
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display font-semibold text-foreground mb-4">Contact</h4>
            <ul className="space-y-2 text-sm text-muted-foreground font-light">
              <li>
                <a
                  href="mailto:hello@restorativecosmetics.com"
                  className="hover:text-primary transition-colors"
                >
                  hello@restorativecosmetics.com
                </a>
              </li>
              <li>
                <a href="tel:+15551234567" className="hover:text-primary transition-colors">
                  (555) 123-4567
                </a>
              </li>
              <li>Your City, Your State</li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-border/20 pt-8">
          {/* Bottom */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground font-light">
              © {currentYear} Restorative Cosmetics. All rights reserved.
            </p>
            <div className="flex gap-6">
              <a
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors text-sm"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors text-sm"
              >
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
