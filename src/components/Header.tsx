import Image from "next/image";
import ThemeToggle from "./ThemeToggle";

export default function Header() {
  return (
    <header className="sticky top-0 z-10 border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3 sm:px-6">
        <div className="flex items-center gap-3">
          <Image
            src="/brand-icon.png"
            alt="Far-Wadaadle Icon"
            width={40}
            height={40}
            className="rounded-xl shadow-md border border-white/10"
          />
          <div className="flex flex-col leading-tight">
            <span className="text-lg font-bold tracking-tight text-foreground">
              Far-Wadaadle{" "}
              <span
                dir="rtl"
                lang="so-Arab"
                className="text-primary"
                style={{ fontFamily: '"Noto Sans Arabic", sans-serif' }}
              >
                فرودادلي
              </span>
            </span>
            <span className="text-[11px] text-muted-foreground">
              Beddele Soomaali Laatiin → Far-Wadaad
            </span>
          </div>
        </div>
        <ThemeToggle />
      </div>
    </header>
  );
}
