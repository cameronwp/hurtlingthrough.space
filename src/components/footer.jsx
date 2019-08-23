import React from 'react'

import { Follow } from 'react-twitter-widgets'
import './footer.scss'

function year() {
  const d = new Date()
  return d.getFullYear()
}

class Footer extends React.Component {
  render() {
    return (
      <div>
        <div className='follow-container'>
          <div className='follow'>
            <Follow username='cwpittman' options={{ size: 'medium', dnt: true }} />
          </div>
          <div>
            © <strong><a href='/about'>Cameron Pittman</a></strong> {year()}
          </div>
        </div>
        <div className='licenses'>
          All writings and opinions are my own and not the views of my employer.<br />
          All Rights Reserved, except for the parts enumerated below:
          <ul>
            <li>The source code of this project is covered by the <a href="https://opensource.org/licenses/MIT">MIT license</a>.</li>
            <li>The content of this project (eg. blog posts) is covered by the <a href="https://creativecommons.org/licenses/by-sa/4.0/">CC BY-SA 4.0 license</a>.</li>
          </ul>
        </div>
      </div>
    )
  }
}

export default Footer
