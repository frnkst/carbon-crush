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
  body: string[];
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
      { value: "car", label: "Auto", icon: "🚗" },
      { value: "transit", label: "Öffentlicher Verkehr", detail: "Zug, Tram oder Bus", icon: "🚆" },
      { value: "bike", label: "Velo", icon: "🚲" },
      { value: "walk", label: "Zu Fuss", icon: "🚶" },
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
      { value: "0", label: "Wenige", detail: "0–1’000 km", icon: "🍃" },
      { value: "5000", label: "Gelegentlich", detail: "ca. 5’000 km", icon: "🛣️" },
      { value: "10000", label: "Regelmässig", detail: "ca. 10’000 km", icon: "🚘" },
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
      { value: "long", label: "20–50 km", icon: "🗺️" },
      { value: "very-long", label: "Mehr als 50 km", icon: "🧳" },
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
      { value: "house", label: "Haus, 1–2 Personen", icon: "🏠" },
      { value: "house-shared", label: "Haus, mehr als 2 Personen", icon: "🏘️" },
    ],
  },
  {
    id: "heating",
    eyebrow: "Energie",
    title: "Womit wird dein Zuhause geheizt?",
    note: "Mieter:innen erhalten später nur realistisch beeinflussbare Tipps.",
    choices: [
      { value: "heatpump", label: "Wärmepumpe / Erdsonde", icon: "♻️" },
      { value: "district", label: "Fernwärme", icon: "🏭" },
      { value: "gas", label: "Gas", icon: "🔥" },
      { value: "oil", label: "Öl", icon: "🛢️" },
      { value: "other", label: "Andere Heizung (Elektro/Holz)", icon: "🪵" },
      { value: "unknown", label: "Weiss ich nicht", icon: "❔" },
    ],
  },
  {
    id: "motivation",
    eyebrow: "Dein Fokus",
    title: "Wo möchtest du zuerst etwas bewegen?",
    note: "Das verändert nicht deine Bilanz, sondern deine Empfehlungen.",
    choices: [
      { value: "mobility", label: "Clever unterwegs sein", detail: "Mobilität & Reisen", icon: "🚲" },
      { value: "food", label: "Bewusster essen", detail: "Ernährung", icon: "🥦" },
      { value: "home", label: "Energie clever nutzen", detail: "Wohnen & Heizen", icon: "💡" },
      { value: "consumption", label: "Bewusster konsumieren", detail: "Einkaufen & Produkte", icon: "🧵" },
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
    title: "Ein Jahr klimaneutral reisen",
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
    minutes: 5,
    xp: 10,
    icon: "☁️",
    body: [
      "Unser Alltag verursacht nicht nur Kohlendioxid, sondern auch andere Treibhausgase. Dazu gehören beispielsweise Methan und Lachgas.",
      "Diese Gase erwärmen die Atmosphäre unterschiedlich stark und bleiben unterschiedlich lange wirksam. Ein Kilogramm Methan hat deshalb nicht dieselbe Klimawirkung wie ein Kilogramm Kohlendioxid.",
      "CO₂-Äquivalente, kurz CO₂e, übersetzen diese unterschiedlichen Wirkungen in eine gemeinsame Vergleichseinheit. Dafür wird jedes Gas entsprechend seiner Klimawirkung in eine vergleichbare Menge CO₂ umgerechnet.",
      "So lassen sich Autofahrten, Lebensmittel, Heizenergie oder Flugreisen trotz verschiedener Emissionsarten miteinander vergleichen. Das Ergebnis ist trotzdem eine Schätzung und kein direkt gemessener Wert.",
      "Emissionsfaktoren hängen von Produktion, Technik, Region und Zeitraum ab. Deshalb zeigt CarbonCrush bewusst Spannbreiten und konzentriert sich auf belastbare Grössenordnungen.",
    ],
    fact: "CO₂e ist eine gemeinsame Vergleichseinheit für unterschiedliche Treibhausgase. Sie macht Klimawirkungen vergleichbar, ohne eine Messgenauigkeit vorzutäuschen.",
    action: "Achte auf Grössenordnungen statt auf scheinbar exakte Nachkommastellen.",
  },
  {
    id: "big-levers",
    title: "Grosse Hebel erkennen",
    category: "Flüge",
    minutes: 6,
    xp: 10,
    icon: "🧭",
    body: [
      "Klimafreundliche Handlungen unterscheiden sich deutlich in ihrer Wirkung. Eine wiederverwendbare Tasche und eine vermiedene Fernreise sind beide sinnvoll, aber nicht gleich gross.",
      "Grosse Hebel entstehen dort, wo eine Aktivität besonders emissionsintensiv ist oder sehr häufig stattfindet. Bei vielen Menschen sind das Flüge, Autofahrten, Heizen oder eine fleischreiche Ernährung.",
      "Welche Hebel persönlich am wichtigsten sind, hängt vom eigenen Alltag ab. Wer nie fliegt, muss sich nicht auf Flugreisen konzentrieren.",
      "Kleine Schritte sind wertvoll, wenn sie den Einstieg erleichtern und zu stabilen Gewohnheiten werden. Sie sollten aber grosse Emissionsquellen nicht unsichtbar machen oder rechnerisch beschönigen.",
      "Der wirksamste Plan kombiniert einen grossen langfristigen Hebel mit einfachen Handlungen für den Alltag. CarbonCrush vergleicht dich deshalb zuerst mit deinem eigenen Ausgangspunkt statt mit anderen Menschen.",
    ],
    fact: "Konzentriere dich zuerst auf Aktivitäten, die häufig stattfinden oder besonders emissionsintensiv sind. Kleine Schritte unterstützen dabei, ersetzen aber keine grossen Hebel.",
    action: "Beginne bei einem deiner drei persönlichen Hebel.",
  },
  {
    id: "train",
    title: "Warum Bahn oft gewinnt",
    category: "Mobilität",
    minutes: 6,
    xp: 10,
    icon: "🚆",
    body: [
      "Züge können viele Personen gleichzeitig mit vergleichsweise wenig Energie transportieren. Besonders elektrifizierte und gut ausgelastete Verbindungen schneiden pro Person oft günstig ab.",
      "Beim Auto werden Fahrzeuggewicht und Energiebedarf häufig nur einer Person zugerechnet. Mit jeder zusätzlichen mitfahrenden Person verteilt sich die Wirkung auf mehr Menschen.",
      "Auch die Art des Zugstroms und der Fahrzeugantrieb beeinflussen den Vergleich. Trotzdem bleibt die Bahn auf vielen mittleren und langen Strecken eine starke Alternative.",
      "Der Zugang zum Bahnhof und die letzte Etappe gehören ebenfalls zur Reise. Velo, Tram und Bus können diese Lücken klimafreundlich schliessen.",
      "Nicht jede Strecke lässt sich sinnvoll mit dem Zug zurücklegen. Entscheidend ist, regelmässige und gut ersetzbare Fahrten zuerst zu erkennen und praktisch zu planen.",
    ],
    fact: "Gut ausgelastete, elektrische Züge verursachen pro Person meist deutlich weniger Emissionen als eine Autofahrt allein. Der konkrete Vorteil hängt von Strecke, Auslastung und Strommix ab.",
    action: "Speichere einen regelmässigen Weg, den du mit ÖV testen willst.",
  },
  {
    id: "electric-car",
    title: "E-Auto: besser, nicht gratis",
    category: "Mobilität",
    minutes: 6,
    xp: 10,
    icon: "⚡",
    body: [
      "Elektroautos verursachen während der Fahrt keine direkten Abgase. Ihre Klimawirkung entsteht dennoch bei Stromerzeugung, Fahrzeugbau und Batterieproduktion.",
      "Die Herstellung der Batterie benötigt Energie und Rohstoffe. Dieser zusätzliche Produktionsaufwand kann sich über die Nutzungsdauer durch den effizienteren Antrieb ausgleichen.",
      "Wie schnell das geschieht, hängt vom Strommix, der Fahrzeuggrösse und den gefahrenen Kilometern ab. Ein kleines Elektroauto benötigt in der Regel weniger Ressourcen als ein grosser elektrischer SUV.",
      "Auch Elektroautos beanspruchen Strassenraum und verursachen Reifenabrieb. Sie lösen deshalb nicht alle Verkehrsprobleme.",
      "Am stärksten ist eine Kombination aus weniger Fahrten, geteilten Fahrzeugen, ÖV, Velo und einem passend dimensionierten Elektroauto. Der Antriebswechsel ist ein wichtiger Baustein, aber nicht die einzige Lösung.",
    ],
    fact: "E-Autos sind über den Lebenszyklus meist klimafreundlicher als Verbrenner, aber nicht emissionsfrei. Fahrzeuggrösse, Strommix und Nutzung bleiben entscheidend.",
    action: "Vermeiden und teilen schlägt häufig nur den Antrieb zu wechseln.",
  },
  {
    id: "plant-food",
    title: "Pflanzen auf dem Teller",
    category: "Ernährung",
    minutes: 6,
    xp: 10,
    icon: "🌱",
    body: [
      "Lebensmittel verursachen Emissionen beim Anbau, bei der Tierhaltung, Verarbeitung, Kühlung und beim Transport. Bei tierischen Produkten kommt zusätzlich die Produktion des Futters hinzu.",
      "Wiederkäuer wie Rinder stossen bei der Verdauung Methan aus. Deshalb kann Rindfleisch eine deutlich höhere Klimawirkung haben als viele pflanzliche Proteinquellen.",
      "Eine pflanzliche Mahlzeit muss nicht kompliziert oder vollkommen neu sein. Viele vertraute Gerichte lassen sich mit Hülsenfrüchten, Gemüse, Tofu oder Getreide zubereiten.",
      "Regionalität allein entscheidet nicht über die gesamte Bilanz. Produktionsweise und Lebensmittelart wiegen häufig stärker als die reine Transportdistanz.",
      "Ein schrittweiser Wechsel ist oft leichter dauerhaft durchzuhalten als ein strikter Alles-oder-nichts-Ansatz. Schon regelmässig ersetzte Mahlzeiten können über ein Jahr eine relevante Veränderung ergeben.",
    ],
    fact: "Mehr pflanzliche Mahlzeiten senken häufig die ernährungsbedingte Klimawirkung. Besonders der Ersatz von Rindfleisch bietet einen grossen Hebel.",
    action: "Tausche zuerst eine Mahlzeit aus, die dir leichtfällt.",
  },
  {
    id: "food-waste",
    title: "Die Wirkung von Resten",
    category: "Ernährung",
    minutes: 5,
    xp: 10,
    icon: "🥕",
    body: [
      "Wenn Lebensmittel weggeworfen werden, gehen auch alle Ressourcen ihrer Herstellung verloren. Dazu zählen Boden, Wasser, Energie, Dünger, Verpackung und Transport.",
      "Bei gekühlten oder verarbeiteten Produkten kommt weiterer Energieaufwand hinzu. Tierische Produkte tragen häufig eine besonders hohe Wirkung, wenn sie ungenutzt entsorgt werden.",
      "Ein Mindesthaltbarkeitsdatum bedeutet nicht automatisch, dass ein Produkt danach verdorben ist. Aussehen, Geruch und Geschmack helfen bei vielen Lebensmitteln besser bei der Beurteilung.",
      "Eine kurze Vorratskontrolle vor dem Einkauf verhindert Doppelkäufe. Gut sichtbare Reste im Kühlschrank werden eher rechtzeitig verwendet.",
      "Portionen lassen sich anpassen, einfrieren oder am nächsten Tag neu kombinieren. Resteküche spart dadurch gleichzeitig Emissionen, Geld und Einkaufszeit.",
    ],
    fact: "Food Waste verschwendet die gesamte Wirkung, die bis zum Wegwerfen bereits entstanden ist. Planung, Lagerung und Resteküche vermeiden diese unnötigen Emissionen.",
    action: "Plane vor dem nächsten Einkauf eine Restemahlzeit.",
  },
  {
    id: "heating",
    title: "Wärme bewusst nutzen",
    category: "Wohnen",
    minutes: 6,
    xp: 10,
    icon: "🏡",
    body: [
      "Raumwärme benötigt in vielen Haushalten mehr Energie als Licht oder Haushaltsgeräte. Der Bedarf hängt stark von Gebäudehülle, Wohnfläche, Wetter und gewünschter Temperatur ab.",
      "Öl- und Gasheizungen verursachen beim Verbrennen fossiler Energieträger direkte Emissionen. Wärmepumpen nutzen Umweltwärme und können mit sauberem Strom deutlich klimafreundlicher arbeiten.",
      "Mieterinnen und Mieter können das Heizsystem meist nicht selbst austauschen. Sie können dennoch Temperatur, Lüftung und Heizzeiten beeinflussen.",
      "Stosslüften tauscht Luft schnell aus, ohne Wände und Möbel stark auszukühlen. Dauerhaft gekippte Fenster können dagegen unnötig viel Wärme verlieren.",
      "Eine kleine Temperaturanpassung kann den Energiebedarf reduzieren, darf aber Gesundheit und Wohnkomfort nicht beeinträchtigen. Langfristig sind gute Dämmung und erneuerbare Heizsysteme die grössten Gebäudehebel.",
    ],
    fact: "Heizsystem und Gebäudezustand bestimmen den grössten Teil der Wohnemissionen. Im Alltag helfen bedarfsgerechtes Heizen und kurzes, kräftiges Lüften.",
    action: "Teste eine kleine Anpassung, ohne Komfort und Gesundheit zu opfern.",
  },
  {
    id: "consumption",
    title: "Das längste Produktleben",
    category: "Konsum",
    minutes: 6,
    xp: 10,
    icon: "🧵",
    body: [
      "Viele Produkte verursachen einen grossen Teil ihrer Klimawirkung schon vor dem ersten Gebrauch. Rohstoffabbau, Verarbeitung, Fabrikation und Transport gehören zu dieser sogenannten grauen Energie.",
      "Elektronik benötigt zusätzlich seltene Metalle und aufwendige Produktionsschritte. Bei Kleidung spielen Fasern, Färbung, Verarbeitung und häufige Kollektionen eine wichtige Rolle.",
      "Je länger ein funktionsfähiges Produkt genutzt wird, desto länger verteilt sich seine Herstellungswirkung. Ein Neukauf ist deshalb nicht automatisch besser, nur weil das neue Modell effizienter ist.",
      "Reparieren, gebraucht kaufen, leihen und teilen vermeiden oder verzögern neue Produktion. Wichtig ist zugleich, Gegenstände auszuwählen, die tatsächlich gebraucht und lange verwendet werden.",
      "Eine Wunschliste mit Wartezeit hilft, spontane Käufe von echten Bedürfnissen zu unterscheiden. Bewusster Konsum bedeutet nicht Verzicht auf alles, sondern mehr Nutzen aus jedem Produkt zu holen.",
    ],
    fact: "Die Herstellung prägt die Klimawirkung vieler Produkte stark. Längere Nutzung, Reparatur und Secondhand reduzieren den Bedarf an neuer Produktion.",
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
    (answers.heating === "oil"
      ? 1.35
      : answers.heating === "gas"
        ? 1.2
        : answers.heating === "heatpump"
          ? 0.68
          : answers.heating === "district"
            ? 0.85
            : answers.heating === "other"
              ? 0.9
              : 1);

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
