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
    const cart = this.state.cart.filter(product => product.parent !== removedSku);
    this.setState({ cart })
    localStorage.setItem('stripe_checkout_items', JSON.stringify(cart))
  }

  updateQuantity(event) {
    console.log("event: ", event.target.value)
  }

  render() {
    const allSkus = this.props.skus.skus.edges;
    const cartItemsCount = this.state.cart.length;

    console.log("Cart Items: ", cartItemsCount)
    return (
      <>
        <div style={{ display: (cartItemsCount > 0 ? `block` : `none`)}}>
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
                  <StripeForm cartItems={this.state.cart}/>
                  </Col>
                </Row>
              </Col>
          </Row>

          <p><strong>{cartItemsCount} ITEM{(cartItemsCount > 1 ? "S" : "")} IN YOUR CART</strong></p>
        
          {/* Map through the items in the cart */}
          {this.state.cart.map((cartItem, index) => {
          const cartItemData = allSkus.filter(sku => sku.node.id === cartItem.parent);
          return (
              <div key={index}>
                <Row className="no-gutters">
                  <Col xs={5}>
                      <Img fluid={cartItemData[0].node.localFiles[0].childImageSharp.fluid}/>
                  </Col> 
                  <Col xs={6}>
                      <Row>
                        <Col xs={12}>
                          <p><strong>{cartItemData[0].node.attributes.name}</strong></p>
                        </Col>
                        <Col xs={12}>
                          <p>Description</p>
                        </Col>
                        <Col xs={6}>
                          <Input type="select" placeholder={cartItem.quantity} name="quant" onChange={this.updateQuantity}>
                            
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
                    <div onClick={event => this.removeItem(cartItemData[0].node.id)}>Remove</div>
                  </Col>
                </Row>
                <div className="divider"></div>
              </div>
            )
          })}

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
                <StripeForm cartItems={this.state.cart}/>
                </Col>
              </Row>
            </Col>
          </Row>
        </div>

        <div style={{ display: (cartItemsCount > 0 ? `none` : `block`)}}>
            <h5>You have no items in your cart</h5>
        </div>

      </>
    )
  }
}

export default ShoppingCart
