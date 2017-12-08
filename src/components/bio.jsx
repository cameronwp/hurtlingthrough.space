import React from 'react'

import { Follow } from 'react-twitter-widgets'
import { rhythm } from '../utils/typography'
import './bio.scss'

function year() {
  const d = new Date()
  return d.getFullYear()
}

class Bio extends React.Component {
  render() {
    return (
      <div style={{ display: 'flex', justifyContent: 'space-around', marginBottom: rhythm(2.5) }}>
        <div className='follow'>
          <Follow username='cwpittman' options={{ size: 'medium', dnt: true }} />
        </div>
        <div>
          © <strong>Cameron Pittman</strong> {year()}.
        </div>
      </div>
    )
  }
}

export default Bio
