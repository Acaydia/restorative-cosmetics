/**
 * About Section - Elegant Restoration Design
 * 
 * Design Notes:
 * - Warm, personal narrative about the artist's mission
 * - Sage green accent for healing theme
 * - Generous whitespace and elegant typography
 * - Emphasizes compassion, expertise, and dignity
 */

export default function About() {
  return (
    <section id="about" className="py-16 md:py-32 bg-secondary/10">
      <div className="container">
        <div className="max-w-3xl mx-auto">
          {/* Section Header */}
          <div className="mb-12">
            <div className="accent-line mb-4"></div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-foreground mb-6">
              About My Practice
            </h2>
          </div>

          {/* Main Content */}
          <div className="space-y-6 md:space-y-8 text-base sm:text-lg text-muted-foreground font-light leading-relaxed">
            <p>
              I am a permanent cosmetics artist and makeup artist/cosmetologist with a deep passion 
              for connecting with people, their scars, and their stories. My work is rooted in a 
              fundamental belief: that every person deserves to feel confident, dignified, and 
              celebrated in their own skin.
            </p>

            <p>
              My focus is on healing and restoring the dignity of the person. Whether you're navigating 
              the aftermath of surgery, injury, or life's unexpected challenges, I'm here to listen, 
              understand, and create a customized solution that honors your unique journey.
            </p>

            <p>
              Restorative tattooing techniques are at the heart of my practice. These specialized 
              methods aim to blend with surrounding skin, making scars or features less noticeable. 
              The result isn't just physical restoration—it's emotional renewal. It's about helping 
              you reclaim your confidence and move forward with strength.
            </p>

            <p>
              Every client who walks through my door brings a story. My commitment is to listen 
              deeply, work with precision and artistry, and create results that feel as natural 
              and beautiful as you are. This is more than a service; it's a partnership in your 
              healing journey.
            </p>
          </div>

          {/* Key Values */}
          <div className="mt-12 md:mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {[
              {
                title: "Compassion",
                description: "Understanding your story and honoring your journey",
              },
              {
                title: "Expertise",
                description: "Advanced techniques and years of specialized training",
              },
              {
                title: "Dignity",
                description: "Celebrating your strength and restoring your confidence",
              },
            ].map((value, index) => (
              <div key={index} className="elegant-card">
                <h3 className="text-xl font-display font-bold text-foreground mb-3">
                  {value.title}
                </h3>
                <p className="text-sm text-muted-foreground font-light">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
