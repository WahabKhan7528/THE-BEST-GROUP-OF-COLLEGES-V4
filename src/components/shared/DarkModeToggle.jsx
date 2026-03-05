import { useState, useEffect } from "react";
import { Sun, Moon } from "lucide-react";

export default function DarkModeToggle() {
    const [isDark, setIsDark] = useState(() => {
        if (typeof window !== "undefined") {
            return localStorage.getItem("portal-theme") === "dark";
        }
        return false;
    });

    useEffect(() => {
        const root = document.documentElement;
        if (isDark) {
            root.classList.add("dark");
            localStorage.setItem("portal-theme", "dark");
        } else {
            root.classList.remove("dark");
            localStorage.setItem("portal-theme", "light");
        }
    }, [isDark]);

    // On mount, check saved preference
    useEffect(() => {
        const saved = localStorage.getItem("portal-theme");
        if (saved === "dark") {
            document.documentElement.classList.add("dark");
            setIsDark(true);
        }
    }, []);

    return (
        <button
            onClick={() => setIsDark(!isDark)}
            className="relative p-2.5 rounded-xl text-gray-500 hover:bg-college-gold/10 hover:text-college-gold transition-all duration-300 group"
            title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
            aria-label="Toggle dark mode"
        >
            <div className="relative w-5 h-5">
                <Sun
                    size={20}
                    className={`absolute inset-0 transform transition-all duration-300 ${isDark
                            ? "opacity-0 rotate-90 scale-0"
                            : "opacity-100 rotate-0 scale-100"
                        }`}
                />
                <Moon
                    size={20}
                    className={`absolute inset-0 transform transition-all duration-300 ${isDark
                            ? "opacity-100 rotate-0 scale-100"
                            : "opacity-0 -rotate-90 scale-0"
                        }`}
                />
            </div>
        </button>
    );
}
