/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cudeca: {
          yellow: '#86EFAC',
          green: '#86EFAC',
          lightGreen: '#D1FAE5',
          darkGreen: '#059669',
          mediumGreen: '#10B981',
          paleGreen: '#ECFDF5',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
