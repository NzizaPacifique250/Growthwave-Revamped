/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        gw: {
          navy: '#1A4FBA',
          midnight: '#0D1B4B',
          midnightCard: '#162040',
          teal: '#00A896',
          tealDark: '#008F80',
          ice: '#EBF3FF',
          ink: '#1A1A2E',
          slate: '#6B7A99',
          amber: '#F39C12',
        },
      },
      fontFamily: {
        display: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 6px 24px -8px rgba(13, 27, 75, 0.12), 0 2px 6px -2px rgba(13, 27, 75, 0.06)',
        cardHover: '0 18px 40px -12px rgba(13, 27, 75, 0.22), 0 4px 12px -4px rgba(13, 27, 75, 0.10)',
        tealGlow: '0 0 60px -10px rgba(0, 168, 150, 0.45)',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        floatY: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
      },
      animation: {
        fadeUp: 'fadeUp 0.7s ease-out forwards',
        floatY: 'floatY 6s ease-in-out infinite',
      },
      backgroundImage: {
        'mesh-grid':
          "linear-gradient(rgba(26, 47, 107, 0.20) 1px, transparent 1px), linear-gradient(90deg, rgba(26, 47, 107, 0.20) 1px, transparent 1px)",
      },
    },
  },
  plugins: [],
};
