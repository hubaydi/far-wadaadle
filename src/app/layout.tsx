import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Far-Wadaadle — Beddele Soomaali Laatiin to Far-Wadaad",
  description:
    "Beddelaad toos ah oo Far Wadaad (farta carabiga ee soomaaliga) ah. U beddel qoraalka Soomaali Laatiinka farta taariikhiga ah ee far Wadaad si dhakhso ah .",
  keywords: [
    "Somali Arabic script",
    "Far Wadaad",
    "Far Wadaadle",
    "Somali orthography",
    "Somali transliteration",
    "Af Soomaali",
  ],
  openGraph: {
    title: "Far-Wadaadle — Soomaali Laatiin to Far-Wadaad",
    description:
      "U beddel qoraalka Soomaali Laatiinka Far-Wadaad (farta carabiga) si toos ah.",
    locale: "so",
    type: "website",
  },
  icons: {
    icon: "/brand-icon.png",
    apple: "/brand-icon.png",
  },
};

import { ThemeProvider } from "@/components/theme-provider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="so" className={cn("h-full antialiased", inter.variable)} suppressHydrationWarning>
      <body className="min-h-full flex flex-col font-sans">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
