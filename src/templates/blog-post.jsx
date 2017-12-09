import React from 'react'
import Helmet from 'react-helmet'
import get from 'lodash/get'
import Link from 'gatsby-link'
import { Share } from 'react-twitter-widgets'

import Bio from '../components/bio'
import Tag from '../components/tag'
import { rhythm, scale } from '../utils/typography'

import './blog-post.scss'

function renderTag(tag, index) {
  return (
    <div className='tag'>
      <Tag name={tag} key={index} />
    </div>
  )
}

class BlogPostTemplate extends React.Component {
  render() {
    const post = this.props.data.markdownRemark
    const siteTitle = get(this.props, 'data.site.siteMetadata.title')
    const { date, title, tags, twitterprompt } = post.frontmatter

    const sectionStyle = {
      ...scale(-0.2),
      display: 'block',
      marginBottom: rhythm(0.8), // subtract a little to account for .tag margin-bottom
      marginTop: rhythm(-0.5)
    }

    return (
      <div>
        <Helmet title={`${title} | ${siteTitle}`} />
        <h1>{title}</h1>
        <section style={sectionStyle}>
          <div className='meta-info'>
            <div className='date'>{date}</div>
            <div className='tags'>
              <div className='flex-row'>
                {tags.map(renderTag)}
              </div>
            </div>
          </div>
        </section>

        <div dangerouslySetInnerHTML={{ __html: post.html }} />

        <section className='share-section'>
          <div className='social'>
            <Share url={window.location.href}
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
        <Bio />
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
      frontmatter {
        tags
        title
        date(formatString: "DD MMMM YYYY")
        twitterprompt
      }
    }
  }
`
