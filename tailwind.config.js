export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        emerald: {
          400: '#10b981',
        },
        zinc: {
          900: '#18181b',
          950: '#09090b',
        },
      },
    },
  },
  plugins: [],
  darkMode: 'class',
}
