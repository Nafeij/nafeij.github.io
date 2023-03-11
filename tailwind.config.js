/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/pages/**/*.{js,jsx,ts,tsx}",
    "./src/components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    fontFamily: {
      'source-sans-probold': ['source_sans_probold', 'sans-serif'],
    }
  },
  plugins: [
		require("tailwindcss-animate"),
	],
}
