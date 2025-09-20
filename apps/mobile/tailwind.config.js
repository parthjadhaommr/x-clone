/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{ts,tsx}",                  // your app source files
    "../../packages/ui/src/**/*.{ts,tsx}",  // shared UI components in packages/ui
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {},
  },
  plugins: [],
};