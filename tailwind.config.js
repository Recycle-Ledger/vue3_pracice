/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ledgerdarkgreen: {
          100: '#d5ecdc',
          200: '#abd9b9',
          300: '#81c596',
          400: '#57b273',
          500: '#2d9f50',
          600: '#247f40',
          700: '#1b5f30',
          800: '#124020',
          900: '#092010',
        },
      },
    },
  },
  plugins: [],
};
