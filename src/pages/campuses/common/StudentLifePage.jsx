import Section from "../../../components/public_site/Section";
import Card from "../../../components/public_site/Card";
import Badge from "../../../components/public_site/Badge";
import PublicButton from "../../../components/shared/PublicButton";
import GSAPReveal from "../../../components/shared/GSAPReveal";

const societies = [
  {
    name: "Debating Club",
    description:
      "Sharpen your public speaking and argumentation skills. Join us for weekly debates and national competitions.",
    members: "120+",
    meeting: "Fridays, 4 PM",
  },
  {
    name: "Literary Society",
    description:
      "A haven for book lovers, writers, and poets. We organize poetry slams, book readings, and writing workshops.",
    members: "150+",
    meeting: "Wednesdays, 3 PM",
  },
  {
    name: "Arts & Culture",
    description:
      "Celebrating creativity through painting, drama, and photography. Showcase your talent in our annual exhibitions.",
    members: "200+",
    meeting: "Tuesdays, 2 PM",
  },
  {
    name: "Sports Committee",
    description:
      "Promoting physical fitness and team spirit. Organizing inter-departmental leagues and sports galas.",
    members: "300+",
    meeting: "Daily Training",
  },
];

const campusHighlights = [
  { title: "Student Center" },
  { title: "Cafeteria" },
  { title: "Gymnasium" },
  { title: "Green Lawns" },
];

const StudentLifePage = () => {
  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Page Header */}
      <Section background="navy" spacing="small" className="pt-32 pb-20">
        <GSAPReveal>
          <div className="text-center max-w-4xl mx-auto">
            <Badge variant="soft" className="mb-6">
              Campus Life
            </Badge>
            <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-6 uppercase tracking-wider">
              Vibrant <span className="text-college-gold">Student Life</span>
            </h1>
            <p className="text-xl text-white/80 leading-relaxed">
              Step beyond the classroom and immerse yourself in a world of
              creativity, leadership, and community.
            </p>
          </div>
        </GSAPReveal>
      </Section>

      {/* Societies */}
      <Section spacing="standard" background="white">
        <GSAPReveal>
          <Section.Header
            title="Societies & Clubs"
            badge="Join the Community"
            description="Discover your passions and build lasting friendships through our diverse range of student-led organizations."
          />
        </GSAPReveal>

        <GSAPReveal stagger={0.15} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {societies.map((society) => (
            <Card
              key={society.name}
              hover
              className="h-full flex flex-col items-center text-center p-8 border-t-4 border-t-college-gold rounded-lg bg-white shadow-sm hover:shadow-2xl transition-all duration-500 group"
            >
              <h3 className="text-2xl font-serif font-bold mb-4 text-college-navy group-hover:text-college-gold transition-colors duration-300">{society.name}</h3>
              <p className="text-gray-600 text-sm mb-8 flex-grow leading-relaxed">{society.description}</p>

              <div className="w-full space-y-3 mt-auto">
                <div className="flex items-center justify-center gap-2 py-2 px-4 bg-college-navy/5 rounded-lg text-sm text-college-navy font-bold border border-college-navy/10">
                  {society.members} Members
                </div>
                <div className="flex items-center justify-center gap-2 py-2 px-4 bg-gray-50 rounded-lg text-xs text-gray-500 font-medium border border-gray-100">
                  {society.meeting}
                </div>
              </div>
            </Card>
          ))}
        </GSAPReveal>
      </Section>

      {/* Campus Highlights */}
      <Section background="navy" spacing="standard" className="py-24 md:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <GSAPReveal x={-50}>
            <div>
              <div className="mb-6">
                <Badge variant="soft">
                  Campus Vibes
                </Badge>
              </div>
              <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6 text-white leading-tight uppercase tracking-wider">
                A Campus <span className="text-college-gold">Full of Life</span>
              </h2>
              <div className="w-20 h-1 bg-college-gold mb-8" />
              <p className="text-white/80 text-lg leading-relaxed mb-8">
                From morning discussions in the green lawns to high-energy sports
                tournaments, our campus provides the perfect ecosystem for a
                balanced and fulfilling student experience.
              </p>
              <div className="grid grid-cols-2 gap-6 mb-10">
                {campusHighlights.map((highlight) => (
                  <div key={highlight.title} className="flex items-center gap-4 group">
                    <div className="p-3 rounded bg-white/10 group-hover:bg-college-gold transition-colors duration-300 flex-shrink-0">
                      <span className="w-6 h-6 block bg-college-gold group-hover:bg-college-navy rounded-sm" />
                    </div>
                    <span className="font-bold text-white text-base tracking-wide">{highlight.title}</span>
                  </div>
                ))}
              </div>
              <PublicButton
                to="/gallery"
                variant="outline"
                size="lg"
                className="!border-white !text-white hover:!bg-white hover:!text-college-navy font-bold rounded px-8 py-4"
              >
                View Gallery
              </PublicButton>
            </div>
          </GSAPReveal>

          <GSAPReveal x={50} stagger={0.2} className="grid grid-cols-2 gap-6">
            <div className="space-y-6">
              <div className="overflow-hidden rounded-lg shadow-2xl h-64">
                <img
                  src="https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&q=80&w=600"
                  alt="Campus Sports"
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                  loading="lazy"
                />
              </div>
              <div className="overflow-hidden rounded-lg shadow-2xl h-80">
                <img
                  src="https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&q=80&w=600"
                  alt="Campus Hall"
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                  loading="lazy"
                />
              </div>
            </div>
            <div className="space-y-6 pt-12">
              <div className="overflow-hidden rounded-lg shadow-2xl h-80">
                <img
                  src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=600"
                  alt="Campus Cafeteria"
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                  loading="lazy"
                />
              </div>
              <div className="overflow-hidden rounded-lg shadow-2xl h-64">
                <img
                  src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=600"
                  alt="Campus Event"
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                  loading="lazy"
                />
              </div>
            </div>
          </GSAPReveal>
        </div>
      </Section>
    </div>
  );
};

export default StudentLifePage;