import { useState, useEffect } from "react";
import { useAdminContext } from "../../../context/AdminContext";
import { useNavigate, Link, useParams } from "react-router-dom";
import PublicButton from "../../../components/shared/PublicButton";
import FormInput from "../../../components/admin/FormInput.jsx";
import {
  BookOpen,
  Hash,
  GraduationCap,
  Users,
  Building2,
  ArrowLeft,
  CheckCircle2,
  Save,
  Trash2
} from "lucide-react";

const EditSubject = () => {
  const { id } = useParams();
  const { campuses, isDarkMode } = useAdminContext();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    code: "",
    class: "",
    faculty: "",
    offeredAt: [],
  });

  useEffect(() => {
    // Mock fetch data
    setForm({
      name: "Operating Systems",
      code: "CS-312",
      class: "BSCS - 3rd Semester",
      faculty: "Prof. Ahmed Raza",
      offeredAt: ["main", "law"],
    });
  }, [id]);

  const handleChange = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleCampusToggle = (campusId) => {
    setForm((prev) => {
      const isSelected = prev.offeredAt.includes(campusId);
      return {
        ...prev,
        offeredAt: isSelected
          ? prev.offeredAt.filter((id) => id !== campusId)
          : [...prev.offeredAt, campusId],
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.offeredAt.length === 0) {
      alert("Please select at least one campus where this subject will be offered");
      return;
    }
    alert(`Subject ${id} updated successfully!`);
    navigate("/admin/subjects");
  };

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this subject?")) {
      alert(`Subject ${id} deleted.`);
      navigate("/admin/subjects");
    }
  };

  return (
    <div className="w-full mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Link
            to="/admin/subjects"
            className="p-2 hover:bg-white/50 rounded-full transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-college-navy dark:text-college-gold">Edit Subject</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">Update subject details and campus availability</p>
          </div>
        </div>
        <PublicButton
          onClick={handleDelete}
          variant="danger"
          size="sm"
          icon={Trash2}
        >
          Delete Subject
        </PublicButton>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Subject Details Section */}
        <section className="bg-white/80 dark:bg-college-navy/60 backdrop-blur-xl border border-white/20 dark:border-college-gold/20 p-6 md:p-8 rounded-2xl shadow-sm space-y-6">
          <div className="flex items-center gap-2 mb-2">

            <h2 className="text-lg font-semibold text-gray-800 dark:text-white">Subject Details</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="col-span-1 md:col-span-2">
              <FormInput
                label="Subject Name"
                value={form.name}
                onChange={(val) => handleChange("name", val)}
                required
                placeholder="e.g. Operating Systems"
              />
            </div>

            <div>
              <FormInput
                label="Subject Code"
                value={form.code}
                onChange={(val) => handleChange("code", val)}
                required
                placeholder="e.g. CS-312"
              />
            </div>

            <div>
              <FormInput
                label="Target Class"
                value={form.class}
                onChange={(val) => handleChange("class", val)}
                placeholder="e.g. BSCS - 3rd Semester"
              />
            </div>

            <div className="col-span-1 md:col-span-2">
              <FormInput
                label="Assign Faculty"
                value={form.faculty}
                onChange={(val) => handleChange("faculty", val)}
                placeholder="e.g. Prof. Ahmed Raza"
              />
            </div>

            <div className="col-span-1 md:col-span-2">
              <label className="block text-xs md:text-sm font-medium text-college-navy dark:text-gray-200 mb-1">
                Description
              </label>
              <textarea
                value={form.description}
                onChange={(e) => handleChange("description", e.target.value)}
                placeholder="Brief description of the subject..."
                rows="3"
                className="w-full p-4 bg-gray-50/50 dark:bg-college-navy/50 border border-gray-200 dark:border-college-gold/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-college-gold/20 focus:border-college-gold transition-all resize-none dark:text-white dark:placeholder-gray-500"
              />
            </div>
          </div>
        </section>

        {/* Campus Availability Section */}
        <section className="bg-white/80 dark:bg-college-navy/60 backdrop-blur-xl border border-white/20 dark:border-college-gold/20 p-6 md:p-8 rounded-2xl shadow-sm space-y-4">
          <div className="flex items-center gap-2 mb-2">

            <h2 className="text-lg font-semibold text-gray-800 dark:text-white">Campus Availability</h2>
          </div>

          <p className="text-sm text-gray-500 dark:text-gray-400 pb-2">
            Select the campuses where this subject will be offered.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {campuses.map((campus) => {
              const isSelected = form.offeredAt.includes(campus.id);
              return (
                <label
                  key={campus.id}
                  className={`
                      relative flex flex-col items-center justify-center p-6 rounded-xl border-2 cursor-pointer transition-all duration-200
                      ${isSelected
                      ? 'border-college-gold bg-blue-50 dark:bg-college-gold/10 dark:border-college-gold shadow-sm'
                      : 'border-gray-100 dark:border-college-gold/20 bg-white dark:bg-college-navy hover:border-college-gold/30 hover:bg-gray-50 dark:hover:bg-college-navy/80'
                    }
                    `}
                >
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => handleCampusToggle(campus.id)}
                    className="sr-only"
                  />
                  <Building2 className={`w-6 h-6 mb-2 ${isSelected ? 'text-college-gold' : 'text-gray-400'}`} />
                  <span className={`text-sm font-medium text-center ${isSelected ? 'text-college-navy dark:text-college-gold' : 'text-gray-600 dark:text-gray-400'}`}>
                    {campus.name}
                  </span>
                  {isSelected && (
                    <div className="absolute top-2 right-2 text-college-gold">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                  )}
                </label>
              );
            })}
          </div>
        </section>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-3 md:gap-4 pt-4 dark:border-college-gold/20">
          <PublicButton variant="primary" onClick={() => navigate("/admin/subjects")} className="border-2 border-white/10">
            Cancel
          </PublicButton>
          <PublicButton
            type="submit"
            variant={isDarkMode ? "secondary" : "primary"}
            shape="slanted"
            size="md"
            className="px-8 font-bold shadow-md transform hover:-translate-y-0.5"
            icon={Save}
          >
            Save Changes
          </PublicButton>
        </div>
      </form>
    </div >
  );
};

export default EditSubject;
