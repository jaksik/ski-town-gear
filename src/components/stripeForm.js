import React from 'react'
import StripeCheckout from 'react-stripe-checkout';
import logo from '../images/icons/mountains.jpg'

const StripeForm = (props) => {
  console.log("Props: ", props)

  const onToken = async (token, address) => {

    let call
    call = await fetch('/.netlify/functions/checkout', {
      method: 'POST',
      body: JSON.stringify({
          token,
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
          items: [
            {
              type: 'sku',
              parent: 'sku_FhS5KnqfAYwXmw',
              quantity: 2,
            },
          ],
        }),
    })
    .then(response => response.json())
    .then(console.log)
  }
 
    return (
      <StripeCheckout
        token={onToken}
        stripeKey="pk_test_vcN7VWamiWbPRga1t0VEWnAe00iUh1dr3k"
        name="Ski Town Gear"
        description="Hello there"
        image={logo}
        shippingAddress
      />
    )
}

export default StripeForm