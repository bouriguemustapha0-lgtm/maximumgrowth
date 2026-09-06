import { createFileRoute, Link, useRouterState } from "@tanstack/react-router";
import { ArrowLeft, MessageCircle } from "lucide-react";
import logo from "@/assets/mg-logo.png";
import {
  buildWhatsAppMessage,
  WHATSAPP_NUMBER,
  LABELS,
  type FormState,
} from "@/lib/funnel";

export const Route = createFileRoute("/funnel/thankyou")({
  head: () => ({
    meta: [
      {
        title: "Merci — Votre plan de croissance est prêt | Maximum Growth",
      },
      {
        name: "description",
        content:
          "Merci d'avoir demandé votre plan de croissance gratuit. Nous vous répondrons sous 24h sur WhatsApp.",
      },
      {
        property: "og:title",
        content: "Merci — Votre plan de croissance est prêt | Maximum Growth",
      },
      {
        property: "og:description",
        content:
          "Merci d'avoir demandé votre plan de croissance gratuit. Nous vous répondrons sous 24h sur WhatsApp.",
      },
      { property: "og:type", content: "website" },
      { name: "robots", content: "noindex" },
    ],
    scripts: [
      {
        children: `!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','1797252747954860');fbq('track','PageView');`,
      },
    ],
  }),
  component: ThankYouPage,
});

function LivingBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none" aria-hidden>
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(135deg, #1a0303 0%, #0a0000 45%, #2a0505 100%)`,
        }}
      />
      <div
        className="absolute -top-40 -left-40 w-[70vw] h-[70vw] rounded-full blur-3xl opacity-70 animate-aurora"
        style={{
          background: `radial-gradient(circle, #DC2626 0%, #7f1d1d 40%, transparent 70%)`,
        }}
      />
      <div
        className="absolute -bottom-40 -right-40 w-[75vw] h-[75vw] rounded-full blur-3xl opacity-60 animate-aurora-2"
        style={{
          background: `radial-gradient(circle, #ef4444 0%, #991b1b 40%, transparent 70%)`,
        }}
      />
      <div
        className="absolute top-1/3 left-1/4 w-[45vw] h-[45vw] rounded-full blur-3xl animate-aurora-3"
        style={{
          background: `radial-gradient(circle, #f87171 0%, #7f1d1d 45%, transparent 75%)`,
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.15] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/></filter><rect width='200' height='200' filter='url(%23n)' opacity='0.6'/></svg>\")",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.65) 100%)",
        }}
      />
    </div>
  );
}

function ThankYouPage() {
  const state = useRouterState({
    select: s => (s.location.state as { data?: FormState } | undefined) ?? undefined,
  });
  const data = state?.data;

  const message = data ? buildWhatsAppMessage(data) : "";
  const waUrl = data
    ? `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
    : `https://wa.me/${WHATSAPP_NUMBER}`;

  const Row = ({ label, value }: { label: string; value: string }) => (
    <div className="flex justify-between gap-4 py-3 border-b border-white/10">
      <span className="text-[11px] font-bold uppercase tracking-widest text-white/50">
        {label}
      </span>
      <span className="text-sm font-medium text-right text-white">{value || "—"}</span>
    </div>
  );

  return (
    <div className="relative min-h-screen w-full text-foreground font-sans">
      <noscript>
        <img
          height="1"
          width="1"
          style={{ display: "none" }}
          src="https://www.facebook.com/tr?id=1797252747954860&ev=PageView&noscript=1"
          alt=""
        />
      </noscript>
      <LivingBackground />

      <header className="sticky top-0 z-40 backdrop-blur-xl border-b border-white/10 bg-black/40">
        <div className="mx-auto max-w-6xl px-5 h-16 flex items-center justify-between">
          <Link
            to="/funnel"
            className="inline-flex items-center gap-2 text-sm font-medium text-white/70 hover:text-white transition"
          >
            <ArrowLeft className="w-4 h-4" /> Retour au formulaire
          </Link>
          <div className="flex items-center gap-2">
            <img src={logo} alt="Maximum Growth" className="h-7 w-auto" />
            <span className="text-[11px] tracking-[0.24em] font-bold text-white/80 hidden sm:inline">
              MAXIMUM GROWTH
            </span>
          </div>
          <div className="text-[10px] tracking-[0.24em] font-bold text-primary hidden sm:block">
            DEMO
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-5 py-10 sm:py-16 relative">
        <div className="text-center mb-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="text-5xl mb-4">🎉</div>
          <h1 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-white">
            Votre plan de croissance est prêt !
          </h1>
          <p className="mt-4 text-base sm:text-lg text-white/70 max-w-xl mx-auto">
            {data
              ? `Merci ${data.fullName || ""} — envoyez vos informations sur WhatsApp et nous vous répondrons sous 24h avec votre plan personnalisé.`
              : "Merci — envoyez vos informations sur WhatsApp et nous vous répondrons sous 24h avec votre plan personnalisé."}
          </p>
        </div>

        {data && (
          <div
            className="rounded-3xl p-6 sm:p-8 mb-6 backdrop-blur-xl border border-primary/30 animate-in fade-in slide-in-from-bottom-4 duration-500"
            style={{
              background: "linear-gradient(135deg, rgba(20,5,5,0.75), rgba(10,0,0,0.65))",
              boxShadow: "0 30px 80px -30px rgba(220,38,38,0.4)",
            }}
          >
            <div className="text-[11px] font-bold tracking-[0.24em] mb-5 text-primary uppercase">
              Votre demande
            </div>
            <Row label="Qui vous êtes" value={LABELS.who[data.who] ?? data.who} />
            <Row label="Objectif principal" value={LABELS.goal[data.goal] ?? data.goal} />
            <Row label="Site actuel" value={LABELS.website[data.website] ?? data.website} />
            <Row label="Ville" value={data.location} />
            <Row label="Délai" value={LABELS.timing[data.timing] ?? data.timing} />
            <Row label="Nom complet" value={data.fullName} />
            <Row label="Établissement" value={data.propertyName} />
            <Row label="Téléphone" value={data.phone} />
            <Row label="Email" value={data.email} />
          </div>
        )}

        <a
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full flex items-center justify-center gap-3 px-8 py-5 rounded-2xl text-lg font-bold text-white transition hover:scale-[1.01] animate-in fade-in slide-in-from-bottom-4 duration-500"
          style={{
            background: "linear-gradient(135deg, #25D366, #128C7E)",
            boxShadow: "0 25px 60px -15px rgba(37,211,102,0.6)",
          }}
        >
          <MessageCircle className="w-6 h-6" /> Envoyer via WhatsApp
        </a>

        <div className="mt-6 flex items-center justify-center">
          <Link
            to="/funnel"
            className="inline-flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium text-white/60 hover:text-white bg-white/5 hover:bg-white/10 transition"
          >
            <ArrowLeft className="w-4 h-4" /> Recommencer le formulaire
          </Link>
        </div>
      </main>

      <footer className="pb-10 text-center text-xs text-white/40 relative">
        © {new Date().getFullYear()} Maximum Growth — Réservations directes pour
        l'hôtellerie marocaine.
      </footer>
    </div>
  );
}
