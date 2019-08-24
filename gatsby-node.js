const path = require(`path`)
const slug = require('slug')

const { createFilePath } = require(`gatsby-source-filesystem`)

exports.createPages = ({ graphql, actions }) => {
    const { createPage } = actions

    // **Note:** The graphql function call returns a Promise
    // see: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise for more info
    return graphql(`
      {
        allMarkdownRemark {
          edges {
            node {
              id
              fields {
                slug
              }
              frontmatter {
                  templateKey
              }
            }
          }
        }
        allStripeSku {
          edges {
            node {
              fields {
                slug
              }
              product {
                id
                name
              }
            }
          }
        }
      }
    `
  ).then(result => {
    if (result.errors) {
      Promise.reject(result.errors)
    }
    result.data.allMarkdownRemark.edges.forEach(({ node }) => {
      const id = node.id
        createPage({
          path: node.fields.slug,
          component: path.resolve(`./src/templates/${String(node.frontmatter.templateKey)}.js`),
          context: {
            // Data passed to context is available
            // in page queries as GraphQL variables.
            id,
            slug: node.fields.slug,
          },
        })
      })
    
    const products = {}

    result.data.allStripeSku.edges.forEach(({ node }) => {
      products[node.product.id] = node.fields.slug
    })

      Object.entries(products).forEach(([id, slug]) => {
        createPage({
          path: slug,
          component: path.resolve('src/templates/product.js'),
          context: { id, slug: slug }
        })
      })
    })
  }

exports.onCreateNode = ({ node, actions, getNode }) => {
    const { createNodeField } = actions

    if (node.internal.type === `MarkdownRemark`) {
      let value = createFilePath({ node, getNode, basePath: `pages` })
      createNodeField({
        name: `slug`,
        node,
        value,
      })
    } 
    if (node.internal.type === 'StripeSku') {
      const value = slug(node.product.name, slug.defaults.modes['rfc3986'])
      createNodeField({
        node,
        name: 'slug',
        value
      })
    }
  }

  