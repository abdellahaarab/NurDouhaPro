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
          DEFAULT: '#050505',
          100: '#0B0B0F',
          200: '#13131A',
          300: '#1A1A24',
          400: '#22222F',
          500: '#2A2A3C',
          600: '#3A3A50',
        },
      },
      fontFamily: {
        arabic: ['Noto Naskh Arabic', 'Amiri', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Playfair Display', 'Georgia', 'serif'],
      },
      backgroundImage: {
        'radial-primary': 'radial-gradient(ellipse at top, rgba(222,166,155,0.18) 0%, transparent 70%)',
        'radial-accent': 'radial-gradient(ellipse at bottom, rgba(185,240,163,0.12) 0%, transparent 70%)',
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'shimmer': 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.08) 50%, transparent 100%)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'float-delayed': 'float 7s ease-in-out 1s infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'spin-slow': 'spin 25s linear infinite',
        'shimmer': 'shimmer 2s infinite',
        'border-glow': 'borderGlow 3s ease-in-out infinite',
        'text-shine': 'textShine 4s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        glow: {
          from: { boxShadow: '0 0 15px rgba(222,166,155,0.25)' },
          to: { boxShadow: '0 0 35px rgba(222,166,155,0.55)' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        borderGlow: {
          '0%, 100%': { borderColor: 'rgba(222,166,155,0.2)' },
          '50%': { borderColor: 'rgba(222,166,155,0.5)' },
        },
        textShine: {
          '0%': { backgroundPosition: '0% 50%' },
          '100%': { backgroundPosition: '200% 50%' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
      transitionTimingFunction: {
        'out-expo': 'cubic-bezier(0.19, 1, 0.22, 1)',
        'out-back': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
      boxShadow: {
        'glow-primary': '0 0 40px rgba(222,166,155,0.25)',
        'glow-accent': '0 0 40px rgba(185,240,163,0.18)',
        'card': '0 8px 32px -8px rgba(0,0,0,0.35)',
        'card-hover': '0 20px 60px -15px rgba(0,0,0,0.5)',
      },
    },
  },
  plugins: [],
};
