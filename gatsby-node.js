const _ = require('lodash')
const path = require('path')
const { createFilePath } = require('gatsby-source-filesystem')

exports.createPages = ({ graphql, boundActionCreators }) => {
  const postsQuery = `
  {
    allMarkdownRemark(limit: 1000) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            tags
          }
        }
      }
    }
  }`

  const { createPage } = boundActionCreators
  const BlogPost = path.resolve('./src/templates/blog-post.jsx')
  const TagPage = path.resolve('./src/templates/tag-page.jsx')
  let tags = []

  createPages = edges => {
    edges.forEach(edge => {
      const { slug } = edge.node.fields

      if (_.startsWith(slug, '/posts/')) {
        createPage({
          path: slug,
          component: BlogPost,
          context: {
            slug
          },
        })

        tags = _.union(tags, edge.node.frontmatter.tags)
      }
    })
  }

  createTagPages = () => {
    tags.sort().forEach(tag => {
      createPage({
        path: `tags/${tag}`,
        component: TagPage,
        context: {
          tag
        },
      })
    })
  }

  return graphql(postsQuery)
    .then(result => {
      if (result.errors) {
        reject(result.errors)
      }

      return result.data.allMarkdownRemark.edges
    })
    .then(createPages)
    .then(createTagPages)
    .catch(console.error)
}

exports.onCreateNode = ({ node, boundActionCreators, getNode }) => {
  const { createNodeField } = boundActionCreators

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}

exports.modifyWebpackConfig = function ({config}, stage) {
  config._config.devtool = 'cheap-module-source-map'
  return config
}
