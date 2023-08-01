/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      inherit: "inherit",
      transparent: "transparent",
      main: "#FBF9EC",
      point: "#EA4E4E",
      white: "#FFFFFF",
      black: "#000000",
      gray: "rgb(212 212 212)",
      lightgray: "rgb(243 244 246)",
      darkgray: "rgb(107 114 128)",
      red: "rgb(252 165 165)",
      green: "rgb(34 197 94)",
  },
    fontSize: {
      xxs: '0.5rem',
      xs: '0.75rem',
      sm: '0.875rem',
      md: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.563rem',
      '3xl': '1.953rem',
      '4xl': '2.441rem',
      '5xl': '3.052rem',
    },
    extend: {},
  },
  plugins: [],
}