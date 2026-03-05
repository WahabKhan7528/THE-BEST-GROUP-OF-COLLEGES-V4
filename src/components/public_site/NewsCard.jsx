import { Link } from "react-router-dom";
import { Calendar, ArrowRight } from "lucide-react";
import { clsx } from "clsx";
import Card from "./Card";
import Badge from "./Badge";

export default function NewsCard({ news, className }) {
    return (
        <Card
            hover
            className={clsx("flex flex-col md:flex-row", className)}
        >
            {news.image && (
                <div className="md:w-1/3 h-48 md:h-auto">
                    <img src={news.image} alt={news.title} className="w-full h-full object-cover" />
                </div>
            )}
            <div className="p-6 md:p-8 flex-1">
                <div className="flex items-center gap-4 mb-3">
                    <Badge variant="subtle">{news.category}</Badge>
                    <div className="flex items-center gap-1.5 text-xs text-gray-500 font-medium">
                        <Calendar className="w-3.5 h-3.5" />
                        {news.date}
                    </div>
                </div>
                <h3 className="text-2xl font-serif font-bold text-college-navy mb-3 hover:text-college-gold transition-colors">
                    <Link to={`/news/${news.id}`}>{news.title}</Link>
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-2">{news.description}</p>
                <div className="flex items-center justify-between">
                    <Link
                        to={`/news/${news.id}`}
                        className="text-college-gold text-sm font-bold flex items-center gap-1 hover:gap-2 transition-all"
                    >
                        Read More <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            </div>
        </Card>
    );
}
