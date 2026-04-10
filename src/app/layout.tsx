import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

const siteUrl = "https://far-wadaadle.qaamuusle.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Far-Wadaadle — Somali Latin to Far-Wadaad Converter",
  description:
    "Live Beddelaad (transliteration) tool for Somali Latin to Far-Wadaad (Arabic script). Convert Somali text to the historical script instantly.",
  keywords: [
    "Somali Arabic script",
    "Far Wadaad",
    "Somali Script",
    "Somali Language",
    "Far Wadaadle",
    "Somali orthography",
    "Somali transliteration",
    "Af Soomaali",
    "Somali converter",
    "Arabic script Somali",
  ],
  authors: [{ name: "Hobaydi", url: "https://github.com/hubaydi" }],
  creator: "Hobaydi",
  publisher: "Far-Wadaadle",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "Far-Wadaadle — Somali Latin to Far-Wadaad",
    description:
      "U beddel qoraalka Soomaali Laatiinka Far-Wadaad (farta carabiga) si toos ah.",
    url: siteUrl,
    siteName: "Far-Wadaadle",
    locale: "so_SO",
    type: "website",
    images: [
      {
        url: "/brand-icon.png",
        width: 512,
        height: 512,
        alt: "Far-Wadaadle — Somali Latin to Far-Wadaad Converter",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Far-Wadaadle — Somali Latin to Far-Wadaad",
    description:
      "Convert Somali text to the historical Far-Wadaad script instantly.",
    creator: "@hubaydi",
    images: ["/brand-icon.png"],
  },
  icons: {
    icon: "/brand-icon.png",
    apple: "/brand-icon.png",
  },
  alternates: {
    canonical: siteUrl,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Far-Wadaadle",
  description:
    "A real-time Somali Latin to Far-Wadaad (Arabic script) transliteration tool.",
  url: siteUrl,
  applicationCategory: "UtilityApplication",
  operatingSystem: "Windows, macOS, Linux, Android, iOS",
  creator: {
    "@type": "Person",
    name: "Hobaydi",
    url: "https://github.com/hubaydi",
  },
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
};

import { ThemeProvider } from "@/components/theme-provider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="so"
      className={cn("h-full antialiased", inter.variable)}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col font-sans">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
        {/* Analytics */}
        <Script
          src="https://cloud.umami.is/script.js"
          data-website-id="672f31b1-7fc6-4cc5-858e-9e1b152d9e54"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
