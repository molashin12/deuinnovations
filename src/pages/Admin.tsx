import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../LanguageContext";
import { 
  logoutAdmin, 
  getBriefs, 
  updateBriefStatus, 
  getPortfolioProjects, 
  saveProject, 
  deleteProject,
  isFirebaseConfigured,
  subscribeToAuth,
  seedPortfolioDatabase
} from "../firebase";
import type { ProjectBrief, PortfolioProject } from "../firebase";
import type { User } from "firebase/auth";
import { 
  Briefcase, 
  FileText, 
  LogOut, 
  Plus, 
  Edit, 
  Trash2, 
  Check, 
  Archive, 
  RefreshCw
} from "lucide-react";

export const Admin: React.FC = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  
  // Auth state
  const [user, setUser] = useState<User | null>(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true);

  // Dashboard state
  const [activeTab, setActiveTab] = useState<"briefs" | "portfolio">("briefs");
  const [briefs, setBriefs] = useState<ProjectBrief[]>([]);
  const [projects, setProjects] = useState<PortfolioProject[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSeeding, setIsSeeding] = useState(false);

  // Portfolio editing state
  const [editingProject, setEditingProject] = useState<Partial<PortfolioProject> | null>(null);
  const [isSavingProject, setIsSavingProject] = useState(false);
  const [formLang, setFormLang] = useState<"en" | "de" | "ar">("en");

  // Check current auth status on mount
  useEffect(() => {
    const unsubscribe = subscribeToAuth((currentUser) => {
      setUser(currentUser);
      setIsAuthLoading(false);
      if (!currentUser) {
        navigate("/login");
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  // Fetch dashboard data once logged in
  useEffect(() => {
    if (user) {
      fetchData();
    }
  }, [user, activeTab]);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      if (activeTab === "briefs") {
        const data = await getBriefs();
        setBriefs(data);
      } else {
        const data = await getPortfolioProjects();
        setProjects(data);
      }
    } catch (err) {
      console.error("Error loading admin data: ", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    await logoutAdmin();
    setUser(null);
    navigate("/login");
  };

  const handleUpdateStatus = async (id: string, status: "new" | "reviewed" | "archived") => {
    try {
      await updateBriefStatus(id, status);
      // Update local state instead of full refetch
      setBriefs(briefs.map((b) => (b.id === id ? { ...b, status } : b)));
    } catch (err) {
      console.error("Failed to update status: ", err);
    }
  };

  const handleEditProjectClick = (proj: PortfolioProject) => {
    setEditingProject(proj);
  };

  const handleAddProjectClick = () => {
    setEditingProject({
      id: "project_" + Math.random().toString(36).substring(2, 9),
      index: String(projects.length + 1).padStart(2, "0"),
      title: "",
      titleDe: "",
      titleAr: "",
      description: "",
      descriptionDe: "",
      descriptionAr: "",
      role: "",
      roleDe: "",
      roleAr: "",
      focus: "",
      focusDe: "",
      focusAr: "",
      outcome: "",
      outcomeDe: "",
      outcomeAr: "",
      details: "",
      detailsDe: "",
      detailsAr: "",
      servicesList: [],
      servicesListDe: [],
      servicesListAr: [],
      featured: false
    });
  };

  const handleDeleteProjectClick = async (id: string) => {
    if (!window.confirm("Are you sure you want to decommission this project from the database?")) return;
    try {
      await deleteProject(id);
      setProjects(projects.filter((p) => p.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const handleSeedDatabase = async () => {
    if (!window.confirm("This will populate the Firestore database with 4 default portfolio case studies. Continue?")) return;
    setIsSeeding(true);
    try {
      await seedPortfolioDatabase();
      await fetchData(); // Reload to show newly seeded projects
    } catch (err) {
      console.error("Seeding failed:", err);
      alert("Seeding failed. Check the console for details.");
    } finally {
      setIsSeeding(false);
    }
  };

  const handleSaveProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProject || !editingProject.id || !editingProject.title) {
      alert("Missing Project ID or Title.");
      return;
    }

    setIsSavingProject(true);
    try {
      await saveProject(editingProject as PortfolioProject);
      setEditingProject(null);
      fetchData(); // Refetch updated projects list
    } catch (err) {
      console.error(err);
    } finally {
      setIsSavingProject(false);
    }
  };

  // Render protected loading state
  if (isAuthLoading || !user) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] text-[var(--deu-ink-3)] font-mono text-xs">
        <div className="flex flex-col items-center gap-3">
          <RefreshCw className="w-5 h-5 animate-spin text-[var(--deu-primary)]" />
          <span>AUTHENTICATING...</span>
        </div>
      </div>
    );
  }

  // Render Dashboard
  return (
    <main className="deu-shell pt-10 pb-20 flex flex-col gap-8">
      {/* Admin header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-[var(--deu-line)] pb-6">
        <div>
          <h1 className="deu-h1 text-[var(--deu-ink)]">{t.admin.dashboardTitle}</h1>
          <p className="text-xs text-[var(--deu-ink-3)] mt-1">{t.admin.dashboardSub}</p>
        </div>
        
        <div className="flex items-center gap-3">
          <button
            onClick={fetchData}
            className="p-2 border border-[var(--deu-line)] rounded-full bg-[var(--deu-panel)] hover:bg-[var(--deu-panel-strong)] cursor-pointer text-[var(--deu-ink)]"
            title="Refresh list"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 px-4 py-2 border border-[var(--deu-flag-red)]/50 rounded-full bg-[var(--deu-flag-red-soft)] text-xs font-semibold text-[var(--deu-ink)] hover:border-[var(--deu-flag-red)] cursor-pointer transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>{t.admin.logoutBtn}</span>
          </button>
        </div>
      </div>

      {/* Tabs switches */}
      <div className="flex border-b border-[var(--deu-line)] p-0.5 w-fit rounded-lg bg-[var(--deu-panel)]">
        <button
          onClick={() => { setActiveTab("briefs"); setEditingProject(null); }}
          className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-md border-none cursor-pointer transition-all ${
            activeTab === "briefs"
              ? "bg-[var(--deu-surface-2)] text-[var(--deu-primary)] shadow-sm"
              : "text-[var(--deu-ink-3)] hover:text-[var(--deu-ink)] bg-transparent"
          }`}
        >
          <FileText className="w-3.5 h-3.5" />
          <span>{t.admin.viewBriefs}</span>
        </button>
        <button
          onClick={() => { setActiveTab("portfolio"); setEditingProject(null); }}
          className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-md border-none cursor-pointer transition-all ${
            activeTab === "portfolio"
              ? "bg-[var(--deu-surface-2)] text-[var(--deu-primary)] shadow-sm"
              : "text-[var(--deu-ink-3)] hover:text-[var(--deu-ink)] bg-transparent"
          }`}
        >
          <Briefcase className="w-3.5 h-3.5" />
          <span>{t.admin.editPortfolio}</span>
        </button>
      </div>

      {/* Warning Sandbox info */}
      {!isFirebaseConfigured() && (
        <div className="p-3 rounded bg-[var(--deu-panel)] border border-[var(--deu-line)] text-xs text-[var(--deu-ink-3)] leading-relaxed">
          {t.admin.localDemoWarning}
        </div>
      )}

      {/* Tab Content 1: Client Briefs */}
      {activeTab === "briefs" && (
        <div className="flex flex-col gap-6">
          {isLoading ? (
            <div className="text-center py-12 text-sm text-[var(--deu-ink-3)]">Loading Briefs...</div>
          ) : briefs.length === 0 ? (
            <div className="text-center py-12 text-sm text-[var(--deu-ink-3)] border border-dashed border-[var(--deu-line)] rounded-lg">
              {t.admin.emptyBriefs}
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {briefs.map((brief) => (
                <div 
                  key={brief.id} 
                  className={`p-5 rounded-lg border flex flex-col gap-4 bg-[var(--deu-surface-2)] ${
                    brief.status === "new" ? "border-[var(--deu-primary)]/40" : "border-[var(--deu-line)]"
                  }`}
                >
                  <div className="flex flex-wrap justify-between items-start gap-2">
                    <div>
                      <div className="flex items-center gap-2.5">
                        <h3 className="font-bold text-base text-[var(--deu-ink)] m-0">{brief.name}</h3>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-mono uppercase font-semibold ${
                          brief.status === "new" ? "bg-[var(--deu-primary-soft)] text-[var(--deu-primary-strong)] border border-[var(--deu-primary)]" :
                          brief.status === "reviewed" ? "bg-[var(--deu-panel-strong)] text-[var(--deu-ink-2)]" :
                          "bg-black/20 text-[var(--deu-ink-3)]"
                        }`}>
                          {brief.status === "new" ? t.admin.statusNew :
                           brief.status === "reviewed" ? t.admin.statusReviewed :
                           t.admin.statusArchived}
                        </span>
                      </div>
                      <a href={`mailto:${brief.email}`} className="text-xs text-[var(--deu-primary)] hover:underline mt-1 block">
                        {brief.email}
                      </a>
                    </div>
                    
                    <span className="text-[11px] font-mono text-[var(--deu-ink-3)]">
                      {brief.createdAt ? new Date(brief.createdAt).toLocaleString() : "Date Unknown"}
                    </span>
                  </div>

                  {/* Company and Budget details */}
                  <div className="grid grid-cols-2 gap-4 text-xs bg-black/10 p-3 rounded border border-[var(--deu-line)]">
                    <div>
                      <span className="text-[10px] font-mono text-[var(--deu-ink-3)] uppercase block">{t.admin.fieldCompany}</span>
                      <span className="font-medium text-[var(--deu-ink-2)] mt-0.5 block">{brief.company || "Not specified"}</span>
                    </div>
                    <div>
                      <span className="text-[10px] font-mono text-[var(--deu-ink-3)] uppercase block">{t.admin.fieldBudget}</span>
                      <span className="font-medium text-[var(--deu-ink-2)] mt-0.5 block">{brief.budget || "Not specified"}</span>
                    </div>
                  </div>

                  {/* Services requested */}
                  <div className="flex flex-wrap gap-1.5">
                    {brief.services.map((service, sIdx) => (
                      <span key={sIdx} className="px-2 py-0.5 bg-[var(--deu-panel)] border border-[var(--deu-line)] text-[9px] font-mono rounded uppercase text-[var(--deu-ink-2)]">
                        {service}
                      </span>
                    ))}
                  </div>

                  {/* Description challenge */}
                  <p className="text-xs text-[var(--deu-ink-2)] leading-relaxed bg-[var(--deu-surface-3)] p-3 rounded border border-[var(--deu-line)] whitespace-pre-wrap">
                    {brief.description}
                  </p>

                  {/* Controls to update state */}
                  <div className="flex gap-2 justify-end border-t border-[var(--deu-line)] pt-3 mt-1">
                    {brief.status !== "reviewed" && (
                      <button
                        onClick={() => handleUpdateStatus(brief.id!, "reviewed")}
                        className="flex items-center gap-1 px-3 py-1.5 rounded border border-[var(--deu-primary)]/40 text-xs font-semibold bg-[var(--deu-primary-soft)] text-[var(--deu-primary-strong)] hover:bg-[var(--deu-primary)] hover:text-black cursor-pointer transition-all"
                      >
                        <Check className="w-3.5 h-3.5" />
                        <span>{t.admin.actionReview}</span>
                      </button>
                    )}
                    {brief.status !== "archived" && (
                      <button
                        onClick={() => handleUpdateStatus(brief.id!, "archived")}
                        className="flex items-center gap-1 px-3 py-1.5 rounded border border-[var(--deu-line-strong)] text-xs font-semibold bg-[var(--deu-panel)] text-[var(--deu-ink-2)] hover:border-white cursor-pointer transition-all"
                      >
                        <Archive className="w-3.5 h-3.5" />
                        <span>{t.admin.actionArchive}</span>
                      </button>
                    )}
                    {(brief.status === "reviewed" || brief.status === "archived") && (
                      <button
                        onClick={() => handleUpdateStatus(brief.id!, "new")}
                        className="flex items-center gap-1 px-3 py-1.5 rounded border border-[var(--deu-line-strong)] text-xs font-semibold bg-transparent text-[var(--deu-ink-3)] hover:text-[var(--deu-ink)] cursor-pointer"
                      >
                        <span>{t.admin.actionNew}</span>
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tab Content 2: Portfolio Projects */}
      {activeTab === "portfolio" && (
        <div className="flex flex-col gap-6">
          {editingProject ? (
            /* PROJECT EDIT FORM */
            <form onSubmit={handleSaveProject} className="deu-contact-panel p-6 md:p-8 rounded-lg flex flex-col gap-5 w-full">
              <h3 className="deu-h3 text-[var(--deu-primary)] font-bold">
                {editingProject.title ? t.admin.editProject : t.admin.addProject}
              </h3>

              {/* General non-translated fields */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-mono text-[var(--deu-ink-3)] uppercase">Project ID *</label>
                  <input
                    type="text"
                    required
                    disabled={!!editingProject.title} // If updating, don't allow changing ID key
                    value={editingProject.id || ""}
                    onChange={(e) => setEditingProject({ ...editingProject, id: e.target.value })}
                    className="bg-[var(--deu-surface-2)] border border-[var(--deu-line)] rounded px-3 py-2 text-xs text-[var(--deu-ink)] focus:outline-none"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-mono text-[var(--deu-ink-3)] uppercase">{t.admin.projectIndex} *</label>
                  <input
                    type="text"
                    required
                    placeholder="01"
                    value={editingProject.index || ""}
                    onChange={(e) => setEditingProject({ ...editingProject, index: e.target.value })}
                    className="bg-[var(--deu-surface-2)] border border-[var(--deu-line)] rounded px-3 py-2 text-xs text-[var(--deu-ink)] focus:outline-none"
                  />
                </div>
                <div className="flex flex-col gap-1.5 justify-end pb-2">
                  <label className="flex items-center gap-2 text-xs font-mono text-[var(--deu-ink)] uppercase cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={editingProject.featured || false}
                      onChange={(e) => setEditingProject({ ...editingProject, featured: e.target.checked })}
                      className="accent-[var(--deu-primary)] w-4 h-4 cursor-pointer"
                    />
                    <span>Featured (Show on Landing Page Rail)</span>
                  </label>
                </div>
              </div>

              {/* Translation tabs selector */}
              <div className="flex border-b border-[var(--deu-line)] pt-3 gap-2">
                {(["en", "de", "ar"] as const).map((lang) => (
                  <button
                    key={lang}
                    type="button"
                    onClick={() => setFormLang(lang)}
                    className={`px-4 py-2 text-xs font-semibold cursor-pointer border-b-2 transition-all capitalize ${
                      formLang === lang
                        ? "border-[var(--deu-primary)] text-[var(--deu-primary)] bg-[var(--deu-panel)]"
                        : "border-transparent text-[var(--deu-ink-3)] hover:text-[var(--deu-ink)]"
                    }`}
                  >
                    {lang === "en" ? "English" : lang === "de" ? "Deutsch" : "العربية (Arabic)"}
                  </button>
                ))}
              </div>

              {/* Translated fields tab panel */}
              <div className="flex flex-col gap-4">
                {formLang === "en" && (
                  <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-mono text-[var(--deu-ink-3)] uppercase">{t.admin.projectTitleEn} *</label>
                      <input
                        type="text"
                        required
                        value={editingProject.title || ""}
                        onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
                        className="bg-[var(--deu-surface-2)] border border-[var(--deu-line)] rounded px-3 py-2 text-xs text-[var(--deu-ink)] focus:outline-none"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-mono text-[var(--deu-ink-3)] uppercase">{t.admin.projectRoleEn} *</label>
                      <input
                        type="text"
                        required
                        value={editingProject.role || ""}
                        onChange={(e) => setEditingProject({ ...editingProject, role: e.target.value })}
                        className="bg-[var(--deu-surface-2)] border border-[var(--deu-line)] rounded px-3 py-2 text-xs text-[var(--deu-ink)]"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-mono text-[var(--deu-ink-3)] uppercase">{t.admin.projectFocusEn} *</label>
                      <input
                        type="text"
                        required
                        value={editingProject.focus || ""}
                        onChange={(e) => setEditingProject({ ...editingProject, focus: e.target.value })}
                        className="bg-[var(--deu-surface-2)] border border-[var(--deu-line)] rounded px-3 py-2 text-xs text-[var(--deu-ink)]"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-mono text-[var(--deu-ink-3)] uppercase">{t.admin.projectDescEn} *</label>
                      <textarea
                        required
                        rows={3}
                        value={editingProject.description || ""}
                        onChange={(e) => setEditingProject({ ...editingProject, description: e.target.value })}
                        className="bg-[var(--deu-surface-2)] border border-[var(--deu-line)] rounded px-3 py-2 text-xs text-[var(--deu-ink)]"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-mono text-[var(--deu-ink-3)] uppercase">{t.admin.projectOutcomeEn}</label>
                      <input
                        type="text"
                        value={editingProject.outcome || ""}
                        onChange={(e) => setEditingProject({ ...editingProject, outcome: e.target.value })}
                        className="bg-[var(--deu-surface-2)] border border-[var(--deu-line)] rounded px-3 py-2 text-xs text-[var(--deu-ink)]"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-mono text-[var(--deu-ink-3)] uppercase">{t.admin.projectDetailsEn}</label>
                      <textarea
                        rows={5}
                        value={editingProject.details || ""}
                        onChange={(e) => setEditingProject({ ...editingProject, details: e.target.value })}
                        className="bg-[var(--deu-surface-2)] border border-[var(--deu-line)] rounded px-3 py-2 text-xs text-[var(--deu-ink)] font-sans"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-mono text-[var(--deu-ink-3)] uppercase">{t.admin.projectServicesEn} *</label>
                      <input
                        type="text"
                        required
                        placeholder="tag1, tag2, tag3"
                        value={editingProject.servicesList?.join(", ") || ""}
                        onChange={(e) => setEditingProject({ 
                          ...editingProject, 
                          servicesList: e.target.value.split(",").map((s) => s.trim()).filter(Boolean)
                        })}
                        className="bg-[var(--deu-surface-2)] border border-[var(--deu-line)] rounded px-3 py-2 text-xs text-[var(--deu-ink)] focus:outline-none"
                      />
                    </div>
                  </div>
                )}

                {formLang === "de" && (
                  <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-mono text-[var(--deu-ink-3)] uppercase">{t.admin.projectTitleDe} (Optional)</label>
                      <input
                        type="text"
                        value={editingProject.titleDe || ""}
                        onChange={(e) => setEditingProject({ ...editingProject, titleDe: e.target.value })}
                        className="bg-[var(--deu-surface-2)] border border-[var(--deu-line)] rounded px-3 py-2 text-xs text-[var(--deu-ink)] focus:outline-none"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-mono text-[var(--deu-ink-3)] uppercase">{t.admin.projectRoleDe} (Optional)</label>
                      <input
                        type="text"
                        value={editingProject.roleDe || ""}
                        onChange={(e) => setEditingProject({ ...editingProject, roleDe: e.target.value })}
                        className="bg-[var(--deu-surface-2)] border border-[var(--deu-line)] rounded px-3 py-2 text-xs text-[var(--deu-ink)]"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-mono text-[var(--deu-ink-3)] uppercase">{t.admin.projectFocusDe} (Optional)</label>
                      <input
                        type="text"
                        value={editingProject.focusDe || ""}
                        onChange={(e) => setEditingProject({ ...editingProject, focusDe: e.target.value })}
                        className="bg-[var(--deu-surface-2)] border border-[var(--deu-line)] rounded px-3 py-2 text-xs text-[var(--deu-ink)]"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-mono text-[var(--deu-ink-3)] uppercase">{t.admin.projectDescDe} (Optional)</label>
                      <textarea
                        rows={3}
                        value={editingProject.descriptionDe || ""}
                        onChange={(e) => setEditingProject({ ...editingProject, descriptionDe: e.target.value })}
                        className="bg-[var(--deu-surface-2)] border border-[var(--deu-line)] rounded px-3 py-2 text-xs text-[var(--deu-ink)]"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-mono text-[var(--deu-ink-3)] uppercase">{t.admin.projectOutcomeDe} (Optional)</label>
                      <input
                        type="text"
                        value={editingProject.outcomeDe || ""}
                        onChange={(e) => setEditingProject({ ...editingProject, outcomeDe: e.target.value })}
                        className="bg-[var(--deu-surface-2)] border border-[var(--deu-line)] rounded px-3 py-2 text-xs text-[var(--deu-ink)]"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-mono text-[var(--deu-ink-3)] uppercase">{t.admin.projectDetailsDe} (Optional)</label>
                      <textarea
                        rows={5}
                        value={editingProject.detailsDe || ""}
                        onChange={(e) => setEditingProject({ ...editingProject, detailsDe: e.target.value })}
                        className="bg-[var(--deu-surface-2)] border border-[var(--deu-line)] rounded px-3 py-2 text-xs text-[var(--deu-ink)]"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-mono text-[var(--deu-ink-3)] uppercase">{t.admin.projectServicesDe} (Optional)</label>
                      <input
                        type="text"
                        placeholder="tag1, tag2, tag3"
                        value={editingProject.servicesListDe?.join(", ") || ""}
                        onChange={(e) => setEditingProject({ 
                          ...editingProject, 
                          servicesListDe: e.target.value.split(",").map((s) => s.trim()).filter(Boolean)
                        })}
                        className="bg-[var(--deu-surface-2)] border border-[var(--deu-line)] rounded px-3 py-2 text-xs text-[var(--deu-ink)]"
                      />
                    </div>
                  </div>
                )}

                {formLang === "ar" && (
                  <div className="flex flex-col gap-4" dir="rtl">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-mono text-[var(--deu-ink-3)] uppercase">{t.admin.projectTitleAr} (Optional)</label>
                      <input
                        type="text"
                        value={editingProject.titleAr || ""}
                        onChange={(e) => setEditingProject({ ...editingProject, titleAr: e.target.value })}
                        className="bg-[var(--deu-surface-2)] border border-[var(--deu-line)] rounded px-3 py-2 text-xs text-[var(--deu-ink)] focus:outline-none text-right"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-mono text-[var(--deu-ink-3)] uppercase">{t.admin.projectRoleAr} (Optional)</label>
                      <input
                        type="text"
                        value={editingProject.roleAr || ""}
                        onChange={(e) => setEditingProject({ ...editingProject, roleAr: e.target.value })}
                        className="bg-[var(--deu-surface-2)] border border-[var(--deu-line)] rounded px-3 py-2 text-xs text-[var(--deu-ink)] text-right"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-mono text-[var(--deu-ink-3)] uppercase">{t.admin.projectFocusAr} (Optional)</label>
                      <input
                        type="text"
                        value={editingProject.focusAr || ""}
                        onChange={(e) => setEditingProject({ ...editingProject, focusAr: e.target.value })}
                        className="bg-[var(--deu-surface-2)] border border-[var(--deu-line)] rounded px-3 py-2 text-xs text-[var(--deu-ink)] text-right"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-mono text-[var(--deu-ink-3)] uppercase">{t.admin.projectDescAr} (Optional)</label>
                      <textarea
                        rows={3}
                        value={editingProject.descriptionAr || ""}
                        onChange={(e) => setEditingProject({ ...editingProject, descriptionAr: e.target.value })}
                        className="bg-[var(--deu-surface-2)] border border-[var(--deu-line)] rounded px-3 py-2 text-xs text-[var(--deu-ink)] text-right"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-mono text-[var(--deu-ink-3)] uppercase">{t.admin.projectOutcomeAr} (Optional)</label>
                      <input
                        type="text"
                        value={editingProject.outcomeAr || ""}
                        onChange={(e) => setEditingProject({ ...editingProject, outcomeAr: e.target.value })}
                        className="bg-[var(--deu-surface-2)] border border-[var(--deu-line)] rounded px-3 py-2 text-xs text-[var(--deu-ink)] text-right"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-mono text-[var(--deu-ink-3)] uppercase">{t.admin.projectDetailsAr} (Optional)</label>
                      <textarea
                        rows={5}
                        value={editingProject.detailsAr || ""}
                        onChange={(e) => setEditingProject({ ...editingProject, detailsAr: e.target.value })}
                        className="bg-[var(--deu-surface-2)] border border-[var(--deu-line)] rounded px-3 py-2 text-xs text-[var(--deu-ink)] text-right"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-mono text-[var(--deu-ink-3)] uppercase">{t.admin.projectServicesAr} (Optional)</label>
                      <input
                        type="text"
                        placeholder="tag1, tag2, tag3"
                        value={editingProject.servicesListAr?.join(", ") || ""}
                        onChange={(e) => setEditingProject({ 
                          ...editingProject, 
                          servicesListAr: e.target.value.split(",").map((s) => s.trim()).filter(Boolean)
                        })}
                        className="bg-[var(--deu-surface-2)] border border-[var(--deu-line)] rounded px-3 py-2 text-xs text-[var(--deu-ink)] text-right"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 justify-end border-t border-[var(--deu-line)] pt-4">
                <button
                  type="button"
                  onClick={() => setEditingProject(null)}
                  className="px-4 py-2 border border-[var(--deu-line-strong)] rounded text-xs font-semibold hover:bg-[var(--deu-panel-strong)] cursor-pointer"
                >
                  {t.admin.cancelBtn}
                </button>
                <button
                  type="submit"
                  disabled={isSavingProject}
                  className="px-5 py-2 border border-[var(--deu-primary)] rounded bg-[var(--deu-primary)] text-[var(--deu-primary-ink)] font-bold text-xs hover:bg-[var(--deu-primary-strong)] cursor-pointer disabled:opacity-50"
                >
                  {isSavingProject ? "Saving..." : t.admin.saveBtn}
                </button>
              </div>
            </form>
           ) : (
            /* PORTFOLIO PROJECTS LIST */
            <div className="flex flex-col gap-4">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                <h3 className="deu-h3 text-[var(--deu-ink)] m-0">Dynamic Case Studies ({projects.length})</h3>
                <div className="flex items-center gap-2">
                  {projects.length === 0 && (
                    <button
                      onClick={handleSeedDatabase}
                      disabled={isSeeding}
                      className="flex items-center gap-1.5 px-4 py-2 border border-[var(--deu-flag-green)]/50 rounded-full bg-[var(--deu-flag-green-soft)] text-xs font-semibold text-[var(--deu-flag-green)] hover:border-[var(--deu-flag-green)] cursor-pointer transition-colors disabled:opacity-50"
                    >
                      <Archive className="w-4 h-4" />
                      <span>{isSeeding ? "Seeding..." : "Seed Default Projects"}</span>
                    </button>
                  )}
                  <button
                    onClick={handleAddProjectClick}
                    className="flex items-center gap-1.5 px-4 py-2 border border-[var(--deu-primary)] rounded-full bg-[var(--deu-primary-soft)] text-xs font-semibold text-[var(--deu-primary-strong)] hover:bg-[var(--deu-primary)] hover:text-black cursor-pointer transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    <span>{t.admin.addProject}</span>
                  </button>
                </div>
              </div>

              {isLoading ? (
                <div className="text-center py-12 text-sm text-[var(--deu-ink-3)]">
                  <RefreshCw className="w-5 h-5 animate-spin mx-auto mb-2 text-[var(--deu-primary)]" />
                  Loading Projects...
                </div>
              ) : projects.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 px-6 rounded-lg border border-dashed border-[var(--deu-line-strong)] bg-[var(--deu-panel)]">
                  <Briefcase className="w-10 h-10 text-[var(--deu-ink-3)] mb-4" />
                  <h4 className="text-sm font-semibold text-[var(--deu-ink)] mb-1">No projects in database</h4>
                  <p className="text-xs text-[var(--deu-ink-3)] mb-5 text-center max-w-sm">
                    Your Firestore <code className="text-[var(--deu-primary)]">projects</code> collection is empty. 
                    Seed it with default case studies or add your own projects manually.
                  </p>
                  <div className="flex gap-3">
                    <button
                      onClick={handleSeedDatabase}
                      disabled={isSeeding}
                      className="flex items-center gap-1.5 px-5 py-2.5 border border-[var(--deu-primary)] rounded bg-[var(--deu-primary)] text-[var(--deu-primary-ink)] font-bold text-xs hover:bg-[var(--deu-primary-strong)] cursor-pointer disabled:opacity-50 transition-colors"
                    >
                      <Archive className="w-4 h-4" />
                      <span>{isSeeding ? "Seeding..." : "Seed 4 Default Projects"}</span>
                    </button>
                    <button
                      onClick={handleAddProjectClick}
                      className="flex items-center gap-1.5 px-5 py-2.5 border border-[var(--deu-line-strong)] rounded text-xs font-semibold text-[var(--deu-ink)] hover:border-[var(--deu-primary)] hover:text-[var(--deu-primary)] cursor-pointer transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add Manually</span>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-3">
                  {projects.map((proj) => (
                    <div 
                      key={proj.id} 
                      className="p-4 rounded border border-[var(--deu-line)] bg-[var(--deu-surface-2)] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:border-[var(--deu-line-strong)] transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <span className="deu-project-index select-none">{proj.index}</span>
                        <div>
                          <h4 className="font-semibold text-sm text-[var(--deu-ink)] m-0">{proj.title}</h4>
                          <span className="text-[10px] font-mono text-[var(--deu-ink-3)] uppercase tracking-wider block mt-0.5">
                            {proj.role}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 self-end sm:self-center">
                        <button
                          onClick={() => handleEditProjectClick(proj)}
                          className="flex items-center gap-1 px-3 py-1.5 rounded border border-[var(--deu-line)] bg-[var(--deu-panel)] text-xs font-medium hover:border-[var(--deu-primary)] hover:text-[var(--deu-primary)] cursor-pointer"
                        >
                          <Edit className="w-3.5 h-3.5" />
                          <span>Edit</span>
                        </button>
                        <button
                          onClick={() => handleDeleteProjectClick(proj.id)}
                          className="flex items-center gap-1 px-3 py-1.5 rounded border border-[var(--deu-flag-red)]/30 bg-[var(--deu-flag-red-soft)] text-xs font-medium hover:border-[var(--deu-flag-red)] text-red-400 cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Delete</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </main>
  );
};
