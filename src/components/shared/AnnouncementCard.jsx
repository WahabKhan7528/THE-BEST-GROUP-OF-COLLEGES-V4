/*
 Shared AnnouncementCard
 
 variant="faculty" (default) — shows classSection, attachment link, date on right
 variant="student"           — simpler layout: date left, title, description only
 */
const AnnouncementCard = ({ announcement, role = 'faculty' }) => {
    if (role === 'student') {
        return (
            <article className="bg-white dark:bg-dark-surface border dark:border-dark-border rounded-2xl p-5 shadow-sm hover:shadow-md transition-all duration-300">
                <div className="flex items-start justify-between gap-3">
                    <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{announcement.date}</p>
                        <h3 className="text-lg font-semibold text-college-navy dark:text-white">{announcement.title}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">{announcement.description}</p>
                    </div>
                    <span className="text-xs font-semibold text-college-navy dark:text-college-gold bg-college-navy/5 dark:bg-college-gold/10 px-3 py-1 rounded-full">
                        Announcement
                    </span>
                </div>
            </article>
        );
    }

    // faculty variant (default)
    return (
        <article className="bg-white dark:bg-dark-surface border dark:border-dark-border rounded-2xl p-5 shadow-sm hover:shadow-md transition-all duration-300">
            <div className="flex items-start justify-between gap-3">
                <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                        {announcement.classSection}
                    </p>
                    <h3 className="text-lg font-semibold text-college-navy dark:text-white">{announcement.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">{announcement.description}</p>
                    {announcement.attachment && (
                        <a href={announcement.attachment} className="text-sm text-college-gold font-semibold hover:text-college-gold/80 mt-2 inline-block">
                            View attachment
                        </a>
                    )}
                </div>
                <div className="text-right">
                    <p className="text-xs text-gray-500 dark:text-gray-400">{announcement.date}</p>
                    <span className="text-xs font-semibold text-college-navy dark:text-college-gold bg-college-navy/5 dark:bg-college-gold/10 px-3 py-1 rounded-full">
                        Announcement
                    </span>
                </div>
            </div>
        </article>
    );
};

export default AnnouncementCard;
