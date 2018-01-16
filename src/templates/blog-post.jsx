import React from 'react'
import Helmet from 'react-helmet'
import get from 'lodash/get'
import Link from 'gatsby-link'
import { Share } from 'react-twitter-widgets'

import config from '../../gatsby-config'

import Footer from '../components/footer'
import Tag from '../components/tag'
import { rhythm, scale } from '../utils/typography'

import 'katex/dist/katex.min.css'
import 'prismjs/themes/prism.css'
import './blog-post.scss'

function renderTag(tag, index) {
  return (
    <div className='tag' key={`TAG-${index}`}>
      <Tag name={tag} />
    </div>
  )
}

class BlogPostTemplate extends React.Component {
  render() {
    const post = this.props.data.markdownRemark
    const { pathname } = this.props.location
    const siteTitle = get(this.props, 'data.site.siteMetadata.title')
    const { excerpt } = post
    const {
      date,
      draft,
      summary,
      tags,
      title,
      twitterprompt
    } = post.frontmatter
    const pageURL = `${config.siteMetadata.siteUrl}${pathname}`

    const sectionStyle = {
      ...scale(-0.2),
      display: 'block',
      marginBottom: rhythm(0.8), // subtract a little to account for .tag margin-bottom
      marginTop: rhythm(-0.5)
    }

    const comboTitle = `${title} | ${siteTitle}`

    return (
      <div>
        <Helmet title={comboTitle}>
          <meta itemprop="name" content={comboTitle} />
          <meta name="description" content={summary || excerpt} />
          <meta itemprop="description" content={summary || excerpt} />
          <meta property="article:published_time" content={new Date(date).toISOString()} />
          <meta property="og:description" content={summary || excerpt} />
          <meta property="og:title" content={comboTitle} />
          <meta property="og:url" content={pageURL} />
          <meta name="twitter:description" content={summary || excerpt} />
          <meta name="twitter:title" content={comboTitle} />
          {(tags || []).map((tag, i) => <meta key={`tag:${i}`} property="article:tag" content={tag} />)}
        </Helmet>

        <h1>{`${title}${draft ? ' (draft)' : ''}`}</h1>
        <section style={sectionStyle}>
          <div className='meta-info'>
            <div className='date'>{date}</div>
            <div className='tags'>
              <div className='flex-row'>
                {(tags || []).map(renderTag)}
              </div>
            </div>
          </div>
        </section>

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
          <p className='prompt'>Let's keep the conversation going!</p>
        </section>
        <hr
          style={{
            marginBottom: rhythm(1),
          }}
        />
        <Footer />
      </div>
    )
  }
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
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
        date(formatString: "DD MMMM YYYY")
        draft
        summary
        tags
        title
        twitterprompt
      }
    }
  }
`
