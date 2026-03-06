import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import PublicButton from "../../../../components/shared/PublicButton";
import FormInput from "../../../../components/admin/FormInput.jsx";
import { useAdminContext } from "../../../../context/AdminContext";
import {
  ArrowLeft,
  Calendar,
  Newspaper,
  Image as ImageIcon,
  MapPin,
  CheckCircle2,
  Upload
} from "lucide-react";

const CreateNews = () => {
  const navigate = useNavigate();
  const { isDarkMode } = useAdminContext();
  const [type, setType] = useState("news");
  const [form, setForm] = useState({
    title: "",
    date: "",
    time: "",
    location: "",
    description: "",
    category: "",
    status: "Published",
    image: null,
  });

  const handleChange = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // alert(`${type === "news" ? "News" : "Event"} created (mock)`);
    navigate("/admin/cms/news");
  };

  return (
    <div className="w-full mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link
          to="/admin/cms/news"
          className="p-2 hover:bg-white/50 rounded-full transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-gray-600" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-college-navy dark:text-white">Create New Post</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">Share news, announcements, or schedule events</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Content Type Selection */}
          <section className="bg-white/80 dark:bg-college-navy backdrop-blur-xl border border-white/20 dark:border-college-gold/20 p-6 rounded-2xl shadow-sm">
            <h2 className="text-sm font-bold text-college-navy dark:text-college-gold uppercase tracking-wider mb-4">Content Type</h2>
            <div className="grid grid-cols-2 gap-4">
              <label
                className={`
                  relative flex flex-col items-center justify-center p-4 rounded-xl border-2 cursor-pointer transition-all duration-200
                  ${type === "news"
                    ? 'border-college-gold bg-college-gold/10 dark:bg-college-gold/20'
                    : 'border-gray-100 bg-white hover:border-college-gold/30 hover:bg-gray-50 dark:bg-college-navy/50 dark:border-college-gold/20 dark:hover:bg-college-navy/80'
                  }
                `}
              >
                <input
                  type="radio"
                  name="type"
                  value="news"
                  checked={type === "news"}
                  onChange={() => setType("news")}
                  className="sr-only"
                />
                <Newspaper className={`w-6 h-6 mb-2 ${type === "news" ? 'text-college-gold' : 'text-gray-400'}`} />
                <span className={`text-sm font-medium ${type === "news" ? 'text-college-navy dark:text-college-gold' : 'text-gray-600 dark:text-gray-300'}`}>News & Announcement</span>
                {type === "news" && <CheckCircle2 className="absolute top-2 right-2 w-4 h-4 text-college-gold" />}
              </label>

              <label
                className={`
                  relative flex flex-col items-center justify-center p-4 rounded-xl border-2 cursor-pointer transition-all duration-200
                  ${type === "event"
                    ? 'border-college-gold bg-college-gold/10 dark:bg-college-gold/20'
                    : 'border-gray-100 bg-white hover:border-college-gold/30 hover:bg-gray-50 dark:bg-college-navy/50 dark:border-college-gold/20 dark:hover:bg-college-navy/80'
                  }
                `}
              >
                <input
                  type="radio"
                  name="type"
                  value="event"
                  checked={type === "event"}
                  onChange={() => setType("event")}
                  className="sr-only"
                />
                <Calendar className={`w-6 h-6 mb-2 ${type === "event" ? 'text-college-gold' : 'text-gray-400'}`} />
                <span className={`text-sm font-medium ${type === "event" ? 'text-college-navy dark:text-college-gold' : 'text-gray-600 dark:text-gray-300'}`}>Event</span>
                {type === "event" && <CheckCircle2 className="absolute top-2 right-2 w-4 h-4 text-college-gold" />}
              </label>
            </div>
          </section>

          {/* Details Form */}
          <section className="bg-white/80 dark:bg-college-navy backdrop-blur-xl border border-white/20 dark:border-college-gold/20 p-6 rounded-2xl shadow-sm space-y-4">
            <div>
              <FormInput
                label="Title"
                value={form.title}
                onChange={(val) => handleChange("title", val)}
                placeholder="Enter post title"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Subject Category</label>
                <select
                  value={form.category}
                  onChange={(e) => handleChange("category", e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50/50 dark:bg-college-navy/50 border border-gray-200 dark:border-college-gold/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-college-gold/20 focus:border-college-gold transition-all text-sm appearance-none dark:text-white"
                >
                  <option value="" disabled>Select category</option>
                  <option value="Academic">Academic</option>
                  <option value="Sports">Sports</option>
                  <option value="Research">Research</option>
                  <option value="Cultural">Cultural</option>
                  <option value="Administration">Administration</option>
                </select>
              </div>

              {type === "event" && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Location</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="text"
                      value={form.location}
                      onChange={(e) => handleChange("location", e.target.value)}
                      placeholder="Event Venue"
                      className="w-full pl-9 pr-4 py-3 bg-gray-50/50 dark:bg-college-navy/50 border border-gray-200 dark:border-college-gold/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-college-gold/20 focus:border-college-gold transition-all text-sm dark:text-white dark:placeholder-gray-500"
                    />
                  </div>
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Description <span className="text-red-500">*</span>
              </label>
              <textarea
                value={form.description}
                onChange={(e) => handleChange("description", e.target.value)}
                rows={6}
                placeholder="Write the full content description here..."
                className="w-full px-4 py-3 bg-gray-50/50 dark:bg-college-navy/50 border border-gray-200 dark:border-college-gold/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-college-gold/20 focus:border-college-gold transition-all text-sm resize-none leading-relaxed dark:text-white dark:placeholder-gray-500"
                required
              />
            </div>
          </section>
        </div>

        {/* Sidebar Column */}
        <div className="space-y-6">
          {/* Publish Settings */}
          <section className="bg-white/80 dark:bg-college-navy backdrop-blur-xl border border-white/20 dark:border-college-gold/20 p-6 rounded-2xl shadow-sm space-y-4">
            <h3 className="text-sm font-semibold text-college-navy dark:text-college-gold uppercase tracking-wider">Publishing</h3>



            <div>
              <FormInput
                label="Date"
                type="date"
                value={form.date}
                onChange={(val) => handleChange("date", val)}
                required
              />
            </div>

            {type === "event" && (
              <div>
                <FormInput
                  label="Time"
                  type="time"
                  value={form.time}
                  onChange={(val) => handleChange("time", val)}
                />
              </div>
            )}
          </section>

          {/* Image Upload */}
          <section className="bg-white/80 dark:bg-college-navy backdrop-blur-xl border border-white/20 dark:border-college-gold/20 p-6 rounded-2xl shadow-sm space-y-4">
            <h3 className="text-sm font-semibold text-college-navy dark:text-college-gold uppercase tracking-wider">Featured Image</h3>

            <div className="border-2 border-dashed border-gray-300 dark:border-college-gold/30 rounded-xl p-6 flex flex-col items-center justify-center text-center hover:bg-gray-50 dark:hover:bg-college-navy/50 transition-colors cursor-pointer group dark:bg-college-navy/50">
              <input
                type="file"
                className="hidden"
                id="image-upload"
                onChange={(e) => handleChange("image", e.target.files?.[0])}
              />
              <label htmlFor="image-upload" className="cursor-pointer flex flex-col items-center w-full">
                <div className="w-12 h-12 bg-college-gold/10 text-college-gold rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                  <Upload className="w-5 h-5" />
                </div>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-200">Click to upload</span>
                <span className="text-xs text-gray-400 mt-1">SVG, PNG, JPG (max 2MB)</span>
              </label>
            </div>
            {form.image && (
              <div className="bg-college-gold/10 text-college-navy dark:text-college-gold px-3 py-2 rounded-lg text-xs flex items-center gap-2">
                <ImageIcon className="w-3 h-3" />
                <span className="truncate">{form.image.name}</span>
              </div>
            )}
          </section>

          {/* Actions */}
          <div className="flex flex-col gap-3">
            <PublicButton
              type="submit"
              variant={isDarkMode ? "secondary" : "primary"}
              shape="slanted"
              className="w-full font-bold shadow-md transform hover:-translate-y-0.5"
              icon={Upload}
            >
              Publish Post
            </PublicButton>
            <PublicButton variant="primary" onClick={() => navigate("/admin/cms/news")} className="w-full border-2 border-white/10">
              Cancel
            </PublicButton>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateNews;
