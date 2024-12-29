import type { Config } from "tailwindcss";

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
      backgroundImage: {
        custom: "url('/img/dddepth-267.jpg')",
        main: "url('/img/caddedf8-cfde-468e-9a21-713f0a3bf787.webp')"
      },
      backgroundColor : {
        brown: "background-color: rgb(129, 65, 65)"
      }
    },
  },
  plugins: [],
} satisfies Config;