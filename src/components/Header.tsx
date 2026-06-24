import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useLanguage } from "../LanguageContext";
import { useTheme } from "../ThemeContext";
import type { Language } from "../i18n";
import { Sun, Moon, ArrowUpRight, Menu, X } from "lucide-react";

export const Header: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleNavClick = (sectionId: string) => {
    if (location.pathname !== "/") {
      navigate("/", { state: { scrollTo: sectionId } });
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const isLinkActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className="sticky top-0 z-50 pt-3 sm:pt-4">
      <div className="deu-shell">
        <div className="deu-liquid-nav deu-topbar">
          {/* Brandmark / Logo */}
          <Link 
            to="/" 
            className="deu-brandmark flex items-center gap-3 text-[var(--deu-ink)] no-underline outline-none"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <img
              src={theme === "dark" ? "/logo-dark.png" : "/logo-light.png"}
              alt="DeuInnovation"
              className="h-10 w-auto shrink-0 object-contain"
            />
          </Link>

          {/* Navigation Links */}
          <nav className="deu-liquid-nav__links hidden md:flex items-center gap-2 text-sm text-[var(--deu-ink-2)] md:flex-1 md:justify-center md:gap-2 md:overflow-visible">
            <button
              onClick={() => handleNavClick("services")}
              className="deu-liquid-nav__link border-none bg-transparent cursor-pointer font-medium"
            >
              {t.nav.services}
            </button>
            <button
              onClick={() => handleNavClick("work")}
              className="deu-liquid-nav__link border-none bg-transparent cursor-pointer font-medium"
            >
              {t.nav.work}
            </button>
            <button
              onClick={() => handleNavClick("method")}
              className="deu-liquid-nav__link border-none bg-transparent cursor-pointer font-medium"
            >
              {t.nav.method}
            </button>
            <Link
              to="/portfolio"
              className={`deu-liquid-nav__link font-medium no-underline ${
                isLinkActive("/portfolio")
                  ? "text-[var(--deu-primary)] border-[var(--deu-line-strong)] bg-[var(--deu-panel-strong)]"
                  : ""
              }`}
            >
              {t.nav.portfolio}
            </Link>
            <button
              onClick={() => handleNavClick("contact")}
              className="deu-liquid-nav__link border-none bg-transparent cursor-pointer font-medium"
            >
              {t.nav.contact}
            </button>
          </nav>

          {/* Topbar Controls */}
          <div className="deu-topbar__controls ml-auto flex items-center gap-2.5 sm:gap-3">
            {/* Theme Toggle Button */}
            <div className="hidden md:inline-flex">
              <button
                type="button"
                onClick={toggleTheme}
                className="deu-theme-toggle border-none cursor-pointer"
                aria-pressed={theme === "dark"}
                aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
              >
                <span className="deu-theme-toggle__track" aria-hidden="true">
                  <span className={`deu-theme-toggle__thumb ${theme === "dark" ? "translate-x-[2.15rem]" : "translate-x-0"}`}></span>
                  <span className="deu-theme-toggle__glyph deu-theme-toggle__glyph--sun">
                    <Sun className="h-3.5 w-3.5" />
                  </span>
                  <span className="deu-theme-toggle__glyph deu-theme-toggle__glyph--moon">
                    <Moon className="h-3.5 w-3.5" />
                  </span>
                </span>
                <span className="deu-theme-toggle__label">
                  {theme === "dark" ? "Dark" : "Light"}
                </span>
              </button>
            </div>

            {/* Language Switcher */}
            <div className="deu-lang-switch hidden md:inline-flex items-center justify-center rounded-full border border-[var(--deu-line)] bg-[var(--deu-panel)] p-1 text-xs text-[var(--deu-ink-2)]">
              {(["en", "de", "ar"] as Language[]).map((lang) => (
                <button
                  key={lang}
                  onClick={() => setLanguage(lang)}
                  className={`inline-flex min-w-9 items-center justify-center whitespace-nowrap rounded-full px-2.5 py-2 font-medium text-[11px] transition-colors duration-150 cursor-pointer border-none sm:min-w-11 sm:px-3 sm:text-xs ${
                    language === lang
                      ? "bg-[var(--deu-primary)] text-[var(--deu-primary-ink)] font-semibold"
                      : "hover:bg-[var(--deu-panel-strong)] hover:text-[var(--deu-ink)] bg-transparent text-[var(--deu-ink-2)]"
                  }`}
                >
                  {lang.toUpperCase()}
                </button>
              ))}
            </div>

            {/* Start a conversation CTA (on large screens) */}
            <button
              onClick={() => handleNavClick("contact")}
              className="hidden lg:flex items-center gap-1.5 px-4 py-2 border border-[var(--deu-line-strong)] rounded-full bg-[var(--deu-panel-strong)] text-sm font-medium text-[var(--deu-ink)] hover:bg-[var(--deu-primary-soft)] hover:border-[var(--deu-primary)] hover:text-[var(--deu-primary-strong)] cursor-pointer transition-all duration-200"
            >
              <span>{t.nav.startConversation}</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>

            {/* Studio Console Link */}
            <Link
              to="/admin"
              className="hidden md:inline-block text-xs text-[var(--deu-ink-3)] hover:text-[var(--deu-primary)] transition-colors p-1 no-underline font-mono"
              title="Studio Console"
            >
              Console
            </Link>

            {/* Mobile Menu Toggle Button */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="flex md:hidden items-center justify-center w-10 h-10 rounded-full border border-[var(--deu-line-strong)] bg-[var(--deu-panel)] text-[var(--deu-ink)] cursor-pointer hover:bg-[var(--deu-panel-strong)] transition-all"
              aria-expanded={isMobileMenuOpen}
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

          {/* Mobile Dropdown Menu Panel */}
          {isMobileMenuOpen && (
            <div className="absolute top-[calc(100%+0.5rem)] left-0 right-0 z-40 md:hidden deu-mobile-drawer border border-[var(--deu-line-strong)] rounded-2xl bg-[var(--deu-surface)]/95 backdrop-blur-2xl shadow-xl flex flex-col gap-5 p-5">
              <nav className="flex flex-col gap-2.5">
                <button
                  onClick={() => {
                    handleNavClick("services");
                    setIsMobileMenuOpen(false);
                  }}
                  className="text-start w-full py-2 px-3 border-none bg-transparent cursor-pointer font-medium text-[var(--deu-ink)] hover:text-[var(--deu-primary)] hover:bg-[var(--deu-panel)] rounded-lg transition-all"
                >
                  {t.nav.services}
                </button>
                <button
                  onClick={() => {
                    handleNavClick("work");
                    setIsMobileMenuOpen(false);
                  }}
                  className="text-start w-full py-2 px-3 border-none bg-transparent cursor-pointer font-medium text-[var(--deu-ink)] hover:text-[var(--deu-primary)] hover:bg-[var(--deu-panel)] rounded-lg transition-all"
                >
                  {t.nav.work}
                </button>
                <button
                  onClick={() => {
                    handleNavClick("method");
                    setIsMobileMenuOpen(false);
                  }}
                  className="text-start w-full py-2 px-3 border-none bg-transparent cursor-pointer font-medium text-[var(--deu-ink)] hover:text-[var(--deu-primary)] hover:bg-[var(--deu-panel)] rounded-lg transition-all"
                >
                  {t.nav.method}
                </button>
                <Link
                  to="/portfolio"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`text-start w-full py-2 px-3 font-medium no-underline block text-[var(--deu-ink)] hover:text-[var(--deu-primary)] hover:bg-[var(--deu-panel)] rounded-lg transition-all ${
                    isLinkActive("/portfolio") ? "text-[var(--deu-primary)] bg-[var(--deu-panel-strong)]" : ""
                  }`}
                >
                  {t.nav.portfolio}
                </Link>
                <button
                  onClick={() => {
                    handleNavClick("contact");
                    setIsMobileMenuOpen(false);
                  }}
                  className="text-start w-full py-2 px-3 border-none bg-transparent cursor-pointer font-medium text-[var(--deu-ink)] hover:text-[var(--deu-primary)] hover:bg-[var(--deu-panel)] rounded-lg transition-all"
                >
                  {t.nav.contact}
                </button>
              </nav>

              <div className="flex flex-col gap-4 border-t border-[var(--deu-line)] pt-4">
                {/* Theme Switcher inside Dropdown */}
                <div className="flex flex-col gap-2">
                  <span className="text-[10px] font-mono tracking-widest text-[var(--deu-ink-3)] uppercase px-3">
                    {language === "ar" ? "المظهر / التنسيق" : language === "de" ? "FARBSCHEMA / MODUS" : "THEME / APPEARANCE"}
                  </span>
                  <div className="flex items-center justify-between px-3 py-1.5 rounded-xl bg-[var(--deu-panel)]">
                    <span className="text-xs font-medium text-[var(--deu-ink-2)]">
                      {theme === "dark" 
                        ? (language === "ar" ? "الوضع الداكن" : language === "de" ? "Dunkelmodus" : "Dark Mode")
                        : (language === "ar" ? "الوضع الفاتح" : language === "de" ? "Hellmodus" : "Light Mode")
                      }
                    </span>
                    <button
                      type="button"
                      onClick={toggleTheme}
                      className="deu-theme-toggle border-none cursor-pointer"
                      aria-pressed={theme === "dark"}
                      aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
                    >
                      <span className="deu-theme-toggle__track" aria-hidden="true">
                        <span className={`deu-theme-toggle__thumb ${theme === "dark" ? "translate-x-[2.15rem]" : "translate-x-0"}`}></span>
                        <span className="deu-theme-toggle__glyph deu-theme-toggle__glyph--sun">
                          <Sun className="h-3.5 w-3.5" />
                        </span>
                        <span className="deu-theme-toggle__glyph deu-theme-toggle__glyph--moon">
                          <Moon className="h-3.5 w-3.5" />
                        </span>
                      </span>
                    </button>
                  </div>
                </div>

                {/* Language Switcher inside Dropdown */}
                <div className="flex flex-col gap-2">
                  <span className="text-[10px] font-mono tracking-widest text-[var(--deu-ink-3)] uppercase px-3">
                    Language / Sprache / اللغة
                  </span>
                  <div className="deu-lang-switch flex w-full p-1 bg-[var(--deu-panel)] rounded-full text-xs">
                    {(["en", "de", "ar"] as Language[]).map((lang) => (
                      <button
                        key={lang}
                        onClick={() => {
                          setLanguage(lang);
                          setIsMobileMenuOpen(false);
                        }}
                        className={`flex-1 min-w-0 items-center justify-center whitespace-nowrap rounded-full py-2 font-medium text-[11px] transition-colors duration-150 cursor-pointer border-none ${
                          language === lang
                            ? "bg-[var(--deu-primary)] text-[var(--deu-primary-ink)] font-semibold"
                            : "bg-transparent text-[var(--deu-ink-2)]"
                        }`}
                      >
                        {lang.toUpperCase()}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Start brief CTA button inside Dropdown */}
                <button
                  onClick={() => {
                    handleNavClick("contact");
                    setIsMobileMenuOpen(false);
                  }}
                  className="flex items-center justify-center gap-1.5 w-full py-3 border border-[var(--deu-primary)] rounded-full bg-[var(--deu-primary)] text-sm font-semibold text-[var(--deu-primary-ink)] hover:bg-[var(--deu-primary-strong)] cursor-pointer transition-all"
                >
                  <span>{t.nav.startConversation}</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>

                {/* Console Link */}
                <Link
                  to="/admin"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-center text-xs text-[var(--deu-ink-3)] hover:text-[var(--deu-primary)] transition-colors py-1 no-underline font-mono"
                >
                  Console / Control Panel
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
