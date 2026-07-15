/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        'kin-blue': '#0066D6',
        'care-teal': '#00B7C7',
        'connection-orange': '#FF7A21',
        'soft-navy': '#102A43',
        'warm-cream': '#F8F5EF',
        'warm-gray': '#6B7280',
        'blue-tint': '#EAF2FD',
        'teal-tint': '#E6F8FA',
        'orange-tint': '#FFF0E5',
      },
      fontFamily: {
        heading: ['Sora', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
