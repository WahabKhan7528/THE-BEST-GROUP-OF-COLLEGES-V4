import React from "react";
import { clsx } from "clsx";

/**
 * PortalPageHeader - Recreated from Scratch (High-Authority Design)
 * 
 * Aesthetics:
 * - Solid College Navy background with subtle contrast.
 * - Solid College Gold vertical pillar for structural strength.
 * - Dual-layer prestigious typography.
 * - Clean, heavy, and institutional feel.
 */
export default function PortalPageHeader({ title, subtitle, badge, className }) {
    return (
        <div className={clsx(
            "relative bg-white dark:bg-college-navy border border-gray-200 dark:border-college-gold/30 rounded-2xl p-8 md:p-10 shadow-2xl overflow-hidden transition-colors duration-300",
            className
        )}>
            {/* Background Subtle Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-college-navy/[0.03] dark:from-white/[0.03] to-transparent pointer-events-none" />

            <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-8">
                <div className="flex gap-6 md:gap-8">
                    {/* Gold Vertical Pillar Accent */}
                    <div className="w-[6px] md:w-[8px] bg-college-navy dark:bg-college-gold rounded-full shadow-[0_0_15px_rgba(0,33,71,0.1)] dark:shadow-[0_0_15px_rgba(197,160,89,0.3)]" />

                    <div className="space-y-4">
                        {/* Meta Label / Badge */}
                        <div className="flex flex-wrap items-center gap-2 md:gap-3">
                            <span className="text-[10px] md:text-xs font-black text-college-navy dark:text-college-gold uppercase tracking-[0.3em] leading-none">
                                Institutional Portal
                            </span>
                            {badge && <div className="h-1 w-1 rounded-full bg-college-navy/40 dark:bg-college-gold/40" />}
                            {badge && (
                                <div className="scale-90 origin-left">
                                    {badge}
                                </div>
                            )}
                        </div>

                        {/* High-Authority Title */}
                        <h1 className="text-3xl md:text-5xl font-serif font-black text-college-navy dark:text-white tracking-tight leading-none uppercase">
                            {title}
                        </h1>

                        <div className="h-px w-24 bg-college-navy/20 dark:bg-college-gold/20" />

                        {/* Subtitle - Restored rendering */}
                        {subtitle && (
                            <p className="text-sm md:text-base font-medium text-gray-500 dark:text-gray-400 max-w-2xl leading-relaxed transition-colors">
                                {subtitle}
                            </p>
                        )}

                        {/* Meta Line - Cleaned up per feedback */}
                        <div className="flex items-center pt-2">
                            <span className="text-[11px] font-bold text-college-navy/40 dark:text-college-gold/50 lg:text-gray-400 uppercase tracking-[0.3em] transition-colors">
                                Authorized Access Only
                            </span>
                        </div>
                    </div>
                </div>

                {/* Optional Right Action Slot if needed in future */}
            </div>
        </div>
    );
}
