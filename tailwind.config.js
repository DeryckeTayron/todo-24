/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts ,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        'dm-sans': ['DM Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
