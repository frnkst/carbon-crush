import { cn } from "@/lib/utils";

export function AlpineScene({
  level = 3,
  compact = false,
  className,
}: {
  level?: number;
  compact?: boolean;
  className?: string;
}) {
  const lush = Math.min(1, level / 6);

  return (
    <div
      className={cn(
        "paper-grain relative isolate overflow-hidden bg-[#d9edf0]",
        compact ? "h-32 rounded-[1.5rem]" : "h-[25rem] rounded-b-[2.25rem]",
        className,
      )}
      aria-label={`Alpine Landschaft auf Entwicklungsstufe ${level}`}
    >
      <div className="absolute inset-x-0 top-0 h-1/2 bg-[linear-gradient(#c7e9f0,#eef4dc)]" />
      <div className="absolute left-8 top-10 h-2 w-12 rounded-full bg-white/70 blur-[1px]" />
      <div className="absolute right-10 top-16 h-1.5 w-8 rounded-full bg-white/65" />
      <svg
        viewBox="0 0 430 420"
        className="absolute inset-x-0 bottom-0 h-[88%] w-full"
        preserveAspectRatio="xMidYMax slice"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="mountainBack" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#cbd9cf" />
            <stop offset="1" stopColor="#8eaa98" />
          </linearGradient>
          <linearGradient id="mountainFront" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#a8c0a8" />
            <stop offset="1" stopColor="#47785b" />
          </linearGradient>
          <linearGradient id="water" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#8dd4db" />
            <stop offset="1" stopColor="#3e9ca6" />
          </linearGradient>
        </defs>
        <path d="M-20 246 100 96l48 61 65-97 116 149 49-63 82 106v88H-20z" fill="url(#mountainBack)" />
        <path d="m100 96 18 53 30 8-48 4-32 36zM213 60l30 70 32 28-61-18-48 35z" fill="#eef5ed" opacity=".9" />
        <path d="M-20 271 73 180l69 76 72-112 92 118 66-82 88 103v76H-20z" fill="url(#mountainFront)" />
        <path d="M-20 279c74-23 117-11 174 17 57 29 124 2 175-12 51-13 84 0 131 25v111H-20z" fill="#5f994d" />
        <path d="M121 420c30-58 99-70 91-142-5-40 33-55 57-67-15 29-19 53 2 77 36 43 1 91-14 132z" fill="url(#water)" />
        <path d="M140 420c27-59 78-77 76-132M209 302c18 22 34 35 46 51" fill="none" stroke="#d7f4ef" strokeWidth="5" opacity=".65" />
        {lush > 0.25 && (
          <g fill="#245d36">
            <path d="m35 292 18-56 18 56zM57 306l20-67 22 67zM328 300l19-62 21 62zM365 319l20-70 22 70z" />
          </g>
        )}
        {lush > 0.55 && (
          <g fill="#347943">
            <path d="m15 332 17-53 18 53zM91 327l18-59 19 59zM298 336l17-54 18 54zM397 348l14-48 16 48z" />
          </g>
        )}
        {lush > 0.8 && (
          <g fill="#f2d56f">
            <circle cx="76" cy="350" r="3" />
            <circle cx="105" cy="372" r="3" />
            <circle cx="320" cy="365" r="3" />
            <circle cx="358" cy="344" r="3" />
          </g>
        )}
      </svg>
      {!compact && (
        <div className="absolute left-1/2 top-7 -translate-x-1/2 rounded-full border border-white/70 bg-white/80 px-4 py-2 text-xs font-bold tracking-wide text-[#28573a] shadow-sm backdrop-blur">
          🌿 Level {level} — {level >= 5 ? "Lebendige Täler" : "Neue Quellen"}
        </div>
      )}
    </div>
  );
}

export function WelcomeGlobe() {
  return (
    <div className="relative mx-auto h-64 w-64">
      <div className="pulse-soft absolute inset-5 rounded-full bg-[#b5dbe2] shadow-[0_30px_70px_rgba(27,75,53,.24)]" />
      <div className="paper-grain absolute inset-5 overflow-hidden rounded-full border-[10px] border-white/65 bg-[linear-gradient(155deg,#9edbe8,#438ba7)]">
        <div className="absolute -left-5 top-12 h-24 w-28 rotate-12 rounded-[42%] bg-[#70ad54]" />
        <div className="absolute right-1 top-4 h-36 w-24 -rotate-12 rounded-[48%] bg-[#4f964b]" />
        <div className="absolute bottom-5 right-14 h-16 w-20 rounded-[45%] bg-[#70af53]" />
        <div className="absolute left-12 top-8 h-10 w-16 rotate-12 rounded-full bg-white/25 blur-md" />
      </div>
      <div className="absolute bottom-7 left-0 h-10 w-24 rounded-full bg-white/90 blur-[1px]" />
      <div className="absolute bottom-4 right-0 h-12 w-28 rounded-full bg-white/90 blur-[1px]" />
      <span className="absolute right-7 top-2 text-3xl">🌱</span>
    </div>
  );
}
