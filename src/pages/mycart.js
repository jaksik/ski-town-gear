import React from "react"
import { Row, Col } from "reactstrap"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Cart from "../components/cart"
import StripeForm from "../components/stripeForm"

const CartPage = ({ data }) => {

  return (
  <Layout>
    <SEO title="Home" />

    <Row className="no-gutters">
        <Col xs={12} sm={4}>
            <Row className="justify-content-center no-gutters" style={{ background: `#e6e6e6`}}>
              <Col xs={12}>
                <p><strong>ORDER SUMMARY</strong></p>
              </Col>
              <Col xs={12}>
                <p>Item Subtotal ()</p>
              </Col>
              <Col xs={12}>
                <p>Estimated Shipping</p>
              </Col>
              <Col xs={12}>
                <StripeForm/>
              </Col>
            </Row>
          </Col>
      </Row>

      <p><strong>1 ITEM IN YOUR CART</strong></p>
      <Cart skus={data}/>

      <Row className="no-gutters">
        <Col xs={12} sm={4}>
            <Row className="justify-content-center no-gutters" style={{ background: `#e6e6e6`}}>
              <Col xs={12}>
                <p><strong>ORDER SUMMARY</strong></p>
              </Col>
              <Col xs={12}>
                <p>Item Subtotal ()</p>
              </Col>
              <Col xs={12}>
                <p>Estimated Shipping</p>
              </Col>
              <Col xs={12}>
                <StripeForm/>
              </Col>
            </Row>
          </Col>
      </Row>

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