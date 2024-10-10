module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#3B82F6', // blue-500
          DEFAULT: '#2563EB', // blue-600 #1E40AF
          dark: '#1D4ED8', // blue-700 #1E3A8A
        },
        secondary: {
          light: '#FB923C', // orange-400
          DEFAULT: '#F97316', // orange-500
          dark: '#EA580C', // orange-600
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
}