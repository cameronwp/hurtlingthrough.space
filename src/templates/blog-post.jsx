import React from 'react'
import Helmet from 'react-helmet'
import get from 'lodash/get'
import { Share } from 'react-twitter-widgets'

import Bio from '../components/bio'
import { rhythm, scale } from '../utils/typography'

import './blog-post.scss'

function renderTag(tag, index) {
  return (
    <a key={index} href='' className='tag'>{tag}</a>
  )
}

class BlogPostTemplate extends React.Component {
  render() {
    const post = this.props.data.markdownRemark
    const siteTitle = get(this.props, 'data.site.siteMetadata.title')
    const {date, title, tags} = post.frontmatter

    return (
      <div>
        <Helmet title={`${title} | ${siteTitle}`} />
        <h1>{title}</h1>
        <section style={{
          ...scale(-0.2),
          display: 'flex',
          marginBottom: rhythm(1),
          marginTop: rhythm(-0.5),
        }}>
          <div>{date}</div>
          <div className='tags'>
            {tags.map(renderTag)}
          </div>
        </section>
        <div dangerouslySetInnerHTML={{ __html: post.html }} />
        <section className='share-section'>
          <div className='social'>
            <Share url={window.location.href}
              options={{ size: 'small', text: `Check out '${title}'`, via: 'cwpittman' }}
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
      }
    }
  }
`
