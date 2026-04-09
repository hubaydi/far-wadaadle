import Header from "@/components/Header";
import Footer from "@/components/Footer";
import QuickReference from "@/components/QuickReference";
import ScriptInfo from "@/components/ScriptInfo";
import TransliteratorPane from "@/components/TransliteratorPane";

export default function Home() {
  return (
    <div className="flex min-h-full flex-col bg-background">
      <Header />

      {/* ── Hero ───────────────────────────────────────────────────────────── */}
      <section className="border-b border-border/40 bg-linear-to-b from-primary/5 to-transparent px-4 py-12 text-center sm:px-6">
        <h1 className="mb-8 text-3xl font-bold tracking-tight text-foreground sm:text-5xl">
          Af-soomaaliga Ku qor <span className="text-primary">Far-Wadaad</span>
          <span
            dir="rtl"
            lang="so-Arab"
            className="mt-4 block text-2xl text-primary sm:text-4xl"
            style={{ fontFamily: '"Scheherazade New", serif' }}
          >
            أَفْ-سٗومَالِگَ كُ قٗرْ فَرْ-وَدَادْ
          </span>
        </h1>
        <p className="mx-auto max-w-xl text-base text-muted-foreground">
          U rogida tooska ah ee Soomaali Laatiin to <strong>Far-Wadaad</strong>{" "}
          — farta taariikhiga ah ee carabiga ee afka Soomaaliga{" "}
        </p>
      </section>

      {/* ── Main Editor ────────────────────────────────────────────────────── */}
      <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-8 sm:px-6">
        <TransliteratorPane />
        <QuickReference />
        <ScriptInfo />
      </main>

      <Footer />
    </div>
  );
}
