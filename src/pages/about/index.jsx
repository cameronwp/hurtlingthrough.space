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
          <li><a href="/posts/20220504-autobiography/">my life story</a></li>
          <li>self-taught engineer and lifelong learner</li>
          <li>adventurer</li>
          <li>aspiring astronaut</li>
          <li>avid sci-fi reader</li>
        </ul>
        <h1>What is Cameron?</h1>
        <ul>
          <li>grad student at MIT studying AI/autonomy</li>
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
          <li><a href='https://github.com/cameronwp/hurtlingthrough.space'>this site's source code</a></li>
        </ul>
        <h1>Elsewhere on the web</h1>
        <ul>
          <li><a href="https://autonomyforeveryone.org">Autonomy for Everyone</a> - AI outreach</li>
          <li><a href="https://spoc.space">SPOC</a> - NASA research project</li>
          <li><a href='http://www.exoplanetexplorer.com/' target="_blank" rel="noreferrer noopener">Exoplanet Explorer</a> - learn about planets around other stars!</li>
          <li><a href='https://firearmsaccountability.org/' target="_blank" rel="noreferrer noopener">Firearms Accountability Counsel Taskforce</a> - <a href="https://lawcenter.giffords.org/" target="_blank" rel="noreferrer noopener">Giffords volunteer work</a></li>
          <li><a href='https://physicswithportals.com/' target="_blank" rel="noreferrer noopener">Physics with Portals</a> - old blog</li>
        </ul>
        <h1>My Current Setup</h1>
        <h2>Desktop</h2>
        <ul className="emoji-list">
          <li>💥 <a href="https://www.evga.com/products/product.aspx?pn=08G-P4-6286-RX" target="_blank" rel="noreferrer noopener">EVGA GeForce GTX 1080 FTW</a></li>
          <li>🧠 <a href="https://ark.intel.com/content/www/us/en/ark/products/88195/intel-core-i7-6700k-processor-8m-cache-up-to-4-20-ghz.html" target="_blank" rel="noreferrer noopener">Intel i7-6700k CPU</a></li>
          <li>📝 <a href="https://www.newegg.com/g-skill-32gb-288-pin-ddr4-sdram/p/N82E16820232091" target="_blank" rel="noreferrer noopener">G.SKILL Ripjaws V Series 2x16GB DDR4 3200 Memory</a></li>
          <li>🤰 <a href="https://www.gigabyte.com/us/Motherboard/GA-Z170X-Ultra-Gaming-rev-10#ov" target="_blank" rel="noreferrer noopener">Gigabyte GA-Z170X-Ultra Gaming Motherboard</a></li>
          <li>📖 <a href="https://www.amazon.com/gp/product/B07MFZY2F2" target="_blank" rel="noreferrer noopener">Samsung 970 EVO Plus 1TB M.2 2280 SSD</a></li>
          <li>📦 <a href="https://nzxt.com/product/h510-flow" target="_blank" rel="noreferrer noopener">NZXT 510 Flow</a></li>
          <li>⚡️ <a href="https://www.amazon.com/dp/B079HGN5QS" target="_blank" rel="noreferrer noopener">Corsair RM750x PSU</a></li>
          <li>🖥 <a href="https://www.dell.com/en-us/work/shop/cty/dell-27-ultra-hd-4k-monitor-p2715q/spd/dell-p2715q-monitor" target="_blank" rel="noreferrer noopener">Dell 27" P2715Q 4K Monitor</a></li>
          <li>⬛️ <a href="https://www.fully.com/standing-desks/jarvis.html" target="_blank" rel="noreferrer noopener">Fully Jarvis Standing Desk 30" wide</a></li>
          <li>⌨️ <a href="http://www.wasdkeyboards.com/index.php/" target="_blank" rel="noreferrer noopener">WASD V2 104 Key Mechanical Keyboard with Cherry MX Browns</a></li>
          <li>🌌 <a href="https://drop.com/buy/galaxy-c-pbt-all-over-dye-subbed-keycap-set" target="_blank" rel="noreferrer noopener">GalaxC PBT All Over Dye-Subbed blank keycaps</a></li>
          <li>🖱 <a href="https://www.amazon.com/Logitech-910-000173-G9-Laser-Mouse/dp/B000UHE8Y2" target="_blank" rel="noreferrer noopener">Logitech G9x Mouse</a></li>
          <li>🌽 Windows 10 + <a href="https://getfedora.org/">Fedora 35</a></li>
        </ul>
        <h2>Laptop</h2>
        <ul className="emoji-list">
          <li>💻 <a href="https://www.lenovo.com/us/en/laptops/thinkpad/thinkpad-x/X1-Carbon-Gen-7/p/22TP2TXX17G" target="_blank" rel="noreferrer noopener">Lenovo Thinkpad X1 Carbon Gen 7 Model 20R1S05A00</a></li>
          <li>🌽 <a href="https://getfedora.org/">Fedora 35</a></li>
        </ul>
        <h2 id="living-room-pc">Living Room Gaming PC</h2>
        <ul className="emoji-list">
          <li>📦 <a href="https://www.fractal-design.com/products/cases/node/node-304/black/" target="_blank" rel="noreferrer noopener">Fractal Design Node 304 Black Case</a></li>
          <li>💥 <a href="https://www.evga.com/products/product.aspx?pn=06G-P4-2068-KR" target="_blank" rel="noreferrer noopener">EVGA GeForce RTX 2060 KO</a></li>
          <li>🧠 <a href="https://www.amd.com/en/products/cpu/amd-ryzen-5-3600" target="_blank" rel="noreferrer noopener">AMD Ryzen 5 3600</a></li>
          <li>📝 <a href="https://www.newegg.com/g-skill-16gb-288-pin-ddr4-sdram/p/N82E16820232884?item=N82E16820232884" target="_blank" rel="noreferrer noopener">2x8GB G.SKILL Aegis DDR4 3200 Memory</a></li>
          <li>🤰 <a href="https://www.asrock.com/mb/AMD/Fatal1ty%20B450%20Gaming-ITXac/index.asp" target="_blank" rel="noreferrer noopener">ASRock Fatal1ty B450 Gaming-ITX Motherboard</a></li>
          <li>📖 <a href="https://www.samsung.com/semiconductor/minisite/ssd/product/consumer/970evo/" target="_blank" rel="noreferrer noopener">Samsung 970 EVO 500GB M.2 2280 SSD</a></li>
          <li>📚 <a href="https://www.seagate.com/internal-hard-drives/hdd/firecuda/" target="_blank" rel="noreferrer noopener">2x2TB Seagate FireCuda Gaming 7200 RPM SSHD in RAID 0</a></li>
          <li>⚡️ <a href="https://www.corsair.com/us/en/Categories/Products/Power-Supply-Units/SF-Series%E2%84%A2-80-PLUS-Gold-Power-Supplies/p/CP-9020104-NA" target="_blank" rel="noreferrer noopener">Corsair SF Series SF450 450W Modular Micro ATX PSU</a> + <a href="https://www.amazon.com/gp/product/B07PP4C3CY" target="_blank" rel="noreferrer noopener">Mounting Bracket</a></li>
          <li>🎮 <a href="https://www.8bitdo.com/sn30-pro-plus/" target="_blank" rel="noreferrer noopener">8bitDo SN30 Pro+ Controller (SNES style)</a></li>
          <li>⌨️ <a href="https://www.logitech.com/en-us/product/wireless-touch-keyboard-k400r" target="_blank" rel="noreferrer noopener">Logitech K400 Wireless Keyboard+Trackpad</a></li>
          <li>🌽 Windows 10 + <a href="https://www.launchbox-app.com/" target="_blank" rel="noreferrer noopener">LaunchBox/BigBox</a></li>
        </ul>
        <h2>NAS</h2>
        <ul className="emoji-list">
          <li>🧠 <a href="https://ark.intel.com/content/www/us/en/ark/products/47917/intel-xeon-processor-w3680-12m-cache-3-33-ghz-6-40-gts-intel-qpi.html" target="_blank" rel="noreferrer noopener">Intel Xeon W3680</a></li>
          <li>📝 6x4GB DDR3 Memory</li>
          <li>📦 <a href="https://www.newegg.com/p/N82E16811129066" target="_blank" rel="noreferrer noopener">Antec 300 Case</a></li>
          <li>📖 2x<a href="https://www.seagate.com/products/nas-drives/ironwolf-hard-drive/" target="_blank" rel="noreferrer noopener">Seagate 12TB Ironwolf HDD</a></li>
          <li>📖 4x2TB HDD (various makes and models)</li>
          <li>📖 <a href="https://www.samsung.com/semiconductor/minisite/ssd/product/consumer/850evo/" target="_blank" rel="noreferrer noopener">Samsung 850 EVO 250GB SSD</a></li>
          <li>⚡️ <a href="https://www.newegg.com/raidmax-hybrid-2-rx-630ss-630w/p/N82E16817152035" target="_blank" rel="noreferrer noopener">Raidmax 630W PSU</a></li>
          <li>🌽 <a href="https://unraid.net/" target="_blank" rel="noreferrer noopener">Unraid 6.9.2</a></li>
        </ul>
        <Footer />
      </section>
    )
  }
}

export default About
