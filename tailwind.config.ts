import type { Config } from "tailwindcss";
const { fontFamily } = require("tailwindcss/defaultTheme");

export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        highlight: "inset 0 0 0 1px rgba(255, 255, 255, 0.05)",
      },
      screens: {
        narrow: { raw: "(max-aspect-ratio: 3 / 2)" },
        wide: { raw: "(min-aspect-ratio: 3 / 2)" },
        "taller-than-854": { raw: "(min-height: 854px)" },
      },
      backgroundColor: {
        brown: "background-color: rgb(129, 65, 65)"
      },
      fontFamily: {
        head:       ["Space Grotesk", ...fontFamily.sans],
        archivo:    ["Archivo Expanded", ...fontFamily.sans],
        mono:       ["JetBrains Mono", "ui-monospace", "monospace"],
      },
      colors: {
        bg:      "#0a0908",
        ink:     "#f2ede6",
        accent:  "#c65a2e",
        // legacy palette kept for the gallery boarding-pass cards
        cream:   "#F5EEE5",
        sand:    "#D9C4A8",
        warm:    "#B8956A",
      },
    },
  },
  plugins: [],
} satisfies Config;
