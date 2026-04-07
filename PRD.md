# Product Requirements Document (PRD): Somali Script Transliteration Tool

## 1. Project Overview

A high-performance web utility designed to provide real-time, bi-directional (initial focus: Latin to Far Wadaad) transliteration for the Somali language. The tool serves as both a functional utility and an educational platform for Somali orthography.

## 2. Target Audience

- Somali People
- Somali Youth
- Somali social media users
- Linguists and researchers studying Somali scripts.
- Content creators looking to diversify Somali text formats.
- Somali language learners interested in historical scripts.

## 3. Functional Requirements

### 3.1 Transliteration Engine (Core)

- **Greedy Matching:** The engine must prioritize the longest strings in the mapping table (e.g., `dh` over `d`, `aa` over `a`) to prevent phonetic fragmentation.
- **Vowel Handling:** \* Implement **Initial Alif Injection**: If a word starts with a vowel ($a, e, i, o, u$), the output must prepend the corresponding Arabic character with an Alif ($ا$).
  - Support for the **Shire Jama Ahmed** convention for 'e' and 'o' using specific Unicode diacritics (`\u065A` and `\u0654`).
- **Bi-directional Support:** While the primary focus is Latin $\rightarrow$ Far Wadaad, the architecture should allow for a toggle to reverse the process (assuming fully vocalized Arabic input).

### 3.2 User Interface (UI)

- **Dual-Pane Editor:** \* Left/Top: LTR (Left-to-Right) text area for Somali Latin.
  - Right/Bottom: RTL (Right-to-Left) text area for Far Wadaad.
- **Live Sync:** Conversion must happen on the `onChange` event with debouncing ($< 50ms$ latency).
- **Action Toolbar:** \* "Copy to Clipboard" button for the output.
  - "Clear All" functionality.
  - "Download as Text" option.
- **Typography Controls:** Ability to toggle between specific Arabic fonts (e.g., Scheherazade New, Lateef) to ensure diacritic legibility.

### 3.3 Content (Future Expansion)

- **Blog Module:** A static-generated blog section using Markdown/MDX.
- **SEO:** Metadata optimization for terms like "Somali Arabic Script," "Far Wadaad converter," and "Somali orthography."

---

## 4. Technical Stack

- **Framework:** Next.js 15+ (App Router).
- **Styling:** Tailwind CSS.
- **Components:** shadcn/ui (Input, Tabs, Buttons, Toast for copy confirmation).
- **Animations:** Framer Motion (Transitions between input/output states).
- **Language:** TypeScript (Strict mode).
- **State Management:** Zustand (for persistent user settings like font size/theme).

---

## 5. Logic & Implementation Details

### 5.1 Tokenization Algorithm

The agent should implement a `transliterate` function that:

1.  Escapes special characters in the `Map` keys.
2.  Creates a combined Regex: `new RegExp(keys.sort((a, b) => b.length - a.length).join('|'), 'g')`.
3.  Uses `.replace()` with a callback to fetch values from the `LATIN_TO_FAR_WADAAD` map.

### 5.2 RTL Layout Constraints

- The Far Wadaad output container must explicitly use `dir="rtl"` and `lang="so-Arab"`.
- Font size for the Arabic output should be approximately **25-30% larger** than the Latin input to maintain visual parity in legibility.

---

## 6. Non-Functional Requirements

- **Performance:** The JavaScript bundle for the converter logic must remain under 20KB.
- **Accessibility:** Full keyboard navigation support for all buttons and inputs.
- **Responsive Design:** Mobile-first approach; panes should stack vertically on screens $< 768px$.

---

## 7. Success Metrics

- Zero phonetic errors in standard Somali sentences.
- Page Load Time $< 1.5s$ on 4G connections.
- Correct rendering of diacritics on Chrome, Safari, and Firefox.
