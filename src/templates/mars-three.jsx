import React from 'react'
import Helmet from 'react-helmet'
import TextContainer from '../components/text-container'
import get from 'lodash/get'
import Link from 'gatsby-link'
import { Share } from 'react-twitter-widgets'

import config from '../../gatsby-config'

import FadeIn from '../components/fade-in'
import Footer from '../components/footer'
import { rhythm, scale } from '../utils/typography'

import './mars-three.scss'

class MarsThree extends React.Component {
  render() {
    const post = this.props.data.markdownRemark
    const { pathname } = this.props.location
    const siteTitle = get(this.props, 'data.site.siteMetadata.title')
    const {
      date,
      excerpt,
      endcolor,
      fadein,
      startcolor,
      textcolor,
      title,
      twitterprompt } = post.frontmatter
    const pageURL = `${config.siteMetadata.siteUrl}${pathname}`

    const sectionStyle = {
      ...scale(-0.2),
      display: 'block',
      marginBottom: rhythm(0.8), // subtract a little to account for .tag margin-bottom
      marginTop: rhythm(-0.5)
    }

    const comboTitle = `${title} | Mars Three | ${siteTitle}`

    return (
      <div className='color'>
        <Helmet title={comboTitle}>
          <meta itemprop="name" content={comboTitle} />
          <meta name="twitter:title" content={comboTitle} />
          <meta name="twitter:description" content={excerpt} />
          <meta property="og:title" content={comboTitle} />
          <meta property="og:url" content={pageURL} />
          <meta property="article:published_time" content={new Date(date).toISOString()} />
        </Helmet>

        <FadeIn text={title} startcolor={startcolor} endcolor={endcolor} textcolor={textcolor} />

        <TextContainer>
          <div dangerouslySetInnerHTML={{ __html: post.html }} />

          <section className='share-section'>
            <div className='social'>
              <Share url={pageURL}
                options={{
                  size: 'small',
                  text: twitterprompt || `Check out '${title}'`,
                  via: 'cwpittman'
                }}
                />
            </div>
          </section>
          <hr
            style={{
              marginBottom: rhythm(1),
            }}
            />
          <Footer />
        </TextContainer>
      </div>
    )
  }
}

export default MarsThree

export const pageQuery = graphql`
  query Stories($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      html
      excerpt
      frontmatter {
        title
        date(formatString: "DD MMMM YYYY")
        startcolor
        endcolor
        textcolor
      }
    }
  }
`
