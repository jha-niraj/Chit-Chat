/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extends: {
      colors: {
        "primary": "#1476ff",
        "secondary": "#f3f5ff",
        "primary-font": "Roboto"
      },
    }
  },
  plugins: [],
}