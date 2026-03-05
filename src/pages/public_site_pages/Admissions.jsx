import { Phone, Mail, CheckSquare, Send } from "lucide-react";
import PublicButton from "../../components/shared/PublicButton";
import Section from "../../components/public_site/Section";
import SectionHeader from "../../components/public_site/SectionHeader";
import Badge from "../../components/public_site/Badge";
import Card from "../../components/public_site/Card";
import CTASection from "../../components/public_site/CTASection";
import AdmissionForm from "../../components/public_site/AdmissionForm";
import {
  admissionSteps,
  requirements,
  programs,
} from "../../data/admissionsData";
import { useRef, useState } from "react";

const Admissions = () => {

  return (
    <div className="min-h-screen bg-gray-50 font-sans">

      {/* Admission Process */}
      <Section variant="navy" id="process">
        <SectionHeader
          badge="How to Apply"
          title="Admission Process"
          description="Follow these simple steps to begin your educational journey with us"
          variant="dark"
          centered
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {admissionSteps.map((step, index) => (
            <Card key={step.title} variant="glass" hover className="p-6 md:p-8 relative">
              <div className="mb-4">
                <Badge variant="gold">Step {index + 1}</Badge>
              </div>
              <h3 className="text-xl font-serif font-bold mb-3 text-white">
                <span className="text-college-gold mr-2">{index + 1}.</span> {step.title}
              </h3>
              <p className="text-sm leading-relaxed text-white/70">{step.description}</p>
            </Card>
          ))}
        </div>
      </Section>

      {/* Programs Overview */}
      <Section variant="white" id="programs" className="border-y border-gray-100">
        <div className="absolute top-0 right-0 w-64 h-64 bg-college-gold/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-college-navy/5 rounded-full blur-3xl" />

        <SectionHeader
          badge="Academic Excellence"
          title="Programs We Offer"
          description="Explore our comprehensive range of academic programs across all campuses"
          variant="light"
          centered
          className="relative z-10"
        />

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto relative z-10 mt-10">
          {programs.map((programCategory) => (
            <Card key={programCategory.category} hover className="group flex flex-col">
              <div className="h-2 bg-college-gold w-full md:w-0 group-hover:w-full transition-all duration-500 ease-out" />
              <div className="space-y-4 p-8 flex-grow">
                <div className="text-center mb-8 pb-6 border-b border-gray-100 group-hover:border-college-gold/20 transition-colors relative">
                  <h3 className="text-2xl font-serif font-bold text-college-navy group-hover:text-college-gold transition-colors">
                    {programCategory.category}
                  </h3>
                </div>
                <ul className="space-y-4">
                  {programCategory.courses.map((course, cIdx) => (
                    <li key={cIdx} className="flex items-start gap-3 text-gray-700 text-sm font-medium group/item">
                      <CheckSquare className="w-5 h-5 text-college-gold opacity-50 group-hover/item:opacity-100 flex-shrink-0 transition-opacity" />
                      <span className="group-hover/item:text-college-navy transition-colors">{course}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="p-4 bg-gray-50 border-t border-gray-100 text-center">
                <span className="text-xs font-bold text-college-navy uppercase tracking-widest group-hover:text-college-gold transition-colors">View Details</span>
              </div>
            </Card>
          ))}
        </div>
      </Section>

      {/* Requirements Section */}
      <section id="requirements" className="relative overflow-hidden bg-college-navy text-white py-14 md:py-20 border-y-4 border-college-gold">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <SectionHeader
            badge="What You Need"
            title="Admission Requirements"
            description="Ensure you have all the necessary documents and meet the eligibility criteria before applying."
            variant="dark"
            centered
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 relative z-10 max-w-7xl mx-auto mt-10">
            {/* Required Documents */}
            <div className="bg-white/5 border border-gray-200 overflow-hidden transition-all duration-300 ease-out rounded-2xl shadow-sm p-8 border-t-4 border-t-college-gold backdrop-blur-lg hover:bg-white/10 shadow-2xl h-full">
              <div className="flex items-center gap-4 mb-8 pb-6 border-b border-white/10">
                <div>
                  <h3 className="text-2xl font-serif font-bold text-white mb-1">Required Documents</h3>
                  <p className="text-college-gold text-xs uppercase tracking-widest font-bold">What you need to submit</p>
                </div>
              </div>
              <ul className="space-y-6">
                {requirements.documents.map((doc, idx) => (
                  <li key={idx} className="flex items-start gap-4 group/doc">
                    <div className="w-8 h-8 rounded-md bg-white/10 border border-white/20 flex items-center justify-center text-college-gold group-hover/doc:bg-college-gold group-hover/doc:text-college-navy group-hover/doc:scale-110 transition-all duration-300 flex-shrink-0 shadow-lg">
                      <span className="text-sm font-bold">{idx + 1}</span>
                    </div>
                    <p className="text-white/90 text-base flex-1 pt-1 group-hover/doc:text-white font-light tracking-wide transition-colors">{doc}</p>
                  </li>
                ))}
              </ul>
            </div>

            {/* Eligibility Criteria */}
            <div className="bg-white/5 border border-gray-200 overflow-hidden transition-all duration-300 ease-out rounded-2xl shadow-sm p-8 border-t-4 border-t-college-gold backdrop-blur-lg hover:bg-white/10 shadow-2xl h-full">
              <div className="flex items-center gap-4 mb-8 pb-6 border-b border-white/10">
                <div>
                  <h3 className="text-2xl font-serif font-bold text-white mb-1">Eligibility Criteria</h3>
                  <p className="text-college-gold text-xs uppercase tracking-widest font-bold">Requirements you must meet</p>
                </div>
              </div>
              <ul className="space-y-6">
                {requirements.eligibility.map((criteria, idx) => (
                  <li key={idx} className="flex items-start gap-4 group/crit">
                    <div className="w-8 h-8 rounded-md bg-white/10 border border-white/20 flex items-center justify-center text-college-gold group-hover/crit:bg-college-gold group-hover/crit:text-college-navy group-hover/crit:scale-110 transition-all duration-300 flex-shrink-0 shadow-lg">
                      <span className="text-sm font-bold">{idx + 1}</span>
                    </div>
                    <p className="text-white/90 text-base flex-1 pt-0.5 group-hover/crit:text-white font-light tracking-wide transition-colors">{criteria}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Application Form */}
      <Section variant="gray" id="apply-now">
        <SectionHeader
          badge="Application Form"
          title="Apply Online"
          description="Take the first step towards your vibrant future by filling out the form below."
          variant="light"
          centered
        />
        <div className="relative mt-10">
          <div className="absolute -top-10 -left-10 w-40 h-40 bg-college-gold/10 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-college-navy/10 rounded-full blur-2xl pointer-events-none" />

          <AdmissionForm programs={programs} />
        </div>
      </Section>

      {/* Contact CTA */}
      <CTASection
        badge="Need Assistance?"
        title="We're Here to Help With Your"
        highlightedWord="Application"
        description="Our dedicated admissions team is available to assist you with any questions about programs, requirements, or the application process."
      >
        <PublicButton to="tel:+92511234567" variant="secondary" size="md" icon={Phone} shape="slanted">
          Call Us: +92 51 1234 567
        </PublicButton>
        <PublicButton to="mailto:admissions@bestcolleges.edu.pk" variant="outline" size="md" icon={Mail} className="border-2 border-white/20" shape="slanted">
          Email Us: thebestcollege2008@gmail.com
        </PublicButton>
      </CTASection>
    </div>
  );
};

export default Admissions;