import { useState } from "react";
import { Calendar, Clock, MapPin, ArrowRight, User, Mail } from "lucide-react";

import Card from "../../components/public_site/Card";
import Section from "../../components/public_site/Section";
import Badge from "../../components/public_site/Badge";
import PublicButton from "../../components/shared/PublicButton";

import { newsItems, events } from "../../data/newsEventsData";

const NewsAndEvents = () => {
  const [visibleNewsItems, setVisibleNewsItems] = useState(3);
  const [email, setEmail] = useState("");

  const handleLoadMoreNews = () => {
    setVisibleNewsItems((prev) => prev + 3);
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    // Handle newsletter subscription
    console.log("Subscribe:", email);
    setEmail("");
  };

  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Hero Section */}
      <Section background="navy" spacing="large">
        <div className="text-center max-w-4xl mx-auto">
          <Badge variant="soft" className="mb-6">News & Events</Badge>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6">
            Latest News <span className="text-college-gold">&</span> Events
          </h1>
          <p className="text-xl text-white/80 leading-relaxed">
            Stay updated with the vibrant life at our campuses. From academic
            breakthroughs to cultural festivities, discover what's happening at
            The Best Group of Colleges.
          </p>
        </div>
      </Section>

      {/* Main Content - Two Column Layout */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left Column - Campus News */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-serif font-bold text-gray-900">
                Campus News
              </h2>
            </div>

            <div className="space-y-8">
              {newsItems.slice(0, visibleNewsItems).map((news) => (
                <Card.News
                  key={news.id}
                  image={news.image}
                  title={news.title}
                  description={news.description}
                  date={news.date}
                  author={news.author}
                  category={news.category}
                  link={`/news/${news.id}`}
                  metaIcons={{ date: Calendar, author: User }}
                />
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
            <h2 className="text-3xl font-serif font-bold text-gray-900 mb-8">
              Upcoming Events
            </h2>

            <div className="space-y-6">
              {events.slice(0, 4).map((event) => (
                <Card.Event
                  key={event.id}
                  title={event.title}
                  description={event.description}
                  date={event.date}
                  time={event.time}
                  location={event.location}
                  status={event.status}
                  link={`/events/${event.id}`}
                  icons={{ time: Clock, location: MapPin }}
                />
              ))}
            </div>

            {/* Contact CTA */}
            <Card.CTA
              className="mt-8"
              title="Have Questions?"
              description="We're here to help! Reach out to us for inquiries, campus tours, or any information you need."
            >
              <PublicButton to="/contact#contact-form" variant="primary" size="sm">
                Contact Us
              </PublicButton>
            </Card.CTA>
          </div>
        </div>
      </main>
    </div>
  );
};

export default NewsAndEvents;
