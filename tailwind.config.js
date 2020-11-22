module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  purge: false,
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    fontFamily: {
      // TODO: add fallbacks
      sans: [`"Open Sans"`],
      serif: [`"Merriweather"`],
      title: [`"content-title"`],
      'cv-sans': [`"Raleway"`],
      'cv-serif': [`"Lora"`],
    },
    extend: {
      screens: {
        print: { raw: 'print' },
      },
      transitionProperty: {
        spacing: 'margin, padding',
      },
      borderWidth: {
        10: '10px',
      },
    },
  },
  variants: {
    extend: {
      fontWeight: ['hover'],
      boxShadow: ['dark'],
      borderWidth: ['dark'],
      scale: ['hover'],
      transform: ['hover'],
    },
  },
  plugins: [],
};
