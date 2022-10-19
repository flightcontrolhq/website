//
// This is your Tailwind CSS configuration, where
// you can define global style constants such as
// color palette, fonts and sizes.
//
// Read more at https://tailwindcss.com.
//

const defaultTheme = require('tailwindcss/defaultTheme')
const colors = require('tailwindcss/colors')

module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './templates/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  important: true,
  darkMode: 'class',
  theme: {
    screens: Object.assign(defaultTheme.screens, { xs: '475px' }),
    extend: {
      colors: {
        primary: colors.emerald,
        green: colors.emerald,
        secondary: colors.yellow,
        success: colors.green,
        warning: colors.yellow,
        error: colors.red,
        blueGray: colors.gray,
        gray: colors.gray,
      },
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
        serif: ['Merriweather', ...defaultTheme.fontFamily.serif],
        mono: ['Menlo', ...defaultTheme.fontFamily.mono],
        system: ['Inter', ...defaultTheme.fontFamily.sans],
      },
      borderRadius: {
        primary: '0.125rem',
      },
    },
  },
  variants: {},
  plugins: [require('@tailwindcss/typography')],
}
