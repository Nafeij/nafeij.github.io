/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,jsx,ts,tsx}',
    './src/components/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    fontFamily: {
      'source-sans-probold': ['source_sans_probold', 'sans-serif'],
      mono: ['ui-monospace', 'Roboto Mono', 'monospace']
    },
    extend: {
      backgroundColor: {
        primary: 'var(--bg-primary)',
        secondary: 'var(--bg-secondary)',
        tertiary: 'var(--color-primary)',
        blob1: 'var(--blob1)',
        blob2: 'var(--blob2)'
      },
      textColor: {
        primary: 'var(--text-primary)',
        secondary: 'var(--text-secondary)',
        tertiary: 'var(--color-primary)',
        blob1: 'var(--blob1)',
        blob2: 'var(--blob2)'
      },
      fill: {
        blob1: 'var(--blob1)',
        blob2: 'var(--blob2)'
      }
    }
  },
  plugins: [
    require('tailwindcss-animate')
  ]
}
