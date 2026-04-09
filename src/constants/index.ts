/**
 * Primary Latin → Far Wadaad (Arabic script) character map.
 * Ordered with digraphs before single chars for explicit source readability.
 */
export const LATIN_TO_FAR_WADAAD: ReadonlyMap<string, string> = new Map([
  // ── Digraphs ──
  ["kh", "خ"],
  ["sh", "ش"],
  ["dh", "ڎ"],
  ["aa", "\u064Eا"],
  ["ee", "\u065Aي"],
  ["ii", "\u0650ي"],
  ["oo", "\u0657و"],
  ["uu", "\u064Fو"],

  // ── Consonants ──
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
  ["'", "أ"],

  // ── Short vowels (diacritics) ──
  ["a", "\u064E"], // Fatha
  ["e", "\u065A"], // Small V Below
  ["i", "\u0650"], // Kasra
  ["o", "\u0657"], // Inverted Damma
  ["u", "\u064F"], // Damma
]);

export const punctuationMap: ReadonlyMap<string, string> = new Map([
  ["?", "؟"],
  [",", "،"],
  [";", "؛"],
]);

export const numberMap: ReadonlyMap<string, string> = new Map([
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

export const ALIF = "أ";
export const ALIF_MADDA = "آ";
export const ALIF_HAMZA_BELOW = "إ";
export const HAMZA_ON_WAW = "ؤ";
export const HAMZA_ON_YA = "ئ";
export const SHADDAH = "\u0651";
export const SUKUN = "\u0652";

export const VOWELS: ReadonlySet<string> = new Set([
  "a",
  "e",
  "i",
  "o",
  "u",
  "aa",
  "ee",
  "ii",
  "oo",
  "uu",
]);

export const CONSONANT_KEYS: ReadonlySet<string> = new Set([
  "b",
  "t",
  "j",
  "x",
  "d",
  "r",
  "s",
  "c",
  "g",
  "f",
  "q",
  "k",
  "l",
  "m",
  "n",
  "h",
  "w",
  "y",
  "dh",
  "sh",
  "kh",
]);
