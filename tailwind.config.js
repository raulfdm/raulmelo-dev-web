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
    extend: {
      transitionProperty: {
        spacing: 'margin, padding',
      },
    },
  },
  variants: {
    extend: {
      fontWeight: ['hover'],
      boxShadow: ['dark'],
      borderWidth: ['dark'],
    },
  },
  plugins: [],
};
