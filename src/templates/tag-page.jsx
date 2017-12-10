import React from 'react'
import Helmet from 'react-helmet'
import get from 'lodash/get'
import Link from 'gatsby-link'
import { Share } from 'react-twitter-widgets'

import config from '../../gatsby-config'

import Bio from '../components/bio'
import { rhythm, scale } from '../utils/typography'

function renderTag(tag, index) {
  return (
    <div className='tag'><a key={index} href='' className='tag-content'>{tag}</a></div>
  )
}

class TagPageTemplate extends React.Component {
  render() {
    const posts = get(this.props, 'data.allMarkdownRemark.edges', [])
    if (posts.length === 0) {
      return <div>no posts</div>
    }

    const { pathname } = this.props.location
    const siteTitle = get(this.props, 'data.site.siteMetadata.title')
    const pageURL = `${config.siteMetadata.siteUrl}${pathname}`

    const postLinks = posts.map(post => {
      return (
        <li key={post.node.fields.slug}>
          <Link to={post.node.fields.slug}>
            {post.node.frontmatter.title}
          </Link>
        </li>
      )
    })

    return (
      <div>
        <Helmet title={siteTitle} />
        <h2>
          {this.props.data.allMarkdownRemark.totalCount} posts tagged with “{this.props.pathContext.tag}”
        </h2>

        <ul>
          {postLinks}
        </ul>
        <p>
          <Link to="/tags/">Browse all tags</Link>
        </p>

        <section className='share-section'>
          <div className='social'>
            <Share url={pageURL}
              options={{
                size: 'small',
                text: `Posts tagged '${this.props.pathContext.tag}'`,
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

export default TagPageTemplate

export const pageQuery = graphql`
query TagPage($tag: String) {
  site {
    siteMetadata {
      title
    }
  }
  allMarkdownRemark(
    limit: 1000
    sort: { fields: [frontmatter___date], order: DESC }
    filter: { frontmatter: { tags: { in: [$tag] }, draft: { ne: true } } }
  ) {
    totalCount
    edges {
      node {
        fields {
          slug
        }
        frontmatter {
          title
        }
      }
    }
  }
}
`
