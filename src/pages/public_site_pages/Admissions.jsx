import { Phone, Mail, ArrowRight, GraduationCap, CheckCircle2, BookOpen, Library, Award, FileText, ClipboardCheck, Users } from "lucide-react";
import Section from "../../components/public_site/Section";
import Card from "../../components/public_site/Card";
import PublicButton from "../../components/shared/PublicButton";
import AdmissionForm from "../../components/public_site/AdmissionForm";
import CTA from "../../components/public_site/CTA";
import {
  admissionSteps,
  requirements,
  programs,
} from "../../data/admissionsData";
import Badge from "../../components/public_site/Badge";

const Admissions = () => {
  return (
    <div className="min-h-screen bg-gray-50 font-sans">

      {/* Admission Process */}
      <Section id="process" background="navy" spacing="large">
        <Section.Header
          title="Admission Process"
          badge="How to Apply"
          description="Follow these simple steps to begin your educational journey with us"
          light={true}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {admissionSteps.map((step, index) => (
            <Card.StepCard
              key={step.title}
              stepNumber={index + 1}
              badge={<Badge variant="soft">Step {index + 1}</Badge>}
              title={step.title}
              description={step.description}
              light={true}
              className="bg-white/5 border-white/10"
            />
          ))}
        </div>
      </Section>


      {/* Programs Overview */}
      <Section id="programs" background="white" spacing="large" className="relative border-y border-gray-100">
        <div className="absolute top-0 right-0 w-64 h-64 bg-college-gold/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-college-navy/5 rounded-full blur-3xl"></div>

        <Section.Header
          title="Programs We Offer"
          badge="Academic Excellence"
          description="Explore our comprehensive range of academic programs across all campuses"
          className="relative z-10"
        />

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto relative z-10 mt-10">
          {programs.map((programCategory, idx) => {
            const icons = [GraduationCap, BookOpen, Library];
            const Icon = icons[idx] || GraduationCap;

            return (
              <Card
                key={programCategory.category}
                hover
                variant="accent"
                padding={false}
                className="overflow-hidden group flex flex-col shadow-md hover:shadow-xl bg-white"
              >
                <div className="h-2 bg-gradient-to-r from-college-gold to-yellow-400 w-full md:w-0 group-hover:w-full transition-all duration-500 ease-out"></div>

                <Card.Content className="p-8 flex-grow">
                  <div className="text-center mb-8 pb-6 border-b border-gray-100 group-hover:border-college-gold/20 transition-colors relative">
                    <h3 className="text-2xl font-serif font-bold text-college-navy group-hover:text-college-gold transition-colors">
                      {programCategory.category}
                    </h3>
                  </div>
                  <ul className="space-y-4">
                    {programCategory.courses.map((course, cIdx) => (
                      <li key={cIdx} className="flex items-start gap-3 text-gray-700 text-sm font-medium group/item">
                        <CheckCircle2 className="w-5 h-5 text-college-gold opacity-50 group-hover/item:opacity-100 flex-shrink-0 transition-opacity" />
                        <span className="group-hover/item:text-college-navy transition-colors">{course}</span>
                      </li>
                    ))}
                  </ul>
                </Card.Content>
                <div className="p-4 bg-gray-50 border-t border-gray-100 text-center">
                  <span className="text-xs font-bold text-college-navy uppercase tracking-widest group-hover:text-college-gold transition-colors">View Details</span>
                </div>
              </Card>
            );
          })}
        </div>
      </Section>

      {/* Requirements Section */}
      <Section id="requirements" background="navy" spacing="large" className="relative border-y-4 border-college-gold overflow-hidden">

        <Section.Header
          title="Admission Requirements"
          badge="What You Need"
          description="Ensure you have all the necessary documents and meet the eligibility criteria before applying."
          light={true}
          className="relative z-10"
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 relative z-10 max-w-7xl mx-auto mt-10">
          {/* Required Documents */}
          <Card variant="glass" className="h-full p-8 border-t-4 border-t-college-gold bg-white/5 backdrop-blur-lg hover:bg-white/10 transition-colors shadow-2xl">
            <div className="flex items-center gap-4 mb-8 pb-6 border-b border-white/10">

              <div>
                <h3 className="text-2xl font-serif font-bold text-white mb-1">Required Documents</h3>
                <p className="text-college-gold text-xs uppercase tracking-widest font-bold">What you need to submit</p>
              </div>
            </div>

            <ul className="space-y-6">
              {requirements.documents.map((doc, idx) => (
                <li key={idx} className="flex items-start gap-4 group/doc">
                  <div className="w-8 h-8 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-college-gold group-hover/doc:bg-college-gold group-hover/doc:text-college-navy group-hover/doc:scale-110 transition-all duration-300 flex-shrink-0 shadow-lg">
                    <span className="text-sm font-bold">{idx + 1}</span>
                  </div>
                  <p className="text-white/90 text-base flex-1 pt-1 group-hover/doc:text-white font-light tracking-wide transition-colors">
                    {doc}
                  </p>
                </li>
              ))}
            </ul>
          </Card>

          {/* Eligibility Criteria */}
          <Card variant="glass" className="h-full p-8 border-t-4 border-t-college-gold bg-white/5 backdrop-blur-lg hover:bg-white/10 transition-colors shadow-2xl">
            <div className="flex items-center gap-4 mb-8 pb-6 border-b border-white/10">
              <div>
                <h3 className="text-2xl font-serif font-bold text-white mb-1">Eligibility Criteria</h3>
                <p className="text-college-gold text-xs uppercase tracking-widest font-bold">Requirements you must meet</p>
              </div>
            </div>

            <ul className="space-y-6">
              {requirements.eligibility.map((criteria, idx) => (
                <li key={idx} className="flex items-start gap-4 group/crit">
                  <div className="mt-1 w-6 h-6 rounded-full bg-college-gold/20 flex items-center justify-center text-college-gold group-hover/crit:scale-125 group-hover/crit:bg-college-gold group-hover/crit:text-college-navy transition-all duration-300 flex-shrink-0">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <p className="text-white/90 text-base flex-1 pt-0.5 group-hover/crit:text-white font-light tracking-wide transition-colors">
                    {criteria}
                  </p>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </Section>

      {/* Application Form Layer */}
      <Section id="apply-now" background="gray" spacing="large">
        <Section.Header
          title="Apply Online"
          badge="Application Form"
          description="Take the first step towards your vibrant future by filling out the form below."
        />
        <div className="relative mt-10">
          {/* Decorative background elements for form */}
          <div className="absolute -top-10 -left-10 w-40 h-40 bg-college-gold/10 rounded-full blur-2xl pointer-events-none"></div>
          <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-college-navy/10 rounded-full blur-2xl pointer-events-none"></div>

          <div className="relative z-10">
            <AdmissionForm />
          </div>
        </div>
      </Section>

      {/* Contact CTA */}
      <CTA
        variant="navy"
        badge="Need Assistance?"
        title={<>We're Here to Help With Your <span className="text-college-gold">Application</span></>}
        description="Our dedicated admissions team is available to assist you with any questions about programs, requirements, or the application process."
        className="border-t border-white/10"
      >
        <PublicButton
          to="tel:+92511234567"
          variant="secondary"
          size="md"
          icon={Phone}
          className="rounded-full shadow-lg hover:scale-105 transition-transform"
        >
          Call Us: +92 51 1234 567
        </PublicButton>

        <PublicButton
          to="mailto:admissions@bestcolleges.edu.pk"
          variant="outline"
          size="md"
          icon={Mail}
          className="bg-white/5 border-white/20 text-white hover:bg-white hover:text-college-navy rounded-full backdrop-blur-sm shadow-lg hover:scale-105 transition-transform"
        >
          Email Us: admissions@bestcolleges.edu.pk
        </PublicButton>
      </CTA>
    </div>
  );
};

export default Admissions;
