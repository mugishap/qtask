/** @type {import('tailwindcss').Config} */

const colors = require("tailwindcss/colors")

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      'mmsm': '360px',
      'msm': '435px',
      'smm20': '620px',
      'sm': '640px',
      'sm10': '650px',
      'md': '768px',
      'mlg': '800px',
      'lg': '1024px',
      'plg': '1135px',
      'mxl': '1335px',
      'xl': '1280px',
      '2xl': '1536px',
    },
    extend: {
      keyframes: {
        ring: {
          '0%, 100%': { transform: 'rotate(0deg)' },
          '25%': { transform: 'rotate(1deg)' },
          '75%': { transform: 'rotate(-1deg)' }
        }
      },
      animation: {
        ring: 'ring .5s ease-in-out',
      },
    },
    fontFamily: {
      'sans': ['ui-sans-serif', 'system-ui',],
      'serif': ['ui-serif', 'Georgia',],
      'mono': ['ui-monospace', 'SFMono-Regular',],
      'display': ['Oswald',],
      'body': ['"Open Sans"',],
      'nunito': ['"Nunito"',],
      'oregano': ['"Oregano"',],
    },
    colors: {
      ...colors,
      "delete-red": "#d72222",
      "primary-blue": "#1B1464",
      "secondary-blue": "#29AAE3",
    }
  },
  plugins: [],
}