import { useState, useEffect } from "react";
import { useAdminContext } from "../../../context/AdminContext";
import { useNavigate, useParams, Link, useLocation } from "react-router-dom";
import PublicButton from "../../../components/shared/PublicButton";
import FormInput from "../../../components/admin/FormInput.jsx";
import {
  MapPin,
  ArrowLeft,
  Save,
  Trash2,
  School
} from "lucide-react";

const EditCampus = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { campuses, isDarkMode } = useAdminContext();
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    code: "",
    location: "",
    contact: {
      phone: "",
      email: "",
      website: ""
    },
    dean: "",
    established: ""
  });

  useEffect(() => {
    // If campus data was passed via navigation state, use it
    if (location.state?.campus) {
      const { campus } = location.state;
      setForm({
        name: campus.name || "",
        code: campus.code || "",
        location: campus.location || "",
        contact: {
          phone: campus.contact?.phone || "",
          email: campus.contact?.email || "",
          website: campus.contact?.website || ""
        },
        dean: campus.dean || "",
        established: campus.established || ""
      });
    } else {
      // Fallback: finding campus from context if direct access via URL
      const foundCampus = campuses.find(c => c.id === id);
      if (foundCampus) {
        setForm({
          name: foundCampus.name || "",
          code: foundCampus.code || "",
          location: foundCampus.location || "",
          contact: {
            phone: foundCampus.contact?.phone || "",
            email: foundCampus.contact?.email || "",
            website: foundCampus.contact?.website || ""
          },
          dean: foundCampus.dean || "",
          established: foundCampus.established || ""
        });
      }
    }
  }, [id, location.state, campuses]);

  const handleChange = (key, value) => {
    if (key.includes('.')) {
      const [parent, child] = key.split('.');
      setForm(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setForm(prev => ({ ...prev, [key]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      alert(`Campus ${form.name} updated successfully!`);
      navigate("/admin/campus");
    }, 1000);
  };

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete ${form.name}? This cannot be undone.`)) {
      alert("Campus deleted successfully");
      navigate("/admin/campus");
    }
  };

  return (
    <div className="w-full mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Link
            to="/admin/campus"
            className="p-2 hover:bg-white/50 rounded-full transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-college-navy dark:text-college-gold">Edit Campus</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">Update campus details and configuration</p>
          </div>
        </div>
        <PublicButton
          onClick={handleDelete}
          variant="danger"
          size="sm"
          icon={Trash2}
        >
          Delete Campus
        </PublicButton>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <section className="bg-white/80 dark:bg-college-navy/60 backdrop-blur-xl border border-white/20 dark:border-college-gold/20 p-6 rounded-2xl shadow-sm space-y-6">
          <div className="flex items-center gap-2 mb-2 pb-4 border-b border-gray-100 dark:border-college-gold/20">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white">Basic Information</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="col-span-1 md:col-span-2">
              <FormInput
                label="Campus Name"
                value={form.name}
                onChange={(val) => handleChange("name", val)}
                required
              />
            </div>

            <div>
              <FormInput
                label="Campus Code"
                value={form.code}
                onChange={(val) => handleChange("code", val)}
                required
              />
            </div>

            <div>
              <FormInput
                label="Established Year"
                value={form.established}
                onChange={(val) => handleChange("established", val)}
                placeholder="e.g. 1995"
              />
            </div>
          </div>
        </section>

        {/* Contact & Location */}
        <section className="bg-white/80 dark:bg-college-navy/60 backdrop-blur-xl border border-white/20 dark:border-college-gold/20 p-6 rounded-2xl shadow-sm space-y-6">
          <div className="flex items-center gap-2 mb-2 pb-4 border-b border-gray-100 dark:border-college-gold/20">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white">Contact & Location</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="col-span-1 md:col-span-2">
              <FormInput
                label="Address / Location"
                value={form.location}
                onChange={(val) => handleChange("location", val)}
              />
            </div>

            <div>
              <FormInput
                label="Phone Number"
                type="tel"
                value={form.contact.phone}
                onChange={(val) => handleChange("contact.phone", val)}
              />
            </div>

            <div>
              <FormInput
                label="Email Address"
                type="email"
                value={form.contact.email}
                onChange={(val) => handleChange("contact.email", val)}
              />
            </div>
          </div>
        </section>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-3 md:gap-4 pt-4">
          <PublicButton variant="primary" onClick={() => navigate("/admin/campus")} className="border-2 border-white/10">
            Cancel
          </PublicButton>
          <PublicButton
            variant={isDarkMode ? "secondary" : "primary"}
            type="submit"
            shape="slanted"
            className="px-8 font-bold transform hover:-translate-y-0.5"
            icon={Save}
          >
            Save Changes
          </PublicButton>
        </div>
      </form>
    </div>
  );
};

export default EditCampus;
