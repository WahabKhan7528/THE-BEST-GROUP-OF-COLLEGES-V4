import React from "react";

/**
 * AdminStatsCard - A refined "Clean Premium" card for the Admin Portal.
 * 
 * Aesthetics:
 * - Strictly college-navy background.
 * - Solid 1.5px college-gold border for prominence.
 * - Clean sans-serif typography for maximum readability.
 * - Professional pill-style hint/trend indicator.
 * - No pulsing dots or complex lines as requested.
 */
const AdminStatsCard = ({ title, value, hint }) => {
  return (
    <div className="relative overflow-hidden bg-white dark:bg-college-navy border-[1.5px] border-gray-200 dark:border-college-gold/40 rounded-2xl p-6 shadow-xl transition-all duration-300 hover:border-college-navy dark:hover:border-college-gold hover:scale-[1.01]">
      <div className="flex flex-col gap-4">
        {/* Title */}
        <h3 className="text-college-navy/60 dark:text-college-gold text-xs font-bold uppercase tracking-[0.25em] leading-none opacity-80">
          {title}
        </h3>

        {/* Value Area */}
        <div className="flex items-center justify-between gap-4">
          <span className="text-3xl font-bold text-college-navy dark:text-white tracking-tight leading-none">
            {value}
          </span>

          {/* Hint Pill - Clean design no lines */}
          {hint && (
            <div className="flex items-center justify-center text-center px-3 py-1.5 rounded-full bg-college-navy/[0.03] border border-college-navy/10 dark:bg-college-gold/10 dark:border-college-gold/30">
              <span className="text-[10px] font-black text-college-navy/70 dark:text-college-gold uppercase tracking-widest">
                {hint}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Subtle Bottom Accent Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-college-gold/20 to-transparent" />
    </div>
  );
};

export default AdminStatsCard;
