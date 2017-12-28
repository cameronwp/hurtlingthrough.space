import React from 'react'
import TextContainer from '../components/text-container'
import Link from 'gatsby-link'
import { rhythm, scale } from '../utils/typography'
import config from '../../gatsby-config'

class FadeIn extends React.Component {
  render() {
    const { startcolor, endcolor, text, textcolor} = this.props

    // certain styles get overwritten by the wordpress template here. use the overwrite class function in typography instead
    return (
      <div className={`fade-in-${startcolor}-to-${endcolor}`}>
        <TextContainer style={{ height: '100%' }}>
          <h1 style={{ position: 'absolute', bottom: '1em' }}>{text}</h1>
        </TextContainer>
      </div>
    )
  }
}

export default FadeIn
