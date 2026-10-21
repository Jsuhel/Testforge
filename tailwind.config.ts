import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
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
        // Neon control room palette
        midnight: "#0e0e0e",
        carbon: "#191919",
        graphite: "#414042",
        steel: "#58595b",
        slate2: "#6d6e71",
        fog: "#a7a9ac",
        ash: "#d1d3d4",
        smoke: "#2c2c2c",
        voltage: "#405bff",
        violet: "#7084ff",
        plasma: "#3dd6f5",
      },
      fontFamily: {
        display: ["var(--font-grotesk)", "var(--font-inter)", "Arial", "sans-serif"],
        sans: ["var(--font-inter)", "Helvetica Neue", "Arial", "sans-serif"],
        mono: ["var(--font-jetbrains)", "Consolas", "monospace"],
      },
      borderRadius: {
        DEFAULT: "10px",
        pill: "30px",
        pill2: "60px",
      },
      maxWidth: {
        page: "75rem",
      },
    },
  },
  plugins: [],
};

export default config;
