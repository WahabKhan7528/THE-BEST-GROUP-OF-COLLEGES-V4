import { clsx } from 'clsx';

const TestimonialCard = ({ name, role, content, image, theme = "dark", className }) => {
  const isDark = theme === "dark";

  return (
    <div className={clsx(
      "p-8 rounded-2xl relative shrink-0 flex flex-col",
      isDark ? "bg-white/5 backdrop-blur-sm border border-white/10" : "bg-white border border-gray-100 shadow-xl",
      className
    )}>
      <div className={clsx(
        "absolute top-6 left-6 opacity-30 text-8xl font-serif leading-none h-16",
        isDark ? "text-college-gold" : "text-college-navy"
      )}>
        &ldquo;
      </div>
      <p className={clsx(
        "text-lg relative z-10 mb-8 leading-relaxed mt-6 flex-grow",
        isDark ? "text-gray-300" : "text-gray-600"
      )}>
        {content}
      </p>
      <div className={clsx(
        "flex items-center gap-4 border-t pt-6 mt-auto",
        isDark ? "border-white/10" : "border-gray-100"
      )}>
        <img
          src={image || "/default-avatar.png"}
          alt={name}
          className="w-14 h-14 rounded-full border-2 border-college-gold object-cover"
        />
        <div>
          <h4 className={clsx("font-bold text-lg", isDark ? "text-college-gold" : "text-college-navy")}>{name}</h4>
          <p className={clsx("text-sm uppercase tracking-wider", isDark ? "text-white/60" : "text-gray-500")}>{role}</p>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;