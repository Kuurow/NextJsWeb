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
      backgroundImage: {
        main: "url('/img/504c2976-91fa-4784-bedc-5f75a13a90e4.webp')"
      },
      backgroundColor : {
        brown: "background-color: rgb(129, 65, 65)"
      },
      fontFamily: {
        neuropol: ["Neuropol", ...fontFamily.sans],
        hybrid_o : ["Hybrid_o", ...fontFamily.sans],
        hybrid_b : ["Hybrid_b", ...fontFamily.sans],
      },
    },
  },
  plugins: [],
} satisfies Config;