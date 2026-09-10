/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        tnGov: {
          primary: '#0B3B24', // Deep Tamil Nadu Government green
          dark: '#062416',
          light: '#1B6B44',
          accent: '#E6A100', // Gold / Temple yellow
          cream: '#FFFDF9',
          border: '#D3E2D8'
        },
        centralGov: {
          primary: '#0B3A78', // Ashoka Chakra deep blue
          accent: '#FF9933', // Saffron
          light: '#EBF3FC'
        }
      },
      fontFamily: {
        sans: ['Outfit', 'Inter', 'system-ui', 'sans-serif'],
        tamil: ['Noto Sans Tamil', 'Mukta Malar', 'sans-serif']
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'slide-up': 'slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        slideUp: {
          '0%': { transform: 'translateY(15px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' }
        }
      }
    },
  },
  plugins: [],
}
