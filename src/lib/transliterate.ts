import {
  ALIF,
  LATIN_TO_FAR_WADAAD,
  VOWELS,
  numberMap,
  punctuationMap,
} from "@/constants";

// ── Build the combined, greedy regex once at module load ─────────────────────
function escapeRegex(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/** All keys from all three maps, sorted longest-first for greedy matching */
const ALL_KEYS = [
  ...Array.from(LATIN_TO_FAR_WADAAD.keys()),
  ...Array.from(punctuationMap.keys()),
  ...Array.from(numberMap.keys()),
].sort((a, b) => b.length - a.length);

const TRANSLITERATE_REGEX = new RegExp(
  ALL_KEYS.map(escapeRegex).join("|"),
  "gi",
);
// ── Transliteration function ─────────────────────────────────────────────────

/**
 * Transliterates Somali Latin script to Far Wadaad (Arabic script).
 *
 * Rules applied:
 * 1. Greedy regex: digraphs (aa, sh, dh …) matched before single chars.
 * 2. Initial Alif Injection: vowel-initial words get "ا" prepended.
 * 3. Punctuation & Eastern Arabic numeral substitution.
 * 4. Non-matching characters (spaces, newlines, etc.) pass through as-is.
 */
export function transliterate(input: string): string {
  if (!input) return "";

  // Track whether the PREVIOUS regex match ended at a word boundary so we can
  // inject an Alif before vowel-initial tokens.
  let lastIndex = 0;
  let isWordStart = true; // true at the beginning of the string

  let result = "";

  // We use matchAll instead of replace() so we have full positional control.
  const globalRegex = new RegExp(TRANSLITERATE_REGEX.source, "gi");

  for (const match of input.matchAll(globalRegex)) {
    const { index } = match as RegExpMatchArray & { index: number };
    const raw = match[0];
    const lower = raw.toLowerCase();

    // Characters between the last match and this one (spaces, unknowns, etc.)
    const gap = input.slice(lastIndex, index);
    if (gap) {
      result += gap;
      // A gap containing a word-separator resets the word-start flag
      isWordStart = /[\s\n\r]/.test(gap[gap.length - 1]);
    }

    // Look up the mapping
    const fromLatin = LATIN_TO_FAR_WADAAD.get(lower);
    const fromPunct = punctuationMap.get(raw);
    const fromNum = numberMap.get(raw);

    if (fromPunct !== undefined) {
      result += fromPunct;
      isWordStart = false;
    } else if (fromNum !== undefined) {
      result += fromNum;
      isWordStart = false;
    } else if (fromLatin !== undefined) {
      // Initial Alif Injection: prepend ا when a word starts with a vowel
      if (isWordStart && VOWELS.has(lower)) {
        result += ALIF;
      }
      result += fromLatin;
      isWordStart = false;
    } else {
      result += raw;
      isWordStart = /\s/.test(raw);
    }

    lastIndex = index + raw.length;
  }

  // Append any trailing unmatched characters
  result += input.slice(lastIndex);

  return result;
}

// ── Reverse (Far Wadaad → Latin, partial / experimental) ────────────────────
// Built by inverting the primary map. Note: diacritics (short vowels) are
// identical for some chars so the reverse is best-effort; fully-vocalized
// Arabic input is required for accurate reversal.
const FAR_WADAAD_TO_LATIN = new Map<string, string>(
  Array.from(LATIN_TO_FAR_WADAAD.entries())
    .reverse() // prefer digraph results when a char appears in both
    .map(([lat, arab]) => [arab, lat]),
);

export function reverseTransliterate(input: string): string {
  if (!input) return "";
  let result = "";
  let i = 0;
  while (i < input.length) {
    // Try two-char Arabic sequence first (e.g. "وٗ" is 2 code points)
    const two = input.slice(i, i + 2);
    if (FAR_WADAAD_TO_LATIN.has(two)) {
      result += FAR_WADAAD_TO_LATIN.get(two)!;
      i += 2;
    } else {
      const one = input[i];
      // Strip standalone Alif at word-start (it is injected, not a consonant)
      if (one === ALIF) {
        i++;
        continue;
      }
      result += FAR_WADAAD_TO_LATIN.get(one) ?? one;
      i++;
    }
  }
  return result;
}
