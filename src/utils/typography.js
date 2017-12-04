import _ from 'lodash'
import Typography from 'typography'
import Wordpress2016 from 'typography-theme-wordpress-2016'

Wordpress2016.overrideThemeStyles = () => ({
  'a.gatsby-resp-image-link': {
    boxShadow: 'none',
  },
})

const typography = new Typography(_.assign({}, Wordpress2016, {
  bodyFontFamily: ['Roboto Slab', 'serif'],
  googleFonts: [
    {
      name: 'Fira Mono',
      styles: ['500']
    },
    {
      name: 'Roboto Slab',
      styles: [
        '400',
        '400i',
        '700',
        '700i',
      ],
    },
  ],
  overrideThemeStyles: ({ rhythm }, options, styles) => ({
    code: {
      fontFamily: ['Fira Mono', 'monospace'].join(','),
    }
  })
}))

// Hot reload typography in development.
if (process.env.NODE_ENV !== 'production') {
  typography.injectStyles()
}

export default typography
