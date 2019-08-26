import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Cart from "../components/cart"
import Test from "../components/checkoutProvider"
import 'bootstrap/dist/css/bootstrap.min.css';

const CartPage = ({ data }) => {
  const token = async () => {
    let call
    call = await fetch("/.netlify/functions/checkout", {
      method: 'POST',
      body: JSON.stringify({
        order: {
          currency: 'usd'
        },
        token: {
          card: {
            number: '4242424242424242',
            exp_month: 12,
            exp_year: 2020,
            cvc: '123'
          }
        },
        shipping: {
          name: 'Jenny Rosen',
          address: {
            line1: '1234 Main Street',
            city: 'San Francisco',
            state: 'CA',
            postal_code: '94111',
            country: 'US',
          },
        },
        items: [
          {
            type: 'sku',
            parent: 'sku_FgJVldqsyrIzqQ',
            quantity: 2,
          },
        ],
      })
    })
    .then(call => call.json())
    .then(console.log)
  }

token();
  return (
  <Layout>
    <SEO title="Home" />
        <h1>Shopping Cart</h1>
        <Cart skus={data}/>
        <Link to="/checkout">
          Checkout Now
        </Link>
  </Layout>
)}

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