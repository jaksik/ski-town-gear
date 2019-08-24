import React from 'react'
import Img from "gatsby-image"
import { Row, Col } from "reactstrap"
import Checkout from "./checkout"

const Cart = class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cart: [],
      productInfo: [],
    };
    this.removeItem = this.removeItem.bind(this);
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
    console.log("removed: ", removedSku)
    const cart = this.state.cart.filter(product => product.sku !== removedSku);
    console.log("new cart: ", cart)
    this.setState({ cart })
    console.log("new cart: ", this.state.cart);
    localStorage.setItem('stripe_checkout_items', JSON.stringify(cart))
  }

  render() {
    console.log("cat: ", this.state.cart)
    console.log("Data: ", this.props.skus)
    const skus = this.props.skus.skus.edges;
    console.log("sku: ", skus)
    return (
      <div>
        {/* Map through skus filtering itmes in cart
        Bind functions to each item for deletion */}
        
        {this.state.cart.map((node) => {
          const skuData = skus.filter(sku => sku.node.id === node.sku)
          console.log(skuData[0].node);

          return (
            <div>
              <Row>

                <Col xs={6}>
                    <Img fluid={skuData[0].node.localFiles[0].childImageSharp.fluid}/>
                  </Col>
                  
                  <Col xs={6}>
                      <p><strong>{skuData[0].node.attributes.name}</strong></p>
                      <p>{node.quantity}</p>
                    </Col>
                  
                </Row>

                <Row>

                  <Col xs={6}>
                  <button onClick={event => this.removeItem(skuData[0].node.id)}>Remove</button>
                  </Col>

                </Row>

              </div>
          )
        })}


        <Checkout cart={this.state.cart}/>
      </div>
    )
  }
}

export default Cart
