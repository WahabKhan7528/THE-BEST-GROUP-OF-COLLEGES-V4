import { Menu, Home, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import DarkModeToggle from "../shared/DarkModeToggle";

const FacultyNavbar = ({ onMenuToggle }) => {
    const navigate = useNavigate();

    return (
        <header className="h-20 bg-white/70 dark:bg-college-navy backdrop-blur-xl border-b border-gray-200/50 dark:border-college-gold/15 sticky top-0 z-20 px-4 lg:px-8 shadow-sm transition-colors duration-300">
            <div className="h-full flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <button
                        className="p-2.5 rounded-xl hover:bg-college-gold/10 text-college-navy lg:hidden transition-all duration-200 active:scale-95"
                        onClick={onMenuToggle}
                        aria-label="Toggle sidebar"
                    >
                        <Menu size={22} />
                    </button>

                    <div className="hidden lg:block">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-college-gold/10 text-college-gold border border-college-gold/30">
                            <User size={12} />
                            Faculty Panel
                        </span>
                    </div>
                </div>

                <div className="flex items-center gap-3 sm:gap-4">
                    <DarkModeToggle />

                    <button
                        onClick={() => navigate("/")}
                        className="p-2.5 rounded-xl text-gray-500 hover:bg-college-gold/10 hover:text-college-gold transition-all duration-200"
                        title="Back to Home"
                    >
                        <Home size={20} />
                    </button>

                    <div className="h-8 w-px bg-gray-200 mx-1 hidden sm:block"></div>

                    <div className="flex items-center gap-3 p-1.5 pl-2 rounded-xl group cursor-default">
                        <div className="hidden sm:block text-right">
                            <p className="text-sm font-semibold text-college-navy leading-none">
                                Prof. Ahmed Raza
                            </p>
                            <p className="text-xs text-gray-500 mt-1 leading-none">
                                CS • Faculty
                            </p>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-college-navy text-white flex items-center justify-center text-sm font-bold shadow-sm ring-2 ring-college-gold/30">
                            AR
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default FacultyNavbar;
