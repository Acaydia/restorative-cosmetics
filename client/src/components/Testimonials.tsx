/**
 * Testimonials Section - Elegant Restoration Design
 * 
 * Design Notes:
 * - Client stories presented as elegant cards with gold accents
 * - Emphasizes emotional transformation and dignity
 * - Warm, authentic tone
 * - Testimonials are placeholder structure (user will add real stories)
 */

export default function Testimonials() {
  const testimonials = [
    {
      name: "Sarah M.",
      story:
        "After my surgery, I felt disconnected from my own body. The scar camouflage work gave me back more than just appearance—it gave me back my confidence and my sense of self. I can't thank you enough.",
      focus: "Scar Camouflage",
    },
    {
      name: "Jessica L.",
      story:
        "I've always wanted to enhance my features but was hesitant about permanent makeup. The consultation was so reassuring, and the results are exactly what I imagined. I wake up feeling beautiful every single day.",
      focus: "Permanent Makeup",
    },
    {
      name: "Maria T.",
      story:
        "Your compassion and expertise made all the difference. You didn't just perform a procedure—you listened to my story and helped me heal. This experience changed my life.",
      focus: "Restorative Artistry",
    },
  ];

  return (
    <section id="testimonials" className="py-16 md:py-32 bg-background">
      <div className="container">
        {/* Section Header */}
        <div className="max-w-2xl mb-12 md:mb-16">
          <div className="accent-line mb-4"></div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-foreground mb-4 md:mb-6">
            Client Stories
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground font-light">
            Hear from those who have experienced transformation and restoration.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="elegant-card border-l-4 border-l-primary hover-lift"
            >
              {/* Focus area badge */}
              <div className="mb-4 inline-block">
                <span className="text-xs font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full">
                  {testimonial.focus}
                </span>
              </div>

              {/* Story */}
              <p className="text-muted-foreground font-light leading-relaxed mb-6 italic">
                "{testimonial.story}"
              </p>

              {/* Name */}
              <p className="font-display font-semibold text-foreground">
                {testimonial.name}
              </p>

              {/* Stars */}
              <div className="flex gap-1 mt-3">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-4 h-4 text-primary fill-current"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 md:mt-16 text-center">
          <p className="text-base sm:text-lg text-muted-foreground font-light mb-6">
            Your story matters. Let's begin your journey of restoration.
          </p>
          <button className="inline-block bg-primary text-primary-foreground px-8 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors">
            Schedule a Consultation
          </button>
        </div>
      </div>
    </section>
  );
}
