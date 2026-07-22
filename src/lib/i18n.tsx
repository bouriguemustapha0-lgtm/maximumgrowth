import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Lang = "fr" | "en";

type Dict = Record<string, string>;

const en: Dict = {
  // Nav
  "nav.about": "About",
  "nav.services": "Services",
  "nav.work": "Work",
  "nav.process": "Process",
  "nav.contact": "Contact",
  "nav.book": "Book a Call",
  "nav.bookFree": "Book a Free Call",
  "nav.openMenu": "Open menu",
  "nav.closeMenu": "Close menu",

  // Hero
  "hero.badge": "Available for New Hospitality Projects · Q2 2026",
  "hero.title1": "Websites That Bring",
  "hero.title2": "Hotels More Direct Bookings",
  "hero.subtitle":
    "I help guesthouses, riads, and hotels build a professional online presence that increases direct bookings and reduces reliance on booking platforms.",
  "hero.ctaPrimary": "Book a Free Consultation",
  "hero.ctaSecondary": "View Hospitality Projects",
  "hero.trusted": "Trusted by hospitality clients",
  "hero.role": "Hotel & Riad Web Designer",
  "hero.country": "MOROCCO",
  "hero.lighthouse": "Lighthouse",
  "hero.aiEnhanced": "AI Enhanced",
  "hero.workflows": "Workflows",

  // About
  "about.eyebrow": "About Me",
  "about.title1": "Helping hospitality businesses",
  "about.title2": "grow online",
  "about.years": "Years building digital experiences",
  "about.p1":
    "I'm Mustapha Bourigue, an AI Web Developer specializing in websites for guesthouses, riads, boutique hotels, and hospitality businesses.",
  "about.p2":
    "I create fast, modern websites with online booking, secure payments, SEO, and WhatsApp integration so guests can book directly from your website.",
  "about.f1.t": "Direct Bookings",
  "about.f1.d": "Guests reserve straight from your site.",
  "about.f2.t": "Fast & Modern",
  "about.f2.d": "Optimized for speed and mobile.",
  "about.f3.t": "SEO Ready",
  "about.f3.d": "Found by travelers on Google.",
  "about.f4.t": "WhatsApp Integrated",
  "about.f4.d": "Instant guest communication.",

  // Services
  "services.eyebrow": "Services",
  "services.title1": "Everything hospitality businesses need to",
  "services.title2": "grow direct bookings",
  "services.learnMore": "Learn more",
  "services.s1.t": "Hotel & Riad Websites",
  "services.s1.d": "Elegant, brand-driven websites for guesthouses, riads, and boutique hotels.",
  "services.s2.t": "Direct Booking Systems",
  "services.s2.d": "Let guests book rooms directly — no more platform commissions.",
  "services.s3.t": "Secure Online Payments",
  "services.s3.d": "Accept card payments and deposits safely on your own site.",
  "services.s4.t": "SEO & Google Visibility",
  "services.s4.d": "Rank on Google so travelers find you before your competitors.",
  "services.s5.t": "WhatsApp Booking Integration",
  "services.s5.d": "Instant chat & inquiries — the way guests prefer to book today.",
  "services.s6.t": "AI Automation",
  "services.s6.d": "Automated responses, guest workflows, and smart follow-ups.",

  // Portfolio
  "work.eyebrow": "Selected Work",
  "work.title1": "Recent",
  "work.title2": "projects",
  "work.filter.all": "All",
  "work.filter.hospitality": "Hospitality",
  "work.filter.restaurant": "Restaurant",
  "work.demo": "Live Demo",
  "work.p1.d": "Boutique hotel, café & restaurant on Boulevard Mohamed V in Beni Mellal.",
  "work.p2.d": "Guesthouse with pool between Casablanca and Mohammedia — booking & rooms.",
  "work.p3.d": "Luxury 17th-century riad website with spa & suites.",
  "work.p4.d": "Five-star luxury hotel showcase with room bookings.",
  "work.p5.d": "Fine dining steakhouse with menu & reservations.",

  // Stats / Why
  "why.eyebrow": "Why Hospitality Businesses Choose Me",
  "why.title1": "Built for",
  "why.title2": "direct bookings",
  "why.r1.t": "More Direct Bookings",
  "why.r1.d": "Convert visitors into guests booking straight from your website.",
  "why.r2.t": "Lower Commission Costs",
  "why.r2.d": "Reduce dependence on Booking.com and Airbnb fees.",
  "why.r3.t": "Mobile-First Design",
  "why.r3.d": "Optimized for travelers browsing on their phones.",
  "why.r4.t": "SEO Optimized",
  "why.r4.d": "Rank higher on Google for your city, riad, or hotel niche.",
  "why.r5.t": "WhatsApp Integrated",
  "why.r5.d": "Guests reach you instantly — the way they prefer.",
  "why.r6.t": "Built with AI",
  "why.r6.d": "Faster delivery, smarter workflows, better performance.",

  // Testimonials
  "test.eyebrow": "Testimonials",
  "test.title1": "Loved by",
  "test.title2": "clients",
  "test.t1.role": "Riad Owner, Marrakech",
  "test.t1.q":
    "Direct bookings from our website tripled in three months. The design finally matches the experience we offer to our guests.",
  "test.t2.role": "Guesthouse Manager, Essaouira",
  "test.t2.q":
    "Guests now book and pay directly, and WhatsApp integration made communication so simple. Mustapha understood our needs from day one.",
  "test.t3.role": "Boutique Hotel Owner",
  "test.t3.q":
    "Beautiful, fast, and built to convert. Our commission costs dropped and Google finally sends us qualified travelers.",

  // Process
  "process.eyebrow": "Process",
  "process.title1": "A clear path to",
  "process.title2": "launch",
  "process.s1.t": "Discovery Call",
  "process.s1.d": "We talk goals, audience, and what success looks like.",
  "process.s2.t": "Planning & Design",
  "process.s2.d": "Wireframes, design system, brand-aligned visuals.",
  "process.s3.t": "Development",
  "process.s3.d": "Built with modern tools, AI-assisted, fully responsive.",
  "process.s4.t": "Launch & Support",
  "process.s4.d": "Deploy, optimize, and grow with continuous improvements.",

  // Contact
  "contact.eyebrow": "Let's connect",
  "contact.title1": "Get more",
  "contact.title2": "direct bookings",
  "contact.subtitle": "The fastest way to reach me is WhatsApp — I usually reply within a few hours.",
  "contact.fastest": "Fastest reply",
  "contact.bookFree": "Book a Free Call",
  "contact.bookDesc": "+212 699 309 986 · Free 15-min consultation, no commitment.",
  "contact.whatsapp": "WhatsApp",
  "contact.call": "Call directly",
  "contact.ig.t": "Instagram",
  "contact.ig.d": "Follow my latest work",
  "contact.email.t": "Send an email",
  "contact.email.d": "Best for project briefs",
  "contact.additional": "Additional info",

  // Footer
  "footer.rights": "All rights reserved.",
};

const fr: Dict = {
  // Nav
  "nav.about": "À propos",
  "nav.services": "Services",
  "nav.work": "Réalisations",
  "nav.process": "Processus",
  "nav.contact": "Contact",
  "nav.book": "Prendre RDV",
  "nav.bookFree": "Appel gratuit",
  "nav.openMenu": "Ouvrir le menu",
  "nav.closeMenu": "Fermer le menu",

  // Hero
  "hero.badge": "Disponible pour de nouveaux projets hôteliers · T2 2026",
  "hero.title1": "Des sites qui apportent",
  "hero.title2": "plus de réservations directes aux hôtels",
  "hero.subtitle":
    "J'aide les maisons d'hôtes, riads et hôtels à bâtir une présence en ligne professionnelle qui augmente les réservations directes et réduit la dépendance aux plateformes.",
  "hero.ctaPrimary": "Consultation gratuite",
  "hero.ctaSecondary": "Voir les projets",
  "hero.trusted": "Approuvé par des clients de l'hôtellerie",
  "hero.role": "Concepteur web Hôtels & Riads",
  "hero.country": "MAROC",
  "hero.lighthouse": "Lighthouse",
  "hero.aiEnhanced": "Boosté par l'IA",
  "hero.workflows": "Workflows",

  // About
  "about.eyebrow": "À propos",
  "about.title1": "Aider l'hôtellerie à",
  "about.title2": "se développer en ligne",
  "about.years": "Années à créer des expériences digitales",
  "about.p1":
    "Je suis Mustapha Bourigue, développeur web IA spécialisé dans les sites pour maisons d'hôtes, riads, hôtels de charme et acteurs de l'hôtellerie.",
  "about.p2":
    "Je crée des sites rapides et modernes avec réservation en ligne, paiements sécurisés, SEO et intégration WhatsApp, pour que vos clients réservent directement.",
  "about.f1.t": "Réservations directes",
  "about.f1.d": "Vos clients réservent directement sur votre site.",
  "about.f2.t": "Rapide & moderne",
  "about.f2.d": "Optimisé pour la vitesse et le mobile.",
  "about.f3.t": "Prêt pour le SEO",
  "about.f3.d": "Trouvé par les voyageurs sur Google.",
  "about.f4.t": "WhatsApp intégré",
  "about.f4.d": "Communication client instantanée.",

  // Services
  "services.eyebrow": "Services",
  "services.title1": "Tout ce qu'il faut à l'hôtellerie pour",
  "services.title2": "gagner en réservations directes",
  "services.learnMore": "En savoir plus",
  "services.s1.t": "Sites Hôtels & Riads",
  "services.s1.d": "Sites élégants et alignés à votre marque pour maisons d'hôtes, riads et hôtels de charme.",
  "services.s2.t": "Systèmes de réservation directe",
  "services.s2.d": "Vos clients réservent directement — fini les commissions des plateformes.",
  "services.s3.t": "Paiements en ligne sécurisés",
  "services.s3.d": "Encaissez cartes et acomptes en toute sécurité sur votre site.",
  "services.s4.t": "SEO & visibilité Google",
  "services.s4.d": "Classez-vous sur Google avant vos concurrents.",
  "services.s5.t": "Intégration WhatsApp",
  "services.s5.d": "Chat & demandes instantanés — le canal préféré des clients aujourd'hui.",
  "services.s6.t": "Automatisation IA",
  "services.s6.d": "Réponses automatiques, workflows clients et relances intelligentes.",

  // Portfolio
  "work.eyebrow": "Sélection",
  "work.title1": "Projets",
  "work.title2": "récents",
  "work.filter.all": "Tous",
  "work.filter.hospitality": "Hôtellerie",
  "work.filter.restaurant": "Restaurant",
  "work.demo": "Voir le site",
  "work.p1.d": "Hôtel de charme, café & restaurant sur le Boulevard Mohamed V à Beni Mellal.",
  "work.p2.d": "Maison d'hôtes avec piscine entre Casablanca et Mohammedia — réservation & chambres.",
  "work.p3.d": "Site d'un riad de luxe du 17e siècle avec spa & suites.",
  "work.p4.d": "Vitrine d'un hôtel 5 étoiles avec réservation de chambres.",
  "work.p5.d": "Steakhouse gastronomique avec menu & réservations.",

  // Stats / Why
  "why.eyebrow": "Pourquoi l'hôtellerie me choisit",
  "why.title1": "Conçu pour les",
  "why.title2": "réservations directes",
  "why.r1.t": "Plus de réservations directes",
  "why.r1.d": "Transformez vos visiteurs en clients qui réservent directement.",
  "why.r2.t": "Moins de commissions",
  "why.r2.d": "Réduisez votre dépendance à Booking.com et Airbnb.",
  "why.r3.t": "Design mobile-first",
  "why.r3.d": "Optimisé pour les voyageurs sur smartphone.",
  "why.r4.t": "Optimisé SEO",
  "why.r4.d": "Meilleur classement Google pour votre ville, riad ou niche.",
  "why.r5.t": "WhatsApp intégré",
  "why.r5.d": "Vos clients vous contactent instantanément.",
  "why.r6.t": "Boosté par l'IA",
  "why.r6.d": "Livraison plus rapide, workflows intelligents, meilleures performances.",

  // Testimonials
  "test.eyebrow": "Témoignages",
  "test.title1": "Approuvé par les",
  "test.title2": "clients",
  "test.t1.role": "Propriétaire de Riad, Marrakech",
  "test.t1.q":
    "Les réservations directes ont triplé en trois mois. Le design est enfin à la hauteur de l'expérience que nous offrons.",
  "test.t2.role": "Gérante de maison d'hôtes, Essaouira",
  "test.t2.q":
    "Les clients réservent et paient directement, et WhatsApp a tout simplifié. Mustapha a compris nos besoins dès le premier jour.",
  "test.t3.role": "Propriétaire d'hôtel de charme",
  "test.t3.q":
    "Beau, rapide et conçu pour convertir. Nos commissions ont baissé et Google nous envoie enfin des voyageurs qualifiés.",

  // Process
  "process.eyebrow": "Processus",
  "process.title1": "Un chemin clair jusqu'au",
  "process.title2": "lancement",
  "process.s1.t": "Appel découverte",
  "process.s1.d": "On discute des objectifs, du public et de vos critères de succès.",
  "process.s2.t": "Planification & design",
  "process.s2.d": "Wireframes, design system, visuels alignés à votre marque.",
  "process.s3.t": "Développement",
  "process.s3.d": "Outils modernes, assisté par IA, entièrement responsive.",
  "process.s4.t": "Lancement & suivi",
  "process.s4.d": "Déploiement, optimisation et amélioration continue.",

  // Contact
  "contact.eyebrow": "Prenons contact",
  "contact.title1": "Obtenez plus de",
  "contact.title2": "réservations directes",
  "contact.subtitle": "Le moyen le plus rapide de me joindre est WhatsApp — je réponds en quelques heures.",
  "contact.fastest": "Réponse la plus rapide",
  "contact.bookFree": "Appel gratuit",
  "contact.bookDesc": "+212 699 309 986 · Consultation gratuite de 15 min, sans engagement.",
  "contact.whatsapp": "WhatsApp",
  "contact.call": "Appeler directement",
  "contact.ig.t": "Instagram",
  "contact.ig.d": "Suivez mes dernières réalisations",
  "contact.email.t": "Envoyer un email",
  "contact.email.d": "Idéal pour un brief projet",
  "contact.additional": "Infos complémentaires",

  // Footer
  "footer.rights": "Tous droits réservés.",
};

const dicts: Record<Lang, Dict> = { en, fr };

type Ctx = { lang: Lang; setLang: (l: Lang) => void; t: (k: string) => string };
const LangContext = createContext<Ctx | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("fr");

  useEffect(() => {
    try {
      const saved = localStorage.getItem("lang") as Lang | null;
      if (saved === "en" || saved === "fr") setLangState(saved);
    } catch {}
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    try {
      localStorage.setItem("lang", l);
    } catch {}
    if (typeof document !== "undefined") document.documentElement.lang = l;
  };

  const t = (k: string) => dicts[lang][k] ?? dicts.en[k] ?? k;
  return <LangContext.Provider value={{ lang, setLang, t }}>{children}</LangContext.Provider>;
}

export function useT() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useT must be used within LanguageProvider");
  return ctx;
}

export function LangToggle({ className = "" }: { className?: string }) {
  const { lang, setLang } = useT();
  const isFr = lang === "fr";
  return (
    <div
      role="group"
      aria-label="Language"
      className={`relative inline-flex items-center rounded-full border border-border bg-card/60 backdrop-blur p-1 text-xs font-semibold ${className}`}
    >
      <span
        aria-hidden
        className={`absolute top-1 bottom-1 w-[calc(50%-4px)] rounded-full bg-primary transition-transform duration-300 ${
          isFr ? "translate-x-0" : "translate-x-[calc(100%+0px)]"
        }`}
        style={{ left: 4 }}
      />
      <button
        type="button"
        onClick={() => setLang("fr")}
        aria-pressed={isFr}
        className={`relative z-10 px-3 py-1 rounded-full transition-colors ${isFr ? "text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}
      >
        FR
      </button>
      <button
        type="button"
        onClick={() => setLang("en")}
        aria-pressed={!isFr}
        className={`relative z-10 px-3 py-1 rounded-full transition-colors ${!isFr ? "text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}
      >
        EN
      </button>
    </div>
  );
}
