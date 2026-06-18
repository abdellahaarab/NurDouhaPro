/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#DEA69B',
        accent: '#B9F0A3',
        dark: {
          DEFAULT: '#0B0B0F',
          100: '#13131A',
          200: '#1A1A24',
          300: '#22222F',
          400: '#2A2A3C',
          500: '#3A3A50',
        },
      },
      fontFamily: {
        arabic: ['Noto Naskh Arabic', 'Amiri', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Playfair Display', 'Georgia', 'serif'],
      },
      backgroundImage: {
        'radial-primary': 'radial-gradient(ellipse at top, rgba(222,166,155,0.15) 0%, transparent 70%)',
        'radial-accent': 'radial-gradient(ellipse at bottom, rgba(185,240,163,0.1) 0%, transparent 70%)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        glow: {
          from: { boxShadow: '0 0 10px rgba(222,166,155,0.3)' },
          to: { boxShadow: '0 0 25px rgba(222,166,155,0.6)' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
};
