import { clsx } from "clsx";
import Section from "./Section";
import Badge from "./Badge";

const variants = {
    navy: {
        section: "bg-college-navy text-white border-t border-white/10",
        title: "text-white",
        description: "text-white/80",
        badge: "soft",
    },
    white: {
        section: "bg-white text-college-navy border-y border-gray-100",
        title: "text-college-navy",
        description: "text-gray-600",
        badge: "outline",
    },
    gray: {
        section: "bg-gray-50 text-college-navy border-y border-gray-200",
        title: "text-college-navy",
        description: "text-gray-600",
        badge: "soft",
    },
    glass: {
        section: "bg-college-navy relative overflow-hidden",
        title: "text-white",
        description: "text-white/80",
        badge: "soft",
        overlay: "absolute inset-0 z-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent",
    }
};

export default function CTA({
    title,
    description,
    badge,
    variant = "navy",
    children,
    className,
    spacing = "large",
    ...props
}) {
    const styles = variants[variant] || variants.navy;

    return (
        <Section
            background="unstyled"
            spacing={spacing}
            className={clsx(styles.section, className)}
            {...props}
        >
            {styles.overlay && <div className={styles.overlay}></div>}

            <div className="relative z-10 text-center max-w-4xl mx-auto">
                {badge && (
                    <Badge variant={styles.badge} className="mb-6">
                        {badge}
                    </Badge>
                )}

                {title && (
                    <h2 className={clsx(
                        "text-3xl md:text-5xl font-serif font-bold mb-6 leading-tight",
                        styles.title
                    )}>
                        {title}
                    </h2>
                )}

                {description && (
                    <p className={clsx(
                        "mb-10 text-lg md:text-xl font-light max-w-2xl mx-auto",
                        styles.description
                    )}>
                        {description}
                    </p>
                )}

                <div className="flex flex-wrap justify-center gap-4">
                    {children}
                </div>
            </div>
        </Section>
    );
}
