import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        sand: "#f6f1e8",
        ink: "#101828",
        cream: "#fdf6e9",
        panel: "#fffdf8",
        accent: "#f97316",
        accentSoft: "#ffead5",
        success: "#0f766e",
        navy: "#111827",
        skySoft: "#dff3ff",
      },
      boxShadow: {
        float: "0 24px 70px rgba(16, 24, 40, 0.11)",
        crisp: "0 12px 30px rgba(16, 24, 40, 0.10)",
      },
    },
  },
  plugins: [],
};

export default config;
