/** @type {import('tailwindcss').Config} */

const defaultTheme = require('tailwindcss/defaultConfig')

module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  important: true,
  theme: {
    ...defaultTheme,
    colors:{
      ...defaultTheme.colors,
      primary:'#3B81F6',
      white:'#FFFFFF',
      text:{
        DEFAULT:'#1F2937',
        light:'#6C7281'
      },
      light:{
        DEFAULT:'#FAFBFC',
        lighter:'#F3F4F6'
      }
    },
    extend: {},
  },
  plugins: [],
}

// module.exports = {
//   prefix: 'tw-',
//   purge: [
//     './components/**/*.tsx',
//     './components/**/*.jsx',
//     './pages/**/*.tsx',
//     './pages/**/*.jsx'
//   ],
//   theme: {
//     ...defaultTheme,
//     colors:{
//       ...defaultTheme.colors,
//       primary:'#3B81F6',
//       white:'#FFFFFF',
//       text:{
//         DEFAULT:'#1F2937',
//         light:'#6C7281'
//       },
//       light:{
//         DEFAULT:'#FAFBFC',
//         lighter:'#F3F4F6'
//       }
//     },
//     extend: {},
//   },
//   variants: {},
//   plugins: [],
//   corePlugins: {
//     preflight: false
//   }
// }
