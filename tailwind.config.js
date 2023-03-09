/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  darkMode: 'class',
  content: [
    "./src/pages/**/*.{js,jsx,ts,tsx}",
    "./src/components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {},
  plugins: [
		require("tailwindcss-animate"),
	],
}
