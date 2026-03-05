import { useLocation } from "react-router-dom";
import PublicButton from "../../../components/shared/PublicButton";
import GSAPReveal from "../../../components/shared/GSAPReveal";

import { programsData } from "../../../data/programsData";

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
                <div className="mb-4 flex justify-center">
                  <span className="inline-flex items-center font-bold tracking-wider uppercase rounded transition-all duration-200 px-3 py-1 text-xs bg-transparent text-college-navy border border-college-navy">
                    {campusLabel}
                  </span>
                </div>
                <h2 className="text-3xl md:text-4xl font-serif font-bold text-college-navy mb-4">
                  {category.category}
                </h2>
                <div className="h-1 bg-college-gold mt-6 mb-6 w-24 mx-auto"></div>
                <p className="text-gray-600 max-w-2xl mx-auto font-sans text-lg">
                  {category.description}
                </p>
              </div>
            </GSAPReveal>

            <GSAPReveal stagger={0.15}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {category.items.map((program) => (
                  <div
                    key={program.title}
                    className="bg-white border border-gray-200 overflow-hidden transition-all duration-300 ease-out h-full flex flex-col border-t-4 border-t-college-gold rounded-lg shadow-sm hover:shadow-2xl hover:-translate-y-1.5 cursor-pointer p-8 group"
                  >
                    <div className="flex items-start justify-between mb-8">
                      <span className="inline-flex items-center tracking-wider uppercase bg-transparent text-college-navy border border-college-navy transition-all duration-200 px-3 py-1 text-xs font-bold rounded">
                        {program.duration}
                      </span>
                    </div>

                    <h3 className="text-2xl font-serif font-bold mb-4 text-college-navy group-hover:text-college-gold transition-colors duration-300">
                      {program.title}
                    </h3>
                    <p className="text-gray-600 text-base leading-relaxed mb-8 flex-grow">
                      {program.description}
                    </p>

                    {program.features && (
                      <div className="space-y-3 mb-8">
                        {program.features.slice(0, 3).map((feature) => (
                          <div key={feature} className="flex items-center gap-3 text-sm text-gray-500">
                            <span className="w-1.5 h-1.5 rounded-full bg-college-gold flex-shrink-0" />
                            <span className="font-medium">{feature}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    <div className="pt-6 border-t border-gray-100 flex items-center justify-between mt-auto">
                      <div className="flex items-center text-sm font-bold text-gray-400 uppercase tracking-widest">
                        {program.credits}
                      </div>
                      <PublicButton to="/admissions" variant="primary" size="sm" className="rounded px-6">
                        View Details
                      </PublicButton>
                    </div>
                  </div>
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
                <PublicButton to="/admissions" variant="secondary" size="lg" className="rounded px-8 py-4">
                  Apply Online
                </PublicButton>
                <PublicButton
                  to="/contact"
                  variant="outline"
                  size="lg"
                  className="!border-white !text-white hover:!bg-white hover:!text-college-navy font-bold rounded px-8 py-4"
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