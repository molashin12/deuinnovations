import React, { useEffect, useState } from "react";
import { useLanguage } from "../LanguageContext";
import { CaseDetailsModal } from "../components/CaseDetailsModal";
import { getPortfolioProjects } from "../firebase";
import type { PortfolioProject } from "../firebase";
import { 
  ArrowUpRight, 
  Bookmark, 
  ExternalLink
} from "lucide-react";

export const Portfolio: React.FC = () => {
  const { language, t } = useLanguage();
  
  // Projects state
  const [projects, setProjects] = useState<PortfolioProject[]>([]);
  const [selectedProject, setSelectedProject] = useState<PortfolioProject | null>(null);

  // Load projects from Firebase/fallback
  useEffect(() => {
    const fetchProjects = async () => {
      const data = await getPortfolioProjects();
      setProjects(data);
    };
    fetchProjects();
    
    // Scroll to top on page mount
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  return (
    <main className="relative min-h-screen pb-20 overflow-x-hidden">
      {/* Background Aura */}
      <div className="portfolio-aura" />

      {/* 1. Header Section */}
      <section className="portfolio-shell pt-10 md:pt-16 pb-12 deu-reveal">
        <span className="portfolio-note-kicker font-mono text-xs uppercase tracking-wider block mb-3 text-[var(--deu-primary)]">
          {t.portfolioPage.curatedTitle}
        </span>
        
        {/* Main split header layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7">
            <h1 className="deu-display text-[var(--deu-ink)] pr-4">
              {t.nav.portfolio}
            </h1>
          </div>
          
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2 border-t lg:border-t-0 lg:border-l border-[var(--deu-line)] lg:pl-6">
            <div className="flex flex-col gap-2">
              <span className="portfolio-meta-line">{t.portfolioPage.noteTitle}</span>
              <p className="text-xs text-[var(--deu-ink-2)] leading-relaxed">
                {t.portfolioPage.noteVal}
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <span className="portfolio-meta-line">{t.portfolioPage.selectionTitle}</span>
              <p className="text-xs text-[var(--deu-ink-2)] leading-relaxed">
                {t.portfolioPage.selectionVal}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Featured Composition Section */}
      <section className="portfolio-shell py-12 border-t border-[var(--deu-line)]">
        <div className="flex flex-col gap-3 mb-10 max-w-xl">
          <span className="portfolio-note-kicker">{t.portfolioPage.featuredTitle}</span>
          <h2 className="deu-h2 text-[var(--deu-ink)]">{t.portfolioPage.featuredTitle}</h2>
          <p className="text-sm text-[var(--deu-ink-2)] leading-relaxed">
            {t.portfolioPage.featuredSub}
          </p>
        </div>

        {/* Featured grid mapping */}
        <div className="portfolio-salon">
          {/* Main anchor piece */}
          <div className="portfolio-feature-card portfolio-case-large flex flex-col justify-between gap-8 h-full deu-reveal">
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <span className="portfolio-meta-line">Concept Anchor // 01</span>
                <span className="px-2 py-0.5 border border-[var(--deu-primary)] rounded-full text-[9px] font-mono text-[var(--deu-primary-strong)] uppercase bg-[var(--deu-primary-soft)]">
                  Active
                </span>
              </div>
              <h3 className="deu-h1 text-[var(--deu-ink)] leading-tight">
                {t.portfolioPage.featureCardTitle}
              </h3>
              <p className="text-sm text-[var(--deu-ink-2)] leading-relaxed">
                {t.portfolioPage.featureCardDesc}
              </p>
            </div>

            <div className="flex flex-col gap-4 border-t border-[var(--deu-line)] pt-5">
              <span className="portfolio-meta-line">{t.portfolioPage.featuredOutcome}</span>
              <p className="text-xs text-[var(--deu-ink-2)] leading-relaxed">
                {t.portfolioPage.featuredOutcomeVal}
              </p>
              
              <div className="flex flex-wrap gap-2 mt-2">
                {t.portfolioPage.featureCardServices.map((service, idx) => (
                  <span key={idx} className="portfolio-chip text-[9px] tracking-widest font-mono">
                    {service}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Offsets column */}
          <div className="flex flex-col gap-6">
            {/* Secondary note card */}
            <div className="portfolio-support-card flex flex-col gap-4 justify-between deu-reveal">
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="portfolio-meta-line">Secondary Note // 02</span>
                  <Bookmark className="w-3.5 h-3.5 text-[var(--deu-primary)]" />
                </div>
                <h4 className="deu-h3 text-[var(--deu-ink)] mt-2">
                  {t.portfolioPage.supportCardTitle}
                </h4>
                <p className="text-xs text-[var(--deu-ink-2)] leading-relaxed">
                  {t.portfolioPage.supportCardDesc}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 border-t border-[var(--deu-line)] pt-4 mt-4 text-[11px]">
                <div className="flex flex-col gap-1">
                  <span className="portfolio-meta-line">{t.portfolioPage.supportCardSector}</span>
                  <span className="font-semibold text-[var(--deu-ink-2)]">{t.portfolioPage.supportCardSectorVal}</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="portfolio-meta-line">{t.portfolioPage.supportCardFocus}</span>
                  <span className="font-semibold text-[var(--deu-ink-2)]">{t.portfolioPage.supportCardFocusVal}</span>
                </div>
              </div>
            </div>

            {/* Evidence rail diagram */}
            <div className="portfolio-rail flex flex-col deu-reveal">
              <div className="portfolio-rail-block border-b border-[var(--deu-line)]">
                <span className="portfolio-cell-label">{t.portfolioPage.featuredDiagram1Label}</span>
                <p className="text-xs text-[var(--deu-ink-2)] leading-relaxed">
                  {t.portfolioPage.featuredDiagram1Val}
                </p>
              </div>
              <div className="portfolio-rail-block border-b border-[var(--deu-line)]">
                <span className="portfolio-cell-label">{t.portfolioPage.featuredDiagram2Label}</span>
                <p className="text-xs text-[var(--deu-ink-2)] leading-relaxed">
                  {t.portfolioPage.featuredDiagram2Val}
                </p>
              </div>
              <div className="portfolio-rail-block">
                <span className="portfolio-cell-label">{t.portfolioPage.featuredDiagram3Label}</span>
                <p className="text-xs text-[var(--deu-ink-2)] leading-relaxed">
                  {t.portfolioPage.featuredDiagram3Val}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Case Gallery Section */}
      <section className="portfolio-shell py-20 border-t border-[var(--deu-line)] deu-reveal">
        <div className="flex flex-col gap-3 mb-10 max-w-xl">
          <span className="portfolio-note-kicker">{t.portfolioPage.galleryTitle}</span>
          <h2 className="deu-h2 text-[var(--deu-ink)]">{t.portfolioPage.galleryTitle}</h2>
          <p className="text-sm text-[var(--deu-ink-2)] leading-relaxed">
            {t.portfolioPage.gallerySub}
          </p>
        </div>

        {/* Dynamic masonry/salon style list */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          {projects.map((proj, idx) => {
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

            const projOutcome = 
              language === "de" ? proj.outcomeDe || proj.outcome :
              language === "ar" ? proj.outcomeAr || proj.outcome : 
              proj.outcome;

            const projServices = 
              language === "de" ? proj.servicesListDe || proj.servicesList :
              language === "ar" ? proj.servicesListAr || proj.servicesList : 
              proj.servicesList;

            // Apply different card style shapes based on index to recreate salon wall aesthetics
            const cardClasses = 
              idx === 0 ? "portfolio-case-card portfolio-case-large md:col-span-2" : 
              idx === 1 ? "portfolio-case-card portfolio-case-offset" : 
              idx === 2 ? "portfolio-case-card portfolio-case-tall" : 
              "portfolio-case-card";

            return (
              <div 
                key={proj.id}
                onClick={() => setSelectedProject(proj)}
                className={`${cardClasses} group cursor-pointer flex flex-col justify-between transition-all duration-300 hover:border-[var(--deu-primary)] hover:translate-y-[-2px] deu-reveal`}
              >
                <div className="flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="deu-project-index select-none">{proj.index}</span>
                      <span className="portfolio-meta-line text-[10px] font-mono">
                        {projRole}
                      </span>
                    </div>
                    <span className="opacity-0 group-hover:opacity-100 text-[var(--deu-primary)] transition-opacity flex items-center gap-1 text-[10px] font-mono">
                      <span>INSPECT</span>
                      <ExternalLink className="w-3 h-3" />
                    </span>
                  </div>

                  <h3 className="deu-h2 text-[var(--deu-ink)] group-hover:text-[var(--deu-primary)] transition-colors mt-2">
                    {projTitle}
                  </h3>
                  
                  <p className="text-xs text-[var(--deu-ink-2)] leading-relaxed">
                    {projDesc}
                  </p>
                </div>

                <div className="flex flex-col gap-3 border-t border-[var(--deu-line)] pt-4 mt-6">
                  <div className="flex flex-col gap-0.5">
                    <span className="portfolio-meta-line text-[9px]">{t.portfolioPage.galleryOutcomeLabel}</span>
                    <span className="text-xs font-semibold text-[var(--deu-ink-2)]">
                      {projOutcome}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {projServices.map((service, sIdx) => (
                      <span key={sIdx} className="portfolio-chip text-[9px] tracking-widest font-mono">
                        {service}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. Studio Lens Section */}
      <section className="portfolio-shell py-20 border-t border-[var(--deu-line)] deu-reveal">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Main Essay */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <span className="portfolio-note-kicker">{t.portfolioPage.lensTitle}</span>
            <h2 className="deu-h2 text-[var(--deu-ink)]">{t.portfolioPage.lensTitle}</h2>
            <p className="text-sm text-[var(--deu-ink-2)] leading-relaxed italic border-l-2 border-[var(--deu-primary)] pl-4 py-1">
              {t.portfolioPage.lensSub}
            </p>
            <p className="text-xs text-[var(--deu-ink-3)] leading-relaxed">
              {t.portfolioPage.lensEssay}
            </p>
          </div>
 
          {/* Composed details cards */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="portfolio-lens-essay flex flex-col gap-3 deu-reveal">
              <span className="portfolio-note-kicker text-[10px]">{t.portfolioPage.lensCard1Kicker}</span>
              <h4 className="text-sm font-semibold text-[var(--deu-ink)]">{t.portfolioPage.lensCard1Title}</h4>
              <p className="text-[11px] text-[var(--deu-ink-3)] leading-relaxed">{t.portfolioPage.lensCard1Desc}</p>
            </div>
            <div className="portfolio-lens-essay flex flex-col gap-3 deu-reveal">
              <span className="portfolio-note-kicker text-[10px]">{t.portfolioPage.lensCard2Kicker}</span>
              <h4 className="text-sm font-semibold text-[var(--deu-ink)]">{t.portfolioPage.lensCard2Title}</h4>
              <p className="text-[11px] text-[var(--deu-ink-3)] leading-relaxed">{t.portfolioPage.lensCard2Desc}</p>
            </div>
            <div className="portfolio-lens-essay flex flex-col gap-3 deu-reveal">
              <span className="portfolio-note-kicker text-[10px]">{t.portfolioPage.lensCard3Kicker}</span>
              <h4 className="text-sm font-semibold text-[var(--deu-ink)]">{t.portfolioPage.lensCard3Title}</h4>
              <p className="text-[11px] text-[var(--deu-ink-3)] leading-relaxed">{t.portfolioPage.lensCard3Desc}</p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. CTA Section */}
      <section className="portfolio-shell py-12 border-t border-[var(--deu-line)] deu-reveal">
        <div className="portfolio-cta p-8 md:p-12 rounded-lg flex flex-col items-center text-center gap-6">
          <h2 className="deu-h1 max-w-xl text-[var(--deu-ink)]">
            {t.portfolioPage.ctaTitle}
          </h2>
          <p className="text-xs text-[var(--deu-ink-3)] max-w-md">
            {t.portfolioPage.ctaSub}
          </p>
          <a
            href="mailto:hello@deuinnovation.com"
            className="flex items-center gap-2 mt-2 px-6 py-3 border border-[var(--deu-primary)] rounded-full bg-[var(--deu-primary)] text-[var(--deu-primary-ink)] font-bold text-sm hover:bg-[var(--deu-primary-strong)] cursor-pointer transition-colors"
          >
            <span>{t.portfolioPage.ctaButton}</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>
      </section>

      {/* Concept details overlay */}
      <CaseDetailsModal 
        project={selectedProject} 
        onClose={() => setSelectedProject(null)} 
      />
    </main>
  );
};
