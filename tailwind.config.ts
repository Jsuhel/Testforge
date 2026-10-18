import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  darkMode: ["class", "[data-theme='dark']"],
  theme: {
    extend: {
      colors: {
        paper: "var(--paper)",
        ink: "var(--ink)",
        accent: "var(--accent)",
        forge: "var(--accent)",
        night: "var(--night)",
        line: "var(--line)",
        muted: "var(--muted)",
        surface: "var(--surface)",
        surface2: "var(--surface-2)",
        pass: "var(--pass)",
        fail: "var(--fail)",
      },
      fontFamily: {
        display: ["var(--font-inter)", "Helvetica Neue", "Arial", "sans-serif"],
        sans: ["var(--font-inter)", "Helvetica Neue", "Arial", "sans-serif"],
        mono: ["var(--font-jetbrains)", "Consolas", "monospace"],
      },
      borderRadius: {
        DEFAULT: "8px",
      },
      maxWidth: {
        page: "76rem",
      },
    },
  },
  plugins: [],
};

export default config;
