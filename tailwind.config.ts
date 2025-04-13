import type { Config } from 'tailwindcss';
import colors from 'tailwindcss/colors';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        gray: colors.gray,
        blue: colors.blue,
        purple: colors.purple,
        yellow: colors.yellow,
        'neon-blue': '#00f3ff',
        'neon-purple': '#9d4edd',
        'neon-pink': '#ff2a6d',
        'neon-green': '#05ffa1',
        'glass-white': 'rgba(255, 255, 255, 0.1)',
        'glass-dark': 'rgba(17, 25, 40, 0.75)',
        'dark-navy': '#0a192f',
        'light-navy': '#112240',
        'dark-card': '#1a1e2c',
        'darker-card': '#141824',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'futuristic-grid': 'url("/grid-pattern.svg")',
      },
      boxShadow: {
        'neon-blue': '0 0 5px rgba(0, 243, 255, 0.5), 0 0 20px rgba(0, 243, 255, 0.3)',
        'neon-purple': '0 0 5px rgba(157, 78, 221, 0.5), 0 0 20px rgba(157, 78, 221, 0.3)',
        'neon-pink': '0 0 5px rgba(255, 42, 109, 0.5), 0 0 20px rgba(255, 42, 109, 0.3)',
        'neon-green': '0 0 5px rgba(5, 255, 161, 0.5), 0 0 20px rgba(5, 255, 161, 0.3)',
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'move-bg': 'move-bg 8s ease infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'move-bg': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
    },
  },
  plugins: [],
}

export default config;
