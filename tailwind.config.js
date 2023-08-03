/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");
module.exports = withMT({
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        lightGreen: "#00c1a2",
        hoverLightGreen: " #019d91",
        basicBlack: "#20272c",
        basicgray: "#63727e",
        //
        basicOrange: "#ED7B49",
        basicPink: "E9B19D",
        matisBlue: "#B6C1E9",
        sailBlue: "#b0e0fa",
      },
      fontFamily: {
        sans: ['var(--font-outfit)'],
        mono: ['var(--font-outfit-mono)'],
      },
      borderRadius: {
        DEFAULT: "12px",
      },
      dropShadow: {
        "3xl": "0px 0px 30px #0000000f",
      },
    },
  },
  plugins: [],
});
