import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono, Sora } from "next/font/google";
import { SITE_URL } from "@/lib/site";
import "./globals.css";

/*
 * Type system scraped from the LaunchDarkly homepage: Sora carries display
 * headlines (their headingFont3), Inter handles body copy as the sanctioned
 * stand-in for their Söhne, and JetBrains Mono voices the technical labels
 * in place of their Söhne Mono.
 */
const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

const sora = Sora({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display",
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
  title: "TestForge.Ai: Test at AI speed. You stay in control.",
  description:
    "TestForge.Ai reads your FSD, explains it, drafts the test cases and writes the Playwright. A human approves every stage, and every failure arrives with a screenshot.",
};

export const viewport: Viewport = {
  themeColor: "#0e0e0e",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${jetbrains.variable} font-sans`}>
        {/* slow blue glows drifting behind the whole page */}
        <div className="bg-drift" aria-hidden="true">
          <span className="bg-drift-a" />
          <span className="bg-drift-b" />
          <span className="bg-drift-c" />
        </div>
        {children}
      </body>
    </html>
  );
}
