/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      animation: {
        fade: 'fadeOut .3s ease-in-out',
        scaleUp: 'scaleUp .3s ease-out',
        scaleUp2: 'scaleUp2 .5s ease-out',
        slideDown: 'slideDown .2s ease-in-out',
        slideLeft: 'slideLeft .2s ease-out',
        slideLeft2: 'slideLeft2 .2s ease-out',
      },
      keyframes: theme => ({
        fadeOut: {
          '0%': { backgroundColor: 'rgba(0, 0, 0, 0)' },
          '100%': { backgroundColor: 'rgba(0, 0, 0, 0.5)' },
        },
        scaleUp: {
          '0%': { transform: 'scale(0.9)' },
          '100%': { transform: 'scale(1)' },
        },
        scaleUp2: {
          '0%': { transform: 'scale(0.5)' },
          '100%': { transform: 'scale(1)' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-10px)', opacity: 0 },
          '100%': { transform: 'translateY(0)', opacity: 1 },
        },
        slideLeft: {
          '0%': { transform: 'translateX(10px)', opacity: 0 },
          '100%': { transform: 'translateX(0)', opacity: 1 },
        },
        slideLeft2: {
          '0%': { transform: 'translateX(10px)' },
          '100%': { transform: 'translateX(0)'},
        },
      }),
    },
  },
  plugins: [],
};
