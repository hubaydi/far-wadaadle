import { transliterate, reverseTransliterate } from "./src/lib/transliterate";

const words = ["horreeyay", "Hay'adda", "dhammeeyeen", "xaqiijin", "shsh"];
console.log("=== TRANSLITERATE ===");
for (const word of words) {
    const fw = transliterate(word);
    console.log(`${word.padEnd(15)} -> ${fw}`);
}

console.log("\n=== REVERSE ===");
const farWadaad = ["هوَرّێيَاي", "هَيءَدَّ", "ڎَمّێيێَن"];
for (const fw of farWadaad) {
    const lat = reverseTransliterate(fw);
    console.log(`${fw.padEnd(15)} -> ${lat}`);
}
