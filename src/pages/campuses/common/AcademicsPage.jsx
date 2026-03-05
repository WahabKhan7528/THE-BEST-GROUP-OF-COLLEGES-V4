import { useLocation } from "react-router-dom";
import PublicButton from "../../../components/shared/PublicButton";
import GSAPReveal from "../../../components/shared/GSAPReveal";
import SectionHeader from "../../../components/public_site/SectionHeader";

import { programsData } from "../../../data/programsData";
import ProgramCard from "../../../components/public_site/ProgramCard";

const AcademicsPage = () => {
  const location = useLocation();
  const campus = location.pathname.split("/")[2] || "main";
  const campusData = programsData[campus] || programsData.main;

  // Simple helper to capitalize campus name for the badge
  const campusLabel = campus.charAt(0).toUpperCase() + campus.slice(1) + " Campus";

  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Page Header / Modern Hero-like section without image */}
      <section className="relative overflow-hidden bg-college-navy text-white pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <GSAPReveal>
            <div className="text-center max-w-4xl mx-auto">
              <span className="inline-flex items-center font-bold tracking-wider uppercase rounded transition-all duration-200 px-3 py-1 text-xs bg-college-gold/10 text-college-gold border border-college-gold/30 mb-6">
                Academics
              </span>
              <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-6 uppercase tracking-wider">
                Academic <span className="text-college-gold">Programs</span>
              </h1>
              <p className="text-xl text-white/80 leading-relaxed">
                Discover our comprehensive range of programs at {campusLabel}, designed to empower
                the next generation of leaders and professionals.
              </p>
            </div>
          </GSAPReveal>
        </div>
      </section>

      {campusData.map((category, idx) => (
        <section
          key={category.category}
          className={`relative overflow-hidden ${idx % 2 === 0 ? "bg-white text-gray-900" : "bg-gray-50 text-gray-900"} py-12 md:py-16`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <GSAPReveal>
              <div className="mb-10 text-center">
                <SectionHeader
                  badge={campusLabel}
                  title={category.category}
                  description={category.description}
                  variant="light"
                  centered
                />
              </div>
            </GSAPReveal>

            <GSAPReveal stagger={0.15}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {category.items.map((program) => (
                  <ProgramCard key={program.title} program={program} />
                ))}
              </div>
            </GSAPReveal>
          </div>
        </section>
      ))}

      {/* CTA */}
      <section className="relative overflow-hidden bg-college-navy text-white py-20 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <GSAPReveal>
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6 text-white uppercase tracking-wider">
                Start Your <span className="text-college-gold">Journey</span>
              </h2>
              <p className="text-lg text-white/80 mb-10 leading-relaxed font-sans">
                Take the first step towards a bright future. Explore our admission requirements
                and apply today for the upcoming academic session.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <PublicButton to="/admissions" variant="secondary" size="lg" shape="slanted">
                  Apply Online
                </PublicButton>
                <PublicButton
                  to="/contact"
                  variant="outline"
                  size="lg"
                  shape="slanted"
                  className='border-2 border-white/10'
                >
                  Request Information
                </PublicButton>
              </div>
            </div>
          </GSAPReveal>
        </div>
      </section>
    </div>
  );
};

export default AcademicsPage;