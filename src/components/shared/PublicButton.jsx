import { clsx } from "clsx";
import { Link } from "react-router-dom";

const variants = {
    primary:
        "bg-college-navy text-white border-2 border-college-navy shadow-sm hover:bg-college-gold hover:text-college-navy hover:border-college-gold hover:shadow-md active:bg-college-navy active:text-white",
    secondary:
        "bg-college-gold text-college-navy border-2 border-college-gold shadow-sm hover:bg-college-navy hover:text-white hover:border-college-navy hover:shadow-md active:bg-college-gold active:text-college-navy",
    outline:
        "border-2 border-college-navy text-college-navy hover:bg-college-navy hover:text-white active:bg-college-navy/90",
    ghost:
        "text-college-navy hover:text-college-gold transition-colors",
    unstyled:
        "",
};

const sizes = {
    sm: "px-3 py-1.5 text-sm rounded-lg gap-1.5",
    md: "px-5 py-2.5 text-sm font-medium rounded-md gap-2",
    lg: "px-6 py-3 text-base font-medium rounded-lg gap-2.5",
    icon: "p-2 rounded-full",
    none: "",
};

export default function PublicButton({
    children,
    variant = "primary",
    size = "md",
    className,
    icon: Icon,
    disabled = false,
    to,
    ...props
}) {
    const baseClasses = clsx(
        "inline-flex items-center justify-center transition-all duration-200",
        "focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:ring-offset-1",
        variants[variant] ?? variants.primary,
        sizes[size] ?? sizes.md,
        {
            "opacity-50 cursor-not-allowed pointer-events-none": disabled,
        },
        className
    );

    const content = (
        <>
            {children}
            {Icon && (
                <Icon className={clsx("flex-shrink-0", size === "sm" ? "h-4 w-4" : "h-5 w-5")} />
            )}
        </>
    );

    if (to) {
        return (
            <Link to={to} className={baseClasses} {...props}>
                {content}
            </Link>
        );
    }

    return (
        <button
            className={baseClasses}
            disabled={disabled}
            {...props}
        >
            {content}
        </button>
    );
}
