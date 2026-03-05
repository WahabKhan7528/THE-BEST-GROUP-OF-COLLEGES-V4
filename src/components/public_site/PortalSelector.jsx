import { useNavigate } from 'react-router-dom';
import { LayoutGrid, ArrowRight } from "lucide-react";
import { portals } from "../../data/navigationData";

const PortalSelector = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleSelect = (path) => {
    navigate(path);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4 text-center">
        <div className="fixed inset-0 bg-college-navy/80 backdrop-blur-sm transition-opacity" onClick={onClose} />

        <div className="relative w-full max-w-4xl bg-white rounded-2xl p-5 sm:p-8 md:p-10 text-left overflow-hidden shadow-2xl border-t-4 border-college-gold">
          <div className="text-center space-y-2 md:space-y-3 mb-8 md:mb-12">
            <p className="text-xs uppercase tracking-widest font-bold text-college-gold">Portal Access</p>
            <h3 className="text-3xl md:text-4xl font-serif font-bold text-college-navy">Choose Your Portal</h3>
            <p className="text-sm text-gray-600 max-w-md mx-auto">
              Securely access your academic and administrative tools
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {portals.map(({ title, description, icon: Icon, path }) => (
              <button
                key={title}
                onClick={() => handleSelect(path)}
                className="group relative p-6 rounded-xl border-2 border-gray-100 bg-white hover:border-college-gold transition-all duration-300 text-left w-full hover:shadow-xl hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-college-gold/30"
              >
                <div className="space-y-4">
                  <div className="inline-flex p-3 rounded bg-college-navy/5 text-college-navy border border-college-navy/10 group-hover:bg-college-gold group-hover:text-white group-hover:border-college-gold transition-all shadow-sm">
                    <Icon className="w-6 h-6" />
                  </div>

                  <div className="space-y-2">
                    <h4 className="text-lg font-serif font-bold text-college-navy transition-colors">{title}</h4>
                    <p className="text-sm text-gray-600 leading-relaxed font-medium">{description}</p>
                  </div>

                  <div className="flex items-center gap-2 text-college-gold font-bold text-sm tracking-wide uppercase group-hover:gap-3 transition-all mt-4 border-t border-gray-100 pt-4">
                    <span>Continue</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortalSelector;
