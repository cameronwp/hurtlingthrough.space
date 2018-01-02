import React from 'react'
import { rhythm, scale } from '../../utils/typography'
import Footer from '../../components/footer'

class About extends React.Component {
  render() {
    const sectionStyle = {
      ...scale(0),
      display: 'block',
      marginBottom: rhythm(0.8),
      marginTop: rhythm(2)
    }

    return (
      <section style={sectionStyle}>
        <h1>Who is Cameron?</h1>
        <ul>
          <li>puppy father</li>
          <li>self-taught engineer and lifelong learner</li>
          <li>adventurer</li>
          <li>aspiring astronaut</li>
          <li>avid sci-fi reader</li>
        </ul>
        <h1>What is Cameron?</h1>
        <ul>
          <li>Udacity full-stack software engineer</li>
          <li>engineer on Marvin - spacewalk planning software</li>
          <li>designed and taught web and self-driving car classes at Udacity</li>
          <li>former high school physics teacher (taught <a href='http://physicswithportals.com' target='blank'>physics with <em>Portal 2</em></a> for a bit)</li>
        </ul>
        <h1>Where is Cameron?</h1>
        <ul>
          <li><a href='https://github.com/cameronwp'>github.com/cameronwp</a></li>
          <li><a href='https://twitter.com/cwpittman'>twitter.com/cwpittman</a></li>
          <li><a href='https://www.linkedin.com/in/cwpittman'>linkedin.com/in/cwpittman</a></li>
        </ul>
        <h1>When is Cameron?</h1>
        <ul>
          <li>ok, this one doesn't make sense</li>
        </ul>
        <h1>Why is Cameron?</h1>
        <ul>
          <li>really pushing it with this "who, what, where, when, why, how" thing</li>
        </ul>
        <h1>How is Cameron?</h1>
        <ul>
          <li>oh good, this almost makes sense</li>
          <li><a href='/posts/20171204-building-a-blog/'>how this blog was made</a> (and the <a href='/posts/20171210-controlling-caches/'>follow up</a>)</li>
          <li><a href='https://github.com/cameronwp/personal-web'>this site's source code</a></li>
        </ul>
        <Footer />
      </section>
    )
  }
}

export default About
