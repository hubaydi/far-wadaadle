import {
  ALIF,
  ALIF_HAMZA_BELOW,
  ALIF_MADDA,
  CONSONANT_KEYS,
  HAMZA_ON_WAW,
  HAMZA_ON_YA,
  LATIN_TO_FAR_WADAAD,
  SHADDAH,
  SUKUN,
  VOWELS,
  numberMap,
  punctuationMap,
} from "@/constants";

function escapeRegex(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

const ALL_KEYS = [
  ...Array.from(LATIN_TO_FAR_WADAAD.keys()),
  ...Array.from(punctuationMap.keys()),
  ...Array.from(numberMap.keys()),
].sort((a, b) => b.length - a.length);

const TRANSLITERATE_REGEX = new RegExp(
  ALL_KEYS.map(escapeRegex).join("|"),
  "gi",
);

// ── Transliteration ──────────────────────────────────────────────────────────

export function transliterate(input: string): string {
  if (!input) return "";

  let result = "";
  let lastIndex = 0;
  let isWordStart = true;
  let prevConsonantKey: string | null = null;
  let pendingApostrophe = false;

  // Closure to flush pending modifiers before handling gaps or punctuation
  const flushPendingState = () => {
    if (pendingApostrophe) {
      result += ALIF;
      pendingApostrophe = false;
    }
    if (prevConsonantKey) {
      result += SUKUN;
      prevConsonantKey = null;
    }
  };

  for (const match of input.matchAll(TRANSLITERATE_REGEX)) {
    const { index } = match as RegExpMatchArray & { index: number };
    const raw = match[0];
    const lower = raw.toLowerCase();

    // Handle gaps (unmatched characters like whitespace)
    const gap = input.slice(lastIndex, index);
    if (gap) {
      flushPendingState();
      result += gap;
      isWordStart = true;
    }

    // Look up the mapping
    const fromLatin = LATIN_TO_FAR_WADAAD.get(lower);
    const fromPunct = punctuationMap.get(raw);
    const fromNum = numberMap.get(raw);

    if (fromPunct !== undefined || fromNum !== undefined) {
      flushPendingState();
      result += fromPunct ?? fromNum;
      isWordStart = true;
    } else if (fromLatin !== undefined) {
      const isConsonant = CONSONANT_KEYS.has(lower);

      if (lower === "'") {
        if (prevConsonantKey) {
          result += SUKUN;
          prevConsonantKey = null;
        }
        pendingApostrophe = true;
        isWordStart = false;
      }
      // Gemination (Shaddah)
      else if (isConsonant && prevConsonantKey === lower) {
        result += SHADDAH;
        prevConsonantKey = null;
        isWordStart = false;
      } else {
        // If we have a pending apostrophe, decide its carrier based on this match
        if (pendingApostrophe) {
          if (VOWELS.has(lower)) {
            if (/^[uo]/.test(lower)) result += HAMZA_ON_WAW;
            else if (/^[ie]/.test(lower)) result += HAMZA_ON_YA;
            else result += ALIF;
          } else {
            result += ALIF;
          }
          pendingApostrophe = false;
        }

        // If we have a previous consonant and this is NOT its vowel, add Sukun
        if (prevConsonantKey && (isConsonant || !VOWELS.has(lower))) {
          result += SUKUN;
        }

        if (isWordStart && lower === "aa") {
          result += ALIF_MADDA;
        } else {
          if (isWordStart && VOWELS.has(lower)) {
            result += lower === "i" || lower === "ii" ? ALIF_HAMZA_BELOW : ALIF;
          }
          result += fromLatin;
        }

        prevConsonantKey = isConsonant ? lower : null;
        isWordStart = false;
      }
    } else {
      flushPendingState();
      result += raw;
      isWordStart = !/[a-zA-Z0-9]/.test(raw);
    }

    lastIndex = index + raw.length;
  }

  flushPendingState();
  result += input.slice(lastIndex);

  return result;
}

// ── Reverse Transliteration ──────────────────────────────────────────────────

// We must explicitly sort by length descending to ensure complex Arabic
// characters (like \u064Eا) are matched before simple ones (\u064E).
const FAR_WADAAD_TO_LATIN_ENTRIES = Array.from(LATIN_TO_FAR_WADAAD.entries())
  .map(([lat, arab]) => [arab, lat] as const)
  .sort((a, b) => b[0].length - a[0].length);

const FAR_WADAAD_TO_LATIN = new Map(FAR_WADAAD_TO_LATIN_ENTRIES);

// Calculate max chunk size dynamically based on our map
const MAX_ARABIC_LEN = FAR_WADAAD_TO_LATIN_ENTRIES[0][0].length;

export function reverseTransliterate(input: string): string {
  if (!input) return "";

  let result = "";
  let i = 0;

  while (i < input.length) {
    const char = input[i];

    if (char === SHADDAH) {
      const lastAlphaMatch = /[a-zA-Z]+$/.exec(result);
      if (lastAlphaMatch) result += lastAlphaMatch[0];
      i++;
      continue;
    }

    // Dynamic greedy matching: attempts longest possible Arabic chunk first
    let matched = false;
    for (let len = MAX_ARABIC_LEN; len > 0; len--) {
      const chunk = input.slice(i, i + len);
      if (FAR_WADAAD_TO_LATIN.has(chunk)) {
        // Strip standalone injected Alif at word-start
        if (chunk === ALIF && (i === 0 || /\s/.test(input[i - 1]))) {
          // It's injected, just skip translation to Latin
        } else {
          result += FAR_WADAAD_TO_LATIN.get(chunk);
        }
        i += len;
        matched = true;
        break;
      }
    }

    if (!matched) {
      result += char;
      i++;
    }
  }

  return result;
}
