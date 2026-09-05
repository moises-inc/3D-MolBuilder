/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        oled: {
          bg: '#000000',
          card: '#080c0e',
          panel: '#0d1519',
          border: '#1a272f',
          subtle: '#121f26',
        },
        uss: {
          blue: '#00205B',
          gold: '#D4AF37',
          goldBright: '#F3C94E',
        },
        pide: {
          cyan: '#5de1e5',
          cyanGlow: 'rgba(93, 225, 229, 0.25)',
          amber: '#efb65f',
          emerald: '#38ef7d',
          rose: '#ff4d6d',
        },
        cpk: {
          carbon: '#262626',
          hydrogen: '#FFFFFF',
          oxygen: '#EF4444',
          nitrogen: '#3B82F6',
          chlorine: '#22C55E',
          sulfur: '#EAB308',
        }
      },
      fontFamily: {
        mono: ['"IBM Plex Mono"', 'SFMono-Regular', 'Menlo', 'monospace'],
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
