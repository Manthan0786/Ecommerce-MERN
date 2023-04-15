/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [ "./src/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
    },
    colors: {
      'blue': '#1fb6ff',
      'purple': '#7e5bef',
      'pink': '#ff49db',
      'orange': '#ff7849',
      'green': '#13ce66',
      'yellow': '#ffc82c',
      'gray-dark': '#273444',
      'gray': 'rgb(107 114 128)',
      'gray-light': '#d3dce6',
      'slate': 'rgb(248 250 252)',
      'amber':'rgb(253 230 138)',
      'black': '#1c1917'
    },
    fontFamily: {
      sans: ['Graphik', 'sans-serif'],
      serif: ['Merriweather', 'serif'],
    },
    extend: {},
  },
  plugins: [],
}