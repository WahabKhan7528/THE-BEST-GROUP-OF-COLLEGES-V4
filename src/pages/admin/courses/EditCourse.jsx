import { useParams, Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import PublicButton from "../../../components/shared/PublicButton";
import { useAdminContext } from "../../../context/AdminContext";
import FormInput from "../../../components/admin/FormInput";
import {
  ArrowLeft,
  BookOpen,
  FileText,
  Building2,
  CheckCircle2,
  Trash2,
  Info,
  Save
} from "lucide-react";

const EditCourse = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { campuses } = useAdminContext();
  const [form, setForm] = useState({
    title: "BS Computer Science",
    duration: "4 years",
    eligibility: "Intermediate",
    examSystem: "semester",
    description: "A four-year program focusing on computing fundamentals.",
    offeredAt: ["main", "law"],
  });
  const [selectedCampuses, setSelectedCampuses] = useState(form.offeredAt);

  const handleChange = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleCampusToggle = (campusId) => {
    setSelectedCampuses((prev) =>
      prev.includes(campusId)
        ? prev.filter((id) => id !== campusId)
        : [...prev, campusId],
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedCampuses.length === 0) {
      alert("Please select at least one campus where this course will be offered");
      return;
    }
    // const campusNames = selectedCampuses
    //   .map((cId) => campuses.find((c) => c.id === cId)?.name)
    //   .join(", ");
    // alert(`Course ${id} updated and offered at: ${campusNames} (mock)`);
    navigate("/admin/courses");
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link
          to="/admin/courses"
          className="p-2 hover:bg-white/50 rounded-full transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-gray-600" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-college-navy dark:text-college-gold">Edit Course</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">Update course details and availability</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Info Section */}
        <section className="bg-white/80 dark:bg-college-navy/60 backdrop-blur-xl border border-white/20 dark:border-college-gold/20 p-6 rounded-2xl shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-gray-100 dark:border-college-gold/20 pb-3">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-blue-600 dark:text-college-gold" />
              Course Information
            </h2>
            <span className="px-2.5 py-1 bg-blue-50 dark:bg-college-gold/10 text-blue-700 dark:text-college-gold text-xs font-medium rounded-lg border border-blue-100 dark:border-college-gold/20">
              ID: {id}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <FormInput
                label="Course Title"
                value={form.title}
                onChange={(val) => handleChange("title", val)}
                placeholder="e.g. BS Computer Science"
                required
              />
            </div>

            <div>
              <FormInput
                label="Duration"
                value={form.duration}
                onChange={(val) => handleChange("duration", val)}
                placeholder="e.g. 4 Years"
              />
            </div>

            <div>
              <FormInput
                label="Eligibility"
                value={form.eligibility}
                onChange={(val) => handleChange("eligibility", val)}
                placeholder="e.g. Intermediate or A-Level"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1.5 flex items-center gap-2">
                <FileText className="w-4 h-4 text-gray-400 dark:text-college-gold" />
                Exam System
              </label>
              <select
                value={form.examSystem}
                onChange={(e) => handleChange("examSystem", e.target.value)}
                className="w-full px-4 py-2.5 bg-gray-50/50 dark:bg-college-navy/50 border border-gray-200 dark:border-college-gold/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-college-gold/20 focus:border-college-gold transition-all appearance-none dark:text-white"
              >
                <option value="annual">Annual</option>
                <option value="semester">Semester</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1.5 flex items-center gap-2">
                <Info className="w-4 h-4 text-gray-400 dark:text-college-gold" />
                Course Description
              </label>
              <textarea
                value={form.description}
                onChange={(e) => handleChange("description", e.target.value)}
                className="w-full px-4 py-3 bg-gray-50/50 dark:bg-college-navy/50 border border-gray-200 dark:border-college-gold/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-college-gold/20 focus:border-college-gold transition-all resize-y min-h-[100px] dark:text-white dark:placeholder-gray-500"
                placeholder="Write a brief overview of the course..."
              />
            </div>
          </div>
        </section>

        {/* Campus Availability */}
        <section className="bg-white/80 dark:bg-college-navy/60 backdrop-blur-xl border border-white/20 dark:border-college-gold/20 p-6 rounded-2xl shadow-sm space-y-4">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white flex items-center gap-2">
            <Building2 className="w-5 h-5 text-college-gold" />
            Campus Availability
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {campuses.map((campus) => {
              const isSelected = selectedCampuses.includes(campus.id);
              return (
                <label
                  key={campus.id}
                  className={`
                      relative flex flex-col items-center justify-center p-4 rounded-xl border-2 cursor-pointer transition-all duration-200
                      ${isSelected
                      ? "border-college-gold bg-college-gold/5 dark:bg-college-gold/10 pt-6"
                      : "border-gray-100 dark:border-college-gold/20 bg-white dark:bg-college-navy hover:border-college-gold/30 hover:bg-gray-50 dark:hover:bg-college-navy/80"
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
        <div className="flex flex-col md:flex-row justify-between gap-4 pt-4">
          <button
            type="button"
            className="px-6 py-2.5 bg-rose-50 border border-rose-100 text-rose-600 font-medium rounded-xl hover:bg-rose-100 transition-colors flex items-center justify-center gap-2"
          >
            <Trash2 className="w-4 h-4" />
            Delete Course
          </button>

          <div className="flex gap-3">
            <PublicButton variant="secondary" to="/admin/courses">
              Cancel
            </PublicButton>
            <button
              type="submit"
              className="px-6 py-2.5 bg-college-navy hover:bg-college-navy/90 text-white font-semibold rounded-xl shadow-md transform hover:-translate-y-0.5 transition-all flex items-center justify-center"
            >
              Save Changes
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditCourse;
