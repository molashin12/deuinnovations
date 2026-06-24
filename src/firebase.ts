import { initializeApp, getApps, getApp } from "firebase/app";
import { getAnalytics, isSupported as isAnalyticsSupported } from "firebase/analytics";
import { 
  getFirestore, 
  collection, 
  addDoc, 
  getDocs, 
  query, 
  orderBy, 
  serverTimestamp,
  doc,
  setDoc,
  deleteDoc
} from "firebase/firestore";
import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged, createUserWithEmailAndPassword } from "firebase/auth";
import type { User } from "firebase/auth";

// Firebase configuration using Vite environment variables
// Safe fallbacks are provided so the application runs offline or before configuration is complete
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "placeholder-api-key",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "deuinnovations.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "deuinnovations",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "deuinnovations.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "1234567890",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:1234567890:web:1234567890",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || undefined
};

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);
const auth = getAuth(app);

// Initialize Analytics (only in browser environments that support it)
isAnalyticsSupported().then((supported) => {
  if (supported) {
    getAnalytics(app);
  }
});

// Check if Firebase is using placeholder values (not yet configured by user)
export const isFirebaseConfigured = () => {
  return (
    import.meta.env.VITE_FIREBASE_API_KEY &&
    import.meta.env.VITE_FIREBASE_API_KEY !== "placeholder-api-key"
  );
};

// Define structure for a Project Brief submission
export interface ProjectBrief {
  id?: string;
  name: string;
  email: string;
  company?: string;
  services: string[];
  description: string;
  budget?: string;
  status: "new" | "reviewed" | "archived";
  createdAt?: any;
}

// Define structure for a Portfolio Project (loaded from Firestore or fallback)
export interface PortfolioProject {
  id: string;
  index: string; // e.g. "01"
  title: string;
  titleDe?: string;
  titleAr?: string;
  description: string;
  descriptionDe?: string;
  descriptionAr?: string;
  role: string;
  roleDe?: string;
  roleAr?: string;
  focus: string;
  focusDe?: string;
  focusAr?: string;
  servicesList: string[];
  servicesListDe?: string[];
  servicesListAr?: string[];
  outcome?: string;
  outcomeDe?: string;
  outcomeAr?: string;
  details?: string;
  detailsDe?: string;
  detailsAr?: string;
  featured?: boolean;
}

// 1. Submit a project brief
export const submitBrief = async (briefData: Omit<ProjectBrief, "status" | "createdAt">): Promise<string> => {
  if (!isFirebaseConfigured()) {
    console.warn("Firebase not configured. Simulating Firestore submission locally.");
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 800));
    // Save to local storage for local demo
    const localBriefs = JSON.parse(localStorage.getItem("deu_local_briefs") || "[]");
    const newBrief = {
      ...briefData,
      id: "local_" + Math.random().toString(36).substring(2, 11),
      status: "new",
      createdAt: new Date().toISOString()
    };
    localBriefs.push(newBrief);
    localStorage.setItem("deu_local_briefs", JSON.stringify(localBriefs));
    return newBrief.id;
  }

  try {
    const docRef = await addDoc(collection(db, "briefs"), {
      ...briefData,
      status: "new",
      createdAt: serverTimestamp()
    });
    return docRef.id;
  } catch (error) {
    console.error("Error submitting brief to Firestore: ", error);
    throw error;
  }
};

// 2. Fetch all project briefs (Admin only)
export const getBriefs = async (): Promise<ProjectBrief[]> => {
  if (!isFirebaseConfigured()) {
    // Return local storage mock briefs
    const localBriefs = JSON.parse(localStorage.getItem("deu_local_briefs") || "[]");
    return localBriefs.sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  try {
    const briefsCol = collection(db, "briefs");
    const q = query(briefsCol, orderBy("createdAt", "desc"));
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        name: data.name,
        email: data.email,
        company: data.company,
        services: data.services || [],
        description: data.description,
        budget: data.budget,
        status: data.status || "new",
        createdAt: data.createdAt?.toDate ? data.createdAt.toDate().toISOString() : data.createdAt
      } as ProjectBrief;
    });
  } catch (error) {
    console.error("Error fetching briefs: ", error);
    throw error;
  }
};

// 3. Update brief status
export const updateBriefStatus = async (id: string, status: "new" | "reviewed" | "archived"): Promise<void> => {
  if (!isFirebaseConfigured()) {
    const localBriefs = JSON.parse(localStorage.getItem("deu_local_briefs") || "[]");
    const updated = localBriefs.map((b: any) => b.id === id ? { ...b, status } : b);
    localStorage.setItem("deu_local_briefs", JSON.stringify(updated));
    return;
  }

  try {
    const briefDocRef = doc(db, "briefs", id);
    await setDoc(briefDocRef, { status }, { merge: true });
  } catch (error) {
    console.error("Error updating brief status: ", error);
    throw error;
  }
};

// 4. Fetch dynamic portfolio cases
export const getPortfolioProjects = async (): Promise<PortfolioProject[]> => {
  const localFallbacks: PortfolioProject[] = [
    {
      id: "logistics-command",
      index: "01",
      title: "Logistics command layer",
      titleDe: "Logistik-Leitsystem",
      titleAr: "منصة إدارة العمليات اللوجستية",
      role: "Web platform + workflow design",
      roleDe: "Webplattform + Workflow-Design",
      roleAr: "منصة ويب + تصميم مسارات العمل",
      focus: "Operational visibility and faster decisions",
      focusDe: "Betriebliche Transparenz und schnellere Entscheidungen",
      focusAr: "الرؤية التشغيلية واتخاذ القرارات السريعة",
      servicesList: ["Product architecture", "Interface system", "Operational AI", "Decision flow"],
      servicesListDe: ["Produktarchitektur", "Schnittstellensystem", "Operative KI", "Entscheidungsfluss"],
      servicesListAr: ["بنية المنتج", "نظام الواجهة", "الذكاء الاصطناعي التشغيلي", "تدفق القرارات"],
      description: "A dispatch and warehouse platform that turns fragmented operations into one readable system for managers, drivers, and customer-facing teams.",
      descriptionDe: "Eine Dispositions- und Lagerplattform, die fragmentierte Abläufe in ein lesbares System für Manager, Fahrer und kundennahe Teams verwandelt.",
      descriptionAr: "منصة توزيع ومستودعات تحول العمليات المتفرقة إلى نظام واحد مقروء للمدراء والسائقين وفرق خدمة العملاء.",
      outcome: "Sharper operating visibility with calmer decision surfaces for leadership teams, resulting in a 34% reduction in dispatch bottlenecks.",
      outcomeDe: "Schärfere betriebliche Sichtbarkeit mit ruhigeren Entscheidungsoberflächen für Führungsteams, was zu einer Reduzierung der Dispositionsengpässe um 34 % führt.",
      outcomeAr: "رؤية تشغيلية أوضح مع واجهات اتخاذ قرار أكثر هدوءًا لفرق القيادة، مما أدى إلى تقليل اختناقات التوزيع بنسبة 34٪.",
      details: "This logistics application connects legacy ERP systems with a modern real-time tracking interface. Utilizing WebSockets for instant state changes and custom map visualizers, the command layer resolves the visual noise usually found in transportation management tools. It introduces smart queuing that uses local heuristic algorithms to prioritize urgent cargo routes, alerting operators with low-friction notify loops. The result is a unified workplace app that runs cleanly on desktop and tablets in warehouse conditions.",
      detailsDe: "Diese Logistikanwendung verbindet Altsysteme (ERP) mit einer modernen Echtzeit-Tracking-Schnittstelle. Durch den Einsatz von WebSockets für sofortige Statusänderungen und maßgeschneiderten Kartenvisualisierungen löst das Leitsystem das visuelle Rauschen auf, das man normalerweise in Transportmanagement-Tools findet. Es führt eine intelligente Warteschlange ein, die lokale heuristische Algorithmen nutzt, um dringende Frachtrouten zu priorisieren. Das Ergebnis ist eine einheitliche App, die auf Desktop und Tablets unter Lagerbedingungen sauber läuft.",
      detailsAr: "يربط تطبيق الخدمات اللوجستية هذا أنظمة تخطيط موارد المؤسسات القديمة بواجهة تتبع حديثة في الوقت الفعلي. باستخدام بروتوكول WebSockets لتغييرات الحالة الفورية ومخرجات خرائط مخصصة، تزيل طبقة التحكم الضجيج البصري المعتاد في أدوات النقل. كما يقدم نظام جدولة ذكي يستخدم خوارزميات ارشادية لتحديد أولويات شحن البضائع العاجلة. النتيجة هي تطبيق موحد يعمل بسلاسة على الأجهزة المكتبية واللوحية في ظروف المستودعات."
    },
    {
      id: "field-service",
      index: "02",
      title: "Field service mobile suite",
      titleDe: "Mobile Suite für den Außendienst",
      titleAr: "مجموعة تطبيقات الخدمة الميدانية للهواتف",
      role: "Mobile product + sync logic",
      roleDe: "Mobiles Produkt + Synchronisationslogik",
      roleAr: "منتج هاتف محمول + منطق مزامنة البيانات",
      focus: "Field execution with clean system feedback",
      focusDe: "Außendienst-Ausführung mit klarem System-Feedback",
      focusAr: "التنفيذ الميداني مع استجابة نظام نظيفة",
      servicesList: ["Mobile UX", "Offline Sync Sync", "Sync Architecture"],
      servicesListDe: ["Mobile UX", "Offline-Synchronisierung", "Synchronisationsarchitektur"],
      servicesListAr: ["تجربة هاتف محمول", "مزامنة دون اتصال", "بنية المزامنة"],
      description: "A mobile-first operating surface for technicians, approvals, and reporting, engineered to stay calm in low-connectivity and high-pressure environments.",
      descriptionDe: "Eine auf mobile Nutzung ausgerichtete Bedienoberfläche für Techniker, Freigaben und Berichterstattung, entwickelt für Stabilität in Umgebungen mit geringer Konnektivität.",
      descriptionAr: "واجهة تشغيل مخصصة للهواتف المحمولة للفنيين والاعتمادات والتقارير، صممت لتعمل بكفاءة في بيئات الاتصال الضعيف وضغوط العمل.",
      outcome: "Technicians completed reports 50% faster, and dispatchers resolved emergency approvals with real-time feedback loops even in remote areas.",
      outcomeDe: "Techniker füllten Berichte um 50 % schneller aus, und Disponenten bearbeiteten Notfallfreigaben mit Echtzeit-Feedback-Schleifen selbst in entlegenen Gebieten.",
      outcomeAr: "أكمل الفنيون التقارير بشكل أسرع بنسبة 50٪، وحل الموزعون الموافقات الطارئة مع حلقات استجابة فورية حتى في المناطق النائية.",
      details: "Technicians operating in basements, rural fields, or heavy industrial complexes require offline independence. This app features a robust client-side database SQLite wrapper that queues actions and synchronizes them once a signal is acquired. Interfaces utilize larger tap areas, high-contrast typography, and a simplified status progress indicator to prevent confusion. Form inputs are autosaved, and data payloads are optimized down to micro-JSON files to guarantee transmission over 2G networks.",
      detailsDe: "Techniker, die in Kellern, ländlichen Gebieten oder schweren Industriekomplexen arbeiten, benötigen Offline-Unabhängigkeit. Diese App verfügt über einen robusten clientseitigen Datenbank-Wrapper, der Aktionen in eine Warteschlange stellt und synchronisiert, sobald eine Verbindung hergestellt ist. Die Benutzeroberfläche verwendet größere Touch-Bereiche, kontrastreiche Typografie und vereinfachte Statusanzeigen, um Verwirrung zu vermeiden. Formulardaten werden automatisch lokal gespeichert.",
      detailsAr: "يحتاج الفنيون الذين يعملون في الأقبية أو الحقول الريفية أو المجمعات الصناعية الثقيلة إلى العمل دون اتصال بالإنترنت. يتميز هذا التطبيق بمخزن بيانات محلي يضع الإجراءات في قائمة انتظار ويزامنها بمجرد الحصول على إشارة. تستخدم الواجهات مساحات نقر أكبر، وخطوط عالية التباين، ومؤشرات حالة مبسطة لمنع الالتباس. يتم حفظ المدخلات تلقائيًا، وتحسين حجم البيانات لضمان النقل عبر شبكات الجيل الثاني."
    },
    {
      id: "bilingual-learning",
      index: "03",
      title: "Bilingual learning engine",
      titleDe: "Zweisprachige Lern-Engine",
      titleAr: "محرك التعليم ثنائي اللغة",
      role: "Platform strategy + multilingual UX",
      roleDe: "Plattformstrategie + mehrsprachige UX",
      roleAr: "استراتيجية المنصة + تجربة مستخدم متعددة اللغات",
      focus: "Learning flow, translation, and product clarity",
      focusDe: "Lernfluss, Übersetzung und Produktklarheit",
      focusAr: "تدفق التعليم، الترجمة، ووضوح المنتج",
      servicesList: ["Educational Strategy", "Multilingual UX", "Content Pipelines"],
      servicesListDe: ["Bildungsstrategie", "Mehrsprachige UX", "Content-Pipelines"],
      servicesListAr: ["استراتيجية التعليم", "تجربة متعددة اللغات", "قنوات المحتوى"],
      description: "A future-facing learning environment where course structure, translation logic, and adaptive delivery live inside one coherent product foundation.",
      descriptionDe: "Eine zukunftsweisende Lernumgebung, in der Kursstruktur, Übersetzungslogik und adaptive Bereitstellung in einer kohärenten Produktbasis vereint sind.",
      descriptionAr: "بيئة تعليمية مستقبلية حيث تعيش بنية الدورة التدريبية ومنطق الترجمة والتوصيل التكيفي داخل أساس منتج متماسك واحد.",
      outcome: "A platform concept ready for cross-language growth, supporting instant switching between English, German, and Arabic layouts.",
      outcomeDe: "Ein Plattformkonzept, das für das Wachstum über Sprachgrenzen hinweg bereit ist und das sofortige Umschalten zwischen englischen, deutschen und arabischen Layouts unterstützt.",
      outcomeAr: "مفهوم منصة جاهز للنمو عبر اللغات، يدعم التبديل الفوري بين تصميمات اللغات الإنجليزية والألمانية والعربية.",
      details: "This educational platform leverages dynamic course mapping. Its key architectural choice is the decoupling of the content translation layers from the progress state, allowing learners to switch languages mid-lesson without losing their scroll position, interactive quiz states, or audio playback progress. The Arabic view undergoes deep RTL parsing, modifying font sizes and line heights to suit Nastaliq-inspired digital weights and reversing layout structures dynamically.",
      detailsDe: "Diese Bildungsplattform nutzt dynamisches Kurs-Mapping. Ihr wichtigstes architektonisches Merkmal ist die Entkopplung der Inhaltsübersetzungsebenen vom Fortschrittsstatus. Dies ermöglicht es den Lernenden, die Sprache mitten in der Lektion zu wechseln, ohne ihre Scrollposition, den Status interaktiver Quizze oder den Fortschritt der Audiowiedergabe zu verlieren. Die arabische Ansicht wird einer tiefen RTL-Analyse unterzogen, um das Layout anzupassen.",
      detailsAr: "تستفيد هذه المنصة التعليمية من رسم خرائط الدورات التدريبية الديناميكية. الميزة المعمارية الرئيسية هي فصل طبقات ترجمة المحتوى عن حالة التقدم، مما يسمح للمتعلمين بتبديل اللغات في منتصف الدرس دون فقدان موضع التصفح أو حالة الاختبارات التفاعلية أو تقدم تشغيل الصوت. يخضع العرض العربي لمعالجة اتجاهات عميقة (RTL)، مع تعديل أحجام الخطوط وارتفاعات الأسطر لتناسب أوزان النصوص الرقمية."
    },
    {
      id: "clinical-workflow",
      index: "04",
      title: "Clinical workflow compass",
      titleDe: "Klinischer Workflow-Kompass",
      titleAr: "بوصلة العمليات السريرية والطبية",
      role: "Smart solution concept + interface system",
      roleDe: "Konzept für intelligente Lösungen + Schnittstellensystem",
      roleAr: "مفهوم الحلول الذكية + نظام واجهة المستخدم",
      focus: "Clarity in complex, high-stakes environments",
      focusDe: "Klarheit in komplexen, risikoreichen Umgebungen",
      focusAr: "الوضوح في البيئات المعقدة عالية الحساسية",
      servicesList: ["Healthcare UX", "Patient Journeys", "Workflow Alerts"],
      servicesListDe: ["Gesundheits-UX", "Patientenreisen", "Workflow-Warnungen"],
      servicesListAr: ["تجربة المستخدم الصحية", "مسارات المرضى", "تنبيهات سير العمل"],
      description: "A healthcare-oriented systems concept built around scheduling, care coordination, and intelligent alerts without losing calm or trust.",
      descriptionDe: "Ein konzeptionelles System für das Gesundheitswesen, das sich auf Terminplanung, Pflegekoordination und intelligente Warnungen konzentriert, ohne Ruhe oder Vertrauen zu verlieren.",
      descriptionAr: "مفهوم نظام موجه لقطاع الرعاية الصحية مبني على الجدولة وتنسيق الرعاية والتنبيهات الذكية دون فقدان الهدوء أو الثقة.",
      outcome: "Reduced nurse cognitive load by organizing complex patient shifts and clinical alerts into clean, prioritized visual columns.",
      outcomeDe: "Reduzierte kognitive Belastung für Pflegekräfte, indem komplexe Patientenschichten und klinische Warnungen in saubere, prioritäre visuelle Spalten geordnet wurden.",
      outcomeAr: "تقليل العبء الذهني على الممرضات من خلال تنظيم نوبات عمل المرضى المعقدة والتنبيهات السريرية في أعمدة بصرية واضحة ومرتبة بحسب الأولوية.",
      details: "Medical settings demand focus. The Clinical Workflow Compass aggregates scheduling data, EHR updates, and telemetry notifications into an optimized triage screen. A critical design feature is the sound and color alert hierarchy: using muted primary golds for medium notices and soft flag reds only for life-critical conditions. This avoids screen fatigue and helps nurses and doctors identify issues at a glance under dim clinical lighting.",
      detailsDe: "Medizinische Umgebungen erfordern absolute Konzentration. Der klinische Workflow-Kompass aggregiert Terminplanungsdaten, EHR-Updates und Telemetriebeschlüsse in einer optimierten Triage-Ansicht. Ein entscheidendes Merkmal ist die Alarmhierarchie nach Ton und Farbe: Sanftes Gold für mittlere Benachrichtigungen und weiches Flaggenrot nur für lebenswichtige Zustände, um Ermüdung zu vermeiden.",
      detailsAr: "تتطلب الإعدادات الطبية التركيز التام. تجمع بوصلة سير العمل السريري بيانات الجدولة وتحديثات السجلات الصحية الإلكترونية وتنبيهات الأجهزة الطبية في شاشة فرز محسنة. ميزة التصميم الرئيسية هي تسلسل التنبيهات اللونية والصوتية: استخدام ألوان ذهبية هادئة للإشعارات المتوسطة، واللون الأحمر الهادئ فقط للحالات الحرجة لإنقاذ الحياة، مما يمنع التشتت."
    }
  ];

  if (!isFirebaseConfigured()) {
    return localFallbacks;
  }

  try {
    const projectsCol = collection(db, "projects");
    const snapshot = await getDocs(projectsCol);
    if (snapshot.empty) {
      // If Firestore database is empty, seed it with fallback data or return fallback data
      console.log("Firestore projects collection is empty. Seeding fallbacks.");
      // Seeding in background
      localFallbacks.forEach(async (proj) => {
        try {
          await setDoc(doc(db, "projects", proj.id), proj);
        } catch (e) {
          console.error("Failed to seed project: ", proj.id, e);
        }
      });
      return localFallbacks;
    }
    
    return snapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        index: data.index || "01",
        title: data.title,
        titleDe: data.titleDe || data.title,
        titleAr: data.titleAr || data.title,
        description: data.description,
        descriptionDe: data.descriptionDe || data.description,
        descriptionAr: data.descriptionAr || data.description,
        role: data.role,
        roleDe: data.roleDe || data.role,
        roleAr: data.roleAr || data.role,
        focus: data.focus,
        focusDe: data.focusDe || data.focus,
        focusAr: data.focusAr || data.focus,
        servicesList: data.servicesList || [],
        servicesListDe: data.servicesListDe || data.servicesList || [],
        servicesListAr: data.servicesListAr || data.servicesList || [],
        outcome: data.outcome,
        outcomeDe: data.outcomeDe || data.outcome,
        outcomeAr: data.outcomeAr || data.outcome,
        details: data.details,
        detailsDe: data.detailsDe || data.details,
        detailsAr: data.detailsAr || data.details,
        featured: data.featured || false
      } as PortfolioProject;
    }).sort((a, b) => parseInt(a.index) - parseInt(b.index));
  } catch (error) {
    console.error("Error fetching projects from Firestore: ", error);
    return localFallbacks;
  }
};

// 5. Add / Update a project (Admin only)
export const saveProject = async (project: PortfolioProject): Promise<void> => {
  if (!isFirebaseConfigured()) {
    console.warn("Firebase not configured. Simulating project save locally.");
    return;
  }
  try {
    const projectRef = doc(db, "projects", project.id);
    await setDoc(projectRef, project);
  } catch (error) {
    console.error("Error saving project to Firestore: ", error);
    throw error;
  }
};

// 6. Delete a project (Admin only)
export const deleteProject = async (id: string): Promise<void> => {
  if (!isFirebaseConfigured()) {
    console.warn("Firebase not configured. Simulating project deletion.");
    return;
  }
  try {
    const projectRef = doc(db, "projects", id);
    await deleteDoc(projectRef);
  } catch (error) {
    console.error("Error deleting project from Firestore: ", error);
    throw error;
  }
};

// Auth listener helper
export const subscribeToAuth = (callback: (user: User | null) => void) => {
  return onAuthStateChanged(auth, callback);
};

// Admin authentication functions
export const registerAdmin = async (email: string, password: string, displayName?: string): Promise<User> => {
  if (!isFirebaseConfigured()) {
    console.warn("Firebase not configured. Simulating local signup success.");
    await new Promise((resolve) => setTimeout(resolve, 600));
    const users = JSON.parse(localStorage.getItem("deu_mock_users") || "[]");
    if (users.some((u: any) => u.email === email)) {
      throw new Error("auth/email-already-in-use");
    }
    const newUser = {
      uid: "mock_" + Math.random().toString(36).substring(2, 11),
      email,
      password,
      displayName: displayName || "Studio Partner"
    };
    users.push(newUser);
    localStorage.setItem("deu_mock_users", JSON.stringify(users));
    
    // Auto login
    const mockUser = {
      uid: newUser.uid,
      email: newUser.email,
      displayName: newUser.displayName
    } as unknown as User;
    localStorage.setItem("deu_mock_user", JSON.stringify(mockUser));
    return mockUser;
  }

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    console.error("Registration error: ", error);
    throw error;
  }
};

export const loginAdmin = async (email: string, password: string): Promise<User> => {
  if (!isFirebaseConfigured()) {
    console.warn("Firebase not configured. Simulating local auth success.");
    await new Promise((resolve) => setTimeout(resolve, 600));
    
    const users = JSON.parse(localStorage.getItem("deu_mock_users") || "[]");
    const foundUser = users.find((u: any) => u.email === email && u.password === password) ||
                      (email === "admin@deuinnovation.com" && password === "admin123" ? { email, displayName: "Studio Partner" } : null);
    
    if (foundUser) {
      const mockUser = {
        uid: foundUser.uid || "mock_admin_uid",
        email: foundUser.email,
        displayName: foundUser.displayName || "Studio Partner"
      } as unknown as User;
      localStorage.setItem("deu_mock_user", JSON.stringify(mockUser));
      return mockUser;
    } else {
      throw new Error("auth/wrong-password");
    }
  }

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    console.error("Auth error: ", error);
    throw error;
  }
};

export const logoutAdmin = async (): Promise<void> => {
  if (!isFirebaseConfigured()) {
    localStorage.removeItem("deu_mock_user");
    return;
  }
  await signOut(auth);
};

export const getCurrentUser = (): User | null => {
  if (!isFirebaseConfigured()) {
    const saved = localStorage.getItem("deu_mock_user");
    return saved ? JSON.parse(saved) : null;
  }
  return auth.currentUser;
};
