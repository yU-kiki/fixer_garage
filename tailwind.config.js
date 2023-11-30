/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        'hiragino': ['Hiragino Kaku Gothic Pro', 'sans-serif'],
      },
      colors: {
        "black": "#231815",
        "white": "#ffffff",
        "gray": "#a2a2a2",
        "light-gray": "#efefef",
        "blue": "#0075c2",
      },
      boxShadow: {
        'box': '0px 0px 60px 20px rgba(0, 0, 0, 0.05)',
      },
    },
  },
  plugins: [],
}
