/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./index.html",
      "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          primary: {
            purple: '#715F87',
            gold: '#F2B448',
            red: '#D0776A',
          }
        },
      },
    },
    plugins: [],
  }