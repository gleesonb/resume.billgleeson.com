/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#0a0a0a',
        card: '#141414',
        'accent-teal': '#4ade80',
        'accent-amber': '#d4a574',
        'text-secondary': '#a1a1aa',
        border: '#27272a',
      },
      fontFamily: {
        'playfair': ['"Playfair Display"', 'serif'],
        'inter': ['"Inter"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
