import React from 'react'

// Import typefaces
import 'typeface-montserrat'
import 'typeface-merriweather'

// import profilePic from './profile-pic.jpg'
import { rhythm } from '../utils/typography'

function year() {
  const d = new Date()
  return d.getFullYear()
}

class Bio extends React.Component {
  render() {
    return (
      <div
        style={{
          display: 'flex',
          marginBottom: rhythm(2.5),
        }}
      >
        <p>
          © <strong>Cameron Pittman</strong> {year()}. <a href="https://twitter.com/cwpittman">
            You should follow him on Twitter
          </a>
        </p>
      </div>
    )
  }
}

export default Bio
