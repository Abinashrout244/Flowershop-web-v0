/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'serif-display': ['"Cormorant Garamond"', 'serif'],
        'playfair': ['"Playfair Display"', 'serif'],
        'jost': ['Jost', 'sans-serif'],
        'poppins': ['Poppins', 'sans-serif'],
      },
      colors: {
        gold: {
          50:  '#fdf8f0',
          100: '#faefd8',
          200: '#f4dba8',
          300: '#ecc06e',
          400: '#e3a440',
          500: '#c9a87c',
          600: '#b8966b',
          700: '#9a7a55',
          800: '#7d6145',
          900: '#654f38',
        },
      },
      animation: {
        'fade-up': 'fadeUp 0.6s ease forwards',
        'zoom-in': 'zoomIn 0.5s ease forwards',
      },
      keyframes: {
        fadeUp: {
          '0%':   { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        zoomIn: {
          '0%':   { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}
