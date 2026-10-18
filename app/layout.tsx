import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { SITE_URL } from "@/lib/site";
import "./globals.css";

/*
 * Type system per the ElevenLabs style reference: Inter everywhere —
 * whisper-weight 300 for display headlines, 400/500 for body and UI —
 * with JetBrains Mono (the reference's sanctioned Geist Mono substitute)
 * for technical micro-copy.
 */
const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-inter",
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
  title: "TestForge — Upload the FSD. Get tests you can trust.",
  description:
    "TestForge reads your requirements, explains them, writes test cases for you to approve, automates them in Playwright, and reports every failure with a screenshot.",
};

const themeInit = `
(function () {
  try {
    var stored = localStorage.getItem("tf-theme");
    var theme = stored === "dark" || stored === "light" ? stored : "light";
    document.documentElement.setAttribute("data-theme", theme);
  } catch (e) {
    document.documentElement.setAttribute("data-theme", "light");
  }
})();
`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-theme="light" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
      </head>
      <body
        className={`${inter.variable} ${jetbrains.variable} font-sans`}
      >
        {children}
      </body>
    </html>
  );
}
