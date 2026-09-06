export const WHATSAPP_NUMBER = "212699309986";

export type FormState = {
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

export const initialState: FormState = {
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

export const LABELS: Record<string, Record<string, string>> = {
  who: {
    hotel_owner: "Propriétaire d'hôtel",
    riad_owner: "Propriétaire de riad / maison d'hôte",
    manager: "Gérant hôtelier",
    none: "Autre",
  },
  goal: {
    direct: "Plus de réservations directes",
    google: "Plus de clients via Google",
    presence: "Améliorer la présence en ligne",
    all: "Tout ce qui précède",
  },
  website: {
    yes_good: "Oui — performant",
    yes_outdated: "Oui — dépassé",
    no: "Pas encore de site",
    unsure: "Pas sûr qu'il aide",
  },
  timing: {
    this_week: "Cette semaine",
    two_weeks: "D'ici 2 semaines",
    one_month: "D'ici un mois",
    researching: "Je me renseigne",
  },
};

export function buildWhatsAppMessage(data: FormState): string {
  return [
    "Bonjour ! Je viens de remplir le formulaire Maximum Growth.",
    "Voici mes informations :",
    "───────────────",
    `• Qui : ${LABELS.who[data.who] ?? data.who}`,
    `• Objectif : ${LABELS.goal[data.goal] ?? data.goal}`,
    `• Site web : ${LABELS.website[data.website] ?? data.website}`,
    `• Ville : ${data.location}`,
    `• Délai : ${LABELS.timing[data.timing] ?? data.timing}`,
    "───────────────",
    `• Nom : ${data.fullName}`,
    `• Établissement : ${data.propertyName}`,
    `• Téléphone : ${data.phone}`,
    `• Email : ${data.email}`,
    "",
    "Merci de m'envoyer mon plan de croissance gratuit !",
  ].join("\n");
}
