import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Far-Wadaadle — Somali Latin to Arabic Script Converter",
  description:
    "Real-time Somali Far Wadaad (Arabic script) transliteration. Convert Somali Latin text to the historic Arabic orthography instantly — for free.",
  keywords: [
    "Somali Arabic script",
    "Far Wadaad",
    "Far Wadaadle",
    "Somali orthography",
    "Somali transliteration",
    "Af Soomaali",
  ],
  openGraph: {
    title: "Far-Wadaadle — Somali Latin to Arabic Script",
    description:
      "Convert Somali Latin text to Far Wadaad (Arabic script) in real-time.",
    locale: "so",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="so" className={cn("h-full antialiased", inter.variable)}>
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
