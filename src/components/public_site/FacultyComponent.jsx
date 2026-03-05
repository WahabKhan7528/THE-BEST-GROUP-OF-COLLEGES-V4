import { useState, useMemo } from "react";
import {
  Search,
  Mail,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { facultyData } from "../../data/facultyMembersData";
import Card from "./Card";
import Section from "./Section";
import Badge from "./Badge";
import PublicButton from "../shared/PublicButton";

const FacultyComponent = ({ filterCampus }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCampus, setSelectedCampus] = useState(
    filterCampus || "All Campuses",
  );
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Get unique campuses
  const campuses = useMemo(() => {
    const camps = new Set(facultyData.map((f) => f.campus));
    return ["All Campuses", ...Array.from(camps)];
  }, []);

  // Filter faculty based on search and filters
  const filteredFaculty = useMemo(() => {
    return facultyData.filter((faculty) => {
      const matchesSearch =
        searchQuery === "" ||
        faculty.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faculty.designation.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCampus =
        selectedCampus === "All Campuses" || faculty.campus === selectedCampus;

      return matchesSearch && matchesCampus;
    });
  }, [searchQuery, selectedCampus]);

  // Pagination logic
  const totalPages = Math.ceil(filteredFaculty.length / itemsPerPage);
  const paginatedFaculty = filteredFaculty.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  // Reset to page 1 when filters change
  useMemo(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedCampus]);

  const getRoleBadgeColor = (designation) => {
    if (
      designation.toLowerCase().includes("dean") ||
      designation.toLowerCase().includes("hod")
    ) {
      return "bg-yellow-600";
    } else if (designation.toLowerCase().includes("professor emeritus")) {
      return "bg-purple-700";
    } else if (designation.toLowerCase().includes("professor")) {
      return "bg-college-navy";
    } else if (designation.toLowerCase().includes("head")) {
      return "bg-green-700";
    } else if (designation.toLowerCase().includes("senior lecturer")) {
      return "bg-teal-700";
    }
    return "bg-college-gold";
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Hero Section */}
      <Section background="navy" spacing="large">
        <div className="text-center max-w-4xl mx-auto">
          <Badge variant="soft" className="mb-6">Faculty</Badge>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6">
            Our Distinguished <span className="text-college-gold">Faculty</span>
          </h1>
          <p className="text-xl text-white/80 leading-relaxed">
            Meet the world-class educators and researchers shaping the future of
            our students across all campuses.
          </p>
        </div>
      </Section>

      {/* Search and Filters */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 w-full md:max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name or keyword..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-college-gold focus:border-transparent text-sm"
              />
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              {!filterCampus && (
                <select
                  value={selectedCampus}
                  onChange={(e) => setSelectedCampus(e.target.value)}
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-college-gold text-sm bg-white min-w-[180px]"
                >
                  {campuses.map((campus) => (
                    <option key={campus} value={campus}>
                      {campus}
                    </option>
                  ))}
                </select>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Faculty Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {paginatedFaculty.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">
              No faculty members found matching your criteria.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {paginatedFaculty.map((faculty) => (
              <Card.Profile
                key={faculty.id}
                image={faculty.image}
                name={faculty.name}
                role={faculty.education}
                description={
                  faculty.awards && faculty.awards.length > 0
                    ? `Research: ${faculty.awards.join(", ")}`
                    : undefined
                }
                badge={
                  <span className={`${getRoleBadgeColor(faculty.designation)} text-white px-3 py-1 text-xs font-bold uppercase tracking-wider rounded`}>
                    {faculty.designation}
                  </span>
                }
                email={faculty.email}
                link={`/faculty/${faculty.id}`}
              />
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className="w-10 h-10 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {[...Array(totalPages)].map((_, idx) => (
              <button
                key={idx + 1}
                onClick={() => setCurrentPage(idx + 1)}
                className={`w-10 h-10 rounded-lg border flex items-center justify-center font-medium transition-colors ${
                  currentPage === idx + 1
                    ? "bg-college-gold border-college-gold text-college-navy"
                    : "border-gray-300 hover:bg-gray-50"
                }`}
              >
                {idx + 1}
              </button>
            ))}

            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(totalPages, prev + 1))
              }
              disabled={currentPage === totalPages}
              className="w-10 h-10 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </main>

      {/* Call to Action */}
      <Section background="white" spacing="large" className="bg-college-gold">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-college-navy mb-4">
            Interested in Joining Our Faculty?
          </h2>
          <p className="text-college-navy/80 text-lg mb-8 max-w-2xl mx-auto">
            We are always looking for passionate educators and researchers to
            join our prestigious team. Check our current vacancies.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <PublicButton to="/careers" variant="primary" size="lg">
              View Vacancies
            </PublicButton>
            <PublicButton to="/contact" variant="outline" size="lg">
              Contact HR
            </PublicButton>
          </div>
        </div>
      </Section>
    </div>
  );
};

export default FacultyComponent;
