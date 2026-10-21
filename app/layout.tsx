import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import { SITE_URL } from "@/lib/site";
import "./globals.css";

/*
 * Neon control room type system: Space Grotesk (the reference's sanctioned
 * grotesk substitute) carries display headlines at weight 500, Inter handles
 * body copy, and JetBrains Mono voices the technical labels and code.
 */
const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

const grotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-grotesk",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "TestForge: Upload the FSD. Get tests you can trust.",
  description:
    "TestForge reads your requirements, explains them, writes test cases for you to approve, automates them in Playwright, and reports every failure with a screenshot.",
};

export const viewport: Viewport = {
  themeColor: "#0e0e0e",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${grotesk.variable} ${jetbrains.variable} font-sans`}>
        {children}
      </body>
    </html>
  );
}
