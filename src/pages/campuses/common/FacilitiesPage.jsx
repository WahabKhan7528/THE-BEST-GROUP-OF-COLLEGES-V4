import Section from "../../../components/public_site/Section";
import Card from "../../../components/public_site/Card";
import Badge from "../../../components/public_site/Badge";
import PublicButton from "../../../components/shared/PublicButton";
import GSAPReveal from "../../../components/shared/GSAPReveal";

const facilitiesData = [
  {
    category: "Academic Infrastructure",
    badge: "Learning Spaces",
    description: "World-class learning environments designed to foster creativity and innovation.",
    items: [
      {
        name: "Smart Classrooms",
        description:
          "Air-conditioned classrooms equipped with multimedia projectors, smart boards, and high-speed internet to facilitate interactive learning.",
        image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=800",
      },
      {
        name: "Digital Libraries",
        description:
          "Access to thousands of e-books, journals, and research papers along with quiet study zones and discussion rooms.",
        image: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&q=80&w=800",
      },
      {
        name: "Science Labs",
        description:
          "State-of-the-art Physics, Chemistry, and Biology laboratories ensuring practical exposure for science students.",
        image: "https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&q=80&w=800",
      },
      {
        name: "Computer Centers",
        description:
          "Advanced computing facilities with the latest software development tools and high-performance workstations.",
        image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=800",
      },
    ],
  },
  {
    category: "Student Support & Services",
    badge: "Campus Life",
    description: "Ensuring a comfortable and holistic campus experience for every student.",
    items: [
      {
        name: "Cafeteria",
        description:
          "A hygienic and vibrant space serving nutritious meals and snacks. A perfect spot for students to socialize.",
        image: "https://images.unsplash.com/photo-1567529684892-09290a1b2d05?auto=format&fit=crop&q=80&w=800",
      },
      {
        name: "Sports Complex",
        description:
          "Indoor and outdoor sports facilities including cricket grounds, basketball courts, and a gymnasium.",
        image: "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&q=80&w=800",
      },
      {
        name: "Medical Centre",
        description:
          "On-campus medical assistance with qualified staff to handle health emergencies and routine checkups.",
        image: "https://images.unsplash.com/photo-1519494026892-50bb7a77a0cd?auto=format&fit=crop&q=80&w=800",
      },
      {
        name: "Transport Service",
        description:
          "Safe and reliable transport fleet covering all major routes of the city for students and faculty.",
        image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=800",
      },
    ],
  },
];

const FacilitiesPage = () => {
  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Page Header */}
      <Section background="navy" spacing="small" className="pt-32 pb-20">
        <GSAPReveal>
          <div className="text-center max-w-4xl mx-auto">
            <Badge variant="soft" className="mb-6">
              Facilities
            </Badge>
            <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-6 uppercase tracking-wider">
              World-Class <span className="text-college-gold">Facilities</span>
            </h1>
            <p className="text-xl text-white/80 leading-relaxed">
              We provide state-of-the-art infrastructure and services to ensure a
              conducive environment for both academic and personal growth.
            </p>
          </div>
        </GSAPReveal>
      </Section>

      {facilitiesData.map((category, catIdx) => (
        <Section
          key={category.category}
          background={catIdx % 2 === 0 ? "white" : "gray"}
          spacing="standard"
        >
          <GSAPReveal>
            <Section.Header
              title={category.category}
              badge={category.badge}
              description={category.description}
            />
          </GSAPReveal>

          <GSAPReveal stagger={0.2} className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {category.items.map((facility) => (
              <Card
                key={facility.name}
                hover
                padding={false}
                className="h-full overflow-hidden rounded-lg border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-500 group"
              >
                <div className="relative h-72 overflow-hidden">
                  <img
                    src={facility.image}
                    alt={facility.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-college-navy/60 flex items-end p-8">
                    <div className="text-white transform transition-transform duration-500 group-hover:-translate-y-2">
                      <h3 className="text-2xl md:text-3xl font-serif font-bold">{facility.name}</h3>
                    </div>
                  </div>
                </div>
                <div className="p-8">
                  <p className="text-gray-600 text-base leading-relaxed">{facility.description}</p>
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
              Experience It <span className="text-college-gold">Firsthand</span>
            </h2>
            <p className="text-lg text-white/80 mb-10 leading-relaxed font-sans">
              We invite you to visit our campus and see our facilities in person.
              Our admissions team is ready to show you around.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <PublicButton to="/contact" variant="secondary" size="lg" className="rounded px-8 py-4">
                Schedule a Visit
              </PublicButton>
              <PublicButton
                to="/admissions"
                variant="outline"
                size="lg"
                className="!border-white !text-white hover:!bg-white hover:!text-college-navy font-bold rounded px-8 py-4"
              >
                Apply for Admission
              </PublicButton>
            </div>
          </div>
        </GSAPReveal>
      </Section>
    </div>
  );
};

export default FacilitiesPage;