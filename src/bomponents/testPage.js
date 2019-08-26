import React from "react"
import { Link } from "gatsby"

const IndexPage = () => {

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
    <div>
      <h1>Hi people</h1>

      <form>
          <input type="text"/>
          <button type="submit">Pay</button>
          
      </form>
      <Link to="/page-2/">Go to page 2</Link>
      
    </div>
  )
}

export default IndexPage
