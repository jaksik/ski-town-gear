const stripe = require('stripe')('sk_test_DiIrhluODliOuo2J5EAxaGxj00DdFVPCoZ');


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

  try {

    const order = await stripe.orders.create({
      currency: 'usd',
      email: 'jenny.rosen@example.com',
      items: requestBody.items,
      shipping: requestBody.shipping,
    });

    stripe.orders.pay(order.id, {
      source: requestBody.token.id,
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