export type Category = "Mobilität" | "Flüge" | "Ernährung" | "Wohnen" | "Konsum";
export type Impact = "Klein" | "Mittel" | "Hoch" | "Sehr hoch";

export type Range = {
  min: number;
  max: number;
};

export type BaselineResult = {
  total: Range;
  categories: Record<Category, Range>;
  levers: Category[];
  confidence: "mittel";
  model: "Prototype Model v0.1";
};

export type Question = {
  id: string;
  eyebrow: string;
  title: string;
  note: string;
  choices: { value: string; label: string; detail?: string; icon: string }[];
};

export type Challenge = {
  id: string;
  title: string;
  short: string;
  category: Category;
  impact: Impact;
  co2: Range | null;
  xp: number;
  duration: string;
  difficulty: "Leicht" | "Mittel" | "Mutig";
  icon: string;
  color: string;
  steps: string[];
};

export type Lesson = {
  id: string;
  title: string;
  category: Category;
  minutes: number;
  xp: number;
  icon: string;
  intro: string;
  fact: string;
  action: string;
};

export const questions: Question[] = [
  {
    id: "location",
    eyebrow: "Deine Region",
    title: "Wo beginnt deine Klimareise?",
    note: "Damit ordnen wir Energie- und Mobilitätswerte passend ein.",
    choices: [
      { value: "zuerich", label: "Zürich", detail: "Schweiz", icon: "🏙️" },
      { value: "bern", label: "Bern", detail: "Schweiz", icon: "🏛️" },
      { value: "basel", label: "Basel", detail: "Schweiz", icon: "🌉" },
      { value: "anders", label: "Andere Stadt", detail: "Schweiz", icon: "📍" },
    ],
  },
  {
    id: "transport",
    eyebrow: "Alltag",
    title: "Wie bewegst du dich meistens?",
    note: "Wähle das Verkehrsmittel, das deinen Alltag am besten beschreibt.",
    choices: [
      { value: "car", label: "Auto", detail: "Meistens allein", icon: "🚗" },
      { value: "transit", label: "Öffentlicher Verkehr", detail: "Zug, Tram oder Bus", icon: "🚆" },
      { value: "bike", label: "Velo", detail: "Mit Muskelkraft", icon: "🚲" },
      { value: "walk", label: "Zu Fuss", detail: "Kurze Wege", icon: "🚶" },
    ],
  },
  {
    id: "carType",
    eyebrow: "Auto",
    title: "Welchen Antrieb nutzt dein Auto?",
    note: "Wenn du selten fährst, zählt das später entsprechend weniger.",
    choices: [
      { value: "petrol", label: "Benzin oder Diesel", icon: "⛽" },
      { value: "hybrid", label: "Hybrid", icon: "🔋" },
      { value: "electric", label: "Elektro", icon: "⚡" },
      { value: "none", label: "Kein eigenes Auto", icon: "🌿" },
    ],
  },
  {
    id: "carSize",
    eyebrow: "Auto",
    title: "Wie gross ist dein Fahrzeug?",
    note: "Grösse und Gewicht beeinflussen den Energiebedarf.",
    choices: [
      { value: "small", label: "Kleinwagen", icon: "🚙" },
      { value: "medium", label: "Mittelklasse", icon: "🚗" },
      { value: "large", label: "Gross / SUV", icon: "🚘" },
      { value: "none", label: "Nicht zutreffend", icon: "➖" },
    ],
  },
  {
    id: "carKm",
    eyebrow: "Auto",
    title: "Wie viele Kilometer fährst du pro Jahr?",
    note: "Eine grobe Einschätzung reicht vollkommen.",
    choices: [
      { value: "0", label: "Fast keine", detail: "0–1’000 km", icon: "🍃" },
      { value: "5000", label: "Gelegentlich", detail: "ca. 5’000 km", icon: "🛣️" },
      { value: "10000", label: "Regelmässig", detail: "ca. 10’000 km", icon: "🛣️" },
      { value: "18000", label: "Sehr viel", detail: "15’000+ km", icon: "🧭" },
    ],
  },
  {
    id: "commute",
    eyebrow: "Arbeitsweg",
    title: "Wie sieht dein typischer Arbeitsweg aus?",
    note: "Wir nutzen ihn später als Referenz für passende Challenges.",
    choices: [
      { value: "home", label: "Meist Homeoffice", icon: "🏡" },
      { value: "short", label: "Unter 5 km", icon: "📌" },
      { value: "medium", label: "5–20 km", icon: "🧭" },
      { value: "long", label: "Mehr als 20 km", icon: "🗺️" },
    ],
  },
  {
    id: "flights",
    eyebrow: "Reisen",
    title: "Wie oft fliegst du in einem Jahr?",
    note: "Flüge sind häufig ein grosser persönlicher Klimahebel.",
    choices: [
      { value: "none", label: "Gar nicht", icon: "🌲" },
      { value: "one", label: "Eine Europareise", icon: "✈️" },
      { value: "several", label: "Mehrere Europareisen", icon: "🛫" },
      { value: "longhaul", label: "Mindestens eine Fernreise", icon: "🌍" },
    ],
  },
  {
    id: "flightClass",
    eyebrow: "Reisen",
    title: "In welcher Klasse fliegst du meist?",
    note: "Mehr Platz pro Person erhöht den zugerechneten Anteil.",
    choices: [
      { value: "economy", label: "Economy", icon: "💺" },
      { value: "premium", label: "Premium Economy", icon: "💺" },
      { value: "business", label: "Business", icon: "✨" },
      { value: "none", label: "Nicht zutreffend", icon: "➖" },
    ],
  },
  {
    id: "diet",
    eyebrow: "Ernährung",
    title: "Wie ernährst du dich meistens?",
    note: "Es geht um dein übliches Muster, nicht um einzelne Ausnahmen.",
    choices: [
      { value: "meat", label: "Allesesser:in", icon: "🍽️" },
      { value: "flex", label: "Flexitarisch", icon: "🥗" },
      { value: "vegetarian", label: "Vegetarisch", icon: "🥕" },
      { value: "vegan", label: "Vegan", icon: "🌱" },
    ],
  },
  {
    id: "meatFrequency",
    eyebrow: "Ernährung",
    title: "Wie oft isst du Fleisch?",
    note: "Bei vegetarischer oder veganer Ernährung wähle «Nie».",
    choices: [
      { value: "daily", label: "Täglich", icon: "7×" },
      { value: "often", label: "3–5× pro Woche", icon: "4×" },
      { value: "rarely", label: "1–2× pro Woche", icon: "2×" },
      { value: "never", label: "Nie", icon: "🌿" },
    ],
  },
  {
    id: "foodWaste",
    eyebrow: "Food Waste",
    title: "Wie oft landen Lebensmittel im Abfall?",
    note: "Eine ehrliche Schätzung hilft mehr als Perfektion.",
    choices: [
      { value: "rare", label: "Fast nie", icon: "👌" },
      { value: "sometimes", label: "Manchmal", icon: "🥬" },
      { value: "often", label: "Mehrmals pro Woche", icon: "🗑️" },
      { value: "unsure", label: "Schwer zu sagen", icon: "🤔" },
    ],
  },
  {
    id: "home",
    eyebrow: "Wohnen",
    title: "Wie wohnst du?",
    note: "Wohnform und Fläche beeinflussen den Energieanteil.",
    choices: [
      { value: "flat-small", label: "Wohnung, kompakt", detail: "unter 60 m²", icon: "🏢" },
      { value: "flat-large", label: "Wohnung, grosszügig", detail: "60 m² oder mehr", icon: "🏙️" },
      { value: "house-shared", label: "Haus, mehrere Personen", icon: "🏘️" },
      { value: "house", label: "Haus, 1–2 Personen", icon: "🏠" },
    ],
  },
  {
    id: "heating",
    eyebrow: "Energie",
    title: "Womit wird dein Zuhause geheizt?",
    note: "Mieter:innen erhalten später nur realistisch beeinflussbare Tipps.",
    choices: [
      { value: "heatpump", label: "Wärmepumpe / erneuerbar", icon: "♻️" },
      { value: "district", label: "Fernwärme", icon: "🏭" },
      { value: "gas", label: "Gas oder Öl", icon: "🔥" },
      { value: "unknown", label: "Weiss ich nicht", icon: "❔" },
    ],
  },
  {
    id: "motivation",
    eyebrow: "Dein Fokus",
    title: "Wo möchtest du zuerst etwas bewegen?",
    note: "Das verändert nicht deine Bilanz, sondern deine Empfehlungen.",
    choices: [
      { value: "mobility", label: "Clever unterwegs sein", icon: "🚲" },
      { value: "food", label: "Bewusster essen", icon: "🥦" },
      { value: "home", label: "Energie sparen", icon: "💡" },
      { value: "consumption", label: "Weniger neu kaufen", icon: "🧵" },
    ],
  },
];

export const challenges: Challenge[] = [
  {
    id: "train-day",
    title: "ÖV statt Auto",
    short: "Fahre deinen Arbeitsweg heute mit Zug, Tram oder Bus.",
    category: "Mobilität",
    impact: "Hoch",
    co2: { min: 3, max: 4 },
    xp: 40,
    duration: "1 Tag",
    difficulty: "Leicht",
    icon: "🚆",
    color: "#d7eef3",
    steps: ["Route prüfen", "Ticket oder Abo bereithalten", "Fahrt als erledigt markieren"],
  },
  {
    id: "bike-short",
    title: "Kurze Wege per Velo",
    short: "Ersetze zwei kurze Autofahrten durch das Velo.",
    category: "Mobilität",
    impact: "Mittel",
    co2: { min: 1, max: 2 },
    xp: 30,
    duration: "2 Tage",
    difficulty: "Leicht",
    icon: "🚲",
    color: "#ddefd8",
    steps: ["Zwei Wege auswählen", "Velo startklar machen", "Fahrten festhalten"],
  },
  {
    id: "car-free-week",
    title: "Autofreie Arbeitswoche",
    short: "Plane fünf Arbeitstage ohne eigenes Auto.",
    category: "Mobilität",
    impact: "Sehr hoch",
    co2: { min: 18, max: 28 },
    xp: 120,
    duration: "5 Tage",
    difficulty: "Mutig",
    icon: "🚌",
    color: "#cfe9dc",
    steps: ["Arbeitswege planen", "Alternativen kombinieren", "Fünf aktive Tage sammeln"],
  },
  {
    id: "europe-no-flight",
    title: "Europareise ohne Flug",
    short: "Plane deine nächste Europareise mit Nachtzug oder Bahn.",
    category: "Flüge",
    impact: "Sehr hoch",
    co2: { min: 200, max: 400 },
    xp: 150,
    duration: "1–2 h Planung",
    difficulty: "Mittel",
    icon: "🏔️",
    color: "#dcebf2",
    steps: ["Reiseziel wählen", "Zugverbindungen vergleichen", "Favorit speichern"],
  },
  {
    id: "flight-pause",
    title: "Ein Jahr nah reisen",
    short: "Setze dir ein persönliches Jahr ohne Flugreise.",
    category: "Flüge",
    impact: "Sehr hoch",
    co2: null,
    xp: 250,
    duration: "Langzeitziel",
    difficulty: "Mutig",
    icon: "🌍",
    color: "#dce8cf",
    steps: ["Motivation festhalten", "Nahe Ziele sammeln", "Ziel aktivieren"],
  },
  {
    id: "veggie-lunch",
    title: "Drei grüne Mittagessen",
    short: "Wähle diese Woche dreimal ein vegetarisches Mittagessen.",
    category: "Ernährung",
    impact: "Mittel",
    co2: { min: 4, max: 7 },
    xp: 45,
    duration: "1 Woche",
    difficulty: "Leicht",
    icon: "🥗",
    color: "#e7efd1",
    steps: ["Drei Gerichte auswählen", "Einkauf planen", "Mahlzeiten abhaken"],
  },
  {
    id: "plant-day",
    title: "Ein pflanzlicher Tag",
    short: "Entdecke einen ganzen Tag mit pflanzlichen Mahlzeiten.",
    category: "Ernährung",
    impact: "Mittel",
    co2: { min: 2, max: 4 },
    xp: 35,
    duration: "1 Tag",
    difficulty: "Leicht",
    icon: "🌱",
    color: "#dcefd8",
    steps: ["Frühstück wählen", "Mittag vorbereiten", "Abendessen geniessen"],
  },
  {
    id: "use-leftovers",
    title: "Resteküche",
    short: "Koche eine Mahlzeit aus Lebensmitteln, die schon da sind.",
    category: "Ernährung",
    impact: "Klein",
    co2: null,
    xp: 20,
    duration: "30 min",
    difficulty: "Leicht",
    icon: "🥕",
    color: "#f3e6c8",
    steps: ["Vorräte prüfen", "Rezept improvisieren", "Food Waste vermeiden"],
  },
  {
    id: "heating-down",
    title: "Ein Grad weniger",
    short: "Teste eine Woche lang eine etwas tiefere Raumtemperatur.",
    category: "Wohnen",
    impact: "Hoch",
    co2: null,
    xp: 60,
    duration: "1 Woche",
    difficulty: "Mittel",
    icon: "🌡️",
    color: "#f3dfcc",
    steps: ["Temperatur prüfen", "Ein Grad reduzieren", "Wohlbefinden beobachten"],
  },
  {
    id: "standby",
    title: "Stand-by Safari",
    short: "Finde fünf Geräte, die unnötig Strom ziehen.",
    category: "Wohnen",
    impact: "Klein",
    co2: null,
    xp: 20,
    duration: "15 min",
    difficulty: "Leicht",
    icon: "🔌",
    color: "#f1e8c7",
    steps: ["Wohnung durchgehen", "Fünf Geräte finden", "Schaltleisten nutzen"],
  },
  {
    id: "repair-first",
    title: "Reparieren vor Ersetzen",
    short: "Prüfe für einen defekten Gegenstand eine Reparaturoption.",
    category: "Konsum",
    impact: "Hoch",
    co2: null,
    xp: 55,
    duration: "30 min",
    difficulty: "Mittel",
    icon: "🧵",
    color: "#e9ded0",
    steps: ["Gegenstand auswählen", "Repair-Café suchen", "Entscheidung festhalten"],
  },
  {
    id: "buying-pause",
    title: "Sieben Tage Kaufpause",
    short: "Kaufe eine Woche lang nur, was du wirklich verbrauchst.",
    category: "Konsum",
    impact: "Mittel",
    co2: null,
    xp: 70,
    duration: "7 Tage",
    difficulty: "Mittel",
    icon: "🪡",
    color: "#eee2d8",
    steps: ["Wunschliste anlegen", "Impulse notieren", "Nach sieben Tagen prüfen"],
  },
];

export const lessons: Lesson[] = [
  {
    id: "co2e",
    title: "Was bedeutet CO₂e?",
    category: "Konsum",
    minutes: 2,
    xp: 10,
    icon: "☁️",
    intro: "CO₂e macht verschiedene Treibhausgase in einer gemeinsamen Einheit vergleichbar.",
    fact: "Methan wirkt kurzfristig deutlich stärker als CO₂. Darum wird seine Wirkung in CO₂-Äquivalente umgerechnet.",
    action: "Achte auf Grössenordnungen statt auf scheinbar exakte Nachkommastellen.",
  },
  {
    id: "big-levers",
    title: "Grosse Hebel erkennen",
    category: "Flüge",
    minutes: 2,
    xp: 10,
    icon: "🧭",
    intro: "Nicht jede gute Handlung hat dieselbe Klimawirkung.",
    fact: "Eine vermiedene Flugreise kann mehr bewirken als viele kleine Alltagsaktionen zusammen.",
    action: "Beginne bei einem deiner drei persönlichen Hebel.",
  },
  {
    id: "train",
    title: "Warum Bahn oft gewinnt",
    category: "Mobilität",
    minutes: 3,
    xp: 10,
    icon: "🚆",
    intro: "Gut ausgelastete Züge bewegen viele Menschen mit vergleichsweise wenig Energie.",
    fact: "Der Unterschied zum Auto wächst, wenn dort nur eine Person sitzt.",
    action: "Speichere einen regelmässigen Weg, den du mit ÖV testen willst.",
  },
  {
    id: "electric-car",
    title: "E-Auto: besser, nicht gratis",
    category: "Mobilität",
    minutes: 3,
    xp: 10,
    icon: "⚡",
    intro: "Elektroautos verursachen im Betrieb meist weniger Emissionen, brauchen aber weiterhin Energie und Material.",
    fact: "Fahrzeuggrösse, Strommix und gefahrene Kilometer bleiben relevant.",
    action: "Vermeiden und teilen schlägt häufig nur den Antrieb zu wechseln.",
  },
  {
    id: "plant-food",
    title: "Pflanzen auf dem Teller",
    category: "Ernährung",
    minutes: 2,
    xp: 10,
    icon: "🌱",
    intro: "Mehr pflanzliche Mahlzeiten sind ein gut dosierbarer Alltagshebel.",
    fact: "Besonders bei Rindfleisch entstehen entlang der Produktion hohe Emissionen.",
    action: "Tausche zuerst eine Mahlzeit aus, die dir leichtfällt.",
  },
  {
    id: "food-waste",
    title: "Die Wirkung von Resten",
    category: "Ernährung",
    minutes: 2,
    xp: 10,
    icon: "🥕",
    intro: "Weggeworfene Lebensmittel tragen die gesamte Wirkung von Anbau, Transport und Kühlung.",
    fact: "Planung, richtige Lagerung und kreative Resteküche vermeiden diese Wirkung.",
    action: "Plane vor dem nächsten Einkauf eine Restemahlzeit.",
  },
  {
    id: "heating",
    title: "Wärme bewusst nutzen",
    category: "Wohnen",
    minutes: 3,
    xp: 10,
    icon: "🏡",
    intro: "Raumwärme ist in vielen Haushalten der grösste Energieposten.",
    fact: "Gebäudezustand und Heizsystem bestimmen, wie gross der persönliche Spielraum ist.",
    action: "Teste eine kleine Anpassung, ohne Komfort und Gesundheit zu opfern.",
  },
  {
    id: "consumption",
    title: "Das längste Produktleben",
    category: "Konsum",
    minutes: 2,
    xp: 10,
    icon: "🧵",
    intro: "Herstellung fällt oft stärker ins Gewicht als die tägliche Nutzung.",
    fact: "Länger nutzen, reparieren, leihen und gebraucht kaufen senkt den Bedarf an Neuware.",
    action: "Wähle einen Gegenstand, den du dieses Jahr länger nutzen möchtest.",
  },
];

const categoryOrder: Category[] = ["Mobilität", "Flüge", "Ernährung", "Wohnen", "Konsum"];

export function calculateBaseline(answers: Record<string, string>): BaselineResult {
  const carKm = Number(answers.carKm || 5000);
  const carFactor =
    answers.carType === "electric" ? 0.07 : answers.carType === "hybrid" ? 0.12 : answers.carType === "none" ? 0 : 0.2;
  const sizeFactor = answers.carSize === "large" ? 1.25 : answers.carSize === "small" ? 0.85 : 1;
  const car = carKm * carFactor * sizeFactor;
  const transit = answers.transport === "transit" ? 420 : answers.transport === "car" ? 180 : 80;
  const mobilityMid = (car + transit) / 1000;

  const flightMid =
    answers.flights === "longhaul" ? 3.8 : answers.flights === "several" ? 1.8 : answers.flights === "one" ? 0.65 : 0.08;
  const classFactor = answers.flightClass === "business" ? 1.8 : answers.flightClass === "premium" ? 1.25 : 1;

  const dietMid =
    answers.diet === "vegan" ? 1.05 : answers.diet === "vegetarian" ? 1.3 : answers.diet === "flex" ? 1.65 : 2.15;
  const wasteAdd = answers.foodWaste === "often" ? 0.35 : answers.foodWaste === "sometimes" ? 0.18 : 0.06;

  const homeMid =
    (answers.home === "house" ? 2.35 : answers.home === "house-shared" ? 1.55 : answers.home === "flat-large" ? 1.45 : 1.05) *
    (answers.heating === "gas" ? 1.25 : answers.heating === "heatpump" ? 0.68 : answers.heating === "district" ? 0.85 : 1);

  const consumptionMid = answers.motivation === "consumption" ? 1.45 : 1.7;

  const mids: Record<Category, number> = {
    Mobilität: Math.max(0.25, mobilityMid),
    Flüge: flightMid * classFactor,
    Ernährung: dietMid + wasteAdd,
    Wohnen: homeMid,
    Konsum: consumptionMid,
  };

  const categories = categoryOrder.reduce(
    (result, category) => {
      result[category] = {
        min: round(mids[category] * 0.86),
        max: round(mids[category] * 1.14),
      };
      return result;
    },
    {} as Record<Category, Range>,
  );

  const totalMid = Object.values(mids).reduce((sum, value) => sum + value, 0);
  const levers = [...categoryOrder].sort((a, b) => mids[b] - mids[a]).slice(0, 3);

  return {
    total: { min: round(totalMid * 0.88), max: round(totalMid * 1.12) },
    categories,
    levers,
    confidence: "mittel",
    model: "Prototype Model v0.1",
  };
}

function round(value: number) {
  return Math.round(value * 10) / 10;
}

export function formatRange(range: Range, unit = "kg CO₂e") {
  return `ca. ${range.min.toLocaleString("de-CH")}–${range.max.toLocaleString("de-CH")} ${unit}`;
}
