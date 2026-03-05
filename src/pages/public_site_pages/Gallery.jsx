import { useState } from "react";
import PublicButton from "../../components/shared/PublicButton";
import PageHero from "../../components/public_site/PageHero";
import FilterBar from "../../components/public_site/FilterBar";
import Card from "../../components/public_site/Card";
import CTASection from "../../components/public_site/CTASection";

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
      <PageHero
        badge="Gallery"
        title="Campus Photo"
        highlightedWord="Gallery"
        description="Experience the vibrant life, stunning architecture, and memorable moments that define our community."
      />

      <FilterBar
        filters={filters}
        activeFilter={activeFilter}
        onFilterChange={(id) => {
          setActiveFilter(id);
          setVisibleCount(9);
        }}
        sortBy={sortBy}
        onSortChange={setSortBy}
        sortOptions={[
          { value: "newest", label: "Newest First" },
          { value: "oldest", label: "Oldest First" },
        ]}
        isSticky={false}
      />

      {/* Gallery Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {displayedImages.map((image) => (
            <Card key={image.id} hover className="border-b-4 hover:border-b-college-gold group">
              <div className="relative h-64 overflow-hidden">
                <img src={image.src} alt={image.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-college-navy/90 via-college-navy/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                  <h3 className="text-white font-serif font-bold text-xl mb-1 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">{image.title}</h3>
                  <p className="text-white/80 text-sm translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">{image.description}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {hasMore && (
          <div className="text-center">
            <PublicButton onClick={loadMore} variant="outline" size="md" className="px-8">
              Load More Photos
            </PublicButton>
          </div>
        )}

        {filteredImages.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">No photos found in this category.</p>
          </div>
        )}
      </main>

      {/* CTA Section */}
      <CTASection
        title="Want to see it in person?"
        description="Schedule a campus tour today and experience the energy of our community firsthand. Our student ambassadors are ready to show you around."
        className="bg-college-gold text-college-navy"
      >
        <PublicButton to="/contact" variant="secondary" size="lg" shape="slanted">
          Book a Campus Tour
        </PublicButton>
        <PublicButton to="/admissions" variant="primary" size="lg" className="border-2 border-white/10" shape="slanted">
          Download Prospectus
        </PublicButton>
      </CTASection>
    </div>
  );
};

export default Gallery;
