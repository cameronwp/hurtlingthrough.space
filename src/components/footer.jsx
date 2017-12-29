import React from 'react'

import { Follow } from 'react-twitter-widgets'
import { rhythm } from '../utils/typography'
import './footer.scss'

function year() {
  const d = new Date()
  return d.getFullYear()
}

class Footer extends React.Component {
  render() {
    return (
      <div className='footer-container'>
        <div className='follow'>
          <Follow username='cwpittman' options={{ size: 'medium', dnt: true }} />
        </div>
        <div>
          © <strong><a href='/about'>Cameron Pittman</a></strong> {year()}.
        </div>
      </div>
    )
  }
}

export default Footer
