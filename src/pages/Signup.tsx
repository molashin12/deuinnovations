import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLanguage } from "../LanguageContext";
import { useTheme } from "../ThemeContext";
import { registerAdmin, getCurrentUser } from "../firebase";
import { 
  Lock, 
  Mail, 
  User as UserIcon,
  Eye, 
  EyeOff, 
  Sun, 
  Moon, 
  ArrowLeft 
} from "lucide-react";

export const Signup: React.FC = () => {
  const { t } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // If user is already logged in, redirect to admin
    const user = getCurrentUser();
    if (user) {
      navigate("/admin");
    }
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    setLoading(true);

    try {
      await registerAdmin(email, password, displayName);
      navigate("/admin");
    } catch (err: any) {
      console.error(err);
      if (err.message === "auth/email-already-in-use" || err.code === "auth/email-already-in-use") {
        setError("This email address is already in use.");
      } else if (err.message === "auth/weak-password" || err.code === "auth/weak-password") {
        setError("Password is too weak.");
      } else {
        setError("Registration failed. Please check details and try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-[var(--deu-surface)] overflow-hidden">
      {/* Background ambience */}
      <div className="deu-ambient" />
      
      {/* Floating back button */}
      <div className="absolute top-6 left-6 z-10">
        <Link 
          to="/" 
          className="flex items-center gap-2 text-xs font-mono tracking-wider text-[var(--deu-ink-3)] hover:text-[var(--deu-primary)] transition-colors no-underline uppercase"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{t.admin.backBtn}</span>
        </Link>
      </div>

      {/* Floating Theme Toggle */}
      <div className="absolute top-6 right-6 z-10">
        <button
          onClick={toggleTheme}
          className="p-2.5 border border-[var(--deu-line)] rounded-full bg-[var(--deu-panel)] hover:bg-[var(--deu-panel-strong)] cursor-pointer text-[var(--deu-ink)] transition-all shadow-sm"
          title="Toggle Light/Dark Mode"
          type="button"
        >
          {theme === "light" ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
        </button>
      </div>

      <div className="w-full max-w-md z-10">
        {/* Brandmark / Logo */}
        <div className="flex flex-col items-center mb-8 select-none">
          <img
            src={theme === "dark" ? "/logo-dark.png" : "/logo-light.png"}
            alt="DeuInnovation"
            className="h-20 w-auto object-contain mb-4"
          />
          <p className="text-xs text-[var(--deu-ink-3)] uppercase tracking-widest font-mono mt-1">
            Studio Portal
          </p>
        </div>

        {/* Card Panel */}
        <div className="deu-contact-panel p-8 rounded-xl shadow-xl border border-[var(--deu-line)] bg-[var(--deu-panel-strong)]/40 backdrop-blur-md flex flex-col gap-6">
          <div className="text-center">
            <h3 className="deu-h3 text-[var(--deu-ink)] m-0 font-medium">
              {t.admin.signupTitle}
            </h3>
            <p className="text-xs text-[var(--deu-ink-2)] mt-2 leading-relaxed">
              {t.admin.signupSub}
            </p>
          </div>

          {error && (
            <div className="p-3 rounded bg-[var(--deu-flag-red-soft)] border border-[var(--deu-flag-red)] text-xs text-[var(--deu-ink)]">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-mono tracking-wider text-[var(--deu-ink-3)] uppercase">
                {t.admin.displayName}
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  className="w-full bg-[var(--deu-surface-2)] border border-[var(--deu-line)] rounded-md pl-10 pr-3.5 py-2.5 text-sm text-[var(--deu-ink)] focus:outline-none focus:border-[var(--deu-primary)] transition-all"
                />
                <UserIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--deu-ink-3)] pointer-events-none" />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-mono tracking-wider text-[var(--deu-ink-3)] uppercase">
                {t.admin.email}
              </label>
              <div className="relative">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[var(--deu-surface-2)] border border-[var(--deu-line)] rounded-md pl-10 pr-3.5 py-2.5 text-sm text-[var(--deu-ink)] focus:outline-none focus:border-[var(--deu-primary)] transition-all"
                />
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--deu-ink-3)] pointer-events-none" />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-mono tracking-wider text-[var(--deu-ink-3)] uppercase">
                {t.admin.password}
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-[var(--deu-surface-2)] border border-[var(--deu-line)] rounded-md pl-10 pr-10 py-2.5 text-sm text-[var(--deu-ink)] focus:outline-none focus:border-[var(--deu-primary)] transition-all"
                />
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--deu-ink-3)] pointer-events-none" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 p-0.5 bg-transparent border-none cursor-pointer text-[var(--deu-ink-3)] hover:text-[var(--deu-ink)] focus:outline-none"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-mono tracking-wider text-[var(--deu-ink-3)] uppercase">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full bg-[var(--deu-surface-2)] border border-[var(--deu-line)] rounded-md pl-10 pr-10 py-2.5 text-sm text-[var(--deu-ink)] focus:outline-none focus:border-[var(--deu-primary)] transition-all"
                />
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--deu-ink-3)] pointer-events-none" />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-4 w-full py-3 px-4 border border-[var(--deu-primary)] rounded-full bg-[var(--deu-primary)] text-[var(--deu-primary-ink)] font-bold text-sm cursor-pointer shadow-md hover:bg-[var(--deu-primary-strong)] disabled:opacity-50 transition-all uppercase tracking-wider"
            >
              {loading ? "Registering..." : t.admin.signupBtn}
            </button>
          </form>

          <div className="text-center border-t border-[var(--deu-line)] pt-4 mt-2">
            <Link 
              to="/login" 
              className="text-xs text-[var(--deu-primary)] hover:text-[var(--deu-primary-strong)] transition-colors no-underline font-medium"
            >
              {t.admin.hasAccount}
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
};
