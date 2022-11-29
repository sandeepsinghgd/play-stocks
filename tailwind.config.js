/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/pages/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
    screens: {
      'xs': '397px',
      'md': '768px',
      'tablet': '992px',
      'lg': '1024px',
      'desktop': '1280px',
    },
  },
  plugins: [],
}
