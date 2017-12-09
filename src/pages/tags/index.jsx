import React from "react"
import Helmet from "react-helmet"
import kebabCase from "lodash/kebabCase"
import Bio from '../../components/bio'
import Tag from '../../components/tag'
import { rhythm } from '../../utils/typography'

class TagsPageRoute extends React.Component {
  render() {
    const title = this.props.data.site.siteMetadata.title
    const allTags = this.props.data.allMarkdownRemark.group

    return (
      <div>
        <Helmet title={title} />
        <div>
          <h1>Tags</h1>
          <ul>
            {allTags.map(tag =>
              <li key={tag.fieldValue}>
                <Tag name={tag.fieldValue} display={`${tag.fieldValue} (${tag.totalCount})`} />
              </li>
            )}
          </ul>
        </div>

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

export default TagsPageRoute

export const pageQuery = graphql`
  query TagsQuery {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      limit: 2000
      filter: { frontmatter: { draft: { ne: true } } }
    ) {
      group(field: frontmatter___tags) {
        fieldValue
        totalCount
      }
    }
  }
`
