import {
  ALIF,
  CONSONANT_KEYS,
  LATIN_TO_FAR_WADAAD,
  SHADDAH,
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
 * 2. Initial Alif Injection: vowel-initial words get "أ" prepended.
 * 3. Consonant Gemination (Shaddah): doubled consonants (rr, dd,mm …)
 *    emit the Arabic consonant once + shaddah (ّ) instead of repeating.
 * 4. Punctuation & Eastern Arabic numeral substitution.
 * 5. Non-matching characters (spaces, newlines, etc.) pass through as-is.
 */
export function transliterate(input: string): string {
  if (!input) return "";

  let lastIndex = 0;
  let isWordStart = true;

  let result = "";

  // Track the previous consonant for gemination detection
  let prevConsonantKey: string | null = null;

  const globalRegex = new RegExp(TRANSLITERATE_REGEX.source, "gi");

  for (const match of input.matchAll(globalRegex)) {
    const { index } = match as RegExpMatchArray & { index: number };
    const raw = match[0];
    const lower = raw.toLowerCase();

    // Characters between the last match and this one (spaces, unknowns, etc.)
    const gap = input.slice(lastIndex, index);
    if (gap) {
      result += gap;
      isWordStart = /[\s\n\r]/.test(gap[gap.length - 1]);
      prevConsonantKey = null; // gap breaks any consonant pairing
    }

    // Look up the mapping
    const fromLatin = LATIN_TO_FAR_WADAAD.get(lower);
    const fromPunct = punctuationMap.get(raw);
    const fromNum = numberMap.get(raw);

    if (fromPunct !== undefined) {
      result += fromPunct;
      isWordStart = false;
      prevConsonantKey = null;
    } else if (fromNum !== undefined) {
      result += fromNum;
      isWordStart = false;
      prevConsonantKey = null;
    } else if (fromLatin !== undefined) {
      const isConsonant = CONSONANT_KEYS.has(lower);

      // ── Gemination (Shaddah) ──
      // If this consonant is the same as the previous one → add shaddah
      if (isConsonant && prevConsonantKey === lower) {
        result += SHADDAH;
        prevConsonantKey = null; // reset so triple letters = consonant + shaddah + consonant
        isWordStart = false;
      } else {
        // Initial Alif Injection: prepend أ when a word starts with a vowel
        if (isWordStart && VOWELS.has(lower)) {
          result += ALIF;
        }
        result += fromLatin;
        prevConsonantKey = isConsonant ? lower : null;
        isWordStart = false;
      }
    } else {
      result += raw;
      isWordStart = /\s/.test(raw);
      prevConsonantKey = null;
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
    const char = input[i];

    // If character is a Shaddah, we duplicate the last Latin consonant appended
    if (char === SHADDAH) {
      // Find the last alphabetical segment we appended to result
      const lastAlphaMatch = /[a-zA-Z]+$/.exec(result);
      if (lastAlphaMatch) {
         // Duplicate the entire last segment (it could be a digraph like 'dh' or single char like 'r')
         result += lastAlphaMatch[0];
      }
      i++;
      continue;
    }

    // Try two-char Arabic sequence first (e.g. "وٗ" is 2 code points)
    const two = input.slice(i, i + 2);
    if (FAR_WADAAD_TO_LATIN.has(two)) {
      result += FAR_WADAAD_TO_LATIN.get(two)!;
      i += 2;
    } else {
      const one = input[i];
      // Strip standalone Alif at word-start (it is injected, not a consonant)
      if (one === ALIF && (i === 0 || /\s/.test(input[i - 1]))) {
        i++;
        continue;
      }
      result += FAR_WADAAD_TO_LATIN.get(one) ?? one;
      i++;
    }
  }
  return result;
}
