import { useLocation } from "react-router-dom";
import Section from "../../../components/public_site/Section";
import Card from "../../../components/public_site/Card";
import Badge from "../../../components/public_site/Badge";
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
      <Section background="navy" spacing="small" className="pt-32 pb-20">
        <GSAPReveal>
          <div className="text-center max-w-4xl mx-auto">
            <Badge variant="soft" className="mb-6">
              Academics
            </Badge>
            <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-6 uppercase tracking-wider">
              Academic <span className="text-college-gold">Programs</span>
            </h1>
            <p className="text-xl text-white/80 leading-relaxed">
              Discover our comprehensive range of programs at {campusLabel}, designed to empower
              the next generation of leaders and professionals.
            </p>
          </div>
        </GSAPReveal>
      </Section>

      {campusData.map((category, idx) => (
        <Section
          key={category.category}
          background={idx % 2 === 0 ? "white" : "gray"}
          spacing="standard"
        >
          <GSAPReveal>
            <Section.Header
              title={category.category}
              badge={campusLabel}
              description={category.description}
            />
          </GSAPReveal>

          <GSAPReveal stagger={0.15} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {category.items.map((program) => (
              <Card
                key={program.title}
                hover
                className="h-full flex flex-col border-t-4 border-t-college-gold rounded-lg bg-white shadow-sm hover:shadow-2xl transition-all duration-500 p-8 group"
              >
                <div className="flex items-start justify-between mb-8">
                  <Badge variant="outline">
                    {program.duration}
                  </Badge>
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
              </Card>
            ))}
          </GSAPReveal>
        </Section>
      ))}

      {/* CTA */}
      <Section background="navy" spacing="small" className="py-20 md:py-24">
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
      </Section>
    </div>
  );
};

export default AcademicsPage;