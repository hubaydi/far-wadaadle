/**
 * Primary Latin → Far Wadaad (Arabic script) character map.
 * Ordered with digraphs before single chars so that
 * greedy regex sorting is explicit in source, though the engine
 * always re-sorts longest-first at runtime.
 */
export const LATIN_TO_FAR_WADAAD = new Map<string, string>([
  // ── Digraphs (must come before their single-char equivalents) ──
  ["kh", "خ"],
  ["sh", "ش"],
  ["dh", "ڎ"],
  ["aa", "ا\u064E"],
  ["ee", "ي\u065A"],
  ["ii", "ي\u0650"],
  ["oo", "و\u0657"],
  ["uu", "و\u064F"],

  // ── Consonants ────────────────────────────────────────────────
  ["b", "ب"],
  ["t", "ت"],
  ["j", "ج"],
  ["x", "ح"],
  ["d", "د"],
  ["r", "ر"],
  ["s", "س"],
  ["c", "ع"],
  ["g", "گ"],
  ["f", "ف"],
  ["q", "ق"],
  ["k", "ك"],
  ["l", "ل"],
  ["m", "م"],
  ["n", "ن"],
  ["h", "ه"],
  ["w", "و"],
  ["y", "ي"],

  ["'", "\u0621"],

  // ── Short vowels (diacritics) ──────────────────────────────────
  ["a", "\u064E"], // Fatha   َ
  ["e", "\u065A"], // Small V Below ٚ
  ["i", "\u0650"], // Kasra   ِ
  ["o", "\u0657"], // Inverted Damma ٗ
  ["u", "\u064F"], // Damma   ُ
]);

export const punctuationMap = new Map<string, string>([
  ["?", "؟"], // Arabic question mark
  [",", "،"], // Arabic comma
  [";", "؛"], // Arabic semicolon
]);

export const numberMap = new Map<string, string>([
  ["0", "٠"],
  ["1", "١"],
  ["2", "٢"],
  ["3", "٣"],
  ["4", "٤"],
  ["5", "٥"],
  ["6", "٦"],
  ["7", "٧"],
  ["8", "٨"],
  ["9", "٩"],
]);

/** Initial Alif prefix — prepended when a word starts with a vowel */
export const ALIF = "أ";

/** Short vowel Latin keys (used for Initial Alif Injection detection) */
export const VOWELS = new Set(["a", "e", "i", "o", "u"]);
