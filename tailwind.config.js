module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  purge: false,
  darkMode: 'class',
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
      color: {
        black: '#111111',
      },
      screens: {
        print: { raw: 'print' },
      },
      transitionProperty: {
        spacing: 'margin, padding',
      },
      borderWidth: {
        10: '10px',
      },
      // TODO: implement some overrides here
      typography: (theme) => ({
        DEFAULT: {
          css: {
            // TODO: fix that when fix all theming dark/light
            color: 'black',
            fontFamily: theme('fontFamily.serif'),
            h2: {
              fontFamily: theme('fontFamily.sans'),
            },
            h3: {
              fontFamily: theme('fontFamily.sans'),
            },
            h4: {
              fontFamily: theme('fontFamily.sans'),
            },
            h5: {
              fontFamily: theme('fontFamily.sans'),
            },
            h6: {
              fontFamily: theme('fontFamily.sans'),
            },
            blockquote: {
              borderLeftColor: 'black',
            },
          },
        },

        dark: {
          css: {
            color: 'white',
            blockquote: {
              borderLeftColor: 'white',
            },
          },
        },
      }),
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
    typography: ['dark'],
  },
  plugins: [require('@tailwindcss/typography')],
};
