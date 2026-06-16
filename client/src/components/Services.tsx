/**
 * Services Section - Elegant Restoration Design
 * 
 * Design Notes:
 * - Three core services with descriptive cards
 * - Images showcase the artistry and professionalism
 * - Warm, inviting tone in copy
 * - Asymmetric layout with alternating image/text
 * - Gold accent lines frame service titles
 */

export default function Services() {
  const services = [
    {
      title: "Scar Camouflage",
      description:
        "Paramedical tattooing that blends seamlessly with surrounding skin, making scars less noticeable. Whether from surgery, injury, or life's challenges, we help restore your confidence and comfort in your own skin.",
      image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663567271102/HFLRAYL8cfaKdwX2Vmsg69/service-scar-camouflage-jBQMdNYjyREmPt5JnaCjaa.webp",
      imagePosition: "left",
    },
    {
      title: "Permanent Makeup",
      description:
        "Enhance your natural beauty with precision permanent makeup. From eyebrows and eyeliner to lip color, our techniques create natural-looking results that last. Wake up feeling confident every single day.",
      image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663567271102/HFLRAYL8cfaKdwX2Vmsg69/service-permanent-makeup-AkkeV5bmGSH9wehvcqZTbR.webp",
      imagePosition: "right",
    },
    {
      title: "Restorative Artistry",
      description:
        "Beyond technique, our work is about restoring dignity and connection. We listen to your story, understand your concerns, and create customized solutions that honor your journey and celebrate your strength.",
      image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663567271102/HFLRAYL8cfaKdwX2Vmsg69/hero-restoration-journey-h9ej3dXLqtFY9uZ2cMFCTi.webp",
      imagePosition: "left",
    },
  ];

  return (
    <section id="services" className="py-16 md:py-32 bg-background">
      <div className="container">
        {/* Section Header */}
        <div className="max-w-2xl mb-12 md:mb-16">
          <div className="accent-line mb-4"></div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-foreground mb-4 md:mb-6">
            Our Services
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground font-light">
            Specialized techniques designed to heal, restore, and celebrate your unique story.
          </p>
        </div>

        {/* Services Grid */}
        <div className="space-y-12 md:space-y-20">
          {services.map((service, index) => (
            <div
              key={index}
              className={`flex flex-col ${
                service.imagePosition === "right" ? "md:flex-row-reverse" : "md:flex-row"
              } gap-8 md:gap-12 items-center`}
            >
              {/* Image */}
              <div className="flex-1 overflow-hidden rounded-lg shadow-md hover-lift">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Content */}
              <div className="flex-1">
                <div className="accent-line mb-4"></div>
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
                  {service.title}
                </h3>
                <p className="text-base sm:text-lg text-muted-foreground font-light leading-relaxed mb-6">
                  {service.description}
                </p>
                <button className="text-primary font-medium hover:text-primary/80 transition-colors flex items-center gap-2">
                  Learn More
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
