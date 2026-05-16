import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        sand: "#f5efe3",
        ink: "#14213d",
        cream: "#fffaf0",
        panel: "#fffdf9",
        accent: "#ff7a00",
        accentSoft: "#ffe3c2",
        success: "#0f766e",
      },
      boxShadow: {
        float: "0 20px 60px rgba(20, 33, 61, 0.12)",
      },
    },
  },
  plugins: [],
};

export default config;
