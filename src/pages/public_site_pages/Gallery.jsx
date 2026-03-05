import { useState } from "react";
import { ChevronDown } from "lucide-react";

import Card from "../../components/public_site/Card";
import Section from "../../components/public_site/Section";
import Badge from "../../components/public_site/Badge";
import PublicButton from "../../components/shared/PublicButton";

import {
  galleryFilters as filters,
  galleryImages as images,
} from "../../data/galleryData";

const Gallery = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [visibleCount, setVisibleCount] = useState(9);

  const filteredImages =
    activeFilter === "all"
      ? images
      : images.filter((img) => img.category === activeFilter);

  const sortedImages = [...filteredImages].sort((a, b) => {
    if (sortBy === "newest") {
      return b.id - a.id;
    } else {
      return a.id - b.id;
    }
  });

  const displayedImages = sortedImages.slice(0, visibleCount);
  const hasMore = visibleCount < sortedImages.length;

  const loadMore = () => {
    setVisibleCount((prev) => prev + 9);
  };

  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Hero Section */}
      <Section background="navy" spacing="large">
        <div className="text-center max-w-4xl mx-auto">
          <Badge variant="soft" className="mb-6">Gallery</Badge>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6">
            Campus Photo <span className="text-college-gold">Gallery</span>
          </h1>
          <p className="text-xl text-white/80 leading-relaxed">
            Experience the vibrant life, stunning architecture, and memorable
            moments that define our community.
          </p>
        </div>
      </Section>

      {/* Filters and Sort */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Filter Tabs */}
            <div className="flex flex-wrap gap-3">
              {filters.map((filter) => {
                const isActive = activeFilter === filter.id;
                return (
                  <button
                    key={filter.id}
                    onClick={() => {
                      setActiveFilter(filter.id);
                      setVisibleCount(9);
                    }}
                    className={`px-6 py-2.5 rounded font-medium text-sm transition-all ${
                      isActive
                        ? "bg-college-gold text-college-navy"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {filter.name}
                  </button>
                );
              })}
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600 font-medium">
                Sort by:
              </span>
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none bg-white border border-gray-300 rounded px-4 py-2.5 pr-10 text-sm font-medium text-gray-700 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-college-gold cursor-pointer"
                >
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Gallery Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {displayedImages.map((image) => (
            <Card.Gallery
              key={image.id}
              src={image.src}
              alt={image.title}
              title={image.title}
              description={image.description}
            />
          ))}
        </div>

        {/* Load More Button */}
        {hasMore && (
          <div className="text-center">
            <PublicButton onClick={loadMore} variant="outline" size="md" className="px-8">
              Load More Photos
            </PublicButton>
          </div>
        )}

        {filteredImages.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">
              No photos found in this category.
            </p>
          </div>
        )}
      </main>

      {/* CTA Section */}
      <Section background="white" spacing="large" className="bg-college-gold">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-college-navy mb-4">
            Want to see it in person?
          </h2>
          <p className="text-college-navy/80 text-lg mb-8 max-w-2xl mx-auto">
            Schedule a campus tour today and experience the energy of our
            community firsthand. Our student ambassadors are ready to show you
            around.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <PublicButton to="/contact" variant="primary" size="lg">
              Book a Campus Tour
            </PublicButton>
            <PublicButton to="/admissions" variant="outline" size="lg">
              Download Prospectus
            </PublicButton>
          </div>
        </div>
      </Section>
    </div>
  );
};

export default Gallery;
