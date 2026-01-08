/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        mission: {
          primary: '#1e40af',
          secondary: '#3b82f6',
          accent: '#60a5fa',
          dark: '#1e3a8a',
        }
      }
    },
  },
  plugins: [],
}
