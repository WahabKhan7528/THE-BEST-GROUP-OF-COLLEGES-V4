import { clsx } from "clsx";
import Card from "./Card";

export default function FacilityCard({ facility, className }) {
    return (
        <Card
            variant="flat"
            hover
            className={clsx(
                "p-6 flex flex-col items-center text-center group",
                className
            )}
        >
            <h3 className="text-lg font-serif font-bold mb-3 text-college-navy uppercase tracking-tight">
                {facility.title}
            </h3>
            <p className="text-sm text-gray-500 leading-relaxed font-sans">
                {facility.description}
            </p>
        </Card>
    );
}
