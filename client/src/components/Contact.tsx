import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { toast } from "sonner";

/**
 * Contact Section - Elegant Restoration Design
 * 
 * Design Notes:
 * - Simple, warm contact form with clear hierarchy
 * - Emphasizes personal connection and consultation
 * - Soft gold accents on form elements
 * - Reassuring copy about the consultation process
 */

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Placeholder: In a real app, this would send to a backend
    toast.success("Thank you! We'll be in touch soon to discuss your journey.");
    setFormData({ name: "", email: "", phone: "", message: "" });
  };

  return (
    <section id="contact" className="py-16 md:py-32 bg-secondary/5">
      <div className="container">
        <div className="max-w-2xl mx-auto">
          {/* Section Header */}
          <div className="mb-12">
            <div className="accent-line mb-4"></div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-foreground mb-4 md:mb-6">
              Let's Connect
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground font-light">
              Every journey begins with a conversation. Share your story, and let's explore 
              how we can support your restoration and healing.
            </p>
          </div>

          {/* Contact Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Your Name
              </label>
              <Input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Jane Doe"
                required
                className="border-border/50 focus:border-primary focus:ring-primary"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Email Address
              </label>
              <Input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="jane@example.com"
                required
                className="border-border/50 focus:border-primary focus:ring-primary"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Phone Number
              </label>
              <Input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="(555) 123-4567"
                className="border-border/50 focus:border-primary focus:ring-primary"
              />
            </div>

            {/* Message */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Tell Me Your Story
              </label>
              <Textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Share what brings you here, your goals, and any questions you have..."
                rows={5}
                required
                className="border-border/50 focus:border-primary focus:ring-primary resize-none"
              />
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90 text-base py-6"
            >
              Begin My Journey
            </Button>

            {/* Reassurance text */}
            <p className="text-center text-xs sm:text-sm text-muted-foreground font-light">
              I'll respond within 1-2 business days to discuss your needs and schedule a consultation.
            </p>
            <p className="text-center text-xs sm:text-sm text-muted-foreground font-light mt-4">
              <strong>Restorative Cosmetics by Bethani Broussard</strong><br />
              306 S. Main, St Martinville, LA 70582<br />
              (337) 252-6780 | bethani@restorativecosmetics.com<br />
              <em>Mobile upon request</em>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
