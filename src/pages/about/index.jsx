import React from 'react'
import { rhythm, scale } from '../../utils/typography'
import Footer from '../../components/footer'
import Helmet from 'react-helmet'
import css from './index.scss'

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
        <Helmet title="About - Hurtling through Space" />
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
          <li>software engineer at NASA Johnson Space Center in <a href='https://ares.jsc.nasa.gov' target='blank'>ARES</a></li>
          <li>former Udacity full-stack software engineer</li>
          <li>designed and taught web and self-driving car classes at Udacity</li>
          <li>former high school physics teacher (taught <a href='https://physicswithportals.com' target='blank'>physics with <em>Portal 2</em></a> for a bit)</li>
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
          <li><a href='https://github.com/cameronwp/hurtling-through-space'>this site's source code</a></li>
        </ul>
        <h1>Elsewhere on the web</h1>
        <ul>
          <li><a href='http://www.exoplanetexplorer.com/'>Exoplanet Explorer</a> - learn about planets around other stars!</li>
          <li><a href='https://physicswithportals.com/'>Physics with Portals</a> - old blog</li>
          <li><a href='https://firearmsaccountability.org/'>Firearms Accountability Counsel Taskforce</a> - <a href="https://lawcenter.giffords.org/" target="_blank">Giffords volunteer work</a></li>
        </ul>
        <h1>My current setup</h1>
        <ul className="emoji-list">
          <li>🎮 <a href="https://www.evga.com/products/product.aspx?pn=08G-P4-6286-RX" target="_blank">EVGA GeForce GTX 1080 FTW</a></li>
          <li>🧠 <a href="https://ark.intel.com/content/www/us/en/ark/products/88195/intel-core-i7-6700k-processor-8m-cache-up-to-4-20-ghz.html" target="_blank">Intel i7 6700k CPU</a></li>
          <li>📝 <a href="https://www.newegg.com/g-skill-32gb-288-pin-ddr4-sdram/p/N82E16820232091" target="_blank">G.SKILL Ripjaws V Series 2x16GB DDR4 3200 Memory</a></li>
          <li>🤰 <a href="https://www.gigabyte.com/us/Motherboard/GA-Z170X-Ultra-Gaming-rev-10#ov" target="_blank">Gigabyte GA-Z170X-Ultra Gaming Motherboard</a></li>
          <li>📖 <a href="https://www.amazon.com/gp/product/B07MFZY2F2/ref=ppx_yo_dt_b_asin_title_o09_s00?ie=UTF8&psc=1" target="_blank">Samsung 970 EVO Plus 1TB M.2 2280 SSD</a></li>
          <li>📦 <a href="https://www.newegg.com/p/N82E16811129066" target="_blank">Antec 300 Case</a></li>
          <li>⚡️ <a href="https://www.newegg.com/raidmax-hybrid-2-rx-630ss-630w/p/N82E16817152035" target="_blank">Raidmax 630W PSU</a></li>
          <li>🖥 <a href="https://www.dell.com/en-us/work/shop/cty/dell-27-ultra-hd-4k-monitor-p2715q/spd/dell-p2715q-monitor" target="_blank">Dell 27" P2715Q 4K Monitor</a></li>
          <li>⬛️ <a href="https://www.fully.com/standing-desks/jarvis.html" target="_blank">Fully Jarvis Standing Desk 30" wide</a></li>
          <li>⌨️ <a href="http://www.wasdkeyboards.com/index.php/" target="_blank">WASD V2 104 Key Mechanical Keyboard with Cherry MX Browns</a></li>
          <li>🌌 <a href="https://drop.com/buy/galaxy-c-pbt-all-over-dye-subbed-keycap-set" target="_blank">GalaxC PBT All Over Dye-Subbed blank keycaps</a></li>
          <li>🖱 <a href="https://www.amazon.com/Logitech-910-000173-G9-Laser-Mouse/dp/B000UHE8Y2" target="_blank">Logitech G9x Mouse</a></li>
        </ul>
        <h2>Laptop</h2>
        <ul className="emoji-list">
          <li>💻 <a href="https://support.apple.com/kb/sp649?locale=en_GB" target="_blank">2012 13" MacBook Pro</a></li>
        </ul>
        <Footer />
      </section>
    )
  }
}

export default About
