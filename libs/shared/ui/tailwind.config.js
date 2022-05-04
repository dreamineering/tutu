const { createGlobPatternsForDependencies } = require('@nrwl/next/tailwind');
const { join } = require('path');

// Debugging
// const path = join(__dirname, './src/**/*.{js,ts,jsx,tsx}');
// console.log('path', path);

module.exports = {
  presets: [require('../../../tailwind-workspace-preset.js')],
  content: [
    join(__dirname, './src/**/*.{js,ts,jsx,tsx}'),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  // darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [require('@tailwindcss/forms')],
};
