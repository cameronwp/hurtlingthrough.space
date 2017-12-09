import React from 'react'
import Link from 'gatsby-link'
import { rhythm, scale } from '../utils/typography'
import config from '../../gatsby-config'

/**
 * Render a SiteTitle. Size options are 'large' and 'small'. Default to 'small'.
 */
class SiteTitle extends React.Component {
  innerTitle() {
    const siteTitle = config.siteMetadata.title
    const linkStyle = { boxShadow: 'none', textDecoration: 'none', color: 'inherit' }
    return (
      <Link to={'/'} style={linkStyle}>{siteTitle}</Link>
    )
  }

  render() {
    const { size } = this.props
    const siteTitle = config.siteMetadata.title

    const largeStyle = {
      ...scale(1.5),
      marginTop: 0,
      marginBottom: rhythm(1.5)
    }
    const smallStyle = {
      fontFamily: 'Montserrat, sans-serif',
      marginTop: 0,
      marginBottom: rhythm(-1)
    }

    const large = <h1 style={largeStyle}>{this.innerTitle()}</h1>
    const small = <h3 style={smallStyle}>{this.innerTitle()}</h3>

    if (size === 'large') {
      return large
    } else {
      return small
    }
  }
}

export default SiteTitle
