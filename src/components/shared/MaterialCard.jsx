import { FileText, Play, Image as ImageIcon, File } from 'lucide-react';

/*
 Shared MaterialCard
 
 Accepts a `material` object with: { title, type, uploadDate/date, description, classSection, subject, link }

 variant="faculty" (default) — shows icon, classSection•subject header, View (anchor) + Download link
 variant="student"— shows date, name, type badge, View + Download buttons, "Tap to preview"
 */

const typeBadge = {
    PDF: 'bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-400',
    Slides: 'bg-blue-50 dark:bg-blue-900/30 text-college-gold',
    Notes: 'bg-cyan-50 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-400',
    Image: 'bg-sky-50 dark:bg-sky-900/30 text-sky-700 dark:text-sky-400',
    Video: 'bg-slate-50 dark:bg-slate-800/30 text-slate-700 dark:text-slate-400',
};

const badgeColors = {
    PDF: 'text-red-700 dark:text-red-400 bg-red-50 dark:bg-red-900/30 border-red-100 dark:border-red-700/40',
    Video: 'text-slate-700 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/30 border-slate-100 dark:border-slate-700/40',
    Image: 'text-sky-700 dark:text-sky-400 bg-sky-50 dark:bg-sky-900/30 border-sky-100 dark:border-sky-700/40',
    Notes: 'text-cyan-700 dark:text-cyan-400 bg-cyan-50 dark:bg-cyan-900/30 border-cyan-100 dark:border-cyan-700/40',
    Slides: 'text-college-gold bg-blue-50 dark:bg-blue-900/30 border-blue-100 dark:border-blue-700/40',
};

const iconForType = {
    PDF: FileText,
    Slides: FileText,
    Notes: FileText,
    Image: ImageIcon,
    Video: Play,
};

const MaterialCard = ({ material, role = 'faculty' }) => {
    if (role === 'student') {
        const badgeClass = badgeColors[material.type] || 'text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800 border-gray-100 dark:border-gray-700';
        return (
            <div className="bg-white dark:bg-dark-surface border dark:border-dark-border rounded-2xl p-4 shadow-sm hover:shadow-md transition-all duration-300">
                <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                        <p className="text-xs text-gray-500 dark:text-gray-400">{material.date || material.uploadDate}</p>
                        <h3 className="text-lg font-semibold text-college-navy dark:text-white break-words">{material.title || material.name}</h3>
                        {material.description && (
                            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 break-words">{material.description}</p>
                        )}
                    </div>
                    <span className={`text-xs font-semibold px-3 py-1 rounded-full border shrink-0 ${badgeClass}`}>
                        {material.type}
                    </span>
                </div>
                <div className="flex items-center justify-between mt-4 text-sm">
                    <div className="flex items-center gap-3">
                        <button className="text-college-gold font-semibold hover:text-college-gold/80">
                            View
                        </button>
                        <button className="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200">
                            Download
                        </button>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Tap to preview</p>
                </div>
            </div>
        );
    }

    // faculty variant (default)
    const badge = typeBadge[material.type] || 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300';
    const Icon = iconForType[material.type] || File;

    return (
        <div className="bg-white dark:bg-dark-surface border dark:border-dark-border rounded-2xl p-4 shadow-sm hover:shadow-md transition-all duration-300 space-y-3">
            <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl ${badge} flex items-center justify-center`}>
                        <Icon size={18} />
                    </div>
                    <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                            {material.classSection} • {material.subject}
                        </p>
                        <h3 className="text-lg font-semibold text-college-navy dark:text-white">{material.title}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{material.type}</p>
                    </div>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400">{material.uploadDate || material.date}</p>
            </div>
            <div className="flex items-center gap-3 text-sm">
                <a
                    href={material.link || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-college-gold font-semibold hover:text-college-gold/80"
                >
                    View
                </a>
                <span className="text-gray-400 dark:text-gray-600">•</span>
                <button
                    onClick={() => alert(`Starting download for: ${material.title}`)}
                    className="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
                >
                    Download
                </button>
            </div>
        </div>
    );
};

export default MaterialCard;
