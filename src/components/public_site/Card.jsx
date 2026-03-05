import { clsx } from "clsx";

const variants = {
    default:
        "bg-white border border-gray-200 rounded-2xl shadow-sm",
    navy:
        "bg-college-navy border border-college-gold/20 rounded-2xl shadow-sm",
};

export default function Card({ variant = "default", hover = true, className, children }) {
    return (
        <div
            className={clsx(
                "overflow-hidden transition-all duration-300 ease-out",
                variants[variant],
                hover && "hover:shadow-xl hover:-translate-y-1.5 cursor-pointer",
                className
            )}
        >
            {children}
        </div>
    );
}
