import _ from 'lodash'
import Typography from 'typography'
import Wordpress2016 from 'typography-theme-wordpress-2016'

Wordpress2016.overrideThemeStyles = () => ({
  'a.gatsby-resp-image-link': {
    boxShadow: 'none',
  },
})

const typography = new Typography(_.assign({}, Wordpress2016, {
  bodyFontFamily: ['Arvo', 'sans-serif'],
  headerFontFamily: ['Montserrat', 'Arvo', 'sans-serif'],
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
      name: 'Arvo',
      styles: [
        '400',
        '400i',
        '700',
        '700i',
      ],
    },
  ],
  overrideThemeStyles: ({ rhythm }, options, styles) => ({
    blockquote: {
      fontStyle: 'inherit',
      textAlign: 'justify',
      textIndent: '2em'
    },
    code: {
      fontFamily: ['Fira Mono', 'monospace'].join(','),
      fontWeight: 500
    },
    'p > code': {
      background: '#f3f0ee',
      fontSize: '0.95em',
      fontWeight: 400
    },
    'blockquote > *not(:last-child)': {
      paddingBottom: '0.5'
    },
    '.fade-in-black-to-blue': {
      height: '100vh',
      background: `linear-gradient(180deg, #000 0%, #09f 100%)`,
    },
  })
}))

// Hot reload typography in development.
if (process.env.NODE_ENV !== 'production') {
  typography.injectStyles()
}

export default typography
