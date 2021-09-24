/** @type {import('@types/tailwindcss/tailwind-config').TailwindConfig} */
module.exports = {
  purge: ['./src/**/*.{jsx,tsx}'],
  darkMode: 'media',
  plugins: [],
  theme: {
    colors: {},
    zIndex: {
      0: 0,
      1: 1,
      infinity: 2147483647,
    },
  },
  variants: {
    extend: {
      textColor: ['disabled'],
      backgroundColor: ['disabled'],
    },
  },
};