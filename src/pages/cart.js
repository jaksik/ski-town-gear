import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Cart from "../components/cart"
import 'bootstrap/dist/css/bootstrap.min.css';

const CartPage = ({ data }) => (
  <Layout>
    <SEO title="Home" />
        <h1>Shopping Cart</h1>
        <Cart skus={data}/>
  </Layout>
)

export default CartPage

export const query = graphql`
query SkusForct {
  skus: allStripeSku(
    sort: { fields: [price] }
  ) {
    edges {
      node {
        id
        currency
        price
        attributes {
          name
        }
        fields {
          slug
        }
        localFiles {
          childImageSharp {
            fluid(quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
}
`