module.exports = {
  purge: [],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    fontFamily: {
      // TODO: add fallbacks
      sans: ['Open Sans'],
      serif: ['Merriweather'],
      title: ['content-title'],
    },
    extend: {},
  },
  variants: {
    extend: {
      fontWeight: ['hover'],
    },
  },
  plugins: [],
};
