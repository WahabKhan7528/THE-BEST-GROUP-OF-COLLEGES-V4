import { Link } from "react-router-dom";
import { Clock, MapPin, ArrowRight } from "lucide-react";
import { clsx } from "clsx";
import Card from "./Card";
import Badge from "./Badge";

export default function EventCard({ event, className }) {
    return (
        <Card hover className={clsx("p-6 md:p-8 group", className)}>
            <div className="flex justify-between items-start mb-4">
                <div className="bg-college-navy/20 text-college-navy p-3 rounded-lg text-center min-w-[60px]">
                    <div className="text-xl font-bold leading-none">{event.date.split(" ")[0]}</div>
                    <div className="text-[10px] uppercase font-bold tracking-tighter">{event.date.split(" ")[1]}</div>
                </div>
                {event.status && (
                    <Badge variant="subtle" className="text-[10px]">
                        {event.status}
                    </Badge>
                )}
            </div>
            <h3 className="text-lg font-bold text-college-navy mb-2">
                <Link to={`/events/${event.id}`}>{event.title}</Link>
            </h3>
            <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-xs text-gray-500">
                    <Clock className="w-3.5 h-3.5 text-college-gold" />
                    {event.time}
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                    <MapPin className="w-3.5 h-3.5 text-college-gold" />
                    {event.location}
                </div>
            </div>
            <Link
                to={`/events/${event.id}`}
                className="text-xs font-bold text-college-gold flex items-center gap-1 hover:gap-2 transition-all"
            >
                Event Details <ArrowRight className="w-3 h-3" />
            </Link>
        </Card>
    );
}
