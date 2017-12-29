import React from 'react'
import { Container } from 'react-responsive-grid'
import TextContainer from '../components/text-container'
import { rhythm } from '../utils/typography'
import SiteTitle from '../components/site-title'

import "prismjs/themes/prism.css"

function postContainer(isRoot, children) {
  return (
    <TextContainer>
      <SiteTitle size={isRoot ? 'large' : 'small'} />
      {children()}
    </TextContainer>
  )
}

function fullWidthContainer(children) {
  const fullWidthStyles = {
    width: '100vw',
    maxWidth: '100vw',
    padding: 0
  }

  return (
    <Container style={fullWidthStyles}>
      {children()}
    </Container>
  )
}

class Template extends React.Component {
  render() {
    const { location, children } = this.props

    const rootPath = '/'
    const isRoot = location.pathname === rootPath
    const isMarsThree = _.startsWith(location.pathname, '/mars-three/')

    if (!isMarsThree) {
      return postContainer(isRoot, children)
    }

    return fullWidthContainer(children)
  }
}

export default Template
