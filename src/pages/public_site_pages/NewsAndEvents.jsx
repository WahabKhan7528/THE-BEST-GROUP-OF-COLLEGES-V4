import { useState } from "react";
import { ArrowRight, User } from "lucide-react";
import PublicButton from "../../components/shared/PublicButton";
import PageHero from "../../components/public_site/PageHero";
import NewsCard from "../../components/public_site/NewsCard";
import EventCard from "../../components/public_site/EventCard";
import CTASection from "../../components/public_site/CTASection";
import Card from "../../components/public_site/Card";

import { newsItems, events } from "../../data/newsEventsData";

const NewsAndEvents = () => {
  const [visibleNewsItems, setVisibleNewsItems] = useState(3);

  const handleLoadMoreNews = () => {
    setVisibleNewsItems((prev) => prev + 3);
  };

  return (
    <div className="min-h-screen bg-white font-sans">
      <PageHero
        badge="News & Events"
        title="Latest News"
        highlightedWord="& Events"
        description="Stay updated with the vibrant life at our campuses. From academic breakthroughs to cultural festivities, discover what's happening at The Best Group of Colleges."
      />

      {/* Main Content - Two Column Layout */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left Column - Campus News */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-serif font-bold text-gray-900">Campus News</h2>
            </div>

            <div className="space-y-8">
              {newsItems.slice(0, visibleNewsItems).map((news) => (
                <NewsCard key={news.id} news={news} />
              ))}
            </div>

            {visibleNewsItems < newsItems.length && (
              <div className="mt-8 text-center">
                <PublicButton onClick={handleLoadMoreNews} variant="outline" size="md" className="px-8">
                  Load More News
                </PublicButton>
              </div>
            )}
          </div>

          {/* Right Column - Upcoming Events */}
          <div className="lg:col-span-1">
            <h2 className="text-3xl font-serif font-bold text-gray-900 mb-8">Upcoming Events</h2>

            <div className="space-y-6">
              {events.slice(0, 4).map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>

            {/* Contact CTA */}
            <Card variant="" hover={false} className="bg-college-navy text-white text-center mt-8 p-6 md:p-8 rounded-lg">
              <h3 className="text-xl font-serif font-bold text-white mb-3">Have Questions?</h3>
              <p className="text-white/70 text-sm mb-6 leading-relaxed">We're here to help! Reach out to us for inquiries, campus tours, or any information you need.</p>
              <PublicButton to="/contact#contact-form" variant="secondary" className='w-60 h-10 hover:font-bold' shape="slanted">
                <span className="hover:scale-110 transition-all duration-300">Contact Us</span>
              </PublicButton>
            </Card>
          </div>
        </div>
      </main>

      <CTASection
        badge="Join the Conversation"
        title="Become Part of Our"
        highlightedWord="Community"
        description="We are more than just a college; we are a family. Stay connected through our social platforms and share your journey with us."
      >
        <PublicButton
          to="/contact"
          variant="secondary"
          size="md"
          icon={ArrowRight}
          className=""
          shape="slanted"
        >
          Share Your Story
        </PublicButton>
        <PublicButton
          to="/campuses/main/student-life"
          variant="outline"
          size="md"
          icon={User}
          className="border-2 border-white/10"
          shape="slanted"
        >
          Explore Student Life
        </PublicButton>
      </CTASection>
    </div>
  );
};

export default NewsAndEvents;
