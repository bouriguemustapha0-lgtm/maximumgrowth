import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { z } from "zod";
import {
  ArrowRight,
  Sparkles,
  Code2,
  Rocket,
  Bot,
  Users,
  Video,
  GraduationCap,
  Briefcase,
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Globe,
  Check,
  Star,
  Zap,
  Smartphone,
  Search,
  Gauge,
  Palette,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast, Toaster } from "sonner";

import portraitAsset from "@/assets/mustapha-portrait.jpg.asset.json";
import heroBg from "@/assets/hero-bg.jpg";
import p1 from "@/assets/project-1.jpg";
import p2 from "@/assets/project-2.jpg";
import p3 from "@/assets/project-3.jpg";
import p4 from "@/assets/project-4.jpg";
import p5 from "@/assets/project-5.jpg";
import p6 from "@/assets/project-6.jpg";
import mgLogo from "@/assets/mg-logo.png.asset.json";

const portrait = portraitAsset.url;

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Mustapha Bourigue — AI Web Developer & Portfolio Specialist" },
      { name: "description", content: "Premium AI-powered portfolio websites for students, freelancers, creators & professionals. Modern design, fast delivery, conversion-focused." },
      { property: "og:title", content: "Mustapha Bourigue — AI Web Developer" },
      { property: "og:description", content: "AI-Powered Portfolio Websites That Make You Stand Out." },
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
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 20);
    h();
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);
  const links = [
    { href: "#about", label: "About" },
    { href: "#services", label: "Services" },
    { href: "#work", label: "Work" },
    { href: "#process", label: "Process" },
    { href: "#contact", label: "Contact" },
  ];
  return (
    <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${scrolled ? "backdrop-blur-xl bg-background/70 border-b border-border" : ""}`}>
      <nav className="mx-auto max-w-7xl px-6 h-16 flex items-center justify-between">
        <a href="#top" className="flex items-center gap-2.5">
          <img src={mgLogo.url} alt="MG — Mustapha Bourigue" width={40} height={28} className="h-7 w-auto" />
          <span className="font-display font-bold text-base sm:text-lg hidden sm:inline tracking-tight">MAXIMUM <span className="text-primary">GROWTH</span></span>
        </a>
        <ul className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
          {links.map(l => (
            <li key={l.href}>
              <a href={l.href} className="hover:text-foreground transition-colors">{l.label}</a>
            </li>
          ))}
        </ul>
        <a href="#contact">
          <Button variant="hero" size="sm" className="hidden md:inline-flex">
            Book a Call <ArrowRight />
          </Button>
        </a>
      </nav>
    </header>
  );
}

/* ---------- Hero ---------- */
function Hero() {
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

      {/* floating particles */}
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
              Available for new projects · Q2 2026
            </div>
          </Reveal>
          <Reveal delay={100}>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight">
              AI-Powered Portfolio<br />
              Websites That Make You{" "}
              <span className="text-gradient">Stand Out</span>
            </h1>
          </Reveal>
          <Reveal delay={200}>
            <p className="mt-6 max-w-xl text-lg text-muted-foreground leading-relaxed">
              I help students, freelancers, and creators build modern portfolio websites that attract opportunities, clients, and career growth.
            </p>
          </Reveal>
          <Reveal delay={300}>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#contact"><Button variant="hero" size="lg">Book a Free Consultation <ArrowRight /></Button></a>
              <a href="#work"><Button variant="heroOutline" size="lg">View My Work</Button></a>
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
                <div className="text-xs">Trusted by creators worldwide</div>
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal delay={200} className="lg:col-span-5">
          <div className="relative">
            <div className="absolute -inset-6 bg-[image:var(--gradient-primary)] opacity-30 blur-3xl rounded-full" />
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden glass glow-red">
              <img src={portrait} alt="Mustapha Bourigue" className="w-full h-full object-cover" width={896} height={1152} />
              <div className="absolute inset-x-0 bottom-0 p-5 bg-gradient-to-t from-background to-transparent">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm text-muted-foreground">Mustapha Bourigue</div>
                    <div className="font-display font-semibold">AI Web Developer</div>
                  </div>
                  <span className="px-2.5 py-1 rounded-md text-[10px] font-semibold bg-primary/15 text-primary border border-primary/30">
                    MOROCCO
                  </span>
                </div>
              </div>
            </div>
            {/* floating UI cards */}
            <div className="absolute -left-6 top-10 glass rounded-xl px-4 py-3 animate-float hidden sm:flex items-center gap-3">
              <Zap className="w-4 h-4 text-primary" />
              <div className="text-xs"><div className="font-semibold">98 / 100</div><div className="text-muted-foreground">Lighthouse</div></div>
            </div>
            <div className="absolute -right-4 bottom-20 glass rounded-xl px-4 py-3 animate-float hidden sm:flex items-center gap-3" style={{ animationDelay: "1s" }}>
              <Bot className="w-4 h-4 text-primary" />
              <div className="text-xs"><div className="font-semibold">AI Enhanced</div><div className="text-muted-foreground">Workflows</div></div>
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
              <div className="text-xs text-muted-foreground">Years building digital experiences</div>
            </div>
          </div>
        </Reveal>
        <div className="lg:col-span-7 space-y-6">
          <Reveal>
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-primary font-semibold">
              <Sparkles className="w-3.5 h-3.5" /> About Me
            </div>
          </Reveal>
          <Reveal delay={100}>
            <h2 className="text-4xl sm:text-5xl font-bold leading-tight">
              Crafting portfolios that <span className="text-gradient">open doors</span>.
            </h2>
          </Reveal>
          <Reveal delay={200}>
            <p className="text-lg text-muted-foreground leading-relaxed">
              I'm Mustapha Bourigue, an AI Web Developer passionate about helping people build a strong online presence through beautiful and high-performing portfolio websites.
            </p>
          </Reveal>
          <Reveal delay={300}>
            <ul className="grid sm:grid-cols-2 gap-4 pt-2">
              {[
                { icon: Rocket, t: "Fast Delivery", d: "Launch in days, not months." },
                { icon: Code2, t: "Modern Stack", d: "React, Next.js, Tailwind CSS." },
                { icon: Bot, t: "AI-Powered", d: "Smarter workflows, better results." },
                { icon: Users, t: "User-Focused", d: "Designed to convert visitors." },
              ].map(({ icon: I, t, d }) => (
                <li key={t} className="flex gap-3 p-4 rounded-xl glass">
                  <div className="grid place-items-center w-10 h-10 rounded-lg bg-primary/15 text-primary shrink-0">
                    <I className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-semibold">{t}</div>
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
  const services = [
    { icon: GraduationCap, t: "Student Portfolios", d: "Professional websites for internships and university applications." },
    { icon: Briefcase, t: "Freelancer Websites", d: "Convert visitors into paying clients with high-converting design." },
    { icon: Video, t: "Creator Portfolios", d: "Showcase content, videos, and personal brands beautifully." },
    { icon: Bot, t: "AI Integration", d: "Chatbots, automation, and AI-powered experiences." },
  ];
  return (
    <section id="services" className="relative py-32 bg-card/30">
      <div className="absolute inset-0 bg-grid opacity-20" />
      <div className="relative mx-auto max-w-7xl px-6">
        <div className="max-w-2xl mb-16">
          <Reveal>
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-primary font-semibold mb-4">
              <Sparkles className="w-3.5 h-3.5" /> Services
            </div>
          </Reveal>
          <Reveal delay={100}>
            <h2 className="text-4xl sm:text-5xl font-bold leading-tight">
              Everything you need to <span className="text-gradient">launch</span>.
            </h2>
          </Reveal>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {services.map((s, i) => (
            <Reveal key={s.t} delay={i * 100}>
              <div className="group relative h-full rounded-2xl glass p-6 transition-all duration-500 hover:-translate-y-2 hover:border-primary/40">
                <div className="absolute inset-0 rounded-2xl bg-[image:var(--gradient-primary)] opacity-0 group-hover:opacity-10 transition-opacity" />
                <div className="relative">
                  <div className="grid place-items-center w-12 h-12 rounded-xl bg-primary/15 text-primary mb-5 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <s.icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-display font-semibold text-xl mb-2">{s.t}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{s.d}</p>
                  <div className="mt-6 flex items-center text-sm text-primary font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                    Learn more <ArrowRight className="w-4 h-4 ml-1" />
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Portfolio ---------- */
function Portfolio() {
  const projects = [
    { img: p1, title: "AI Portfolio Website", desc: "Personal branding & lead generation.", tags: ["Next.js", "Tailwind", "AI"] },
    { img: p2, title: "Video Editor Portfolio", desc: "Gallery, services & client inquiries.", tags: ["React", "Motion", "CMS"] },
    { img: p3, title: "Student Portfolio Platform", desc: "Academic projects & achievements.", tags: ["React", "Tailwind"] },
    { img: p4, title: "SaaS Landing Page", desc: "High-converting product launch page.", tags: ["Next.js", "TypeScript"] },
    { img: p5, title: "AI Business Website", desc: "Integrated chatbot & automation.", tags: ["AI", "Next.js", "OpenAI"] },
    { img: p6, title: "Personal Brand Website", desc: "Premium identity for creators.", tags: ["React", "Framer"] },
  ];
  const filters = ["All", "Web", "AI", "Branding"];
  const [active, setActive] = useState("All");

  return (
    <section id="work" className="relative py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12">
          <div>
            <Reveal>
              <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-primary font-semibold mb-4">
                <Sparkles className="w-3.5 h-3.5" /> Selected Work
              </div>
            </Reveal>
            <Reveal delay={100}>
              <h2 className="text-4xl sm:text-5xl font-bold leading-tight">
                Recent <span className="text-gradient">projects</span>.
              </h2>
            </Reveal>
          </div>
          <Reveal delay={200}>
            <div className="flex gap-2 flex-wrap">
              {filters.map(f => (
                <button
                  key={f}
                  onClick={() => setActive(f)}
                  className={`px-4 py-2 rounded-full text-sm border transition-all ${active === f ? "bg-primary text-primary-foreground border-primary" : "border-border text-muted-foreground hover:text-foreground hover:border-primary/50"}`}
                >
                  {f}
                </button>
              ))}
            </div>
          </Reveal>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((p, i) => (
            <Reveal key={p.title} delay={i * 80}>
              <article className="group relative rounded-2xl overflow-hidden glass hover:border-primary/40 transition-all duration-500">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img src={p.img} alt={p.title} loading="lazy" width={1280} height={896} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent opacity-90" />
                  <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-colors" />
                </div>
                <div className="p-6 -mt-16 relative">
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {p.tags.map(t => <span key={t} className="text-[10px] uppercase tracking-wider px-2 py-1 rounded-md bg-primary/15 text-primary border border-primary/30 font-semibold">{t}</span>)}
                  </div>
                  <h3 className="font-display font-semibold text-xl">{p.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{p.desc}</p>
                  <div className="mt-5 flex gap-2">
                    <Button variant="hero" size="sm">Live Demo <ExternalLink /></Button>
                    <Button variant="heroOutline" size="sm">Case Study</Button>
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

/* ---------- Stats ---------- */
function Stats() {
  const stats = [
    { icon: Smartphone, n: 100, s: "%", l: "Responsive" },
    { icon: Search, n: 95, s: "+", l: "SEO Score" },
    { icon: Gauge, n: 98, s: "/100", l: "Performance" },
    { icon: Bot, n: 50, s: "+", l: "AI Workflows" },
    { icon: Palette, n: 25, s: "+", l: "Designs Shipped" },
    { icon: Rocket, n: 3, s: "x", l: "Faster Launch" },
  ];
  return (
    <section className="relative py-32 bg-card/30 overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent" />
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-primary font-semibold mb-4">
              <Sparkles className="w-3.5 h-3.5" /> Why Work With Me
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold">Built for <span className="text-gradient">results</span>.</h2>
          </div>
        </Reveal>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {stats.map((st, i) => (
            <Reveal key={st.l} delay={i * 60}>
              <div className="glass rounded-2xl p-6 text-center hover:border-primary/40 transition-all hover:-translate-y-1">
                <st.icon className="w-5 h-5 text-primary mx-auto mb-3" />
                <div className="text-3xl font-display font-bold text-gradient">
                  <Counter to={st.n} suffix={st.s} />
                </div>
                <div className="text-xs text-muted-foreground mt-1 uppercase tracking-wider">{st.l}</div>
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
  const items = [
    { name: "Sara El Amrani", role: "Engineering Student", quote: "My portfolio landed me three internship interviews in the first month. Mustapha completely understood what I needed." },
    { name: "Yassine Karim", role: "Content Creator", quote: "Premium quality, fast delivery, and a polished look. My audience and brand deals doubled after launch." },
    { name: "Lina Bouazza", role: "Freelance Designer", quote: "The website pays for itself every month. Clean, modern, and built to convert. Highly recommended." },
  ];
  return (
    <section className="relative py-32">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-primary font-semibold mb-4">
              <Sparkles className="w-3.5 h-3.5" /> Testimonials
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold">Loved by <span className="text-gradient">clients</span>.</h2>
          </div>
        </Reveal>
        <div className="grid md:grid-cols-3 gap-6">
          {items.map((t, i) => (
            <Reveal key={t.name} delay={i * 120}>
              <figure className="glass rounded-2xl p-7 h-full flex flex-col">
                <div className="flex gap-0.5 text-primary mb-4">
                  {[...Array(5)].map((_,k)=><Star key={k} className="w-4 h-4 fill-current" />)}
                </div>
                <blockquote className="text-foreground leading-relaxed flex-1">"{t.quote}"</blockquote>
                <figcaption className="mt-6 flex items-center gap-3 pt-6 border-t border-border">
                  <div className="w-11 h-11 rounded-full bg-[image:var(--gradient-primary)] grid place-items-center font-bold text-primary-foreground">
                    {t.name.split(" ").map(n=>n[0]).join("")}
                  </div>
                  <div>
                    <div className="font-semibold text-sm">{t.name}</div>
                    <div className="text-xs text-muted-foreground">{t.role}</div>
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
  const steps = [
    { n: "01", t: "Discovery Call", d: "We talk goals, audience, and what success looks like." },
    { n: "02", t: "Planning & Design", d: "Wireframes, design system, brand-aligned visuals." },
    { n: "03", t: "Development", d: "Built with modern tools, AI-assisted, fully responsive." },
    { n: "04", t: "Launch & Support", d: "Deploy, optimize, and grow with continuous improvements." },
  ];
  return (
    <section id="process" className="relative py-32 bg-card/30">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <div className="text-center max-w-2xl mx-auto mb-20">
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-primary font-semibold mb-4">
              <Sparkles className="w-3.5 h-3.5" /> Process
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold">A clear path to <span className="text-gradient">launch</span>.</h2>
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
const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Invalid email").max(255),
  projectType: z.string().trim().min(1, "Select a project type").max(100),
  budget: z.string().trim().max(100).optional(),
  message: z.string().trim().min(10, "Tell me a bit more").max(2000),
});

function Contact() {
  const [submitting, setSubmitting] = useState(false);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const data = Object.fromEntries(fd.entries());
    const res = contactSchema.safeParse(data);
    if (!res.success) {
      toast.error(res.error.issues[0]?.message ?? "Invalid form");
      return;
    }
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      (e.target as HTMLFormElement).reset();
      toast.success("Message sent! I'll get back to you within 24h.");
    }, 900);
  }

  return (
    <section id="contact" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0" style={{ background: "var(--gradient-radial)" }} />
      <div className="relative mx-auto max-w-6xl px-6 grid lg:grid-cols-12 gap-12">
        <div className="lg:col-span-5 space-y-8">
          <Reveal>
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-primary font-semibold">
              <Sparkles className="w-3.5 h-3.5" /> Contact
            </div>
          </Reveal>
          <Reveal delay={100}>
            <h2 className="text-4xl sm:text-5xl font-bold leading-tight">
              Let's build something <span className="text-gradient">amazing</span> together.
            </h2>
          </Reveal>
          <Reveal delay={200}>
            <p className="text-muted-foreground leading-relaxed">
              Fill in the form or reach out directly. I usually reply within 24 hours.
            </p>
          </Reveal>
          <Reveal delay={300}>
            <ul className="space-y-4">
              {[
                { icon: Mail, label: "bouriguemustapha0@gmail.com", href: "mailto:bouriguemustapha0@gmail.com" },
                { icon: Phone, label: "+212 699 309 986", href: "tel:+212699309986" },
                { icon: Globe, label: "maximumgrowth.AI", href: "#" },
                { icon: Linkedin, label: "Mustapha Bourigue", href: "#" },
                { icon: MapPin, label: "Morocco" },
              ].map(({ icon: I, label, href }) => (
                <li key={label}>
                  {href ? (
                    <a href={href} className="flex items-center gap-3 group">
                      <span className="grid place-items-center w-10 h-10 rounded-lg glass text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                        <I className="w-4 h-4" />
                      </span>
                      <span className="text-sm group-hover:text-primary transition-colors">{label}</span>
                    </a>
                  ) : (
                    <div className="flex items-center gap-3">
                      <span className="grid place-items-center w-10 h-10 rounded-lg glass text-primary"><I className="w-4 h-4" /></span>
                      <span className="text-sm">{label}</span>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Reveal delay={150} className="lg:col-span-7">
          <form onSubmit={onSubmit} className="glass rounded-2xl p-7 space-y-5">
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" name="name" placeholder="Your full name" required maxLength={100} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" placeholder="you@example.com" required maxLength={255} />
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="projectType">Project Type</Label>
                <select
                  id="projectType"
                  name="projectType"
                  required
                  className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                  defaultValue=""
                >
                  <option value="" disabled>Select a project type</option>
                  <option>Student Portfolio</option>
                  <option>Freelancer Website</option>
                  <option>Creator Portfolio</option>
                  <option>AI Integration</option>
                  <option>Other</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="budget">Budget</Label>
                <select
                  id="budget"
                  name="budget"
                  className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                  defaultValue=""
                >
                  <option value="">Select budget (optional)</option>
                  <option>Under $500</option>
                  <option>$500 – $1,500</option>
                  <option>$1,500 – $5,000</option>
                  <option>$5,000+</option>
                </select>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea id="message" name="message" placeholder="Tell me about your project, goals, and timeline…" rows={5} required maxLength={2000} />
            </div>
            <Button type="submit" variant="hero" size="lg" className="w-full" disabled={submitting}>
              {submitting ? "Sending…" : (<>Let's Build Something Amazing <ArrowRight /></>)}
            </Button>
            <p className="text-xs text-muted-foreground flex items-center gap-2">
              <Check className="w-3.5 h-3.5 text-primary" />
              Your information stays private. No spam, ever.
            </p>
          </form>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- Footer ---------- */
function Footer() {
  return (
    <footer className="border-t border-border py-10">
      <div className="mx-auto max-w-7xl px-6 flex flex-col sm:flex-row gap-4 items-center justify-between text-sm text-muted-foreground">
        <div className="flex items-center gap-2.5 font-display font-semibold text-foreground">
          <img src={mgLogo.url} alt="MG logo" width={36} height={26} className="h-6 w-auto" />
          MAXIMUM <span className="text-primary">GROWTH</span>
        </div>
        <div>© {new Date().getFullYear()} Mustapha Bourigue. All rights reserved.</div>
        <div className="flex gap-4">
          <a href="#about" className="hover:text-foreground transition-colors">About</a>
          <a href="#work" className="hover:text-foreground transition-colors">Work</a>
          <a href="#contact" className="hover:text-foreground transition-colors">Contact</a>
        </div>
      </div>
    </footer>
  );
}

function Index() {
  return (
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
  );
}
