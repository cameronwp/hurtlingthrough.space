import React from 'react'
import { Container } from 'react-responsive-grid'
import { rhythm } from '../utils/typography'

export default class TextContainer extends React.Component {
  render() {
    const { children } = this.props

    const standardStyles = {
      maxWidth: rhythm(28),
      padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`
    }

    return (
      <Container style={standardStyles}>
        {children}
      </Container>
    )
  }
}
