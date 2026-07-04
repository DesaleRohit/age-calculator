/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Warm amber/gold replaces the original pink accent — a nod to
        // birthday candlelight, which fits an age calculator's theme.
        primary: '#56524f', // main text / heading color
        accent: '#f0b94d', // borders, circle glow, close button
        'accent-soft': '#fdf3df', // hover wash on inputs/button
        muted: '#84807d', // placeholder / secondary text
        // Reserved for backend validation messages (e.g. the 400 the
        // controller returns for a future date) — warm rust so it still
        // sits inside the amber/candlelight palette instead of clashing.
        error: '#c1512c',
        'error-soft': '#fbe9e1',
      },
      fontFamily: {
        display: ['"Sansita Swashed"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
