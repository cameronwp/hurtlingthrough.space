import React from 'react'
import Helmet from 'react-helmet'
import get from 'lodash/get'
import { Share } from 'react-twitter-widgets'

import Bio from '../components/bio'
import { rhythm, scale } from '../utils/typography'

import './blog-post.scss'

class BlogPostTemplate extends React.Component {
  render() {
    const post = this.props.data.markdownRemark
    const siteTitle = get(this.props, 'data.site.siteMetadata.title')
    const postTitle = post.frontmatter.title

    return (
      <div>
        <Helmet title={`${postTitle} | ${siteTitle}`} />
        <h1>{postTitle}</h1>
        <section
          style={{
            ...scale(-1 / 5),
            display: 'block',
            marginBottom: rhythm(1),
            marginTop: rhythm(-1),
          }}
        >
          {post.frontmatter.date}
        </section>
        <div dangerouslySetInnerHTML={{ __html: post.html }} />
        <section className='share-section'>
          <p className='prompt'>Let's keep the conversation going!</p>
          <div className='social'>
            <Share options={{ size: 'small', text: `Check out '${postTitle}'`, via: 'cwpittman' }} />
          </div>
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
        author
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      html
      frontmatter {
        title
        date(formatString: "DD MMMM YYYY")
      }
    }
  }
`
