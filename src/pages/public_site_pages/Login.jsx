import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  ShieldCheck,
  GraduationCap,
  Users,
  ArrowRight,
  Lock,
  Mail,
  LogIn,
} from "lucide-react";
import PublicButton from "../../components/shared/PublicButton";

const Login = () => {
  const { type } = useParams();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log("Login Page Mounted");
    console.log("Portal Type:", type);
  }, [type]);

  const getPortalInfo = () => {
    const portalType = type ? type.toLowerCase() : "";

    switch (portalType) {
      case "admin":
        return {
          title: "Admin Portal",
          description: "Manage college system and operations",
          buttonClass: "bg-primary-600 hover:bg-primary-700",
          shadow: "shadow-md",
          path: "/admin/dashboard",
        };
      case "faculty":
        return {
          title: "Faculty Portal",
          description: "Access teaching resources and manage classes",
          buttonClass: "bg-primary-600 hover:bg-primary-700",
          shadow: "shadow-md",
          path: "/faculty/dashboard",
        };
      case "student":
        return {
          title: "Student Portal",
          description: "View courses, grades, and campus resources",
          buttonClass: "bg-primary-600 hover:bg-primary-700",
          shadow: "shadow-md",
          path: "/student/dashboard",
        };
      default:
        // Default fallback for unknown or missing routes
        return {
          title: "Portal Login",
          description: "Please select a valid portal",
          icon: <ShieldCheck size={40} className="text-text-secondary" />,
          buttonClass: "bg-primary-600 hover:bg-primary-700",
          shadow: "shadow-md",
          path: "/",
        };
    }
  };

  const portalinfo = getPortalInfo();

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Logging in to:", portalinfo.path);
    // Simulating login - redirect to respective dashboard
    navigate(portalinfo.path);
  };

  if (!portalinfo) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center bg-background p-4 relative">
      <div className="w-full max-w-md relative z-10">
        <div className="bg-white border border-gray-200 overflow-hidden transition-all duration-300 ease-out rounded-xl shadow-lg p-6 md:p-8 md:rounded-2xl">
          <div className="text-center mb-8 md:mb-10">
            <h1 className="text-2xl md:text-3xl font-bold text-primary-900 tracking-tight">
              {portalinfo.title}
            </h1>
            <p className="text-text-secondary mt-2 md:mt-3 text-sm md:text-base">
              {portalinfo.description}
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5 md:space-y-6">
            <div className="space-y-2">
              <label className="text-xs md:text-sm font-semibold text-primary-900">
                Email Address
              </label>
              <div className="relative group">
                <Mail
                  className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 text-text-secondary transition-colors"
                  size={18}
                />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 md:pl-12 pr-3 md:pr-4 py-2.5 md:py-3 rounded-lg md:rounded-xl border border-border bg-white focus:ring-2 focus:ring-primary-100 focus:border-primary-500 outline-none transition-all font-medium text-sm md:text-base text-primary-900 placeholder:text-text-disabled"
                  placeholder="name@example.com"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs md:text-sm font-semibold text-primary-900">
                  Password
                </label>
              </div>
              <div className="relative group">
                <Lock
                  className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 text-text-secondary transition-colors"
                  size={18}
                />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 md:pl-12 pr-3 md:pr-4 py-2.5 md:py-3 rounded-lg md:rounded-xl border border-border bg-white focus:ring-2 focus:ring-primary-100 focus:border-primary-500 outline-none transition-all font-medium text-sm md:text-base text-primary-900 placeholder:text-text-disabled"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <PublicButton
              variant="unstyled"
              size="none"
              type="submit"
              disabled={loading}
              className={`w-full py-3 md:py-3.5 px-4 ${portalinfo.buttonClass} text-white font-bold text-sm md:text-base rounded-lg md:rounded-xl ${portalinfo.shadow} hover:shadow-lg transform active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2 mt-4 disabled:opacity-70 disabled:cursor-not-allowed tracking-wide uppercase`}
            >
              <span>{loading ? "Signing in..." : "Sign In"}</span>
              {loading ? (
                <LogIn className="w-5 h-5 md:w-5 md:h-5 transition-transform" />
              ) : (
                <ArrowRight size={18} className="md:w-5 md:h-5 transition-transform" />
              )}
            </PublicButton>

            <div className="text-center mt-6">
              <p className="text-sm text-text-secondary">
                New here?{" "}
                <Link
                  to="/admissions"
                  className="text-primary-600 font-bold hover:underline transition-all"
                >
                  Apply for admission
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
