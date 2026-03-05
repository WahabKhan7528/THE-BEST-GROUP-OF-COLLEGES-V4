import { ArrowRight } from "lucide-react";
import PublicButton from "../../components/shared/PublicButton";
import CampusHero from "../../components/public_site/CampusHero";
import StatsGrid from "../../components/public_site/StatsGrid";
import Section from "../../components/public_site/Section";
import SectionHeader from "../../components/public_site/SectionHeader";
import Badge from "../../components/public_site/Badge";
import ProgramCard from "../../components/public_site/ProgramCard";
import FacilityCard from "../../components/public_site/FacilityCard";

import { programsData } from "../../data/programsData";
import { lawCampusStats as stats, lawFacilities as facilities } from "../../data/campusData";

const LawCampus = () => {
  const programs = programsData.law[0].items;

  return (
    <div className="min-h-screen bg-white font-sans overflow-x-hidden">
      <CampusHero title="Best Law College" image="/lawcampus.webp" />

      {/* Stats Overlay */}
      <div className="relative z-20 -mt-24 max-w-7xl mx-auto px-6">
        <div className="bg-white/80 backdrop-blur-xl border border-white/20 shadow-2xl rounded-xl p-2">
          <StatsGrid stats={stats} className="!py-8" />
        </div>
      </div>

      {/* Vision & Mission */}
      <Section variant="white" className="py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="mb-4">
              <Badge variant="outline" className="bg-college-navy/5 px-4 py-2">Legal Excellence</Badge>
            </div>
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6 text-college-navy leading-tight uppercase tracking-wide">
              Justice & <span className="text-college-gold underline decoration-college-gold/30 underline-offset-8">Leadership</span>
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-6 font-sans border-l-4 border-college-gold pl-6 py-2">
              To be a leading center for legal education that produces advocates of integrity,
              dedicated to the rule of law and social justice.
            </p>
            <div className="space-y-5">
              {[
                { title: "Advocacy & Ethics", desc: "Training the next generation of legal professionals with a focus on ethical practice." },
                { title: "Clinical Education", desc: "Hands-on experience through moot courts and legal aid clinics." },
              ].map((item) => (
                <div key={item.title} className="group">
                  <h4 className="font-serif font-bold text-xl text-college-navy mb-1">{item.title}</h4>
                  <p className="text-gray-500 leading-relaxed text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 bg-college-gold/10 rounded-2xl transform rotate-1 blur-sm" />
            <div className="relative border border-gray-100 shadow-2xl bg-white/95 backdrop-blur-md rounded-2xl p-8 md:p-10 overflow-hidden group">
              <div className="relative z-10">
                <div className="mb-6">
                  <Badge variant="gold" className="bg-college-navy text-college-gold px-4 py-1.5">Our Mission</Badge>
                </div>
                <h3 className="text-2xl md:text-3xl font-serif font-bold mb-6 text-college-navy leading-tight">
                  Defending Rights, <br />Building <span className="text-college-gold">Careers</span>
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed text-base font-sans">
                  Providing a rigorous legal education that combines theoretical knowledge with
                  practical skills to serve the legal needs of our society.
                </p>
                <div className="flex justify-start">
                  <PublicButton to="/campuses/law/academics" variant="primary" size="lg" icon={ArrowRight} className="rounded shadow-xl">
                    View Law Programs
                  </PublicButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Programs */}
      <Section variant="gray" className="py-12 md:py-16">
        <SectionHeader
          badge="Academia"
          title="Legal Programs"
          description="Our specialized law programs are designed to provide a comprehensive understanding of the legal system."
          variant="light"
          centered
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {programs.map((program) => (
            <ProgramCard key={program.title} program={program} />
          ))}
        </div>
      </Section>

      {/* Facilities */}
      <Section variant="white" className="py-12 md:py-16">
        <SectionHeader
          badge="Facilities"
          title="Professional Infrastructure"
          description="Specialized facilities designed to simulate real-world legal environments."
          variant="light"
          centered
        />
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {facilities.map((facility) => (
            <FacilityCard key={facility.title} facility={facility} />
          ))}
        </div>
      </Section>

      {/* Epic CTA */}
      <section className="relative overflow-hidden bg-college-navy text-white text-center py-16 md:py-20 flex items-center justify-center">
        <div className="absolute inset-0 opacity-10">
          <img src="/lawcampus.webp" className="w-full h-full object-cover filter grayscale" alt="Campus" />
        </div>
        <div className="absolute inset-0 bg-college-navy/80 backdrop-blur-[2px]" />
        <div className="relative z-10 max-w-4xl mx-auto px-6">
          <Badge variant="gold" className="mb-6 px-5 py-1.5">ADMISSIONS IN PROGRESS</Badge>
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6 text-white leading-none uppercase tracking-tighter">
            Your Path to <br /> <span className="text-college-gold">Justice</span>
          </h2>
          <p className="text-lg md:text-xl text-white/70 mb-8 leading-relaxed max-w-2xl mx-auto font-sans">
            Join Pakistan's premier law college and embark on a journey to
            become a defender of truth and a leader in the legal fraternity.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <PublicButton to="/admissions" variant="secondary" size="lg" className="rounded px-10 py-4 shadow-2xl hover:scale-105 active:scale-95 transition-all text-base tracking-widest">
              ENROLL NOW
            </PublicButton>
            <PublicButton to="/contact" variant="outline" size="lg" className="!border-white !text-white hover:!bg-white hover:!text-college-navy rounded px-10 py-4 text-base tracking-widest font-black">
              GET IN TOUCH
            </PublicButton>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LawCampus;