import { useState } from "react";
import { useStudentContext } from "../../context/StudentContext";
import PortalPageHeader from "../../components/shared/PortalPageHeader";
import Badge from "../../components/public_site/Badge";
import { BarChart3, TrendingUp, Award, ChevronDown, ChevronRight } from "lucide-react";

// Grading Logic
const getGradeDetails = (marks) => {
  if (marks >= 85) return { grade: "A", qp: 4.0, color: "text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/30" };
  if (marks >= 80) return { grade: "A-", qp: 3.7, color: "text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/30" };
  if (marks >= 75) return { grade: "B+", qp: 3.3, color: "text-college-gold dark:text-college-gold bg-college-navy/5 dark:bg-college-gold/10" };
  if (marks >= 70) return { grade: "B", qp: 3.0, color: "text-college-gold dark:text-college-gold bg-college-navy/5 dark:bg-college-gold/10" };
  if (marks >= 65) return { grade: "B-", qp: 2.7, color: "text-college-gold dark:text-college-gold bg-college-navy/5 dark:bg-college-gold/10" };
  if (marks >= 61) return { grade: "C+", qp: 2.3, color: "text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-900/30" };
  if (marks >= 58) return { grade: "C", qp: 2.0, color: "text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-900/30" };
  if (marks >= 55) return { grade: "C-", qp: 1.7, color: "text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-900/30" };
  if (marks >= 50) return { grade: "D", qp: 1.0, color: "text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/30" };
  return { grade: "F", qp: 0.0, color: "text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/30" };
};

const calculateSGPA = (subjects) => {
  if (!subjects || subjects.length === 0) return "0.00";
  let totalQP = 0;
  let totalCredits = 0;
  subjects.forEach(sub => {
    if (sub.marks > 0) { // Only count graded subjects
      const { qp } = getGradeDetails(sub.marks);
      totalQP += qp * sub.credits;
      totalCredits += sub.credits;
    }
  });
  return totalCredits > 0 ? (totalQP / totalCredits).toFixed(2) : "0.00";
};

const calculateCredits = (subjects) => {
  if (!subjects) return 0;
  return subjects.reduce((sum, sub) => sum + sub.credits, 0);
};

const campusNames = {
  main: "Main Campus",
  law: "Law Campus",
  hala: "Hala Campus",
};

const StudentResults = () => {
  const { getDetailedResultsByCurrentCampus, getCurrentCampus, isDarkMode } = useStudentContext();
  const campus = getCurrentCampus();
  const resultData = getDetailedResultsByCurrentCampus(); // { semesters: [] }
  const semesters = resultData?.semesters || [];

  const [selectedSemesterId, setSelectedSemesterId] = useState("all"); // "all" or semester ID

  // Calculate CGPA
  const calculateCGPA = () => {
    let totalQP = 0;
    let totalCredits = 0;
    semesters.forEach(sem => {
      if (sem.subjects) {
        sem.subjects.forEach(sub => {
          if (sub.marks > 0) {
            const { qp } = getGradeDetails(sub.marks);
            totalQP += qp * sub.credits;
            totalCredits += sub.credits;
          }
        });
      }
    });
    return totalCredits > 0 ? (totalQP / totalCredits).toFixed(2) : "0.00";
  };

  const currentCGPA = calculateCGPA();

  const selectedSemester = selectedSemesterId === "all"
    ? null
    : semesters.find(s => s.id.toString() === selectedSemesterId);

  return (
    <div className="space-y-6 pb-10">
      <PortalPageHeader
        badge={
          <Badge variant={isDarkMode ? "gold" : "navy"}>
            {campusNames[campus]}
          </Badge>
        }
        title="Academic Results"
        subtitle="Track your GPA and academic performance."
        action={
          <div className="flex items-center gap-2 md:gap-3 flex-col sm:flex-row w-full sm:w-auto">
            <div className="bg-college-navy/5 dark:bg-college-gold/10 px-4 py-2 md:py-2.5 rounded-xl border border-college-navy/10 dark:border-college-gold/20 flex flex-col items-end w-full sm:w-auto">
              <span className="text-[10px] md:text-xs text-college-gold font-semibold uppercase tracking-wider">CGPA</span>
              <span className="text-xl md:text-2xl font-bold text-college-navy dark:text-white leading-none mt-0.5">{currentCGPA}</span>
            </div>

            <div className="relative w-full sm:w-auto">
              <select
                value={selectedSemesterId}
                onChange={(e) => setSelectedSemesterId(e.target.value)}
                className="w-full sm:w-auto appearance-none bg-white dark:bg-dark-elevated border border-gray-200 dark:border-dark-border text-gray-700 dark:text-gray-300 py-2.5 md:py-3.5 pl-4 pr-10 text-sm md:text-base rounded-xl focus:outline-none focus:ring-2 focus:ring-college-navy/20 dark:focus:ring-college-gold/20 focus:border-college-navy dark:focus:border-college-gold font-medium cursor-pointer"
              >
                <option value="all">All Semesters</option>
                {semesters.map(sem => (
                  <option key={sem.id} value={sem.id}>{sem.name}</option>
                ))}
              </select>
              <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400 pointer-events-none" />
            </div>
          </div>
        }
      />

      {/* Content */}
      {selectedSemesterId === "all" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {semesters.map(sem => {
            const sgpa = calculateSGPA(sem.subjects);
            const credits = calculateCredits(sem.subjects);
            const isCompleted = sem.subjects && sem.subjects.some(s => s.marks > 0);

            return (
              <div key={sem.id}
                onClick={() => setSelectedSemesterId(sem.id.toString())}
                className="group relative bg-white dark:bg-dark-surface rounded-2xl md:rounded-3xl p-5 md:p-6 border border-gray-100 dark:border-dark-border shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer overflow-hidden"
              >
                {/* Decorative Background */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gray-50 dark:bg-white/5 rounded-full -mr-16 -mt-16 transition-transform duration-500 group-hover:scale-150 group-hover:bg-college-navy/5 dark:group-hover:bg-college-gold/5"></div>

                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-4 md:mb-6">
                    <div className={`w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl flex items-center justify-center text-lg md:text-xl font-bold ${isCompleted ? 'bg-college-navy/10 dark:bg-college-gold/10 text-college-gold' : 'bg-gray-100 dark:bg-dark-elevated text-gray-400 dark:text-gray-500'}`}>
                      {sem.id}
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] md:text-xs text-gray-400 dark:text-gray-500 font-semibold uppercase tracking-wider">SGPA</span>
                      <p className={`text-2xl md:text-3xl font-bold ${isCompleted ? 'text-college-navy dark:text-white' : 'text-gray-400 dark:text-gray-500'}`}>{sgpa}</p>
                    </div>
                  </div>

                  <h3 className="text-lg md:text-xl font-bold text-college-navy dark:text-white mb-2 group-hover:text-blue-700 dark:group-hover:text-college-gold transition-colors">{sem.name}</h3>

                  <div className="flex flex-wrap items-center gap-2 md:gap-4 text-xs md:text-sm text-gray-500 dark:text-gray-400 mb-4 md:mb-6">
                    <span className="flex items-center gap-1.5 bg-gray-50 dark:bg-dark-elevated px-2 py-1 rounded-lg">
                      <Award size={12} className="md:w-[14px] md:h-[14px]" />
                      {sem.subjects ? sem.subjects.length : 0} Subjects
                    </span>
                    <span className="flex items-center gap-1.5 bg-gray-50 dark:bg-dark-elevated px-2 py-1 rounded-lg">
                      <TrendingUp size={12} className="md:w-[14px] md:h-[14px]" />
                      {credits} Cr.
                    </span>
                  </div>

                  <div className="flex items-center justify-between pt-3 md:pt-4 border-t border-gray-100 dark:border-dark-border">
                    <span className={`text-[10px] md:text-xs font-semibold px-2 py-1 rounded-md ${isCompleted ? 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400' : 'bg-amber-50 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400'}`}>
                      {isCompleted ? 'Completed' : 'In Progress'}
                    </span>
                    <div className="flex items-center gap-1 text-xs md:text-sm font-semibold text-college-gold opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                      View Results <ChevronRight size={14} className="md:w-4 md:h-4" />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="space-y-6">
          {/* Semester Summary Card */}
          {selectedSemester && (
            <div className="bg-college-navy rounded-3xl p-8 text-white shadow-xl relative overflow-hidden">
              <div className="absolute -top-10 -right-10 w-64 h-64 bg-college-gold/10 rounded-full mix-blend-screen opacity-50 blur-2xl"></div>
              <div className="absolute top-0 right-0 p-8 opacity-10">
                <BarChart3 size={120} />
              </div>
              <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
                <div>
                  <h2 className="text-3xl font-bold">{selectedSemester.name}</h2>
                  <p className="text-white/70 text-sm mt-1">Academic Performance Summary</p>
                </div>
                <div className="bg-white/10 backdrop-blur-md px-6 py-4 rounded-2xl border border-white/20 text-center md:text-right">
                  <p className="text-xs text-college-gold uppercase font-bold tracking-wider">Semester GPA</p>
                  <p className="text-5xl font-extrabold tracking-tight mt-1">{calculateSGPA(selectedSemester.subjects)}</p>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8 border-t border-white/10 pt-6">
                <div className="bg-white/5 p-4 rounded-xl border border-white/5">
                  <p className="text-xs text-college-gold uppercase font-bold tracking-wider">Total Credits</p>
                  <p className="text-xl md:text-2xl font-bold mt-1">{calculateCredits(selectedSemester.subjects)}</p>
                </div>
                <div className="bg-white/5 p-4 rounded-xl border border-white/5">
                  <p className="text-xs text-college-gold uppercase font-bold tracking-wider">Enrolled Subjects</p>
                  <p className="text-xl md:text-2xl font-bold mt-1">{selectedSemester.subjects ? selectedSemester.subjects.length : 0}</p>
                </div>
                <div className="bg-white/5 p-4 rounded-xl border border-white/5">
                  <p className="text-xs text-college-gold uppercase font-bold tracking-wider">Status</p>
                  <p className="text-xl md:text-2xl font-bold text-emerald-400 mt-1">{calculateSGPA(selectedSemester.subjects) > 0 ? "Completed" : "In Progress"}</p>
                </div>
              </div>
            </div>
          )}

          {/* Detailed Table */}
          {selectedSemester && selectedSemester.subjects && (
            <div className="bg-white dark:bg-dark-surface border dark:border-dark-border rounded-2xl overflow-hidden shadow-sm transition-colors">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-gray-50 dark:bg-dark-elevated border-b border-gray-100 dark:border-dark-border">
                      <th className="p-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Course</th>
                      <th className="p-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Title</th>
                      <th className="p-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider text-center">Cr. Hrs</th>
                      <th className="p-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider text-center">Marks</th>
                      <th className="p-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider text-center">Grade</th>
                      <th className="p-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider text-center">Points</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 dark:divide-dark-border">
                    {selectedSemester.subjects.map((sub, idx) => {
                      const { grade, qp, color } = getGradeDetails(sub.marks);
                      return (
                        <tr key={idx} className="hover:bg-gray-50/50 dark:hover:bg-white/5 transition-colors">
                          <td className="p-4 text-sm font-medium text-college-navy dark:text-college-gold">{sub.code}</td>
                          <td className="p-4 text-sm font-medium text-gray-700 dark:text-gray-300">{sub.title}</td>
                          <td className="p-4 text-sm text-gray-600 dark:text-gray-400 text-center">{sub.credits}</td>
                          <td className="p-4 text-sm font-bold text-college-navy dark:text-white text-center">{sub.marks}</td>
                          <td className="p-4 text-center">
                            <span className={`inline-flex items-center justify-center w-8 h-8 rounded-lg text-xs font-bold ${color}`}>
                              {grade}
                            </span>
                          </td>
                          <td className="p-4 text-sm font-bold text-college-navy dark:text-white text-center">{(qp * sub.credits).toFixed(1)}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default StudentResults;
