/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      width: {
        40: "10rem",
      },
      height: {
        104: "26rem",
        112: "28rem",
        128: "32rem",
        136: "34rem",
        144: "36rem",
        152: "38rem",
        160: "40rem",
      },
    },
    fontFamily: {
      inder: ["Inder", "sans-serif"],
      "courrier-new": [
        "Courier New",
        "Courier",
        "Lucida Sans Typewriter",
        "Lucida Typewriter",
        "monospace",
      ],
    },
    colors: {
      "dark-blue": "#0C5586",
      "medium-blue": "#258BD0",
      "light-blue": "rgba(173, 213, 240, 0.26)",
      "arrow-blue": "#B3D7EF",
      "side-gradient": "bg-gradient-to-b from-#83d2ff to-#83d2ff",
      "gradient-start": "rgba(131, 210, 255, 0)",
      "gradient-end": "rgba(131, 210, 255, 0.47)",
      "side-blue": "#99C9EA",
      white: "#fff",
      red: "#FF0000",
      "button-blue": "#258BD0",
      "button-light-blue": " #2087cc;",
      "secondary-button": "rgba(18, 112, 176, 0.69)",
      "button-gradient-darker": "#258BD0",
      "button-gradient-lighter": "rgba(32, 135, 204, 0.54)",
      transparent: "rgba(0,0,0,0)",
    },
  },
  plugins: [],
};
