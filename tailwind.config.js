/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          'Inter',
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          'Segoe UI',
          'Roboto',
          'sans-serif',
        ],
        serif: ['"Source Serif Pro"', 'Georgia', 'serif'],
      },
      colors: {
        // Sobrio, accademico: grigi caldi + un accento petrolio
        ink: {
          50: '#f6f6f4',
          100: '#ececea',
          200: '#d9d8d3',
          300: '#b8b6ae',
          400: '#908d82',
          500: '#6b6860',
          600: '#4f4d46',
          700: '#3a3833',
          800: '#272521',
          900: '#161513',
        },
        accent: {
          50: '#eef7f7',
          100: '#d6ebea',
          200: '#aed7d5',
          300: '#7fbdba',
          400: '#54a09c',
          500: '#348582',
          600: '#266967',
          700: '#1f5452',
          800: '#1a4341',
          900: '#153735',
        },
      },
      boxShadow: {
        soft: '0 1px 2px rgba(20,20,20,0.04), 0 4px 12px rgba(20,20,20,0.04)',
      },
    },
  },
  plugins: [],
};
