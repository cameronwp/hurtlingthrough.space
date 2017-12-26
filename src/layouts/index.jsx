import React from 'react'
import { Container } from 'react-responsive-grid'
import { rhythm } from '../utils/typography'
import SiteTitle from '../components/site-title'

import "prismjs/themes/prism.css"

function aboutPage() {
  return (
    <h3><a href='/about'>about</a></h3>
  )
}

class Template extends React.Component {
  render() {
    const { location, children } = this.props

    const rootPath = `/`
    const isRoot = location.pathname === rootPath

    const containerStyle = {
      maxWidth: rhythm(24),
      padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`
    }

    return (
      <Container style={containerStyle}>
        <SiteTitle size={isRoot ? 'large' : 'small'} />
        {isRoot && aboutPage()}
        {children()}
      </Container>
    )
  }
}

export default Template
