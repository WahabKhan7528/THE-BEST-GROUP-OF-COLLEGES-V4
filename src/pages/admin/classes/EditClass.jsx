import { useState, useEffect } from "react";
import { useAdminContext } from "../../../context/AdminContext";
import { useNavigate, Link, useParams } from "react-router-dom";
import PublicButton from "../../../components/shared/PublicButton";
import FormInput from "../../../components/admin/FormInput.jsx";
import {
  Building2,
  BookOpen,
  GraduationCap,
  ArrowLeft,
  CheckCircle2,
  Save,
  Trash2
} from "lucide-react";

const EditClass = () => {
  const { id } = useParams();
  const { campuses, currentAdmin, isSuperAdmin, isDarkMode } = useAdminContext();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    sections: "",
    subjects: "",
    faculty: "",
    campus: "",
  });

  useEffect(() => {
    // Mock fetch data
    setForm({
      name: "BSCS - 3rd Semester",
      sections: "A, B",
      subjects: "OS, DBMS, DSA",
      faculty: "Ahmed, Sara",
      campus: "main",
    });
  }, [id]);

  const handleChange = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.campus) {
      alert("Please select a campus");
      return;
    }
    alert(`Class ${id} updated successfully!`);
    navigate("/admin/classes");
  };

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this class?")) {
      alert(`Class ${id} deleted.`);
      navigate("/admin/classes");
    }
  };

  const getCampusLabel = () => {
    if (!isSuperAdmin) {
      return `${currentAdmin?.allocatedCampuses?.map((cId) => campuses.find((c) => c.id === cId)?.name).join(", ")}`;
    }
    return null;
  };

  return (
    <div className="w-full mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Link
            to="/admin/classes"
            className="p-2 hover:bg-white/50 rounded-full transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-college-navy dark:text-college-gold">Edit Class</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">Update class details and assignments</p>
          </div>
        </div>
        <PublicButton
          onClick={handleDelete}
          variant="danger"
          size="sm"
          icon={Trash2}
        >
          Delete Class
        </PublicButton>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Campus Selection Section */}
        <section className="bg-white/80 dark:bg-college-navy/60 backdrop-blur-xl border border-white/20 dark:border-college-gold/20 p-6 rounded-2xl shadow-sm space-y-4">
          <div className="flex items-center gap-2 mb-2">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white">Campus Allocation</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="col-span-1 md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                Select Campus <span className="text-red-500">*</span>
              </label>

              {isSuperAdmin ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {campuses.map((campus) => (
                    <label
                      key={campus.id}
                      className={`
                        relative flex flex-col items-center justify-center p-4 rounded-xl border-2 cursor-pointer transition-all duration-200
                        ${form.campus === campus.id
                          ? "bg-college-navy/5 border-college-navy dark:bg-college-gold/10 dark:border-college-gold shadow-sm"
                          : "bg-white border-gray-100 hover:border-college-navy/50 hover:bg-gray-50 dark:bg-college-navy/50 dark:border-college-gold/20 dark:hover:bg-college-navy/80"
                        }
                      `}
                    >
                      <input
                        type="radio"
                        name="campus"
                        value={campus.id}
                        checked={form.campus === campus.id}
                        onChange={(e) => handleChange("campus", e.target.value)}
                        className="sr-only"
                      />
                      <Building2 className={`w-6 h-6 mb-2 ${form.campus === campus.id ? 'text-college-navy dark:text-college-gold' : 'text-gray-400'}`} />
                      <span className={`text-sm font-bold text-center ${form.campus === campus.id ? 'text-college-navy dark:text-college-gold' : 'text-gray-600 dark:text-gray-400'}`}>
                        {campus.name}
                      </span>
                      <div className="absolute top-2 right-2 text-college-gold">
                        <CheckCircle2 className="w-4 h-4" />
                      </div>
                    </label>
                  ))}
                </div>
              ) : (
                <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-college-navy/50 border border-gray-200 dark:border-college-gold/20 rounded-xl text-gray-700 dark:text-gray-200">
                  <Building2 className="w-5 h-5 text-gray-400" />
                  <span className="font-medium">{getCampusLabel()}</span>
                  <span className="ml-auto text-xs bg-college-gold/10 text-college-navy dark:text-college-gold px-2 py-1 rounded-full">Automated Selection</span>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Class Details Section */}
        <section className="bg-white/80 dark:bg-college-navy/60 backdrop-blur-xl border border-white/20 dark:border-college-gold/20 p-6 rounded-2xl shadow-sm space-y-6">
          <div className="flex items-center gap-2 mb-2">

            <h2 className="text-lg font-semibold text-gray-800 dark:text-white">Academic Details</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="col-span-1 md:col-span-2">
              <FormInput
                label="Class Name"
                value={form.name}
                onChange={(val) => handleChange("name", val)}
                placeholder="e.g. BSCS - 3rd Semester"
                required
              />
            </div>

            <div>
              <FormInput
                label="Sections"
                value={form.sections}
                onChange={(val) => handleChange("sections", val)}
                placeholder="e.g. A, B, C (Comma separated)"
              />
            </div>

            <div>
              <FormInput
                label="Assign Faculty Lead"
                value={form.faculty}
                onChange={(val) => handleChange("faculty", val)}
                placeholder="e.g. Prof. Ahmed Raza"
              />
            </div>

            <div className="col-span-1 md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                Subjects
              </label>
              <div className="relative">

                <textarea
                  value={form.subjects}
                  onChange={(e) => handleChange("subjects", e.target.value)}
                  placeholder="e.g. Operating Systems, Data Structures, Linear Algebra..."
                  rows="3"
                  className="w-full pr-4 py-3 bg-gray-50/50 dark:bg-college-navy/50 border border-gray-200 dark:border-college-gold/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-college-gold/20 focus:border-college-gold transition-all resize-none dark:text-white dark:placeholder-gray-500"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-3 md:gap-4 pt-4">
          <PublicButton variant="primary" onClick={() => navigate("/admin/classes")} className="border-2 border-white/10">
            Cancel
          </PublicButton>
          <PublicButton
            type="submit"
            variant={isDarkMode ? "secondary" : "primary"}
            shape="slanted"
            className="px-8 font-bold shadow-md transform hover:-translate-y-0.5 transition-all"
            icon={Save}
          >
            Save Changes
          </PublicButton>
        </div>
      </form>
    </div>
  );
};

export default EditClass;
