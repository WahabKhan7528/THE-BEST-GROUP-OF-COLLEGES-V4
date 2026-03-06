import React from "react";
import { useAdminContext } from "../../context/AdminContext";

const CampusFilter = () => {
  const { isSuperAdmin, selectedCampusFilter, setSelectedCampusFilter, campuses } = useAdminContext();

  if (!isSuperAdmin) return null;

  return (
    <div className="flex items-center gap-1 sm:gap-2">
      <label className="hidden sm:block text-sm font-medium text-college-navy">Campus:</label>
      <select
        value={selectedCampusFilter}
        onChange={(e) => setSelectedCampusFilter(e.target.value)}
        className="pl-2 sm:pl-3 pr-6 sm:pr-8 py-1.5 sm:py-2 border border-gray-200 rounded-lg text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-college-gold/30 focus:border-college-gold bg-white text-college-navy w-20 sm:w-auto overflow-hidden text-ellipsis whitespace-nowrap"
      >
        <option value="all">All Campuses (Unified View)</option>
        {campuses.map((c) => (
          <option key={c.id} value={c.id}>{c.name}</option>
        ))}
      </select>
    </div>
  );
};

export default CampusFilter;
