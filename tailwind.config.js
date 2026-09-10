/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "#221F1B",
          light: "#3A352E",
        },
        parchment: {
          DEFAULT: "#FAF6EC",
          dim: "#F1EADA",
        },
        rust: {
          DEFAULT: "#B8471E",
          dark: "#933817",
          light: "#D96A3F",
        },
        sage: {
          DEFAULT: "#5B6E4F",
          dark: "#485A3E",
        },
        saffron: {
          DEFAULT: "#E3A72F",
          dark: "#C48A1C",
        },
        teal: {
          DEFAULT: "#3C6E64",
          dark: "#2C5049",
        },
      },
      fontFamily: {
        display: ["Fraunces", "serif"],
        body: ["Work Sans", "sans-serif"],
      },
      backgroundImage: {
        "grain": "radial-gradient(circle at 1px 1px, rgba(34,31,27,0.06) 1px, transparent 0)",
      },
    },
  },
  plugins: [],
};
