import { useState, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import PublicButton from '../../../../components/shared/PublicButton';
import { ArrowLeft, Upload, Image as ImageIcon, X, CheckCircle2 } from 'lucide-react';

const UploadImage = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [form, setForm] = useState({
    title: "",
    album: "",
    tags: "",
  });
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

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
    setPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!file) {
      alert("Please select an image to upload");
      return;
    }
    // alert('Image uploaded (mock)');
    navigate("/admin/cms/gallery");
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link
          to="/admin/cms/gallery"
          className="p-2 hover:bg-white/50 rounded-full transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-gray-600" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-college-navy dark:text-white">Upload Media</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">Add new photos to your campus gallery</p>
        </div>
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
                ? 'border-primary-500 bg-college-navy/5 dark:bg-college-gold/10 dark:border-college-gold'
                : preview
                  ? 'border-primary-200 bg-gray-50 dark:border-college-gold/50 dark:bg-college-navy/30'
                  : 'border-gray-300 bg-white hover:border-primary-400 hover:bg-gray-50 dark:border-college-gold/30 dark:bg-college-navy/50 dark:hover:bg-college-navy/80 hover:border-college-gold'
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
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeFile();
                    }}
                    className="p-2 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/40 transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center p-6 space-y-3">
                <div className="w-16 h-16 mx-auto bg-college-navy/5 dark:bg-college-gold/10 text-college-gold rounded-full flex items-center justify-center mb-2">
                  <Upload className="w-8 h-8" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-college-navy dark:text-gray-200">Click or drag image to upload</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">SVG, PNG, JPG (max 5MB)</p>
                </div>
              </div>
            )}
          </div>

          {file && (
            <div className="flex items-center gap-3 p-3 bg-white/50 dark:bg-college-navy/50 border border-white/20 dark:border-college-gold/20 rounded-xl shadow-sm">
              <div className="w-10 h-10 rounded-lg bg-college-navy/10 dark:bg-college-gold/10 flex items-center justify-center text-college-gold">
                <ImageIcon className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-college-navy dark:text-white truncate">{file.name}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
              </div>
              <CheckCircle2 className="w-5 h-5 text-green-500" />
            </div>
          )}
        </div>

        {/* Right Column: Details Form */}
        <div className="bg-white/80 dark:bg-college-navy backdrop-blur-xl border border-white/20 dark:border-college-gold/20 p-6 rounded-2xl shadow-sm space-y-5 h-fit">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white flex items-center gap-2">
            <ImageIcon className="w-5 h-5 text-college-gold" />
            Image Details
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Image Title <span className="text-red-500">*</span></label>
              <input
                type="text"
                value={form.title}
                onChange={(e) => handleChange("title", e.target.value)}
                placeholder="e.g. Orientation Ceremony 2025"
                className="w-full px-4 py-2.5 bg-gray-50/50 dark:bg-college-navy/50 border border-gray-200 dark:border-college-gold/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-college-gold/20 focus:border-college-gold transition-all dark:text-white dark:placeholder-gray-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Album / Category <span className="text-red-500">*</span></label>
              <select
                value={form.album}
                onChange={(e) => handleChange("album", e.target.value)}
                className="w-full px-4 py-2.5 bg-gray-50/50 dark:bg-college-navy/50 border border-gray-200 dark:border-college-gold/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-college-gold/20 focus:border-college-gold transition-all appearance-none dark:text-white"
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
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Tags (Optional)</label>
              <input
                type="text"
                value={form.tags}
                onChange={(e) => handleChange("tags", e.target.value)}
                placeholder="e.g. students, auditorium, celebration"
                className="w-full px-4 py-2.5 bg-gray-50/50 dark:bg-college-navy/50 border border-gray-200 dark:border-college-gold/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-college-gold/20 focus:border-college-gold transition-all dark:text-white dark:placeholder-gray-500"
              />
              <p className="text-xs text-gray-400 mt-1">Comma separated</p>
            </div>
          </div>

          <div className="pt-4 flex gap-3">
            <PublicButton variant="secondary" onClick={() => navigate("/admin/cms/gallery")} className="flex-1">
              Cancel
            </PublicButton>
            <button
              type="submit"
              className="flex-1 px-4 py-2.5 bg-college-navy hover:bg-college-navy/90 text-white font-semibold rounded-xl shadow-md transform hover:-translate-y-0.5 transition-all"
            >
              Upload Image
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default UploadImage;

