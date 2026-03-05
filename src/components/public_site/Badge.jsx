import { clsx } from "clsx";

const Badge = ({ children, variant = "soft", className, ...props }) => {
  const variants = {
    solid: "bg-college-navy text-college-gold border-0",
    soft: "bg-college-gold/10 text-college-gold border border-college-gold/30",
    outline: "bg-transparent text-college-navy border border-college-navy",
  };

  return (
    <span
      className={clsx(
        "inline-flex items-center font-bold tracking-wider uppercase rounded",
        "transition-all duration-200",
        "px-3 py-1 text-xs",
        variants[variant] || variants.soft,
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
};

export default Badge;