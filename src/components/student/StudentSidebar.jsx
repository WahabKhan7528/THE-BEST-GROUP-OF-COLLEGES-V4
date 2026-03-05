import { NavLink } from "react-router-dom";
import { LogOut, X } from "lucide-react";
import { studentNavItems as navItems } from "../../data/navigationData";

const StudentSidebar = ({ isSidebarOpen, onClose }) => {
    return (
        <aside
            className={`fixed lg:sticky top-0 left-0 h-screen w-72 bg-college-navy border-r border-college-gold/15 transition-transform duration-300 z-40 lg:z-0 flex flex-col ${isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
                }`}
        >
            <div className="flex items-center justify-between px-6 h-20 border-b border-white/10">
                <div>
                    <p className="text-xs font-bold text-college-gold uppercase tracking-wider mb-0.5">Student Portal</p>
                    <p className="text-lg font-serif font-bold text-white">
                        Best Colleges
                    </p>
                </div>
                <button
                    className="p-2 rounded-xl hover:bg-white/10 text-white/50 hover:text-white lg:hidden transition-colors"
                    onClick={onClose}
                    aria-label="Close sidebar"
                >
                    <X size={20} />
                </button>
            </div>

            <div className="flex-1 px-4 py-6 overflow-y-auto space-y-1">
                <p className="px-4 text-[10px] font-bold uppercase tracking-[0.2em] text-white/30 mb-4">
                    Menu
                </p>
                {navItems.map((item) => {
                    const Icon = item.icon;
                    return (
                        <NavLink
                            key={item.to}
                            to={item.to}
                            className={({ isActive }) =>
                                `group flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${isActive
                                    ? "bg-college-gold/15 text-college-gold border-l-2 border-college-gold shadow-sm"
                                    : "text-white/60 hover:bg-white/5 hover:text-white"
                                }`
                            }
                            onClick={() => onClose && onClose()}
                        >
                            {({ isActive }) => (
                                <>
                                    <Icon
                                        size={18}
                                        className={`transition-colors ${isActive ? "text-college-gold" : "text-white/40 group-hover:text-college-gold/70"
                                            }`}
                                    />
                                    <span className="text-sm font-medium">{item.label}</span>
                                </>
                            )}
                        </NavLink>
                    );
                })}
            </div>

            {/* Sidebar Footer */}
            <div className="p-4 border-t border-white/10">
                <button className="w-full flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium text-college-gold/80 border border-college-gold/20 hover:bg-college-gold/10 hover:text-college-gold rounded-xl transition-colors">
                    <LogOut size={18} />
                    <span>Sign Out</span>
                </button>
            </div>
        </aside>
    );
};

export default StudentSidebar;
