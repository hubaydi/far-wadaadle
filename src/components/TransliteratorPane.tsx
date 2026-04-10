"use client";

import { transliterate, reverseTransliterate } from "@/lib/transliterate";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useRef, useState } from "react";
import FontToggle, { ArabicFont, getFontFamily } from "./FontToggle";
import Toolbar from "./Toolbar";

type Direction = "ltr-to-rtl" | "rtl-to-ltr";

const DEBOUNCE_MS = 150;

export default function TransliteratorPane() {
  const [latinText, setLatinText] = useState("");
  const [arabicText, setArabicText] = useState("");
  const [font, setFont] = useState<ArabicFont>("scheherazade");
  const [direction, setDirection] = useState<Direction>("ltr-to-rtl");
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Debounced conversion
  const convert = useCallback((value: string, dir: Direction) => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      if (dir === "ltr-to-rtl") {
        setArabicText(transliterate(value));
      } else {
        setLatinText(reverseTransliterate(value));
      }
    }, DEBOUNCE_MS);
  }, []);

  function handleLatinChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    const v = e.target.value;
    setLatinText(v);
    convert(v, "ltr-to-rtl");
  }

  function handleArabicChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    const v = e.target.value;
    setArabicText(v);
    convert(v, "rtl-to-ltr");
  }

  function handleClear() {
    setLatinText("");
    setArabicText("");
  }

  function toggleDirection() {
    const next: Direction =
      direction === "ltr-to-rtl" ? "rtl-to-ltr" : "ltr-to-rtl";
    setDirection(next);
    // Swap current content
    setLatinText(arabicText);
    setArabicText(latinText);
  }

  const isLatinEditable = direction === "ltr-to-rtl";

  return (
    <section className="w-full flex flex-col gap-4">
      {/* ── Header row ── */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Toolbar outputText={arabicText} onClear={handleClear} />
        <div className="flex items-center gap-3">
          <FontToggle value={font} onChange={setFont} />
        </div>
      </div>

      {/* ── Dual Pane ── */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {/* Latin pane */}
        <div className="flex flex-col gap-2">
          <label
            htmlFor="latin-input"
            className="text-xs font-semibold uppercase tracking-widest text-muted-foreground"
          >
            Soomaali Laatin
          </label>
          <textarea
            id="latin-input"
            value={latinText}
            onChange={handleLatinChange}
            readOnly={!isLatinEditable}
            lang="so"
            dir="ltr"
            spellCheck={false}
            placeholder="Ku qor Far Soomaali Laatin halkan…"
            rows={12}
            className="w-full resize-none rounded-xl border border-border bg-card p-4 text-base leading-relaxed text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow"
          />
        </div>

        {/* Arabic pane */}
        <div className="flex flex-col gap-2">
          <label
            htmlFor="arabic-output"
            className="text-xs font-semibold uppercase tracking-widest text-muted-foreground"
          >
            فار وداد — Far Wadaad
          </label>
          <AnimatePresence mode="wait">
            <motion.textarea
              key={arabicText ? "has-content" : "empty"}
              id="arabic-output"
              value={arabicText}
              onChange={handleArabicChange}
              readOnly={isLatinEditable}
              lang="so-Arab"
              dir="rtl"
              spellCheck={false}
              placeholder="...ترجمةالنص هنا"
              rows={12}
              initial={{ opacity: 0.7 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.15 }}
              style={{ fontFamily: getFontFamily(font), fontSize: "1.35em" }}
              className="w-full resize-none rounded-xl border border-border bg-card p-4 leading-loose text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow"
            />
          </AnimatePresence>
        </div>
      </div>

      {/* ── Character count strip ── */}
      <div className="flex items-center justify-between text-xs text-muted-foreground select-none">
        <span>{latinText.length} xaraf Laatin</span>
        <button
          id="direction-toggle"
          onClick={toggleDirection}
          aria-label="Toggle transliteration direction"
          className="rounded-md border border-border px-3 py-1 text-xs font-medium transition-colors cursor-pointer hover:bg-accent hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          {direction === "ltr-to-rtl" ? "Laatiin → Carabi ⇄" : "Carabi → Laatiin ⇄"}
        </button>
        <span>
          {arabicText.replace(/[\u064B-\u065F\u0670]/g, "").length} xaraf far-wadaad
        </span>
      </div>
    </section>
  );
}
