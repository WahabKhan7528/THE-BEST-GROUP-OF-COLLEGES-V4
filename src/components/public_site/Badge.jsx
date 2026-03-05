import { clsx } from "clsx";

const variants = {
    gold: "bg-college-gold/10 text-college-gold border border-college-gold/30",
    outline: "bg-transparent text-college-navy border border-college-navy",
    subtle: "bg-gray-100 text-college-navy",
};

export default function Badge({ variant = "outline", className, children }) {
    return (
        <span
            className={clsx(
                "inline-flex items-center font-bold tracking-wider uppercase rounded transition-all duration-200 px-3 py-1 text-xs",
                variants[variant],
                className
            )}
        >
            {children}
        </span>
    );
}
