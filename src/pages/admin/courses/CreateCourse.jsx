import { useState } from "react";
import { useAdminContext } from "../../../context/AdminContext";
import { Link, useNavigate } from "react-router-dom";
import PublicButton from "../../../components/shared/PublicButton";
import FormInput from "../../../components/admin/FormInput.jsx";
import {
  ArrowLeft,
  BookOpen,
  FileText,
  Building2,
  CheckCircle2,
  Plus
} from "lucide-react";

const CreateCourse = () => {
  const navigate = useNavigate();
  const { campuses, isDarkMode } = useAdminContext();
  const [form, setForm] = useState({
    title: "",
    duration: "",
    eligibility: "",
    examSystem: "annual",
    description: "",
    offeredAt: [],
  });
  const [selectedCampuses, setSelectedCampuses] = useState([]);

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
    // alert(`Course created and offered at: ${campusNames} (mock)`);
    navigate("/admin/courses");
  };

  return (
    <div className="w-full mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link
          to="/admin/courses"
          className="p-2 hover:bg-white/50 rounded-full transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-gray-600" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-college-navy dark:text-white">Add New Course</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">Create a new academic program or course</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Info Section */}
        <section className="bg-white/80 dark:bg-college-navy backdrop-blur-xl border border-white/20 dark:border-college-gold/20 p-6 rounded-2xl shadow-sm space-y-6">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white flex items-center gap-2 border-b border-gray-100 dark:border-college-gold/20 pb-3">

            Course Information
          </h2>

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
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 flex items-center gap-2">
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
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Description</label>
              <textarea
                value={form.description}
                onChange={(e) => handleChange("description", e.target.value)}
                rows={4}
                className="w-full px-4 py-2.5 bg-gray-50/50 dark:bg-college-navy/50 border border-gray-200 dark:border-college-gold/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-college-gold/20 focus:border-college-gold transition-all resize-none dark:text-white dark:placeholder-gray-500"
                placeholder="Enter a brief description of the course..."
              />
            </div>
          </div>
        </section>

        {/* Campus Availability */}
        <section className="bg-white/80 dark:bg-college-navy backdrop-blur-xl border border-white/20 dark:border-college-gold/20 p-6 rounded-2xl shadow-sm space-y-4">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white flex items-center gap-2 border-b border-gray-100 dark:border-college-gold/20 pb-3">
            Campus Availability <span className="text-red-500 text-sm ml-1">*</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {campuses.map((campus) => {
              const isSelected = selectedCampuses.includes(campus.id);
              return (
                <div
                  key={campus.id}
                  onClick={() => handleCampusToggle(campus.id)}
                  className={`
                      relative p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 flex items-start gap-3
                      ${isSelected
                      ? 'border-college-gold bg-blue-50 shadow-sm dark:bg-college-gold/10 dark:border-college-gold'
                      : 'border-gray-100 bg-white hover:border-college-gold/30 hover:bg-gray-50 dark:bg-college-navy/50 dark:border-college-gold/20 dark:hover:bg-college-navy/80'
                    }
                    `}
                >
                  <div className={`p-2 rounded-lg ${isSelected ? 'bg-college-gold/10 text-college-gold' : 'bg-gray-100 text-gray-400 dark:bg-college-navy dark:text-gray-400'}`}>
                    <Building2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className={`font-semibold text-sm ${isSelected ? 'text-college-navy dark:text-college-gold' : 'text-college-navy dark:text-gray-300'}`}>
                      {campus.name}
                    </h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{campus.code}</p>
                  </div>
                  {isSelected && (
                    <CheckCircle2 className="absolute top-3 right-3 w-5 h-5 text-college-gold" />
                  )}
                </div>
              );
            })}
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1.5 mt-2">
            <CheckCircle2 className="w-3.5 h-3.5" />
            Select the campuses where this course will be offered.
          </p>
        </section>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-3 md:gap-4 pt-4">
          <PublicButton variant="primary" onClick={() => navigate("/admin/courses")} className="border-2 border-white/10" shape="slanted">
            Cancel
          </PublicButton>
          <PublicButton
            type="submit"
            variant={isDarkMode ? "secondary" : "primary"}
            shape="slanted"
            className="px-6 font-bold shadow-md transform hover:-translate-y-0.5 transition-all"
            icon={Plus}
          >
            Create Course
          </PublicButton>
        </div>
      </form>
    </div>
  );
};

export default CreateCourse;
