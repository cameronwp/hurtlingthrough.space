import _ from 'lodash'
import Typography from 'typography'
import Wordpress2016 from 'typography-theme-wordpress-2016'

// https://github.com/KyleAMathews/typography.js/blob/master/packages/typography-theme-wordpress-2016/src/index.js
Wordpress2016.overrideThemeStyles = () => ({
  'a.gatsby-resp-image-link': {
    boxShadow: 'none',
  },
})

const typography = new Typography(_.assign({}, Wordpress2016, {
  bodyFontFamily: ['Bitter', 'serif'],
  headerFontFamily: ['Montserrat', 'Bitter', 'sans-serif'],
  googleFonts: [
    {
      name: 'Fira Mono',
      styles: ['400', '500']
    },
    {
      name: 'Montserrat',
      styles: ['700', '900'],
    },
    {
      name: 'Bitter',
      styles: [
        '400',
        '400i',
        '700',
        '700i',
      ],
    },
  ],
  overrideThemeStyles: ({ rhythm }, options, styles) => ({
    // blogs
    blockquote: {
      fontStyle: 'inherit',
      textAlign: 'justify',
      textIndent: '2em'
    },
    p: {
      fontSize: '18px'
    },
    code: {
      fontFamily: ['Fira Mono', 'monospace'].join(','),
      fontWeight: 500,
      fontSize: '1em',
      lineHeight: '1.5rem'
    },
    'p > code': {
      background: '#f3f0ee',
      fontWeight: 400
    },
    'blockquote > *not(:last-child)': {
      paddingBottom: '0.5'
    },
    'a.gatsby-resp-image-link': {
      boxShadow: 'none'
    },
  })
}))

// Hot reload typography in development.
if (process.env.NODE_ENV !== 'production') {
  typography.injectStyles()
}

export default typography
