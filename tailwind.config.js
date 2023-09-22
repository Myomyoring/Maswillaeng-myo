/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    colors: {
      transparent: 'transparent',
      inherit: 'inherit',
      black: '#000000',
      darkgray: '#6B7280',
      gray: '#D4D4D4',
      green: '#22C55E',
      lightgray: '#F3F4F6',
      main: '#FBF9EC',
      point: '#EA4E4E',
      coral: '##FCA5A5',
      white: '#FFFFFF',
    },
    fontSize: {
      xxs: '0.5rem',
      xs: '0.75rem',
      sm: '0.875rem',
      md: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.563rem',
      '3xl': '1.953rem',
      '4xl': '2.441rem',
      '5xl': '3.052rem',
    },
    extend: {},
  },
  plugins: [],
};
