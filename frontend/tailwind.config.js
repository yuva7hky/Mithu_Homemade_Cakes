/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#E91E63",
        deepPink: "#C2185B",
        softPink: "#FCE4EC",
        lightPink: "#FFF5F8",
        textMain: "#3A2028",
        textMuted: "#7A626A",
        whatsapp: "#25D366"
      },
      boxShadow: {
        'clay': '8px 8px 16px #d9d9d9, -8px -8px 16px #ffffff',
        'clay-pink': '6px 6px 12px #f2dae2, -6px -6px 12px #ffffff',
        'clay-hover': 'inset 4px 4px 8px #d9d9d9, inset -4px -4px 8px #ffffff',
        'clay-pink-hover': 'inset 4px 4px 8px #f2dae2, inset -4px -4px 8px #ffffff'
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
