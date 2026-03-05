import { useState, useEffect } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import PublicButton from "../../../../components/shared/PublicButton";
import FormInput from "../../../../components/admin/FormInput";
import {
  ArrowLeft,
  Calendar,
  Newspaper,
  Image as ImageIcon,
  MapPin,
  CheckCircle2,
  Save,
  Trash2,
  Upload,
  Megaphone
} from "lucide-react";

const EditNews = () => {
  const { id } = useParams();
  const navigate = useNavigate();
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

  useEffect(() => {
    // Mock fetch data
    if (id === 'n1' || id === 'n4') setType('event');
    else setType('news');

    setForm({
      title: id === 'n1' ? "Convocation 2025" : "Best Group Achieves Higher Accreditation",
      date: "2026-01-30",
      time: "10:00",
      location: "Main Auditorium",
      description: "Detailed description of the event...",
      category: "Academic",
      status: "Published",
      image: { name: "banner.jpg" },
    });
  }, [id]);

  const handleChange = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      handleChange("image", file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`${type === "news" ? "News" : "Event"} ${id} updated successfully!`);
    navigate("/admin/cms/news");
  };

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this post?")) {
      alert(`Post ${id} deleted.`);
      navigate("/admin/cms/news");
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Link
            to="/admin/cms/news"
            className="p-2 hover:bg-white/50 rounded-full transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-college-navy dark:text-college-gold tracking-tight">Edit Post</h1>
            <p className="text-gray-500 dark:text-gray-400 text-sm">Update communication details</p>
          </div>
        </div>
        <button
          onClick={handleDelete}
          className="flex items-center gap-2 px-4 py-2 bg-rose-50 text-rose-600 rounded-xl hover:bg-rose-100 hover:text-rose-700 transition-colors text-sm font-medium"
        >
          <Trash2 size={16} />
          Delete Post
        </button>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Content Type Selection */}
          <section className="bg-white/80 dark:bg-college-navy/60 backdrop-blur-xl border border-white/20 dark:border-college-gold/20 p-6 rounded-2xl shadow-sm">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Content Type</h2>
            <div className="grid grid-cols-2 gap-4">
              <label
                className={`
                  relative flex flex-col items-center justify-center p-4 rounded-xl border-2 cursor-pointer transition-all duration-200
                  ${type === "news"
                    ? 'border-blue-600 dark:border-college-gold bg-blue-50 dark:bg-college-gold/10'
                    : 'border-gray-100 dark:border-college-gold/20 bg-white dark:bg-college-navy hover:border-blue-200 dark:hover:border-college-gold/50 hover:bg-gray-50 dark:hover:bg-college-navy/80'
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
                <Newspaper className={`w-6 h-6 mb-2 ${type === "news" ? 'text-blue-600 dark:text-college-gold' : 'text-gray-400'}`} />
                <span className={`text-sm font-medium ${type === "news" ? 'text-blue-700 dark:text-college-gold' : 'text-gray-600 dark:text-gray-400'}`}>News & Announcement</span>
                {type === "news" && <CheckCircle2 className="absolute top-2 right-2 w-4 h-4 text-blue-600 dark:text-college-gold" />}
              </label>

              <label
                className={`
                  relative flex flex-col items-center justify-center p-4 rounded-xl border-2 cursor-pointer transition-all duration-200
                  ${type === "event"
                    ? 'border-primary-600 dark:border-college-gold bg-college-navy/5 dark:bg-college-gold/10'
                    : 'border-gray-100 dark:border-college-gold/20 bg-white dark:bg-college-navy hover:border-primary-200 dark:hover:border-college-gold/50 hover:bg-gray-50 dark:hover:bg-college-navy/80'
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
                <span className={`text-sm font-medium ${type === "event" ? 'text-college-navy dark:text-college-gold' : 'text-gray-600 dark:text-gray-400'}`}>Event</span>
                {type === "event" && <CheckCircle2 className="absolute top-2 right-2 w-4 h-4 text-college-gold" />}
              </label>
            </div>
          </section>

          {/* Details Form */}
          <section className="bg-white/80 dark:bg-college-navy/60 backdrop-blur-xl border border-white/20 dark:border-college-gold/20 p-6 rounded-2xl shadow-sm space-y-4">
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
                <label className="block text-sm font-medium text-gray-700 mb-2">Subject Category</label>
                <select
                  value={form.category}
                  onChange={(e) => handleChange("category", e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-college-gold/20 focus:border-college-gold transition-all text-sm appearance-none"
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
                  <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="text"
                      value={form.location}
                      onChange={(e) => handleChange("location", e.target.value)}
                      placeholder="Event Venue"
                      className="w-full pl-9 pr-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-college-gold/20 focus:border-college-gold transition-all text-sm"
                    />
                  </div>
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description <span className="text-red-500">*</span>
              </label>
              <textarea
                value={form.description}
                onChange={(e) => handleChange("description", e.target.value)}
                rows={6}
                placeholder="Write the full content description here..."
                className="w-full px-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-college-gold/20 focus:border-college-gold transition-all text-sm resize-none leading-relaxed"
                required
              />
            </div>
          </section>
        </div>

        {/* Sidebar Column */}
        <div className="space-y-6">
          {/* Metadata */}
          <section className="bg-white/80 dark:bg-college-navy/60 backdrop-blur-xl border border-white/20 dark:border-college-gold/20 p-6 rounded-2xl shadow-sm space-y-4">
            <h3 className="text-sm font-semibold text-gray-800 dark:text-white flex items-center gap-2">
              <Megaphone className="w-4 h-4 text-college-gold" />
              Publishing Details
            </h3>

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
                <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider mb-2 ml-1">
                  Event Date
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="date"
                    value={form.date}
                    onChange={(e) => handleChange("date", e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 dark:border-college-gold/20 dark:bg-college-navy/50 rounded-xl focus:outline-none focus:border-college-gold transition-all text-sm font-medium text-gray-700 dark:text-white"
                  />
                </div>
              </div>
            )}
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
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1.5 ml-1">
                Content
              </label>
              <textarea
                value={form.description}
                onChange={(e) => handleChange("description", e.target.value)}
                placeholder="Write the full content..."
                rows="6"
                className="w-full px-4 py-3 bg-white/50 dark:bg-college-navy/50 border border-gray-200 dark:border-college-gold/20 rounded-xl focus:outline-none focus:border-college-gold focus:bg-white dark:focus:bg-college-navy transition-all resize-y text-gray-700 dark:text-white dark:placeholder-gray-500"
                required
              />
            </div>
          </section>

          {/* Cover Image */}
          <section className="bg-white/80 dark:bg-college-navy/60 backdrop-blur-xl border border-white/20 dark:border-college-gold/20 p-6 rounded-2xl shadow-sm space-y-4">
            <h3 className="text-sm font-semibold text-gray-800 dark:text-white flex items-center gap-2">
              <ImageIcon className="w-4 h-4 text-college-gold" />
              Cover Image
            </h3>

            <div className="relative border-2 border-dashed border-gray-200 dark:border-college-gold/30 rounded-xl p-6 hover:bg-gray-50 dark:hover:bg-college-navy/80 transition-colors group">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                id="image-upload"
              />
              <label htmlFor="image-upload" className="cursor-pointer flex flex-col items-center w-full">
                <div className="w-12 h-12 bg-blue-50 dark:bg-college-gold/10 text-blue-600 dark:text-college-gold rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                  <Upload className="w-5 h-5" />
                </div>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-200">Click to replace</span>
                <span className="text-xs text-gray-400 mt-1">SVG, PNG, JPG (max 2MB)</span>
              </label>
            </div>
            {form.image && (
              <div className="bg-blue-50 dark:bg-college-gold/10 text-blue-700 dark:text-college-gold px-3 py-2 rounded-lg text-xs flex items-center gap-2">
                <ImageIcon className="w-3 h-3" />
                <span className="truncate">{form.image.name}</span>
              </div>
            )}
          </section>

          {/* Actions */}
          <div className="flex flex-col gap-3">
            <button
              type="submit"
              className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-college-navy hover:bg-college-navy/90 text-white font-semibold rounded-xl shadow-md transform hover:-translate-y-0.5 transition-all"
            >
              <Save size={18} />
              Save Changes
            </button>
            <PublicButton variant="secondary" onClick={() => navigate("/admin/cms/news")} className="w-full">
              Cancel
            </PublicButton>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditNews;
