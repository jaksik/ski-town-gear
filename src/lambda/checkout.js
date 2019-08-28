const stripe = require('stripe')("sk_test_edDqKCirhAC2rRRNFlvyWzzm00aaUdxk6J");


function errorResponse(err, callback) {
  const response = {
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    statusCode: 500,
    body: JSON.stringify({
      error: err
    })
  }

  if (typeof callback === 'function') {
    callback(null, response)
  }
}

module.exports.handler = async (event, context, callback) => {
  const requestBody = JSON.parse(event.body)
  const { id, email } = requestBody.token
  const { currency, items, shipping } = requestBody.order

  try {
    const order = await stripe.orders.create({
      currency,
      items,
      shipping,
      email,
    });

    stripe.orders.pay(order.id, {
      source: id,
    })

    const response = {
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      statusCode: 200,
      body: JSON.stringify({
        data: order,
        message: 'Order placed successfully!',
      }),
    }

    callback(null, response)

  } catch (e) {
      errorResponse(e, callback)
  }
}