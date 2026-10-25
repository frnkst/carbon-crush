import Image from "next/image";
import { cn } from "@/lib/utils";

const levelNames = [
  "Erste Lichtung",
  "Klares Wasser",
  "Neue Quellen",
  "Blühende Ufer",
  "Lebendige Wälder",
  "Vielfältiges Tal",
];

export function getPlanetLevelName(level: number) {
  return levelNames[Math.max(0, Math.min(levelNames.length - 1, level - 1))];
}

export function AlpineScene({
  level = 3,
  compact = false,
  className,
}: {
  level?: number;
  compact?: boolean;
  className?: string;
}) {
  const safeLevel = Math.max(1, Math.min(6, level));
  const filters = [
    "saturate(.55) brightness(.82) contrast(.92)",
    "saturate(.72) brightness(.9) contrast(.96)",
    "saturate(.88) brightness(.96)",
    "saturate(1.02) brightness(1)",
    "saturate(1.12) brightness(1.03)",
    "saturate(1.2) brightness(1.06) contrast(1.02)",
  ];

  return (
    <div
      className={cn(
        "paper-grain relative isolate overflow-hidden bg-[#d9edf0]",
        compact ? "h-36 rounded-[1.5rem]" : "h-[28rem] rounded-b-[2.25rem]",
        className,
      )}
      aria-label={`Alpine Landschaft auf Entwicklungsstufe ${safeLevel}`}
    >
      <Image
        src="/images/carboncrush-valley.webp"
        alt=""
        fill
        priority={!compact}
        sizes={compact ? "390px" : "430px"}
        className="object-cover transition-[filter,transform] duration-700"
        style={{
          filter: filters[safeLevel - 1],
          transform: `scale(${1.1 - safeLevel * 0.012})`,
        }}
      />

      {safeLevel === 1 && <div className="absolute inset-0 bg-[#243b32]/20" />}
      {safeLevel >= 2 && (
        <div className="absolute inset-x-0 bottom-[13%] h-[18%] bg-[linear-gradient(transparent,rgba(93,199,220,.18),transparent)] mix-blend-screen" />
      )}
      {safeLevel >= 3 && (
        <>
          <Tree className="left-[6%] bottom-[8%] scale-90" />
          <Tree className="right-[7%] bottom-[12%] scale-75" />
        </>
      )}
      {safeLevel >= 4 && (
        <div className="absolute inset-x-[8%] bottom-[6%] flex justify-around text-[10px] drop-shadow-sm">
          <span>🌼</span><span>🌿</span><span>🌻</span><span>🌱</span><span>🌼</span>
        </div>
      )}
      {safeLevel >= 5 && (
        <>
          <Bird className="left-[23%] top-[18%]" />
          <Bird className="right-[20%] top-[23%] scale-75" />
          <div className="absolute right-[9%] top-[9%] size-14 rounded-full bg-[#fff5bd]/75 blur-[1px] shadow-[0_0_45px_18px_rgba(255,243,172,.32)]" />
        </>
      )}
      {safeLevel >= 6 && (
        <>
          <span className="absolute bottom-[23%] left-[18%] text-sm drop-shadow">🦋</span>
          <span className="absolute bottom-[29%] right-[25%] text-sm drop-shadow">🦌</span>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_44%,rgba(255,255,255,.14),transparent_32%)]" />
        </>
      )}

      {!compact && (
        <div className="absolute left-1/2 top-7 -translate-x-1/2 whitespace-nowrap rounded-full border border-white/70 bg-white/85 px-4 py-2 text-xs font-bold tracking-wide text-[#28573a] shadow-sm backdrop-blur">
          🌿 Level {safeLevel} — {getPlanetLevelName(safeLevel)}
        </div>
      )}
    </div>
  );
}

function Tree({ className }: { className?: string }) {
  return (
    <div className={cn("absolute h-20 w-12 drop-shadow-md", className)} aria-hidden="true">
      <div className="absolute bottom-0 left-1/2 h-8 w-1.5 -translate-x-1/2 rounded-full bg-[#765339]" />
      <div className="absolute bottom-4 left-1/2 size-10 -translate-x-1/2 rounded-[55%_55%_48%_48%] bg-[#2f7040]" />
      <div className="absolute bottom-9 left-1/2 size-8 -translate-x-1/2 rounded-[55%_55%_48%_48%] bg-[#3f8548]" />
    </div>
  );
}

function Bird({ className }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn("absolute h-3 w-8 before:absolute before:left-0 before:top-0 before:h-2 before:w-4 before:rotate-12 before:rounded-[100%_0] before:border-t-2 before:border-[#334d48] after:absolute after:right-0 after:top-0 after:h-2 after:w-4 after:-rotate-12 after:rounded-[0_100%] after:border-t-2 after:border-[#334d48]", className)}
    />
  );
}

export function WelcomeGlobe() {
  return (
    <div className="relative mx-auto h-64 w-64">
      <Image
        src="/images/carboncrush-earth-transparent.webp"
        alt="Die Erde mit Blick auf Europa und Afrika"
        fill
        priority
        sizes="256px"
        className="pulse-soft object-contain drop-shadow-[0_24px_28px_rgba(27,75,53,.2)]"
      />
    </div>
  );
}
