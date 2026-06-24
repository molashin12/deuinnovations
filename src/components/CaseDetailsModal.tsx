import type { PortfolioProject } from "../firebase";
import { useLanguage } from "../LanguageContext";
import { X, Activity, CheckCircle } from "lucide-react";

interface CaseDetailsModalProps {
  project: PortfolioProject | null;
  onClose: () => void;
}

export const CaseDetailsModal: React.FC<CaseDetailsModalProps> = ({ project, onClose }) => {
  const { language, t } = useLanguage();

  if (!project) return null;

  // Resolve language-specific values
  const title = 
    language === "de" ? project.titleDe || project.title :
    language === "ar" ? project.titleAr || project.title : 
    project.title;

  const role = 
    language === "de" ? project.roleDe || project.role :
    language === "ar" ? project.roleAr || project.role : 
    project.role;

  const focus = 
    language === "de" ? project.focusDe || project.focus :
    language === "ar" ? project.focusAr || project.focus : 
    project.focus;

  const description = 
    language === "de" ? project.descriptionDe || project.description :
    language === "ar" ? project.descriptionAr || project.description : 
    project.description;

  const outcome = 
    language === "de" ? project.outcomeDe || project.outcome :
    language === "ar" ? project.outcomeAr || project.outcome : 
    project.outcome;

  const details = 
    language === "de" ? project.detailsDe || project.details :
    language === "ar" ? project.detailsAr || project.details : 
    project.details;

  const services = 
    language === "de" ? project.servicesListDe || project.servicesList :
    language === "ar" ? project.servicesListAr || project.servicesList : 
    project.servicesList;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 bg-black/80 backdrop-blur-md animate-fade-in">
      <div 
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-lg border border-[var(--deu-line-strong)] bg-[var(--deu-surface-2)] p-6 md:p-8 shadow-2xl flex flex-col gap-6 no-scrollbar"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 md:top-6 md:right-6 p-1.5 rounded-full border border-[var(--deu-line)] bg-[var(--deu-panel)] hover:bg-[var(--deu-primary-soft)] hover:border-[var(--deu-primary)] hover:text-[var(--deu-primary)] cursor-pointer transition-colors"
          aria-label={t.portfolioPage.caseClose}
        >
          <X className="w-5 h-5" />
        </button>

        {/* Index and Kicker */}
        <div className="flex items-center gap-3">
          <span className="deu-project-index select-none">{project.index}</span>
          <span className="portfolio-note-kicker font-mono text-xs uppercase tracking-wider">
            {role}
          </span>
        </div>

        {/* Title */}
        <h2 className="deu-h1 text-[var(--deu-ink)] tracking-tight pr-8">
          {title}
        </h2>

        {/* Short description */}
        <p className="deu-body-lg text-[var(--deu-ink-2)] leading-relaxed italic border-l-2 border-[var(--deu-primary)] pl-4">
          {description}
        </p>

        {/* Metadata grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-2 border-y border-[var(--deu-line)]">
          <div className="flex items-start gap-2.5">
            <Activity className="w-4 h-4 text-[var(--deu-primary)] shrink-0 mt-1" />
            <div>
              <h4 className="text-xs font-mono text-[var(--deu-ink-3)] uppercase tracking-wider">
                {t.portfolioPage.caseFocus}
              </h4>
              <p className="text-sm text-[var(--deu-ink-2)] mt-0.5">{focus}</p>
            </div>
          </div>
          <div className="flex items-start gap-2.5">
            <CheckCircle className="w-4 h-4 text-[var(--deu-primary)] shrink-0 mt-1" />
            <div>
              <h4 className="text-xs font-mono text-[var(--deu-ink-3)] uppercase tracking-wider">
                {t.portfolioPage.caseOutcome}
              </h4>
              <p className="text-sm text-[var(--deu-ink-2)] mt-0.5">{outcome}</p>
            </div>
          </div>
        </div>

        {/* Technical details */}
        {details && (
          <div className="flex flex-col gap-3">
            <h4 className="text-xs font-mono text-[var(--deu-ink-3)] uppercase tracking-wider">
              {t.portfolioPage.caseDetailsTitle}
            </h4>
            <p className="text-sm text-[var(--deu-ink-2)] leading-relaxed whitespace-pre-line">
              {details}
            </p>
          </div>
        )}

        {/* Services / Deliverables */}
        <div className="flex flex-col gap-3">
          <h4 className="text-xs font-mono text-[var(--deu-ink-3)] uppercase tracking-wider">
            {t.portfolioPage.galleryServicesLabel}
          </h4>
          <div className="flex flex-wrap gap-2">
            {services.map((service, index) => (
              <span 
                key={index}
                className="portfolio-chip text-[10px] tracking-widest font-mono"
              >
                {service}
              </span>
            ))}
          </div>
        </div>

        {/* Close CTA */}
        <button
          onClick={onClose}
          className="mt-4 w-full py-3 border border-[var(--deu-line-strong)] rounded-md bg-[var(--deu-panel-strong)] text-sm font-medium hover:bg-[var(--deu-primary-soft)] hover:border-[var(--deu-primary)] hover:text-[var(--deu-primary)] cursor-pointer transition-colors"
        >
          {t.portfolioPage.caseClose}
        </button>
      </div>
    </div>
  );
};
