"use client";

import { useState } from "react";
import {
  ArrowLeft,
  BarChart3,
  Bell,
  BookOpen,
  Check,
  ChevronRight,
  CircleHelp,
  Download,
  Flame,
  Heart,
  Home,
  Info,
  Leaf,
  LockKeyhole,
  LogIn,
  Map,
  Plus,
  RotateCcw,
  Settings,
  Sparkles,
  Star,
  Target,
  Trophy,
  UserRound,
  X,
  Zap,
} from "lucide-react";
import { AlpineScene, WelcomeGlobe } from "@/components/alpine-scene";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import {
  Category,
  Challenge,
  challenges,
  formatRange,
  lessons,
  questions,
} from "@/lib/app-data";
import { Activity as ActivityItem, useCarbonState } from "@/hooks/use-carbon-state";
import { cn } from "@/lib/utils";

type Screen =
  | "welcome"
  | "signin"
  | "onboarding"
  | "baseline"
  | "home"
  | "challenges"
  | "challenge"
  | "success"
  | "activity"
  | "planet"
  | "impact"
  | "learn"
  | "lesson"
  | "profile";

const categoryColors: Record<Category, string> = {
  Mobilität: "#3283a6",
  Flüge: "#6557a4",
  Ernährung: "#6d9b42",
  Wohnen: "#d08332",
  Konsum: "#9b6e55",
};

export function CarbonApp() {
  const store = useCarbonState();
  const { state, hydrated } = store;
  const [screen, setScreen] = useState<Screen>("welcome");
  const [history, setHistory] = useState<Screen[]>([]);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [draftAnswers, setDraftAnswers] = useState<Record<string, string>>({});
  const [selectedChallenge, setSelectedChallenge] = useState<Challenge>(challenges[0]);
  const [selectedLesson, setSelectedLesson] = useState(lessons[0]);
  const [successTitle, setSuccessTitle] = useState("Stark gemacht!");

  function navigate(next: Screen) {
    setHistory((items) => [...items, screen]);
    setScreen(next);
  }

  function goBack() {
    const previous = history.at(-1);
    if (!previous) return;
    setHistory((items) => items.slice(0, -1));
    setScreen(previous);
  }

  function startOnboarding() {
    setDraftAnswers(state.answers);
    setQuestionIndex(0);
    navigate("onboarding");
  }

  function completeAction(activity: Omit<ActivityItem, "id" | "date">) {
    const newActivity: ActivityItem = {
      ...activity,
      id: `${Date.now()}`,
      date: new Intl.DateTimeFormat("de-CH", { day: "2-digit", month: "short" }).format(new Date()),
    };
    store.update({
      xp: state.xp + activity.xp,
      activeDays: Math.min(5, state.activeDays + 1),
      avoidedMin: state.avoidedMin + activity.co2Min,
      avoidedMax: state.avoidedMax + activity.co2Max,
      activities: [newActivity, ...state.activities],
    });
  }

  if (!hydrated) {
    return (
      <AppFrame>
        <div className="flex min-h-[100dvh] items-center justify-center">
          <div className="flex flex-col items-center gap-4 text-sm font-semibold text-muted-foreground">
            <Leaf className="size-9 animate-pulse text-primary" />
            Deine Welt wächst …
          </div>
        </div>
      </AppFrame>
    );
  }

  const content = (() => {
    switch (screen) {
      case "welcome":
        return (
          <Welcome
            returning={state.onboardingComplete}
            onStart={() => (state.onboardingComplete ? navigate("home") : startOnboarding())}
            onSignIn={() => navigate("signin")}
          />
        );
      case "signin":
        return (
          <SignIn
            initialName={state.profile.name}
            onBack={goBack}
            onSubmit={(name, email) => {
              store.update({ profile: { name, email } });
              if (state.onboardingComplete) navigate("home");
              else startOnboarding();
            }}
          />
        );
      case "onboarding":
        return (
          <Onboarding
            index={questionIndex}
            answers={draftAnswers}
            onClose={() => {
              setScreen("welcome");
              setHistory([]);
            }}
            onAnswer={(value) => {
              const question = questions[questionIndex];
              const nextAnswers = { ...draftAnswers, [question.id]: value };
              setDraftAnswers(nextAnswers);
              if (questionIndex === questions.length - 1) {
                store.finishOnboarding(nextAnswers);
                navigate("baseline");
              } else {
                setQuestionIndex((index) => index + 1);
              }
            }}
            onBack={() => setQuestionIndex((index) => Math.max(0, index - 1))}
          />
        );
      case "baseline":
        return (
          <Baseline
            state={state}
            onContinue={() => {
              setScreen("home");
              setHistory([]);
            }}
          />
        );
      case "home":
        return (
          <HomeScreen
            state={state}
            onChallenge={(challenge) => {
              setSelectedChallenge(challenge);
              navigate("challenge");
            }}
            navigate={navigate}
          />
        );
      case "challenges":
        return (
          <ChallengesScreen
            state={state}
            onChallenge={(challenge) => {
              setSelectedChallenge(challenge);
              navigate("challenge");
            }}
          />
        );
      case "challenge":
        return (
          <ChallengeDetail
            challenge={selectedChallenge}
            active={state.activeChallengeId === selectedChallenge.id}
            onBack={goBack}
            onToggle={() => {
              store.update({
                activeChallengeId:
                  state.activeChallengeId === selectedChallenge.id ? null : selectedChallenge.id,
              });
              goBack();
            }}
            onComplete={() => {
              completeAction({
                title: selectedChallenge.title,
                category: selectedChallenge.category,
                icon: selectedChallenge.icon,
                xp: selectedChallenge.xp,
                co2Min: selectedChallenge.co2?.min ?? 0,
                co2Max: selectedChallenge.co2?.max ?? 0,
              });
              store.update({
                activeChallengeId: null,
                completedChallenges: [...new Set([...state.completedChallenges, selectedChallenge.id])],
              });
              setSuccessTitle("Challenge geschafft!");
              navigate("success");
            }}
          />
        );
      case "success":
        return (
          <SuccessScreen
            title={successTitle}
            state={state}
            onHome={() => {
              setScreen("home");
              setHistory([]);
            }}
            onPlanet={() => navigate("planet")}
          />
        );
      case "activity":
        return (
          <ActivityCapture
            onClose={goBack}
            onSave={(activity) => {
              completeAction(activity);
              setSuccessTitle("Ein Schritt, der zählt!");
              navigate("success");
            }}
          />
        );
      case "planet":
        return <PlanetScreen state={state} />;
      case "impact":
        return <ImpactScreen state={state} />;
      case "learn":
        return (
          <LearnScreen
            state={state}
            onLesson={(lesson) => {
              setSelectedLesson(lesson);
              navigate("lesson");
            }}
          />
        );
      case "lesson":
        return (
          <LessonDetail
            lesson={selectedLesson}
            completed={state.completedLessons.includes(selectedLesson.id)}
            onBack={goBack}
            onComplete={() => {
              if (!state.completedLessons.includes(selectedLesson.id)) {
                store.update({
                  xp: state.xp + selectedLesson.xp,
                  completedLessons: [...state.completedLessons, selectedLesson.id],
                });
              }
              goBack();
            }}
          />
        );
      case "profile":
        return (
          <ProfileScreen
            state={state}
            store={store}
            onRecheck={startOnboarding}
            onReset={() => {
              store.reset();
              setScreen("welcome");
              setHistory([]);
            }}
          />
        );
    }
  })();

  const showNav = ["home", "challenges", "planet", "impact", "learn", "profile"].includes(screen);

  return (
    <AppFrame>
      <main key={screen} className={cn("screen-enter min-h-[100dvh]", showNav && "pb-24")}>
        {content}
      </main>
      {showNav && <BottomNav screen={screen} navigate={navigate} />}
      {showNav && (
        <Button
          aria-label="Aktivität hinzufügen"
          onClick={() => navigate("activity")}
          className="fixed bottom-[3.35rem] left-1/2 z-30 size-14 -translate-x-1/2 rounded-full border-[5px] border-[#fffef9] bg-primary p-0 shadow-[0_10px_28px_rgba(35,122,69,.35)] hover:bg-[#1c693a]"
        >
          <Plus className="size-6" />
        </Button>
      )}
    </AppFrame>
  );
}

function AppFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative mx-auto min-h-[100dvh] w-full max-w-[430px] overflow-x-hidden bg-[#fffef9] shadow-[0_0_80px_rgba(28,62,42,.2)]">
      {children}
    </div>
  );
}

function Welcome({
  returning,
  onStart,
  onSignIn,
}: {
  returning: boolean;
  onStart: () => void;
  onSignIn: () => void;
}) {
  return (
    <section className="paper-grain relative flex min-h-[100dvh] flex-col overflow-hidden px-6 pb-8 pt-7">
      <div className="absolute -right-24 -top-20 size-64 rounded-full bg-[#dcebd2] blur-3xl" />
      <div className="relative flex items-center justify-between">
        <Brand />
        <span className="rounded-full bg-secondary px-3 py-1.5 text-xs font-bold text-secondary-foreground">Prototyp</span>
      </div>
      <div className="relative mt-14">
        <p className="rise text-xs font-bold uppercase tracking-[.22em] text-primary">Dein Beitrag zählt</p>
        <h1 className="rise rise-delay-1 mt-3 max-w-[340px] font-display text-[3.15rem] font-semibold leading-[.96] tracking-[-.045em] text-[#183125]">
          Kleine Schritte.
          <br />
          Spürbare Wirkung.
        </h1>
        <p className="rise rise-delay-2 mt-5 max-w-[310px] text-[15px] leading-6 text-muted-foreground">
          Entdecke deine grössten Klimahebel und lass deine persönliche Welt mit jeder guten Gewohnheit aufblühen.
        </p>
      </div>
      <div className="rise rise-delay-3 my-auto py-5">
        <WelcomeGlobe />
      </div>
      <div className="relative space-y-3">
        <Button onClick={onStart} className="h-14 w-full rounded-2xl text-base font-bold shadow-[0_12px_30px_rgba(35,122,69,.24)]">
          {returning ? "Weiter zu meiner Welt" : "Los geht's"} <ChevronRight className="ml-1 size-5" />
        </Button>
        <Button onClick={onSignIn} variant="ghost" className="h-11 w-full rounded-xl text-sm">
          Bereits dabei? <span className="ml-1 font-bold text-primary">Anmelden</span>
        </Button>
        <p className="text-center text-[11px] leading-4 text-muted-foreground">
          Deine Daten bleiben für diesen Prototyp in deinem Browser.
        </p>
      </div>
    </section>
  );
}

function Brand() {
  return (
    <div className="flex items-center gap-2 font-display text-xl font-semibold">
      <span className="grid size-8 place-items-center rounded-full bg-primary text-white">
        <Leaf className="size-4" />
      </span>
      wurzel
    </div>
  );
}

function SignIn({
  initialName,
  onBack,
  onSubmit,
}: {
  initialName: string;
  onBack: () => void;
  onSubmit: (name: string, email: string) => void;
}) {
  const [name, setName] = useState(initialName);
  const [email, setEmail] = useState("anna@beispiel.ch");

  return (
    <section className="flex min-h-[100dvh] flex-col px-6 py-7">
      <TopBar title="Lokales Profil" onBack={onBack} />
      <div className="mt-14">
        <div className="grid size-16 place-items-center rounded-3xl bg-secondary text-primary">
          <LogIn className="size-7" />
        </div>
        <h1 className="mt-6 font-display text-4xl font-semibold leading-tight">Schön, dass du wieder da bist.</h1>
        <p className="mt-3 text-sm leading-6 text-muted-foreground">
          Für den Prototyp simulieren wir die Anmeldung und speichern alles nur lokal.
        </p>
      </div>
      <div className="mt-10 space-y-5">
        <label className="block text-sm font-bold">
          Vorname
          <Input value={name} onChange={(event) => setName(event.target.value)} className="mt-2 h-12 rounded-xl" />
        </label>
        <label className="block text-sm font-bold">
          E-Mail
          <Input value={email} onChange={(event) => setEmail(event.target.value)} className="mt-2 h-12 rounded-xl" type="email" />
        </label>
      </div>
      <Button
        className="mt-auto h-14 rounded-2xl text-base font-bold"
        disabled={!name.trim() || !email.trim()}
        onClick={() => onSubmit(name.trim(), email.trim())}
      >
        Lokal anmelden
      </Button>
    </section>
  );
}

function Onboarding({
  index,
  answers,
  onAnswer,
  onBack,
  onClose,
}: {
  index: number;
  answers: Record<string, string>;
  onAnswer: (value: string) => void;
  onBack: () => void;
  onClose: () => void;
}) {
  const question = questions[index];

  return (
    <section className="flex min-h-[100dvh] flex-col px-5 pb-6 pt-5">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" className="rounded-full" onClick={onClose} aria-label="Klima-Check schliessen">
          <X />
        </Button>
        <div className="flex-1">
          <div className="mb-2 flex items-center justify-between text-[11px] font-bold uppercase tracking-[.14em] text-muted-foreground">
            <span>Dein Klima-Check</span>
            <span>{index + 1} / {questions.length}</span>
          </div>
          <Progress value={((index + 1) / questions.length) * 100} className="h-2 bg-[#e7eadf]" />
        </div>
        <CircleHelp className="size-5 text-muted-foreground" />
      </div>

      <div className="mt-12">
        <p className="text-xs font-bold uppercase tracking-[.2em] text-primary">{question.eyebrow}</p>
        <h1 className="mt-3 font-display text-[2.35rem] font-semibold leading-[1.03] tracking-[-.035em]">{question.title}</h1>
        <p className="mt-4 text-sm leading-6 text-muted-foreground">{question.note}</p>
      </div>

      <div className="mt-8 space-y-3">
        {question.choices.map((choice, choiceIndex) => {
          const selected = answers[question.id] === choice.value;
          return (
            <button
              key={choice.value}
              type="button"
              onClick={() => onAnswer(choice.value)}
              style={{ animationDelay: `${choiceIndex * 55}ms` }}
              className={cn(
                "rise flex w-full items-center gap-4 rounded-2xl border bg-white p-4 text-left shadow-[0_5px_18px_rgba(27,55,38,.05)] transition hover:-translate-y-0.5 hover:border-primary/50",
                selected && "border-primary bg-[#f3f9ef] ring-2 ring-primary/10",
              )}
            >
              <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-[#f1f3eb] text-xl">{choice.icon}</span>
              <span className="flex-1">
                <span className="block text-[15px] font-bold">{choice.label}</span>
                {choice.detail && <span className="mt-0.5 block text-xs text-muted-foreground">{choice.detail}</span>}
              </span>
              <span className={cn("grid size-6 place-items-center rounded-full border", selected && "border-primary bg-primary text-white")}>
                {selected && <Check className="size-3.5" />}
              </span>
            </button>
          );
        })}
      </div>

      <div className="mt-auto flex items-center justify-between pt-8">
        <Button variant="ghost" onClick={onBack} disabled={index === 0} className="rounded-xl">
          <ArrowLeft /> Zurück
        </Button>
        <span className="text-xs text-muted-foreground">Tippe auf eine Antwort</span>
      </div>
    </section>
  );
}

function Baseline({ state, onContinue }: { state: ReturnType<typeof useCarbonState>["state"]; onContinue: () => void }) {
  const baseline = state.baseline;
  if (!baseline) return null;

  return (
    <section className="min-h-[100dvh] pb-7">
      <div className="paper-grain bg-[linear-gradient(150deg,#edf5e7,#dcebd5)] px-6 pb-8 pt-7">
        <div className="flex items-center justify-between">
          <Brand />
          <Badge className="bg-white/70 text-primary">Check komplett</Badge>
        </div>
        <div className="mt-10 text-center">
          <p className="text-xs font-bold uppercase tracking-[.2em] text-primary">Dein Startpunkt</p>
          <div className="mx-auto mt-5 grid size-56 place-items-center rounded-full border-[10px] border-white/65 bg-white/50 shadow-[0_24px_50px_rgba(47,91,58,.12)]">
            <div>
              <p className="text-xs text-muted-foreground">Geschätzter Fussabdruck</p>
              <p className="mt-1 font-display text-[3.3rem] font-semibold leading-none">
                {baseline.total.min}–{baseline.total.max}
              </p>
              <p className="mt-2 text-sm font-bold">t CO₂e / Jahr</p>
            </div>
          </div>
          <p className="mx-auto mt-5 max-w-[300px] text-sm leading-6 text-muted-foreground">
            Eine ehrliche Bandbreite ist hilfreicher als eine scheinbar exakte Zahl.
          </p>
        </div>
      </div>
      <div className="px-5 pt-7">
        <div className="mb-4 flex items-end justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[.16em] text-muted-foreground">Hier liegt dein Potenzial</p>
            <h2 className="mt-1 font-display text-2xl font-semibold">Deine grössten Hebel</h2>
          </div>
          <Sparkles className="size-5 text-[#e5a92c]" />
        </div>
        <div className="space-y-3">
          {baseline.levers.map((lever, index) => (
            <Card key={lever} className="flex items-center gap-4 rounded-2xl p-4 shadow-sm">
              <span
                className="grid size-11 place-items-center rounded-xl text-lg font-bold text-white"
                style={{ backgroundColor: categoryColors[lever] }}
              >
                {index + 1}
              </span>
              <div className="flex-1">
                <p className="font-bold">{lever}</p>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  {formatRange(baseline.categories[lever], "t CO₂e / Jahr")}
                </p>
              </div>
              <ChevronRight className="size-4 text-muted-foreground" />
            </Card>
          ))}
        </div>
        <Accordion className="mt-5 rounded-2xl border bg-[#fafbf6] px-4">
          <AccordionItem value="method">
            <AccordionTrigger className="text-sm font-bold">Wie berechnen wir das?</AccordionTrigger>
            <AccordionContent className="space-y-2 text-xs leading-5 text-muted-foreground">
              <p>
                Die Schätzung basiert auf deinen Angaben, plausiblen Demo-Faktoren und dem {baseline.model}. Die Genauigkeit ist aktuell <strong>mittel</strong>.
              </p>
              <p>
                Nicht individuell erfasste gesellschaftliche Emissionen werden nicht als erfundene Restzahl ergänzt.
              </p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <Button onClick={onContinue} className="mt-6 h-14 w-full rounded-2xl text-base font-bold">
          Meine Reise starten <Leaf className="ml-1" />
        </Button>
      </div>
    </section>
  );
}

function HomeScreen({
  state,
  onChallenge,
  navigate,
}: {
  state: ReturnType<typeof useCarbonState>["state"];
  onChallenge: (challenge: Challenge) => void;
  navigate: (screen: Screen) => void;
}) {
  const level = getLevel(state.xp);
  const recommended = challenges.find((challenge) => challenge.id === state.activeChallengeId) ?? getRecommended(state);

  return (
    <section className="px-5 pb-5 pt-6">
      <header className="flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold text-muted-foreground">Freitag, 11. September</p>
          <h1 className="mt-1 font-display text-3xl font-semibold">Hallo {state.profile.name} 🌱</h1>
        </div>
        <button onClick={() => navigate("profile")} className="relative grid size-11 place-items-center rounded-full border bg-white shadow-sm">
          <UserRound className="size-5" />
          <span className="absolute right-0 top-0 size-2.5 rounded-full border-2 border-white bg-[#df9432]" />
        </button>
      </header>

      <div className="mt-6 overflow-hidden rounded-[1.75rem] bg-[#1d5d3b] p-5 text-white shadow-[0_20px_45px_rgba(26,84,53,.2)]">
        <div className="flex items-center justify-between">
          <Badge className="border-white/10 bg-white/10 text-white">Wochenziel</Badge>
          <span className="text-xs font-bold">{state.activeDays} von 5 Tagen</span>
        </div>
        <h2 className="mt-5 font-display text-3xl font-semibold leading-tight">
          Du bist deinem Ziel
          <br />
          schon näher.
        </h2>
        <div className="mt-5 flex gap-2">
          {[0, 1, 2, 3, 4].map((day) => (
            <div key={day} className="flex-1">
              <div className={cn("grid aspect-square place-items-center rounded-xl text-xs font-bold", day < state.activeDays ? "bg-[#d8ef73] text-[#214a31]" : "bg-white/10 text-white/55")}>
                {day < state.activeDays ? <Check className="size-4" /> : ["M", "D", "M", "D", "F"][day]}
              </div>
            </div>
          ))}
        </div>
      </div>

      <SectionHeading label="Heute für dich" action="Alle" onAction={() => navigate("challenges")} />
      <button onClick={() => onChallenge(recommended)} className="w-full text-left">
        <Card className="overflow-hidden rounded-[1.65rem] p-0 shadow-[0_12px_35px_rgba(34,67,46,.1)]">
          <div className="flex gap-4 p-5">
            <span className="grid size-14 shrink-0 place-items-center rounded-2xl text-2xl" style={{ backgroundColor: recommended.color }}>
              {recommended.icon}
            </span>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <Badge className="bg-secondary text-primary">Empfohlen</Badge>
                <span className="text-[11px] text-muted-foreground">{recommended.duration}</span>
              </div>
              <h3 className="mt-3 text-lg font-bold leading-tight">{recommended.title}</h3>
              <p className="mt-1 text-xs leading-5 text-muted-foreground">{recommended.short}</p>
            </div>
          </div>
          <div className="flex items-center justify-between border-t bg-[#fbfcf7] px-5 py-3 text-xs font-bold">
            <span className="text-primary">
              {recommended.co2 ? `🌿 ${formatRange(recommended.co2)}` : `🌿 ${recommended.impact} Impact`}
            </span>
            <span className="text-[#b77919]">★ +{recommended.xp} XP</span>
          </div>
        </Card>
      </button>

      <SectionHeading label="Dein Fortschritt" />
      <div className="grid grid-cols-3 gap-2.5">
        <StatCard icon={<Flame />} value={`${state.activeDays}/5`} label="aktive Tage" accent="#e16f32" />
        <StatCard icon={<Leaf />} value={`${state.avoidedMin}–${state.avoidedMax}`} label="kg vermieden" accent="#3f8f4c" />
        <StatCard icon={<Star />} value={`${state.xp}`} label="XP gesammelt" accent="#d49b26" />
      </div>

      <button onClick={() => navigate("planet")} className="mt-5 w-full text-left">
        <Card className="overflow-hidden rounded-[1.6rem] p-0 shadow-sm">
          <AlpineScene compact level={level} />
          <div className="flex items-center gap-4 p-4">
            <div className="flex-1">
              <p className="text-xs font-bold uppercase tracking-[.14em] text-primary">Deine Welt · Level {level}</p>
              <p className="mt-1 font-display text-xl font-semibold">{level >= 5 ? "Lebendige Täler" : "Neue Quellen"}</p>
            </div>
            <ChevronRight className="size-5 text-muted-foreground" />
          </div>
        </Card>
      </button>
    </section>
  );
}

function ChallengesScreen({
  state,
  onChallenge,
}: {
  state: ReturnType<typeof useCarbonState>["state"];
  onChallenge: (challenge: Challenge) => void;
}) {
  const [filter, setFilter] = useState<"Alle" | Category>("Alle");
  const filters: ("Alle" | Category)[] = ["Alle", "Mobilität", "Flüge", "Ernährung", "Wohnen", "Konsum"];
  const visible = filter === "Alle" ? challenges : challenges.filter((item) => item.category === filter);

  return (
    <section className="pb-5">
      <div className="paper-grain bg-[#eef4e9] px-5 pb-6 pt-7">
        <p className="text-xs font-bold uppercase tracking-[.18em] text-primary">Dein nächster Schritt</p>
        <h1 className="mt-2 font-display text-4xl font-semibold">Challenges</h1>
        <p className="mt-2 max-w-[320px] text-sm leading-6 text-muted-foreground">
          Wähle, was heute zu dir passt. Ablehnen kostet nichts.
        </p>
        {state.activeChallengeId && (
          <div className="mt-5 flex items-center gap-3 rounded-2xl bg-[#1f643e] p-4 text-white">
            <span className="grid size-10 place-items-center rounded-xl bg-white/10">⚡</span>
            <div className="flex-1">
              <p className="text-[11px] font-bold uppercase tracking-wider text-white/65">Aktiv</p>
              <p className="text-sm font-bold">{challenges.find((item) => item.id === state.activeChallengeId)?.title}</p>
            </div>
          </div>
        )}
      </div>

      <div className="app-scroll flex gap-2 overflow-x-auto px-5 py-5">
        {filters.map((item) => (
          <Button
            key={item}
            size="sm"
            variant={filter === item ? "default" : "outline"}
            className="h-9 shrink-0 rounded-full px-4"
            onClick={() => setFilter(item)}
          >
            {item}
          </Button>
        ))}
      </div>

      <div className="space-y-3 px-5">
        {visible.map((challenge) => (
          <button key={challenge.id} onClick={() => onChallenge(challenge)} className="w-full text-left">
            <Card className="flex items-center gap-4 rounded-2xl p-4 transition hover:-translate-y-0.5 hover:shadow-md">
              <span className="grid size-14 shrink-0 place-items-center rounded-2xl text-2xl" style={{ backgroundColor: challenge.color }}>
                {challenge.icon}
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 text-[11px] font-bold">
                  <span style={{ color: categoryColors[challenge.category] }}>{challenge.category}</span>
                  <span className="text-muted-foreground">· {challenge.difficulty}</span>
                </div>
                <h3 className="mt-1 truncate text-[15px] font-bold">{challenge.title}</h3>
                <p className="mt-1 text-xs text-muted-foreground">
                  {challenge.co2 ? formatRange(challenge.co2) : `${challenge.impact} Impact`} · +{challenge.xp} XP
                </p>
              </div>
              {state.completedChallenges.includes(challenge.id) ? (
                <span className="grid size-7 place-items-center rounded-full bg-primary text-white"><Check className="size-4" /></span>
              ) : (
                <ChevronRight className="size-4 text-muted-foreground" />
              )}
            </Card>
          </button>
        ))}
      </div>
    </section>
  );
}

function ChallengeDetail({
  challenge,
  active,
  onBack,
  onToggle,
  onComplete,
}: {
  challenge: Challenge;
  active: boolean;
  onBack: () => void;
  onToggle: () => void;
  onComplete: () => void;
}) {
  return (
    <section className="min-h-[100dvh] pb-7">
      <div className="relative overflow-hidden px-5 pb-8 pt-5" style={{ backgroundColor: challenge.color }}>
        <TopBar title="Challenge" onBack={onBack} right={<Heart className="size-5" />} />
        <div className="mx-auto mt-10 grid size-44 place-items-center rounded-full border-[12px] border-white/50 bg-white/40 text-7xl shadow-[0_25px_55px_rgba(31,73,48,.13)]">
          {challenge.icon}
        </div>
      </div>
      <div className="px-5 pt-7">
        <div className="flex items-center gap-2">
          <Badge className="bg-secondary text-primary">{challenge.impact} Impact</Badge>
          <Badge variant="outline">{challenge.category}</Badge>
        </div>
        <h1 className="mt-4 font-display text-[2.45rem] font-semibold leading-[1.02]">{challenge.title}</h1>
        <p className="mt-3 text-sm leading-6 text-muted-foreground">{challenge.short}</p>

        <div className="mt-6 grid grid-cols-2 gap-3">
          <Metric icon={<Leaf />} label="Klimawirkung" value={challenge.co2 ? formatRange(challenge.co2, "kg") : challenge.impact} />
          <Metric icon={<Star />} label="Belohnung" value={`+${challenge.xp} XP`} />
        </div>

        <div className="mt-6 rounded-2xl border bg-[#fafbf6] p-4">
          <p className="text-xs font-bold uppercase tracking-[.14em] text-muted-foreground">So geht&apos;s</p>
          <div className="mt-4 space-y-4">
            {challenge.steps.map((step, index) => (
              <div key={step} className="flex items-center gap-3 text-sm">
                <span className="grid size-7 place-items-center rounded-full bg-secondary text-xs font-bold text-primary">{index + 1}</span>
                <span className="font-semibold">{step}</span>
              </div>
            ))}
          </div>
        </div>

        <Accordion className="mt-4 rounded-2xl border px-4">
          <AccordionItem value="calculation">
            <AccordionTrigger className="text-sm font-bold">Wie berechnen wir das?</AccordionTrigger>
            <AccordionContent className="text-xs leading-5 text-muted-foreground">
              {challenge.co2
                ? "Die Bandbreite vergleicht die Challenge mit deinem üblichen Referenzverhalten. Für den Prototyp nutzen wir zentral gepflegte Demo-Faktoren mit mittlerer Datenqualität."
                : "Für diese Handlung ist eine belastbare kg-Angabe ohne weitere Daten nicht sinnvoll. Deshalb zeigen wir eine qualitative Impact-Stufe."}
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        {active ? (
          <div className="mt-6 space-y-3">
            <Button onClick={onComplete} className="h-14 w-full rounded-2xl text-base font-bold">
              Als geschafft markieren <Check className="ml-1" />
            </Button>
            <Button onClick={onToggle} variant="ghost" className="h-11 w-full rounded-xl text-muted-foreground">
              Challenge beenden
            </Button>
          </div>
        ) : (
          <Button onClick={onToggle} className="mt-6 h-14 w-full rounded-2xl text-base font-bold">
            Challenge annehmen <Zap className="ml-1" />
          </Button>
        )}
      </div>
    </section>
  );
}

function ActivityCapture({
  onClose,
  onSave,
}: {
  onClose: () => void;
  onSave: (activity: Omit<ActivityItem, "id" | "date">) => void;
}) {
  const options = [
    { title: "ÖV statt Auto", category: "Mobilität", icon: "🚆", xp: 20, co2Min: 2, co2Max: 4 },
    { title: "Vegetarische Mahlzeit", category: "Ernährung", icon: "🥗", xp: 15, co2Min: 1, co2Max: 2 },
    { title: "Kurzer Weg per Velo", category: "Mobilität", icon: "🚲", xp: 15, co2Min: 0.5, co2Max: 1 },
    { title: "Resteküche", category: "Ernährung", icon: "🥕", xp: 10, co2Min: 0, co2Max: 0 },
    { title: "Repariert statt ersetzt", category: "Konsum", icon: "🧵", xp: 25, co2Min: 0, co2Max: 0 },
    { title: "Energie gespart", category: "Wohnen", icon: "💡", xp: 10, co2Min: 0, co2Max: 0 },
  ];
  const [selected, setSelected] = useState(options[0]);

  return (
    <section className="flex min-h-[100dvh] flex-col px-5 pb-6 pt-5">
      <TopBar title="Aktivität erfassen" onBack={onClose} />
      <div className="mt-9">
        <p className="text-xs font-bold uppercase tracking-[.18em] text-primary">Was hast du bewegt?</p>
        <h1 className="mt-2 font-display text-4xl font-semibold leading-tight">Jeder bewusste Schritt zählt.</h1>
        <p className="mt-3 text-sm leading-6 text-muted-foreground">Wähle die Aktivität, die am besten passt.</p>
      </div>
      <div className="mt-7 grid grid-cols-2 gap-3">
        {options.map((option) => (
          <button
            key={option.title}
            onClick={() => setSelected(option)}
            className={cn(
              "min-h-32 rounded-2xl border bg-white p-4 text-left transition",
              selected.title === option.title && "border-primary bg-[#f2f8ee] ring-2 ring-primary/10",
            )}
          >
            <span className="text-2xl">{option.icon}</span>
            <span className="mt-3 block text-sm font-bold leading-tight">{option.title}</span>
            <span className="mt-1 block text-[11px] text-muted-foreground">{option.category}</span>
          </button>
        ))}
      </div>
      <Card className="mt-5 rounded-2xl bg-[#f7f8f2] p-4 shadow-none">
        <div className="flex items-center justify-between text-sm">
          <span className="font-semibold text-muted-foreground">Geschätzte Wirkung</span>
          <strong>{selected.co2Max ? `${selected.co2Min}–${selected.co2Max} kg CO₂e` : `${selected.category}-Impact`}</strong>
        </div>
        <div className="mt-3 flex items-center justify-between text-sm">
          <span className="font-semibold text-muted-foreground">Belohnung</span>
          <strong className="text-[#b77919]">+{selected.xp} XP</strong>
        </div>
      </Card>
      <Button onClick={() => onSave(selected)} className="mt-auto h-14 rounded-2xl text-base font-bold">
        Aktivität speichern <Check className="ml-1" />
      </Button>
    </section>
  );
}

function SuccessScreen({
  title,
  state,
  onHome,
  onPlanet,
}: {
  title: string;
  state: ReturnType<typeof useCarbonState>["state"];
  onHome: () => void;
  onPlanet: () => void;
}) {
  const latest = state.activities[0];

  return (
    <section className="paper-grain flex min-h-[100dvh] flex-col bg-[linear-gradient(155deg,#edf6df_0%,#fffef9_55%)] px-6 py-8 text-center">
      <Brand />
      <div className="mx-auto mt-14 grid size-40 place-items-center rounded-full bg-[#dff0be] shadow-[0_25px_60px_rgba(44,102,54,.2)]">
        <div className="grid size-28 place-items-center rounded-full bg-primary text-white">
          <Trophy className="size-12" />
        </div>
      </div>
      <p className="mt-8 text-xs font-bold uppercase tracking-[.2em] text-primary">Wirkung sichtbar</p>
      <h1 className="mt-2 font-display text-[2.8rem] font-semibold leading-tight">{title}</h1>
      <p className="mx-auto mt-3 max-w-[300px] text-sm leading-6 text-muted-foreground">
        {latest?.title ?? "Deine Aktivität"} bringt deine Woche und deine Welt ein Stück weiter.
      </p>
      <div className="mt-8 grid grid-cols-2 gap-3">
        <Card className="rounded-2xl p-5 text-center">
          <Leaf className="mx-auto size-5 text-primary" />
          <p className="mt-3 font-display text-2xl font-semibold">
            {latest?.co2Max ? `${latest.co2Min}–${latest.co2Max}` : "Positiv"}
          </p>
          <p className="mt-1 text-[11px] text-muted-foreground">{latest?.co2Max ? "kg CO₂e vermieden" : "qualitativer Impact"}</p>
        </Card>
        <Card className="rounded-2xl p-5 text-center">
          <Star className="mx-auto size-5 text-[#d29325]" />
          <p className="mt-3 font-display text-2xl font-semibold">+{latest?.xp ?? 10}</p>
          <p className="mt-1 text-[11px] text-muted-foreground">XP gesammelt</p>
        </Card>
      </div>
      <div className="mt-auto space-y-3 pt-9">
        <Button onClick={onPlanet} className="h-14 w-full rounded-2xl text-base font-bold">Meine Welt ansehen</Button>
        <Button onClick={onHome} variant="ghost" className="h-11 w-full rounded-xl">Zurück nach Hause</Button>
      </div>
    </section>
  );
}

function PlanetScreen({ state }: { state: ReturnType<typeof useCarbonState>["state"] }) {
  const level = getLevel(state.xp);
  const levelStart = (level - 1) * 300;
  const progress = ((state.xp - levelStart) / 300) * 100;

  return (
    <section className="min-h-[100dvh] bg-[#f8fbf6]">
      <div className="relative">
        <AlpineScene level={level} />
        <div className="absolute bottom-5 left-5 right-5 rounded-2xl bg-white/90 p-4 shadow-xl backdrop-blur">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[.15em] text-primary">Meine Welt</p>
              <h1 className="mt-1 font-display text-2xl font-semibold">Level {level} · Neue Quellen</h1>
            </div>
            <span className="text-xs font-bold text-muted-foreground">{state.xp - levelStart} / 300 XP</span>
          </div>
          <Progress value={progress} className="mt-3 h-2.5" />
        </div>
      </div>
      <div className="px-5 pb-5 pt-7">
        <p className="text-sm leading-6 text-muted-foreground">
          Deine Welt reagiert auf konsequente Gewohnheiten. Sie ist ein Motivationsbild – keine Verrechnung realer Emissionen.
        </p>
        <SectionHeading label="Nächste Entwicklung" />
        <Card className="flex items-center gap-4 rounded-2xl p-4">
          <span className="grid size-12 place-items-center rounded-2xl bg-secondary text-2xl">🌲</span>
          <div className="flex-1">
            <p className="font-bold">Ein kleiner Wald entsteht</p>
            <p className="mt-1 text-xs text-muted-foreground">Noch {Math.max(0, 300 - (state.xp - levelStart))} XP bis zur nächsten Entwicklung</p>
          </div>
          <LockKeyhole className="size-4 text-muted-foreground" />
        </Card>
        <SectionHeading label="Bereits gewachsen" />
        <div className="grid grid-cols-3 gap-3">
          {["💧 Quelle", "🌿 Wiese", "🪨 Ufer"].map((item) => (
            <div key={item} className="rounded-2xl border bg-white p-3 text-center text-xs font-bold">
              <span className="mb-2 block text-2xl">{item.split(" ")[0]}</span>
              {item.split(" ")[1]}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ImpactScreen({ state }: { state: ReturnType<typeof useCarbonState>["state"] }) {
  const baseline = state.baseline;
  const currentMin = baseline ? Math.max(0, baseline.total.min * (1 - state.goalPercent / 100 / 2)) : 6.4;
  const currentMax = baseline ? Math.max(0, baseline.total.max * (1 - state.goalPercent / 100 / 2)) : 8.2;

  return (
    <section className="px-5 pb-5 pt-7">
      <p className="text-xs font-bold uppercase tracking-[.18em] text-primary">Deine Entwicklung</p>
      <h1 className="mt-2 font-display text-4xl font-semibold">Impact</h1>
      <Card className="mt-6 overflow-hidden rounded-[1.75rem] bg-[#193f2d] p-5 text-white">
        <div className="flex items-center justify-between">
          <Badge className="bg-white/10 text-white">Jahresziel</Badge>
          <Target className="size-5 text-[#d9ee72]" />
        </div>
        <p className="mt-6 font-display text-4xl font-semibold">{state.goalPercent}% weniger</p>
        <p className="mt-2 text-sm text-white/65">gegenüber deinem persönlichen Startwert</p>
        <Progress value={42} className="mt-6 h-2.5 bg-white/15" />
        <p className="mt-2 text-right text-[11px] text-white/60">42% auf dem Weg</p>
      </Card>

      <SectionHeading label="Deine Schätzung" />
      <div className="rounded-2xl border bg-white p-5">
        <div className="flex h-40 items-end gap-8 px-6">
          <ChartBar height={88} label="Start" value={baseline ? `${baseline.total.min}–${baseline.total.max} t` : "7–9 t"} muted />
          <ChartBar height={68} label="Heute" value={`${currentMin.toFixed(1)}–${currentMax.toFixed(1)} t`} />
          <ChartBar height={48} label="Ziel" value="-18%" accent />
        </div>
      </div>

      <SectionHeading label="Kategorien" />
      <div className="space-y-3">
        {(baseline?.levers ?? ["Flüge", "Mobilität", "Ernährung"]).map((category, index) => (
          <Card key={category} className="rounded-2xl p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="size-3 rounded-full" style={{ backgroundColor: categoryColors[category as Category] }} />
                <span className="text-sm font-bold">{category}</span>
              </div>
              <span className="text-xs font-bold text-primary">-{[8, 14, 6][index]}%</span>
            </div>
            <Progress value={[28, 54, 20][index]} className="mt-3 h-2 bg-[#eef0e9]" />
          </Card>
        ))}
      </div>

      <SectionHeading label="Letzte Aktivitäten" />
      <div className="space-y-2">
        {state.activities.length ? (
          state.activities.slice(0, 4).map((activity) => (
            <div key={activity.id} className="flex items-center gap-3 rounded-2xl border bg-white p-3">
              <span className="grid size-10 place-items-center rounded-xl bg-secondary text-xl">{activity.icon}</span>
              <div className="flex-1">
                <p className="text-sm font-bold">{activity.title}</p>
                <p className="text-[11px] text-muted-foreground">{activity.date} · +{activity.xp} XP</p>
              </div>
              <span className="text-xs font-bold text-primary">
                {activity.co2Max ? `${activity.co2Min}–${activity.co2Max} kg` : "Impact"}
              </span>
            </div>
          ))
        ) : (
          <div className="rounded-2xl border border-dashed p-6 text-center text-sm text-muted-foreground">
            Deine ersten Aktivitäten erscheinen hier.
          </div>
        )}
      </div>
    </section>
  );
}

function LearnScreen({
  state,
  onLesson,
}: {
  state: ReturnType<typeof useCarbonState>["state"];
  onLesson: (lesson: (typeof lessons)[number]) => void;
}) {
  return (
    <section className="pb-5">
      <div className="paper-grain bg-[#f2edda] px-5 pb-7 pt-7">
        <p className="text-xs font-bold uppercase tracking-[.18em] text-[#8a6928]">Climate Bites</p>
        <h1 className="mt-2 font-display text-4xl font-semibold">Verstehen, was wirkt.</h1>
        <p className="mt-3 max-w-[320px] text-sm leading-6 text-muted-foreground">
          Kurze Wissenshäppchen, die Grössenordnungen greifbar machen.
        </p>
        <div className="mt-5 flex items-center gap-3 rounded-2xl bg-white/65 p-4">
          <div className="grid size-11 place-items-center rounded-xl bg-[#eadcae]"><BookOpen className="size-5" /></div>
          <div className="flex-1">
            <p className="text-sm font-bold">{state.completedLessons.length} von {lessons.length} abgeschlossen</p>
            <Progress value={(state.completedLessons.length / lessons.length) * 100} className="mt-2 h-2" />
          </div>
        </div>
      </div>
      <div className="space-y-3 px-5 pt-5">
        {lessons.map((lesson, index) => {
          const done = state.completedLessons.includes(lesson.id);
          return (
            <button key={lesson.id} onClick={() => onLesson(lesson)} className="w-full text-left">
              <Card className="flex items-center gap-4 rounded-2xl p-4 transition hover:-translate-y-0.5">
                <span className="grid size-14 shrink-0 place-items-center rounded-2xl bg-[#f1eedf] text-2xl">{lesson.icon}</span>
                <div className="min-w-0 flex-1">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-[#8a6928]">Bite {index + 1} · {lesson.minutes} min</p>
                  <h3 className="mt-1 truncate text-[15px] font-bold">{lesson.title}</h3>
                  <p className="mt-1 text-xs text-muted-foreground">{lesson.category} · +{lesson.xp} XP</p>
                </div>
                {done ? <Check className="size-5 text-primary" /> : <ChevronRight className="size-4 text-muted-foreground" />}
              </Card>
            </button>
          );
        })}
      </div>
    </section>
  );
}

function LessonDetail({
  lesson,
  completed,
  onBack,
  onComplete,
}: {
  lesson: (typeof lessons)[number];
  completed: boolean;
  onBack: () => void;
  onComplete: () => void;
}) {
  return (
    <section className="flex min-h-[100dvh] flex-col px-5 pb-6 pt-5">
      <TopBar title="Climate Bite" onBack={onBack} right={<Badge className="bg-[#f0e5bd] text-[#795b20]">{lesson.minutes} min</Badge>} />
      <div className="mx-auto mt-12 grid size-36 place-items-center rounded-[2.5rem] bg-[#f2ecd7] text-6xl shadow-[0_20px_50px_rgba(92,73,35,.12)]">
        {lesson.icon}
      </div>
      <div className="mt-10">
        <p className="text-xs font-bold uppercase tracking-[.18em] text-[#8a6928]">{lesson.category}</p>
        <h1 className="mt-2 font-display text-[2.7rem] font-semibold leading-[1.03]">{lesson.title}</h1>
        <p className="mt-5 text-base leading-7 text-muted-foreground">{lesson.intro}</p>
      </div>
      <Card className="mt-6 rounded-2xl border-[#e9dfbf] bg-[#fbf7e9] p-5">
        <p className="text-xs font-bold uppercase tracking-[.14em] text-[#896720]">Gut zu wissen</p>
        <p className="mt-3 text-sm font-semibold leading-6">{lesson.fact}</p>
      </Card>
      <div className="mt-4 flex gap-3 rounded-2xl bg-secondary p-4">
        <Sparkles className="mt-0.5 size-5 shrink-0 text-primary" />
        <p className="text-sm leading-6"><strong>Dein nächster Schritt:</strong> {lesson.action}</p>
      </div>
      <Button onClick={onComplete} className="mt-auto h-14 rounded-2xl text-base font-bold">
        {completed ? "Zurück zur Übersicht" : `Bite abschliessen · +${lesson.xp} XP`}
      </Button>
    </section>
  );
}

function ProfileScreen({
  state,
  store,
  onRecheck,
  onReset,
}: {
  state: ReturnType<typeof useCarbonState>["state"];
  store: ReturnType<typeof useCarbonState>;
  onRecheck: () => void;
  onReset: () => void;
}) {
  const [resetOpen, setResetOpen] = useState(false);

  return (
    <section className="px-5 pb-5 pt-7">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[.18em] text-primary">Persönlicher Bereich</p>
          <h1 className="mt-2 font-display text-4xl font-semibold">Dein Profil</h1>
        </div>
        <Settings className="size-5 text-muted-foreground" />
      </div>

      <Card className="mt-6 flex items-center gap-4 rounded-[1.6rem] p-5">
        <div className="grid size-16 place-items-center rounded-2xl bg-secondary font-display text-2xl font-semibold text-primary">
          {state.profile.name.charAt(0).toUpperCase()}
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-lg font-bold">{state.profile.name}</p>
          <p className="truncate text-sm text-muted-foreground">{state.profile.email}</p>
          <Badge className="mt-2 bg-[#edf4e7] text-primary">Lokales Demo-Profil</Badge>
        </div>
      </Card>

      <SectionHeading label="Dein Klima-Check" />
      <button onClick={onRecheck} className="w-full">
        <SettingsRow icon={<RotateCcw />} title="Klima-Check aktualisieren" note="Dein ursprünglicher Startwert bleibt vergleichbar" />
      </button>
      <div className="mt-2">
        <SettingsRow icon={<Info />} title="Berechnungsmodell" note={state.baseline?.model ?? "Noch kein Modell"} />
      </div>

      <SectionHeading label="Einstellungen" />
      <div className="overflow-hidden rounded-2xl border bg-white">
        <div className="flex items-center gap-3 p-4">
          <span className="grid size-10 place-items-center rounded-xl bg-secondary text-primary"><Bell className="size-4" /></span>
          <div className="flex-1">
            <p className="text-sm font-bold">Sanfte Erinnerungen</p>
            <p className="text-[11px] text-muted-foreground">Keine harten Streak-Warnungen</p>
          </div>
          <Switch checked={state.notifications} onCheckedChange={(checked) => store.update({ notifications: checked })} />
        </div>
        <div className="border-t">
          <button onClick={store.exportData} className="flex w-full items-center gap-3 p-4 text-left">
            <span className="grid size-10 place-items-center rounded-xl bg-secondary text-primary"><Download className="size-4" /></span>
            <div className="flex-1">
              <p className="text-sm font-bold">Daten exportieren</p>
              <p className="text-[11px] text-muted-foreground">Als lesbare JSON-Datei</p>
            </div>
            <ChevronRight className="size-4 text-muted-foreground" />
          </button>
        </div>
      </div>

      <SectionHeading label="Privatsphäre" />
      <div className="rounded-2xl bg-[#eef5e9] p-4">
        <div className="flex gap-3">
          <LockKeyhole className="mt-0.5 size-5 shrink-0 text-primary" />
          <div>
            <p className="text-sm font-bold">Privacy by default</p>
            <p className="mt-1 text-xs leading-5 text-muted-foreground">
              Dieser Prototyp sendet keine Profildaten an einen Server. Alles bleibt im lokalen Browser-Speicher.
            </p>
          </div>
        </div>
      </div>

      <Button onClick={() => setResetOpen(true)} variant="ghost" className="mt-7 h-11 w-full rounded-xl text-destructive">
        Lokale Daten zurücksetzen
      </Button>

      <Dialog open={resetOpen} onOpenChange={setResetOpen}>
        <DialogContent className="rounded-3xl">
          <DialogHeader>
            <DialogTitle className="font-display text-2xl">Wirklich neu beginnen?</DialogTitle>
            <DialogDescription>Klima-Check, XP, Aktivitäten und deine Welt werden nur in diesem Browser gelöscht.</DialogDescription>
          </DialogHeader>
          <DialogFooter className="rounded-b-3xl">
            <Button variant="outline" onClick={() => setResetOpen(false)}>Abbrechen</Button>
            <Button variant="destructive" onClick={onReset}>Daten löschen</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </section>
  );
}

function TopBar({ title, onBack, right }: { title: string; onBack: () => void; right?: React.ReactNode }) {
  return (
    <div className="flex h-10 items-center justify-between">
      <Button variant="ghost" size="icon" className="rounded-full" onClick={onBack} aria-label="Zurück">
        <ArrowLeft />
      </Button>
      <p className="text-sm font-bold">{title}</p>
      <div className="grid min-w-8 place-items-center">{right}</div>
    </div>
  );
}

function SectionHeading({ label, action, onAction }: { label: string; action?: string; onAction?: () => void }) {
  return (
    <div className="mb-3 mt-7 flex items-center justify-between">
      <h2 className="font-display text-xl font-semibold">{label}</h2>
      {action && (
        <button onClick={onAction} className="text-xs font-bold text-primary">
          {action} <ChevronRight className="inline size-3.5" />
        </button>
      )}
    </div>
  );
}

function StatCard({ icon, value, label, accent }: { icon: React.ReactNode; value: string; label: string; accent: string }) {
  return (
    <Card className="rounded-2xl px-2 py-4 text-center shadow-none">
      <div className="mx-auto size-5 [&>svg]:size-5" style={{ color: accent }}>{icon}</div>
      <p className="mt-2 text-base font-bold">{value}</p>
      <p className="mt-1 text-[10px] leading-tight text-muted-foreground">{label}</p>
    </Card>
  );
}

function Metric({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <Card className="rounded-2xl p-4 shadow-none">
      <div className="size-5 text-primary [&>svg]:size-5">{icon}</div>
      <p className="mt-3 text-[11px] text-muted-foreground">{label}</p>
      <p className="mt-1 text-sm font-bold">{value}</p>
    </Card>
  );
}

function ChartBar({ height, label, value, muted, accent }: { height: number; label: string; value: string; muted?: boolean; accent?: boolean }) {
  return (
    <div className="flex flex-1 flex-col items-center">
      <span className="mb-2 whitespace-nowrap text-[10px] font-bold">{value}</span>
      <div
        className={cn("w-full rounded-t-xl", muted ? "bg-[#cdd4cc]" : accent ? "bg-[#d9ec72]" : "bg-primary")}
        style={{ height }}
      />
      <span className="mt-2 text-[11px] text-muted-foreground">{label}</span>
    </div>
  );
}

function SettingsRow({ icon, title, note }: { icon: React.ReactNode; title: string; note: string }) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border bg-white p-4 text-left">
      <span className="grid size-10 place-items-center rounded-xl bg-secondary text-primary [&>svg]:size-4">{icon}</span>
      <div className="flex-1">
        <p className="text-sm font-bold">{title}</p>
        <p className="mt-0.5 text-[11px] text-muted-foreground">{note}</p>
      </div>
      <ChevronRight className="size-4 text-muted-foreground" />
    </div>
  );
}

function BottomNav({ screen, navigate }: { screen: Screen; navigate: (screen: Screen) => void }) {
  const items: { screen: Screen; label: string; icon: React.ReactNode }[] = [
    { screen: "home", label: "Home", icon: <Home /> },
    { screen: "challenges", label: "Challenges", icon: <Zap /> },
    { screen: "planet", label: "Planet", icon: <Map /> },
    { screen: "impact", label: "Impact", icon: <BarChart3 /> },
    { screen: "learn", label: "Lernen", icon: <BookOpen /> },
  ];

  return (
    <nav className="fixed bottom-0 left-1/2 z-20 grid h-[4.6rem] w-full max-w-[430px] -translate-x-1/2 grid-cols-6 items-center border-t bg-[#fffef9]/95 px-2 pb-2 pt-2 shadow-[0_-8px_30px_rgba(28,55,37,.08)] backdrop-blur">
      {items.map((item, index) => {
        const active = item.screen === screen;
        return (
          <span key={item.label} className="contents">
            {index === 2 && <span aria-hidden="true" />}
            <button
              onClick={() => navigate(item.screen)}
              className={cn("flex flex-col items-center gap-1 text-[9px] font-bold text-muted-foreground", active && "text-primary")}
            >
              <span className="[&>svg]:size-5">{item.icon}</span>
              {item.label}
            </button>
          </span>
        );
      })}
    </nav>
  );
}

function getLevel(xp: number) {
  return Math.max(1, Math.min(6, Math.floor(xp / 300) + 1));
}

function getRecommended(state: ReturnType<typeof useCarbonState>["state"]) {
  const motivation = state.answers.motivation;
  const category =
    motivation === "food" ? "Ernährung" : motivation === "home" ? "Wohnen" : motivation === "consumption" ? "Konsum" : "Mobilität";
  return challenges.find((challenge) => challenge.category === category && !state.completedChallenges.includes(challenge.id)) ?? challenges[0];
}
