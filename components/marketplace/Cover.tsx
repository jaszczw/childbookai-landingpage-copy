import { cn } from "@/utils";

const PALETTES = [
  ["#B0F2F6", "#54E6ED"],
  ["#FBCFE8", "#F9A8D4"],
  ["#D1FAE5", "#6EE7B7"],
  ["#FFEDD5", "#FDBA74"],
  ["#E0E7FF", "#A5B4FC"],
] as const;

function paletteFor(seed: string): readonly [string, string] {
  let total = 0;
  for (let i = 0; i < seed.length; i += 1) {
    total = (total + seed.charCodeAt(i)) % 1000;
  }
  return PALETTES[total % PALETTES.length] ?? PALETTES[0];
}

export type CoverProps = {
  src?: string | null;
  alt: string;
  seed: string;
  className?: string;
  imgClassName?: string;
  rounded?: string;
};

export function Cover({
  src,
  alt,
  seed,
  className,
  imgClassName,
  rounded = "rounded-2xl",
}: CoverProps) {
  if (src) {
    return (
      <div
        className={cn(
          "relative overflow-hidden bg-blue-100",
          rounded,
          className,
        )}
      >
        {/* Use plain <img> to avoid having to whitelist every CDN host in next.config */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={alt}
          loading="lazy"
          className={cn(
            "h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]",
            imgClassName,
          )}
        />
      </div>
    );
  }

  const [c1, c2] = paletteFor(seed);

  return (
    <div
      role="img"
      aria-label={alt}
      className={cn(
        "relative overflow-hidden",
        rounded,
        className,
      )}
      style={{
        background: `linear-gradient(135deg, ${c1}, ${c2})`,
      }}
    >
      <div className="absolute inset-0 mix-blend-overlay opacity-50">
        <svg
          viewBox="0 0 200 200"
          className="h-full w-full"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden
        >
          <circle cx="40" cy="40" r="24" fill="#ffffff55" />
          <circle cx="160" cy="80" r="14" fill="#ffffff44" />
          <circle cx="120" cy="160" r="32" fill="#ffffff33" />
        </svg>
      </div>
      <div className="absolute bottom-3 left-3 max-w-[80%] rounded-md bg-white/80 px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-blue-1000 backdrop-blur-sm">
        {alt}
      </div>
    </div>
  );
}
