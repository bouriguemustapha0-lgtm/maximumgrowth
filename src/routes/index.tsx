import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";

import {
  ArrowRight,
  Sparkles,
  Rocket,
  Bot,
  Star,
  Zap,
  Smartphone,
  Search,
  Gauge,
  Palette,
  ExternalLink,
  Mail,
  Phone,
  MessageCircle,
  Instagram,
  Calendar,
  Menu,
  X,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Toaster } from "sonner";

import portrait from "@/assets/mustapha-main-portrait.png";
import heroBg from "@/assets/hero-bg.jpg";
import velsatisImg from "@/assets/project-velsatis.jpg";
import bougainvillaImg from "@/assets/project-bougainvilla.jpg";
import darazurImg from "@/assets/project-darazur.jpg";
import goldenImg from "@/assets/project-golden.jpg";
import redflameImg from "@/assets/project-redflame.jpg";
import mgLogo from "@/assets/mg-logo.png";
import karimAvatar from "@/assets/testimonial-karim.jpg";
import nadiaAvatar from "@/assets/testimonial-nadia.jpg";
import omarAvatar from "@/assets/testimonial-omar.jpg";

import { LanguageProvider, LangToggle, useT, getServiceDetails } from "@/lib/i18n";


export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Mustapha Bourigue — Hotel & Riad Website Designer" },
      { name: "description", content: "Websites for guesthouses, riads and boutique hotels. Direct booking, secure payments, SEO and WhatsApp integration — more direct bookings, less commission." },
      { property: "og:title", content: "Websites That Bring Hotels More Direct Bookings" },
      { property: "og:description", content: "Modern hospitality websites with direct booking, secure payments, SEO and WhatsApp integration." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

/* ---------- Animated counter ---------- */
function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const [v, setV] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        const dur = 1500;
        const start = performance.now();
        const step = (t: number) => {
          const p = Math.min(1, (t - start) / dur);
          setV(Math.floor(p * to));
          if (p < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
        io.disconnect();
      }
    }, { threshold: 0.4 });
    io.observe(el);
    return () => io.disconnect();
  }, [to]);
  return <span ref={ref}>{v}{suffix}</span>;
}

/* ---------- Reveal on scroll ---------- */
function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setShown(true); io.disconnect(); }
    }, { threshold: 0.15 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ease-out ${shown ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"} ${className}`}
    >
      {children}
    </div>
  );
}

/* ---------- Nav ---------- */
function Nav() {
  const { t } = useT();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 20);
    h();
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);
  useEffect(() => {
    if (mobileOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);
  const links = [
    { href: "#about", label: t("nav.about") },
    { href: "#services", label: t("nav.services") },
    { href: "#work", label: t("nav.work") },
    { href: "#process", label: t("nav.process") },
    { href: "#contact", label: t("nav.contact") },
  ];
  return (
    <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${scrolled || mobileOpen ? "backdrop-blur-xl bg-background/80 border-b border-border" : ""}`}>
      <nav className="mx-auto max-w-7xl px-6 h-16 flex items-center justify-between">
        <a href="#top" className="flex items-center gap-2.5">
          <img src={mgLogo} alt="MG — Mustapha Bourigue" width={40} height={28} className="h-7 w-auto" />
          <span className="font-display font-bold text-base sm:text-lg hidden sm:inline tracking-tight">MAXIMUM <span className="text-primary">GROWTH</span></span>
        </a>
        <ul className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
          {links.map(l => (
            <li key={l.href}>
              <a href={l.href} className="hover:text-foreground transition-colors">{l.label}</a>
            </li>
          ))}
        </ul>
        <div className="hidden md:flex items-center gap-3">
          <LangToggle />
          <a href="#contact">
            <Button variant="hero" size="sm">
              {t("nav.book")} <ArrowRight />
            </Button>
          </a>
        </div>
        <div className="md:hidden flex items-center gap-2">
          <LangToggle />
          <button
            className="inline-flex items-center justify-center w-10 h-10 rounded-xl glass text-foreground"
            onClick={() => setMobileOpen(o => !o)}
            aria-label={mobileOpen ? t("nav.closeMenu") : t("nav.openMenu")}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-x-0 top-16 bottom-0 bg-background/95 backdrop-blur-xl border-t border-border">
          <div className="mx-auto max-w-7xl px-6 py-8">
            <div className="flex flex-col rounded-2xl bg-card border border-border p-2 text-lg font-medium shadow-lg">
              <ul className="flex flex-col">
                {links.map(l => (
                  <li key={l.href}>
                    <a
                      href={l.href}
                      onClick={() => setMobileOpen(false)}
                      className="block rounded-xl px-4 py-3.5 text-muted-foreground hover:bg-primary/10 hover:text-foreground transition-colors"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
              <div className="p-2">
                <a href="#contact" onClick={() => setMobileOpen(false)}>
                  <Button variant="hero" size="lg" className="w-full">
                    {t("nav.bookFree")} <ArrowRight />
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

/* ---------- Hero ---------- */
function Hero() {
  const { t } = useT();
  return (
    <section id="top" className="relative min-h-screen flex items-center pt-24 overflow-hidden">
      <img
        src={heroBg}
        alt=""
        aria-hidden
        className="absolute inset-0 w-full h-full object-cover opacity-40"
        width={1920}
        height={1280}
      />
      <div className="absolute inset-0 bg-grid opacity-40" />
      <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/40 to-background" />
      <div className="absolute inset-0" style={{ background: "var(--gradient-radial)" }} />

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {[...Array(12)].map((_, i) => (
          <span
            key={i}
            className="absolute block w-1 h-1 rounded-full bg-primary/60 animate-float"
            style={{
              top: `${(i * 53) % 100}%`,
              left: `${(i * 37) % 100}%`,
              animationDelay: `${i * 0.6}s`,
              animationDuration: `${6 + (i % 5)}s`,
            }}
          />
        ))}
      </div>

      <div className="relative mx-auto max-w-7xl px-6 grid lg:grid-cols-12 gap-10 items-center">
        <div className="lg:col-span-7">
          <Reveal>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass text-xs font-medium text-muted-foreground mb-6">
              <span className="relative flex h-2 w-2">
                <span className="absolute inset-0 rounded-full bg-primary animate-pulse-glow" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
              </span>
              {t("hero.badge")}
            </div>
          </Reveal>
          <Reveal delay={100}>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight">
              {t("hero.title1")}{" "}
              <span className="text-gradient">{t("hero.title2")}</span>
            </h1>
          </Reveal>
          <Reveal delay={200}>
            <p className="mt-6 max-w-xl text-lg text-muted-foreground leading-relaxed">
              {t("hero.subtitle")}
            </p>
          </Reveal>
          <Reveal delay={300}>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#contact"><Button variant="hero" size="lg">{t("hero.ctaPrimary")} <ArrowRight /></Button></a>
              <a href="#work"><Button variant="heroOutline" size="lg">{t("hero.ctaSecondary")}</Button></a>
            </div>
          </Reveal>
          <Reveal delay={400}>
            <div className="mt-10 flex items-center gap-6 text-sm text-muted-foreground">
              <div className="flex -space-x-2">
                {[1,2,3,4].map(i => (
                  <span key={i} className="w-8 h-8 rounded-full bg-[image:var(--gradient-primary)] border-2 border-background grid place-items-center text-[10px] font-bold text-primary-foreground">
                    {String.fromCharCode(64 + i)}
                  </span>
                ))}
              </div>
              <div>
                <div className="flex items-center gap-0.5 text-primary">
                  {[...Array(5)].map((_,i)=><Star key={i} className="w-3.5 h-3.5 fill-current" />)}
                </div>
                <div className="text-xs">{t("hero.trusted")}</div>
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal delay={200} className="lg:col-span-5">
          <div className="relative">
            <div className="absolute -inset-6 bg-[image:var(--gradient-primary)] opacity-30 blur-3xl rounded-full" />
            <div className="relative rounded-2xl overflow-hidden glass glow-red">
              <img src={portrait} alt="Mustapha Bourigue" className="w-full h-auto object-contain" width={896} height={896} />
              <div className="absolute inset-x-0 bottom-0 p-5 bg-gradient-to-t from-background to-transparent">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm text-muted-foreground">Mustapha Bourigue</div>
                    <div className="font-display font-semibold">{t("hero.role")}</div>
                  </div>
                  <span className="px-2.5 py-1 rounded-md text-[10px] font-semibold bg-primary/15 text-primary border border-primary/30">
                    {t("hero.country")}
                  </span>
                </div>
              </div>
            </div>
            <div className="absolute -left-6 top-10 glass rounded-xl px-4 py-3 animate-float hidden sm:flex items-center gap-3">
              <Zap className="w-4 h-4 text-primary" />
              <div className="text-xs"><div className="font-semibold">98 / 100</div><div className="text-muted-foreground">{t("hero.lighthouse")}</div></div>
            </div>
            <div className="absolute -right-4 bottom-20 glass rounded-xl px-4 py-3 animate-float hidden sm:flex items-center gap-3" style={{ animationDelay: "1s" }}>
              <Bot className="w-4 h-4 text-primary" />
              <div className="text-xs"><div className="font-semibold">{t("hero.aiEnhanced")}</div><div className="text-muted-foreground">{t("hero.workflows")}</div></div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- Marquee logos ---------- */
function Marquee() {
  const items = ["React", "Next.js", "Tailwind CSS", "TypeScript", "Framer Motion", "AI Workflows", "Premiere Pro", "Figma", "Vercel"];
  return (
    <section className="border-y border-border bg-background/50 py-6 overflow-hidden">
      <div className="flex gap-12 animate-marquee whitespace-nowrap">
        {[...items, ...items].map((it, i) => (
          <span key={i} className="text-muted-foreground text-sm font-medium tracking-widest uppercase">
            {it} <span className="text-primary ml-12">●</span>
          </span>
        ))}
      </div>
    </section>
  );
}

/* ---------- About ---------- */
function About() {
  const { t } = useT();
  return (
    <section id="about" className="relative py-32">
      <div className="mx-auto max-w-7xl px-6 grid lg:grid-cols-12 gap-12 items-center">
        <Reveal className="lg:col-span-5">
          <div className="relative">
            <div className="absolute -inset-4 bg-primary/20 blur-3xl rounded-3xl" />
            <div className="relative rounded-2xl overflow-hidden glass">
              <img src={portrait} alt="Mustapha portrait" loading="lazy" width={896} height={1152} className="w-full aspect-square object-cover" />
            </div>
            <div className="absolute -bottom-6 -right-6 glass rounded-xl p-4 max-w-[200px]">
              <div className="text-3xl font-bold text-gradient">3+</div>
              <div className="text-xs text-muted-foreground">{t("about.years")}</div>
            </div>
          </div>
        </Reveal>
        <div className="lg:col-span-7 space-y-6">
          <Reveal>
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-primary font-semibold">
              <Sparkles className="w-3.5 h-3.5" /> {t("about.eyebrow")}
            </div>
          </Reveal>
          <Reveal delay={100}>
            <h2 className="text-4xl sm:text-5xl font-bold leading-tight">
              {t("about.title1")} <span className="text-gradient">{t("about.title2")}</span>.
            </h2>
          </Reveal>
          <Reveal delay={200}>
            <p className="text-lg text-muted-foreground leading-relaxed">{t("about.p1")}</p>
          </Reveal>
          <Reveal delay={250}>
            <p className="text-lg text-muted-foreground leading-relaxed">{t("about.p2")}</p>
          </Reveal>
          <Reveal delay={300}>
            <ul className="grid sm:grid-cols-2 gap-4 pt-2">
              {[
                { icon: Calendar, t: t("about.f1.t"), d: t("about.f1.d") },
                { icon: Gauge, t: t("about.f2.t"), d: t("about.f2.d") },
                { icon: Search, t: t("about.f3.t"), d: t("about.f3.d") },
                { icon: MessageCircle, t: t("about.f4.t"), d: t("about.f4.d") },
              ].map(({ icon: I, t: ft, d }) => (
                <li key={ft} className="flex gap-3 p-4 rounded-xl glass">
                  <div className="grid place-items-center w-10 h-10 rounded-lg bg-primary/15 text-primary shrink-0">
                    <I className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-semibold">{ft}</div>
                    <div className="text-sm text-muted-foreground">{d}</div>
                  </div>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ---------- Services ---------- */
function Services() {
  const { t, lang } = useT();
  const details = getServiceDetails(lang);
  const services = [
    { icon: Palette, t: t("services.s1.t"), d: t("services.s1.d") },
    { icon: Calendar, t: t("services.s2.t"), d: t("services.s2.d") },
    { icon: Rocket, t: t("services.s3.t"), d: t("services.s3.d") },
    { icon: Search, t: t("services.s4.t"), d: t("services.s4.d") },
    { icon: MessageCircle, t: t("services.s5.t"), d: t("services.s5.d") },
    { icon: Bot, t: t("services.s6.t"), d: t("services.s6.d") },
  ];
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const active = openIdx != null ? details[openIdx] : null;

  return (
    <section id="services" className="relative py-32 bg-card/30">
      <div className="absolute inset-0 bg-grid opacity-20" />
      <div className="relative mx-auto max-w-7xl px-6">
        <div className="max-w-2xl mb-16">
          <Reveal>
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-primary font-semibold mb-4">
              <Sparkles className="w-3.5 h-3.5" /> {t("services.eyebrow")}
            </div>
          </Reveal>
          <Reveal delay={100}>
            <h2 className="text-4xl sm:text-5xl font-bold leading-tight">
              {t("services.title1")} <span className="text-gradient">{t("services.title2")}</span>.
            </h2>
          </Reveal>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((s, i) => (
            <Reveal key={s.t} delay={i * 100}>
              <button
                type="button"
                onClick={() => setOpenIdx(i)}
                className="group relative h-full w-full text-left rounded-2xl glass p-6 transition-all duration-500 hover:-translate-y-2 hover:border-primary/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
              >
                <div className="absolute inset-0 rounded-2xl bg-[image:var(--gradient-primary)] opacity-0 group-hover:opacity-10 transition-opacity" />
                <div className="relative">
                  <div className="grid place-items-center w-12 h-12 rounded-xl bg-primary/15 text-primary mb-5 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <s.icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-display font-semibold text-xl mb-2">{s.t}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{s.d}</p>
                  <div className="mt-6 inline-flex items-center text-sm text-primary font-medium">
                    {t("services.viewDetails")} <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      <Dialog open={openIdx != null} onOpenChange={(o) => !o && setOpenIdx(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-card border-border">
          {active && (
            <>
              <DialogHeader className="text-left space-y-3">
                <div className="text-4xl leading-none">{active.emoji}</div>
                <DialogTitle className="text-2xl sm:text-3xl font-display font-bold leading-tight">
                  {active.title}
                </DialogTitle>
                <DialogDescription className="text-primary font-medium text-base">
                  {active.tagline}
                </DialogDescription>
              </DialogHeader>

              <div className="mt-4 space-y-6">
                {active.intro.map((p, i) => (
                  <p key={i} className="text-muted-foreground leading-relaxed">{p}</p>
                ))}

                {active.sections.map((sec, i) => {
                  if (sec.kind === "list") {
                    return (
                      <div key={i}>
                        <h4 className="font-display font-semibold text-foreground mb-3">{sec.heading}</h4>
                        <ul className="grid sm:grid-cols-2 gap-2">
                          {sec.items.map((it) => (
                            <li key={it} className="flex items-start gap-2 text-sm text-muted-foreground">
                              <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                              <span>{it}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    );
                  }
                  if (sec.kind === "flow") {
                    return (
                      <div key={i}>
                        <h4 className="font-display font-semibold text-foreground mb-3">{sec.heading}</h4>
                        <ol className="space-y-2">
                          {sec.steps.map((step, k) => (
                            <li key={k} className="flex items-start gap-3 rounded-xl border border-border/60 bg-background/40 p-3">
                              <span className="grid place-items-center w-7 h-7 rounded-full bg-primary/15 text-primary text-xs font-bold shrink-0">
                                {k + 1}
                              </span>
                              <span className="text-sm text-foreground/90">{step}</span>
                            </li>
                          ))}
                        </ol>
                      </div>
                    );
                  }
                  if (sec.kind === "paragraph") {
                    return (
                      <p key={i} className="text-muted-foreground leading-relaxed">{sec.text}</p>
                    );
                  }
                  return (
                    <div key={i} className="rounded-xl border border-primary/40 bg-primary/10 p-4 space-y-1">
                      {sec.lines.map((line, k) => (
                        <div key={k} className="font-display font-semibold text-foreground">{line}</div>
                      ))}
                    </div>
                  );
                })}

                {active.closing && (
                  <p className="text-foreground font-medium leading-relaxed italic">{active.closing}</p>
                )}

                <div className="pt-2">
                  <a href="#contact" onClick={() => setOpenIdx(null)}>
                    <Button variant="hero" size="lg" className="w-full sm:w-auto">
                      {t("services.bookCta")} <ArrowRight />
                    </Button>
                  </a>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}

/* ---------- Portfolio ---------- */
function Portfolio() {
  const { t } = useT();
  const projects = [
    { img: velsatisImg, title: "Velsatis Hotel", desc: t("work.p1.d"), tags: ["Hospitality", "Hotel"], demoUrl: "https://www.velsatishotel.com/" },
    { img: bougainvillaImg, title: "Bougainvilla Retreat", desc: t("work.p2.d"), tags: ["Hospitality", "Booking"], demoUrl: "https://www.bougainvillaretreat.com/" },
    { img: darazurImg, title: "Dar Azur", desc: t("work.p3.d"), tags: ["Hospitality", "Tailwind"], demoUrl: "https://darazur.lovable.app" },
    { img: goldenImg, title: "Maison Aurelle", desc: t("work.p4.d"), tags: ["Hospitality", "React"], demoUrl: "https://golden-suite-showcase.lovable.app" },
    { img: redflameImg, title: "Red Flame", desc: t("work.p5.d"), tags: ["Restaurant", "AI"], demoUrl: "https://redflame.lovable.app" },
  ];
  const filters = [
    { key: "All", label: t("work.filter.all") },
    { key: "Hospitality", label: t("work.filter.hospitality") },
    { key: "Restaurant", label: t("work.filter.restaurant") },
  ];
  const [active, setActive] = useState("All");
  const filtered = active === "All" ? projects : projects.filter(p => p.tags.includes(active));

  return (
    <section id="work" className="relative py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12">
          <div>
            <Reveal>
              <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-primary font-semibold mb-4">
                <Sparkles className="w-3.5 h-3.5" /> {t("work.eyebrow")}
              </div>
            </Reveal>
            <Reveal delay={100}>
              <h2 className="text-4xl sm:text-5xl font-bold leading-tight">
                {t("work.title1")} <span className="text-gradient">{t("work.title2")}</span>.
              </h2>
            </Reveal>
          </div>
          <Reveal delay={200}>
            <div className="flex gap-2 flex-wrap">
              {filters.map(f => (
                <button
                  key={f.key}
                  onClick={() => setActive(f.key)}
                  className={`px-4 py-2 rounded-full text-sm border transition-all ${active === f.key ? "bg-primary text-primary-foreground border-primary" : "border-border text-muted-foreground hover:text-foreground hover:border-primary/50"}`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </Reveal>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6">
          {filtered.map((p, i) => (
            <Reveal key={p.title} delay={i * 80}>
              <article className="group relative rounded-2xl overflow-hidden glass hover:border-primary/40 transition-all duration-500">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img src={p.img} alt={p.title} loading="lazy" width={1280} height={896} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent opacity-90" />
                  <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-colors" />
                </div>
                <div className="p-6 -mt-16 relative">
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {p.tags.map(tag => <span key={tag} className="text-[10px] uppercase tracking-wider px-2 py-1 rounded-md bg-primary/15 text-primary border border-primary/30 font-semibold">{tag}</span>)}
                  </div>
                  <h3 className="font-display font-semibold text-xl">{p.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{p.desc}</p>
                  <div className="mt-5 flex gap-2">
                    <a href={p.demoUrl} target="_blank" rel="noopener noreferrer" className="inline-flex">
                      <Button variant="hero" size="sm">{t("work.demo")} <ExternalLink /></Button>
                    </a>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Why Choose Me ---------- */
function Stats() {
  const { t } = useT();
  const reasons = [
    { icon: Calendar, t: t("why.r1.t"), d: t("why.r1.d") },
    { icon: Rocket, t: t("why.r2.t"), d: t("why.r2.d") },
    { icon: Smartphone, t: t("why.r3.t"), d: t("why.r3.d") },
    { icon: Search, t: t("why.r4.t"), d: t("why.r4.d") },
    { icon: MessageCircle, t: t("why.r5.t"), d: t("why.r5.d") },
    { icon: Bot, t: t("why.r6.t"), d: t("why.r6.d") },
  ];
  return (
    <section className="relative py-32 bg-card/30 overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent" />
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-primary font-semibold mb-4">
              <Sparkles className="w-3.5 h-3.5" /> {t("why.eyebrow")}
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold">{t("why.title1")} <span className="text-gradient">{t("why.title2")}</span>.</h2>
          </div>
        </Reveal>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {reasons.map((r, i) => (
            <Reveal key={r.t} delay={i * 80}>
              <div className="glass rounded-2xl p-6 hover:border-primary/40 transition-all hover:-translate-y-1 h-full">
                <div className="grid place-items-center w-11 h-11 rounded-xl bg-primary/15 text-primary mb-4">
                  <r.icon className="w-5 h-5" />
                </div>
                <h3 className="font-display font-semibold text-lg mb-1.5">{r.t}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{r.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Testimonials ---------- */
function Testimonials() {
  const { t } = useT();
  const items = [
    { name: "Karim Idrissi", role: t("test.t1.role"), quote: t("test.t1.q"), img: karimAvatar },
    { name: "Nadia Benali", role: t("test.t2.role"), quote: t("test.t2.q"), img: nadiaAvatar },
    { name: "Omar Tazi", role: t("test.t3.role"), quote: t("test.t3.q"), img: omarAvatar },
  ];
  return (
    <section className="relative py-32">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-primary font-semibold mb-4">
              <Sparkles className="w-3.5 h-3.5" /> {t("test.eyebrow")}
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold">{t("test.title1")} <span className="text-gradient">{t("test.title2")}</span>.</h2>
          </div>
        </Reveal>
        <div className="grid md:grid-cols-3 gap-6">
          {items.map((it, i) => (
            <Reveal key={it.name} delay={i * 120}>
              <figure className="glass rounded-2xl p-7 h-full flex flex-col">
                <div className="flex gap-0.5 text-primary mb-4">
                  {[...Array(5)].map((_,k)=><Star key={k} className="w-4 h-4 fill-current" />)}
                </div>
                <blockquote className="text-foreground leading-relaxed flex-1">"{it.quote}"</blockquote>
                <figcaption className="mt-6 flex items-center gap-3 pt-6 border-t border-border">
                  <img
                    src={it.img}
                    alt={it.name}
                    loading="lazy"
                    width={44}
                    height={44}
                    className="w-11 h-11 rounded-full object-cover border border-border"
                  />
                  <div>
                    <div className="font-semibold text-sm">{it.name}</div>
                    <div className="text-xs text-muted-foreground">{it.role}</div>
                  </div>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Process ---------- */
function Process() {
  const { t } = useT();
  const steps = [
    { n: "01", t: t("process.s1.t"), d: t("process.s1.d") },
    { n: "02", t: t("process.s2.t"), d: t("process.s2.d") },
    { n: "03", t: t("process.s3.t"), d: t("process.s3.d") },
    { n: "04", t: t("process.s4.t"), d: t("process.s4.d") },
  ];
  return (
    <section id="process" className="relative py-32 bg-card/30">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <div className="text-center max-w-2xl mx-auto mb-20">
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-primary font-semibold mb-4">
              <Sparkles className="w-3.5 h-3.5" /> {t("process.eyebrow")}
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold">{t("process.title1")} <span className="text-gradient">{t("process.title2")}</span>.</h2>
          </div>
        </Reveal>
        <div className="relative grid md:grid-cols-4 gap-6">
          <div className="hidden md:block absolute top-12 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-primary/10 via-primary/60 to-primary/10" />
          {steps.map((s, i) => (
            <Reveal key={s.n} delay={i * 120}>
              <div className="relative glass rounded-2xl p-6 text-center hover:border-primary/40 transition-all">
                <div className="mx-auto w-24 h-24 rounded-full bg-background border border-primary/40 grid place-items-center mb-5 relative">
                  <div className="absolute inset-1 rounded-full bg-[image:var(--gradient-primary)] opacity-20" />
                  <span className="relative font-display text-2xl font-bold text-gradient">{s.n}</span>
                </div>
                <h3 className="font-display font-semibold text-lg">{s.t}</h3>
                <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{s.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Contact ---------- */
function Contact() {
  const { t } = useT();
  return (
    <section id="contact" className="relative py-24 sm:py-32 overflow-hidden scroll-mt-20">
      <div className="absolute inset-0" style={{ background: "var(--gradient-radial)" }} />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/20 to-transparent pointer-events-none" />
      <div className="relative mx-auto max-w-6xl px-6">
        <div className="text-center space-y-5 mb-12">
          <Reveal>
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-primary font-semibold">
              <Sparkles className="w-3.5 h-3.5" /> {t("contact.eyebrow")}
            </div>
          </Reveal>
          <Reveal delay={100}>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
              {t("contact.title1")} <span className="text-gradient">{t("contact.title2")}</span>.
            </h2>
          </Reveal>
          <Reveal delay={150}>
            <p className="text-muted-foreground max-w-2xl mx-auto text-base sm:text-lg">
              {t("contact.subtitle")}
            </p>
          </Reveal>
        </div>

        <Reveal delay={200}>
          <div className="group relative block overflow-hidden rounded-3xl border border-primary/50 bg-gradient-to-br from-primary/25 via-primary/10 to-transparent backdrop-blur-xl p-6 sm:p-8 hover:border-primary transition-all shadow-xl shadow-primary/10 hover:shadow-primary/30">
            <div className="absolute -right-10 -top-10 w-56 h-56 rounded-full bg-primary/20 blur-3xl group-hover:bg-primary/30 transition-colors" />
            <div className="relative flex flex-col sm:flex-row items-start sm:items-center gap-5 sm:gap-6">
              <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-primary text-primary-foreground shrink-0 shadow-lg shadow-primary/40">
                <Phone className="w-7 h-7" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-primary/20 text-primary text-[10px] font-bold uppercase tracking-widest mb-2">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inset-0 rounded-full bg-primary animate-pulse-glow" />
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-primary" />
                  </span>
                  {t("contact.fastest")}
                </div>
                <div className="text-2xl sm:text-3xl font-bold text-foreground leading-tight">
                  {t("contact.bookFree")}
                </div>
                <div className="text-sm sm:text-base text-muted-foreground mt-1">
                  {t("contact.bookDesc")}
                </div>
                <div className="mt-3 flex flex-wrap items-center gap-3">
                  <a
                    href="https://wa.me/212699309986?text=Hi%20Mustapha%2C%20I'd%20like%20to%20talk%20about%20a%20website%20for%20my%20hotel%2Friad."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-4 py-2 text-sm font-semibold shadow-lg shadow-primary/30 hover:bg-primary/90 transition-colors"
                  >
                    <MessageCircle className="w-4 h-4" />
                    {t("contact.whatsapp")}
                  </a>
                  <a
                    href="tel:+212699309986"
                    className="inline-flex items-center gap-2 rounded-full border border-primary/50 text-primary px-4 py-2 text-sm font-semibold hover:bg-primary/10 transition-colors"
                  >
                    <Phone className="w-4 h-4" />
                    {t("contact.call")}
                  </a>
                </div>
              </div>
              <div className="hidden sm:flex items-center justify-center w-12 h-12 rounded-full bg-primary text-primary-foreground shrink-0 group-hover:translate-x-1 transition-transform shadow-lg shadow-primary/40">
                <ArrowRight className="w-5 h-5" />
              </div>
            </div>
          </div>
        </Reveal>

        <div className="mt-4 grid sm:grid-cols-2 gap-4">
          <Reveal delay={250}>
            <a
              href="https://www.instagram.com/mustapha_bourigue_mg?igsh=MWV2ZWlsMHZkMDF1cg=="
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex items-center gap-4 overflow-hidden rounded-2xl p-5 border border-border bg-card/40 backdrop-blur-xl hover:border-primary/60 transition-all h-full"
            >
              <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-primary/10 text-primary shrink-0">
                <Instagram className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-foreground">{t("contact.ig.t")}</div>
                <div className="text-sm text-muted-foreground">{t("contact.ig.d")}</div>
              </div>
              <ArrowRight className="w-4 h-4 text-muted-foreground opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
            </a>
          </Reveal>
          <Reveal delay={300}>
            <a
              href="mailto:bouriguemustapha0@gmail.com?subject=Project%20Inquiry"
              className="group relative flex items-center gap-4 overflow-hidden rounded-2xl p-5 border border-border bg-card/40 backdrop-blur-xl hover:border-primary/60 transition-all h-full"
            >
              <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-primary/10 text-primary shrink-0">
                <Mail className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-foreground">{t("contact.email.t")}</div>
                <div className="text-sm text-muted-foreground truncate">{t("contact.email.d")}</div>
              </div>
              <ArrowRight className="w-4 h-4 text-muted-foreground opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
            </a>
          </Reveal>
        </div>

        <Reveal delay={350}>
          <div className="mt-8">
            <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground/70 mb-4 text-center">
              {t("contact.additional")}
            </h3>
            <div className="flex flex-wrap justify-center gap-x-5 gap-y-2 text-sm text-muted-foreground">
              <a
                href="mailto:bouriguemustapha0@gmail.com"
                className="hover:text-primary transition-colors"
                aria-label="Email"
              >
                bouriguemustapha0@gmail.com
              </a>
              <span className="hidden sm:inline text-border">·</span>
              <span>maximumgrowth.AI</span>
              <span className="hidden sm:inline text-border">·</span>
              <a
                href="https://www.linkedin.com/in/mustapha-bourigue"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors"
              >
                LinkedIn
              </a>
              <span className="hidden sm:inline text-border">·</span>
              <span>Morocco</span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- Footer ---------- */
function Footer() {
  const { t } = useT();
  return (
    <footer className="border-t border-border py-10">
      <div className="mx-auto max-w-7xl px-6 flex flex-col sm:flex-row gap-4 items-center justify-between text-sm text-muted-foreground">
        <div className="flex items-center gap-2.5 font-display font-semibold text-foreground">
          <img src={mgLogo} alt="MG logo" width={36} height={26} className="h-6 w-auto" />
          MAXIMUM <span className="text-primary">GROWTH</span>
        </div>
        <div>© {new Date().getFullYear()} Mustapha Bourigue. {t("footer.rights")}</div>
        <div className="flex gap-4">
          <a href="#about" className="hover:text-foreground transition-colors">{t("nav.about")}</a>
          <a href="#work" className="hover:text-foreground transition-colors">{t("nav.work")}</a>
          <a href="#contact" className="hover:text-foreground transition-colors">{t("nav.contact")}</a>
        </div>
      </div>
    </footer>
  );
}

function Index() {
  return (
    <LanguageProvider>
      <main className="dark relative min-h-screen bg-background text-foreground">
        <Toaster theme="dark" position="top-right" richColors />
        <Nav />
        <Hero />
        <Marquee />
        <About />
        <Services />
        <Portfolio />
        <Stats />
        <Testimonials />
        <Process />
        <Contact />
        <Footer />
      </main>
    </LanguageProvider>
  );
}
