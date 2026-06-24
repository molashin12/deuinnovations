import React, { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import { useLanguage } from "../LanguageContext";
import { ContactForm } from "../components/ContactForm";
import { CaseDetailsModal } from "../components/CaseDetailsModal";
import { getPortfolioProjects } from "../firebase";
import type { PortfolioProject } from "../firebase";
import { 
  ArrowRight, 
  ArrowUpRight, 
  Code, 
  Cpu, 
  CheckCircle2, 
  ChevronRight, 
  Globe, 
  HeartPulse,
  Brain,
  Sliders,
  ChevronLeft,
  ArrowRightLeft
} from "lucide-react";

export const Home: React.FC = () => {
  const { language, t } = useLanguage();
  const location = useLocation();
  
  // Projects state
  const [projects, setProjects] = useState<PortfolioProject[]>([]);
  const [selectedProject, setSelectedProject] = useState<PortfolioProject | null>(null);
  
  // Parallax shifts for hero scene
  const [shift, setShift] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLDivElement>(null);

  // Load projects from Firebase/fallback
  useEffect(() => {
    const fetchProjects = async () => {
      const data = await getPortfolioProjects();
      setProjects(data);
    };
    fetchProjects();
  }, []);

  // Handle scroll-to navigation state
  useEffect(() => {
    const state = location.state as { scrollTo?: string } | null;
    if (state?.scrollTo) {
      const element = document.getElementById(state.scrollTo);
      if (element) {
        // Delay slightly for render completion
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
      // Clear location state so it doesn't scroll again on refresh
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  // Hero parallax mouse move handler
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    // Scale down shift values for subtle tilt
    setShift({
      x: x * 0.04,
      y: y * 0.04
    });
  };

  const handleMouseLeave = () => {
    setShift({ x: 0, y: 0 });
  };

  const handleScrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Scroll functions for horizontal work rail
  const railRef = useRef<HTMLDivElement>(null);
  const scrollRail = (direction: "left" | "right") => {
    if (!railRef.current) return;
    const scrollAmount = 400;
    railRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth"
    });
  };

  return (
    <main className="relative min-h-screen pb-16 overflow-x-hidden">
      {/* Background Ambience */}
      <div className="deu-ambient" />

      {/* 1. Hero Section */}
      <section 
        id="hero" 
        className="deu-shell pt-2 md:pt-4 pb-20 flex flex-col gap-3"
      >
        {/* Founder taglines row */}
        <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-[var(--deu-primary)] tracking-widest uppercase">
          <span>{t.hero.tagline1}</span>
          <span className="text-[var(--deu-line-strong)]">•</span>
          <span>{t.hero.tagline2}</span>
        </div>

        {/* Hero split layout */}
        <div className="deu-hero-grid">
          {/* Left Column: Messaging */}
          <div className="flex flex-col gap-6 items-start deu-reveal">
            <h1 className="deu-display text-[var(--deu-ink)] leading-none select-none">
              {t.hero.title}
            </h1>
            <p className="deu-body-lg text-[var(--deu-ink-2)] max-w-xl">
              {t.hero.description}
            </p>
            <div className="flex flex-wrap gap-4 mt-2">
              <button
                onClick={() => handleScrollToSection("contact")}
                className="px-6 py-3 border border-[var(--deu-primary)] rounded-full bg-[var(--deu-primary)] text-[var(--deu-primary-ink)] font-semibold text-sm cursor-pointer shadow-md hover:bg-[var(--deu-primary-strong)] transition-all"
              >
                {t.hero.startBrief}
              </button>
              <button
                onClick={() => handleScrollToSection("work")}
                className="px-6 py-3 border border-[var(--deu-line-strong)] rounded-full bg-[var(--deu-panel-strong)] text-sm font-semibold text-[var(--deu-ink)] hover:bg-[var(--deu-panel)] cursor-pointer transition-all"
              >
                {t.hero.selectedWork}
              </button>
            </div>
          </div>

          {/* Right Column: Premium Orb / Floating planes graphic */}
          <div 
            ref={heroRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="deu-orb-scene shadow-xl deu-reveal"
            style={{
              transform: `translate3d(${shift.x}px, ${shift.y}px, 0)`,
              transition: "transform 0.1s ease-out"
            } as React.CSSProperties}
          >
            {/* Ambient inner structures */}
            <div className="deu-stage-ring" />

            {/* Floating Plane A */}
            <div className="deu-floating-plane deu-plane-a">
              <div className="flex items-center gap-2">
                <Code className="w-4.5 h-4.5 text-[var(--deu-primary)]" />
                <span className="font-mono text-[10px] tracking-widest text-[var(--deu-ink-3)] uppercase">
                  SYSTEM_CORE
                </span>
              </div>
              <div className="text-[15px] font-semibold text-[var(--deu-ink)]">
                TypeScript / React Framework
              </div>
              <div className="text-xs text-[var(--deu-ink-3)] leading-relaxed">
                Modular component structures, optimized state loops, and responsive shells.
              </div>
            </div>

            {/* Floating Plane B */}
            <div className="deu-floating-plane deu-plane-b">
              <div className="flex items-center gap-2">
                <Cpu className="w-4.5 h-4.5 text-[var(--deu-primary)]" />
                <span className="font-mono text-[10px] tracking-widest text-[var(--deu-ink-3)] uppercase">
                  INTELLIGENCE
                </span>
              </div>
              <div className="text-[15px] font-semibold text-[var(--deu-ink)]">
                AI Automation Flow
              </div>
              <div className="text-xs text-[var(--deu-ink-3)] leading-relaxed">
                Dynamic query routing, secure content retrieval, and operational agent pipelines.
              </div>
            </div>

            {/* Floating Plane C */}
            <div className="deu-floating-plane deu-plane-c">
              <div className="flex items-center gap-2">
                <Globe className="w-4.5 h-4.5 text-[var(--deu-primary)]" />
                <span className="font-mono text-[10px] tracking-widest text-[var(--deu-ink-3)] uppercase">
                  DIVERSITY
                </span>
              </div>
              <div className="text-[15px] font-semibold text-[var(--deu-ink)]">
                Bilingual Layouts
              </div>
              <div className="text-xs text-[var(--deu-ink-3)] leading-relaxed">
                Native right-to-left structures and localized font pairings.
              </div>
            </div>

            {/* Core Backdrop Panel */}
            <div className="deu-stage-core">
              <div className="text-[11px] font-mono text-[var(--deu-primary)] tracking-widest uppercase">
                Studio Thesis
              </div>
              <div className="text-lg font-bold text-[var(--deu-ink)] tracking-tight">
                Software is an editorial problem.
              </div>
              <div className="text-xs text-[var(--deu-ink-2)] leading-relaxed">
                A product succeeds when it separates the essential signal from operating noise. We design systems to feel quiet, structured, and lasting.
              </div>
            </div>
          </div>
        </div>

        {/* 4 Mini metrics cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
          <div className="deu-mini-metric flex flex-col gap-2 deu-reveal">
            <h4 className="deu-h3 text-[var(--deu-primary)]">{t.hero.m1Title}</h4>
            <p className="text-xs text-[var(--deu-ink-2)] leading-relaxed">{t.hero.m1Desc}</p>
          </div>
          <div className="deu-mini-metric flex flex-col gap-2 deu-reveal">
            <h4 className="deu-h3 text-[var(--deu-primary)]">{t.hero.m2Title}</h4>
            <p className="text-xs text-[var(--deu-ink-2)] leading-relaxed">{t.hero.m2Desc}</p>
          </div>
          <div className="deu-mini-metric flex flex-col gap-2 deu-reveal">
            <h4 className="deu-h3 text-[var(--deu-primary)]">{t.hero.m3Title}</h4>
            <p className="text-xs text-[var(--deu-ink-2)] leading-relaxed">{t.hero.m3Desc}</p>
          </div>
          <div className="deu-mini-metric flex flex-col gap-2 deu-reveal">
            <h4 className="deu-h3 text-[var(--deu-primary)]">{t.hero.m4Title}</h4>
            <p className="text-xs text-[var(--deu-ink-2)] leading-relaxed">{t.hero.m4Desc}</p>
          </div>
        </div>
      </section>

      {/* 2. Services Section */}
      <section 
        id="services" 
        className="deu-shell py-20 border-t border-[var(--deu-line)]"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Side title */}
          <div className="lg:col-span-4 flex flex-col gap-4 deu-reveal">
            <span className="deu-caption text-[var(--deu-primary)]">{t.services.title}</span>
            <h2 className="deu-h2 text-[var(--deu-ink)]">{t.services.col1Title} & {t.services.col2Title}</h2>
            <p className="text-sm text-[var(--deu-ink-2)] leading-relaxed">{t.services.subtitle}</p>
          </div>

          {/* Cards grid */}
          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Service 1: Software Engineering */}
            <div className="deu-service-card flex flex-col gap-5 justify-between deu-reveal">
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <span className="deu-caption text-[var(--deu-ink-3)]">{t.services.col1Tag}</span>
                  <Code className="w-5 h-5 text-[var(--deu-primary)]" />
                </div>
                <h3 className="deu-h2 text-[var(--deu-ink)]">{t.services.col1Title}</h3>
                <p className="text-sm text-[var(--deu-ink-2)] leading-relaxed">{t.services.col1Desc}</p>
              </div>
              <ul className="flex flex-col gap-3.5 list-none p-0 m-0 border-t border-[var(--deu-line)] pt-5">
                {t.services.col1Bullets.map((bullet, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs text-[var(--deu-ink-2)]">
                    <CheckCircle2 className="w-4 h-4 text-[var(--deu-primary)] shrink-0 mt-0.5" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Service 2: AI Automation */}
            <div className="deu-service-card flex flex-col gap-5 justify-between deu-reveal">
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <span className="deu-caption text-[var(--deu-ink-3)]">{t.services.col2Tag}</span>
                  <Cpu className="w-5 h-5 text-[var(--deu-primary)]" />
                </div>
                <h3 className="deu-h2 text-[var(--deu-ink)]">{t.services.col2Title}</h3>
                <p className="text-sm text-[var(--deu-ink-2)] leading-relaxed">{t.services.col2Desc}</p>
              </div>
              <ul className="flex flex-col gap-3.5 list-none p-0 m-0 border-t border-[var(--deu-line)] pt-5">
                {t.services.col2Bullets.map((bullet, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs text-[var(--deu-ink-2)]">
                    <CheckCircle2 className="w-4 h-4 text-[var(--deu-primary)] shrink-0 mt-0.5" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Selected Work Section */}
      <section 
        id="work" 
        className="py-20 border-t border-[var(--deu-line)] overflow-hidden"
      >
        <div className="deu-shell mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4 deu-reveal">
          <div className="flex flex-col gap-3 max-w-xl">
            <span className="deu-caption text-[var(--deu-primary)]">{t.work.title}</span>
            <h2 className="deu-h2 text-[var(--deu-ink)]">{t.work.title}</h2>
            <p className="text-sm text-[var(--deu-ink-2)] leading-relaxed">{t.work.subtitle}</p>
          </div>
          {/* Scroll rails buttons */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => scrollRail("left")}
              className="p-2 border border-[var(--deu-line)] rounded-full bg-[var(--deu-panel)] hover:bg-[var(--deu-panel-strong)] cursor-pointer text-[var(--deu-ink)]"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-[10px] font-mono text-[var(--deu-ink-3)] uppercase tracking-widest">
              {t.work.sidewayScroll}
            </span>
            <button
              onClick={() => scrollRail("right")}
              className="p-2 border border-[var(--deu-line)] rounded-full bg-[var(--deu-panel)] hover:bg-[var(--deu-panel-strong)] cursor-pointer text-[var(--deu-ink)]"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Rail horizontal scroll */}
        <div 
          ref={railRef}
          className="deu-shell overflow-x-auto no-scrollbar scroll-smooth snap-x snap-mandatory py-4"
        >
          <div className="deu-rail">
            {projects.map((proj) => {
              const projTitle = 
                language === "de" ? proj.titleDe || proj.title :
                language === "ar" ? proj.titleAr || proj.title : 
                proj.title;

              const projRole = 
                language === "de" ? proj.roleDe || proj.role :
                language === "ar" ? proj.roleAr || proj.role : 
                proj.role;

              const projDesc = 
                language === "de" ? proj.descriptionDe || proj.description :
                language === "ar" ? proj.descriptionAr || proj.description : 
                proj.description;

              const projServices = 
                language === "de" ? proj.servicesListDe || proj.servicesList :
                language === "ar" ? proj.servicesListAr || proj.servicesList : 
                proj.servicesList;

              return (
                <div 
                  key={proj.id}
                  className="deu-project-card snap-start flex flex-col justify-between deu-reveal"
                >
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                      <span className="deu-project-index select-none">{proj.index}</span>
                      <span className="text-[10px] font-mono text-[var(--deu-ink-3)] uppercase tracking-wider">
                        {projRole}
                      </span>
                    </div>
                    <h3 className="deu-h2 text-[var(--deu-ink)] mt-2 hover:text-[var(--deu-primary)] transition-colors">
                      {projTitle}
                    </h3>
                    <p className="text-xs text-[var(--deu-ink-2)] leading-relaxed">
                      {projDesc}
                    </p>
                  </div>

                  <div className="flex flex-col gap-4 border-t border-[var(--deu-line)] pt-4 mt-auto">
                    {/* Render tags */}
                    <div className="flex flex-wrap gap-1.5">
                      {projServices.slice(0, 3).map((tag, idx) => (
                        <span 
                          key={idx} 
                          className="px-2 py-0.5 border border-[var(--deu-line)] rounded-full text-[9px] font-mono tracking-wider text-[var(--deu-ink-3)] uppercase bg-[var(--deu-panel)]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    {/* Action button */}
                    <button
                      onClick={() => setSelectedProject(proj)}
                      className="w-full flex items-center justify-between text-xs font-semibold text-[var(--deu-primary)] hover:text-[var(--deu-primary-strong)] bg-transparent border-none cursor-pointer group mt-1"
                    >
                      <span>{t.work.reviewConcept}</span>
                      <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. Build Method Section */}
      <section 
        id="method" 
        className="deu-shell py-20 border-t border-[var(--deu-line)]"
      >
        <div className="flex flex-col gap-3 mb-10 max-w-xl deu-reveal">
          <span className="deu-caption text-[var(--deu-primary)]">{t.method.title}</span>
          <h2 className="deu-h2 text-[var(--deu-ink)]">{t.method.title}</h2>
          <p className="text-sm text-[var(--deu-ink-2)] leading-relaxed">{t.method.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="deu-process-card deu-reveal">
            <div className="deu-process-number">01</div>
            <div className="flex flex-col gap-2">
              <h4 className="deu-h3 text-[var(--deu-ink)]">{t.method.s1Title}</h4>
              <p className="text-xs text-[var(--deu-ink-2)] leading-relaxed">{t.method.s1Desc}</p>
            </div>
          </div>
          <div className="deu-process-card deu-reveal">
            <div className="deu-process-number">02</div>
            <div className="flex flex-col gap-2">
              <h4 className="deu-h3 text-[var(--deu-ink)]">{t.method.s2Title}</h4>
              <p className="text-xs text-[var(--deu-ink-2)] leading-relaxed">{t.method.s2Desc}</p>
            </div>
          </div>
          <div className="deu-process-card deu-reveal">
            <div className="deu-process-number">03</div>
            <div className="flex flex-col gap-2">
              <h4 className="deu-h3 text-[var(--deu-ink)]">{t.method.s3Title}</h4>
              <p className="text-xs text-[var(--deu-ink-2)] leading-relaxed">{t.method.s3Desc}</p>
            </div>
          </div>
          <div className="deu-process-card deu-reveal">
            <div className="deu-process-number">04</div>
            <div className="flex flex-col gap-2">
              <h4 className="deu-h3 text-[var(--deu-ink)]">{t.method.s4Title}</h4>
              <p className="text-xs text-[var(--deu-ink-2)] leading-relaxed">{t.method.s4Desc}</p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Cross-market Fluency Section */}
      <section 
        id="fluency" 
        className="deu-shell py-20 border-t border-[var(--deu-line)]"
      >
        <div className="flex flex-col gap-3 mb-10 max-w-xl deu-reveal">
          <span className="deu-caption text-[var(--deu-primary)]">{t.fluency.title}</span>
          <h2 className="deu-h2 text-[var(--deu-ink)]">{t.fluency.title}</h2>
          <p className="text-sm text-[var(--deu-ink-2)] leading-relaxed">{t.fluency.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* English card */}
          <div className="deu-language-card flex flex-col gap-5 justify-between deu-reveal">
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between border-b border-[var(--deu-line)] pb-3">
                <span className="text-sm font-semibold text-[var(--deu-ink)]">{t.fluency.enTitle}</span>
                <span className="text-xs font-mono font-bold text-[var(--deu-primary)]">{t.fluency.enTag}</span>
              </div>
              <p className="text-sm italic font-medium text-[var(--deu-ink-2)] leading-relaxed pl-2.5 border-l border-[var(--deu-line-strong)]">
                {t.fluency.enQuote}
              </p>
            </div>
            <p className="text-xs text-[var(--deu-ink-3)] leading-relaxed mt-2">{t.fluency.enDesc}</p>
          </div>

          {/* German card */}
          <div className="deu-language-card flex flex-col gap-5 justify-between deu-reveal">
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between border-b border-[var(--deu-line)] pb-3">
                <span className="text-sm font-semibold text-[var(--deu-ink)]">{t.fluency.deTitle}</span>
                <span className="text-xs font-mono font-bold text-[var(--deu-primary)]">{t.fluency.deTag}</span>
              </div>
              <p className="text-sm italic font-medium text-[var(--deu-ink-2)] leading-relaxed pl-2.5 border-l border-[var(--deu-line-strong)]">
                {t.fluency.deQuote}
              </p>
            </div>
            <p className="text-xs text-[var(--deu-ink-3)] leading-relaxed mt-2">{t.fluency.deDesc}</p>
          </div>

          {/* Arabic card */}
          <div className="deu-language-card flex flex-col gap-5 justify-between deu-reveal">
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between border-b border-[var(--deu-line)] pb-3">
                <span className="text-sm font-semibold text-[var(--deu-ink)]">{t.fluency.arTitle}</span>
                <span className="text-xs font-mono font-bold text-[var(--deu-primary)]">{t.fluency.arTag}</span>
              </div>
              <p className="text-sm italic font-medium text-[var(--deu-ink-2)] leading-relaxed pr-2.5 border-r border-[var(--deu-line-strong)]">
                {t.fluency.arQuote}
              </p>
            </div>
            <p className="text-xs text-[var(--deu-ink-3)] leading-relaxed mt-2">{t.fluency.arDesc}</p>
          </div>
        </div>
      </section>

      {/* 6. Horizons Section */}
      <section 
        id="horizons" 
        className="deu-shell py-20 border-t border-[var(--deu-line)]"
      >
        <div className="flex flex-col gap-3 mb-10 max-w-xl deu-reveal">
          <span className="deu-caption text-[var(--deu-primary)]">{t.horizons.title}</span>
          <h2 className="deu-h2 text-[var(--deu-ink)]">{t.horizons.title}</h2>
          <p className="text-sm text-[var(--deu-ink-2)] leading-relaxed">{t.horizons.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="deu-future-card flex flex-col gap-4 deu-reveal">
            <div className="p-2 w-fit rounded bg-[var(--deu-primary-soft)] text-[var(--deu-primary)]">
              <ArrowRightLeft className="w-5 h-5" />
            </div>
            <h4 className="deu-h3 text-[var(--deu-ink)]">{t.horizons.c1Title}</h4>
            <p className="text-xs text-[var(--deu-ink-2)] leading-relaxed">{t.horizons.c1Desc}</p>
          </div>
          <div className="deu-future-card flex flex-col gap-4 deu-reveal">
            <div className="p-2 w-fit rounded bg-[var(--deu-primary-soft)] text-[var(--deu-primary)]">
              <Brain className="w-5 h-5" />
            </div>
            <h4 className="deu-h3 text-[var(--deu-ink)]">{t.horizons.c2Title}</h4>
            <p className="text-xs text-[var(--deu-ink-2)] leading-relaxed">{t.horizons.c2Desc}</p>
          </div>
          <div className="deu-future-card flex flex-col gap-4 deu-reveal">
            <div className="p-2 w-fit rounded bg-[var(--deu-primary-soft)] text-[var(--deu-primary)]">
              <HeartPulse className="w-5 h-5" />
            </div>
            <h4 className="deu-h3 text-[var(--deu-ink)]">{t.horizons.c3Title}</h4>
            <p className="text-xs text-[var(--deu-ink-2)] leading-relaxed">{t.horizons.c3Desc}</p>
          </div>
          <div className="deu-future-card flex flex-col gap-4 deu-reveal">
            <div className="p-2 w-fit rounded bg-[var(--deu-primary-soft)] text-[var(--deu-primary)]">
              <Sliders className="w-5 h-5" />
            </div>
            <h4 className="deu-h3 text-[var(--deu-ink)]">{t.horizons.c4Title}</h4>
            <p className="text-xs text-[var(--deu-ink-2)] leading-relaxed">{t.horizons.c4Desc}</p>
          </div>
        </div>
      </section>

      {/* 7. Contact Section */}
      <section 
        id="contact" 
        className="deu-shell py-20 border-t border-[var(--deu-line)]"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Brief details */}
          <div className="lg:col-span-5 flex flex-col gap-8 deu-reveal">
            <div className="flex flex-col gap-3">
              <span className="deu-caption text-[var(--deu-primary)]">{t.contact.title}</span>
              <h2 className="deu-h2 text-[var(--deu-ink)]">{t.contact.title}</h2>
              <p className="text-sm text-[var(--deu-ink-2)] leading-relaxed">{t.contact.subtitle}</p>
            </div>

            <div className="flex flex-col gap-4 border-t border-[var(--deu-line)] pt-6">
              <div className="deu-list-row-lg">
                <span className="text-xs font-mono text-[var(--deu-ink-3)] uppercase tracking-wider">{t.contact.bestFit}</span>
                <span className="text-xs font-medium text-[var(--deu-ink)] text-right">{t.contact.bestFitVal}</span>
              </div>
              <div className="deu-list-row-lg">
                <span className="text-xs font-mono text-[var(--deu-ink-3)] uppercase tracking-wider">{t.contact.studioProfile}</span>
                <span className="text-xs font-medium text-[var(--deu-ink)] text-right">{t.contact.studioProfileVal}</span>
              </div>
              <div className="deu-list-row-lg">
                <span className="text-xs font-mono text-[var(--deu-ink-3)] uppercase tracking-wider">{t.contact.engagementStyle}</span>
                <span className="text-xs font-medium text-[var(--deu-ink)] text-right">{t.contact.engagementStyleVal}</span>
              </div>
            </div>

            {/* Direct Studio Email */}
            <a 
              href="mailto:hello@deuinnovation.com"
              className="w-fit flex items-center gap-2 px-5 py-3 border border-[var(--deu-line-strong)] rounded-full bg-[var(--deu-panel-strong)] text-sm font-semibold text-[var(--deu-ink)] hover:border-[var(--deu-primary)] hover:text-[var(--deu-primary)] transition-all"
            >
              <span>hello@deuinnovation.com</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>

          {/* Right Column: Brief form builder */}
          <div className="lg:col-span-7 w-full deu-reveal">
            <ContactForm />
          </div>
        </div>
      </section>

      {/* Case inspector modal overlay */}
      <CaseDetailsModal 
        project={selectedProject} 
        onClose={() => setSelectedProject(null)} 
      />
    </main>
  );
};
