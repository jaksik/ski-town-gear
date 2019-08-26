import React from 'react'

const buttonStyles = {
  fontSize: '13px',
  textAlign: 'center',
  color: '#fff',
  outline: 'none',
  padding: '12px 60px',
  boxShadow: '2px 5px 10px rgba(0,0,0,.1)',
  backgroundColor: 'red',
  borderRadius: '6px',
  letterSpacing: '1.5px',
}

const Checkout = class extends React.Component {
  // Initialise Stripe.js with your publishable key.
  // You can find your key in the Dashboard:
  // https://dashboard.stripe.com/account/apikeys
  componentDidMount() {
    this.stripe = window.Stripe('pk_test_m1CkOjN6bKVkDf7hXoxOFhgc00e3saL74z', {
      betas: ['checkout_beta_4'],
    })
  }

  async redirectToCheckout(event) {
    event.preventDefault()
    const { error } = await this.stripe.redirectToCheckout({
      items: this.props.cart,
      
      successUrl: `http://localhost:8000/`,
      cancelUrl: `http://localhost:8000/cart/`,
    })

    if (error) {
      console.error('Error:', error)
    }
  }

  render() {
    return (
      <button
        style={buttonStyles}
        onClick={event => this.redirectToCheckout(event)}
        disabled={!this.props.cart.length}
      >
        {this.props.cart.length ? 'Secure Checkout' : 'CART IS EMPTY'}
      </button>
    )
  }
}

export default Checkout