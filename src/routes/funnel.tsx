import { createFileRoute, Link } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Check, Play, MessageCircle, Sparkles } from "lucide-react";
import demoVideo from "@/assets/demo-funnel.mp4.asset.json";
import logo from "@/assets/mg-logo.png";

const WHATSAPP_NUMBER = "212699309986";

export const Route = createFileRoute("/funnel")({
  head: () => ({
    meta: [
      { title: "Plan de Croissance Gratuit — Hôtels, Riads & Maisons d'Hôtes" },
      { name: "description", content: "Obtenez plus de réservations directes, soyez visible sur Google & la recherche IA, et réduisez votre dépendance aux OTA. Plan de croissance personnalisé gratuit en 60 secondes." },
      { property: "og:title", content: "Maximum Growth — Plan de Croissance Hôtelier Gratuit" },
      { property: "og:description", content: "Nous aidons hôtels, riads et maisons d'hôtes à gagner des réservations directes et réduire les commissions OTA." },
      { property: "og:type", content: "website" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: FunnelPage,
});

/* ============ State ============ */
type FormState = {
  who: string;
  goal: string;
  website: string;
  location: string;
  timing: string;
  fullName: string;
  propertyName: string;
  phone: string;
  email: string;
};

const initialState: FormState = {
  who: "",
  goal: "",
  website: "",
  location: "",
  timing: "",
  fullName: "",
  propertyName: "",
  phone: "+212 ",
  email: "",
};

const TOTAL_STEPS = 6;

/* ============ Living background ============ */
function LivingBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none" aria-hidden>
      {/* deep base */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(135deg, #1a0303 0%, #0a0000 45%, #2a0505 100%)`,
        }}
      />
      {/* silky red aurora blobs */}
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
      {/* subtle grain */}
      <div
        className="absolute inset-0 opacity-[0.15] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/></filter><rect width='200' height='200' filter='url(%23n)' opacity='0.6'/></svg>\")",
        }}
      />
      {/* vignette */}
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

/* ============ Page ============ */
function FunnelPage() {
  const [step, setStep] = useState(0); // 0 = hero, 1..6 form, 7 = recap
  const [data, setData] = useState<FormState>(initialState);

  const update = <K extends keyof FormState>(k: K, v: FormState[K]) =>
    setData(d => ({ ...d, [k]: v }));

  const progress = step === 0 ? 0 : step > TOTAL_STEPS ? 100 : (step / TOTAL_STEPS) * 100;

  return (
    <div className="relative min-h-screen w-full text-foreground font-sans">
      <LivingBackground />

      {/* Top bar */}
      <header className="sticky top-0 z-40 backdrop-blur-xl border-b border-white/10 bg-black/40">
        <div className="mx-auto max-w-6xl px-5 h-16 flex items-center justify-between">
          <Link to="/" className="inline-flex items-center gap-2 text-sm font-medium text-white/70 hover:text-white transition">
            <ArrowLeft className="w-4 h-4" /> Back to site
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
        {step > 0 && step <= TOTAL_STEPS && (
          <div className="h-1 w-full bg-white/5">
            <div
              className="h-full transition-all duration-500"
              style={{
                width: `${progress}%`,
                background: "linear-gradient(90deg, #DC2626, #f87171, #DC2626)",
                boxShadow: "0 0 20px rgba(220,38,38,0.6)",
              }}
            />
          </div>
        )}
      </header>

      <main className="mx-auto max-w-4xl px-5 py-10 sm:py-16 relative">
        <div key={step} className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          {step === 0 && <StepHero onStart={() => setStep(1)} />}

          {step === 1 && (
            <ChoiceStep
              stepNum={1}
              title="Who are you?"
              subtitle="Tell us a bit about your role in hospitality."
              options={[
                { id: "hotel_owner", label: "I own a hotel", icon: "🏨" },
                { id: "riad_owner", label: "I own a riad or guest house", icon: "🏡" },
                { id: "manager", label: "I manage a hospitality property", icon: "🧑‍💼" },
                { id: "none", label: "None of the above", icon: "❌" },
              ]}
              value={data.who}
              onChange={v => update("who", v)}
              onNext={() => setStep(2)}
              onBack={() => setStep(0)}
            />
          )}

          {step === 2 && (
            <ChoiceStep
              stepNum={2}
              title="What's your biggest goal?"
              subtitle="If we could solve one problem for you, which would you choose?"
              options={[
                { id: "direct", label: "Get more direct bookings", icon: "💰" },
                { id: "google", label: "Get more guests from Google", icon: "📈" },
                { id: "presence", label: "Improve my online presence", icon: "🌍" },
                { id: "all", label: "All of the above", icon: "🚀" },
              ]}
              value={data.goal}
              onChange={v => update("goal", v)}
              onNext={() => setStep(3)}
              onBack={() => setStep(1)}
            />
          )}

          {step === 3 && (
            <ChoiceStep
              stepNum={3}
              title="Do you already have a website?"
              subtitle="What best describes your current situation?"
              options={[
                { id: "yes_good", label: "Yes, and it's performing well", icon: "✅" },
                { id: "yes_outdated", label: "Yes, but it's outdated", icon: "😕" },
                { id: "no", label: "No, I don't have one", icon: "❌" },
                { id: "unsure", label: "I'm not sure if it's helping", icon: "🤔" },
              ]}
              value={data.website}
              onChange={v => update("website", v)}
              onNext={() => setStep(4)}
              onBack={() => setStep(2)}
            />
          )}

          {step === 4 && (
            <ChoiceStep
              stepNum={4}
              title="Where is your property located?"
              subtitle="Pick the city closest to your property."
              columns={4}
              options={[
                { id: "Marrakech", label: "Marrakech", icon: "🕌" },
                { id: "Fès", label: "Fès", icon: "🏺" },
                { id: "Essaouira", label: "Essaouira", icon: "🌊" },
                { id: "Chefchaouen", label: "Chefchaouen", icon: "💙" },
                { id: "Agadir", label: "Agadir", icon: "🏖️" },
                { id: "Tangier", label: "Tangier", icon: "⚓" },
                { id: "Rabat", label: "Rabat", icon: "🏛️" },
                { id: "Other", label: "Other", icon: "📍" },
              ]}
              value={data.location}
              onChange={v => update("location", v)}
              onNext={() => setStep(5)}
              onBack={() => setStep(3)}
            />
          )}

          {step === 5 && (
            <ChoiceStep
              stepNum={5}
              title="When would you like to improve your online presence?"
              subtitle="Choose the timing that fits you best."
              options={[
                { id: "this_week", label: "This week", icon: "⚡" },
                { id: "two_weeks", label: "Within 2 weeks", icon: "📆" },
                { id: "one_month", label: "Within a month", icon: "🗓️" },
                { id: "researching", label: "Just researching", icon: "🔍" },
              ]}
              value={data.timing}
              onChange={v => update("timing", v)}
              onNext={() => setStep(6)}
              onBack={() => setStep(4)}
            />
          )}

          {step === 6 && (
            <StepContact
              data={data}
              update={update}
              onBack={() => setStep(5)}
              onSubmit={() => setStep(7)}
            />
          )}

          {step === 7 && <StepRecap data={data} onBack={() => setStep(6)} />}
        </div>
      </main>

      <footer className="pb-10 text-center text-xs text-white/40 relative">
        © {new Date().getFullYear()} Maximum Growth — Direct bookings for Moroccan hospitality.
      </footer>
    </div>
  );
}

/* ============ Shared UI ============ */
function StepTitle({ eyebrow, title, subtitle }: { eyebrow?: string; title: string; subtitle?: string }) {
  return (
    <div className="mb-10 text-center">
      {eyebrow && (
        <div className="inline-flex items-center gap-2 text-[11px] tracking-[0.24em] font-bold mb-4 text-primary uppercase">
          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse-glow" />
          {eyebrow}
        </div>
      )}
      <h2 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-white">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-base sm:text-lg text-white/60 max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
    </div>
  );
}

function NavButtons({
  onBack,
  onNext,
  canNext = true,
  nextLabel = "Continue",
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
          className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-medium text-white/70 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition"
        >
          <ArrowLeft className="w-4 h-4" /> Back
        </button>
      ) : <span />}
      {onNext && (
        <button
          onClick={onNext}
          disabled={!canNext}
          className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-sm font-bold text-white transition disabled:opacity-40 disabled:cursor-not-allowed hover:scale-[1.02]"
          style={{
            background: canNext
              ? "linear-gradient(135deg, #DC2626, #991B1B)"
              : "rgba(255,255,255,0.1)",
            boxShadow: canNext ? "0 20px 40px -15px rgba(220,38,38,0.7)" : "none",
          }}
        >
          {nextLabel} <ArrowRight className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}

/* ============ Demo Video Player ============ */
function DemoVideoPlayer() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  const handlePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    v.play().then(() => setPlaying(true)).catch(() => {});
  };

  return (
    <div
      className="relative w-full aspect-[9/16] rounded-3xl overflow-hidden bg-black border border-white/10"
      style={{ boxShadow: "0 40px 100px -30px rgba(220,38,38,0.5)" }}
    >
      <video
        ref={videoRef}
        src={demoVideo.url}
        className="absolute inset-0 w-full h-full object-cover"
        playsInline
        preload="metadata"
        controls={playing}
        onEnded={() => setPlaying(false)}
        onPause={() => setPlaying(false)}
        onPlay={() => setPlaying(true)}
      />
      {!playing && (
        <button
          type="button"
          onClick={handlePlay}
          aria-label="Play demo video"
          className="absolute inset-0 flex flex-col items-center justify-center gap-4 group cursor-pointer"
          style={{
            background:
              "linear-gradient(135deg, rgba(69,10,10,0.75), rgba(10,0,0,0.85))",
          }}
        >
          <div
            className="w-20 h-20 rounded-full grid place-items-center transition-transform group-hover:scale-110 animate-pulse-glow"
            style={{
              background: "linear-gradient(135deg, #DC2626, #991B1B)",
              boxShadow: "0 20px 40px -5px rgba(220,38,38,0.7)",
            }}
          >
            <Play className="w-8 h-8 ml-1 text-white" fill="white" />
          </div>
          <span className="text-sm font-medium text-white/90">Watch the 60-second demo</span>
        </button>
      )}
    </div>
  );
}

/* ============ Step 0: Hero ============ */
function StepHero({ onStart }: { onStart: () => void }) {
  return (
    <div className="text-center pt-4">
      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-[11px] font-bold tracking-[0.2em] mb-8 border border-primary/40 bg-primary/10 text-primary">
        <Sparkles className="w-3.5 h-3.5" /> FREE GROWTH PLAN · 60 SECONDS
      </div>

      <h1 className="font-display text-4xl sm:text-6xl font-bold leading-[1.05] tracking-tight max-w-3xl mx-auto text-white">
        More direct bookings.{" "}
        <span className="text-gradient">Less commission.</span>
      </h1>

      <p className="mt-6 max-w-2xl mx-auto text-lg text-white/70">
        We help guest houses, riads, and hotels get more direct bookings,
        become visible on Google and AI search, and reduce their dependence on OTAs.
      </p>

      <div className="mt-10 mx-auto w-full max-w-sm sm:max-w-md">
        <DemoVideoPlayer />
      </div>

      <button
        onClick={onStart}
        className="mt-10 inline-flex items-center gap-2 px-8 py-4 rounded-2xl text-base font-bold text-white transition hover:scale-[1.03]"
        style={{
          background: "linear-gradient(135deg, #DC2626, #991B1B)",
          boxShadow: "0 25px 50px -15px rgba(220,38,38,0.8)",
        }}
      >
        Get My Free Growth Plan <ArrowRight className="w-5 h-5" />
      </button>

      <div className="mt-6 text-xs text-white/50">
        No commitment · Free plan · Reply within 24h
      </div>
    </div>
  );
}

/* ============ Generic Choice Step ============ */
function ChoiceStep({
  stepNum,
  title,
  subtitle,
  options,
  value,
  onChange,
  onNext,
  onBack,
  columns = 2,
}: {
  stepNum: number;
  title: string;
  subtitle?: string;
  options: { id: string; label: string; icon: string }[];
  value: string;
  onChange: (v: string) => void;
  onNext: () => void;
  onBack: () => void;
  columns?: 2 | 4;
}) {
  const gridCls = columns === 4
    ? "grid grid-cols-2 sm:grid-cols-4 gap-3"
    : "grid sm:grid-cols-2 gap-4";

  return (
    <div>
      <StepTitle eyebrow={`Step ${stepNum} of ${TOTAL_STEPS}`} title={title} subtitle={subtitle} />
      <div className={gridCls}>
        {options.map(o => {
          const active = value === o.id;
          return (
            <button
              key={o.id}
              onClick={() => {
                onChange(o.id);
                // small delay so the user sees selection, then auto-advance is optional
              }}
              className="text-left rounded-2xl border-2 transition-all hover:-translate-y-0.5 backdrop-blur-xl group"
              style={{
                padding: columns === 4 ? "1.25rem 1rem" : "1.5rem",
                background: active
                  ? "linear-gradient(135deg, rgba(220,38,38,0.18), rgba(153,27,27,0.12))"
                  : "rgba(255,255,255,0.04)",
                borderColor: active ? "#DC2626" : "rgba(255,255,255,0.1)",
                boxShadow: active
                  ? "0 20px 40px -15px rgba(220,38,38,0.5), inset 0 1px 0 rgba(255,255,255,0.08)"
                  : "0 4px 16px -8px rgba(0,0,0,0.5)",
              }}
            >
              <div className={columns === 4 ? "flex flex-col items-center gap-2 text-center" : "flex items-center justify-between gap-3"}>
                <div className={columns === 4 ? "flex flex-col items-center gap-2" : "flex items-center gap-4"}>
                  <span className={columns === 4 ? "text-3xl" : "text-3xl"}>{o.icon}</span>
                  <span className={columns === 4 ? "font-semibold text-sm text-white" : "font-semibold text-base sm:text-lg text-white"}>
                    {o.label}
                  </span>
                </div>
                {active && columns !== 4 && (
                  <span className="w-7 h-7 rounded-full grid place-items-center shrink-0" style={{ background: "#DC2626", boxShadow: "0 0 20px rgba(220,38,38,0.6)" }}>
                    <Check className="w-4 h-4 text-white" />
                  </span>
                )}
                {active && columns === 4 && (
                  <span className="w-5 h-5 rounded-full grid place-items-center" style={{ background: "#DC2626" }}>
                    <Check className="w-3 h-3 text-white" />
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </div>
      <NavButtons onBack={onBack} onNext={onNext} canNext={!!value} />
    </div>
  );
}

/* ============ Step 6: Contact ============ */
function StepContact({
  data,
  update,
  onBack,
  onSubmit,
}: {
  data: FormState;
  update: <K extends keyof FormState>(k: K, v: FormState[K]) => void;
  onBack: () => void;
  onSubmit: () => void;
}) {
  const valid =
    data.fullName.trim().length > 1 &&
    data.propertyName.trim().length > 0 &&
    data.phone.trim().length > 4 &&
    /\S+@\S+\.\S+/.test(data.email);

  return (
    <div>
      <StepTitle
        eyebrow={`Step 6 of ${TOTAL_STEPS}`}
        title="Let's discuss your property's growth."
        subtitle="Enter your details — we'll send your personalized growth plan within 24 hours."
      />

      <div
        className="rounded-3xl p-6 sm:p-8 space-y-5 backdrop-blur-xl border border-white/10"
        style={{
          background: "linear-gradient(135deg, rgba(20,5,5,0.7), rgba(10,0,0,0.6))",
          boxShadow: "0 30px 80px -30px rgba(220,38,38,0.4)",
        }}
      >
        <Field label="Full name" required>
          <input
            type="text"
            value={data.fullName}
            onChange={e => update("fullName", e.target.value)}
            placeholder="e.g. Karim Alaoui"
            className="funnel-input"
          />
        </Field>
        <Field label="Property name" required>
          <input
            type="text"
            value={data.propertyName}
            onChange={e => update("propertyName", e.target.value)}
            placeholder="e.g. Riad Zahra"
            className="funnel-input"
          />
        </Field>
        <div className="grid sm:grid-cols-2 gap-5">
          <Field label="Phone number" required>
            <input
              type="tel"
              value={data.phone}
              onChange={e => update("phone", e.target.value)}
              placeholder="+212 6 ..."
              className="funnel-input"
            />
          </Field>
          <Field label="Email address" required>
            <input
              type="email"
              value={data.email}
              onChange={e => update("email", e.target.value)}
              placeholder="you@yourproperty.com"
              className="funnel-input"
            />
          </Field>
        </div>
      </div>

      <NavButtons
        onBack={onBack}
        onNext={onSubmit}
        canNext={valid}
        nextLabel="Get My Free Growth Plan"
      />

      <style>{`
        .funnel-input {
          width: 100%;
          padding: 0.85rem 1rem;
          border-radius: 0.75rem;
          background: rgba(255,255,255,0.05);
          border: 1.5px solid rgba(255,255,255,0.12);
          color: white;
          font-size: 0.95rem;
          transition: all 0.2s;
          outline: none;
        }
        .funnel-input::placeholder { color: rgba(255,255,255,0.35); }
        .funnel-input:focus {
          border-color: #DC2626;
          background: rgba(255,255,255,0.08);
          box-shadow: 0 0 0 3px rgba(220,38,38,0.2);
        }
      `}</style>
    </div>
  );
}

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="block text-xs font-bold mb-2 tracking-wider text-white/70 uppercase">
        {label} {required && <span className="text-primary">*</span>}
      </span>
      {children}
    </label>
  );
}

/* ============ Recap ============ */
const LABELS: Record<string, Record<string, string>> = {
  who: {
    hotel_owner: "Hotel owner",
    riad_owner: "Riad / guest house owner",
    manager: "Hospitality manager",
    none: "Other",
  },
  goal: {
    direct: "More direct bookings",
    google: "More guests from Google",
    presence: "Improve online presence",
    all: "All of the above",
  },
  website: {
    yes_good: "Yes — performing well",
    yes_outdated: "Yes — outdated",
    no: "No website yet",
    unsure: "Not sure if it's helping",
  },
  timing: {
    this_week: "This week",
    two_weeks: "Within 2 weeks",
    one_month: "Within a month",
    researching: "Just researching",
  },
};

function StepRecap({ data, onBack }: { data: FormState; onBack: () => void }) {
  const message = [
    "Hello! I just filled out the Maximum Growth funnel.",
    "Here are my details:",
    "───────────────",
    `• Who: ${LABELS.who[data.who] ?? data.who}`,
    `• Goal: ${LABELS.goal[data.goal] ?? data.goal}`,
    `• Website: ${LABELS.website[data.website] ?? data.website}`,
    `• Location: ${data.location}`,
    `• Timing: ${LABELS.timing[data.timing] ?? data.timing}`,
    "───────────────",
    `• Name: ${data.fullName}`,
    `• Property: ${data.propertyName}`,
    `• Phone: ${data.phone}`,
    `• Email: ${data.email}`,
    "",
    "Please send me my free growth plan. Thanks!",
  ].join("\n");

  const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

  const Row = ({ label, value }: { label: string; value: string }) => (
    <div className="flex justify-between gap-4 py-3 border-b border-white/10">
      <span className="text-[11px] font-bold uppercase tracking-widest text-white/50">{label}</span>
      <span className="text-sm font-medium text-right text-white">{value || "—"}</span>
    </div>
  );

  return (
    <div>
      <div className="text-center mb-10">
        <div className="text-5xl mb-4">🎉</div>
        <h2 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-white">
          Your growth plan is ready!
        </h2>
        <p className="mt-4 text-base sm:text-lg text-white/70 max-w-xl mx-auto">
          Thanks {data.fullName || "!"} — send your details on WhatsApp and we'll reply within 24 hours with your personalized plan.
        </p>
      </div>

      <div
        className="rounded-3xl p-6 sm:p-8 mb-6 backdrop-blur-xl border border-primary/30"
        style={{
          background: "linear-gradient(135deg, rgba(20,5,5,0.75), rgba(10,0,0,0.65))",
          boxShadow: "0 30px 80px -30px rgba(220,38,38,0.4)",
        }}
      >
        <div className="text-[11px] font-bold tracking-[0.24em] mb-5 text-primary uppercase">
          Your submission
        </div>
        <Row label="Who you are" value={LABELS.who[data.who] ?? data.who} />
        <Row label="Main goal" value={LABELS.goal[data.goal] ?? data.goal} />
        <Row label="Current website" value={LABELS.website[data.website] ?? data.website} />
        <Row label="Location" value={data.location} />
        <Row label="Timing" value={LABELS.timing[data.timing] ?? data.timing} />
        <Row label="Full name" value={data.fullName} />
        <Row label="Property" value={data.propertyName} />
        <Row label="Phone" value={data.phone} />
        <Row label="Email" value={data.email} />
      </div>

      <a
        href={waUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="w-full flex items-center justify-center gap-3 px-8 py-5 rounded-2xl text-lg font-bold text-white transition hover:scale-[1.01]"
        style={{
          background: "linear-gradient(135deg, #25D366, #128C7E)",
          boxShadow: "0 25px 60px -15px rgba(37,211,102,0.6)",
        }}
      >
        <MessageCircle className="w-6 h-6" /> Send my plan via WhatsApp
      </a>

      <div className="mt-6 flex items-center justify-center">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium text-white/60 hover:text-white bg-white/5 hover:bg-white/10 transition"
        >
          <ArrowLeft className="w-4 h-4" /> Edit my answers
        </button>
      </div>
    </div>
  );
}
