/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
    colors: {
      pateleta: {
        50: '#f1f7fd',
        100: '#deedfb',
        200: '#c5e2f8',
        300: '#9dd0f3',
        400: '#6fb6eb',
        500: '#4d98e4',
        600: '#337ad7',
        700: '#2f69c6',
        800: '#2c55a1',
        900: '#284a80',
        950: '#1d2e4e'
      }
    }
  },
  plugins: []
}
