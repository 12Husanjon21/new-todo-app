/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        light: '#fff',
        dark: '#1E1E1E',
        gray: '#777777',
        violet: '#9E78CF',
        'dark-violet': '#1D1825',
        green: '#78CFB0',
        darkest: '#15101C',
        'dark-col': '#0D0714',
      },
    },
  },
  plugins: [],
}

