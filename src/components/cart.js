import React from 'react'
import Img from "gatsby-image"
import { Row, Col, Form, FormGroup, Input } from "reactstrap"
import StripeForm from "../components/stripeForm"

const ShoppingCart = class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cart: [],
      productInfo: [],
    };
    this.removeItem = this.removeItem.bind(this);
    this.updateQuantity = this.updateQuantity.bind(this);
  }

  componentDidMount() {
    // Get existing cart from localstorage if present.
    const existingCart = JSON.parse(
      localStorage.getItem('stripe_checkout_items')
    )
    if (existingCart && existingCart.length) {
      this.setState({ cart: existingCart })
    }
  }

  getCart() {
    return this.state.cart
  }

  removeItem(removedSku) {
    const cart = this.state.cart.filter(product => product.sku !== removedSku);
    this.setState({ cart })
    localStorage.setItem('stripe_checkout_items', JSON.stringify(cart))
  }

  updateQuantity(event) {
    console.log("event: ", event)
  }

  render() {
    const skus = this.props.skus.skus.edges;
    return (
      <div>
        {/* Map through the items in the cart */}
          {this.state.cart.map((node) => {
            const skuData = skus.filter(sku => sku.node.id === node.sku);
            return (
              <div>
                <Row className="no-gutters">
                  <Col xs={5}>
                      <Img fluid={skuData[0].node.localFiles[0].childImageSharp.fluid}/>
                  </Col> 
                  <Col xs={6}>
                      <Row>
                        <Col xs={12}>
                          <p><strong>{skuData[0].node.attributes.name}</strong></p>
                        </Col>
                        <Col xs={12}>
                          <p>Description</p>
                        </Col>
                        <Col xs={6}>
                          <Input type="select" placeholder={node.quantity}>
                            <option value={1}>1</option>
                            <option value={2}>2</option>
                            <option value={3}>3</option>
                            <option value={4}>4</option>
                            <option value={5}>5</option>
                            <option value={6}>6</option>
                            <option value={7}>7</option>
                            <option value={8}>8</option>
                            <option value={9}>9</option>
                          </Input>
                        </Col>
                        <Col xs={12}>
                          <p>Price</p>
                        </Col>
                      </Row>
                  </Col>
                </Row>
                <Row className="no-gutters">
                  <Col xs={6}>
                    <div onClick={event => this.removeItem(skuData[0].node.id)}>Remove</div>
                  </Col>
                </Row>
                <div className="divider"></div>
              </div>
            )
          })}
      </div>
    )
  }
}

export default ShoppingCart
