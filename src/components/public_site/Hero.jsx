import { clsx } from "clsx";
import { Bell } from "lucide-react";
import { Link } from "react-router-dom";
import PublicButton from "../shared/PublicButton";

const Hero = ({ title, image, announcements = [], minimal = false, className, ...props }) => {
  // Minimal hero - just image with centered title
  if (minimal) {
    return (
      <section
        className={clsx(
          "relative h-[50vh] md:h-[60vh] flex items-center justify-center overflow-hidden",
          className
        )}
        {...props}
      >
        {image && (
          <div className="absolute inset-0 z-0">
            <img
              src={image}
              alt={title || "Hero Background"}
              className="w-full h-full object-cover object-center"
              loading="eager"
              fetchpriority="high"
            />
          </div>
        )}
        <div className="absolute inset-0 z-0 bg-college-navy/50" />
        {title && (
          <h1 className="relative z-10 text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white uppercase leading-tight tracking-wider text-center px-6">
            {title}
          </h1>
        )}
      </section>
    );
  }

  return (
    <section
      className={clsx(
        "relative min-h-screen flex items-center overflow-hidden",
        className
      )}
      {...props}
    >
      {/* Background Image */}
      {image && (
        <div className="absolute inset-0 z-0">
          <img
            src={image}
            alt={title || "Hero Background"}
            className="w-full h-full object-cover object-center"
            loading="eager"
            fetchpriority="high"
          />
        </div>
      )}

      {/* Navy Overlay */}
      <div className="absolute inset-0 z-0 bg-college-navy/70" />

      {/* Content */}
      <div className="container mx-auto px-6 py-20 relative z-10 h-full flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 w-full">
          {/* Left Column - Content */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-6 text-left">
            {title && (
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white uppercase leading-tight tracking-wider">
                {title}
              </h1>
            )}
            <p className="text-lg md:text-xl text-white/90 font-sans max-w-2xl">
              Empowering Futures Through Quality Education Since 1985.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link
                to="/admissions"
                className="inline-flex items-center justify-center px-8 py-3.5 text-base font-bold uppercase tracking-wider text-college-navy bg-college-gold hover:bg-yellow-500 rounded transition-all shadow-lg"
              >
                Apply Now
              </Link>
              <Link
                to="/about"
                className="inline-flex items-center justify-center px-8 py-3.5 text-base font-bold uppercase tracking-wider text-white border-2 border-college-gold hover:bg-college-gold/10 rounded transition-all"
              >
                Explore Campuses
              </Link>
            </div>
          </div>

          {/* Right Column - Announcements (kept for functional integrity but styled to fit) */}
          {announcements?.length > 0 && (
            <div className="lg:col-span-5 h-full flex flex-col justify-center lg:items-end w-full">
              <div className="w-full max-w-md bg-college-navy shadow-2xl border border-college-gold/30 p-6 rounded-2xl">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-college-gold flex items-center justify-center">
                    <Bell className="w-5 h-5 text-college-navy" />
                  </div>
                  <h2 className="text-2xl font-serif font-bold text-white">
                    News & Updates
                  </h2>
                </div>
                <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2 no-scrollbar">
                  {announcements.map((announcement, index) => (
                    <div
                      key={announcement.id || index}
                      className="group border-b border-white/20 pb-4 last:border-0 last:pb-0"
                    >
                      <h3 className="text-lg font-bold text-college-gold mb-1 transition-colors">
                        {announcement.title}
                      </h3>
                      <p className="text-xs text-white/70 mb-2 uppercase tracking-wider">
                        {announcement.date}
                      </p>
                      <p className="text-white/90 text-sm leading-relaxed line-clamp-2 group-hover:line-clamp-none transition-all">
                        {announcement.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Hero;
