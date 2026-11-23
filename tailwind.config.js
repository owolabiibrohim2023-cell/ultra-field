/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Ultrafield brand palette — deep navy/charcoal with a professional blue accent
        ink: {
          950: '#070b14',
          900: '#0b1220',
          800: '#111a2c',
          700: '#1c2739',
          600: '#2a3648',
        },
        ultrablue: {
          50: '#eef4ff',
          100: '#dce7ff',
          200: '#b9cdff',
          300: '#8aa9ff',
          400: '#5b85ff',
          500: '#3563f9',
          600: '#1f49db',
          700: '#1a3bb5',
          800: '#1a328f',
          900: '#1b2e73',
        },
        sand: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e6ebf2',
        },
      },
      fontFamily: {
        sans: ['Inter', 'Manrope', 'Plus Jakarta Sans', 'system-ui', 'sans-serif'],
        anton: ['Anton', 'system-ui', 'sans-serif'],
        archivo: ['Archivo', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'monospace'],
      },
      boxShadow: {
        card: '0 1px 2px rgba(7, 11, 20, 0.06), 0 8px 24px rgba(7, 11, 20, 0.08)',
        cardLg: '0 4px 8px rgba(7, 11, 20, 0.08), 0 24px 48px rgba(7, 11, 20, 0.12)',
        focus: '0 0 0 3px rgba(53, 99, 249, 0.35)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        shimmer: {
          '100%': { transform: 'translateX(100%)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.7s cubic-bezier(0.22, 1, 0.36, 1) both',
        'fade-in': 'fade-in 0.8s ease-out both',
      },
    },
  },
  plugins: [],
}
