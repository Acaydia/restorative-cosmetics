/**
 * About Section - Elegant Restoration Design
 * 
 * Design Notes:
 * - Warm, personal narrative about restorative work
 * - Sage green accent for healing theme
 * - Generous whitespace and elegant typography
 * - Emphasizes compassion, expertise, and dignity
 */

export default function About() {
  return (
    <section id="about" className="py-16 md:py-32 bg-secondary/10">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center max-w-6xl mx-auto">

          {/* Portrait Image */}
          <div className="relative">
            <img
              src="/bethani-portrait.png"
              alt="Bethani Broussard — Restorative Cosmetics"
              className="w-full max-w-md mx-auto lg:mx-0 rounded-sm object-cover shadow-lg"
            />
          </div>

          {/* Text Content */}
          <div>
            {/* Section Header */}
            <div className="mb-10">
              <div className="accent-line mb-4"></div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-foreground mb-6">
                Restorative Artistry
              </h2>
            </div>

            {/* Main Content */}
            <div className="space-y-6 text-base sm:text-lg text-muted-foreground font-light leading-relaxed">
              <p>
                My practice is dedicated to restorative cosmetic artistry—specialized paramedical tattooing 
                and scar camouflage techniques designed to restore what was thought unrecoverable. Whether 
                you're navigating the aftermath of surgery, injury, or life's unexpected challenges, I'm here 
                to listen, understand, and create a customized solution that honors your unique journey.
              </p>

              <p>
                Restorative tattooing is a precision art form. These specialized techniques blend seamlessly 
                with surrounding skin, making scars, stretch marks, and other features less noticeable. The 
                result isn't just physical restoration—it's emotional renewal. It's about helping you reclaim 
                your confidence and move forward with strength.
              </p>

              <p>
                Every client who walks through my door brings a story. My commitment is to listen deeply, 
                work with precision and artistry, and create results that feel as natural and beautiful as 
                you are. This is more than a service; it's a partnership in your healing journey.
              </p>
            </div>

            {/* Key Values */}
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-6">
              {[
                {
                  title: "Compassion",
                  description: "Understanding your story and honoring your journey",
                },
                {
                  title: "Precision",
                  description: "Advanced restorative techniques and specialized expertise",
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
      </div>
    </section>
  );
}