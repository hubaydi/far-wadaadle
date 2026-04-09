import Header from "@/components/Header";
import Footer from "@/components/Footer";
import QuickReference from "@/components/QuickReference";
import TransliteratorPane from "@/components/TransliteratorPane";

export default function Home() {
  return (
    <div className="flex min-h-full flex-col bg-background">
      <Header />

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
        <QuickReference />
      </main>

      <Footer />
    </div>
  );
}
