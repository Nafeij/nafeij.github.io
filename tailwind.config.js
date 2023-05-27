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
        tertiary: 'var(--button-primary)',
        quaternary: 'var(--button-secondary)',
        quinary: 'var(--accent)'
      },
      textColor: {
        primary: 'var(--text-primary)',
        secondary: 'var(--text-secondary)',
        tertiary: 'var(--bg-primary)',
        quaternary: 'var(--bg-secondary)',
        quinary: 'var(--accent)'
      },
      fill: {
        blob1: 'var(--blob1)',
        blob2: 'var(--blob2)'
      },
      transitionDuration: {
        DEFAULT: 'var(--transition-duration)'
      },
      transitionTimingFunction: {
        DEFAULT: 'var(--easing)'
      }
    }
  }
}
