"use client";

import { cn } from "@/lib/utils";

export type ArabicFont = "noto" | "lateef" | "cairo";

interface FontToggleProps {
  value: ArabicFont;
  onChange: (font: ArabicFont) => void;
}

const FONTS: { id: ArabicFont; label: string }[] = [
  { id: "noto", label: "Noto Sans" },
  { id: "lateef", label: "Lateef" },
  { id: "cairo", label: "Cairo" },
];

export default function FontToggle({ value, onChange }: FontToggleProps) {
  return (
    <div
      role="group"
      aria-label="Arabic font selection"
      className="flex items-center gap-1 rounded-lg border border-border bg-muted p-1"
    >
      {FONTS.map(({ id, label }) => (
        <button
          key={id}
          id={`font-toggle-${id}`}
          onClick={() => onChange(id)}
          aria-pressed={value === id}
          className={cn(
            "rounded-md px-3 py-1 text-xs font-medium transition-all cursor-pointer",
            value === id
              ? "bg-background text-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          {label}
        </button>
      ))}
    </div>
  );
}

/** Returns the CSS font-family string for a given ArabicFont key */
export function getFontFamily(font: ArabicFont): string {
  if (font === "cairo") return '"Cairo", sans-serif';
  return font === "noto"
    ? '"Noto Sans Arabic", sans-serif'
    : '"Lateef", serif';
}
