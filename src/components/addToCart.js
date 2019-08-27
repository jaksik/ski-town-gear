import React from 'react'
import { Link } from "gatsby"
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Row, Col } from 'reactstrap';

class AddToCart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cart: [],
            displayMessage: false,
            modal: false,

        };
    
        this.toggle = this.toggle.bind(this);
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

  addToCart(newItem) {
    let itemExisted = false
    let updatedCart = this.state.cart.map(item => {
      if (newItem === item.sku) {
        itemExisted = true
        return { type:"sku", sku: item.sku, quantity: ++item.quantity }
      } else {
        return item
      }
    })
    if (!itemExisted) {
      updatedCart = [...updatedCart, { type:"sku", sku: newItem, quantity: 1 }]
    }
    this.setState({ cart: updatedCart })
    // Store the cart in the localStorage.
    localStorage.setItem('stripe_checkout_items', JSON.stringify(updatedCart))
    this.toggle()
  }

  successMessage() {
    this.setState({ displayMessage: true });
  }

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  render() {

    return (
      <div>
        <Button onClick={() => this.addToCart(this.props.sku)} color="danger" size="lg" block>Add To Cart</Button>{' '}

        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Modal title</ModalHeader>
          <ModalBody>
            You have successfully added "this" to your cart!
          </ModalBody>
            <Row className="no-gutters justify-content-center" style={{ margin:`0 0 10px`}}>
                <Col xs={10}>
                <Link
                    to="/mycart"
                >
                    <Button onClick={this.toggle} color="danger" size="md" block>Go To Cart</Button>{' '}
                </Link>
                </Col>
            </Row>
            <Row className="no-gutters justify-content-center">
                <Col xs={8}>
                    <Button onClick={this.toggle} color="info" size="sm" block>Continue Shopping</Button>
                </Col>
            </Row>
        </Modal>
      </div>
    )
  }
}

export default AddToCart