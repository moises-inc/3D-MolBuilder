/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        oled: {
          bg: '#09090b',
          card: '#121216',
          panel: 'rgba(18, 18, 22, 0.85)',
          border: 'rgba(249, 115, 22, 0.2)',
          subtle: '#18181b',
        },
        uss: {
          blue: '#00205B',
          gold: '#D4AF37',
          goldBright: '#F3C94E',
        },
        pide: {
          cyan: '#5de1e5',
          cyanGlow: 'rgba(93, 225, 229, 0.25)',
          amber: '#F97316',
          amberDark: '#EA580C',
          amberGlow: 'rgba(249, 115, 22, 0.2)',
          emerald: '#38ef7d',
          rose: '#ff4d6d',
        },
        cpk: {
          carbon: '#262626',
          hydrogen: '#FFFFFF',
          oxygen: '#EF4444',
          nitrogen: '#3B82F6',
          chlorine: '#10B981',
          sulfur: '#F59E0B',
        }
      },
      boxShadow: {
        'amber-glow': '0 0 20px rgba(249, 115, 22, 0.15)',
        'amber-lg': '0 0 30px rgba(249, 115, 22, 0.25)',
      },
      fontFamily: {
        mono: ['"IBM Plex Mono"', 'SFMono-Regular', 'Menlo', 'monospace'],
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
