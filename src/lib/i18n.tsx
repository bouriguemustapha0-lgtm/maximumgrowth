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
  "services.viewDetails": "View details",
  "services.close": "Close",
  "services.bookCta": "Book a Free Call",
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

/* ---------- Service details (rich modal content) ---------- */
export type ServiceSection =
  | { kind: "list"; heading: string; items: string[] }
  | { kind: "flow"; heading: string; steps: string[] }
  | { kind: "paragraph"; text: string }
  | { kind: "highlight"; lines: string[] };

export type ServiceDetail = {
  emoji: string;
  title: string;
  tagline: string;
  intro: string[];
  sections: ServiceSection[];
  closing?: string;
};

const serviceDetailsEn: ServiceDetail[] = [
  {
    emoji: "🏨",
    title: "Hotel & Riad Websites",
    tagline: "Luxury websites that reflect your hospitality",
    intro: [
      "Your website should do more than showcase your property — it should inspire confidence and turn visitors into guests.",
      "We design elegant, high-end websites that capture the atmosphere of your hotel, riad, or guesthouse while making it easy for travelers to book directly.",
      "Behind every project, we combine modern technologies, AI-powered workflows, and performance optimization to create websites that are beautiful, lightning-fast, and built to convert.",
    ],
    sections: [
      {
        kind: "list",
        heading: "Every website includes",
        items: [
          "Luxury custom design",
          "Mobile-first experience",
          "Professional room showcases",
          "Fast loading pages",
          "Google Maps integration",
          "SEO optimization",
          "Multi-language support",
          "Direct booking integration",
        ],
      },
    ],
    closing: "Because your website should feel as premium as the experience you offer.",
  },
  {
    emoji: "📅",
    title: "Direct Booking System",
    tagline: "Turn website visitors into paying guests",
    intro: [
      "Reduce your dependence on booking platforms by allowing guests to reserve directly through your own website.",
      "We build booking systems tailored to how your property operates — simple for your guests and effortless for you.",
    ],
    sections: [
      {
        kind: "flow",
        heading: "Your booking journey",
        steps: [
          "Guest visits your website",
          "Selects dates and room",
          "Completes reservation",
          "Pays securely online (optional)",
          "Reservation confirmed instantly",
          "You receive the booking immediately",
        ],
      },
      {
        kind: "paragraph",
        text: "Every booking engine is customized around your pricing, room types, availability, and reservation workflow.",
      },
      {
        kind: "highlight",
        lines: ["More direct bookings.", "Lower OTA commissions.", "A smoother guest experience."],
      },
    ],
  },
  {
    emoji: "💳",
    title: "Secure Online Payments",
    tagline: "Secure payments. Trusted technology. Complete peace of mind.",
    intro: [
      "Give your guests the confidence to reserve their stay online using secure payment providers trusted by hospitality businesses worldwide.",
      "We integrate your website with the payment solution that best fits your property and, when needed, connect it to a trusted Channel Manager. This creates one seamless booking experience for both you and your guests.",
    ],
    sections: [
      {
        kind: "flow",
        heading: "How it works",
        steps: [
          "A guest chooses a room and travel dates.",
          "They complete their reservation through your website.",
          "Payment is processed securely.",
          "The reservation is confirmed instantly.",
          "Your availability updates automatically.",
          "You receive the reservation via WhatsApp and email.",
        ],
      },
      {
        kind: "paragraph",
        text: "If your property is listed on Booking.com, Airbnb, Expedia, or other platforms, your Channel Manager keeps everything synchronized in real time.",
      },
      {
        kind: "list",
        heading: "That means",
        items: [
          "No double bookings",
          "No manual calendar updates",
          "No confusion",
          "One centralized reservation system",
        ],
      },
    ],
    closing:
      "Most importantly, your website becomes your own direct booking channel — reducing OTA commissions while offering guests a professional booking experience they can trust.",
  },
  {
    emoji: "🔍",
    title: "SEO & Google Visibility",
    tagline: "Help travelers discover your property",
    intro: [
      "Having a beautiful website is only the beginning.",
      "We optimize your website so travelers searching for accommodation in your destination can discover your property before your competitors.",
    ],
    sections: [
      {
        kind: "list",
        heading: "Our SEO includes",
        items: [
          "Fast loading performance",
          "Google-friendly structure",
          "Local SEO optimization",
          "Optimized images",
          "Hotel schema markup",
          "Mobile optimization",
          "Google Maps integration",
          "AI-assisted content optimization",
        ],
      },
    ],
    closing: "More visibility means more qualified visitors — and more opportunities for direct bookings.",
  },
  {
    emoji: "💬",
    title: "WhatsApp & Reservation Notifications",
    tagline: "Stay connected to every reservation",
    intro: [
      "Never miss a booking.",
      "Every reservation made through your website is automatically delivered to you through WhatsApp and email, keeping you informed wherever you are.",
    ],
    sections: [
      {
        kind: "list",
        heading: "Instant notifications include",
        items: [
          "Guest information",
          "Check-in & check-out dates",
          "Room booked",
          "Number of guests",
          "Payment confirmation",
          "Reservation reference",
        ],
      },
      {
        kind: "paragraph",
        text: "Whether you're at reception or away from the property, you'll always know when a new reservation arrives.",
      },
    ],
    closing: "Fast, reliable, and fully automated.",
  },
  {
    emoji: "🤖",
    title: "Guest Experience Automation",
    tagline: "Let AI handle the repetitive work",
    intro: [
      "Deliver exceptional hospitality while reducing the time spent on repetitive tasks.",
      "We integrate AI-powered automations that help you respond faster, streamline operations, and create a better guest experience.",
    ],
    sections: [
      {
        kind: "list",
        heading: "Automations can include",
        items: [
          "Instant guest replies",
          "Booking confirmations",
          "Frequently asked questions",
          "Follow-up messages",
          "Review requests",
          "Inquiry management",
          "Smart workflows",
        ],
      },
    ],
    closing:
      "Our goal isn't to replace your hospitality. It's to give you more time to focus on what matters most — your guests.",
  },
];

const serviceDetailsFr: ServiceDetail[] = [
  {
    emoji: "🏨",
    title: "Sites Hôtels & Riads",
    tagline: "Des sites de luxe à l'image de votre hospitalité",
    intro: [
      "Votre site doit faire plus que présenter votre établissement — il doit inspirer confiance et transformer les visiteurs en clients.",
      "Nous concevons des sites élégants et haut de gamme qui capturent l'atmosphère de votre hôtel, riad ou maison d'hôtes, tout en facilitant la réservation directe pour vos voyageurs.",
      "Derrière chaque projet, nous combinons technologies modernes, workflows IA et optimisation des performances pour créer des sites beaux, ultra-rapides et conçus pour convertir.",
    ],
    sections: [
      {
        kind: "list",
        heading: "Chaque site inclut",
        items: [
          "Design luxe sur mesure",
          "Expérience mobile-first",
          "Présentation professionnelle des chambres",
          "Pages ultra-rapides",
          "Intégration Google Maps",
          "Optimisation SEO",
          "Support multilingue",
          "Réservation directe intégrée",
        ],
      },
    ],
    closing: "Parce que votre site doit être aussi premium que l'expérience que vous offrez.",
  },
  {
    emoji: "📅",
    title: "Système de réservation directe",
    tagline: "Transformez les visiteurs en clients payants",
    intro: [
      "Réduisez votre dépendance aux plateformes en permettant à vos clients de réserver directement sur votre propre site.",
      "Nous concevons des systèmes de réservation adaptés au fonctionnement de votre établissement — simples pour vos clients, sans effort pour vous.",
    ],
    sections: [
      {
        kind: "flow",
        heading: "Le parcours de réservation",
        steps: [
          "Le client visite votre site",
          "Il choisit les dates et la chambre",
          "Il finalise sa réservation",
          "Il paie en ligne en toute sécurité (optionnel)",
          "Réservation confirmée instantanément",
          "Vous recevez la réservation immédiatement",
        ],
      },
      {
        kind: "paragraph",
        text: "Chaque moteur de réservation est personnalisé selon vos tarifs, types de chambres, disponibilités et flux de réservation.",
      },
      {
        kind: "highlight",
        lines: [
          "Plus de réservations directes.",
          "Moins de commissions OTA.",
          "Une expérience client plus fluide.",
        ],
      },
    ],
  },
  {
    emoji: "💳",
    title: "Paiements en ligne sécurisés",
    tagline: "Paiements sécurisés. Technologie de confiance. Sérénité totale.",
    intro: [
      "Offrez à vos clients la confiance nécessaire pour réserver en ligne, grâce à des prestataires de paiement reconnus dans l'hôtellerie mondiale.",
      "Nous intégrons à votre site la solution de paiement la plus adaptée à votre établissement et, si besoin, la connectons à un Channel Manager de confiance. Vous obtenez une expérience de réservation fluide, pour vous comme pour vos clients.",
    ],
    sections: [
      {
        kind: "flow",
        heading: "Comment ça marche",
        steps: [
          "Le client choisit une chambre et ses dates.",
          "Il finalise sa réservation via votre site.",
          "Le paiement est traité en toute sécurité.",
          "La réservation est confirmée instantanément.",
          "Vos disponibilités se mettent à jour automatiquement.",
          "Vous recevez la réservation par WhatsApp et email.",
        ],
      },
      {
        kind: "paragraph",
        text: "Si votre établissement est listé sur Booking.com, Airbnb, Expedia ou d'autres plateformes, votre Channel Manager synchronise tout en temps réel.",
      },
      {
        kind: "list",
        heading: "Cela signifie",
        items: [
          "Aucune double réservation",
          "Aucune mise à jour manuelle du calendrier",
          "Aucune confusion",
          "Un système de réservation centralisé",
        ],
      },
    ],
    closing:
      "Surtout, votre site devient votre propre canal de réservation directe — vous réduisez les commissions OTA tout en offrant une expérience de réservation professionnelle et rassurante.",
  },
  {
    emoji: "🔍",
    title: "SEO & visibilité Google",
    tagline: "Aidez les voyageurs à découvrir votre établissement",
    intro: [
      "Avoir un beau site n'est que le début.",
      "Nous optimisons votre site pour que les voyageurs qui cherchent un hébergement dans votre destination découvrent votre établissement avant vos concurrents.",
    ],
    sections: [
      {
        kind: "list",
        heading: "Notre SEO inclut",
        items: [
          "Performances de chargement rapides",
          "Structure adaptée à Google",
          "SEO local optimisé",
          "Images optimisées",
          "Balisage schema pour hôtels",
          "Optimisation mobile",
          "Intégration Google Maps",
          "Optimisation de contenu assistée par IA",
        ],
      },
    ],
    closing: "Plus de visibilité, plus de visiteurs qualifiés — et plus d'opportunités de réservations directes.",
  },
  {
    emoji: "💬",
    title: "Notifications WhatsApp & réservation",
    tagline: "Restez connecté à chaque réservation",
    intro: [
      "Ne manquez plus jamais une réservation.",
      "Chaque réservation faite sur votre site vous est automatiquement transmise par WhatsApp et email, où que vous soyez.",
    ],
    sections: [
      {
        kind: "list",
        heading: "Les notifications instantanées incluent",
        items: [
          "Informations du client",
          "Dates d'arrivée et de départ",
          "Chambre réservée",
          "Nombre de voyageurs",
          "Confirmation de paiement",
          "Référence de réservation",
        ],
      },
      {
        kind: "paragraph",
        text: "Que vous soyez à la réception ou en déplacement, vous saurez toujours qu'une nouvelle réservation est arrivée.",
      },
    ],
    closing: "Rapide, fiable et entièrement automatisé.",
  },
  {
    emoji: "🤖",
    title: "Automatisation de l'expérience client",
    tagline: "Laissez l'IA gérer les tâches répétitives",
    intro: [
      "Offrez une hospitalité exceptionnelle tout en réduisant le temps passé sur les tâches répétitives.",
      "Nous intégrons des automatisations pilotées par l'IA qui vous aident à répondre plus vite, à fluidifier vos opérations et à améliorer l'expérience client.",
    ],
    sections: [
      {
        kind: "list",
        heading: "Les automatisations possibles",
        items: [
          "Réponses instantanées aux clients",
          "Confirmations de réservation",
          "Questions fréquentes",
          "Messages de suivi",
          "Demandes d'avis",
          "Gestion des demandes",
          "Workflows intelligents",
        ],
      },
    ],
    closing:
      "L'objectif n'est pas de remplacer votre hospitalité, mais de vous donner plus de temps pour l'essentiel — vos clients.",
  },
];

export function getServiceDetails(lang: Lang): ServiceDetail[] {
  return lang === "fr" ? serviceDetailsFr : serviceDetailsEn;
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
