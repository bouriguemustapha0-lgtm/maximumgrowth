import { createFileRoute, Link } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Check, Play, MessageCircle } from "lucide-react";
import demoVideo from "@/assets/demo-funnel.mp4.asset.json";

const WHATSAPP_NUMBER = "212600000000";

export const Route = createFileRoute("/funnel")({
  head: () => ({
    meta: [
      { title: "Demo — Devis Site Web pour Riad & Maison d'Hôte" },
      { name: "description", content: "Obtenez un devis pour un site web sur mesure avec moteur de réservation direct pour votre Riad, Maison d'Hôte ou Hôtel Boutique au Maroc." },
      { property: "og:title", content: "Devis Site Web Riad & Maison d'Hôte — Réservations Directes" },
      { property: "og:description", content: "Arrêtez de payer 18% de commission. Calculez votre devis en 60 secondes." },
      { property: "og:type", content: "website" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: FunnelPage,
});

/* ============ Types & State ============ */
type FormState = {
  propertyType: string;
  roomCount: string;
  roomTypes: string[];
  activities: string[];
  websiteStatus: string;
  propertyName: string;
  clientName: string;
  clientPhone: string;
  clientEmail: string;
};

const initialState: FormState = {
  propertyType: "",
  roomCount: "",
  roomTypes: [],
  activities: [],
  websiteStatus: "",
  propertyName: "",
  clientName: "",
  clientPhone: "+212 ",
  clientEmail: "",
};

/* ============ Palette (Moroccan luxury) ============ */
// terracotta #C1502E, cream #FBF6EE, emerald #0F5F4E, gold #C9A227
const palette = {
  cream: "#FBF6EE",
  creamDeep: "#F3E9D7",
  terracotta: "#C1502E",
  terracottaDark: "#9E3E22",
  emerald: "#0F5F4E",
  emeraldDark: "#0A4638",
  gold: "#C9A227",
  ink: "#2A1E15",
  inkSoft: "#6B584A",
};

/* ============ Page ============ */
function FunnelPage() {
  const [step, setStep] = useState(0); // 0 = hero, 1..5 form, 6 recap
  const [data, setData] = useState<FormState>(initialState);

  const update = <K extends keyof FormState>(k: K, v: FormState[K]) =>
    setData(d => ({ ...d, [k]: v }));

  const toggleArr = (k: "roomTypes" | "activities", v: string) =>
    setData(d => {
      const arr = d[k];
      return { ...d, [k]: arr.includes(v) ? arr.filter(x => x !== v) : [...arr, v] };
    });

  const progress = step === 0 ? 0 : step === 6 ? 100 : step * 20;

  return (
    <div
      className="min-h-screen w-full"
      style={{
        background: `radial-gradient(1200px 600px at 10% -10%, ${palette.creamDeep}, ${palette.cream} 60%)`,
        color: palette.ink,
        fontFamily: '"Inter", system-ui, sans-serif',
      }}
    >
      {/* Top bar */}
      <header className="sticky top-0 z-40 backdrop-blur-md border-b" style={{ background: `${palette.cream}cc`, borderColor: `${palette.ink}12` }}>
        <div className="mx-auto max-w-6xl px-5 h-14 flex items-center justify-between">
          <Link to="/" className="inline-flex items-center gap-2 text-sm font-medium" style={{ color: palette.inkSoft }}>
            <ArrowLeft className="w-4 h-4" /> Retour au site
          </Link>
          <div className="text-xs tracking-[0.2em] font-semibold" style={{ color: palette.emerald }}>
            MAXIMUM GROWTH · DEMO
          </div>
        </div>
        {step > 0 && step < 6 && (
          <div className="h-1 w-full" style={{ background: `${palette.ink}10` }}>
            <div
              className="h-full transition-all duration-500"
              style={{ width: `${progress}%`, background: `linear-gradient(90deg, ${palette.terracotta}, ${palette.gold})` }}
            />
          </div>
        )}
      </header>

      <main className="mx-auto max-w-4xl px-5 py-10 sm:py-16">
        <div key={step} className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          {step === 0 && <StepHero onStart={() => setStep(1)} />}
          {step === 1 && (
            <StepChoice
              title="Quel type d'établissement gérez-vous ?"
              options={[
                { id: "Riad", label: "Riad", icon: "🏛️" },
                { id: "Maison d'Hôte", label: "Maison d'Hôte", icon: "🏡" },
                { id: "Hôtel Boutique", label: "Hôtel Boutique", icon: "🏨" },
                { id: "Villa / Privatisation", label: "Villa / Privatisation", icon: "🔑" },
              ]}
              value={data.propertyType}
              onChange={v => update("propertyType", v)}
              onNext={() => setStep(2)}
              onBack={() => setStep(0)}
              canNext={!!data.propertyType}
            />
          )}
          {step === 2 && (
            <StepRooms
              data={data}
              onCount={v => update("roomCount", v)}
              onToggleType={v => toggleArr("roomTypes", v)}
              onNext={() => setStep(3)}
              onBack={() => setStep(1)}
            />
          )}
          {step === 3 && (
            <StepActivities
              selected={data.activities}
              onToggle={v => toggleArr("activities", v)}
              onNext={() => setStep(4)}
              onBack={() => setStep(2)}
            />
          )}
          {step === 4 && (
            <StepContact
              data={data}
              update={update}
              onNext={() => setStep(5)}
              onBack={() => setStep(3)}
            />
          )}
          {step === 5 && <StepRecap data={data} onBack={() => setStep(4)} onEdit={() => setStep(1)} />}
        </div>
      </main>

      <footer className="pb-8 text-center text-xs" style={{ color: palette.inkSoft }}>
        © {new Date().getFullYear()} Maximum Growth — Solutions digitales pour l'hôtellerie marocaine.
      </footer>
    </div>
  );
}

/* ============ Shared UI ============ */
function StepTitle({ eyebrow, title, subtitle }: { eyebrow?: string; title: string; subtitle?: string }) {
  return (
    <div className="mb-8 text-center">
      {eyebrow && (
        <div className="text-[11px] tracking-[0.24em] font-semibold mb-3" style={{ color: palette.gold }}>
          {eyebrow}
        </div>
      )}
      <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight" style={{ color: palette.ink, fontFamily: '"Space Grotesk", system-ui, sans-serif' }}>
        {title}
      </h2>
      {subtitle && <p className="mt-3 text-base sm:text-lg" style={{ color: palette.inkSoft }}>{subtitle}</p>}
    </div>
  );
}

function NavButtons({
  onBack,
  onNext,
  canNext = true,
  nextLabel = "Continuer",
}: {
  onBack?: () => void;
  onNext?: () => void;
  canNext?: boolean;
  nextLabel?: string;
}) {
  return (
    <div className="mt-10 flex items-center justify-between gap-3">
      {onBack ? (
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium transition"
          style={{ color: palette.inkSoft, background: `${palette.ink}08` }}
        >
          <ArrowLeft className="w-4 h-4" /> Retour
        </button>
      ) : <span />}
      {onNext && (
        <button
          onClick={onNext}
          disabled={!canNext}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white transition disabled:opacity-40 disabled:cursor-not-allowed shadow-lg"
          style={{
            background: canNext
              ? `linear-gradient(135deg, ${palette.terracotta}, ${palette.terracottaDark})`
              : palette.inkSoft,
            boxShadow: canNext ? `0 12px 30px -12px ${palette.terracotta}80` : "none",
          }}
        >
          {nextLabel} <ArrowRight className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}

/* ============ Step 1: Hero ============ */
function StepHero({ onStart }: { onStart: () => void }) {
  return (
    <div className="text-center pt-4">
      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-semibold tracking-wider mb-6"
        style={{ background: `${palette.emerald}18`, color: palette.emerald }}>
        <span className="w-1.5 h-1.5 rounded-full" style={{ background: palette.emerald }} /> DEMO INTERACTIVE · 60 SECONDES
      </div>

      <h1 className="font-display text-4xl sm:text-6xl font-bold leading-[1.05] tracking-tight max-w-3xl mx-auto"
        style={{ fontFamily: '"Space Grotesk", system-ui, sans-serif', color: palette.ink }}>
        Arrêtez de donner{" "}
        <span style={{ color: palette.terracotta }}>18% de commission</span>{" "}
        à Booking.com & Airbnb.
      </h1>

      <p className="mt-6 max-w-2xl mx-auto text-lg" style={{ color: palette.inkSoft }}>
        Obtenez un site web sur mesure avec moteur de réservation direct, synchronisation
        de vos calendriers et encaissez vos paiements sur votre compte bancaire marocain.
      </p>

      {/* Video placeholder */}
      <div className="mt-10 max-w-3xl mx-auto">
        <div
          className="relative aspect-video rounded-3xl overflow-hidden group cursor-pointer shadow-2xl"
          style={{
            background: `linear-gradient(135deg, ${palette.emerald}, ${palette.emeraldDark})`,
            boxShadow: `0 30px 80px -30px ${palette.emerald}80`,
          }}
        >
          <div className="absolute inset-0 opacity-20"
            style={{ backgroundImage: `radial-gradient(circle at 30% 30%, ${palette.gold}, transparent 60%)` }} />
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
            <div className="w-20 h-20 rounded-full grid place-items-center transition-transform group-hover:scale-110"
              style={{ background: palette.cream, boxShadow: `0 20px 40px -10px ${palette.ink}80` }}>
              <Play className="w-8 h-8 ml-1" style={{ color: palette.terracotta, fill: palette.terracotta }} />
            </div>
            <span className="text-sm font-medium text-white/90">Découvrez la solution en 60 secondes</span>
          </div>
        </div>
      </div>

      <button
        onClick={onStart}
        className="mt-10 inline-flex items-center gap-2 px-8 py-4 rounded-2xl text-base font-semibold text-white shadow-xl transition hover:scale-[1.02]"
        style={{
          background: `linear-gradient(135deg, ${palette.terracotta}, ${palette.terracottaDark})`,
          boxShadow: `0 20px 40px -15px ${palette.terracotta}`,
        }}
      >
        Calculer mon devis de site web <ArrowRight className="w-5 h-5" />
      </button>

      <div className="mt-6 text-xs" style={{ color: palette.inkSoft }}>
        Sans engagement · Devis gratuit · Réponse sous 24h
      </div>
    </div>
  );
}

/* ============ Step 2: Property Type ============ */
function StepChoice({
  title, options, value, onChange, onNext, onBack, canNext,
}: {
  title: string;
  options: { id: string; label: string; icon: string }[];
  value: string;
  onChange: (v: string) => void;
  onNext: () => void;
  onBack: () => void;
  canNext: boolean;
}) {
  return (
    <div>
      <StepTitle eyebrow="ÉTAPE 1 / 4" title={title} />
      <div className="grid sm:grid-cols-2 gap-4">
        {options.map(o => {
          const active = value === o.id;
          return (
            <button
              key={o.id}
              onClick={() => onChange(o.id)}
              className="text-left p-6 rounded-2xl border-2 transition-all hover:-translate-y-0.5"
              style={{
                background: active ? `${palette.terracotta}0d` : "white",
                borderColor: active ? palette.terracotta : `${palette.ink}12`,
                boxShadow: active ? `0 12px 30px -15px ${palette.terracotta}80` : `0 4px 12px -6px ${palette.ink}18`,
              }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <span className="text-3xl">{o.icon}</span>
                  <span className="font-semibold text-lg" style={{ color: palette.ink }}>{o.label}</span>
                </div>
                {active && (
                  <span className="w-6 h-6 rounded-full grid place-items-center" style={{ background: palette.terracotta }}>
                    <Check className="w-4 h-4 text-white" />
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </div>
      <NavButtons onBack={onBack} onNext={onNext} canNext={canNext} />
    </div>
  );
}

/* ============ Step 3: Rooms ============ */
function StepRooms({
  data, onCount, onToggleType, onNext, onBack,
}: {
  data: FormState;
  onCount: (v: string) => void;
  onToggleType: (v: string) => void;
  onNext: () => void;
  onBack: () => void;
}) {
  const counts = ["1 à 5 chambres", "6 à 10 chambres", "11 à 20 chambres", "Plus de 20 chambres"];
  const types = ["Chambres Standards", "Suites Deluxe", "Suites Familiales", "Privatisation complète"];
  return (
    <div>
      <StepTitle eyebrow="ÉTAPE 2 / 4" title="Capacité & Types d'hébergements" />

      <div className="rounded-2xl p-6 mb-6" style={{ background: "white", boxShadow: `0 4px 20px -8px ${palette.ink}18` }}>
        <h3 className="font-semibold mb-4" style={{ color: palette.ink }}>Combien de chambres ou suites possédez-vous ?</h3>
        <div className="grid grid-cols-2 gap-3">
          {counts.map(c => {
            const active = data.roomCount === c;
            return (
              <button key={c} onClick={() => onCount(c)}
                className="px-4 py-3 rounded-xl border-2 text-sm font-medium transition"
                style={{
                  background: active ? `${palette.emerald}12` : palette.cream,
                  borderColor: active ? palette.emerald : "transparent",
                  color: active ? palette.emerald : palette.ink,
                }}>
                {c}
              </button>
            );
          })}
        </div>
      </div>

      <div className="rounded-2xl p-6" style={{ background: "white", boxShadow: `0 4px 20px -8px ${palette.ink}18` }}>
        <h3 className="font-semibold mb-4" style={{ color: palette.ink }}>Quels types de chambres proposez-vous ? <span className="text-xs font-normal" style={{ color: palette.inkSoft }}>(plusieurs choix possibles)</span></h3>
        <div className="grid sm:grid-cols-2 gap-3">
          {types.map(tp => {
            const active = data.roomTypes.includes(tp);
            return (
              <button key={tp} onClick={() => onToggleType(tp)}
                className="flex items-center gap-3 px-4 py-3 rounded-xl border-2 text-sm font-medium transition text-left"
                style={{
                  background: active ? `${palette.terracotta}0d` : palette.cream,
                  borderColor: active ? palette.terracotta : "transparent",
                  color: palette.ink,
                }}>
                <span className="w-5 h-5 rounded-md grid place-items-center border-2"
                  style={{ borderColor: active ? palette.terracotta : `${palette.ink}30`, background: active ? palette.terracotta : "transparent" }}>
                  {active && <Check className="w-3.5 h-3.5 text-white" />}
                </span>
                {tp}
              </button>
            );
          })}
        </div>
      </div>

      <NavButtons onBack={onBack} onNext={onNext} canNext={!!data.roomCount && data.roomTypes.length > 0} />
    </div>
  );
}

/* ============ Step 4: Activities ============ */
function StepActivities({
  selected, onToggle, onNext, onBack,
}: {
  selected: string[];
  onToggle: (v: string) => void;
  onNext: () => void;
  onBack: () => void;
}) {
  const items = [
    { id: "Bassin / Piscine", icon: "🏊" },
    { id: "Restaurant / Table d'hôte", icon: "🍽️" },
    { id: "Hammam & Spa", icon: "🧖" },
    { id: "Excursions & Circuits", icon: "🚙" },
    { id: "Cours de cuisine", icon: "🧑‍🍳" },
    { id: "Transferts Aéroport", icon: "🚐" },
  ];
  return (
    <div>
      <StepTitle
        eyebrow="ÉTAPE 3 / 4"
        title="Activités & Services sur place"
        subtitle="Sélectionnez tout ce que vous proposez au sein de votre établissement"
      />
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {items.map(it => {
          const active = selected.includes(it.id);
          return (
            <button key={it.id} onClick={() => onToggle(it.id)}
              className="aspect-square rounded-2xl border-2 flex flex-col items-center justify-center gap-3 p-4 transition-all hover:-translate-y-0.5"
              style={{
                background: active ? `${palette.emerald}12` : "white",
                borderColor: active ? palette.emerald : `${palette.ink}12`,
                boxShadow: active ? `0 12px 30px -15px ${palette.emerald}80` : `0 4px 12px -6px ${palette.ink}18`,
              }}>
              <span className="text-4xl">{it.icon}</span>
              <span className="text-sm font-medium text-center leading-tight" style={{ color: palette.ink }}>{it.id}</span>
              {active && (
                <span className="absolute w-5 h-5 rounded-full grid place-items-center -translate-y-16 translate-x-14" style={{ background: palette.emerald }}>
                  <Check className="w-3 h-3 text-white" />
                </span>
              )}
            </button>
          );
        })}
      </div>
      <NavButtons onBack={onBack} onNext={onNext} canNext={selected.length > 0} />
    </div>
  );
}

/* ============ Step 5: Contact ============ */
function StepContact({
  data, update, onNext, onBack,
}: {
  data: FormState;
  update: <K extends keyof FormState>(k: K, v: FormState[K]) => void;
  onNext: () => void;
  onBack: () => void;
}) {
  const valid = data.websiteStatus && data.propertyName && data.clientName && data.clientPhone.trim().length > 4 && /\S+@\S+\.\S+/.test(data.clientEmail);

  const inputStyle: React.CSSProperties = {
    background: "white",
    border: `1.5px solid ${palette.ink}18`,
    color: palette.ink,
  };

  return (
    <div>
      <StepTitle eyebrow="ÉTAPE 4 / 4" title="Votre situation & coordonnées" />

      <div className="rounded-2xl p-6 mb-6" style={{ background: "white", boxShadow: `0 4px 20px -8px ${palette.ink}18` }}>
        <h3 className="font-semibold mb-4" style={{ color: palette.ink }}>Disposez-vous déjà d'un site internet ?</h3>
        <div className="grid sm:grid-cols-2 gap-3">
          {["Oui, mais à rénover", "Non, ce sera une création"].map(o => {
            const active = data.websiteStatus === o;
            return (
              <button key={o} onClick={() => update("websiteStatus", o)}
                className="flex items-center gap-3 px-4 py-3 rounded-xl border-2 text-sm font-medium transition text-left"
                style={{
                  background: active ? `${palette.terracotta}0d` : palette.cream,
                  borderColor: active ? palette.terracotta : "transparent",
                  color: palette.ink,
                }}>
                <span className="w-5 h-5 rounded-full grid place-items-center border-2"
                  style={{ borderColor: active ? palette.terracotta : `${palette.ink}30` }}>
                  {active && <span className="w-2.5 h-2.5 rounded-full" style={{ background: palette.terracotta }} />}
                </span>
                {o}
              </button>
            );
          })}
        </div>
      </div>

      <div className="rounded-2xl p-6 space-y-4" style={{ background: "white", boxShadow: `0 4px 20px -8px ${palette.ink}18` }}>
        <Field label="Nom de l'établissement" required>
          <input type="text" value={data.propertyName} onChange={e => update("propertyName", e.target.value)}
            placeholder="Ex : Riad Zahra"
            className="w-full px-4 py-3 rounded-xl text-sm outline-none focus:border-[color:var(--fc)]"
            style={{ ...inputStyle, ["--fc" as string]: palette.terracotta }} />
        </Field>
        <Field label="Votre Nom & Prénom" required>
          <input type="text" value={data.clientName} onChange={e => update("clientName", e.target.value)}
            placeholder="Ex : Karim Alaoui"
            className="w-full px-4 py-3 rounded-xl text-sm outline-none" style={inputStyle} />
        </Field>
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Numéro WhatsApp / Téléphone" required>
            <input type="tel" value={data.clientPhone} onChange={e => update("clientPhone", e.target.value)}
              placeholder="+212 6 ..." className="w-full px-4 py-3 rounded-xl text-sm outline-none" style={inputStyle} />
          </Field>
          <Field label="Adresse Email Pro" required>
            <input type="email" value={data.clientEmail} onChange={e => update("clientEmail", e.target.value)}
              placeholder="contact@monetablissement.com" className="w-full px-4 py-3 rounded-xl text-sm outline-none" style={inputStyle} />
          </Field>
        </div>
      </div>

      <NavButtons onBack={onBack} onNext={onNext} canNext={!!valid} nextLabel="Voir mon récapitulatif" />
    </div>
  );
}

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="block text-xs font-semibold mb-1.5 tracking-wide" style={{ color: palette.inkSoft }}>
        {label} {required && <span style={{ color: palette.terracotta }}>*</span>}
      </span>
      {children}
    </label>
  );
}

/* ============ Step 6: Recap ============ */
function StepRecap({ data, onBack, onEdit }: { data: FormState; onBack: () => void; onEdit: () => void }) {
  const message = [
    "Bonjour ! Je viens de remplir le formulaire de réservation directe.",
    "Voici les détails de mon établissement :",
    "───────────────",
    "1. ÉTABLISSEMENT",
    `• Type : ${data.propertyType}`,
    `• Nom : ${data.propertyName}`,
    `• Contact : ${data.clientName} (${data.clientPhone})`,
    "",
    "2. CAPACITÉ & CHAMBRES",
    `• Nombre de chambres : ${data.roomCount}`,
    `• Types : ${data.roomTypes.join(", ")}`,
    "",
    "3. SERVICES & ACTIVITÉS",
    `• Prestations : ${data.activities.join(", ")}`,
    "",
    "4. SITUATION ACTUELLE",
    `• Site web : ${data.websiteStatus}`,
    "───────────────",
    "Merci de me recontacter pour discuter du projet et de la mise en place du moteur de réservation !",
  ].join("\n");

  const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

  const Row = ({ label, value }: { label: string; value: string }) => (
    <div className="flex justify-between gap-4 py-2.5 border-b" style={{ borderColor: `${palette.ink}0d` }}>
      <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: palette.inkSoft }}>{label}</span>
      <span className="text-sm font-medium text-right" style={{ color: palette.ink }}>{value || "—"}</span>
    </div>
  );

  return (
    <div>
      <div className="text-center mb-8">
        <div className="text-5xl mb-3">🎉</div>
        <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight" style={{ fontFamily: '"Space Grotesk", system-ui, sans-serif', color: palette.ink }}>
          Votre demande est prête !
        </h2>
        <p className="mt-3 text-base sm:text-lg" style={{ color: palette.inkSoft }}>
          Merci {data.clientName || "!"} — cliquez ci-dessous pour envoyer votre dossier récapitulatif directement sur WhatsApp à notre équipe.
        </p>
      </div>

      <div className="rounded-3xl p-6 sm:p-8 mb-6" style={{ background: "white", boxShadow: `0 20px 60px -30px ${palette.ink}60`, border: `1px solid ${palette.gold}40` }}>
        <div className="text-[11px] font-semibold tracking-[0.2em] mb-4" style={{ color: palette.gold }}>RÉCAPITULATIF DE VOTRE DEMANDE</div>

        <SectionTitle>1 · Établissement</SectionTitle>
        <Row label="Type" value={data.propertyType} />
        <Row label="Nom" value={data.propertyName} />
        <Row label="Contact" value={`${data.clientName} · ${data.clientPhone}`} />
        <Row label="Email" value={data.clientEmail} />

        <SectionTitle>2 · Capacité & Chambres</SectionTitle>
        <Row label="Nombre" value={data.roomCount} />
        <Row label="Types" value={data.roomTypes.join(", ")} />

        <SectionTitle>3 · Services & Activités</SectionTitle>
        <Row label="Prestations" value={data.activities.join(", ")} />

        <SectionTitle>4 · Situation actuelle</SectionTitle>
        <Row label="Site web" value={data.websiteStatus} />
      </div>

      <a href={waUrl} target="_blank" rel="noopener noreferrer"
        className="w-full flex items-center justify-center gap-3 px-8 py-5 rounded-2xl text-lg font-bold text-white shadow-2xl transition hover:scale-[1.01]"
        style={{ background: "#25D366", boxShadow: "0 20px 50px -15px rgba(37,211,102,0.6)" }}>
        <MessageCircle className="w-6 h-6" /> Envoyer ma demande via WhatsApp
      </a>

      <div className="mt-6 flex items-center justify-between gap-3">
        <button onClick={onBack}
          className="inline-flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium"
          style={{ color: palette.inkSoft, background: `${palette.ink}08` }}>
          <ArrowLeft className="w-4 h-4" /> Retour
        </button>
        <button onClick={onEdit}
          className="text-sm font-medium underline underline-offset-4"
          style={{ color: palette.emerald }}>
          Modifier ma demande
        </button>
      </div>
    </div>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <div className="text-sm font-bold mt-5 mb-1" style={{ color: palette.emerald }}>{children}</div>;
}
