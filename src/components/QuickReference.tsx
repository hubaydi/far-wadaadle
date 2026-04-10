"use client";

import { useState, useMemo } from "react";
import {
  LATIN_TO_FAR_WADAAD,
  punctuationMap,
  numberMap,
  VOWELS,
  CONSONANT_KEYS,
} from "@/constants";
import { Search, Copy, Check, Info, Hash, Type, Music } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type CharCategory = "consonants" | "vowels" | "symbols";

interface CharItem {
  latin: string;
  arabic: string;
  category: CharCategory;
  note?: string;
}

export default function QuickReference() {
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState<CharCategory>("consonants");
  const [copiedChar, setCopiedChar] = useState<string | null>(null);

  // 1. Prepare data
  const allChars = useMemo(() => {
    const items: CharItem[] = [];

    // Consonants
    LATIN_TO_FAR_WADAAD.forEach((arabic, latin) => {
      if (CONSONANT_KEYS.has(latin)) {
        items.push({ latin, arabic, category: "consonants" });
      } else if (VOWELS.has(latin)) {
        items.push({ latin, arabic, category: "vowels" });
      }
    });

    // Symbols & Numbers
    punctuationMap.forEach((arabic, latin) => {
      items.push({ latin, arabic, category: "symbols" });
    });
    numberMap.forEach((arabic, latin) => {
      items.push({ latin, arabic, category: "symbols" });
    });

    return items;
  }, []);

  const itemsByCategory = useMemo(() => {
    return {
      consonants: allChars.filter((i) => i.category === "consonants"),
      vowels: allChars.filter((i) => i.category === "vowels"),
      symbols: allChars.filter((i) => i.category === "symbols"),
    };
  }, [allChars]);

  // 2. Filter data
  const filteredItems = useMemo(() => {
    return allChars.filter((item) => {
      const matchesSearch =
        item.latin.toLowerCase().includes(search.toLowerCase()) ||
        item.arabic.includes(search);

      // If searching, show all categories if they match
      if (search) return matchesSearch;

      // Otherwise, filter by tab
      return itemsByCategory[activeTab].some((i) => i.latin === item.latin);
    });
  }, [allChars, search, activeTab, itemsByCategory]);

  const handleCopy = (char: string) => {
    navigator.clipboard.writeText(char);
    setCopiedChar(char);
    setTimeout(() => setCopiedChar(null), 2000);
  };

  const tabs = [
    { id: "consonants", label: "Shibbaneyaal", icon: Type },
    { id: "vowels", label: "Shaqallo", icon: Music },
    { id: "symbols", label: "Tiro & Calaamad", icon: Hash },
  ];

  return (
    <div className="mt-12 space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="flex items-center gap-2 text-xl font-bold text-foreground">
          <Info className="h-5 w-5 text-primary" />
          Tixraaca Maabka Xarfaha
        </h2>

        {/* Search Bar */}
        <div className="relative w-full sm:max-w-xs">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Raadi xaraf ama calaamad..."
            className="h-10 w-full rounded-full border border-border bg-background/50 pl-10 pr-4 text-sm focus:border-primary focus:outline-hidden focus:ring-1 focus:ring-primary"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Tabs */}
      {!search && (
        <div className="flex flex-wrap gap-2 border-b border-border pb-px">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as CharCategory)}
                className={cn(
                  "relative flex items-center gap-2 px-4 py-2 text-sm font-medium transition-colors cursor-pointer",
                  isActive
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                <Icon className="h-4 w-4" />
                {tab.label}
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                  />
                )}
              </button>
            );
          })}
        </div>
      )}

      {/* Results Grid */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        <AnimatePresence mode="popLayout">
          {filteredItems.map((item) => (
            <motion.div
              layout
              key={`${item.latin}-${item.arabic}`}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              whileHover={{ y: -2 }}
              className="group relative flex flex-col items-center justify-center rounded-xl border border-border bg-background/40 p-4 transition-all hover:border-primary/50 hover:bg-accent/30 hover:shadow-lg"
            >
              <button
                onClick={() => handleCopy(item.arabic)}
                className="absolute right-2 top-2 opacity-0 transition-opacity group-hover:opacity-100 cursor-pointer"
                title="Copy character"
              >
                {copiedChar === item.arabic ? (
                  <Check className="h-3.5 w-3.5 text-green-500" />
                ) : (
                  <Copy className="h-3.5 w-3.5 text-muted-foreground hover:text-primary" />
                )}
              </button>

              <span className="text-base font-mono font-semibold text-primary">
                {item.latin}
              </span>
              <span
                dir="rtl"
                lang="so-Arab"
                className="my-1 text-3xl"
                style={{ fontFamily: '"Scheherazade New", serif' }}
              >
                {item.arabic}
              </span>

              {/* Tooltip-like indicator */}
              <div className="mt-1 text-[10px] uppercase tracking-wider text-muted-foreground/0 group-hover:text-muted-foreground transition-all">
                {copiedChar === item.arabic
                  ? "La koobiyeeyay!"
                  : "Riix si aad u koobiyeyso"}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {filteredItems.length === 0 && (
        <div className="flex h-32 flex-col items-center justify-center text-center">
          <p className="text-sm text-muted-foreground">
            Lama helin wax natiijo ah.
          </p>
        </div>
      )}
      <div className="">
        <p className="rounded-lg bg-accent/30 p-4 text-sm leading-relaxed text-muted-foreground">
          <strong>FG:</strong> Qaabka aan Xarfaha Carabiga iyo Laatiinka isugu
          Maab garaynay waxa aan kasoo dheeganay{" "}
          <span className="font-mono text-primary">
            Hab Qoraalkii Hore ee Far-Wadaad.
          </span>{" "}
          Qaababka far wadaadka loo qoro 95% isku mid ayay ahaayeen. waxaa jiray
          xarfo yaryar oo in kala si loo qoro dhici jirtay. sida xarfaha (d, g,
          e, o, ).
        </p>
        <p className="rounded-lg bg-accent/30 p-4 text-sm leading-relaxed text-muted-foreground">
          <strong>FG:</strong> xarafka &quot;D&quot; labo qaab ayaa loo qori
          jiray: (د, ط) waxaanu doorbidnay
          <span className="font-mono text-primary"> Xarafka (د)</span> maadama
          uu dhawaaqa si sax ah u matalayo, halka xarafka (ط) uu matalayo cod
          kale oo aanan Af soomaaliga laga helin
        </p>
        <p className="rounded-lg bg-accent/30 p-4 text-sm leading-relaxed text-muted-foreground">
          <strong>FG:</strong> shaqallada &quot;e iyo u&quot; farta carabiga ee
          asalka ah lagama heli karo. Laakiin maadama farta in ka badan 100
          luuqadood ay isticmaalaan. waxaa jira xarfo loo sameeyay labadaas Cod.
          <span className="font-mono text-primary">
            {" "}
            shaqalka (O) waxaan ku maab garaynay (◌ٗ )
          </span>
          <span className="font-mono text-primary">
            {" "}
            shaqalka (E) waxaan ku maab garaynay (ٚ◌)
          </span>
        </p>
        <p className="rounded-lg bg-accent/30 p-4 text-sm leading-relaxed text-muted-foreground">
          <strong>FG:</strong> xarafka G isaga dadkii far wadaad wax ku qori
          jiray qaar kamida waxay isticmaali jireen (غ), laakiin xarafka saxda
          ah ee codkaa mattala luuqado badanna ay isticmaalaan waa (گ)
        </p>
        <p className="rounded-lg bg-accent/30 p-4 text-sm leading-relaxed text-muted-foreground">
          <strong>FG:</strong> Shaqalada gaagaaban ee{" "}
          <span className="font-mono text-primary">a e i o u</span> waxay
          noqdaan calaamado (ḥarakāt). Erayada ka bilowda shaqal waxay si toos
          ah u qaataan xarafka Alif (ا). Dhammaan xarfaha halkan ku jira waa
          kuwo toos loogu isticmaali karo beddeleha kore.
        </p>
      </div>
    </div>
  );
}
