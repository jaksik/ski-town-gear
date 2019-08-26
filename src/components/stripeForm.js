import React from 'react'
import StripeCheckout from 'react-stripe-checkout';
import logo from '../images/icons/mountains.jpg'
const StripeForm = (props) => {

  console.log("Propsss: ", props)


  // const cartItems = props.cartItems.map(([sku, quantity]) => ({
  //   type: 'sku',
  //   parent: sku.id,
  //   quantity
  // }))


  const onToken = async (token, address) => {
    console.log("address: ", address)

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
              parent: 'sku_FgJVldqsyrIzqQ',
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
        stripeKey="pk_test_m1CkOjN6bKVkDf7hXoxOFhgc00e3saL74z"
        name="Ski Town Gear"
        description="Hello there"
        image={logo}
        shippingAddress
      />
    )
}

export default StripeForm