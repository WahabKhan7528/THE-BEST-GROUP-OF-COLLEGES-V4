import { useState, useRef, useEffect } from 'react';
import { useNavigate, Link, useParams } from 'react-router-dom';
import PublicButton from '../../../../components/shared/PublicButton';
import { ArrowLeft, Upload, Image as ImageIcon, X, CheckCircle2, Save, Trash2, Calendar } from 'lucide-react';
import { adminGalleryImages as mockImages } from "../../../../data/adminData";


const EditGalleryImage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const fileInputRef = useRef(null);

    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({
        title: "",
        album: "",
        tags: "",
        date: ""
    });
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [isDragging, setIsDragging] = useState(false);

    useEffect(() => {
        const foundImage = mockImages.find(img => img.id === id);
        if (foundImage) {
            setForm({
                title: foundImage.title,
                album: foundImage.album,
                tags: "",
                date: foundImage.date
            });
            setPreview(foundImage.url);
        }
    }, [id]);

    const handleChange = (key, value) => {
        setForm((prev) => ({ ...prev, [key]: value }));
    };

    const handleFileSelect = (selectedFile) => {
        if (selectedFile && selectedFile.type.startsWith('image/')) {
            setFile(selectedFile);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
            };
            reader.readAsDataURL(selectedFile);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFileSelect(e.dataTransfer.files[0]);
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const removeFile = () => {
        setFile(null);
        // If we have an initial image (from mock data), revert to it? 
        // For simplicity, just clear preview if user explicitly removes.
        // Ideally, we might want a "Reset" or keep the original URL if file is removed.
        // Here, removing file means "no image selected". But we started with an image.
        // Let's assume removing means clearing the current selection/preview.
        const foundImage = mockImages.find(img => img.id === id);
        if (foundImage) {
            setPreview(foundImage.url); // Revert to original
        } else {
            setPreview(null);
        }
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        // Simulate API call
        setTimeout(() => {
            setLoading(false);
            alert("Image details updated successfully!");
            navigate("/admin/cms/gallery");
        }, 1000);
    };

    const handleDelete = () => {
        if (window.confirm("Are you sure you want to delete this image?")) {
            alert("Image deleted successfully");
            navigate("/admin/cms/gallery");
        }
    };

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                    <Link
                        to="/admin/cms/gallery"
                        className="p-2 hover:bg-white/50 rounded-full transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5 text-gray-600" />
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold text-college-navy dark:text-college-gold tracking-tight">Edit Media</h1>
                        <p className="text-gray-500 dark:text-gray-400 text-sm">Update gallery image details</p>
                    </div>
                </div>
                <button
                    onClick={handleDelete}
                    className="flex items-center gap-2 px-4 py-2 bg-rose-50 text-rose-600 rounded-xl hover:bg-rose-100 hover:text-rose-700 transition-colors text-sm font-medium"
                >
                    <Trash2 size={16} />
                    Delete
                </button>
            </div>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Left Column: Upload Area */}
                <div className="space-y-4">
                    <div
                        onDrop={handleDrop}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onClick={() => fileInputRef.current?.click()}
                        className={`
              relative aspect-square md:aspect-[4/3] rounded-2xl border-2 border-dashed transition-all duration-200 flex flex-col items-center justify-center cursor-pointer overflow-hidden
              ${isDragging
                                ? 'border-primary-500 dark:border-college-gold bg-college-navy/5 dark:bg-college-gold/10'
                                : preview
                                    ? 'border-primary-200 dark:border-college-gold/30 bg-gray-50 dark:bg-college-navy'
                                    : 'border-gray-300 dark:border-college-gold/20 bg-white dark:bg-college-navy hover:border-primary-400 dark:hover:border-college-gold/50 hover:bg-gray-50 dark:hover:bg-college-navy/80'
                            }
            `}
                    >
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={(e) => handleFileSelect(e.target.files?.[0])}
                            accept="image/*"
                            className="hidden"
                        />

                        {preview ? (
                            <div className="relative w-full h-full group">
                                <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                    <div className="flex gap-2">
                                        <button
                                            type="button"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                fileInputRef.current?.click();
                                            }}
                                            className="px-4 py-2 bg-white/20 backdrop-blur-md rounded-lg text-white hover:bg-white/40 transition-colors text-sm font-medium"
                                        >
                                            Change
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="text-center p-6 space-y-3">
                                <div className="w-16 h-16 mx-auto bg-blue-50 dark:bg-college-gold/10 text-blue-600 dark:text-college-gold rounded-full flex items-center justify-center mb-2">
                                    <Upload className="w-8 h-8" />
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-college-navy dark:text-college-gold">Click or drag image to replace</p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">SVG, PNG, JPG (max. 5MB)</p>
                                </div>
                            </div>
                        )}
                    </div>

                    {file && (
                        <div className="flex items-center gap-3 p-3 bg-white/50 border border-white/20 rounded-xl shadow-sm">
                            <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600">
                                <ImageIcon className="w-5 h-5" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-college-navy truncate">{file.name}</p>
                                <p className="text-xs text-gray-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                            </div>
                            <CheckCircle2 className="w-5 h-5 text-green-500" />
                        </div>
                    )}
                </div>

                {/* Right Column: Form Details */}
                <div className="bg-white/60 dark:bg-college-navy/60 backdrop-blur-md border border-white/60 dark:border-college-gold/20 rounded-2xl shadow-sm p-6 flex flex-col">
                    <div className="flex-1 space-y-5">
                        <div className="flex items-center gap-2 text-gray-800 dark:text-white font-semibold pb-2 border-b border-gray-100 dark:border-college-gold/20">
                            <Calendar size={18} className="text-blue-600 dark:text-college-gold" />
                            <h2>Media Details</h2>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1.5">Image Title <span className="text-red-500">*</span></label>
                                <input
                                    type="text"
                                    value={form.title}
                                    onChange={(e) => handleChange("title", e.target.value)}
                                    placeholder="e.g. Orientation Ceremony 2025"
                                    className="w-full px-4 py-2.5 bg-gray-50/50 dark:bg-college-navy/50 border border-gray-200 dark:border-college-gold/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-college-gold/20 focus:border-college-gold transition-all font-medium dark:text-white dark:placeholder-gray-500"
                                    required
                                />
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-sm font-medium text-gray-700 dark:text-gray-200">
                                    Album Collection <span className="text-red-500">*</span>
                                </label>
                                <select
                                    value={form.album}
                                    onChange={(e) => handleChange('album', e.target.value)}
                                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-college-gold/20 bg-white dark:bg-college-navy dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all text-sm"
                                    required
                                >
                                    <option value="" disabled>Select album</option>
                                    <option value="Campus Life">Campus Life</option>
                                    <option value="Events">Events</option>
                                    <option value="Facilities">Facilities</option>
                                    <option value="Academic">Academic</option>
                                    <option value="Sports">Sports</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1.5">Date</label>
                                <div className="relative">
                                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                                    <input
                                        type="text"
                                        value={form.date}
                                        onChange={(e) => handleChange("date", e.target.value)}
                                        placeholder="e.g. Sept 5, 2025"
                                        className="w-full pl-10 pr-4 py-2.5 bg-gray-50/50 dark:bg-college-navy/50 border border-gray-200 dark:border-college-gold/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-college-gold/20 focus:border-college-gold transition-all dark:text-white dark:placeholder-gray-500"
                                    />
                                </div>
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-sm font-medium text-gray-700 dark:text-gray-200">
                                    Description
                                </label>
                                <textarea
                                    value={form.description}
                                    onChange={(e) => handleChange('description', e.target.value)}
                                    placeholder="Write a short description..."
                                    rows="3"
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-college-gold/20 bg-white dark:bg-college-navy dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all resize-none text-sm"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1.5">Tags (Optional)</label>
                                <input
                                    type="text"
                                    value={form.tags}
                                    onChange={(e) => handleChange("tags", e.target.value)}
                                    placeholder="e.g. students, auditorium, celebration"
                                    className="w-full px-4 py-2.5 bg-gray-50/50 dark:bg-college-navy/50 border border-gray-200 dark:border-college-gold/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-college-gold/20 focus:border-college-gold transition-all dark:text-white dark:placeholder-gray-500"
                                />
                                <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">Comma separated</p>
                            </div>

                            <div className="pt-2 flex items-center justify-between">
                                <label className="flex items-center gap-3 cursor-pointer group">
                                    <div className="relative flex items-center">
                                        <input
                                            type="checkbox"
                                            checked={form.featured}
                                            onChange={(e) => handleChange('featured', e.target.checked)}
                                            className="peer sr-only"
                                        />
                                        <div className="w-10 h-6 bg-gray-200 dark:bg-gray-600 rounded-full peer peer-checked:bg-college-gold transition-colors"></div>
                                        <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-4 shadow-sm"></div>
                                    </div>
                                    <span className="text-sm font-medium text-gray-700 dark:text-gray-200 group-hover:text-college-gold transition-colors">
                                        Feature on Home Page
                                    </span>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="pt-4 flex gap-3">
                    <PublicButton variant="secondary" onClick={() => navigate("/admin/cms/gallery")} className="flex-1">
                        Cancel
                    </PublicButton>
                    <button
                        type="submit"
                        disabled={loading}
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-college-navy hover:bg-college-navy/90 text-white font-semibold rounded-xl shadow-md transform hover:-translate-y-0.5 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                        {loading ? (
                            <>Saving...</>
                        ) : (
                            <>
                                <Save size={18} />
                                Save Changes
                            </>
                        )}
                    </button>
                </div>
            </form >
        </div >
    );
};

export default EditGalleryImage;
