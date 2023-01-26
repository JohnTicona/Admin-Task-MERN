/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    container: {
      screens: {
        sm: '100%',
        md: '100%',
        lg: '1024px',
        xl: '1280px'
      }
    },
    extend: {}
  },
  plugins: []
}
