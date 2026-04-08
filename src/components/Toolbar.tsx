"use client";

import { Check, ClipboardCopy, Download, Trash2 } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface ToolbarProps {
  outputText: string;
  onClear: () => void;
}

export default function Toolbar({ outputText, onClear }: ToolbarProps) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    if (!outputText) return;
    await navigator.clipboard.writeText(outputText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function handleDownload() {
    if (!outputText) return;
    const blob = new Blob([outputText], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "far-wadaad.txt";
    a.click();
    URL.revokeObjectURL(url);
  }

  const base =
    "flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-40 disabled:cursor-not-allowed";

  return (
    <div
      role="toolbar"
      aria-label="Transliterator actions"
      className="flex flex-wrap items-center gap-2"
    >
      {/* Copy */}
      <button
        id="toolbar-copy"
        onClick={handleCopy}
        disabled={!outputText}
        aria-label="Copy Arabic output to clipboard"
        className={cn(
          base,
          copied
            ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
            : "bg-muted text-muted-foreground hover:text-foreground hover:bg-accent",
        )}
      >
        {copied ? <Check size={15} /> : <ClipboardCopy size={15} />}
        {copied ? "La koobiyee!" : "Koobiyee"}
      </button>

      {/* Download */}
      <button
        id="toolbar-download"
        onClick={handleDownload}
        disabled={!outputText}
        aria-label="Download Arabic output as text file"
        className={cn(
          base,
          "bg-muted text-muted-foreground hover:text-foreground hover:bg-accent",
        )}
      >
        <Download size={15} />
        Soo deji
      </button>

      {/* Clear All */}
      <button
        id="toolbar-clear"
        onClick={onClear}
        aria-label="Clear all text"
        className={cn(
          base,
          "bg-destructive/10 text-destructive hover:bg-destructive/20",
        )}
      >
        <Trash2 size={15} />
        Tirtir
      </button>
    </div>
  );
}
