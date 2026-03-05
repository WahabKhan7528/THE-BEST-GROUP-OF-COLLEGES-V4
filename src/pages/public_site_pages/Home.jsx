import { useRef } from "react";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import Hero from "../../components/public_site/Hero";
import Section from "../../components/public_site/Section";
import Card from "../../components/public_site/Card";
import PublicButton from "../../components/shared/PublicButton";
import Stats from "../../components/public_site/Stats";
import Badge from "../../components/public_site/Badge";
import Faq from "../../components/public_site/Faq";
import ContactForm from "../../components/public_site/ContactForm";
import TestimonialCard from "../../components/public_site/TestimonialCard";

import {
  collegesData,
  testimonials,
  homeStats as stats,
  announcements,
} from "../../data/homeData";

const Home = () => {
  const containerRef = useRef(null);

  const scrollLeft = () => {
    if (!containerRef.current) return;
    containerRef.current.scrollBy({ left: -400, behavior: "smooth" });
  };

  const scrollRight = () => {
    if (!containerRef.current) return;
    containerRef.current.scrollBy({ left: 400, behavior: "smooth" });
  };

  return (
    <div className="flex flex-col min-h-screen bg-white font-sans">
      {/* Hero Section */}
      <Hero
        title="THE BEST GROUP OF COLLEGES"
        image="/maincampus.webp"
        announcements={announcements}
      />

      {/* Stats Section */}
      <section className="bg-gray-50 border-b border-gray-200">
        <Stats items={stats} />
      </section>

      {/* About Section */}
      <Section background="navy" spacing="large">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="grid grid-cols-2 gap-4 relative">
            <img
              src="/campus-hala.webp"
              alt="Campus Life"
              className="rounded-2xl shadow-md w-full h-48 md:h-64 object-cover transform translate-y-8"
              loading="lazy"
            />
            <img
              src="/maincampus.webp"
              alt="Main Campus"
              className="rounded-2xl shadow-md w-full h-48 md:h-64 object-cover"
              loading="lazy"
            />
            <img
              src="/Law.webp"
              alt="Law Campus"
              className="rounded-2xl shadow-md w-full h-48 md:h-64 object-cover transform translate-y-8"
              loading="lazy"
            />
            <div className="rounded-2xl shadow-md w-full h-48 md:h-64 bg-college-gold flex items-center justify-center p-6 text-center">
              <h4 className="text-college-navy font-serif font-bold text-xl md:text-2xl leading-tight">Empowering Leaders Since <span className="text-white">1985</span></h4>
            </div>
          </div>

          <div className="px-6 md:px-0 lg:pl-8">
            <div className="mb-4">
              <Badge variant="soft">About Us</Badge>
            </div>
            <h3 className="text-3xl md:text-5xl font-serif font-bold text-white mb-6 leading-tight">
              Excellence Since <span className="text-college-gold">1985</span>
            </h3>
            <p className="text-white/80 mb-6 leading-relaxed text-lg">
              Best Group of Colleges has been at the forefront of educational
              excellence for nearly four decades. Our commitment to academic
              rigor, student development, and community engagement has shaped
              thousands of successful careers.
            </p>
            <h4 className="text-2xl font-serif font-bold text-white mb-4">
              Dynamic Programs
            </h4>
            <p className="text-white/80 mb-8 leading-relaxed">
              With three dynamic campuses offering diverse programs from FSc
              to postgraduate studies, we provide a comprehensive educational
              ecosystem that nurtures talent.
            </p>

            <div className="flex justify-center md:justify-start">
              <PublicButton icon={ArrowRight} to="/about" variant="secondary" size="lg">
                Learn More About Us
              </PublicButton>
            </div>
          </div>
        </div>
      </Section>

      {/* Campuses Section */}
      <Section background="gray" spacing="large">
        <Section.Header
          title="Our Campuses"
          badge="Explore"
        />

        <div className="grid md:grid-cols-3 gap-8">
          {collegesData.map((college, index) => (
            <Card key={college.name} hover padding={false} className="flex flex-col group">
              {/* Top: Image */}
              <div className="relative h-56 overflow-hidden">
                <img
                  src={college.image}
                  alt={college.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>

              {/* Middle: Details */}
              <div className="p-8 flex-1 flex flex-col">
                <h3 className="text-2xl font-serif font-bold text-college-navy mb-4">
                  {college.name}
                </h3>

                <ul className="space-y-3 mb-8 flex-1">
                  {college.programs.slice(0, 4).map((program) => (
                    <li
                      key={program}
                      className="flex items-start text-gray-600 text-sm"
                    >
                      <span className="h-2 w-2 min-w-[8px] bg-college-gold rounded-full mr-3 mt-1.5" />
                      {program}
                    </li>
                  ))}
                  {college.programs.length > 4 && (
                    <li className="text-sm font-semibold text-college-navy italic">
                      + More Programs
                    </li>
                  )}
                </ul>

                {/* Bottom: Buttons */}
                <div className="grid grid-cols-2 gap-3 mt-auto">
                  <PublicButton
                    to={college.path}
                    variant="outline"
                    size="sm"
                  >
                    View Details
                  </PublicButton>
                  <PublicButton
                    to="/admissions"
                    variant="primary"
                    size="sm"
                  >
                    Apply Now
                  </PublicButton>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Section>

      {/* Testimonials Section */}
      <Section background="navy" spacing="large">
        <Section.Header
          title="What Our Students Say"
          badge="Testimonials"
          light={true}
          className="relative z-10"
        />

        <div className="relative z-10 max-w-6xl mx-auto">
          {/* Controls */}
          <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 flex justify-between z-20 pointer-events-none p-4">
            <PublicButton
              variant="primary"
              size="sm"
              onClick={scrollLeft}
              className="w-12 h-12 flex items-center justify-center bg-white/10 backdrop-blur border border-white/20 pointer-events-auto"
              aria-label="Previous testimonials"
            >
              <ChevronLeft className="w-6 h-6" />
            </PublicButton>
            <PublicButton
              variant="primary"
              size="sm"
              onClick={scrollRight}
              className="w-12 h-12 flex items-center justify-center bg-white/10 backdrop-blur border border-white/20 pointer-events-auto"
            >
              <ChevronRight className="w-6 h-6" />
            </PublicButton>
          </div>

          <div ref={containerRef} className="overflow-x-auto no-scrollbar scroll-smooth px-12 md:px-20 pb-10">
            <div className="flex items-stretch gap-8 w-max">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="w-[320px] md:w-[450px] flex h-auto">
                  <div className="flex-1 h-full">
                    <TestimonialCard
                      theme="dark"
                      name={testimonial.name}
                      role={testimonial.role}
                      content={testimonial.content}
                      image={testimonial.image}
                      className="h-full flex flex-col"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* Contact & FAQ Section */}
      <Section background="white" spacing="large">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left: Contact Form */}
          <div>
            <Section.Header
              title="Get in Touch"
              badge="Contact"
              center={false}
              className="!mb-8"
            />
            <ContactForm />
          </div>

          {/* Right: FAQ Accordions */}
          <div className="flex flex-col h-full">
            <Section.Header
              title="FAQ"
              badge="Questions"
              center={false}
              className="!mb-8"
            />
            <div className="flex-1 mt-8">
              <Faq limit={6} hideHeader={true} />
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
};

export default Home;
