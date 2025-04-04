/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        'hiragino': ['Hiragino Kaku Gothic Pro', 'sans-serif'],
        'helvetica': ['Helvetica', 'Helvetica Neue', 'sans-serif'],
      },
      colors: {
        "black": "#231815",
        "white": "#ffffff",
        "gray": "#c5c5c5",
        "dark-gray": "#828282",
        "light-gray": "#e5e5e5",
        "blue": "#0075c2",
        "blue-light" : "#1773b0",
        "red": "#dd0000",
      },
      boxShadow: {
        'box': '0px 0px 60px 20px rgba(0, 0, 0, 0.05)',
      },
    },
  },
  plugins: [],
}
