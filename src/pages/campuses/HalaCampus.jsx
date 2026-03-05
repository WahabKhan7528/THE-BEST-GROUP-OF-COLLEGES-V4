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
import { halaCampusStats as stats, halaFacilities as facilities } from "../../data/campusData";

const HalaCampus = () => {
  const programs = programsData.hala[0].items;

  return (
    <div className="min-h-screen bg-white font-sans overflow-x-hidden">
      <CampusHero title="Best Hala Campus" image="/halacampus.webp" />

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
              <Badge variant="outline" className="bg-college-navy/5 px-4 py-2">Regional Excellence</Badge>
            </div>
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6 text-college-navy leading-tight uppercase tracking-wide">
              Innovation & <span className="text-college-gold underline decoration-college-gold/30 underline-offset-8">Growth</span>
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-6 font-sans border-l-4 border-college-gold pl-6 py-2">
              Empowering the youth of Hala with world-class education and modern skills
              to drive regional development and personal success.
            </p>
            <div className="space-y-5">
              {[
                { title: "Modern Pedagogy", desc: "Interactive learning models tailored for the evolving job market." },
                { title: "Career Readiness", desc: "Focused mentorship and internship programs for every student." },
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
                  <Badge variant="gold" className="bg-college-navy text-college-gold px-4 py-1.5">Our Vision</Badge>
                </div>
                <h3 className="text-2xl md:text-3xl font-serif font-bold mb-6 text-college-navy leading-tight">
                  Bridging Gaps, <br />Building <span className="text-college-gold">Futures</span>
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed text-base font-sans">
                  To be a beacon of light in the region, providing accessible yet
                  premium education that transforms lives and communities.
                </p>
                <div className="flex justify-start">
                  <PublicButton to="/campuses/hala/academics" variant="primary" size="lg" icon={ArrowRight} className="rounded shadow-xl">
                    Explore Academics
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
          badge="Programs"
          title="Academic Excellence"
          description="Explore our specialized programs designed to meet the unique needs of the Hala campus."
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
          title="Regional Hub"
          description="State-of-the-art facilities that bring city-standard education to the heart of Hala."
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
          <img src="/halacampus.webp" className="w-full h-full object-cover filter grayscale" alt="Campus" />
        </div>
        <div className="absolute inset-0 bg-college-navy/80 backdrop-blur-[2px]" />
        <div className="relative z-10 max-w-4xl mx-auto px-6">
          <Badge variant="gold" className="mb-6 px-5 py-1.5">ADMISSIONS OPEN FOR ALL</Badge>
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6 text-white leading-none uppercase tracking-tighter">
            Elevate Your <br /> <span className="text-college-gold">Potential</span>
          </h2>
          <p className="text-lg md:text-xl text-white/70 mb-8 leading-relaxed max-w-2xl mx-auto font-sans">
            Experience premium education in your own city. Join Hala Campus and
            let's build a brighter future for the region together.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <PublicButton to="/admissions" variant="secondary" size="lg" className="rounded px-10 py-4 shadow-2xl hover:scale-105 active:scale-95 transition-all text-base tracking-widest">
              JOIN US
            </PublicButton>
            <PublicButton to="/contact" variant="outline" size="lg" className="!border-white !text-white hover:!bg-white hover:!text-college-navy rounded px-10 py-4 text-base tracking-widest font-black">
              TALK TO US
            </PublicButton>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HalaCampus;