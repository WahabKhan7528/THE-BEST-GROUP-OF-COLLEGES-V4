import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Megaphone,
  BookOpen,
  ArrowRight,
} from "lucide-react";

import { useStudentContext } from "../../context/StudentContext";
import PortalPageHeader from "../../components/shared/PortalPageHeader";
import Badge from "../../components/public_site/Badge";
import AdminStatsCard from "../../components/admin/AdminStatsCard";

import {
  studentCampusNames as campusNames,
  studentQuickLinks as quickLinks,
} from "../../data/studentPortalData";

const Dashboard = () => {
  const {
    currentStudent,
    getCoursesByCurrentCampus,
    getAnnouncementsByCurrentCampus,
    getTotalCredits,
    getCurrentCampus,
    isDarkMode,
  } = useStudentContext();

  const campus = getCurrentCampus();
  const courses = getCoursesByCurrentCampus();
  const announcements = getAnnouncementsByCurrentCampus();
  const totalCredits = getTotalCredits();

  // Fetch real announcements from localStorage
  const [realAnnouncements, setRealAnnouncements] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem("college_announcements");
    if (saved) {
      const parsed = JSON.parse(saved);
      const campusAnnouncements = parsed[campus] || [];
      const courseCodes = courses.map((c) => c.code);

      const relevant = campusAnnouncements.filter((a) => {
        if (!a.classSection) return false;
        return courseCodes.some((code) => a.classSection.includes(code));
      });
      setRealAnnouncements(relevant);
    }
  }, [campus, courses]);

  const displayAnnouncements =
    realAnnouncements.length > 0 ? realAnnouncements : announcements.recent;

  const stats = [
    {
      title: "Current Program",
      value: currentStudent.department,
      hint: `Semester ${currentStudent.semester}`,
    },
    {
      title: "Enrolled Courses",
      value: courses.length,
      hint: "Current Term",
    },
    {
      title: "Overall CGPA",
      value: currentStudent.cgpa,
      hint: "Cumulative",
    },
    {
      title: "Total Credits",
      value: totalCredits,
      hint: "Completed",
    }
  ];

  return (
    <div className="space-y-8 pb-10">
      {/* Header */}
      <PortalPageHeader
        badge={
          <Badge variant={isDarkMode ? "gold" : "navy"}>
            {campusNames[campus]}
          </Badge>
        }
        title={`Welcome back, ${currentStudent.name.split(" ")[0]}!`}
        subtitle={`ID: ${currentStudent.id} • Student Dashboard`}
      />

      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-5 lg:gap-6">
        {stats.map((item) => (
          <AdminStatsCard key={item.title} {...item} />
        ))}
      </div>

      {/* Quick Links */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {quickLinks.map((link) => {
          const Icon = link.icon;
          return (
            <Link
              to={link.path}
              key={link.title}
              className="group relative overflow-hidden bg-white dark:bg-college-navy border border-gray-200 dark:border-college-gold/30 rounded-2xl p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
            >
              <div
                className={`w-14 h-14 rounded-xl ${link.bgColor} dark:bg-college-gold/10 ${link.color} dark:text-college-gold flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110`}
              >
                <Icon size={24} />
              </div>
              <h3 className="text-lg font-bold text-college-navy dark:text-white mb-1 group-hover:text-college-gold transition-colors">
                {link.title}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 font-medium mb-3">
                {link.description}
              </p>

              <div className="flex items-center text-sm font-bold text-gray-400 dark:text-gray-500 group-hover:text-college-gold transition-colors">
                <span>Access</span>
                <ArrowRight
                  size={14}
                  className="ml-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300"
                />
              </div>
            </Link>
          );
        })}
      </div>

      {/* Enrolled Courses and Recent Material */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-college-navy border border-gray-200 dark:border-college-gold/30 rounded-3xl shadow-sm p-6 flex flex-col h-full">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-college-navy dark:text-white">
                Enrolled Courses
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {campusNames[campus]}
              </p>
            </div>
            <Link
              to="/student/materials"
              className="px-4 py-2 bg-college-navy/5 dark:bg-college-gold/10 text-college-navy dark:text-college-gold rounded-xl text-sm font-semibold hover:bg-college-navy/10 dark:hover:bg-college-gold/20 transition-colors"
            >
              View Materials
            </Link>
          </div>

          {courses.length > 0 ? (
            <div className="space-y-4">
              {courses.map((course) => (
                <div
                  key={course.code}
                  className="group flex items-center justify-between p-4 rounded-2xl border border-gray-200 dark:border-college-gold/20 hover:shadow-md hover:border-college-navy/10 dark:hover:border-college-gold/40 transition-all duration-300"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-college-navy/10 dark:bg-college-gold/10 text-college-gold flex items-center justify-center font-bold text-lg">
                      {course.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-bold text-college-navy dark:text-white transition-colors">
                        {course.name}
                      </h4>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs font-medium text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-white/5 px-2 py-0.5 rounded-md">
                          {course.code}
                        </span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          • {course.instructor}
                        </span>
                      </div>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-college-navy dark:text-college-gold bg-college-navy/5 dark:bg-college-gold/10 px-3 py-1.5 rounded-lg border border-college-navy/10 dark:border-college-gold/20">
                    {course.credits} Cr
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-center p-8 border-2 border-dashed border-gray-300 dark:border-college-gold/30 rounded-2xl">
              <div className="w-16 h-16 bg-college-navy/5 dark:bg-college-gold/5 rounded-full flex items-center justify-center mb-4">
                <BookOpen size={24} className="text-college-gold" />
              </div>
              <p className="text-gray-500 dark:text-gray-400 font-medium">
                No courses enrolled for this campus
              </p>
            </div>
          )}
        </div>

        <div className="bg-white dark:bg-college-navy border border-gray-200 dark:border-college-gold/30 rounded-3xl shadow-sm p-6 flex flex-col h-full">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-college-navy dark:text-white">
                Recent Announcements
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Stay updated with latest news
              </p>
            </div>
            <Link
              to="/student/announcements"
              className="px-4 py-2 bg-college-navy/5 dark:bg-college-gold/10 text-college-navy dark:text-college-gold rounded-xl text-sm font-semibold hover:bg-college-navy/10 dark:hover:bg-college-gold/20 transition-colors"
            >
              See All
            </Link>
          </div>

          {displayAnnouncements && displayAnnouncements.length > 0 ? (
            <div className="space-y-4">
              {displayAnnouncements.slice(0, 3).map((item, index) => (
                <div
                  key={index}
                  className="group relative overflow-hidden bg-college-navy/5 dark:bg-college-gold/5 border border-college-navy/10 dark:border-college-gold/20 p-5 rounded-2xl hover:bg-white dark:hover:bg-white/5 hover:shadow-md transition-all duration-200"
                >
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-college-navy/10 dark:bg-college-gold/10 text-college-gold flex items-center justify-center shadow-sm">
                      <Megaphone size={20} />
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-semibold text-gray-400 dark:text-gray-500">
                          {item.date}
                        </span>
                      </div>
                      <h4 className="font-bold text-college-navy dark:text-white text-sm mb-1 transition-colors">
                        {item.title}
                      </h4>
                      <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2">
                        {item.description ||
                          "Click to visit announcements page."}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-center p-8 border-2 border-dashed border-gray-300 dark:border-college-gold/30 rounded-2xl">
              <div className="w-16 h-16 bg-college-navy/5 dark:bg-college-gold/5 rounded-full flex items-center justify-center mb-4">
                <Megaphone size={24} className="text-college-gold" />
              </div>
              <p className="text-gray-500 dark:text-gray-400 font-medium">
                No announcements yet
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
