import { clsx } from "clsx";

export default function CampusHero({ title, image, alt, className }) {
    return (
        <section
            className={clsx(
                "relative h-[50vh] md:h-[60vh] flex items-center justify-center overflow-hidden",
                className
            )}
        >
            <div className="absolute inset-0 z-0">
                <img
                    src={image}
                    alt={alt || title}
                    className="w-full h-full object-cover object-center"
                    loading="eager"
                    fetchpriority="high"
                />
            </div>
            <div className="absolute inset-0 z-0 bg-college-navy/50" />
            <h1 className="relative z-10 text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white uppercase leading-tight tracking-wider text-center px-6">
                {title}
            </h1>
        </section>
    );
}
