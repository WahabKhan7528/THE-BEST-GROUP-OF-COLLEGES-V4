import Hero from "../../components/public_site/Hero";
import Section from "../../components/public_site/Section";
import Card from "../../components/public_site/Card";
import Badge from "../../components/public_site/Badge";
import PublicButton from "../../components/shared/PublicButton";
import Stats from "../../components/public_site/Stats";
import { ArrowRight } from "lucide-react";

import { programsData } from "../../data/programsData";
import { halaCampusStats as stats, halaFacilities as facilities } from "../../data/campusData";

const HalaCampus = () => {
  const programs = programsData.hala[0].items;

  return (
    <div className="min-h-screen bg-white font-sans overflow-x-hidden">
      {/* Immersive Hero */}
      <Hero
        title="Best Hala Campus"
        image="/halacampus.webp"
        minimal
      />

      {/* Stats Overlay */}
      <div className="relative z-20 -mt-24 max-w-7xl mx-auto px-6">
        <div className="bg-white/80 backdrop-blur-xl border border-white/20 shadow-2xl rounded-xl p-2">
          <Stats items={stats} variant="light" className="!py-8" />
        </div>
      </div>

      {/* Vision & Mission - Reimagined */}
      <Section spacing="standard" background="white" className="relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="mb-4">
              <Badge variant="soft" className="px-4 py-2">Regional Excellence</Badge>
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
                {
                  title: "Modern Pedagogy",
                  desc: "Interactive learning models tailored for the evolving job market.",
                },
                {
                  title: "Career Readiness",
                  desc: "Focused mentorship and internship programs for every student.",
                },
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
            <Card className="relative border border-gray-100 shadow-2xl bg-white/95 backdrop-blur-md rounded-2xl p-8 md:p-10 overflow-hidden group">
              <div className="relative z-10">
                <div className="mb-6">
                  <Badge variant="solid" className="bg-college-navy text-college-gold px-4 py-1.5">Our Vision</Badge>
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
            </Card>
          </div>
        </div>
      </Section>

      {/* Dynamic Programs Section */}
      <Section background="gray" spacing="standard" className="relative group/programs">
        <Section.Header
          title="Academic Excellence"
          badge="Programs"
          description="Explore our specialized programs designed to meet the unique needs of the Hala campus."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {programs.map((program) => (
            <Card
              key={program.title}
              hover
              className="group h-full border-t-4 border-t-college-gold rounded-lg bg-white shadow-lg hover:shadow-2xl transition-all duration-700 p-6 flex flex-col"
            >
              <div className="flex items-start justify-between mb-6">
                <Badge variant="outline" className="font-bold px-3 py-1 rounded uppercase tracking-tighter text-xs">
                  {program.duration} COURSE
                </Badge>
              </div>

              <h3 className="text-2xl font-serif font-bold mb-4 text-college-navy group-hover:text-college-gold transition-colors">{program.title}</h3>
              <p className="text-gray-500 text-base mb-6 flex-grow leading-relaxed font-sans">{program.description}</p>

              <div className="mt-auto pt-6 border-t border-gray-100 flex items-center justify-between">
                <span className="flex items-center text-xs font-black text-gray-300 uppercase tracking-[0.15em]">
                  {program.seats} SEATS REMAINING
                </span>
                <PublicButton to="/admissions" variant="primary" size="sm" className="rounded px-5 font-bold">
                  APPLY NOW
                </PublicButton>
              </div>
            </Card>
          ))}
        </div>
      </Section>

      {/* High-Impact Facilities */}
      <Section spacing="standard" background="white">
        <Section.Header
          title="Regional Hub"
          badge="Facilities"
          description="State-of-the-art facilities that bring city-standard education to the heart of Hala."
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {facilities.map((facility) => (
            <Card
              key={facility.title}
              hover
              className="h-full border border-gray-100 rounded-lg p-6 hover:-translate-y-2 transition-all duration-500 shadow-sm hover:shadow-xl group flex flex-col items-center text-center"
            >
              <h3 className="text-lg font-serif font-bold mb-3 text-college-navy uppercase tracking-tight">{facility.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed font-sans">{facility.description}</p>
            </Card>
          ))}
        </div>
      </Section>

      {/* Epic CTA */}
      <Section background="navy" spacing="small" className="relative py-16 md:py-20 flex items-center justify-center text-center">
        <div className="absolute inset-0 opacity-10">
          <img src="/halacampus.webp" className="w-full h-full object-cover filter grayscale" />
        </div>
        <div className="absolute inset-0 bg-college-navy/80 backdrop-blur-[2px]" />

        <div className="relative z-10 max-w-4xl mx-auto px-6">
          <Badge variant="soft" className="mb-6 px-5 py-1.5">ADMISSIONS OPEN FOR ALL</Badge>
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
            <PublicButton
              to="/contact"
              variant="outline"
              size="lg"
              className="!border-white !text-white hover:!bg-white hover:!text-college-navy rounded px-10 py-4 text-base tracking-widest font-black"
            >
              TALK TO US
            </PublicButton>
          </div>
        </div>
      </Section>
    </div>
  );
};

export default HalaCampus;