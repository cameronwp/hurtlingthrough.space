const _ = require('lodash')
const Promise = require('bluebird')
const path = require('path')
const { createFilePath } = require('gatsby-source-filesystem')

exports.createPages = ({ graphql, boundActionCreators }) => {
  const mdQuery = `
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
  const blogPost = path.resolve('./src/templates/blog-post.jsx')
  const tagPage = path.resolve('./src/templates/tag-page.jsx')
  let tags = []

  createPosts = edges => {
    edges.forEach(edge => {
      createPage({
        path: edge.node.fields.slug,
        component: blogPost,
        context: {
          slug: edge.node.fields.slug,
        },
      })

      tags = _.union(tags, edge.node.frontmatter.tags)
    })
  }

  createTagPages = () => {
    tags.sort().forEach(tag => {
      createPage({
        path: `tags/${tag}`,
        component: tagPage,
        context: {
          tag
        }
      })
    })
  }

  return graphql(mdQuery)
    .then(result => {
      if (result.errors) {
        reject(result.errors)
      }

      return result.data.allMarkdownRemark.edges
    })
    .then(createPosts)
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
