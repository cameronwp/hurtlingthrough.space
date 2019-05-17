import React from 'react'
import { Container } from 'react-responsive-grid'
import TextContainer from '../components/text-container'
import { rhythm } from '../utils/typography'
import SiteTitle from '../components/site-title'

function postContainer(isRoot, children) {
  return (
    <TextContainer>
      <SiteTitle size={isRoot ? 'large' : 'small'} />
      {children()}
    </TextContainer>
  )
}

class Template extends React.Component {
  render() {
    const { location, children } = this.props

    const rootPath = '/'
    const isRoot = location.pathname === rootPath
    return postContainer(isRoot, children)
  }
}

export default Template
