import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PublicButton from "../../../components/shared/PublicButton";
import FormInput from "../../../components/admin/FormInput.jsx";
import { useAdminContext } from "../../../context/AdminContext";
import { ArrowLeft, Building2, Shield, User, Save, Trash2, X } from "lucide-react";

const EditUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { campuses, isDarkMode } = useAdminContext();
  const [role, setRole] = useState("Faculty");

  // Mock fetching user data based on ID
  useEffect(() => {
    // In a real app, fetch user data here
    if (id.startsWith("S-")) setRole("Student");
    else if (id.startsWith("F-")) setRole("Faculty");
    else if (id.startsWith("U-")) setRole("Sub-Admin");

    // Simulate loading data
    setForm({
      name: "Mock User Name",
      email: "mock@best.edu",
      id: id,
      department: "Computer Science",
      subjects: "Introduction to Programming",
      contact: "+92-300-1234567",
      campuses: ["main"],
      // Mock new fields
      program: "BSCS",
      semester: "5th",
      section: "A",
      enrollmentYear: "2023",
      designation: "Lecturer", // for faculty mock
      qualification: "MSCS", // for faculty mock
    });
    setSelectedCampuses(["main"]);
  }, [id]);

  const [form, setForm] = useState({
    name: "",
    email: "",
    id: "",
    department: "",
    subjects: "",
    contact: "",
    password: "",
    confirmPassword: "",
    campuses: [],
    // New fields
    program: "",
    semester: "",
    section: "",
    enrollmentYear: "",
    designation: "",
    qualification: "",
  });
  // Allocations for Faculty
  const [allocations, setAllocations] = useState([{ class: "BSCS-5A", subject: "Operating Systems" }]); // Mock initial data

  const handleAllocationChange = (index, field, value) => {
    const newAllocations = [...allocations];
    newAllocations[index][field] = value;
    setAllocations(newAllocations);
  };

  const addAllocation = () => {
    setAllocations([...allocations, { class: "", subject: "" }]);
  };

  const removeAllocation = (index) => {
    setAllocations(allocations.filter((_, i) => i !== index));
  };
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
    setForm((prev) => ({ ...prev, campuses: selectedCampuses }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validation logic here
    alert(`User ${id} updated successfully!`);
    navigate("/admin/users");
  };

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this user? This action cannot be undone.")) {
      alert(`User ${id} deleted.`);
      navigate("/admin/users");
    }
  };

  // Campus field visibility logic
  const showCampusField = ["Faculty", "Student", "Sub-Admin"].includes(role);
  const isSingleCampus = role === "Student";

  return (
    <div className="w-full mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate("/admin/users")}
            className="p-2 rounded-xl hover:bg-white hover:shadow-sm text-gray-500 hover:text-gray-700 transition-all"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-college-navy dark:text-college-gold tracking-tight">Edit User</h1>
            <p className="text-gray-500 dark:text-gray-400 text-sm">Update details for {id}</p>
          </div>
        </div>

        <PublicButton
          onClick={handleDelete}
          variant="danger"
          size="sm"
          icon={Trash2}
        >
          Delete User
        </PublicButton>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white/60 dark:bg-college-navy/60 backdrop-blur-md border border-white/60 dark:border-college-gold/20 rounded-2xl shadow-sm p-8 space-y-8"
      >
        {/* Role Display (Read-Only) */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-gray-800 dark:text-white font-semibold pb-2 border-b border-gray-100 dark:border-college-gold/20">

            <h2>Role & Permissions</h2>
          </div>
          <div className="flex items-center gap-3">
            <span className="px-4 py-2 bg-college-gold/10 text-college-navy dark:text-college-gold rounded-lg font-semibold text-sm border border-college-gold/20">
              {role}
            </span>
            <span className="text-sm text-gray-500">Role cannot be changed after creation.</span>
          </div>
        </div>

        {/* Basic Info Section */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-gray-800 dark:text-white font-semibold pb-2 border-b border-gray-100 dark:border-college-gold/20">

            <h2>Personal Identity</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormInput
              label="Full Name"
              value={form.name}
              onChange={(v) => handleChange("name", v)}
              required
            />
            <FormInput
              label="Email Address"
              type="email"
              value={form.email}
              onChange={(v) => handleChange("email", v)}
              required
            />
            <FormInput
              label="System ID"
              value={form.id}
              disabled
              helper="Cannot be modified"
            />
            <FormInput
              label="Contact Number"
              value={form.contact}
              onChange={(v) => handleChange("contact", v)}
            />
          </div>
        </div>

        {/* Academic / Professional Details */}
        {(role === "Student" || role === "Faculty" || role === "Sub-Admin") && (
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-gray-800 dark:text-white font-semibold pb-2 border-b border-gray-100 dark:border-college-gold/20">

              <h2>{role === "Student" ? "Academic Information" : "Professional Details"}</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {role === "Student" && (
                <>
                  <FormInput
                    label="Program / Department"
                    value={form.program}
                    onChange={(v) => handleChange("program", v)}
                    required
                  />
                  <FormInput
                    label="Semester"
                    value={form.semester}
                    onChange={(v) => handleChange("semester", v)}
                    required
                  />
                  <FormInput
                    label="Section"
                    value={form.section}
                    onChange={(v) => handleChange("section", v)}
                    required
                  />
                  <FormInput
                    label="Enrollment Year"
                    value={form.enrollmentYear || ""}
                    onChange={(v) => handleChange("enrollmentYear", v)}
                  />
                </>
              )}

              {role === "Faculty" && (
                <>
                  <FormInput
                    label="Department"
                    value={form.department}
                    onChange={(v) => handleChange("department", v)}
                    required
                  />
                  <FormInput
                    label="Designation"
                    value={form.designation}
                    onChange={(v) => handleChange("designation", v)}
                    required
                  />
                  <FormInput
                    label="Qualification"
                    value={form.qualification}
                    onChange={(v) => handleChange("qualification", v)}
                  />
                  <div className="md:col-span-2 space-y-3">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-200 flex justify-between items-center">
                      <span>Course & Class Allocation</span>
                      <button
                        type="button"
                        onClick={addAllocation}
                        className="text-xs text-college-navy dark:text-college-gold font-semibold hover:underline"
                      >
                        + Add Class
                      </button>
                    </label>
                    <div className="space-y-3">
                      {allocations.map((alloc, idx) => (
                        <div key={idx} className="flex gap-3 items-center">
                          <div className="flex-1">
                            <input
                              type="text"
                              placeholder="Class / Section (e.g. BSCS-5A)"
                              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-college-gold/20 bg-white dark:bg-college-navy/50 text-sm focus:outline-none focus:border-college-gold dark:text-white dark:placeholder-gray-500"
                              value={alloc.class}
                              onChange={(e) => handleAllocationChange(idx, 'class', e.target.value)}
                            />
                          </div>
                          <div className="flex-1">
                            <input
                              type="text"
                              placeholder="Subject (e.g. Operating Systems)"
                              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-college-gold/20 bg-white dark:bg-college-navy/50 text-sm focus:outline-none focus:border-college-gold dark:text-white dark:placeholder-gray-500"
                              value={alloc.subject}
                              onChange={(e) => handleAllocationChange(idx, 'subject', e.target.value)}
                            />
                          </div>
                          {allocations.length > 1 && (
                            <button
                              type="button"
                              onClick={() => removeAllocation(idx)}
                              className="text-rose-500 hover:text-rose-700 p-2"
                            >
                              <X size={18} />
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {(role === "Sub-Admin" || role === "Super Admin") && (
                <FormInput
                  label="Designation / Role Title"
                  value={form.designation}
                  onChange={(v) => handleChange("designation", v)}
                />
              )}
            </div>
          </div>
        )}

        {/* Campus Allocation Section */}
        {showCampusField && (
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-gray-800 dark:text-white font-semibold pb-2 border-b border-gray-100 dark:border-college-gold/20">

              <h2>Campus Allocation</h2>
            </div>

            <div className="bg-gray-50/50 dark:bg-college-navy/30 rounded-xl p-4 border border-gray-100 dark:border-college-gold/10">
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-200 mb-3 block">
                {isSingleCampus ? "Primary Campus" : "Allocated Campuses"}
              </h3>

              {isSingleCampus ? (
                <div className="relative">
                  <select
                    value={selectedCampuses[0] || ""}
                    onChange={(e) => {
                      setSelectedCampuses(e.target.value ? [e.target.value] : []);
                    }}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-college-gold/20 bg-white dark:bg-college-navy dark:text-white focus:outline-none focus:ring-2 focus:ring-college-gold/20"
                    required
                  >
                    <option value="">Select a campus...</option>
                    {campuses.map((campus) => (
                      <option key={campus.id} value={campus.id}>
                        {campus.name} ({campus.code})
                      </option>
                    ))}
                  </select>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {campuses.map((campus) => (
                    <label
                      key={campus.id}
                      className={`flex items-center p-3 border rounded-xl cursor-pointer transition-all ${selectedCampuses.includes(campus.id)
                        ? "bg-college-gold/10 border-college-gold shadow-sm dark:bg-college-gold/20 dark:border-college-gold"
                        : "bg-white border-gray-200 hover:border-college-gold/50 hover:bg-gray-50 dark:bg-college-navy dark:border-college-gold/20 dark:hover:bg-college-navy/80"
                        }`}
                    >
                      <input
                        type="checkbox"
                        checked={selectedCampuses.includes(campus.id)}
                        onChange={() => handleCampusToggle(campus.id)}
                        className="w-4 h-4 text-college-gold rounded focus:ring-college-gold border-gray-300 dark:border-college-gold/30 bg-white dark:bg-college-navy"
                      />
                      <div className="ml-3">
                        <span className={`block text-sm font-medium ${selectedCampuses.includes(campus.id) ? "text-college-navy dark:text-college-gold" : "text-gray-700 dark:text-gray-200"}`}>
                          {campus.name}
                        </span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {campus.code}
                        </span>
                      </div>
                    </label>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-3 md:gap-4 pt-4">
          <PublicButton variant="primary" onClick={() => navigate("/admin/users")} className="border-2 border-white/10">
            Cancel
          </PublicButton>
          <PublicButton
            type="submit"
            variant={isDarkMode ? "secondary" : "primary"}
            shape="slanted"
            size="md"
            className="px-6 font-bold shadow-md transform hover:-translate-y-0.5"
            icon={Save}
          >
            Save Changes
          </PublicButton>
        </div>
      </form>
    </div>
  );
};

export default EditUser;
