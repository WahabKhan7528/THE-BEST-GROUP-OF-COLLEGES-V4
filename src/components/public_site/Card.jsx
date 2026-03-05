import { clsx } from "clsx";
import { Link } from "react-router-dom";
import { ArrowRight, Mail } from "lucide-react";
import Badge from "./Badge";

const Card = ({
  children,
  className,
  hover = false,
  shadow = "sm",
  padding = true,
  rounded = "2xl",
  ...props
}) => {
  const shadowClasses = {
    none: "",
    sm: "shadow-sm",
    md: "shadow-md",
    lg: "shadow-lg",
    xl: "shadow-xl",
    "2xl": "shadow-2xl",
  };

  const roundedClasses = {
    none: "rounded-none",
    sm: "rounded-sm",
    md: "rounded-md",
    lg: "rounded-lg",
    xl: "rounded-xl",
    "2xl": "rounded-2xl",
  };

  return (
    <div
      className={clsx(
        "bg-white border border-gray-200 overflow-hidden",
        "transition-all duration-300 ease-out",
        roundedClasses[rounded] || roundedClasses["2xl"],
        shadowClasses[shadow] || shadowClasses.sm,
        hover && "hover:shadow-xl hover:-translate-y-1.5 cursor-pointer",
        padding && "p-6 md:p-8",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

Card.Header = ({ title, subtitle, titleClass, subtitleClass, className, ...props }) => (
  <div className={clsx("mb-4", className)} {...props}>
    {title && <h3 className={clsx("font-serif font-bold", titleClass)}>{title}</h3>}
    {subtitle && <p className={clsx("text-sm", subtitleClass)}>{subtitle}</p>}
  </div>
);

Card.Content = ({ children, className, ...props }) => (
  <div className={clsx("space-y-4", className)} {...props}>
    {children}
  </div>
);

Card.List = ({ items = [], light = false, numbered = false, className, ...props }) => {
  const ListTag = numbered ? "ol" : "ul";
  return (
    <ListTag className={clsx("space-y-3", numbered && "list-decimal list-inside", className)} {...props}>
      {items.map((item, idx) => (
        <li key={idx} className={clsx("text-sm leading-relaxed", light ? "text-white/80" : "text-gray-600")}>
          {item}
        </li>
      ))}
    </ListTag>
  );
};

Card.StepCard = ({ stepNumber, badge, title, description, light = false, className, ...props }) => (
  <Card hover className={clsx("relative", className)} {...props}>
    {badge && <div className="mb-4">{badge}</div>}
    <h3 className={clsx("text-xl font-serif font-bold mb-3", light ? "text-white" : "text-college-navy")}>
      <span className="text-college-gold mr-2">{stepNumber}.</span> {title}
    </h3>
    <p className={clsx("text-sm leading-relaxed", light ? "text-white/70" : "text-gray-600")}>{description}</p>
  </Card>
);

Card.Leader = ({ image, name, role, description, className, ...props }) => (
  <Card hover className={clsx("flex flex-col md:flex-row gap-8 items-center md:items-start", className)} {...props}>
    <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden flex-shrink-0 border-4 border-college-gold/20">
      <img src={image} alt={name} className="w-full h-full object-cover" />
    </div>
    <div className="flex-grow text-center md:text-left">
      <h3 className="text-2xl font-serif font-bold text-college-navy mb-1">{name}</h3>
      <p className="text-college-gold font-bold text-sm uppercase tracking-wider mb-4">{role}</p>
      <p className="text-gray-600 leading-relaxed">{description}</p>
    </div>
  </Card>
);

Card.Gallery = ({ src, alt, title, description, className, ...props }) => (
  <Card hover padding={false} className={clsx("group", className)} {...props}>
    <div className="relative h-64 overflow-hidden">
      <img src={src} alt={alt} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
      <div className="absolute inset-0 bg-college-navy/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
        <h3 className="text-white font-serif font-bold text-xl mb-1">{title}</h3>
        <p className="text-white/80 text-sm">{description}</p>
      </div>
    </div>
  </Card>
);

Card.News = ({ image, title, description, date, author, category, link, metaIcons: Icons, className, ...props }) => (
  <Card hover padding={false} className={clsx("flex flex-col md:flex-row overflow-hidden", className)} {...props}>
    {image && (
      <div className="md:w-1/3 h-48 md:h-auto">
        <img src={image} alt={title} className="w-full h-full object-cover" />
      </div>
    )}
    <div className="p-6 md:p-8 flex-1">
      <div className="flex items-center gap-4 mb-3">
        <Badge variant="soft">{category}</Badge>
        <div className="flex items-center gap-1.5 text-xs text-gray-500 font-medium">
          {Icons?.date && <Icons.date className="w-3.5 h-3.5" />}
          {date}
        </div>
      </div>
      <h3 className="text-2xl font-serif font-bold text-college-navy mb-3 hover:text-college-gold transition-colors">
        <Link to={link}>{title}</Link>
      </h3>
      <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-2">{description}</p>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs text-gray-500 font-medium">
          {Icons?.author && <Icons.author className="w-3.5 h-3.5" />}
          {author}
        </div>
        <Link to={link} className="text-college-gold text-sm font-bold flex items-center gap-1 hover:gap-2 transition-all">
          Read More <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  </Card>
);

Card.Event = ({ title, description, date, time, location, status, link, icons: Icons, className, ...props }) => (
  <Card hover className={clsx("group", className)} {...props}>
    <div className="flex justify-between items-start mb-4">
      <div className="bg-college-gold/10 text-college-gold p-3 rounded-lg text-center min-w-[60px]">
        <div className="text-xl font-bold leading-none">{date.split(" ")[0]}</div>
        <div className="text-[10px] uppercase font-bold tracking-tighter">{date.split(" ")[1]}</div>
      </div>
      {status && <Badge variant="soft" className="text-[10px]">{status}</Badge>}
    </div>
    <h3 className="text-lg font-bold text-college-navy mb-2 group-hover:text-college-gold transition-colors">
      <Link to={link}>{title}</Link>
    </h3>
    <div className="space-y-2 mb-4">
      <div className="flex items-center gap-2 text-xs text-gray-500">
        {Icons?.time && <Icons.time className="w-3.5 h-3.5 text-college-gold" />}
        {time}
      </div>
      <div className="flex items-center gap-2 text-xs text-gray-500">
        {Icons?.location && <Icons.location className="w-3.5 h-3.5 text-college-gold" />}
        {location}
      </div>
    </div>
    <Link to={link} className="text-xs font-bold text-college-navy hover:text-college-gold flex items-center gap-1 transition-colors">
      Event Details <ArrowRight className="w-3 h-3" />
    </Link>
  </Card>
);

Card.CTA = ({ title, description, children, className, ...props }) => (
  <Card variant="navy" className={clsx("bg-college-navy text-white text-center", className)} {...props}>
    <h3 className="text-xl font-serif font-bold text-white mb-3">{title}</h3>
    <p className="text-white/70 text-sm mb-6 leading-relaxed">{description}</p>
    {children}
  </Card>
);

Card.Profile = ({ image, name, role, description, badge, email, link, className, ...props }) => (
  <Card hover className={clsx("flex flex-col items-center text-center", className)} {...props}>
    <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden mb-4 border-4 border-college-gold/20 shadow-lg">
      <img src={image} alt={name} className="w-full h-full object-cover" />
    </div>
    <div className="mb-3">{badge}</div>
    <h3 className="text-xl font-serif font-bold text-college-navy mb-1">{name}</h3>
    <p className="text-college-gold text-xs font-bold uppercase tracking-widest mb-3">{role}</p>
    {description && <p className="text-gray-600 text-sm mb-4 line-clamp-2">{description}</p>}
    <div className="flex items-center gap-4 mt-auto">
      {email && (
        <a href={`mailto:${email}`} className="text-gray-400 hover:text-college-gold transition-colors">
          <Mail className="w-5 h-5" />
        </a>
      )}
      {link && (
        <Link to={link} className="text-college-navy hover:text-college-gold font-bold text-sm flex items-center gap-1">
          Profile <ArrowRight className="w-4 h-4" />
        </Link>
      )}
    </div>
  </Card>
);

export default Card;
