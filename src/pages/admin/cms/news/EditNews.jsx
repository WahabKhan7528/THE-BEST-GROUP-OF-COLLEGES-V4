import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAdminContext } from "../../../../context/AdminContext";
import PublicButton from "../../../../components/shared/PublicButton";
import PortalForms from "../../../../components/shared/PortalForms";
import {
  Calendar,
  Newspaper,
  Image as ImageIcon,
  CheckCircle2,
  Save,
  Trash2,
  Upload
} from "lucide-react";

const EditNews = () => {
  const { id } = useParams();
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

  useEffect(() => {
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
    <PortalForms
      title="Edit Post"
      subtitle="Update communication details"
      backPath="/admin/cms/news"
      onSubmit={handleSubmit}
      onCancel={() => navigate("/admin/cms/news")}
      submitLabel="Save Changes"
      submitIcon={Save}
      headerActions={
        <PublicButton
          onClick={handleDelete}
          variant="danger"
          size="sm"
          icon={Trash2}
          type="button"
        >
          Delete Post
        </PublicButton>
      }
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Content Type Selection */}
          <PortalForms.Section className="!p-6">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white col-span-1 md:col-span-2 border-b border-gray-100 dark:border-college-gold/20 pb-2 mb-2">Content Type</h2>
            <div className="grid grid-cols-2 gap-4 col-span-1 md:col-span-2">
              <label
                className={`
                  relative flex flex-col items-center justify-center p-4 rounded-xl border-2 cursor-pointer transition-all duration-200
                  ${type === "news"
                    ? "bg-college-navy/5 border-college-navy dark:bg-college-gold/10 dark:border-college-gold shadow-sm"
                    : "bg-white border-gray-100 hover:border-college-navy/50 hover:bg-gray-50 dark:bg-college-navy/50 dark:border-college-gold/20 dark:hover:bg-college-navy/80"
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
                <Newspaper className={`w-6 h-6 mb-2 ${type === "news" ? "text-college-navy dark:text-college-gold" : "text-gray-400"}`} />
                <span className={`text-sm font-bold ${type === "news" ? "text-college-navy dark:text-college-gold" : "text-gray-600 dark:text-gray-400"}`}>News & Announcement</span>
                {type === "news" && <CheckCircle2 className="absolute top-2 right-2 w-4 h-4 text-college-gold" />}
              </label>

              <label
                className={`
                  relative flex flex-col items-center justify-center p-4 rounded-xl border-2 cursor-pointer transition-all duration-200
                  ${type === "event"
                    ? "bg-college-navy/5 border-college-navy dark:bg-college-gold/10 dark:border-college-gold shadow-sm"
                    : "bg-white border-gray-100 hover:border-college-navy/50 hover:bg-gray-50 dark:bg-college-navy/50 dark:border-college-gold/20 dark:hover:bg-college-navy/80"
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
                <Calendar className={`w-6 h-6 mb-2 ${type === "event" ? "text-college-navy dark:text-college-gold" : "text-gray-400"}`} />
                <span className={`text-sm font-bold ${type === "event" ? "text-college-navy dark:text-college-gold" : "text-gray-600 dark:text-gray-400"}`}>Event</span>
                {type === "event" && <CheckCircle2 className="absolute top-2 right-2 w-4 h-4 text-college-navy dark:text-college-gold" />}
              </label>
            </div>
          </PortalForms.Section>

          {/* Details Form */}
          <PortalForms.Section className="!p-6">
            <div className="col-span-1 md:col-span-2">
              <PortalForms.Input
                label="Title"
                value={form.title}
                onChange={(val) => handleChange("title", val)}
                placeholder="Enter post title"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">Subject Category</label>
              <select
                value={form.category}
                onChange={(e) => handleChange("category", e.target.value)}
                className="w-full px-4 py-3 bg-gray-50/50 dark:bg-college-navy/50 border border-gray-200 dark:border-college-gold/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-college-navy/20 dark:focus:ring-college-gold/20 focus:border-college-navy dark:focus:border-college-gold transition-all text-sm appearance-none dark:text-white"
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
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">Location</label>
                <div className="relative">
                  <input
                    type="text"
                    value={form.location}
                    onChange={(e) => handleChange("location", e.target.value)}
                    placeholder="Event Venue"
                    className="w-full px-4 py-3 bg-gray-50/50 dark:bg-college-navy/50 border border-gray-200 dark:border-college-gold/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-college-navy/20 dark:focus:ring-college-gold/20 focus:border-college-navy dark:focus:border-college-gold transition-all text-sm dark:text-white dark:placeholder-gray-500"
                  />
                </div>
              </div>
            )}

            <div className="col-span-1 md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                Description <span className="text-red-500">*</span>
              </label>
              <textarea
                value={form.description}
                onChange={(e) => handleChange("description", e.target.value)}
                rows={6}
                placeholder="Write the full content description here..."
                className="w-full px-4 py-3 bg-gray-50/50 dark:bg-college-navy/50 border border-gray-200 dark:border-college-gold/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-college-navy/20 dark:focus:ring-college-gold/20 focus:border-college-navy dark:focus:border-college-gold transition-all text-sm resize-none leading-relaxed dark:text-white dark:placeholder-gray-500"
                required
              />
            </div>
          </PortalForms.Section>
        </div>

        {/* Sidebar Column */}
        <div className="space-y-6">
          {/* Metadata */}
          <PortalForms.Section className="!p-6 !flex !flex-col !gap-4">
            <h3 className="text-sm font-semibold text-gray-800 dark:text-white flex items-center gap-2 !col-span-1 border-b border-gray-100 dark:border-college-gold/20 pb-2 mb-2">Publishing Details</h3>

            <div>
              <PortalForms.Input
                label="Date"
                type="date"
                value={form.date}
                onChange={(val) => handleChange("date", val)}
                required
              />
            </div>

            {type === "event" && (
              <div>
                <PortalForms.Input
                  label="Time"
                  type="time"
                  value={form.time}
                  onChange={(val) => handleChange("time", val)}
                />
              </div>
            )}

          </PortalForms.Section>

          {/* Cover Image */}
          <PortalForms.Section className="!p-6 !flex !flex-col !gap-4">
            <h3 className="text-sm font-semibold text-gray-800 dark:text-white flex items-center gap-2 !col-span-1 border-b border-gray-100 dark:border-college-gold/20 pb-2 mb-2">Cover Image</h3>

            <div className="relative border-2 border-dashed border-gray-200 dark:border-college-gold/30 rounded-xl p-6 hover:bg-gray-50 dark:hover:bg-college-navy/80 transition-colors group">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                id="image-upload"
              />
              <label htmlFor="image-upload" className="cursor-pointer flex flex-col items-center w-full">
                <div className="w-12 h-12 bg-college-gold/10 text-college-gold rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                  <Upload className="w-5 h-5" />
                </div>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-200">Click to replace</span>
                <span className="text-xs text-gray-400 mt-1">SVG, PNG, JPG (max 2MB)</span>
              </label>
            </div>
            {form.image && (
              <div className="bg-college-gold/10 text-college-navy dark:text-college-gold px-3 py-2 rounded-lg text-xs flex items-center gap-2">
                <span className="truncate">{form.image.name}</span>
              </div>
            )}
          </PortalForms.Section>
        </div>
      </div>
    </PortalForms>
  );
};

export default EditNews;
