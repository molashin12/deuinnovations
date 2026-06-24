export type Language = "en" | "de" | "ar";

export interface TranslationSchema {
  nav: {
    services: string;
    work: string;
    method: string;
    lens: string;
    contact: string;
    home: string;
    portfolio: string;
    startConversation: string;
  };
  hero: {
    tagline1: string;
    tagline2: string;
    title: string;
    description: string;
    startBrief: string;
    selectedWork: string;
    m1Title: string;
    m1Desc: string;
    m2Title: string;
    m2Desc: string;
    m3Title: string;
    m3Desc: string;
    m4Title: string;
    m4Desc: string;
  };
  services: {
    title: string;
    subtitle: string;
    col1Title: string;
    col1Tag: string;
    col1Desc: string;
    col1Bullets: string[];
    col2Title: string;
    col2Tag: string;
    col2Desc: string;
    col2Bullets: string[];
  };
  work: {
    title: string;
    subtitle: string;
    sidewayScroll: string;
    discussBuild: string;
    reviewConcept: string;
    exploreScope: string;
    openDialogue: string;
  };
  method: {
    title: string;
    subtitle: string;
    s1Title: string;
    s1Desc: string;
    s2Title: string;
    s2Desc: string;
    s3Title: string;
    s3Desc: string;
    s4Title: string;
    s4Desc: string;
  };
  fluency: {
    title: string;
    subtitle: string;
    enTitle: string;
    enTag: string;
    enQuote: string;
    enDesc: string;
    deTitle: string;
    deTag: string;
    deQuote: string;
    deDesc: string;
    arTitle: string;
    arTag: string;
    arQuote: string;
    arDesc: string;
  };
  horizons: {
    title: string;
    subtitle: string;
    c1Title: string;
    c1Desc: string;
    c2Title: string;
    c2Desc: string;
    c3Title: string;
    c3Desc: string;
    c4Title: string;
    c4Desc: string;
  };
  contact: {
    title: string;
    subtitle: string;
    emailStudio: string;
    reviewServices: string;
    bestFit: string;
    bestFitVal: string;
    studioProfile: string;
    studioProfileVal: string;
    engagementStyle: string;
    engagementStyleVal: string;
    formTitle: string;
    formName: string;
    formEmail: string;
    formCompany: string;
    formServices: string;
    formDescription: string;
    formBudget: string;
    formSubmit: string;
    formSubmitting: string;
    formSuccess: string;
    formError: string;
    budgetOptions: string[];
  };
  portfolioPage: {
    noteTitle: string;
    noteVal: string;
    selectionTitle: string;
    selectionVal: string;
    curatedTitle: string;
    featuredTitle: string;
    featuredSub: string;
    featuredOutcome: string;
    featuredOutcomeVal: string;
    featuredDiagram1Label: string;
    featuredDiagram1Val: string;
    featuredDiagram2Label: string;
    featuredDiagram2Val: string;
    featuredDiagram3Label: string;
    featuredDiagram3Val: string;
    featureCardTitle: string;
    featureCardDesc: string;
    featureCardDiagrams: string[];
    featureCardServices: string[];
    supportCardTitle: string;
    supportCardDesc: string;
    supportCardSector: string;
    supportCardSectorVal: string;
    supportCardFocus: string;
    supportCardFocusVal: string;
    railTitle: string;
    railDesc: string;
    galleryTitle: string;
    gallerySub: string;
    gallerySummary: string;
    galleryOutcomeLabel: string;
    galleryServicesLabel: string;
    lensTitle: string;
    lensSub: string;
    lensEssay: string;
    lensCard1Kicker: string;
    lensCard1Title: string;
    lensCard1Desc: string;
    lensCard2Kicker: string;
    lensCard2Title: string;
    lensCard2Desc: string;
    lensCard3Kicker: string;
    lensCard3Title: string;
    lensCard3Desc: string;
    ctaTitle: string;
    ctaSub: string;
    ctaButton: string;
    caseDetailsTitle: string;
    caseRole: string;
    caseFocus: string;
    caseOutcome: string;
    caseClose: string;
  };
  admin: {
    loginTitle: string;
    loginSub: string;
    email: string;
    password: string;
    loginBtn: string;
    backBtn: string;
    signupTitle: string;
    signupSub: string;
    signupBtn: string;
    displayName: string;
    hasAccount: string;
    noAccount: string;
    dashboardTitle: string;
    dashboardSub: string;
    logoutBtn: string;
    viewBriefs: string;
    editPortfolio: string;
    statusNew: string;
    statusReviewed: string;
    statusArchived: string;
    actionArchive: string;
    actionReview: string;
    actionNew: string;
    emptyBriefs: string;
    fieldCompany: string;
    fieldBudget: string;
    addProject: string;
    editProject: string;
    deleteProject: string;
    projectIndex: string;
    projectTitleEn: string;
    projectTitleDe: string;
    projectTitleAr: string;
    projectDescEn: string;
    projectDescDe: string;
    projectDescAr: string;
    projectRoleEn: string;
    projectRoleDe: string;
    projectRoleAr: string;
    projectFocusEn: string;
    projectFocusDe: string;
    projectFocusAr: string;
    projectOutcomeEn: string;
    projectOutcomeDe: string;
    projectOutcomeAr: string;
    projectDetailsEn: string;
    projectDetailsDe: string;
    projectDetailsAr: string;
    projectServicesEn: string;
    projectServicesDe: string;
    projectServicesAr: string;
    saveBtn: string;
    cancelBtn: string;
    localDemoWarning: string;
  };
}

export const translations: Record<Language, TranslationSchema> = {
  en: {
    nav: {
      services: "Services",
      work: "Work",
      method: "Method",
      lens: "Studio Lens",
      contact: "Contact",
      home: "Home",
      portfolio: "Portfolio",
      startConversation: "Start a conversation"
    },
    hero: {
      tagline1: "Founded by three partners",
      tagline2: "Software engineering + AI systems",
      title: "Elegant digital infrastructure",
      description: "DeuInnovation builds web products, mobile platforms, and automation systems for businesses that want technical depth without visual noise. We shape ambitious work into precise software, calm interfaces, and smart operational layers that feel considered from first click to final deployment.",
      startBrief: "Start a brief",
      selectedWork: "Selected work",
      m1Title: "Three founders",
      m1Desc: "Founder-led delivery from first workshop to release review.",
      m2Title: "Product rigor",
      m2Desc: "Software engineering, web and mobile delivery, and platform structure.",
      m3Title: "Automation depth",
      m3Desc: "AI systems that remove friction, reduce repetition, and sharpen decision flow.",
      m4Title: "Cross-market reach",
      m4Desc: "English-first execution with visible readiness for German and Arabic contexts."
    },
    services: {
      title: "Current work",
      subtitle: "The studio is deliberately focused on two pillars. Both share the same operating standard: thoughtful architecture, refined interfaces, strong delivery hygiene, and an eye for business clarity.",
      col1Title: "Software engineering",
      col1Tag: "Build",
      col1Desc: "We design and ship product foundations: responsive web experiences, mobile products, internal systems, and the technical infrastructure that makes a company easier to scale.",
      col1Bullets: [
        "Product architecture and interface systems",
        "Web and mobile applications with shared design logic",
        "Operational platforms, portals, and system integrations"
      ],
      col2Title: "AI automation",
      col2Tag: "Scale",
      col2Desc: "We translate repetitive work into intelligent flows: AI-enabled operations, retrieval systems, support automations, and decision-support layers that feel useful rather than theatrical.",
      col2Bullets: [
        "Automation systems for internal operations and service teams",
        "Knowledge retrieval, agent layers, and structured intelligence",
        "Practical AI workflows grounded in business reality"
      ]
    },
    work: {
      title: "Selected work",
      subtitle: "A horizontal rail keeps the portfolio close to the movement of the page. Each concept compresses a complex build into one clear point of view: what it solved, how it moved, and where it could scale.",
      sidewayScroll: "Swipe or scroll sideways",
      discussBuild: "Discuss this build",
      reviewConcept: "Review concept",
      exploreScope: "Explore scope",
      openDialogue: "Open dialogue"
    },
    method: {
      title: "Build method",
      subtitle: "Our process is paced like engineering, not theatre. Every stage tightens the signal, reduces ambiguity, and keeps decision-making readable for the client team and the studio alike.",
      s1Title: "Frame",
      s1Desc: "We define the operating problem, the product horizon, and the systems that matter. Three partners stay visible here so the strategic frame is set early and clearly.",
      s2Title: "Prototype",
      s2Desc: "We turn ambiguity into tangible flows, interface logic, and interaction rhythm before deep implementation begins. The visual system is tested against the product reality, not moodboards.",
      s3Title: "Engineer",
      s3Desc: "We build with architectural discipline, careful component logic, and production-minded delivery. The result is meant to last, scale, and remain understandable to the teams who inherit it.",
      s4Title: "Evolve",
      s4Desc: "We refine around traction, operational feedback, and new opportunities. Expansion into translation, e-learning, or healthcare smart solutions remains grounded in the same build logic."
    },
    fluency: {
      title: "Cross-market fluency",
      subtitle: "The site speaks in English first, but the studio is built to move across language and market contexts. Product structure, stakeholder communication, and UI clarity are designed to carry across regions without losing tone.",
      enTitle: "English",
      enTag: "EN",
      enQuote: "“We structure the product before we scale it.”",
      enDesc: "Clear brief framing, stakeholder language, and product-facing copy.",
      deTitle: "German",
      deTag: "DE",
      deQuote: "„Wir bauen klare Systeme, die mit dem Geschäft wachsen.“",
      deDesc: "Precise communication, structured documentation, and trustworthy product tone.",
      arTitle: "Arabic",
      arTag: "AR",
      arQuote: "“تصمم أنظمة رقمية واضحة تنمو مع العمل.”",
      arDesc: "Thoughtful right-to-left handling, content readiness, and regional adaptability."
    },
    horizons: {
      title: "Next horizons",
      subtitle: "Expansion is not about collecting categories. It is about applying the same design discipline, multilingual capability, and systems thinking to domains where clarity still has room to win.",
      c1Title: "Translation systems",
      c1Desc: "Workflow-led translation environments, terminology logic, and multilingual product support.",
      c2Title: "E-learning platforms",
      c2Desc: "Structured learning experiences, adaptive pathways, and teacher-facing product infrastructure.",
      c3Title: "Healthcare smart solutions",
      c3Desc: "Operational clarity for clinics, care journeys, scheduling, and high-trust interfaces.",
      c4Title: "Decision support layers",
      c4Desc: "Practical intelligence systems that help teams route work, surface signals, and respond faster."
    },
    contact: {
      title: "Start the conversation",
      subtitle: "Bring a product idea, a platform challenge, or an automation brief. We answer with structure, practical next moves, and a build path that feels proportionate to the work.",
      emailStudio: "Email the studio",
      reviewServices: "Review services",
      bestFit: "Best fit",
      bestFitVal: "Founder-led products, internal platforms, smart operational systems",
      studioProfile: "Studio profile",
      studioProfileVal: "Technical, multilingual, design-conscious, future-facing",
      engagementStyle: "Engagement style",
      engagementStyleVal: "Clear scope, working briefs, disciplined implementation",
      formTitle: "Project Brief Builder",
      formName: "Your Name",
      formEmail: "Email Address",
      formCompany: "Company / Organization",
      formServices: "Services Needed (Select multiple)",
      formDescription: "Project Brief / Core Challenge",
      formBudget: "Target Budget",
      formSubmit: "Submit Brief",
      formSubmitting: "Submitting to Firestore...",
      formSuccess: "Brief successfully recorded. A studio partner will review your scope and follow up with a structured response.",
      formError: "Could not submit brief. Please check your network or try again.",
      budgetOptions: ["Under $15k", "$15k - $40k", "$40k - $100k", "$100k+"]
    },
    portfolioPage: {
      noteTitle: "Position",
      noteVal: "DeuInnovation approaches digital work as a composed discipline: less ornament, more signal, stronger systems.",
      selectionTitle: "Selection logic",
      selectionVal: "Every case here was chosen to show how the studio frames difficult products with restraint, structure, and utility.",
      curatedTitle: "Portfolio selection 2026",
      featuredTitle: "Featured composition",
      featuredSub: "A lead project sits in conversation with a secondary intervention and a slim metadata rail. The layout behaves like an exhibition wall: one anchor piece, one offset note, one quiet system of evidence.",
      featuredOutcome: "Outcome",
      featuredOutcomeVal: "Sharper operating visibility with calmer decision surfaces for leadership teams.",
      featuredDiagram1Label: "System frame",
      featuredDiagram1Val: "Live operational spine with tiered visibility for managers, coordinators, and field leads.",
      featuredDiagram2Label: "Studio move",
      featuredDiagram2Val: "Replaced dashboard clutter with deliberate sequencing, strong status bands, and annotation-led guidance.",
      featuredDiagram3Label: "Delivery scope",
      featuredDiagram3Val: "Product framing, UI system design, service mapping, and AI workflow orchestration.",
      featureCardTitle: "Command surface for a distributed service business",
      featureCardDesc: "A studio-led concept for bringing scheduling, dispatch logic, team health, and AI-supported alerts into one composed workspace. The emphasis was on signal hierarchy, durable interaction rhythm, and a leadership view that feels decisive rather than crowded.",
      featureCardDiagrams: [
        "Live operational spine with tiered visibility for managers and field leads.",
        "Replaced dashboard clutter with deliberate sequencing and strong status bands.",
        "Product framing, UI system design, service mapping, and AI workflow orchestration."
      ],
      featureCardServices: ["Product architecture", "Interface system", "Operational AI", "Decision flow"],
      supportCardTitle: "Premium client portal with a restrained private-room feel",
      supportCardDesc: "A supporting concept that pairs operational access with a more intimate interface language: quieter surfaces, stronger framing, and clear progress signals for clients who need confidence without noise.",
      supportCardSector: "Sector",
      supportCardSectorVal: "Private client operations",
      supportCardFocus: "Emphasis",
      supportCardFocusVal: "Trust, visibility, elegant handoff",
      railTitle: "Metadata rail",
      railDesc: "The portfolio prioritizes systems that carry consequence: service delivery, regulated workflows, multilingual growth, and private client infrastructure.",
      galleryTitle: "Case study gallery",
      gallerySub: "The gallery is sequenced like a salon wall rather than a grid. Each entry holds its own shape, weight, and cadence while still reading as part of a single studio language.",
      gallerySummary: "Four studies, each edited for clarity rather than volume.",
      galleryOutcomeLabel: "Outcome",
      galleryServicesLabel: "Services delivered",
      lensTitle: "Studio lens",
      lensSub: "What defines the work is not a house style in the superficial sense. It is a way of composing technology so that systems feel legible, premium, and steady under pressure.",
      lensEssay: "We prefer clarity to spectacle, but never at the expense of atmosphere. Our projects tend to hold tension between control and softness: black-led surfaces, precise lines, selective yellow emphasis, restrained red notation, and typography that reads like edited thought rather than promotional noise.",
      lensCard1Kicker: "Quality 01",
      lensCard1Title: "Systems before screens",
      lensCard1Desc: "The interface is treated as an expression of the underlying logic. We shape flows, dependencies, and operating realities before visual decoration enters the room.",
      lensCard2Kicker: "Quality 02",
      lensCard2Title: "Editorial restraint",
      lensCard2Desc: "Hierarchy comes from rhythm, spacing, contrast, and language economy. We avoid ornamental excess so that the work can hold authority for longer.",
      lensCard3Kicker: "Quality 03",
      lensCard3Title: "Operational elegance",
      lensCard3Desc: "Whether the context is service logistics, education, or healthcare, the aim is the same: make difficult systems feel composed, trustworthy, and easier to act inside.",
      ctaTitle: "If the work needs both rigor and atmosphere, we should talk.",
      ctaSub: "Bring a platform idea, a workflow challenge, or a system that has grown noisier than it should be. We respond quietly, but with structure.",
      ctaButton: "hello@deuinnovation.com",
      caseDetailsTitle: "Case Details",
      caseRole: "Studio Role",
      caseFocus: "Strategic Focus",
      caseOutcome: "Key Outcome",
      caseClose: "Close Case Study"
    },
    admin: {
      loginTitle: "Studio Portal",
      loginSub: "Log in with your founder credentials to review project briefs and manage the portfolio.",
      email: "Founder Email",
      password: "Password",
      loginBtn: "Access Studio Console",
      backBtn: "Back to Public Site",
      signupTitle: "Create Partner Credentials",
      signupSub: "Register a new founder account to manage studio briefs and portfolio operations.",
      signupBtn: "Register Account",
      displayName: "Partner Name",
      hasAccount: "Already registered? Log in here",
      noAccount: "Need credentials? Register here",
      dashboardTitle: "Studio Console",
      dashboardSub: "Operational control surface for DeuInnovation partners.",
      logoutBtn: "Lock Console",
      viewBriefs: "Client Briefs",
      editPortfolio: "Portfolio Projects",
      statusNew: "New",
      statusReviewed: "Reviewed",
      statusArchived: "Archived",
      actionArchive: "Archive Brief",
      actionReview: "Mark Reviewed",
      actionNew: "Reopen Brief",
      emptyBriefs: "No briefs submitted yet.",
      fieldCompany: "Company",
      fieldBudget: "Budget",
      addProject: "Record New Project",
      editProject: "Modify Project",
      deleteProject: "Decommission Project",
      projectIndex: "Project Index (e.g. 05)",
      projectTitleEn: "Title (EN)",
      projectTitleDe: "Title (DE)",
      projectTitleAr: "Title (AR)",
      projectDescEn: "Description (EN)",
      projectDescDe: "Description (DE)",
      projectDescAr: "Description (AR)",
      projectRoleEn: "Role (EN)",
      projectRoleDe: "Role (DE)",
      projectRoleAr: "Role (AR)",
      projectFocusEn: "Focus (EN)",
      projectFocusDe: "Focus (DE)",
      projectFocusAr: "Focus (AR)",
      projectOutcomeEn: "Outcome (EN)",
      projectOutcomeDe: "Outcome (DE)",
      projectOutcomeAr: "Outcome (AR)",
      projectDetailsEn: "Details / Technical Case (EN)",
      projectDetailsDe: "Details / Technical Case (DE)",
      projectDetailsAr: "Details / Technical Case (AR)",
      projectServicesEn: "Services (EN - comma separated)",
      projectServicesDe: "Services (DE - comma separated)",
      projectServicesAr: "Services (AR - comma separated)",
      saveBtn: "Commit Changes",
      cancelBtn: "Discard",
      localDemoWarning: "Running in Sandbox mode (Local storage fallback). Changes are preserved locally."
    }
  },
  de: {
    nav: {
      services: "Leistungen",
      work: "Projekte",
      method: "Methode",
      lens: "Studio Lens",
      contact: "Kontakt",
      home: "Startseite",
      portfolio: "Portfolio",
      startConversation: "Gespräch beginnen"
    },
    hero: {
      tagline1: "Gegründet von drei Partnern",
      tagline2: "Software Engineering + KI-Systeme",
      title: "Elegante digitale Infrastruktur",
      description: "DeuInnovation entwickelt Webprodukte, mobile Plattformen und Automatisierungssysteme für Unternehmen, die technische Tiefe ohne visuelle Ablenkung suchen. Wir formen anspruchsvolle Aufgaben in präzise Software, ruhige Oberflächen und intelligente Betriebsebenen, die sich vom ersten Klick bis zur endgültigen Bereitstellung durchdacht anfühlen.",
      startBrief: "Briefing starten",
      selectedWork: "Ausgewählte Arbeiten",
      m1Title: "Drei Gründer",
      m1Desc: "Gründergeführte Abwicklung vom ersten Workshop bis zum Release-Review.",
      m2Title: "Produktstrenge",
      m2Desc: "Software-Engineering, Web- und Mobile-Delivery sowie Plattformstrukturen.",
      m3Title: "Automatisierungstiefe",
      m3Desc: "KI-Systeme, die Reibung abbauen, Wiederholungen reduzieren und Entscheidungsflüsse schärfen.",
      m4Title: "Marktübergreifende Reichweite",
      m4Desc: "Englischsprachige Ausführung mit nativer Bereitschaft für deutsche und arabische Kontexte."
    },
    services: {
      title: "Aktuelle Arbeit",
      subtitle: "Das Studio konzentriert sich bewusst auf zwei Säulen. Beide teilen den gleichen Betriebsstandard: durchdachte Architektur, verfeinerte Schnittstellen, starke Lieferhygiene und ein Auge für geschäftliche Klarheit.",
      col1Title: "Software-Engineering",
      col1Tag: "Bauen",
      col1Desc: "Wir entwerfen und liefern Produktgrundlagen: reaktionsschnelle Weberlebnisse, mobile Produkte, interne Systeme und die technische Infrastruktur, die die Skalierung eines Unternehmens erleichtert.",
      col1Bullets: [
        "Produktarchitektur und Interface-Systeme",
        "Web- und Mobilanwendungen mit gemeinsamer Designlogik",
        "Betriebsplattformen, Portale und Systemintegrationen"
      ],
      col2Title: "KI-Automatisierung",
      col2Tag: "Skalieren",
      col2Desc: "Wir übersetzen repetitive Arbeit in intelligente Abläufe: KI-gestützte Abläufe, Abrufsysteme, Support-Automatisierungen und Entscheidungsunterstützungsebenen, die sich nützlich statt theatralisch anfühlen.",
      col2Bullets: [
        "Automatisierungssysteme für interne Abläufe und Serviceteams",
        "Wissensabruf, Agentenebenen und strukturierte Intelligenz",
        "Praktische KI-Workflows, die in der geschäftlichen Realität verankert sind"
      ]
    },
    work: {
      title: "Ausgewählte Arbeit",
      subtitle: "Eine horizontale Schiene hält das Portfolio nah an der Bewegung der Seite. Jedes Konzept komprimiert einen komplexen Build in einen klaren Standpunkt: was gelöst wurde, wie es sich bewegt hat und wo es skaliert werden kann.",
      sidewayScroll: "Wischen oder seitlich scrollen",
      discussBuild: "Dieses Projekt besprechen",
      reviewConcept: "Konzept überprüfen",
      exploreScope: "Umfang untersuchen",
      openDialogue: "Dialog eröffnen"
    },
    method: {
      title: "Entwicklungsmethode",
      subtitle: "Unser Prozess ist auf Technik ausgelegt, nicht auf Show. Jede Phase stärkt das Signal, verringert Unklarheiten und hält die Entscheidungsfindung für das Kundenteam und das Studio gleichermaßen transparent.",
      s1Title: "Rahmen",
      s1Desc: "Wir definieren das Betriebsproblem, den Produkthorizont und die Systeme, auf die es ankommt. Drei Partner bleiben hier sichtbar, sodass der strategische Rahmen frühzeitig und klar gesetzt wird.",
      s2Title: "Prototyp",
      s2Desc: "Wir verwandeln Mehrdeutigkeiten in greifbare Abläufe, Interface-Logik und Interaktionsrhythmus, bevor die tiefgehende Implementierung beginnt. Das visuelle System wird an der Produktrealität getestet, nicht an Moodboards.",
      s3Title: "Entwickeln",
      s3Desc: "Wir bauen mit architektonischer Disziplin, sorgfältiger Komponentenlogik und produktorientierter Lieferung. Das Ergebnis soll langlebig sein, skalieren und für die Teams, die es erben, verständlich bleiben.",
      s4Title: "Evolvieren",
      s4Desc: "Wir verfeinern anhand von Nutzerakzeptanz, operativem Feedback und neuen Möglichkeiten. Die Expansion in Übersetzung, E-Learning oder intelligente Gesundheitslösungen bleibt in derselben Build-Logik verankert."
    },
    fluency: {
      title: "Marktübergreifende Fluenz",
      subtitle: "Die Website spricht primär Englisch, aber das Studio ist darauf ausgelegt, sich fließend über verschiedene Sprach- und Marktkontexte hinweg zu bewegen. Produktstruktur, Stakeholder-Kommunikation und UI-Klarheit tragen die Markenidentität in jede Region.",
      enTitle: "Englisch",
      enTag: "EN",
      enQuote: "„Wir strukturieren das Produkt, bevor wir es skalieren.“",
      enDesc: "Klares Briefing, verständliche Stakeholder-Sprache und produktorientierte Texte.",
      deTitle: "Deutsch",
      deTag: "DE",
      deQuote: "„Wir bauen klare Systeme, die mit dem Geschäft wachsen.“",
      deDesc: "Präzise Kommunikation, strukturierte Dokumentation und vertrauenswürdiger Produktton.",
      arTitle: "Arabisch",
      arTag: "AR",
      arQuote: "„نصمم أنظمة رقمية واضحة تنمو مع العمل.“",
      arDesc: "Sorgfältige Rechts-nach-Links-Verarbeitung, inhaltliche Bereitschaft und regionale Anpassungsfähigkeit."
    },
    horizons: {
      title: "Nächste Horizonte",
      subtitle: "Bei der Expansion geht es nicht darum, Kategorien zu sammeln. Es geht darum, dieselbe Designdisziplin, mehrsprachige Fähigkeit und dasselbe Systemdenken auf Bereiche anzuwenden, in denen Klarheit noch gewinnen kann.",
      c1Title: "Übersetzungssysteme",
      c1Desc: "Workflow-gesteuerte Übersetzungsumgebungen, Terminologielogik und mehrsprachiger Produktsupport.",
      c2Title: "E-Learning-Plattformen",
      c2Desc: "Strukturierte Lernerfahrungen, adaptive Lernpfade und lehrerorientierte Produktinfrastruktur.",
      c3Title: "Intelligente Gesundheitslösungen",
      c3Desc: "Operative Klarheit für Kliniken, Behandlungsabläufe, Terminplanung und hochgradig vertrauenswürdige Schnittstellen.",
      c4Title: "Entscheidungsunterstützende Ebenen",
      c4Desc: "Praktische Intelligenzsysteme, die Teams dabei helfen, Arbeit zu leiten, Signale zu erfassen und schneller zu reagieren."
    },
    contact: {
      title: "Gespräch beginnen",
      subtitle: "Bringen Sie eine Produktidee, eine Plattformherausforderung oder ein Automatisierungs-Briefing mit. Wir antworten mit Struktur, praktischen nächsten Schritten und einem Entwicklungspfad, der der Aufgabe angemessen ist.",
      emailStudio: "E-Mail an das Studio",
      reviewServices: "Dienstleistungen ansehen",
      bestFit: "Bester Fit",
      bestFitVal: "Gründergeführte Produkte, interne Plattformen, intelligente Betriebssysteme",
      studioProfile: "Studioprofil",
      studioProfileVal: "Technisch, mehrsprachig, designbewusst, zukunftsorientiert",
      engagementStyle: "Zusammenarbeit",
      engagementStyleVal: "Klarer Umfang, funktionierende Briefings, disziplinierte Umsetzung",
      formTitle: "Briefing-Planer",
      formName: "Ihr Name",
      formEmail: "E-Mail-Adresse",
      formCompany: "Unternehmen / Organisation",
      formServices: "Benötigte Leistungen (Mehrfachauswahl möglich)",
      formDescription: "Projektbriefing / Kernherausforderung",
      formBudget: "Zielbudget",
      formSubmit: "Briefing senden",
      formSubmitting: "Wird an Firestore übertragen...",
      formSuccess: "Briefing erfolgreich aufgezeichnet. Ein Studiopartner wird Ihren Scope prüfen und sich mit einer strukturierten Antwort bei Ihnen melden.",
      formError: "Briefing konnte nicht übermittelt werden. Bitte prüfen Sie Ihre Verbindung oder versuchen Sie es erneut.",
      budgetOptions: ["Unter 15.000 $", "15.000 $ - 40.000 $", "40.000 $ - 100.000 $", "Über 100.000 $"]
    },
    portfolioPage: {
      noteTitle: "Position",
      noteVal: "DeuInnovation betrachtet digitale Arbeit als eine komponierte Disziplin: weniger Dekor, mehr Signal, stärkere Systeme.",
      selectionTitle: "Auswahllogik",
      selectionVal: "Jeder Fall hier wurde ausgewählt, um zu zeigen, wie das Studio schwierige Produkte mit Zurückhaltung, Struktur und Nutzen rahmt.",
      curatedTitle: "Portfolio-Auswahl 2026",
      featuredTitle: "Vorgestellte Komposition",
      featuredSub: "Ein Hauptprojekt steht im Dialog mit einer sekundären Intervention und einer schlanken Metadaten-Schiene. Das Layout verhält sich wie eine Galeriewand: ein Ankerstück, eine versetzte Notiz, ein stilles System von Nachweisen.",
      featuredOutcome: "Ergebnis",
      featuredOutcomeVal: "Schärfere betriebliche Sichtbarkeit mit ruhigeren Entscheidungsoberflächen für Führungsteams.",
      featuredDiagram1Label: "Systemrahmen",
      featuredDiagram1Val: "Live-Betriebs-Spine mit abgestufter Sichtbarkeit für Manager, Koordinatoren und Außendienstleiter.",
      featuredDiagram2Label: "Studio-Zug",
      featuredDiagram2Val: "Ersetzte das Dashboard-Chaos durch bewusste Sequenzierung, starke Statusbänder und anmerkungsgeführte Navigation.",
      featuredDiagram3Label: "Lieferumfang",
      featuredDiagram3Val: "Produkt-Framing, Design des UI-Systems, Service-Mapping und KI-Workflow-Orchestrierung.",
      featureCardTitle: "Leitstand für ein verteiltes Dienstleistungsunternehmen",
      featureCardDesc: "Ein vom Studio geführtes Konzept, um Terminplanung, Dispositionslogik, Teamgesundheit und KI-gestützte Warnmeldungen in einem einzigen Workspace zu vereinen. Der Schwerpunkt lag auf der Signalhierarchie, einem dauerhaften Interaktionsrhythmus und einer Führungsansicht, die sich entschlossen anfühlt.",
      featureCardDiagrams: [
        "Live-Betriebs-Spine mit abgestufter Sichtbarkeit für Manager und Außendienstleiter.",
        "Ersetzte das Dashboard-Chaos durch bewusste Sequenzierung und starke Statusbänder.",
        "Produkt-Framing, Design des UI-Systems, Service-Mapping und KI-Workflow-Orchestrierung."
      ],
      featureCardServices: ["Produktarchitektur", "Interface-System", "Operative KI", "Entscheidungsfluss"],
      supportCardTitle: "Premium-Kundenportal mit zurückhaltender Atmosphäre",
      supportCardDesc: "Ein unterstützendes Konzept, das operativen Zugang mit einer intimeren Schnittstellensprache verbindet: ruhigere Oberflächen, stärkere Rahmung und klare Fortschrittssignale für Kunden, die Vertrauen ohne Lärm suchen.",
      supportCardSector: "Sektor",
      supportCardSectorVal: "Private Kundenoperationen",
      supportCardFocus: "Schwerpunkt",
      supportCardFocusVal: "Vertrauen, Sichtbarkeit, eleganter Handoff",
      railTitle: "Metadaten-Schiene",
      railDesc: "Das Portfolio priorisiert folgenschwere Systeme: Servicebereitstellung, regulierte Workflows, mehrsprachiges Wachstum und private Kundeninfrastruktur.",
      galleryTitle: "Fallstudien-Galerie",
      gallerySub: "Die Galerie ist wie eine Salonwand und nicht wie ein Raster aufgebaut. Jeder Eintrag behält seine eigene Form, sein Gewicht und seine Kadenz, liest sich aber dennoch als Teil einer einzigen Studiosprache.",
      gallerySummary: "Vier Studien, jeweils auf Klarheit statt auf Volumen redigiert.",
      galleryOutcomeLabel: "Ergebnis",
      galleryServicesLabel: "Gelieferte Leistungen",
      lensTitle: "Studio-Linse",
      lensSub: "Was die Arbeit definiert, ist kein oberflächlicher Hausstil. Es ist eine Art, Technologie so zu komponieren, dass sich die Systeme lesbar, hochwertig und unter Druck stabil anfühlen.",
      lensEssay: "Wir bevorzugen Klarheit gegenüber dem Spektakel, aber niemals auf Kosten der Atmosphäre. Unsere Projekte halten die Spannung zwischen Kontrolle und Weichheit: schwarze Oberflächen, präzise Linien, selektive gelbe Betonung, zurückhaltende rote Notation und Typografie, die sich wie redigierte Gedanken anfühlt.",
      lensCard1Kicker: "Qualität 01",
      lensCard1Title: "Systeme vor Bildschirmen",
      lensCard1Desc: "Die Schnittstelle wird als Ausdruck der zugrunde liegenden Logik behandelt. Wir gestalten Abläufe, Abhängigkeiten und operative Realitäten, bevor die visuelle Dekoration den Raum betritt.",
      lensCard2Kicker: "Qualität 02",
      lensCard2Title: "Redaktionelle Zurückhaltung",
      lensCard2Desc: "Hierarchie entsteht durch Rhythmus, Abstände, Kontrast und Sprachökonomie. Wir vermeiden dekorativen Exzess, damit die Arbeit länger Bestand hat.",
      lensCard3Kicker: "Qualität 03",
      lensCard3Title: "Operative Eleganz",
      lensCard3Desc: "Ob im Bereich Servicelogistik, Bildung oder Gesundheitswesen – das Ziel bleibt gleich: Komplexe Systeme sollen sich zusammengesetzt, vertrauenswürdig und einfacher zu bedienen anfühlen.",
      ctaTitle: "Wenn die Arbeit sowohl Präzision als auch Atmosphäre braucht, sollten wir sprechen.",
      ctaSub: "Bringen Sie eine Plattformidee, eine Workflow-Herausforderung oder ein System mit, das lauter geworden ist, als es sein sollte. Wir antworten leise, aber mit Struktur.",
      ctaButton: "hello@deuinnovation.com",
      caseDetailsTitle: "Fallstudien-Details",
      caseRole: "Studio-Rolle",
      caseFocus: "Strategischer Fokus",
      caseOutcome: "Hauptergebnis",
      caseClose: "Fallstudie schließen"
    },
    admin: {
      loginTitle: "Studio-Portal",
      loginSub: "Melden Sie sich mit Ihren Gründerdaten an, um Projektbriefings zu prüfen und das Portfolio zu verwalten.",
      email: "Gründer-E-Mail",
      password: "Passwort",
      loginBtn: "Studio-Konsole betreten",
      backBtn: "Zurück zur öffentlichen Seite",
      signupTitle: "Partner-Zugang erstellen",
      signupSub: "Registrieren Sie ein neues Gründerkonto, um Projektbriefings zu prüfen und das Portfolio zu verwalten.",
      signupBtn: "Konto registrieren",
      displayName: "Name des Partners",
      hasAccount: "Bereits registriert? Hier anmelden",
      noAccount: "Zugang benötigt? Hier registrieren",
      dashboardTitle: "Studio-Konsole",
      dashboardSub: "Operative Kontrollebene für DeuInnovation-Partner.",
      logoutBtn: "Konsole sperren",
      viewBriefs: "Kundenbriefings",
      editPortfolio: "Portfolioprojekte",
      statusNew: "Neu",
      statusReviewed: "Geprüft",
      statusArchived: "Archiviert",
      actionArchive: "Briefing archivieren",
      actionReview: "Als geprüft markieren",
      actionNew: "Briefing wiedereröffnen",
      emptyBriefs: "Noch keine Briefings eingegangen.",
      fieldCompany: "Unternehmen",
      fieldBudget: "Budget",
      addProject: "Neues Projekt erfassen",
      editProject: "Projekt ändern",
      deleteProject: "Projekt entfernen",
      projectIndex: "Projekt-Index (z. B. 05)",
      projectTitleEn: "Titel (EN)",
      projectTitleDe: "Titel (DE)",
      projectTitleAr: "Titel (AR)",
      projectDescEn: "Beschreibung (EN)",
      projectDescDe: "Beschreibung (DE)",
      projectDescAr: "Beschreibung (AR)",
      projectRoleEn: "Rolle (EN)",
      projectRoleDe: "Rolle (DE)",
      projectRoleAr: "Rolle (AR)",
      projectFocusEn: "Schwerpunkt (EN)",
      projectFocusDe: "Schwerpunkt (DE)",
      projectFocusAr: "Schwerpunkt (AR)",
      projectOutcomeEn: "Ergebnis (EN)",
      projectOutcomeDe: "Ergebnis (DE)",
      projectOutcomeAr: "Ergebnis (AR)",
      projectDetailsEn: "Details / Technische Fallstudie (EN)",
      projectDetailsDe: "Details / Technische Fallstudie (DE)",
      projectDetailsAr: "Details / Technische Fallstudie (AR)",
      projectServicesEn: "Leistungen (EN - Komma-getrennt)",
      projectServicesDe: "Leistungen (DE - Komma-getrennt)",
      projectServicesAr: "Leistungen (AR - Komma-getrennt)",
      saveBtn: "Änderungen speichern",
      cancelBtn: "Verwerfen",
      localDemoWarning: "Ausführung im Sandbox-Modus (Lokaler Speicher-Fallback). Änderungen werden lokal gesichert."
    }
  },
  ar: {
    nav: {
      services: "الخدمات",
      work: "المشاريع",
      method: "نهج العمل",
      lens: "منظور الاستوديو",
      contact: "اتصل بنا",
      home: "الرئيسية",
      portfolio: "الأعمال",
      startConversation: "ابدأ محادثة"
    },
    hero: {
      tagline1: "تأسس من قبل ثلاثة شركاء",
      tagline2: "هندسة البرمجيات + أنظمة الذكاء الاصطناعي",
      title: "بنية تحتية رقمية أنيقة",
      description: "تقوم ديو إينوفيشن ببناء منتجات الويب ومنصات الهواتف المحمولة وأنظمة الأتمتة للشركات التي تبحث عن العمق التقني والوضوح التام دون تشتيت بصري. نحن نشكل التحديات الطموحة إلى برمجيات دقيقة، وواجهات هادئة، وطبقات تشغيلية ذكية ومدروسة جيداً من أول نقرة وحتى إطلاق المنتج النهائي.",
      startBrief: "ابدأ مشروعاً",
      selectedWork: "أعمال مختارة",
      m1Title: "ثلاثة مؤسسين",
      m1Desc: "تنفيذ وتوجيه مباشر من المؤسسين بدءاً من ورشة العمل الأولى وحتى مراجعة الإصدار النهائي.",
      m2Title: "دقة وجودة المنتج",
      m2Desc: "هندسة البرمجيات، وتوصيل منصات الويب والهاتف المحمول، وهيكلة الأنظمة البرمجية.",
      m3Title: "عمق الأتمتة",
      m3Desc: "أنظمة ذكاء اصطناعي تزيل العقبات، وتقلل التكرار، وتجعل تدفق القرارات أكثر وضوحاً.",
      m4Title: "مرونة الانتشار عالمياً",
      m4Desc: "تنفيذ دولي باللغة الإنجليزية أولاً مع جاهزية تامة وتوافق مع الأسواق والسياقات الألمانية والعربية."
    },
    services: {
      title: "أعمالنا الحالية",
      subtitle: "يركز الاستوديو بشكل واعي على ركيزتين أساسيتين. وكلاهما يتشارك نفس معايير التشغيل: بنية هيكلية مدروسة، وواجهات مصقولة، ودقة تسليم تامة، مع الاهتمام بوضوح العمل التجاري.",
      col1Title: "هندسة البرمجيات",
      col1Tag: "بناء",
      col1Desc: "نحن نصمم ونطلق أساسات المنتجات الرقمية: واجهات ويب متجاوبة، وتطبيقات هواتف محمولة، وأنظمة داخلية، والبنية التحتية التقنية التي تسهل توسع الشركات ونموها.",
      col1Bullets: [
        "بنية المنتج وأنظمة الواجهات البرمجية",
        "تطبيقات الويب والهواتف المحمولة بمنطق تصميمي مشترك",
        "المنصات التشغيلية، والبوابات الإلكترونية وتكامل الأنظمة"
      ],
      col2Title: "أتمتة الذكاء الاصطناعي",
      col2Tag: "توسع",
      col2Desc: "نحن نترجم المهام المتكررة إلى تدفقات ذكية: عمليات مدعومة بالذكاء الاصطناعي، وأنظمة استرجاع المعرفة، وأتمتة الدعم، وطبقات دعم اتخاذ القرار المفيدة تشغيلياً.",
      col2Bullets: [
        "أنظمة أتمتة العمليات الداخلية وفرق الخدمات",
        "استرجاع المعرفة، وطبقات الوكلاء الأذكياء، والبيانات المنظمة",
        "مسارات عمل واقعية وعملية للذكاء الاصطناعي قائمة على أهداف تجارية حقيقية"
      ]
    },
    work: {
      title: "أعمال مختارة",
      subtitle: "يحافظ المسار الأفقي على بقاء معرض الأعمال قريباً من حركة تصفح الصفحة. يضغط كل مفهوم هيكلياً معقداً في وجهة نظر واحدة واضحة: ما الذي حله، كيف تحرك، وأين يمكن أن يتسع نطاقه.",
      sidewayScroll: "اسحب أو تصفح جانبياً",
      discussBuild: "ناقش هذا المشروع",
      reviewConcept: "راجع المفهوم",
      exploreScope: "استكشف النطاق",
      openDialogue: "افتح باب الحوار"
    },
    method: {
      title: "نهج البناء والتطوير",
      subtitle: "عملياتنا تسير بخطى هندسية دقيقة، لا استعراضية. تعمل كل مرحلة على تقوية الإشارة، وتقليل الغموض، وإبقاء عملية اتخاذ القرار واضحة للفريق العميل والاستوديو على حد سواء.",
      s1Title: "تأطير الفكرة",
      s1Desc: "نحدد المشكلة التشغيلية، وأفق المنتج، والأنظمة الأساسية المعنية. يتواجد الشركاء الثلاثة هنا لضمان إرساء الإطار الاستراتيجي مبكراً وبوضوح.",
      s2Title: "النموذج الأولي",
      s2Desc: "نحول الغموض إلى تدفقات ملموسة، ومنطق واجهات، وإيقاع تفاعلي قبل البدء في التنفيذ العميق. يتم اختبار النظام البصري مقابل واقع المنتج، وليس مجرد لوحات إلهام عشوائية.",
      s3Title: "الهندسة والبناء",
      s3Desc: "نبني بانضباط معماري وهندسي، ومنطق مكونات دقيق، وتسليم يركز على بيئة الإنتاج الفعلي. تم تصميم النتيجة لتدوم، وتتوسع، وتظل مفهومة للفرق التي ترثها.",
      s4Title: "التطوير والترقية",
      s4Desc: "نطور ونحسن الأنظمة بناءً على الأداء الفعلي، والملاحظات التشغيلية، والفرص الجديدة. يبقى التوسع في أنظمة الترجمة والتعليم الإلكتروني أو الرعاية الصحية مرتكزاً على نفس منطق البناء الدقيق."
    },
    fluency: {
      title: "طلاقة ومرونة ثقافية ولغوية",
      subtitle: "يتحدث الموقع باللغة الإنجليزية أولاً، ولكن تم بناء الاستوديو ليتنقل بمرونة عبر سياقات ولغات مختلفة. تم تصميم بنية المنتج، والتواصل مع أصحاب المصلحة، ووضوح الواجهات لتنقل هوية العلامة التجارية لكل منطقة دون فقدان النغمة المميزة.",
      enTitle: "الإنجليزية",
      enTag: "EN",
      enQuote: "“نحن نهيكل المنتج وننظمه بدقة قبل أن نبدأ بتوسيعه.”",
      enDesc: "تأطير واضح للمشروع، لغة تواصل مباشرة ومفهومة، ونصوص تخدم أهداف المنتج.",
      deTitle: "الألمانية",
      deTag: "DE",
      deQuote: "„Wir bauen klare Systeme, die mit dem Geschäft wachsen.“",
      deDesc: "تواصل دقيق، وتوثيق منظم، ونغمة منتج موثوقة ورصينة.",
      arTitle: "العربية",
      arTag: "AR",
      arQuote: "“نصمم أنظمة رقمية واضحة تنمو مع العمل.”",
      arDesc: "تعامل ذكي مع اتجاه الكتابة من اليمين إلى اليسار، وجاهزية المحتوى، والتكيف الإقليمي التام."
    },
    horizons: {
      title: "الآفاق القادمة",
      subtitle: "التوسع لا يعني تجميع الفئات والخدمات بشكل عشوائي. بل يعني تطبيق نفس الانضباط التصميمي، والقدرة اللغوية المتعددة، والتفكير المنهجي على قطاعات لا يزال أمام الوضوح فيها فرصة كبيرة للفوز.",
      c1Title: "أنظمة الترجمة الآلية",
      c1Desc: "بيئات ترجمة تعتمد على تدفقات العمل، ومنطق إدارة المصطلحات، ودعم المنتجات متعددة اللغات.",
      c2Title: "منصات التعليم الإلكتروني",
      c2Desc: "تجارب تعليمية منظمة، ومسارات تعلم تكيفية، وبنية تحتية للمنصات الرقمية الموجهة للمدرسين.",
      c3Title: "حلول الرعاية الصحية الذكية",
      c3Desc: "وضوح تشغيلي للعيادات والمستشفيات، وجدولة المواعيد، وواجهات عالية الموثوقية لحماية بيانات المرضى.",
      c4Title: "طبقات دعم القرار",
      c4Desc: "أنظمة ذكاء عملي تساعد الفرق على توجيه العمل، وإبراز الإشارات المهمة، والاستجابة بشكل أسرع."
    },
    contact: {
      title: "ابدأ المحادثة معنا",
      subtitle: "اطرح فكرة منتج جديد، أو تحدي منصة برمجية، أو ملخص أتمتة. نجيبك بهيكلية واضحة، وخطوات عملية تالية، ومسار بناء يتناسب بدقة مع حجم العمل وحجم الميزانية.",
      emailStudio: "راسل الاستوديو بريدياً",
      reviewServices: "تصفح خدماتنا",
      bestFit: "التوافق الأمثل",
      bestFitVal: "المنتجات التي يقودها المؤسسون، المنصات التشغيلية الداخلية، والأنظمة الذكية للتحكم بالعمليات",
      studioProfile: "ملف الاستوديو",
      studioProfileVal: "تقني، متعدد اللغات، واعي بالتصميم الفني والجمالي، ويتطلع للمستقبل",
      engagementStyle: "أسلوب التعاقد",
      engagementStyleVal: "نطاق عمل محدد وواضح، نماذج أولية سريعة، وتنفيذ منضبط",
      formTitle: "مخطط ملخص المشروع",
      formName: "الاسم الكريم",
      formEmail: "البريد الإلكتروني",
      formCompany: "الشركة / المؤسسة",
      formServices: "الخدمات المطلوبة (يمكنك اختيار متعدد)",
      formDescription: "ملخص المشروع / التحدي الأساسي",
      formBudget: "الميزانية المستهدفة",
      formSubmit: "إرسال ملخص المشروع",
      formSubmitting: "جاري الحفظ في قاعدة البيانات...",
      formSuccess: "تم تسجيل ملخص مشروعك بنجاح. سيقوم أحد الشركاء في الاستوديو بمراجعة نطاق العمل والتواصل معك برد منظم ومقترح واضح قريباً.",
      formError: "تعذر إرسال الطلب. يرجى التحقق من اتصالك بالإنترنت أو إعادة المحاولة.",
      budgetOptions: ["أقل من 15,000 $", "15,000 $ - 40,000 $", "40,000 $ - 100,000 $", "أكثر من 100,000 $"]
    },
    portfolioPage: {
      noteTitle: "المكانة والمنهج",
      noteVal: "تتعامل ديو إينوفيشن مع العمل الرقمي كمنهج وتخصص متكامل: تزيين أقل، إشارة أقوى، وأنظمة برمجية أصلب.",
      selectionTitle: "منطق الاختيار",
      selectionVal: "تم اختيار كل مشروع هنا لتوضيح كيف يؤطر الاستوديو المنتجات الصعبة بوقار، وبنية رصينة، وفائدة تشغيلية عالية.",
      curatedTitle: "مختارات من أعمال 2026",
      featuredTitle: "تكوين مميز ومختار",
      featuredSub: "يتفاعل المشروع الرئيسي مع تدخل ثانوي وشريط معلومات تقنية جانبي رصين. يتصرف التصميم كحائط عرض في معرض فني: قطعة ارتكاز رئيسية، ملاحظة جانبية مائلة، ونظام هادئ للحقائق التقنية.",
      featuredOutcome: "النتيجة والأثر",
      featuredOutcomeVal: "رؤية تشغيلية أوضح مع واجهات اتخاذ قرار أكثر هدوءاً واستقراراً لفرق الإدارة والقيادة.",
      featuredDiagram1Label: "إطار النظام",
      featuredDiagram1Val: "العمود الفقري التشغيلي المباشر مع رؤية مخصصة للمديرين والمنسقين وفرق العمل الميدانية.",
      featuredDiagram2Label: "لمسة الاستوديو",
      featuredDiagram2Val: "استبدال فوضى شاشات البيانات بجدولة مدروسة، ونطاقات حالة واضحة، وتوجيه معتمد على الملاحظات.",
      featuredDiagram3Label: "نطاق التسليم",
      featuredDiagram3Val: "تأطير المنتج، تصميم نظام الواجهات الفني والجمالي، رسم خرائط العمل، وتنسيق تدفقات الذكاء الاصطناعي.",
      featureCardTitle: "واجهة التحكم والعمليات للأعمال الخدمية الموزعة",
      featureCardDesc: "مفهوم استوديو متكامل يجمع بين الجدولة، ومنطق التوزيع الميداني، وصحة الفرق، والتنبيهات المدعومة بالذكاء الاصطناعي في واجهة عمل واحدة هادئة. تم التركيز على تسلسل الإشارات المهمة، وإيقاع تفاعل مرن ومستدام، وعرض إداري حاسم.",
      featureCardDiagrams: [
        "العمود الفقري التشغيلي المباشر مع رؤية مخصصة للمديرين وفرق العمل الميدانية.",
        "استبدال فوضى شاشات البيانات بجدولة مدروسة ونطاقات حالة واضحة.",
        "تأطير المنتج، تصميم نظام الواجهات، رسم خرائط العمل وتنسيق تدفقات الذكاء الاصطناعي."
      ],
      featureCardServices: ["بنية المنتج", "نظام الواجهة الفني", "الذكاء الاصطناعي التشغيلي", "تدفق القرارات"],
      supportCardTitle: "بوابة عملاء متميزة ومخصصة بلمسة خاصة رصينة",
      supportCardDesc: "مفهوم بوابة يدعم الوصول التشغيلي للعملاء بلغة واجهة أكثر خصوصية وهدوءاً: أسطح هادئة، إطارات واضحة، وإشارات تقدم دقيقة للعملاء الذين يبحثون عن الثقة دون ضجيج بصري.",
      supportCardSector: "القطاع",
      supportCardSectorVal: "عمليات العملاء الخاصة والمميزة",
      supportCardFocus: "التركيز والسمة",
      supportCardFocusVal: "الثقة، الرؤية الواضحة، والتسليم الأنيق للمخرجات",
      railTitle: "شريط البيانات التقنية",
      railDesc: "يعطي معرض أعمالنا الأولوية للأنظمة ذات الأثر الفعلي: الخدمات اللوجستية، مسارات العمل المنظمة، التوسع متعدد اللغات، وبنية العملاء الخاصة.",
      galleryTitle: "معرض دراسات الحالة",
      gallerySub: "يتم تسلسل المعرض مثل جدار صالون فني بدلاً من شبكة تقليدية جامدة. يحتفظ كل مشروع بشكله ووزنه وإيقاعه الخاص مع قراءته كجزء من لغة الاستوديو الموحدة.",
      gallerySummary: "أربع دراسات حالة، تم تحرير وصياغة كل منها للتركيز على الوضوح التام بدلاً من ملء الشاشات.",
      galleryOutcomeLabel: "الأثر والنتيجة",
      galleryServicesLabel: "الخدمات المسلمة",
      lensTitle: "عدسة الاستوديو",
      lensSub: "ما يحدد عملنا ليس نمطًا أو طابعاً ظاهرياً سطحياً. بل هي طريقة صياغة وتكوين التقنيات بحيث تشعر أن الأنظمة سهلة القراءة، ومتميزة، وثابتة تحت ضغط العمل الفعلي.",
      lensEssay: "نحن نفضل الوضوح على الاستعراض البصري، ولكن دون المساومة على الجو العام للمنتج. تميل مشاريعنا إلى الاحتفاظ بالتوتر المتوازن بين التحكم والنعومة: أسطح داكنة، خطوط هندسية دقيقة، لمسات صفراء محددة بعناية، إشعارات حمراء رصينة، وخطوط مقروءة بوضوح تشبه الفكر المحرر.",
      lensCard1Kicker: "المعيار 01",
      lensCard1Title: "الأنظمة قبل الشاشات",
      lensCard1Desc: "يتم التعامل مع الواجهة كتعبير مباشر عن المنطق الداخلي المخفي. نحن نشكل التدفقات، والتبعيات، والحقائق التشغيلية قبل أن تدخل الزخارف البصرية إلى الغرفة.",
      lensCard2Kicker: "المعيار 02",
      lensCard2Title: "الضبط والتحرير الفني",
      lensCard2Desc: "يأتي التسلسل الهرمي للمعلومات من الإيقاع والمساحات والتباين واختصار الكلمات. نتجنب الزخرفة المفرطة لكي يحتفظ العمل بوقاره وجاذبيته لفترة أطول.",
      lensCard3Kicker: "المعيار 03",
      lensCard3Title: "الأناقة التشغيلية والعملية",
      lensCard3Desc: "سواء كان السياق خدمات لوجستية، أو تعليماً، أو رعاية صحية، فإن الهدف يظل واحداً: جعل الأنظمة المعقدة تبدو متماسكة، وموثوقة، وتسهل اتخاذ الإجراءات داخلها.",
      ctaTitle: "إذا كان مشروعك يحتاج إلى كل من الانضباط الهندسي والجمال الفني، فنحن نرحب بالتحدث معك.",
      ctaSub: "اطرح فكرة منصة، أو تحدي سير عمل، أو نظاماً برمجياً أصبح أكثر تعقيداً وضجيجاً مما يجب. نجيبك بهدوء ولكن بهيكلية واضحة للغاية.",
      ctaButton: "hello@deuinnovation.com",
      caseDetailsTitle: "تفاصيل المشروع",
      caseRole: "دور الاستوديو",
      caseFocus: "التركيز الاستراتيجي",
      caseOutcome: "النتيجة والأثر",
      caseClose: "إغلاق دراسة الحالة"
    },
    admin: {
      loginTitle: "بوابة الشركاء",
      loginSub: "قم بتسجيل الدخول باستخدام بيانات المؤسسين لمراجعة ملخصات المشاريع وإدارة المعرض.",
      email: "البريد الإلكتروني للشركاء",
      password: "كلمة المرور",
      loginBtn: "دخول لوحة التحكم",
      backBtn: "العودة للموقع العام",
      signupTitle: "إنشاء حساب شريك جديد",
      signupSub: "قم بتسجيل حساب مؤسس جديد لإدارة ملخصات المشاريع والمعرض.",
      signupBtn: "تسجيل الحساب",
      displayName: "اسم الشريك",
      hasAccount: "هل لديك حساب بالفعل؟ سجل دخولك هنا",
      noAccount: "بحاجة لحساب؟ سجل هنا",
      dashboardTitle: "لوحة التحكم والاستوديو",
      dashboardSub: "واجهة التحكم وإدارة العمليات لشركاء ديو إينوفيشن.",
      logoutBtn: "قفل اللوحة",
      viewBriefs: "طلبات المشاريع",
      editPortfolio: "إدارة معرض الأعمال",
      statusNew: "جديد",
      statusReviewed: "تمت المراجعة",
      statusArchived: "مؤرشف",
      actionArchive: "أرشفة الطلب",
      actionReview: "تعليم كمقروء ومراجع",
      actionNew: "إعادة فتح الطلب",
      emptyBriefs: "لم يتم تقديم أي طلبات مشاريع حتى الآن.",
      fieldCompany: "الشركة",
      fieldBudget: "الميزانية",
      addProject: "تسجيل مشروع جديد",
      editProject: "تعديل بيانات المشروع",
      deleteProject: "حذف المشروع من المعرض",
      projectIndex: "مؤشر المشروع (مثال: 05)",
      projectTitleEn: "العنوان بالإنجليزية",
      projectTitleDe: "العنوان بالألمانية",
      projectTitleAr: "العنوان بالعربية",
      projectDescEn: "الوصف بالإنجليزية",
      projectDescDe: "الوصف بالألمانية",
      projectDescAr: "الوصف بالعربية",
      projectRoleEn: "الدور بالإنجليزية",
      projectRoleDe: "الدور بالألمانية",
      projectRoleAr: "الدور بالعربية",
      projectFocusEn: "التركيز بالإنجليزية",
      projectFocusDe: "التركيز بالألمانية",
      projectFocusAr: "التركيز بالعربية",
      projectOutcomeEn: "الأثر بالإنجليزية",
      projectOutcomeDe: "الأثر بالألمانية",
      projectOutcomeAr: "الأثر بالعربية",
      projectDetailsEn: "التفاصيل الفنية بالإنجليزية",
      projectDetailsDe: "التفاصيل الفنية بالألمانية",
      projectDetailsAr: "التفاصيل الفنية بالعربية",
      projectServicesEn: "الخدمات بالإنجليزية (مفصولة بفاصلة)",
      projectServicesDe: "الخدمات بالألمانية (مفصولة بفاصلة)",
      projectServicesAr: "الخدمات بالعربية (مفصولة بفاصلة)",
      saveBtn: "حفظ التعديلات",
      cancelBtn: "إلغاء وتراجع",
      localDemoWarning: "تعمل اللوحة في وضع تجريبي (قاعدة بيانات محلية مؤقتة). يتم حفظ التغييرات في المتصفح."
    }
  }
};
