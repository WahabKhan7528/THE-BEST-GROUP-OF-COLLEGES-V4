import { clsx } from "clsx";
import Badge from "./Badge";

const BACKGROUNDS = {
  white: "bg-white text-gray-900",
  gray: "bg-gray-50 text-gray-900",
  navy: "bg-college-navy text-white",
};

const SPACINGS = {
  none: '',
  small: 'py-8 md:py-10',
  standard: 'py-10 md:py-16',
  default: 'py-12 md:py-16',
  large: 'py-14 md:py-20',
};

const Section = ({
  children,
  className,
  background = 'white',
  spacing = 'default',
  container = true,
  ...props
}) => {
  return (
    <section
      className={clsx(
        'relative overflow-hidden',
        !className?.includes('bg-') && (BACKGROUNDS[background] || BACKGROUNDS.white),
        SPACINGS[spacing],
        className
      )}
      {...props}
    >
      {container ? (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">{children}</div>
      ) : (
        children
      )}
    </section>
  );
};

Section.Header = function SectionHeader({
  title,
  description,
  badge,
  className,
  center = true,
  light = false,
  ...props
}) {
  return (
    <div
      className={clsx(
        'mb-10',
        center && 'text-center',
        className
      )}
      {...props}
    >
      {badge && (
        <div className={clsx("mb-4", center ? "flex justify-center" : "flex justify-start")}>
          <Badge variant={light ? "soft" : "outline"}>{badge}</Badge>
        </div>
      )}
      <h2
        className={clsx(
          'text-4xl md:text-5xl font-serif font-bold',
          light ? 'text-white' : 'text-college-navy',
          description ? 'mb-4' : 'mb-6'
        )}
      >
        {title}
      </h2>
      <div className={clsx("h-1 bg-college-gold mt-6 mb-6", center ? "w-24 mx-auto" : "w-16")}></div>
      {description && (
        <p className={clsx("text-lg leading-relaxed", center && "mx-auto max-w-2xl", light ? 'text-white/80' : 'text-gray-600')}>{description}</p>
      )}
    </div>
  );
};

export default Section;