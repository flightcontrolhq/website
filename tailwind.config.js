const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./components/**/*.{ts,tsx}', './pages/**/*.{ts,tsx}'],
  theme: {
    extend: {
      screens: {
        tablet: '575px', // this is tablet breakpoint in Makeswift
        desktop: '768px', // this is desktop breakpoint in Makeswift
        // Hang tight we are working on making them customizable :)
      },
      fontFamily: {
        sans: ['Epilogue', ...defaultTheme.fontFamily.sans],
        mono: ['JetBrains Mono', ...defaultTheme.fontFamily.mono],
      },
      spacing: {
        1.5: '0.375rem',
        2.5: '0.625rem',
        3.5: '0.875rem',
        4.5: '1.125rem',
        5.5: '1.375rem',
        6.5: '1.625rem',
        7.5: '1.875rem',
        8.5: '2.125rem',
        9.5: '2.375rem',
      },
      fontSize: {
        xs: ['0.75rem', { lineHeight: '1.33' }],
        sm: ['0.875rem', { lineHeight: '1.4' }],
        base: ['1rem', { lineHeight: '1.5' }],
        lg: ['1.125rem', { lineHeight: '1.5' }],
        xl: ['1.25rem', { lineHeight: '1.4' }],
        '2xl': ['1.5rem', { lineHeight: '1.33' }],
        '3xl': ['1.875rem', { lineHeight: '1.2' }],
        '4xl': ['2.25rem', { lineHeight: '1.1' }],
        '5xl': ['3rem', { lineHeight: '1' }],
        '6xl': ['3.75rem', { lineHeight: '1' }],
        '7xl': ['4.5rem', { lineHeight: '1' }],
        '8xl': ['6rem', { lineHeight: '1' }],
        '9xl': ['8rem', { lineHeight: '1' }],
        // straight from MakeswiftTypographies
        heading1: ['3.75rem', { lineHeight: '1.2' }],
        heading2: ['1.6rem', { lineHeight: '1.3' }],
        small: ['1rem', { lineHeight: '1.5' }],
        medium: ['1.125rem', { lineHeight: '1.7' }],
      },
      colors: {
        white: '#ffffff',
        green: '#22D834',
        blue: '#327DF9',
        lightGray: '#B5C1D3',
        midGray: '#465368',
        darkGray: '#101826',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
