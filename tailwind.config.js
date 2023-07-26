/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        body: ['Poppins', 'sans-serif'],
      },
      colors: {
        bodyColor: '#0a0a0a',
        bgColor: '#FFFFFF',
        lightText: '#c4cfde',
        boxBg: 'linear-gradient(145deg, #1e2024, #23272b)',
        designColor: '#F43F5E',
        hoverColor: "rgba(100,255,218,0.1)"
      },
      boxShadow: {
        shadowOne: '10px 10px 15px 5px rgba(0,0,0,0.5), -10px -10px 38px -4px rgba(255,255,255,0.05)'
      }
    },
  },
  plugins: [require("daisyui")],
}

