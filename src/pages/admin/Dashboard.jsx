import { Link } from "react-router-dom";
import {
  Users,
  Layers,
  BookOpen,
  GraduationCap,
  Image,
  Newspaper,
  Book,
} from "lucide-react";

import { useAdminContext } from "../../context/AdminContext";
import AdminStatsCard from "../../components/admin/AdminStatsCard";
import PortalPageHeader from "../../components/shared/PortalPageHeader";
import Badge from "../../components/public_site/Badge";
import Card from "../../components/public_site/Card";

import {
  mockAllStats,
  adminQuickActions as quickActions,
  systemMetadata,
} from "../../data/adminData";

const Dashboard = () => {
  const { selectedCampusFilter, getCurrentCampusContext, isSuperAdmin, isDarkMode } =
    useAdminContext();

  const currentCampus = getCurrentCampusContext();
  const campusKey = currentCampus ? currentCampus.id : "all";
  const campusLabel = currentCampus ? currentCampus.name : "All Campuses";

  const currentStats = mockAllStats[campusKey] || mockAllStats.all;

  const stats = [
    {
      title: "Total Users",
      value: currentStats.users.value,
      hint: currentStats.users.hint,
      icon: Users,
      tone: "primary",
    },
    {
      title: "Active Classes",
      value: currentStats.classes.value,
      hint: currentStats.classes.hint,
      icon: GraduationCap,
      tone: "primary",
    },
    {
      title: "Active Subjects",
      value: currentStats.subjects.value,
      hint: currentStats.subjects.hint,
      icon: Book,
      tone: "primary",
    },
    {
      title: "Active Courses",
      value: currentStats.courses.value,
      hint: currentStats.courses.hint,
      icon: Layers,
      tone: "primary",
    },
  ];

  return (
    <div className="space-y-8 pb-10">
      {/* Header */}
      <PortalPageHeader
        badge={
          (!isSuperAdmin || selectedCampusFilter !== "all") ? (
            <Badge variant={isDarkMode ? "gold" : "navy"}>
              {isSuperAdmin ? campusLabel : "Allocated Campuses"}
            </Badge>
          ) : null
        }
        title="Admin Control Center"
        subtitle="Unified institutional management and system monitoring"
      />

      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-5 lg:gap-6">
        {stats.map((item) => (
          <AdminStatsCard key={item.title} {...item} />
        ))}
      </div>

      {/* Quick Actions Grid */}
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <h2 className="text-xl font-serif font-bold text-college-navy dark:text-white">Quick Actions</h2>
          <div className="h-0.5 flex-1 bg-college-gold/20"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {quickActions.map((action) => (
            <Link
              key={action.title}
              to={action.path}
              className="group relative flex flex-col items-center text-center gap-4 p-6 rounded-2xl bg-white dark:bg-college-navy border-[1.5px] border-gray-200 dark:border-college-gold/30 shadow-lg hover:shadow-2xl hover:border-college-navy/60 dark:hover:border-college-gold/60 hover:scale-[1.01] transition-all duration-300 overflow-hidden"
            >
              <div
                className="p-4 rounded-xl bg-college-navy/10 text-college-navy dark:bg-college-gold/10 dark:text-college-gold group-hover:scale-110 transition-transform duration-300 relative z-10"
              >
                <action.icon size={28} strokeWidth={1.5} />
              </div>
              <div className="relative z-10 space-y-1">
                <h3 className="font-bold text-college-navy dark:text-white group-hover:text-college-navy dark:group-hover:text-college-gold transition-colors text-sm sm:text-base">
                  {action.title}
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2">
                  {action.desc}
                </p>
              </div>

              {/* Hover Effect Background */}
              <div className="absolute inset-0 bg-college-navy/5 dark:bg-college-gold/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-0" />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
