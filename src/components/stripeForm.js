import React from 'react'
import StripeCheckout from 'react-stripe-checkout';
import logo from '../images/icons/mountains.jpg'

const StripeForm = (props) => {

  const items = props.cartItems;

  const onToken = async (token, address) => {
    
    let call
    try {
      call = await fetch('/.netlify/functions/checkout', {
        method: 'POST',
        body: JSON.stringify({
          token,
          order: {
            currency: 'usd',
            items,
            email: 'jenny.rosen@example.com',
            shipping: {
              name: address.shipping_name,
              address: {
                line1: address.shipping_address_line1,
                city: address.shipping_address_city,
                state: address.shipping_address_state,
                postal_code: address.shipping_address_zip,
                country: 'US',
              },
            },
          }
        }),
      }).then(response => response.json())
        .then(console.log)
        .then(function() {
          localStorage.setItem('stripe_checkout_items', '{}');
          window.location.href = "/"
        })
    } catch (err) {
      alert(err.message)
    }
  } 
 
  return (
    <StripeCheckout
      token={onToken}
      stripeKey="pk_test_vcN7VWamiWbPRga1t0VEWnAe00iUh1dr3k"
      name="Ski Town Gear"
      description="Hello there"
      image={logo}
      shippingAddress
      billingAddress
    />
  )
}

export default StripeForm