import ThemeToggle from "@/components/ThemeToggle";
import TransliteratorPane from "@/components/TransliteratorPane";
import { LATIN_TO_FAR_WADAAD } from "@/constants";

// Quick reference rows to display in the char-map table
const QUICK_REF = [
  { latin: "aa", arabic: "ا", note: "A dheer" },
  { latin: "dh", arabic: "ڎ", note: "D culus" },
  { latin: "sh", arabic: "ش", note: "SH" },
  { latin: "kh", arabic: "خ", note: "KH" },
  { latin: "x", arabic: "ح", note: "X (Xaa)" },
  { latin: "c", arabic: "ع", note: "C (Cayn)" },
  { latin: "ee", arabic: "ێ", note: "E dheer" },
  { latin: "oo", arabic: "وٗ", note: "O dheer" },
  { latin: "uu", arabic: "ۇ", note: "U dheer" },
  { latin: "q", arabic: "ق", note: "Q (Qaaf)" },
];

export default function Home() {
  return (
    <div className="flex min-h-full flex-col bg-background">
      {/* ── Header ─────────────────────────────────────────────────────────── */}
      <header className="sticky top-0 z-10 border-b border-border/60 bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3 sm:px-6">
          <div className="flex flex-col leading-tight">
            <span className="text-lg font-bold tracking-tight text-foreground">
              Far-Wadaadle{" "}
              <span
                dir="rtl"
                lang="so-Arab"
                className="text-primary"
                style={{ fontFamily: '"Scheherazade New", serif' }}
              >
                فرودادلي
              </span>
            </span>
            <span className="text-[11px] text-muted-foreground">
              Beddele Soomaali Laatiin → Far-Wadaad
            </span>
          </div>
          <ThemeToggle />
        </div>
      </header>

      {/* ── Hero ───────────────────────────────────────────────────────────── */}
      <section className="border-b border-border/40 bg-linear-to-b from-primary/5 to-transparent px-4 py-10 text-center sm:px-6">
        <h1 className="mb-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Ku qor <span className="text-primary">Far-Wadaad</span> Af-soomaaliga
        </h1>
        <p className="mx-auto max-w-xl text-base text-muted-foreground">
          U rogida tooska ah ee Soomaali Laatiin ilaa{" "}
          <strong>Far-Wadaad</strong> — farta taariikhiga ah ee carabiga ee afka
          Soomaaliga{" "}
        </p>
      </section>

      {/* ── Main Editor ────────────────────────────────────────────────────── */}
      <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-8 sm:px-6">
        <TransliteratorPane />

        {/* ── Quick Reference ─────────────────────────────────────────────── */}
        <details className="mt-10 rounded-xl border border-border">
          <summary className="cursor-pointer select-none px-5 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-accent">
            Tixraaca Maabka Xarfaha ↓
          </summary>
          <div className="overflow-x-auto px-5 pb-5 pt-3">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b border-border text-left text-xs uppercase tracking-wider text-muted-foreground">
                  <th className="pb-2 pr-4">Laatiin</th>
                  <th className="pb-2 pr-4" dir="rtl">
                    Far-Wadaad
                  </th>
                  <th className="pb-2">Faahfaahin</th>
                </tr>
              </thead>
              <tbody>
                {QUICK_REF.map(({ latin, arabic, note }) => (
                  <tr
                    key={latin}
                    className="border-b border-border/50 last:border-0 hover:bg-accent/40"
                  >
                    <td className="py-2 pr-4 font-mono font-bold text-primary">
                      {latin}
                    </td>
                    <td
                      dir="rtl"
                      lang="so-Arab"
                      className="py-2 pr-4 text-end"
                      style={{
                        fontFamily: '"Scheherazade New", serif',
                        fontSize: "1.4em",
                      }}
                    >
                      {arabic}
                    </td>
                    <td className="py-2 text-muted-foreground">{note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="mt-3 text-xs text-muted-foreground">
              Waxaa la muujiyay {QUICK_REF.length} kamid ah{" "}
              {LATIN_TO_FAR_WADAAD.size} xarfo. Shaqalada gaagaaban ee{" "}
              <span className="font-mono">a e i o u</span> waxay noqdaan shaqalo
              carabi (ḥarakāt). Erayada ka bilowda shaqal waxay si toos ah u
              qaataan xarafka Alif (ا).
            </p>
          </div>
        </details>
      </main>

      {/* ── Footer ─────────────────────────────────────────────────────────── */}
      <footer className="border-t border-border/60 px-4 py-6 text-center text-xs text-muted-foreground sm:px-6">
        <p>
          Far-Wadaadle · Beddele Farta Soomaali Carabi/Laatiin · Waxaa ❤️ ku
          sameeyay
          <a href="https://github.com/hubaydi"> Hobaydi</a>
        </p>
        <p className="mt-1">
          Waxay taageertaa{" "}
          <span
            dir="rtl"
            lang="so-Arab"
            style={{
              fontFamily: '"Scheherazade New", serif',
              fontSize: "1.2em",
            }}
          >
            خَط فارودادلي
          </span>{" "}
          n.
        </p>
      </footer>
    </div>
  );
}
