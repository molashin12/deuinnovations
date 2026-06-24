import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { LanguageProvider } from "./LanguageContext";
import { ThemeProvider } from "./ThemeContext";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Home } from "./pages/Home";
import { Portfolio } from "./pages/Portfolio";
import { Admin } from "./pages/Admin";
import { Login } from "./pages/Login";
import { Signup } from "./pages/Signup";

import { useEffect } from "react";

function AppContent() {
  const location = useLocation();
  const isAuthPage = location.pathname === "/login" || location.pathname === "/signup";

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      document.querySelectorAll(".deu-reveal").forEach((el) => el.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    const queryAndObserve = () => {
      document.querySelectorAll(".deu-reveal").forEach((el) => observer.observe(el));
    };

    queryAndObserve();
    const t1 = setTimeout(queryAndObserve, 200);
    const t2 = setTimeout(queryAndObserve, 600);
    const t3 = setTimeout(queryAndObserve, 1200);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      observer.disconnect();
    };
  }, [location.pathname]);

  return (
    <div className="flex flex-col min-h-screen bg-[var(--deu-surface)] text-[var(--deu-ink)] selection:bg-[var(--deu-primary)] selection:text-[var(--deu-primary-ink)]">
      {/* Global Header */}
      {!isAuthPage && <Header />}
      
      {/* Main App Content Area */}
      <div className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </div>

      {/* Global Footer */}
      {!isAuthPage && <Footer />}
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <Router>
          <AppContent />
        </Router>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
